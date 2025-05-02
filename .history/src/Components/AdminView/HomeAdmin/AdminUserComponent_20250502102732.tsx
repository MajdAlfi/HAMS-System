export const AdminUserComponent = () => {
  return (
    <div
      style={{
        backgroundColor: "rgba(233, 233, 233, 0.4)",
        width: "15vw",
        height: "30vh",
        borderRadius: "30px",
      }}
    >
      <img
        src="/src/assets/patientIMGs/prof.jpg"
        alt="patient IMG"
        style={{
          height: "17vh",
          width: "15vw",
          objectFit: "cover",
          borderRadius: "30px",
        }}
      />
      <h4 style={{ margin: 0, paddingTop: "3vh" }}>Users's Name</h4>
      <h4 style={{ margin: 0 }}>+44xxxxxx</h4>
    </div>
  );
};
