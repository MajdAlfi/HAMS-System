export const DocManageAvailability = () => {
  const Availability = [false, false, true, true, true, true, true];
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
        style={{ display: "flex", flexDirection: "row", marginLeft: "10vw" }}
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
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};
