import { baseURL } from "../Others/baseURL";

type CalendarEvent = {
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

    const data = await response.json();

    const events = data.map((apt: { Apt: Date }) => ({
      allDay: true,
      start: new Date(apt.Apt),
    }));

    return events;
  } catch (error) {
    console.error("Failed to fetch user appointments:", error);
    return [];
  }
};
