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
        <button style={{ height: "5vh" }}>Home</button>
        <button>Manage availability</button>
        <button>Profile</button>
      </div>
    </div>
  );
};
