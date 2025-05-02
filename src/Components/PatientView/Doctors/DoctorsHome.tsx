import { useNavigate } from "react-router-dom";

export const DoctorsHome = () => {
  const ListDoctors = [
    [
      "https://sitescdn.wearevennture.co.uk/public/bdi-resourcing/mediahub/istock-1280951713-746c0aa89217416e80d8b35d332de48b.jpg",
      "Dr. Mariam Shabo",
      "ENT Specialist at Kingston Hospital",
    ],
    [
      "https://sitescdn.wearevennture.co.uk/public/bdi-resourcing/mediahub/istock-1280951713-746c0aa89217416e80d8b35d332de48b.jpg",
      "Dr. Majd Alfi",
      "ENT Specialist at Kingston Hospital",
    ],
    [
      "https://sitescdn.wearevennture.co.uk/public/bdi-resourcing/mediahub/istock-1280951713-746c0aa89217416e80d8b35d332de48b.jpg",
      "Dr. Rana Nasser",
      "Pediatrician at City Care",
    ],
    [
      "https://sitescdn.wearevennture.co.uk/public/bdi-resourcing/mediahub/istock-1280951713-746c0aa89217416e80d8b35d332de48b.jpg",
      "Dr. Rana Nasser",
      "Pediatrician at City Care",
    ],
    [
      "https://sitescdn.wearevennture.co.uk/public/bdi-resourcing/mediahub/istock-1280951713-746c0aa89217416e80d8b35d332de48b.jpg",
      "Dr. Mariam Shabo",
      "ENT Specialist at Kingston Hospital",
    ],
  ];
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "85vw",
        height: "100vh",
        backgroundColor: "white",
        borderTopLeftRadius: "30px",
        borderBottomLeftRadius: "30px",
        padding: "20px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Available Doctors</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {ListDoctors.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              backgroundColor: "rgba(214, 214, 214, 0.32)",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={row[0]}
              alt="doctor"
              style={{
                width: "100%",
                height: "150px",
                borderRadius: "8px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <h4 style={{ margin: 0 }}>{row[1]}</h4>
            <h6 style={{ margin: "4px 0", fontWeight: 400, color: "#555" }}>
              {row[2]}
            </h6>
            <button
              style={{
                marginTop: "auto",
                backgroundColor: "rgba(4, 230, 0, 0.77)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/bookapt?suggNumber=123")}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
