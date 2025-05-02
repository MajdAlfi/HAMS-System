import { DocPatientHistory } from "./docPatientHistory";

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
        <DocPatientHistory />
      </div>
      <div style={{ height: "100vh", width: "70vw" }}></div>
    </div>
  );
};
