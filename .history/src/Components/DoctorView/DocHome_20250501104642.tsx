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
          width: "100vw",
        }}
      >
        <button style={{ height: "5vh", width: "9vw" }}>Home</button>
        <button style={{ height: "5vh", width: "15vw" }}>
          Manage availability
        </button>
        <button style={{ height: "5vh", width: "9vw" }}>Profile</button>
      </div>
    </div>
  );
};
