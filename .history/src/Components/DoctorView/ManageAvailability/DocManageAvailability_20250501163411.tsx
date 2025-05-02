import { useState } from "react";

export const DocManageAvailability = () => {
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
      <h4 style={{ display: "flex", marginTop: "5vh", marginLeft: "9vw" }}>
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
        <h4 style={{ display: "flex", marginTop: "5vh", marginLeft: "9vw" }}>
          Occations
        </h4>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <h4
              style={{ display: "flex", marginTop: "5vh", marginLeft: "9vw" }}
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
              style={{ display: "flex", marginTop: "5vh", marginLeft: "9vw" }}
            >
              From
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
    </div>
  );
};
