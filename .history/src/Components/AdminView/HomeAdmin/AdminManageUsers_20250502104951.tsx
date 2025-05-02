import { AdminUserComponent } from "./AdminUserComponent";

export const AdminManageUsers = () => {
  return (
    <div>
      <div style={{ height: "5vh", width: "30vw" }}></div>

      <div style={{ marginLeft: "5vw", marginTop: "5vh" }}>
        <h3 style={{ display: "flex" }}>Manage users</h3>
        <AdminUserComponent />
      </div>
    </div>
  );
};
