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
        <div>
          <h1 style={{ width: "20vw", color: "white", fontSize: 15 }}>
            Dr. Mariam
          </h1>
        </div>
        <div
          style={{
            width: "40vw",
            justifyContent: "space-evenly",
            display: "flex",
            marginTop: "2vh",
          }}
        >
          <button style={{ height: "5vh", width: "9vw" }}>Home</button>

          <button
            style={{
              height: "5vh",
              width: "15vw",
            }}
          >
            Manage availability
          </button>
          <button
            style={{
              height: "5vh",
              width: "9vw",
            }}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};
