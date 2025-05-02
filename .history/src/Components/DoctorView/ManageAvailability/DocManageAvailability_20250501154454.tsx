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

  return (
    <div>
      <h4 style={{ display: "flex", marginTop: "5vh", marginLeft: "3vw" }}>
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
              SetAvailability(newAva);
            }}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
