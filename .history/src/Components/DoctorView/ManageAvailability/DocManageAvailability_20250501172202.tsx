import { useState } from "react";

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
  const ListDays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tusday",
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
  const today = new Date().toISOString().split("T")[0];
  const [SelectedDateFrom, SetSelectedDateFrom] = useState(today);

  const [SelectedDateTo, SetSelectedDateTo] = useState(today);
  return (
    <div>
      <h4 style={{ display: "flex", marginTop: "14vh", marginLeft: "9vw" }}>
        Select days your unavailabile in
      </h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "10vw",
          justifyContent: "space-evenly",
          width: "60vw",
        }}
      >
        {ListDays.map((day, index) => (
          <button
            key={index}
            style={{
              backgroundColor:
                Availability[index] === true ? "rgba(4, 230, 0, 0.77)" : "red",
              color: "white",
              fontWeight: 800,
            }}
            onClick={() => {
              updateItemAtIndex(
                index,
                Availability[index] == true ? false : true
              );
            }}
          >
            {day}
          </button>
        ))}
      </div>

      <div>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "5vh" }}
        >
          <h4 style={{ display: "flex", marginTop: "5vh", marginLeft: "9vw" }}>
            Working Hour
          </h4>
          <input
            type="text"
            maxLength={2}
            value={TimeHourFrom}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                SetTimeHourFrom(e.target.value.toString());
              }
            }}
            min={1}
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
              marginLeft: "10vw",
            }}
          />
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              marginLeft: "5px",
              marginRight: "5px",
              marginTop: "4vh",
            }}
          >
            :
          </h1>
          <input
            type="text"
            maxLength={2}
            value={TimeMinuteFrom}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                SetTimeMinuteFrom(e.target.value.toString());
              }
            }}
            min={0}
            max={59}
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
                SelectedAmFrom == true
                  ? "rgba(4, 230, 0, 0.77)"
                  : "transparent",
              color: SelectedAmFrom == true ? "white" : "black",
              marginTop: "2vh",
              marginLeft: "3vw",

              height: "8vh",
              width: "5vw",
            }}
            onClick={() => setSelectedAmFrom(true)}
          >
            AM
          </button>
          <button
            style={{
              backgroundColor:
                SelectedAmFrom == false
                  ? "rgba(4, 230, 0, 0.77)"
                  : "transparent",
              color: SelectedAmFrom == false ? "white" : "black",
              marginTop: "2vh",

              height: "8vh",
              width: "5vw",
            }}
            onClick={() => setSelectedAmFrom(false)}
          >
            PM
          </button>

          <h1 style={{ marginLeft: "2vw" }}>--</h1>

          <input
            type="text"
            maxLength={2}
            value={TimeHourTo}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                SetTimeHourTo(e.target.value.toString());
              }
            }}
            min={1}
            max={12}
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              padding: "12px 16px",
              border: "none",
              marginLeft: "2vw",
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
              marginTop: "4vh",
            }}
          >
            :
          </h1>
          <input
            type="text"
            maxLength={2}
            value={TimeMinuteTo}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                SetTimeMinuteTo(e.target.value.toString());
              }
            }}
            min={0}
            max={59}
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
                SelectedAmTo == true ? "rgba(4, 230, 0, 0.77)" : "transparent",
              color: SelectedAmTo == true ? "white" : "black",
              marginTop: "2vh",
              marginLeft: "3vw",

              height: "8vh",
              width: "5vw",
            }}
            onClick={() => setSelectedAmTo(true)}
          >
            AM
          </button>
          <button
            style={{
              backgroundColor:
                SelectedAmTo == false ? "rgba(4, 230, 0, 0.77)" : "transparent",
              color: SelectedAmTo == false ? "white" : "black",
              marginTop: "2vh",

              height: "8vh",
              width: "5vw",
            }}
            onClick={() => setSelectedAmTo(false)}
          >
            PM
          </button>
        </div>
        <div>
          <h4 style={{ display: "flex", marginTop: "10vh", marginLeft: "9vw" }}>
            Special Occational off days
          </h4>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h4
                style={{
                  display: "flex",
                  marginTop: "3vh",
                  marginRight: "1vw",
                  marginLeft: "9vw",
                }}
              >
                From
              </h4>
              <input
                type="date"
                value={SelectedDateFrom}
                min={today}
                defaultValue={Date.now().toString()}
                onChange={(e) => SetSelectedDateFrom(e.target.value)}
                style={{
                  width: "12vw",
                  height: "2vh",
                  border: "none",
                  backgroundColor: "rgb(233, 233, 233)",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  marginTop: "2vh",
                  fontSize: "15px",
                  padding: "12px 16px",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h4
                style={{
                  display: "flex",
                  marginTop: "3vh",
                  marginRight: "1vw",
                  marginLeft: "9vw",
                }}
              >
                To
              </h4>
              <input
                type="date"
                value={SelectedDateTo}
                defaultValue={Date.now().toString()}
                min={SelectedDateFrom}
                onChange={(e) => SetSelectedDateTo(e.target.value)}
                style={{
                  width: "12vw",
                  height: "2vh",
                  border: "none",
                  backgroundColor: "rgb(233, 233, 233)",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  marginTop: "2vh",
                  fontSize: "15px",
                  padding: "12px 16px",
                }}
              />
            </div>
          </div>
        </div>
        <button
          style={{
            marginTop: "9vh",
            backgroundColor: "rgba(4, 230, 0, 0.77)",
            color: "white",
            border: "none",
            borderRadius: "20px",
            width: "20vw",
            height: "5vh",
            padding: "8px 12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
