import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../Services/Others/useQuery";
import { baseURL } from "../../../Services/Others/baseURL";
import { FetchDocList } from "../../../Services/API/fetchDocList";
import { FetchDocAvailability } from "../../../Services/API/fetchDocAvailability";
import { doctorModel } from "../../../Models/doctorModel";
import { weeklyModel } from "../../../Models/weeklyModel";

// Type Definitions
type APIResponse = {
  dataDoc: doctorModel[];
};

type DoctorInfo = {
  name: string;
  uid: string;
};

type DateOffType = {
  Sunday: boolean;
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
};

const BookAppointment = () => {
  const [SelectedDoctor, SetSelectedDoctor] = useState<DoctorInfo | null>(null);
  const [SelectedDate, setSelectedDate] = useState<string>("");
  const [SelectedTime, setSelectedTime] = useState<string>("");
  const [ListDocs, setListDocs] = useState<APIResponse | null>(null);
  const [weekAva, setWeekAva] = useState<DateOffType | null>(null);

  const navigate = useNavigate();
  const query = useQuery();
  const myparams = query.get("date");

  // Initialize date from query param
  useEffect(() => {
    if (myparams) {
      const parsedDate = new Date(parseInt(myparams.toString()));
      setSelectedDate(parsedDate.toISOString().split("T")[0]);
    }
  }, [myparams]);

  // Fetch doctor list on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await FetchDocList(
          { "Content-Type": "application/json" },
          `${baseURL}/getDocList`
        );
        setListDocs(data);
      } catch (e) {
        console.error("Failed to fetch doctors list:", e);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch availability when doctor is selected
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!SelectedDoctor?.uid) return;

      try {
        const data = await FetchDocAvailability(
          {
            "Content-Type": "application/json",
            uid: SelectedDoctor.uid,
          },
          `${baseURL}/getDocAva`
        );

        const item = data.dataWeek[0] as weeklyModel;

        const availability: DateOffType = {
          Sunday: item.Sunday,
          Monday: item.Monday,
          Tuesday: item.Tuesday,
          Wednesday: item.Wednesday,
          Thursday: item.Thursday,
          Friday: item.Friday,
          Saturday: item.Saturday,
        };
        setWeekAva(availability);
      } catch (e) {
        console.error("Failed to fetch doctor availability:", e);
      }
    };

    fetchAvailability();
    alert(isAvailable(new Date(Date.parse(SelectedDate))));
    if (
      weekAva &&
      SelectedDoctor &&
      SelectedDate &&
      !isAvailable(new Date(Date.parse(SelectedDate)))
    ) {
      alert("Sorry, this doctor is not available on that date");
      setSelectedDate(""); // Reset invalid date
    }
  }, [SelectedDoctor, weekAva]);

  const ListDoctors = ListDocs?.dataDoc.map((e) => ({
    name: e.name,
    uid: e.uid,
  }));

  const avaTimes = Array.from(
    new Set(["11:30 AM", "12:00 PM", "1:20 PM", "3:30 PM"])
  );

  const dayMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const isAvailable = (date: Date): boolean => {
    if (!weekAva) return false;
    const dayKey = dayMap[date.getDay()] as keyof DateOffType;
    return weekAva[dayKey];
  };

  return (
    <div style={{ backgroundColor: "white", height: "100vh", width: "100vw" }}>
      <div style={{ display: "flex" }}>
        <button
          style={{
            background: "none",
            border: "none",
            position: "absolute",
            display: "flex",
            cursor: "pointer",
            marginTop: "5vh",
            marginLeft: "3vw",
            fontSize: 30,
          }}
          onClick={() => navigate(-1)}
        >
          X
        </button>
      </div>

      <div
        style={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15vh",
        }}
      >
        <select
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            padding: "12px 16px",
            border: "none",
            borderRadius: "10px",
            width: "32vw",
            backgroundColor: "rgb(233, 233, 233)",
            height: "8vh",
            marginTop: "1vh",
          }}
          onChange={(e) => {
            const selected = ListDoctors?.find(
              (doc) => doc.uid === e.target.value
            );
            if (selected) {
              SetSelectedDoctor({ name: selected.name!, uid: selected.uid! });

              if (
                weekAva &&
                SelectedDate &&
                !isAvailable(new Date(Date.parse(SelectedDate)))
              ) {
                setSelectedDate("");
                alert("Sorry, this doctor is not available on that date");
              }
            }
          }}
          value={SelectedDoctor?.uid ?? ""}
        >
          <option value="" disabled>
            Select A Doctor
          </option>
          {ListDoctors?.map((e, index) => (
            <option key={index} value={e.uid}>
              {e.name}
            </option>
          ))}
        </select>

        <input
          disabled={!SelectedDoctor?.uid}
          type="date"
          value={SelectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            const newDate = new Date(Date.parse(e.target.value));
            if (isAvailable(newDate)) {
              setSelectedDate(e.target.value);
            } else {
              alert(
                `Doctor is not available on ${
                  dayMap[newDate.getDay()]
                }, please select another day`
              );
            }
          }}
          style={{
            width: "30vw",
            height: "6vh",
            border: "none",
            backgroundColor: "rgb(233, 233, 233)",
            borderRadius: "20px",
            fontWeight: "bold",
            marginTop: "2vh",
            fontSize: "20px",
            padding: "12px 16px",
          }}
        />

        <div
          style={{
            width: "30vw",
            overflow: "auto",
            display: "flex",
            flexDirection: "row",
            height: "14vh",
          }}
        >
          {SelectedDoctor?.uid && SelectedDate
            ? avaTimes.map((e) => (
                <button
                  onClick={() => setSelectedTime(e)}
                  key={e}
                  style={{
                    height: "8vh",
                    marginTop: "2vh",
                    fontWeight: SelectedTime === e ? 800 : 500,
                    minWidth: "9vw",
                    backgroundColor:
                      SelectedTime === e
                        ? "rgba(0, 164, 201, 0.62)"
                        : "rgb(233, 233, 233)",
                    color: SelectedTime === e ? "white" : "black",
                    borderRadius: "10px",
                    marginLeft: "1vw",
                    fontSize: SelectedTime === e ? "20px" : "15px",
                  }}
                >
                  {e}
                </button>
              ))
            : null}
        </div>

        <h2>📍 Hospital Name</h2>
        <textarea
          disabled={!SelectedDoctor?.uid}
          maxLength={200}
          style={{
            backgroundColor: "rgb(233, 233, 233)",
            borderRadius: "20px",
            width: "30vw",
            height: "12vh",
            border: "none",
            padding: "10px",
            fontSize: "15px",
          }}
        ></textarea>

        <button
          style={{
            backgroundColor: "rgba(4, 230, 0, 0.77)",
            height: "8vh",
            width: "20vw",
            borderRadius: "30px",
            color: "white",
            marginTop: "3vh",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
          onClick={() => {
            if (!SelectedDoctor || !SelectedDate || !SelectedTime) {
              alert("Please select all fields before booking.");
              return;
            }
            console.log("Booking appointment for:", {
              doctor: SelectedDoctor,
              date: SelectedDate,
              time: SelectedTime,
            });
            // Booking API call can go here
          }}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
