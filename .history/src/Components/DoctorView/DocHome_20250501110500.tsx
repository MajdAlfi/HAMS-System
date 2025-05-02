import { useState } from "react";

export const DoctorHome = () => {
  const [SelectedIndex, SetSelectedIndex] = useState(0);
  return (
    <div>
      <div
        style={{
          backgroundColor: "rgba(0, 164, 201, 0.62)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",

          height: "8vh",
          width: "100vw",
        }}
      >
        <div style={{ display: "flex", justifyContent: "start" }}>
          <h1
            style={{
              width: "20vw",
              overflow: "clip",
              color: "white",
              fontSize: 25,
            }}
          >
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
          <button
            style={{
              height: "5vh",
              width: "9vw",
              backgroundColor:
                SelectedIndex === 0 ? "white" : "rgba(233, 233, 233, 0.4)",
              color: "white",
              borderRadius: "30px",
            }}
            onClick={() => SetSelectedIndex(0)}
          >
            Home
          </button>

          <button
            style={{
              height: "5vh",
              width: "15vw",
              backgroundColor: "rgba(233, 233, 233, 0.4)",
              color: "white",
              borderRadius: "30px",
            }}
            onClick={() => SetSelectedIndex(1)}
          >
            Manage availability
          </button>
          <button
            style={{
              height: "5vh",
              width: "9vw",
              backgroundColor: "rgba(233, 233, 233, 0.4)",
              color: "white",
              borderRadius: "30px",
            }}
            onClick={() => SetSelectedIndex(2)}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};
