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
        <div style={{ justifyContent: "space-evenly" }}>
          <button>Home</button>
          <button>Manage availability</button>
          <button>Profile</button>
        </div>
      </div>
    </div>
  );
};
