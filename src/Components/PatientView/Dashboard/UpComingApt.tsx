import { useNavigate } from "react-router-dom";

export const UpComingApt = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 164, 201, 0.62)",
        height: "8vh",
        width: "21vw",
        marginTop: "1vh",
        borderRadius: "20px",
        padding: "8px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      onClick={() => navigate("/vieweditapt?aptNumber=123")}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5 style={{ color: "white", margin: 0, fontSize: "14px" }}>
          🩺 DR. Mariam Shabo
        </h5>
        <span
          style={{
            color: "rgba(4, 230, 0, 0.77)",
            fontWeight: "bold",
            fontSize: "10px",
          }}
        >
          Confirmed
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h5
          style={{
            color: "white",
            margin: 0,
            paddingLeft: 20,
            fontSize: "12px",
            fontWeight: "normal",
            display: "flex",
          }}
        >
          25/12/2025 11:30 PM
        </h5>
        <h5
          style={{
            color: "white",
            margin: 0,
            fontSize: "12px",
            fontWeight: "normal",
            display: "flex",
          }}
        >
          📍H. Name
        </h5>
      </div>
    </div>
  );
};
