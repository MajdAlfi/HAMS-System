import { useEffect, useState } from "react";
import { baseURL } from "../../../Services/Others/baseURL";

export const DocManageAvailability = () => {
  const [SelectedAmFrom, setSelectedAmFrom] = useState<boolean>(true);
  const [TimeHourFrom, SetTimeHourFrom] = useState<string>("");
  const [TimeMinuteFrom, SetTimeMinuteFrom] = useState<string>("");
  const [SelectedAmTo, setSelectedAmTo] = useState<boolean>(true);
  const [TimeHourTo, SetTimeHourTo] = useState<string>("");
  const [TimeMinuteTo, SetTimeMinuteTo] = useState<string>("");
  const [Availability, SetAvailability] = useState([
    false,
    false,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [specialOccasions, setSpecialOccasions] = useState<
    { _id: string; From: string; To: string }[]
  >([]);
  const [SelectedDateFrom, SetSelectedDateFrom] = useState("");
  const [SelectedDateTo, SetSelectedDateTo] = useState("");

  const ListDays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const updateItemAtIndex = (index: number, newValue: boolean) => {
    const updatedItems = Availability.map((item, i) =>
      i === index ? newValue : item
    );
    SetAvailability(updatedItems);
  };

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const token = localStorage.getItem("token");
    if (!user.id || !token) return alert("Unauthorized");

    const daysMap: Record<string, boolean> = {
      Saturday: Availability[0],
      Sunday: Availability[1],
      Monday: Availability[2],
      Tuesday: Availability[3],
      Wednesday: Availability[4],
      Thursday: Availability[5],
      Friday: Availability[6],
    };

    const fromTime = `${TimeHourFrom}:${TimeMinuteFrom} ${
      SelectedAmFrom ? "AM" : "PM"
    }`;
    const toTime = `${TimeHourTo}:${TimeMinuteTo} ${
      SelectedAmTo ? "AM" : "PM"
    }`;

    try {
      await fetch(`${baseURL}/updateWeeklySchedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          uid: user.id,
          token,
        },
        body: JSON.stringify({
          ...daysMap,
          workingHourFrom: fromTime,
          workingHourTo: toTime,
          uid: user.id,
        }),
      });

      if (
        SelectedDateFrom &&
        SelectedDateTo &&
        new Date(SelectedDateTo) >= new Date(SelectedDateFrom)
      ) {
        await fetch(`${baseURL}/addSpecialOccasion`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            uid: user.id,
            token,
          },
          body: JSON.stringify({
            From: SelectedDateFrom,
            To: SelectedDateTo,
          }),
        });
      }

      alert("Availability updated successfully");
      fetchSpecials();
    } catch (err) {
      console.error(err);
      alert("Failed to update availability");
    }
  };

  const fetchSpecials = async () => {
    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const token = localStorage.getItem("token");
    if (!user.id || !token) return;
    try {
      const res = await fetch(`${baseURL}/getSpecialOccasions`, {
        headers: { uid: user.id, token },
      });
      const data = await res.json();
      setSpecialOccasions(data);
    } catch (e) {
      console.error("Failed to fetch special occasions", e);
    }
  };

  const deleteSpecial = async (id: string) => {
    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const token = localStorage.getItem("token") ?? "";
    try {
      await fetch(`${baseURL}/deleteSpecialOccasion/${id}`, {
        method: "DELETE",
        headers: { uid: user.id, token },
      });
      fetchSpecials();
    } catch (err) {
      console.error("Error deleting special occasion", err);
    }
  };

  useEffect(() => {
    fetchSpecials();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Doctor Availability</h2>
      <h4>Select unavailable days</h4>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {ListDays.map((day, index) => (
          <button
            key={index}
            style={{
              backgroundColor: Availability[index]
                ? "rgba(4, 230, 0, 0.77)"
                : "red",
              color: "white",
            }}
            onClick={() => updateItemAtIndex(index, !Availability[index])}
          >
            {day}
          </button>
        ))}
      </div>

      <h4>Working Hours</h4>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          placeholder="HH"
          maxLength={2}
          value={TimeHourFrom}
          onChange={(e) => SetTimeHourFrom(e.target.value)}
        />
        <span>:</span>
        <input
          placeholder="MM"
          maxLength={2}
          value={TimeMinuteFrom}
          onChange={(e) => SetTimeMinuteFrom(e.target.value)}
        />
        <button
          onClick={() => setSelectedAmFrom(true)}
          style={{ backgroundColor: SelectedAmFrom ? "green" : undefined }}
        >
          AM
        </button>
        <button
          onClick={() => setSelectedAmFrom(false)}
          style={{ backgroundColor: !SelectedAmFrom ? "green" : undefined }}
        >
          PM
        </button>
        <span>to</span>
        <input
          placeholder="HH"
          maxLength={2}
          value={TimeHourTo}
          onChange={(e) => SetTimeHourTo(e.target.value)}
        />
        <span>:</span>
        <input
          placeholder="MM"
          maxLength={2}
          value={TimeMinuteTo}
          onChange={(e) => SetTimeMinuteTo(e.target.value)}
        />
        <button
          onClick={() => setSelectedAmTo(true)}
          style={{ backgroundColor: SelectedAmTo ? "green" : undefined }}
        >
          AM
        </button>
        <button
          onClick={() => setSelectedAmTo(false)}
          style={{ backgroundColor: !SelectedAmTo ? "green" : undefined }}
        >
          PM
        </button>
      </div>

      <h4 style={{ marginTop: "2rem" }}>Add Special Occasion</h4>
      <input
        type="date"
        value={SelectedDateFrom}
        onChange={(e) => SetSelectedDateFrom(e.target.value)}
      />
      <input
        type="date"
        value={SelectedDateTo}
        onChange={(e) => SetSelectedDateTo(e.target.value)}
        min={SelectedDateFrom}
      />

      <h4>Existing Special Occasions</h4>
      <ul>
        {specialOccasions.map((occ) => (
          <li key={occ._id}>
            {occ.From} to {occ.To}
            <input
              type="checkbox"
              onChange={() => deleteSpecial(occ._id)}
            />{" "}
            Remove
          </li>
        ))}
      </ul>

      <button
        onClick={handleSave}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
        }}
      >
        Save
      </button>
    </div>
  );
};
