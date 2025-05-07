import { useNavigate } from "react-router-dom";

type SuggestionBoxProps = {
  drName: string; // Doctor's name
  descDoc: string; // Doctor's specialty or title
  dateOld: string; // Appointment date
  time: string; // Appointment time
  docUid: string; // Doctor's UID
  Hname: string; // Hospital name
};

const SuggestionBox = ({
  drName,
  descDoc,
  dateOld,
  time,
  docUid,
  Hname,
}: SuggestionBoxProps) => {
  const navigate = useNavigate();
  const date = Date.parse(dateOld).toString();
  const handleBookClick = () => {
    const params = new URLSearchParams({
      date,
      docName: drName,
      Hname,
      docUid,
      time,
    });

    navigate(`/bookapt?${params.toString()}`);
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
          {drName} {descDoc} is available on
        </p>
        <h1 style={{ fontSize: 19, margin: 0, color: "white" }}>{dateOld}</h1>
        <h2 style={{ fontSize: 15, margin: 0, color: "white" }}>AT {time}</h2>
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
        onClick={handleBookClick}
      >
        Book Now
      </button>
    </div>
  );
};

export default SuggestionBox;
