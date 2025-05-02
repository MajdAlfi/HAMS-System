import { useState } from "react";
import { AdminManageUsers } from "./HomeAdmin/AdminManageUsers";
import { DocProfile } from "../DoctorView/Profile/DocProfile";

export const AdminHome = () => {
  const [SelectedIndex, SetSelectedIndex] = useState(0);
  const ListPage = [AdminManageUsers, DocProfile];
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
              width: "15vw",
              overflow: "clip",
              color: "white",
              marginTop: "2.5vh",
              fontSize: 25,
            }}
          >
            Admin
          </h1>
        </div>
        <div
          style={{
            width: "30vw",
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
              width: "9vw",
              backgroundColor:
                SelectedIndex === 1 ? "white" : "rgba(233, 233, 233, 0.4)",
              color: SelectedIndex === 1 ? "rgba(0, 164, 201, 0.62)" : "white",
              fontWeight: SelectedIndex === 1 ? "bold" : "normal",
              borderRadius: "30px",
            }}
            onClick={() => SetSelectedIndex(1)}
          >
            Profile
          </button>
        </div>
      </div>
      <PageComponent />
    </div>
  );
};
