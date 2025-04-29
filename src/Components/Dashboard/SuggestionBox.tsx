import { useNavigate } from "react-router-dom";

const SuggestionBox = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "15vw",
        height: "25vh",
        backgroundColor: "rgba(214, 214, 214, 0.75)",
        borderRadius: "30px",
        margin: 0,
      }}
    >
      <div
        style={{
          width: "15vw",
          height: "20vh",
          backgroundColor: "rgba(0, 164, 201, 0.62)",
          borderRadius: "30px",
          margin: 0,
        }}
      >
        <span
          role="img"
          aria-label="suggestion"
          style={{ fontSize: 35, margin: 0 }}
        >
          💡
        </span>
        <p style={{ margin: "0.25rem", fontSize: 12, color: "white" }}>
          DR.Mariam ENT Specialist is available on
        </p>
        <h1 style={{ fontSize: 19, margin: 0, color: "white" }}>25/12/2025</h1>
        <h2 style={{ fontSize: 15, margin: 0, color: "white" }}>AT 11:30 AM</h2>
      </div>
      <button
        style={{
          backgroundColor: "rgba(4, 230, 0, 0.77)",
          height: "4vh",
          width: "8vw",
          color: "white",
          marginTop: "3px",
          justifyContent: "center",
          fontSize: 10,
        }}
        onClick={() => navigate("/bookapt?suggNumber=123")}
      >
        Book Now
      </button>
    </div>
  );
};

export default SuggestionBox;
