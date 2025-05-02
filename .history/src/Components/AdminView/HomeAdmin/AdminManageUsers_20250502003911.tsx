import { AdminUserComponent } from "./AdminUserComponent";

export const AdminManageUsers = () => {
  return (
    <div style={{ display: "flex", marginLeft: "5vw", marginTop: "5vh" }}>
      <h3>Manage users</h3>
      <AdminUserComponent />
    </div>
  );
};
