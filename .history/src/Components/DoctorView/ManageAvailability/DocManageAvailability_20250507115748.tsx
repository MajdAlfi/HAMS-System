import { useEffect, useState } from "react";
import { baseURL } from "../../../Services/Others/baseURL";

export const DocManageAvailability = () => {
  const [SelectedAmFrom, setSelectedAmFrom] = useState(true);
  const [TimeHourFrom, SetTimeHourFrom] = useState("");
  const [TimeMinuteFrom, SetTimeMinuteFrom] = useState("");
  const [SelectedAmTo, setSelectedAmTo] = useState(true);
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
      const res = await fetch(`${baseURL}/getWeeklySchedule`, {
        headers: { uid: user.id, token, "Content-Type": "application/json" },
      });
      const data = await res.json();
      alert(user.id + token);
      SetAvailability([
        data.Saturday,
        data.Sunday,
        data.Monday,
        data.Tuesday,
        data.Wednesday,
        data.Thursday,
        data.Friday,
      ]);

      const [fromTime, fromPeriod] = data.workingHourFrom.split(" ");
      const [fromHour, fromMinute] = fromTime.split(":");
      SetTimeHourFrom(fromHour);
      SetTimeMinuteFrom(fromMinute);
      setSelectedAmFrom(fromPeriod === "AM");

      const [toTime, toPeriod] = data.workingHourTo.split(" ");
      const [toHour, toMinute] = toTime.split(":");
      SetTimeHourTo(toHour);
      SetTimeMinuteTo(toMinute);
      setSelectedAmTo(toPeriod === "AM");
    } catch (e) {
      console.error("Failed to fetch weekly schedule", e);
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

    const fromTime = `${TimeHourFrom}:${TimeMinuteFrom} ${
      SelectedAmFrom ? "AM" : "PM"
    }`;
    const toTime = `${TimeHourTo}:${TimeMinuteTo} ${
      SelectedAmTo ? "AM" : "PM"
    }`;

    try {
      await fetch(`${baseURL}/getDoctorSchedule/updateWeeklySchedule`, {
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
        await fetch(`${baseURL}/getDoctorSchedule/addSpecialOccasion`, {
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
      const res = await fetch(
        `${baseURL}/getDoctorSchedule/getSpecialOccasions`,
        {
          headers: { uid: user.id, token },
        }
      );
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
    fetchAvailability();
    fetchSpecials();
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
          placeholder="HH"
          maxLength={2}
          value={TimeHourFrom}
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
        <button
          onClick={() => setSelectedAmFrom(true)}
          style={{
            ...inputStyle,
            height: "5vh",
            color: SelectedAmFrom ? "white" : "black",
            backgroundColor: SelectedAmFrom ? "green" : undefined,
          }}
        >
          AM
        </button>
        <button
          onClick={() => setSelectedAmFrom(false)}
          style={{
            ...inputStyle,
            height: "5vh",
            color: !SelectedAmFrom ? "white" : "black",
            backgroundColor: !SelectedAmFrom ? "green" : undefined,
          }}
        >
          PM
        </button>
      </div>
      <div>
        {" "}
        <span>To </span>
        <input
          placeholder="HH"
          maxLength={2}
          value={TimeHourTo}
          onChange={(e) => SetTimeHourTo(e.target.value)}
          style={inputStyle}
        />
        <span>:</span>
        <input
          placeholder="MM"
          maxLength={2}
          value={TimeMinuteTo}
          onChange={(e) => SetTimeMinuteTo(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={() => setSelectedAmTo(true)}
          style={{
            ...inputStyle,
            height: "5vh",
            color: SelectedAmTo ? "white" : "black",
            backgroundColor: SelectedAmTo ? "green" : undefined,
          }}
        >
          AM
        </button>
        <button
          onClick={() => setSelectedAmTo(false)}
          style={{
            ...inputStyle,
            height: "5vh",
            color: !SelectedAmTo ? "white" : "black",
            backgroundColor: !SelectedAmTo ? "green" : undefined,
          }}
        >
          PM
        </button>
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
