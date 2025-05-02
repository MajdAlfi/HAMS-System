import { useState } from "react";
import { AptDoctorHome } from "./Home/AptDoctorHome";
import { DocManageAvailability } from "./ManageAvailability/DocManageAvailability";
import { ProfileHome } from "../PatientView/Profile/ProfileHome";

export const DoctorHome = () => {
  const [SelectedIndex, SetSelectedIndex] = useState(0);
  const ListPage = [AptDoctorHome, DocManageAvailability, ProfileHome];
  const PageComponent = ListPage[SelectedIndex];
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
              marginTop: "4vh",
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
              color: SelectedIndex === 0 ? "rgba(0, 164, 201, 0.62)" : "white",
              fontWeight: SelectedIndex === 0 ? "bold" : "normal",
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
              backgroundColor:
                SelectedIndex === 1 ? "white" : "rgba(233, 233, 233, 0.4)",
              color: SelectedIndex === 1 ? "rgba(0, 164, 201, 0.62)" : "white",
              fontWeight: SelectedIndex === 1 ? "bold" : "normal",
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
              backgroundColor:
                SelectedIndex === 2 ? "white" : "rgba(233, 233, 233, 0.4)",
              color: SelectedIndex === 2 ? "rgba(0, 164, 201, 0.62)" : "white",
              fontWeight: SelectedIndex === 2 ? "bold" : "normal",
              borderRadius: "30px",
            }}
            onClick={() => SetSelectedIndex(2)}
          >
            Profile
          </button>
        </div>
      </div>
      <PageComponent />
    </div>
  );
};
