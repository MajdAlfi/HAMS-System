import { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { DatePickerComponent } from "./DatePickerComponent";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [SelectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()));
  const [SelectedAm, setSelectedAm] = useState<boolean>(true);
  const [SelectedDoctor, SetSelectedDoctor] = useState<string>("");
  const ListDoctors = ["Dr. Mariam Shabo", "Dr. Majd Alfi"];
  const [TimeHour, SetTimeHour] = useState<string>("");
  const [TimeMinute, SetTimeMinute] = useState<string>("");
  const dateOff = {
    sun: false,
    mon: true,
    tue: false,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
  };

  // Mapping JavaScript day numbers to your config
  const dayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const isAvailable = (date: Date): boolean => {
    const dayNumber = date.getDay(); // 0 = Sunday, 6 = Saturday
    const dayKey = dayMap[dayNumber] as keyof typeof dateOff;
    return dateOff[dayKey]; // true means available (selectable), false means disabled
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
            width: "30vw",
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
        <DatePicker
          selected={SelectedDate}
          onChange={(date: Date | null) => {
            setSelectedDate(date ?? new Date());
          }}
          filterDate={isAvailable}
          placeholderText="Select a day when the doctor is available"
          //    className="custom-datepicker"
          //         customInput={<DatePickerComponent />}
        />

        <div style={{ display: "flex" }}>
          <input
            type="text"
            maxLength={2}
            value={TimeHour}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                SetTimeHour(e.target.value.toString());
              }
            }}
            min={1}
            disabled={SelectedDoctor === ""}
            max={12}
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              padding: "12px 16px",
              border: "none",
              borderRadius: "10px",
              width: "3vw",
              backgroundColor: "rgb(233, 233, 233)",
              height: "5vh",
              marginTop: "2vh",
            }}
          />
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            :
          </h1>
          <input
            type="text"
            maxLength={2}
            value={TimeMinute}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                SetTimeMinute(e.target.value.toString());
              }
            }}
            min={0}
            max={59}
            disabled={SelectedDoctor === ""}
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              padding: "12px 16px",
              border: "none",
              borderRadius: "10px",

              width: "3vw",
              backgroundColor: "rgb(233, 233, 233)",
              height: "5vh",
              marginTop: "2vh",
            }}
          />
          <button
            style={{
              backgroundColor:
                SelectedAm == true ? "rgba(4, 230, 0, 0.77)" : "transparent",
              color: SelectedAm == true ? "white" : "black",
              marginTop: "2vh",
              marginLeft: "3vw",

              height: "8vh",
              width: "5vw",
            }}
            onClick={() => setSelectedAm(true)}
          >
            AM
          </button>
          <button
            style={{
              backgroundColor:
                SelectedAm == false ? "rgba(4, 230, 0, 0.77)" : "transparent",
              color: SelectedAm == false ? "white" : "black",
              marginTop: "2vh",

              height: "8vh",
              width: "5vw",
            }}
            onClick={() => setSelectedAm(false)}
          >
            PM
          </button>
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
