type Props = {
  doctorName: string;
  dateTime: Date;
  hospital: string;
};

export const DocPatientHistory = ({
  doctorName,
  dateTime,
  hospital,
}: Props) => {
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
        cursor: "pointer",
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
              marginLeft: "18px",
            }}
          >
            🩺 {doctorName}
          </h5>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              paddingLeft: "20px",
            }}
          >
            <h5
              style={{
                color: "rgba(0, 164, 201, 0.62)",
                margin: 0,
                fontSize: "12px",
              }}
            >
              {dateTime.toLocaleDateString()}{" "}
              {dateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h5>
            <h5
              style={{
                color: "rgba(0, 164, 201, 0.62)",
                margin: 0,
                fontSize: "12px",
              }}
            >
              📍{hospital}
            </h5>
          </div>
        </div>
        <h1 style={{ fontSize: 30 }}>→</h1>
      </div>
    </div>
  );
};
