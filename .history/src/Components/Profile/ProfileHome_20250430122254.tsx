export const ProfileHome = () => {
  return (
    <div style={{ height: "80vh", width: "80vw" }}>
      <img
        src="/src/assets/patientIMGs/prof.jpg"
        style={{
          height: "14vh",
          width: "12vw",
          borderRadius: "10px",
          marginTop: "15vh",
          objectFit: "cover",
        }}
      />
      <h3>Name</h3>
      <h3>DOB: 29/12/2001</h3>
      <h3>address</h3>
      <h3>+44xxxxxxxx</h3>
      <h3>Gender</h3>
      <h3>Account Type</h3>
    </div>
  );
};
