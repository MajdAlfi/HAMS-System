import { useState } from "react";

export const AptDoctorHome = () => {
  const Apt = [
    [
      "Jack Halo",
      "Uh… yeah, so I been feelin’, like, kinda off, I dunno, it’s hard to explain—like, my chest? Not pain-pain, just this tight sorta, uh, pressure, like someone’s sittin’ on me but not real heavy, just annoying, and it comes and goes, mostly at night but sometimes in the day when I’m walkin’ or, y’know, stressed or whatever, and I’ve been real tired, not like sleepy, like drained? Even when I sleep okay, which I don’t, like I wake up, um, three or four times, sweating sometimes, maybe dreams, maybe not. I’ve also been coughin’ a little—dry, not like mucus or anything, just this little tickle, and I get dizzy when I stand up sometimes, like my head spins for a sec. My stomach’s been weird too, kinda bloated, I think, and food’s not sittin’ right—like last night I had tacos and, whew, that was a mistake. And I think my feet been swellin’ some? Hard to tell, shoes feel tighter lately. Oh, and I’ve been anxious too, but I mean, who isn’t, right? It all just feels... wrong, like something’s not right but I can’t pin it. Maybe it’s nothing, but I thought I should say somethin’.",
      "25/12/2025 11:30 AM",
      "Confirmed",
    ],
    ["Name 1", "Desc", "25/12/2025 11:30 AM", "Cancelled"],
    ["Name 1", "Desc", "25/12/2025 11:30 AM", "Confirmed"],
    ["Name 1", "Desc", "25/12/2025 11:30 AM", "Cancelled"],
    ["Name 1", "Desc", "25/12/2025 11:30 AM", "Confirmed"],
  ];
  const [SelectedDate, SetSelectedDate] = useState(Date.now().toString());
  return (
    <div>
      <div
        style={{
          width: "100vw",
          height: "90vh",
          backgroundColor: "white",
          borderTopLeftRadius: "30px",
          borderBottomLeftRadius: "30px",
          padding: "20px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <h2 style={{ marginBottom: "20px" }}>Appointments</h2>
          <input
            type="date"
            value={SelectedDate}
            onChange={(e) => SetSelectedDate(e.target.value)}
            style={{
              width: "12vw",
              height: "2vh",
              border: "none",
              backgroundColor: "rgb(233, 233, 233)",
              borderRadius: "30px",
              fontWeight: "bold",
              marginTop: "2vh",
              fontSize: "15px",
              padding: "12px 16px",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {Apt.map((row, rowIndex) => (
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
              <h1 style={{ color: "rgba(0, 164, 201, 0.62)" }}>{row[0]}</h1>

              <h6
                style={{
                  margin: 0,
                  fontWeight: 400,
                  color: "#555",
                  height: "40vh",
                }}
              >
                {row[1]}
              </h6>
              <h6
                style={{
                  margin: "4px 0",
                  fontWeight: 700,
                  color:
                    row[3] === "Confirmed"
                      ? "rgba(4, 230, 0, 0.77)"
                      : row[3] === "Cancelled"
                      ? "red"
                      : "#555",
                }}
              >
                {row[3]}
              </h6>
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
              >
                View Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
