import { useNavigate } from "react-router-dom";

const ViewEditAppointment = () => {
  const navigate = useNavigate();
  const status = "Confirmed";
  const isView = true;

  // Corrected date parsing (avoid using "25/12/2025", use ISO or Date constructor)
  const date = new Date("2025-12-25"); // yyyy-mm-dd format
  const today = new Date();

  // Normalize both to compare only dates (not times)
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const showButtons = date >= today;

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "30px",
        height: "85vh",
        width: "80vw",
        marginTop: "7.5vh",
        marginLeft: "10vw",
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
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "40px",
          marginTop: isView === true ? "20vh" : "28vh",
        }}
      >
        🩺 DR. Mariam Shabo
      </h1>
      <h2 style={{ fontSize: "30px", marginTop: "5vh", margin: 0 }}>
        {date.toDateString()}
      </h2>
      <h2 style={{ fontSize: "30px", margin: 0 }}>11:30 PM</h2>
      <h3 style={{ fontSize: "20px", margin: 0 }}>📍 Hospital Name</h3>
      <h3
        style={{
          fontSize: "30px",
          margin: 0,
          color: status === "Confirmed" ? "green" : "red",
        }}
      >
        {status}
      </h3>
      <button
        style={{
          color: "white",
          backgroundColor: "rgba(4, 230, 0, 0.77)",
          width: "30vw",
          display: isView && showButtons ? "inline-block" : "none",
          height: "8vh",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: "15vh",
          borderRadius: "30px",
        }}
      >
        Reschedule
      </button>

      <button
        style={{
          color: "white",
          backgroundColor: "red",
          display: isView && showButtons ? "inline-block" : "none",
          width: "30vw",
          height: "8vh",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: "5vh",
          borderRadius: "30px",
          marginLeft: "3vw",
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default ViewEditAppointment;
