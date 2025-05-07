import { baseURL } from "../Others/baseURL";

export interface AppointmentFromBackend {
  Apt: string; // ISO string expected
  doctorName: string;
  Hospital: string;
  State: string;
}

export interface CalendarEvent {
  allDay: boolean;
  start: Date;
  uid: string;
  doctorName: string;
  hospital: string;
  state: string;
}

export const fetchUserAppointmentsToEvents = async (): Promise<
  CalendarEvent[]
> => {
  try {
    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const uid = user.id;

    if (!uid) {
      throw new Error("User ID not found in localStorage.");
    }

    const response = await fetch(`${baseURL}/getUserAppointments`, {
      method: "GET",
      headers: {
        uid: uid,
      },
    });

    if (!response.ok) {
      throw new Error(`Server returned error: ${response.status}`);
    }

    const data: AppointmentFromBackend[] = await response.json();

    const events: CalendarEvent[] = data.map((apt) => ({
      allDay: true,
      start: new Date(apt.Apt),
      doctorName: apt.doctorName,
      hospital: apt.Hospital,
      state: apt.State,
    }));

    return events;
  } catch (error) {
    console.error("Failed to fetch user appointments:", error);
    return [];
  }
};
