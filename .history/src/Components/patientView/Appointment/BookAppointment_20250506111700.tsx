import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../Services/Others/useQuery";
import { baseURL } from "../../../Services/Others/baseURL";
import { FetchDocList } from "../../../Services/API/fetchDocList";
import { doctorModel } from "../../../Models/doctorModel";

const BookAppointment = () => {
  type APIResponse = {
    dataDoc: doctorModel[];
  };

  type DoctorInfo = {
    name: string;
    uid: string;
  };

  const navigate = useNavigate();
  const query = useQuery();
  const myparams = query.get("date");

  const [SelectedDate, setSelectedDate] = useState<string>(
    myparams ? new Date(parseInt(myparams)).toISOString().split("T")[0] : ""
  );
  const [SelectedDoctor, SetSelectedDoctor] = useState<DoctorInfo | null>(null);
  const [ListDocs, setListDocs] = useState<APIResponse | null>(null);
  const [SelectedTime, setSelectedTime] = useState<string>("");

  const avaTimes = [
    "11:30 AM",
    "12:00 PM",
    "1:20 PM",
    "3:30PM",
    "12:00 PM",
    "1:20 PM",
    "3:30PM",
  ];

  const dateOff = {
    Sunday: false,
    Monday: true,
    Tuesday: false,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
  };

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
    const dayKey = dayMap[date.getDay()] as keyof typeof dateOff;
    return dateOff[dayKey];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchDocList(
          { "Content-Type": "application/json" },
          `${baseURL}/getDocList`
        );
        console.log("Fetched data:", data);
        setListDocs(data);
      } catch (e) {
        console.error("Failed to fetch doctors list:", e);
      }
    };
    fetchData();
  }, []);

  const ListDoctors = ListDocs?.dataDoc.map((e) => ({
    name: e.name,
    uid: e.uid,
  }));

  return (
    <div style={{ backgroundColor: "white", height: "100vh", width: "100vw" }}>
      <div style={{ display: "flex" }}>
        <button
          style={{
            background: "none",
            border: "none",
            position: "absolute",
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
        {/* Doctor Select */}
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

              // Optional: re-validate date
              if (SelectedDate) {
                const dateCheck = new Date(SelectedDate);
                if (!isAvailable(dateCheck)) {
                  setSelectedDate("");
                  alert("Sorry, this doctor is not available on that date");
                }
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

        {/* Date Picker */}
        <input
          disabled={!SelectedDoctor}
          type="date"
          value={SelectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            if (isAvailable(newDate)) {
              setSelectedDate(e.target.value);
            } else {
              alert(
                `Doctor is not available on ${
                  dayMap[newDate.getDay()]
                }. Please select another day.`
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

        {/* Time Slots */}
        <div
          style={{
            width: "30vw",
            overflow: "auto",
            display: "flex",
            flexDirection: "row",
            height: "14vh",
          }}
        >
          {SelectedDoctor && SelectedDate
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
          disabled={!SelectedDoctor}
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
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
