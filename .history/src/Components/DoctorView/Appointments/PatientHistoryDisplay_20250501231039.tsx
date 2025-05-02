export const PatientHistoryDisplay = () => {
  return (
    <div
      style={{
        marginTop: "8vh",
      }}
    >
      <h1>🩺 DR. Mariam Shabo</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        <p>🗓️ 25/12/2025</p>
        <p>Hospital Name</p>
        <p>Hospital Address</p>
      </div>
      <h2 style={{ color: "rgba(4, 230, 0, 0.77)" }}>Confirmed</h2>
      <h6
        style={{
          fontSize: 15,
          display: "flex",
          margin: 0,
          marginLeft: "7.5vw",
        }}
      >
        Patient Decription
      </h6>
      <p
        style={{
          fontSize: 15,
          width: "55vw",
          marginLeft: "7.5vw",

          textAlign: "justify",
        }}
      >
        Patient Desc: I’m a 34-year-old woman and have been feeling extremely
        tired for the past two weeks, even after a full night’s sleep. I’m
        struggling to stay awake during the day, and I’ve been having constant
        dull headaches, mostly in my forehead. My concentration has been off,
        and I often feel mentally foggy, especially in the afternoons. I’ve also
        been getting dizzy when I stand up too quickly.I’ve lost about 5 pounds
        recently without trying, and my appetite has decreased. On top of that,
        I’ve been having muscle aches, particularly in my lower back and
        shoulders. I haven’t changed my routine or diet, and there’s no history
        of recent illness or injury. I’m concerned because these symptoms are
        making it hard to focus at work and enjoy time with friends. I’m hoping
        to get some advice on what might be going on and how to feel better.
      </p>
      <h6>Doctor's Diagnosis</h6>
      <p
        style={{
          fontSize: 15,
          width: "55vw",
          marginLeft: "7.5vw",

          textAlign: "justify",
        }}
      >
        I’m a 34-year-old woman and have been feeling extremely tired for the
        past two weeks, even after a full night’s sleep. I’m struggling to stay
        awake during the day, and I’ve been having constant dull headaches,
        mostly in my forehead. My concentration has been off, and I often feel
        mentally foggy, especially in the afternoons. I’ve also been getting
        dizzy when I stand up too quickly.I’ve lost about 5 pounds recently
        without trying, and my appetite has decreased. On top of that, I’ve been
        having muscle aches, particularly in my lower back and shoulders. I
        haven’t changed my routine or diet, and there’s no history of recent
        illness or injury. I’m concerned because these symptoms are making it
        hard to focus at work and enjoy time with friends. I’m hoping to get
        some advice on what might be going on and how to feel better.
      </p>
    </div>
  );
};
