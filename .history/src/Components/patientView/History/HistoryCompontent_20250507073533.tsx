type Props = {
  doctorName: string;
  apt: Date;
  hospital: string;
};

export const HistoryCompontent = ({ doctorName, apt, hospital }: Props) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "8vh",
        width: "21vw",
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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h5
            style={{
              color: "rgba(0, 164, 201, 0.62)",
              margin: 0,
              marginLeft: "18px",
            }}
          >
            🩺 DR. {doctorName}
          </h5>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h5
              style={{
                color: "rgba(0, 164, 201, 0.62)",
                fontSize: "12px",
                fontWeight: "normal",
              }}
            >
              {apt.toLocaleDateString()}{" "}
              {apt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h5>
            <h5
              style={{
                color: "rgba(0, 164, 201, 0.62)",
                fontSize: "12px",
                fontWeight: "normal",
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
