const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export interface Event  {
  image: string
  _id: string;
  title: string;
  description: string;
  Date: string; 
  Time: string;
  venue: string;
 category: string,
  host:string;
}
export const createEvent = async (formData: FormData) => {
    console.log(formData)
  const res = await fetch(`${API_BASE_URL}/event/create`, {
    method: "POST",
    credentials: "include", // required if auth/cookies used
    body: formData,         // ✅ multipart/form-data
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Event creation failed");
  }

  return res.json();
};

export const fetchAllEvents = async (): Promise<Event[]> => {
  const res = await fetch(`${API_BASE_URL}/events`);

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
};

export const fetchEventById = async (id: string): Promise<Event> => {
  const res = await fetch(`${API_BASE_URL}/event/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch event');
  }

  return res.json();
};

export const fetchEventByHost = async (): Promise<Event[]> => {
  const res = await fetch(`${API_BASE_URL}/events/host`, {
    method: "GET",
   credentials: 'include',

  });

  if (!res.ok) {
    throw new Error('Failed to fetch event');
  }

  return res.json();
};
export const deleteEventById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/eventdelete/${id}`, {
    method: 'DELETE',
    credentials: 'include', // ✅ cookie auth
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Delete failed');
  }

  return res.json();
};