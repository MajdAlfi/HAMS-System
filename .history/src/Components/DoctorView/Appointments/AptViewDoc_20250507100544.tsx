import { useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../../Services/Others/baseURL";

export const AptViewDoc = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const apt = state;
  const user = JSON.parse(localStorage.getItem("User") ?? "");
  const isView = true;

  if (!apt)
    return <div style={{ padding: "2rem" }}>No appointment data provided.</div>;

  const aptDate = new Date(apt.Apt);
  const dateStr = aptDate.toLocaleDateString();
  const timeStr = aptDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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
          marginTop: "15vh",
        }}
      >
        {apt.patientName}
      </h1>

      <h2 style={{ fontSize: "30px", marginTop: "5vh", margin: 0 }}>
        {dateStr}
      </h2>
      <h2 style={{ fontSize: "30px", margin: 0 }}>{timeStr}</h2>

      <h3
        style={{
          fontSize: "20px",
          margin: 0,
          marginLeft: "10vw",
          width: "60vw",
          height: "14vh",
          overflow: "clip",
        }}
      >
        {apt.descPatient}
      </h3>

      <div>
        <h3
          style={{
            fontSize: "30px",
            margin: 0,
            color: apt.State === "Confirmed" ? "green" : "red",
          }}
        >
          {apt.State}
        </h3>

        <button
          style={{
            color: "rgba(0, 164, 201, 0.62)",
            backgroundColor: "rgba(233, 233, 233, 0.4)",
            width: "30vw",
            display: isView ? "inline-block" : "none",
            height: "8vh",
            fontWeight: "bold",
            fontSize: 20,
            marginTop: "5vh",
            borderRadius: "30px",
            marginLeft: "3vw",
          }}
          onClick={() =>
            navigate("/viewpatienthistory", {
              state: { uidPatient: apt.uidPatient },
            })
          }
        >
          History
        </button>
      </div>

      <button
        disabled={apt.State == "Cancelled" ? true : false}
        style={{
          color: "white",
          backgroundColor: (apt.State == "Cancelled" ? true : false)
            ? "grey"
            : "red",
          display: isView ? "inline-block" : "none",
          width: "30vw",
          height: "8vh",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: "5vh",
          borderRadius: "30px",
        }}
        onClick={async () => {
          await fetch(`${baseURL}/cancelAppointmentByDoctor/${apt._id}`, {
            method: "PATCH",
            headers: {
              uid: user.id,
              "Content-Type": "application/json",
            },
          });
          navigate("/dochome");
        }}
      >
        Cancel
      </button>

      <button
        disabled={apt.State == "Cancelled" ? true : false}
        style={{
          color: "white",
          backgroundColor: (apt.State == "Cancelled" ? true : false)
            ? "grey"
            : "rgba(4, 230, 0, 0.77)",
          width: "30vw",
          display: isView ? "inline-block" : "none",
          height: "8vh",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: "5vh",
          borderRadius: "30px",
          marginLeft: "3vw",
        }}onClick={()=>navigate(`/diagnosis/${aptId}`);}
      >
        Next
      </button>
    </div>
  );
};
