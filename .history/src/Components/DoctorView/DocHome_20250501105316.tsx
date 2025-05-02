export const DoctorHome = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "rgba(0, 164, 201, 0.62)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",

          height: "8vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            width: "50vw",
            justifyContent: "space-evenly",
            display: "flex",
          }}
        >
          <button style={{ height: "5vh", width: "9vw", marginTop: "2vh" }}>
            Home
          </button>

          <button
            style={{
              height: "5vh",
              width: "15vw",

              marginTop: "2vh",
            }}
          >
            Manage availability
          </button>
          <button
            style={{
              height: "5vh",
              width: "9vw",

              marginTop: "2vh",
            }}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};
