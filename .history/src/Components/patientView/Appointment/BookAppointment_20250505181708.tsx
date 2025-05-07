import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../Services/Others/useQuery";
const BookAppointment = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const myparams = query.get("date");
  //alert(new Date(parseInt(myparams!.toString())));
  const [SelectedDate, setSelectedDate] = useState<string>(
    myparams != null
      ? new Date(parseInt(myparams.toString())).toISOString().split("T")[0]
      : ""
  );

  const [SelectedTime, setSelectedTime] = useState<string>("");
  const [SelectedDoctor, SetSelectedDoctor] = useState<string>("");
  const ListDoctors = ["Dr. Mariam Shabo", "Dr. Majd Alfi"];

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

  // Mapping JavaScript day numbers to your config
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
    const dayNumber = date.getDay();
    const dayKey = dayMap[dayNumber] as keyof typeof dateOff;
    return dateOff[dayKey];
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",

        width: "100vw",
      }}
    >
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
          onChange={(e) => SetSelectedDoctor(e.target.value)}
          value={SelectedDoctor}
        >
          <option value="" disabled>
            Select A Doctor
          </option>
          {ListDoctors.map((e, index) => {
            return (
              <option key={index} value={e}>
                {e}
              </option>
            );
          })}
        </select>
        <input
          disabled={SelectedDoctor === ""}
          type="date"
          value={SelectedDate}
          defaultValue={SelectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            const newDate = new Date(Date.parse(e.target.value));
            if (isAvailable(newDate)) {
              setSelectedDate(e.target.value);
            } else {
              alert(
                `Doctor is not available on ${
                  dayMap[newDate.getDay()]
                } please select another day`
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
            height: "10vh",
          }}
        >
          {SelectedDoctor != "" ? (
            avaTimes.map((e) => {
              return (
                <button
                  onClick={() => setSelectedTime(e.toString())}
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
              );
            })
          ) : (
            <></>
          )}
        </div>
        <h2>📍 Hospital Name</h2>
        <textarea
          disabled={SelectedDoctor === ""}
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
