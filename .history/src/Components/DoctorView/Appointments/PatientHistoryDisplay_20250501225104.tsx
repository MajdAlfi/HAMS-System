export const PatientHistoryDisplay = () => {
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
      <div
        style={{
          height: "100vh",
          width: "25vw",

          backgroundColor: "rgba(0, 164, 201, 0.62)",
          borderBottomLeftRadius: "30px",
          borderTopLeftRadius: "30px",
        }}
      >
        <div style={{ marginTop: "10vh", marginLeft: "2.3vw" }}>
          <h1 style={{ color: "white" }}>History</h1>
          <HistoryCompontent />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgba(214, 214, 214, 0.18)",
          height: "90vh",
          width: "55vw",
          marginTop: "5vh",
          borderRadius: "30px",
          marginLeft: "2.5vw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: "10vh",
          }}
        >
          <h1>🩺 DR. Mariam Shabo</h1>
          <img
            src="https://sitescdn.wearevennture.co.uk/public/bdi-resourcing/mediahub/istock-1280951713-746c0aa89217416e80d8b35d332de48b.jpg"
            style={{
              height: "10vh",
              width: "10vw",
              borderRadius: "20px",
              objectFit: "cover",

              marginLeft: "50px",
              objectPosition: "top",
            }}
          />
        </div>
        <h2>🗓️ 25/12/2025 At 11:30 PM</h2>
        <h2>Hospital Name</h2>
        <h2>Hospital Address</h2>
        <h2 style={{ color: "rgba(4, 230, 0, 0.77)" }}>Confirmed</h2>
        <p
          style={{
            fontSize: 15,
            width: "45vw",
            marginLeft: "5vw",
            textAlign: "justify",
          }}
        >
          I’m a 34-year-old woman and have been feeling extremely tired for the
          past two weeks, even after a full night’s sleep. I’m struggling to
          stay awake during the day, and I’ve been having constant dull
          headaches, mostly in my forehead. My concentration has been off, and I
          often feel mentally foggy, especially in the afternoons. I’ve also
          been getting dizzy when I stand up too quickly.I’ve lost about 5
          pounds recently without trying, and my appetite has decreased. On top
          of that, I’ve been having muscle aches, particularly in my lower back
          and shoulders. I haven’t changed my routine or diet, and there’s no
          history of recent illness or injury. I’m concerned because these
          symptoms are making it hard to focus at work and enjoy time with
          friends. I’m hoping to get some advice on what might be going on and
          how to feel better.
        </p>
      </div>
    </div>
  );
};
