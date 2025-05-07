import { DocPatientHistory } from "./DocPatientHistory";
import { PatientHistoryDisplay } from "./PatientHistoryDisplay";

export const PatientHistory = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          width: "30vw",
          height: "100vh",
          backgroundColor: "rgba(0, 164, 201, 0.62)",
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "30px",
        }}
      >
        <h1 style={{ color: "white" }}>Patient Name</h1>
        <div style={{ marginTop: "10vh", marginLeft: "2.5vw" }}>
          <DocPatientHistory />
        </div>
      </div>
      <div style={{ height: "100vh", width: "70vw" }}>
        <PatientHistoryDisplay />
      </div>
    </div>
  );
};
