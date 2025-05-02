export const DocPatientHistory = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "8vh",
        width: "25vw",
        marginTop: "1vh",
        borderRadius: "20px",
        padding: "8px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h5
            style={{
              color: "rgba(0, 164, 201, 0.62)",
              margin: 0,
              fontSize: "14px",
              display: "flex",
              marginLeft: "18px",
            }}
          >
            🩺 DR. Mariam Shabo
          </h5>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h5
              style={{
                color: "rgba(0, 164, 201, 0.62)",
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
                color: "rgba(0, 164, 201, 0.62)",
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
        <h1 style={{ fontSize: 30 }}>→</h1>
      </div>
    </div>
  );
};
