import { useState } from "react";
import { AdminUserComponent } from "./AdminUserComponent";

export const AdminManageUsers = () => {
  const [SearchQuery, SetSearchQuery] = useState("");
  return (
    <div>
      <div style={{ height: "5vh", width: "30vw" }}>
        <input
          placeholder="Phone Number"
          value={SearchQuery}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={14}
          onChange={(val) => SetSearchQuery(val.target.value)}
          type="text"
        />
      </div>

      <div style={{ marginLeft: "5vw", marginTop: "5vh" }}>
        <h3 style={{ display: "flex" }}>Manage users</h3>
        <AdminUserComponent />
      </div>
    </div>
  );
};
