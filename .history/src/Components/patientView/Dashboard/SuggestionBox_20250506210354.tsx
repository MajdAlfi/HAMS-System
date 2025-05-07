import React from "react";
import { useNavigate } from "react-router-dom";

type Suggestion = {
  doctorId: string;
  date: string;
  time: string;
};

const SuggestionBox = ({ suggestion }: { suggestion: Suggestion }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const timestamp = new Date(
      `${suggestion.date}T${suggestion.time}:00`
    ).getTime();
    navigate(`/bookapt?date=${timestamp}`);
  };

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
          padding: "10px",
          color: "white",
        }}
      >
        <div style={{ fontSize: 35 }}>💡</div>
        <p style={{ fontSize: 12 }}>Doctor is available on</p>
        <h1 style={{ fontSize: 19 }}>{suggestion.date}</h1>
        <h2 style={{ fontSize: 15 }}>AT {suggestion.time}</h2>
      </div>
      <button
        style={{
          backgroundColor: "rgba(4, 230, 0, 0.77)",
          height: "4vh",
          width: "8vw",
          color: "white",
          marginTop: "3px",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: "bold",
        }}
        onClick={handleBookNow}
      >
        Book Now
      </button>
    </div>
  );
};

export default SuggestionBox;
