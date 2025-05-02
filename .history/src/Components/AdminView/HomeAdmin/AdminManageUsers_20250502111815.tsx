import { useState } from "react";
import { AdminUserComponent } from "./AdminUserComponent";
import { Search } from "lucide-react";

export const AdminManageUsers = () => {
  const [SearchQuery, SetSearchQuery] = useState("");
  return (
    <div>
      <div style={{ height: "5vh", width: "30vw" }}>
        <input
          placeholder="Search Phone Number"
          value={SearchQuery}
          inputMode="numeric"
          className="txtFieldStyle mx-auto"
          maxLength={14}
          onChange={(val) => SetSearchQuery(val.target.value)}
          type="text"
        />
        <Search />;
      </div>

      <div style={{ marginLeft: "5vw", marginTop: "5vh" }}>
        <h3 style={{ display: "flex" }}>Manage users</h3>
        <AdminUserComponent />
      </div>
    </div>
  );
};
