import { useNavigate } from "react-router-dom";

type CalendarEvent = {
  id: string;
  allDay: boolean;
  start: Date;
  doctorName: string;
  hospital: string;
  state: string;
};

type CustomDateHeaderProps = {
  date: Date;
  events: CalendarEvent[];
};

export const CustomDateHeader = ({ date, events }: CustomDateHeaderProps) => {
  const navigate = useNavigate();

  const matchingEvent = events.find(
    (event) =>
      event.start.getDate() === date.getDate() &&
      event.start.getMonth() === date.getMonth() &&
      event.start.getFullYear() === date.getFullYear()
  );

  const isSelected = !!matchingEvent;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleClick = () => {
    if (matchingEvent) {
      navigate(`/vieweditapt?aptNumber=${matchingEvent.id}`);
    } else if (date.getTime() >= today.getTime()) {
      const timestamp = date.getTime() + 24 * 60 * 60 * 1000;
      navigate(`/bookapt?date=${timestamp}`);
    } else {
      alert("You can only book appointments today or after today");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: isSelected ? "red" : "transparent",
          color: isSelected ? "white" : "black",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {date.getDate()}
      </div>
    </div>
  );
};
