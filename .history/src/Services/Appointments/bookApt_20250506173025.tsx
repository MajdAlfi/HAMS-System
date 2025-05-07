import { baseURL } from "../Others/baseURL";
type DoctorInfo = {
  name: string;
  uid: string;
  Hospital: string;
};
export const bookApt = async (
  SelectedDoctor: DoctorInfo,
  SelectedDate: Date,
  SelectedTime: string,
  desc: string,
  HName: string
) => {
  if (!SelectedDoctor || !SelectedDate || !SelectedTime) {
    alert("Please select all fields before booking.");
    return;
  }

  const token = localStorage.getItem("token");
  const User = JSON.parse(localStorage.getItem("User") || "{}");

  if (!token || !User.id) {
    alert("User not authenticated.");
    return;
  }

  try {
    const aptDateTime = new Date(`${SelectedDate}T${SelectedTime}`);

    const response = await fetch(`${baseURL}/bookapt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
        uid: User.id, // this is the patient UID, used in req.headers.uid
      },
      body: JSON.stringify({
        aptDate: aptDateTime,
        uidDoc: SelectedDoctor.uid,
        desc: desc, // Replace with actual input if needed
        HName: HName, // Replace with actual value if needed
      }),
    });

    const result = await response.text();

    if (response.status === 200) {
      alert("Appointment booked successfully!");
      console.log("Booked:", result);
      // Reset state if needed
    } else if (response.status === 409) {
      alert("Doctor is unavailable on the selected date.");
    } else {
      alert("Failed to book appointment." + result);
      console.error("Error response:", result);
    }
  } catch (error) {
    console.error("Booking failed:", error);
    alert("An error occurred while booking the appointment.");
  }
};
