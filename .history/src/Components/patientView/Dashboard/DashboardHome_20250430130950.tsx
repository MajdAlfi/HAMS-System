import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale";
import "../../Css/calanderDesign.css";
import SuggesionComponent from "./SuggestionComponent";
import SuggestionBox from "./SuggestionBox";
import { UpComingApt } from "./UpComingApt";
import CustomDateHeader from "./CustomDateCell";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const DashboardHome = () => {
  const events = [
    {
      allDay: true,
      start: new Date(2025, 3, 20),
    },
    {
      allday: true,
      start: new Date(2025, 3, 22, 10, 0),
    },
  ];
  const userName = "Name";

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "85vw",
        height: "100vh",
        borderTopLeftRadius: "30px",
        borderBottomLeftRadius: "30px",
        margin: 0,
        padding: "2rem",
        boxSizing: "border-box",

        overflow: "auto",
      }}
    >
      <h1>Welcome back {userName} 🙌</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          <h3
            style={{
              display: "flex",
              marginTop: "2rem",
              fontWeight: "lighter",
              fontSize: 15,
            }}
          >
            Calendar
          </h3>
          <div
            style={{
              height: "30vh",
              marginTop: "0.5rem",
              backgroundColor: "rgba(233, 233, 233, 0.4)",
              borderRadius: "20px",
              padding: "10px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
              width: "45vw",
            }}
          >
            <Calendar
              localizer={localizer}
              events={events}
              style={{ height: "100%", width: "45vw", borderRadius: "10px" }}
              selectable
              toolbar={false}
              components={{
                month: {
                  dateHeader: CustomDateHeader,
                },
              }}
            />
          </div>
          <h3
            style={{
              display: "flex",
              marginTop: "2.5rem",
              fontWeight: "lighter",
              fontSize: 15,
            }}
          >
            Suggestions
          </h3>
          <div
            style={{
              backgroundColor: "rgba(233, 233, 233,0.50)",
              height: "25vh",
              marginTop: "1rem",
              width: "48vw",
              overflowX: "auto", // <-- Add this!
              overflowY: "hidden", // <-- Optional: to avoid vertical scroll
              padding: "10px",
              borderRadius: "30px",
            }}
          >
            <SuggesionComponent
              items={[SuggestionBox, SuggestionBox, SuggestionBox]}
              renderItem={(ItemComponent) => <ItemComponent />}
              separator={
                <div
                  style={{
                    width: "20px",
                  }}
                />
              }
            />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(233, 233, 233,0.40)",
            height: "70vh",
            width: "25vw",
            marginTop: "5vh",
            borderRadius: "30px",
          }}
        >
          <h4>Upcoming Appointments</h4>
          <div
            style={{
              backgroundColor: "rgba(214, 214, 214, 0.32)",
              height: "59.5vh",
              width: "23vw",
              marginTop: "5vh",
              marginLeft: "1vw",
              display: "flex",
              justifyContent: "center",
              borderRadius: "30px",
            }}
          >
            <UpComingApt />
          </div>
        </div>
      </div>
    </div>
  );
};
