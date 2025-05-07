type Doctor = {
  name: string;
  img: string;
};

type Appointment = {
  Apt: string;
  Hospital: string;
  State: string;
  descPatient: string;
  diagnosis: string;
  doctor: Doctor;
};

type Props = {
  appointment: Appointment;
};

export const PatientHistoryDisplay = ({ appointment }: Props) => {
  const aptDate = new Date(appointment.Apt);

  return (
    <div
      style={{
        marginTop: "8vh",
      }}
    >
      <h1>🩺 DR. {appointment.doctor.name}</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        <p>🗓️ {aptDate.toLocaleDateString()}</p>
        <p>{appointment.Hospital}</p>
      </div>

      <h2
        style={{
          color:
            appointment.State.toLowerCase() === "confirmed" ? "green" : "red",
        }}
      >
        {appointment.State}
      </h2>

      <h6
        style={{
          fontSize: 15,
          display: "flex",
          margin: 0,
          paddingLeft: "7.5vw",
        }}
      >
        Patient Description
      </h6>
      <p
        style={{
          fontSize: 15,
          width: "55vw",
          marginLeft: "7.5vw",
          textAlign: "justify",
        }}
      >
        {appointment.descPatient}
      </p>

      <h6
        style={{
          fontSize: 15,
          display: "flex",
          margin: 0,
          paddingLeft: "7.5vw",
        }}
      >
        Doctor's Diagnosis
      </h6>
      <p
        style={{
          fontSize: 15,
          width: "55vw",
          marginLeft: "7.5vw",
          textAlign: "justify",
        }}
      >
        {appointment.diagnosis}
      </p>
    </div>
  );
};
