import { baseURL } from "../Others/baseURL";

export type CalendarEvent = {
  allDay: boolean;
  start: Date;
  doctorName: string;
  hospital: string;
  state: string;
};

export const fetchUserAppointmentsToEvents = async (): Promise<
  CalendarEvent[]
> => {
  try {
    const token = localStorage.getItem("token");
    const User = JSON.parse(localStorage.getItem("User") || "{}");

    if (!token || !User.id) return [];

    const res = await fetch(`${baseURL}/getUserAppointments`, {
      headers: {
        "Content-Type": "application/json",
        token,
        uid: User.id,
      },
    });

    const data = await res.json();

    return data.map((apt: any) => ({
      allDay: false,
      start: new Date(apt.Apt),
      doctorName: apt.doctorName || "Dr. Unknown",
      hospital: apt.Hospital || "Unknown",
      state: apt.State || "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};
