import { useNavigate } from "react-router-dom";

const ViewEditAppointment = () => {
  const navigate = useNavigate();
  const status = "Confirmed";
  const isView = true;

  // parse your appointment date (use ISO or YYYY-MM-DD to avoid locale issues)
  const aptDate = new Date("2025-12-25");
  // normalize to midnight for date‐only comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  aptDate.setHours(0, 0, 0, 0);

  // will be true if aptDate is today or in the future
  const showActions = aptDate >= today;

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

      <h1
        style={{
          fontWeight: "bold",
          fontSize: "40px",
          marginTop: isView ? "20vh" : "28vh",
        }}
      >
        🩺 DR. Mariam Shabo
      </h1>
      <h2 style={{ fontSize: "30px", marginTop: "5vh", margin: 0 }}>
        {aptDate.toDateString()}
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
          height: "8vh",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: "15vh",
          borderRadius: "30px",
          display: showActions ? "inline-block" : "none",
        }}
      >
        Reschedule
      </button>

      <button
        style={{
          color: "white",
          backgroundColor: "red",
          width: "30vw",
          height: "8vh",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: "5vh",
          borderRadius: "30px",
          marginLeft: "3vw",
          display: showActions ? "inline-block" : "none",
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default ViewEditAppointment;
