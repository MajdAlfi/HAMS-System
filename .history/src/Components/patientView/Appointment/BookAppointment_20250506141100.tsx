import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../Services/Others/useQuery";
import { baseURL } from "../../../Services/Others/baseURL";
import { FetchDocList } from "../../../Services/API/fetchDocList";
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

const BookAppointment = () => {
  const [SelectedDoctor, SetSelectedDoctor] = useState<DoctorInfo | null>(null);
  const [SelectedDate, setSelectedDate] = useState<string>("");
  const [SelectedTime, setSelectedTime] = useState<string>("");
  const [ListDocs, setListDocs] = useState<APIResponse | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const navigate = useNavigate();
  const query = useQuery();
  const myparams = query.get("date");

  // Set initial date from query param
  useEffect(() => {
    if (myparams) {
      const parsedDate = new Date(parseInt(myparams.toString()));
      setSelectedDate(parsedDate.toISOString().split("T")[0]);
    }
  }, [myparams]);

  // Fetch doctors list
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

  // Fetch available time slots when doctor or date changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (!SelectedDoctor?.uid || !SelectedDate) return;

      try {
        const response = await fetch(`${baseURL}/getDocAva`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            uid: SelectedDoctor.uid,
            date: SelectedDate,
          },
        });

        const data = await response.json();

        if (!data.available) {
          alert(`Doctor not available on ${data.day}`);
          setAvailableSlots([]);
          return;
        }

        setAvailableSlots(data.availableSlots);
      } catch (error) {
        console.error("Failed to fetch available slots:", error);
        setAvailableSlots([]);
      }
    };

    fetchSlots();
  }, [SelectedDoctor, SelectedDate]);

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
              setSelectedTime(""); // reset time on doctor change
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
            //      const newDate = new Date(Date.parse(e.target.value));
            setSelectedDate(e.target.value);
            setSelectedTime(""); // reset time when date changes
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
            marginTop: "2vh",
            flexWrap: "wrap",
          }}
        >
          {SelectedDoctor?.uid && SelectedDate && availableSlots.length > 0 ? (
            availableSlots.map((e) => (
              <button
                onClick={() => setSelectedTime(e)}
                key={e}
                style={{
                  height: "8vh",
                  marginTop: "1vh",
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
          ) : (
            <p>No available slots</p>
          )}
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
