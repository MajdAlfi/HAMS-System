export const DoctorHome = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "darkblue",
          display: "flex",
          flexDirection: "row",
          justifyContent:"space-evenly"
          height: "5vh",
          width: "50vw",
        }}
      >
        <button>Home</button>
        <button>Manage availability</button>
        <button>Profile</button>
      </div>
    </div>
  );
};
