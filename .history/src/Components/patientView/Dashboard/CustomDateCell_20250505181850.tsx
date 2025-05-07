import { useNavigate } from "react-router-dom";

const events = [
  {
    title: "Appointment",
    allDay: true,
    start: new Date(2025, 3, 20),
    end: new Date(2025, 3, 20),
  },
  {
    title: "Appointment",
    start: new Date(2025, 3, 22, 10, 0),
    end: new Date(2025, 3, 22, 12, 0),
  },
];
type CustomDateHeaderProps = {
  date: Date;
};

const CustomDateHeader = ({ date }: CustomDateHeaderProps) => {
  const navigate = useNavigate();
  const isSelected = events.some(
    (event) =>
      date.getDate() === new Date(event.start).getDate() &&
      date.getMonth() === new Date(event.start).getMonth() &&
      date.getFullYear() === new Date(event.start).getFullYear()
  );

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
        }}
        onClick={() =>
          isSelected
            ? navigate("/vieweditapt?aptNumber=123")
            : navigate("/bookapt?date=" + date.getTime().toString())
        }
      >
        {date.getDate()}
      </div>
    </div>
  );
};
export default CustomDateHeader;
