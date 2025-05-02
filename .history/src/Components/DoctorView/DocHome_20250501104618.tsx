export const DoctorHome = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "darkblue",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          height: "8vh",
          width: "50vw",
        }}
      >
        <button style={{ height: "5vh", width: "9vw" }}>Home</button>
        <button style={{ height: "5vh", width: "9vw" }}>
          Manage availability
        </button>
        <button style={{ height: "5vh", width: "9vw" }}>Profile</button>
      </div>
    </div>
  );
};
