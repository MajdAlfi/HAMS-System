import { useEffect, useState } from "react";
import { baseURL } from "../../../Services/Others/baseURL";

export const DocManageAvailability = () => {
  const [TimeHourFrom, SetTimeHourFrom] = useState("");
  const [TimeMinuteFrom, SetTimeMinuteFrom] = useState("");
  const [TimeHourTo, SetTimeHourTo] = useState("");
  const [TimeMinuteTo, SetTimeMinuteTo] = useState("");
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

  const inputStyle = {
    width: "12vw",
    height: "2vh",
    border: "none",
    backgroundColor: "rgb(233, 233, 233)",
    borderRadius: "30px",
    fontWeight: "bold",
    marginTop: "2vh",
    fontSize: "15px",
    padding: "12px 16px",
  };

  const updateItemAtIndex = (index: number, newValue: boolean) => {
    const updatedItems = Availability.map((item, i) =>
      i === index ? newValue : item
    );
    SetAvailability(updatedItems);
  };

  const fetchAvailability = async () => {
    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const token = localStorage.getItem("token");
    if (!user.id || !token) return;

    try {
      const res = await fetch(`${baseURL}/getDoctorSchedule`, {
        headers: { uid: user.id, token },
      });
      const data = await res.json();

      const weekly = data.weekly;

      SetAvailability([
        weekly.Saturday,
        weekly.Sunday,
        weekly.Monday,
        weekly.Tuesday,
        weekly.Wednesday,
        weekly.Thursday,
        weekly.Friday,
      ]);

      const [fromHour, fromMinute] = weekly.workingHourFrom.split(":");
      SetTimeHourFrom(fromHour);
      SetTimeMinuteFrom(fromMinute);

      const [toHour, toMinute] = weekly.workingHourTo.split(":");
      SetTimeHourTo(toHour);
      SetTimeMinuteTo(toMinute);

      setSpecialOccasions(data.specials);
    } catch (e) {
      console.error("Failed to fetch availability", e);
    }
  };

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const token = localStorage.getItem("token");
    if (!user.id || !token) return alert("Unauthorized");

    const daysMap = {
      Saturday: Availability[0],
      Sunday: Availability[1],
      Monday: Availability[2],
      Tuesday: Availability[3],
      Wednesday: Availability[4],
      Thursday: Availability[5],
      Friday: Availability[6],
    };

    const fromTime = `${TimeHourFrom}:${TimeMinuteFrom}`;
    const toTime = `${TimeHourTo}:${TimeMinuteTo}`;

    try {
      await fetch(`${baseURL}/getDoctorSchedule/saveWeeklyAvailability`, {
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
        }),
      });

      if (
        SelectedDateFrom &&
        SelectedDateTo &&
        new Date(SelectedDateTo) >= new Date(SelectedDateFrom)
      ) {
        await fetch(`${baseURL}/getDoctorSchedule/saveSpecialOccasion`, {
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
      fetchAvailability();
    } catch (err) {
      console.error("Failed to save availability", err);
      alert("Failed to update availability");
    }
  };

  const deleteSpecial = async (id: string) => {
    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const token = localStorage.getItem("token") ?? "";
    try {
      await fetch(`${baseURL}/getDoctorSchedule/deleteSpecialOccasion`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          uid: user.id,
          token,
        },
        body: JSON.stringify({ id }),
      });
      fetchAvailability();
    } catch (err) {
      console.error("Error deleting special occasion", err);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Doctor Availability</h2>

      <h4>Select unavailable days</h4>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {ListDays.map((day, index) => (
          <button
            key={index}
            style={{
              backgroundColor: Availability[index]
                ? "rgba(4, 230, 0, 0.77)"
                : "red",
              color: "white",
              borderRadius: "30px",
              padding: "10px 20px",
            }}
            onClick={() => updateItemAtIndex(index, !Availability[index])}
          >
            {day}
          </button>
        ))}
      </div>

      <h4>Working Hours</h4>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="From HH"
          maxLength={2}
          value={TimeHourFrom.padStart(2, "0")}
          onChange={(e) => SetTimeHourFrom(e.target.value)}
          style={inputStyle}
        />
        <span style={{ marginTop: "3vh" }}>:</span>
        <input
          placeholder="MM"
          maxLength={2}
          value={TimeMinuteFrom}
          onChange={(e) => SetTimeMinuteFrom(e.target.value)}
          style={inputStyle}
        />
        <span style={{ marginTop: "3vh" }}>To</span>
        <input
          placeholder="HH"
          maxLength={2}
          value={TimeHourTo}
          onChange={(e) => SetTimeHourTo(e.target.value)}
          style={inputStyle}
        />
        <span style={{ marginTop: "3vh" }}>:</span>
        <input
          placeholder="MM"
          maxLength={2}
          value={TimeMinuteTo}
          onChange={(e) => SetTimeMinuteTo(e.target.value)}
          style={inputStyle}
        />
      </div>

      <h4 style={{ marginTop: "2rem" }}>Add Special Occasion</h4>
      <input
        type="date"
        value={SelectedDateFrom}
        onChange={(e) => SetSelectedDateFrom(e.target.value)}
        style={inputStyle}
      />
      <input
        type="date"
        value={SelectedDateTo}
        onChange={(e) => SetSelectedDateTo(e.target.value)}
        min={SelectedDateFrom}
        style={inputStyle}
      />

      <h4>Existing Special Occasions</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
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
          borderRadius: "30px",
        }}
      >
        Save
      </button>
    </div>
  );
};
