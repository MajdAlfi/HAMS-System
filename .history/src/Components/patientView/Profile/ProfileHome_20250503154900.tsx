import { useNavigate } from "react-router-dom";

export const ProfileHome = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("User")!);
  return (
    <div style={{ height: "80vh", width: "85vw" }}>
      <div style={{ position: "absolute", top: 50, right: 30 }}>
        <button
          style={{
            height: "5vh",
            width: "10vw",
            fontWeight: "bold",
            backgroundColor: "red",
            color: "white",

            fontSize: 18,
          }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Signout
        </button>
      </div>

      <img
        src="/src/assets/patientIMGs/prof.jpg"
        style={{
          height: "14vh",
          width: "10vw",
          borderRadius: "10px",
          marginTop: "15vh",
          objectFit: "cover",
        }}
      />
      <h3>{userData["Name"]}</h3>
      <h3>DOB: 29/12/2001</h3>
      <h3>address</h3>
      <h3>+44xxxxxxxx</h3>
      <h3>Gender</h3>
      <h3>Account Type</h3>
    </div>
  );
};
