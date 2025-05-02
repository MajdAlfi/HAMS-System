export const DoctorsHome = () => {
  const ListDoctors = [
    [
      "https://sitescdn.wearevennture.co.uk/public/bdi-resourcing/mediahub/istock-1280951713-746c0aa89217416e80d8b35d332de48b.jpg",
      "Dr. Mariam Shabo",
      "ENT Specialist at kingston hospital",
    ],
    [
      "https://sitescdn.wearevennture.co.uk/public/bdi-resourcing/mediahub/istock-1280951713-746c0aa89217416e80d8b35d332de48b.jpg",
      "Dr. Majd Alfi",
      "ENT Specialist at kingston hospital",
    ],
  ];
  return (
    <div
      style={{
        display: "flex",
        width: "85vw",
        height: "100vh",
        backgroundColor: "white",
        borderTopLeftRadius: "30px",
        borderBottomLeftRadius: "30px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {ListDoctors.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                height: "20vh",
                width: "20vw",
                backgroundColor: "rgba(214, 214, 214, 0.32)",
                borderRadius: "8px",
              }}
            >
              <img
                src={row[0]}
                alt="doctor's image"
                style={{
                  height: "8vh",
                  width: "5vw",
                  borderRadius: "10px",
                  marginTop: "5px",
                  objectFit: "cover",
                }}
              />
              <h4 style={{ margin: 0, padding: 0 }}>{row[1]}</h4>
              <h6 style={{ margin: 0, padding: 0 }}>{row[2]}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
