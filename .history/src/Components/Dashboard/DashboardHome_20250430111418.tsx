import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale";
import "../../Css/calanderDesign.css";
import CustomDateHeader from "../Dashboard/CustomDateCell";
import SuggesionComponent from "./SuggestionComponent";
import SuggestionBox from "./SuggestionBox";
import { UpComingApt } from "./UpComingApt";

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
      allDay: true,
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
        padding: "2rem",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Welcome back, {userName} 🙌</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "2vw",
        }}
      >
        {/* Left Column: Calendar + Suggestions */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontWeight: 400, fontSize: 16, marginTop: "1rem" }}>
            📅 Calendar
          </h3>
          <div
            style={{
              height: "30vh",
              marginTop: "0.5rem",
              backgroundColor: "rgba(233, 233, 233, 0.4)",
              borderRadius: "20px",
              padding: "10px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
              width: "100%",
            }}
          >
            <Calendar
              localizer={localizer}
              events={events}
              style={{ height: "100%", width: "100%" }}
              selectable
              toolbar={false}
              components={{
                month: {
                  dateHeader: CustomDateHeader,
                },
              }}
            />
          </div>

          <h3 style={{ fontWeight: 400, fontSize: 16, marginTop: "2rem" }}>
            💡 Suggestions
          </h3>
          <div
            style={{
              backgroundColor: "rgba(233, 233, 233, 0.5)",
              height: "25vh",
              marginTop: "1rem",
              width: "100%",
              overflowX: "auto",
              overflowY: "hidden",
              padding: "10px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
            }}
          >
            <SuggesionComponent
              items={[SuggestionBox, SuggestionBox, SuggestionBox]}
              renderItem={(ItemComponent) => <ItemComponent />}
              separator={<div style={{ width: "20px" }} />}
            />
          </div>
        </div>

        {/* Right Column: Appointments */}
        <div
          style={{
            backgroundColor: "rgba(233, 233, 233, 0.4)",
            height: "70vh",
            width: "25vw",
            borderRadius: "20px",
            padding: "20px",
            boxSizing: "border-box",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.07)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ fontWeight: 500, fontSize: 18, marginBottom: "1rem" }}>
            📋 Upcoming Appointments
          </h3>
          <div
            style={{
              backgroundColor: "rgba(214, 214, 214, 0.32)",
              borderRadius: "20px",
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <UpComingApt />
            <UpComingApt />
          </div>
        </div>
      </div>
    </div>
  );
};
