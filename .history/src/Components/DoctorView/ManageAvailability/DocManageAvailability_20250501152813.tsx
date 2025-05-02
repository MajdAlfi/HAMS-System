export const DocManageAvailability = () => {
  const Availability = [false, false, true, true, true, true, true];
  return (
    <div>
      <h4 style={{ display: "flex", marginTop: "5vh", marginLeft: "3vw" }}>
        Select days your unavailabile in
      </h4>
      <div
        style={{ display: "flex", flexDirection: "row", marginLeft: "10vw" }}
      >
        <button>Saturday</button>
        <button>Sunday</button>
        <button>Monday</button>
        <button>Tusday</button>
        <button>Wednesday</button>
        <button>Thursday</button>
        <button>Friday</button>
      </div>
    </div>
  );
};
