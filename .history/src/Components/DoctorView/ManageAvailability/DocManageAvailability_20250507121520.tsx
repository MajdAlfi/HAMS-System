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
      setSelectedAmFrom(+fromHour < 12);

      const [toHour, toMinute] = weekly.workingHourTo.split(":");
      SetTimeHourTo(toHour);
      SetTimeMinuteTo(toMinute);
      setSelectedAmTo(+toHour < 12);

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
      {/* ... rest of the JSX remains the same */}
    </div>
  );
};
