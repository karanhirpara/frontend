const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const registerForEvent = async (eventId: string) => {
  const res = await fetch(`${API_BASE_URL}/eventregistion`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
};

export const cancelRegistration = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/registrationcancel/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Cancel registration failed");
  }

  return res.json();
};

export const checkEventRegistration = async (eventId: string) => {
    console.log('checking registration for event:', eventId);
  const res = await fetch(`${API_BASE_URL}/registrationcheck/${eventId}`, {
    method: "GET",
    credentials: "include", // include cookies/auth if needed
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to check registration");
  }
  console.log(res);
  return res.json(); // likely returns { registered: boolean } or similar
};
interface Registration {
  event:string
}
export const getAllRegistrations = async () => {
  const res = await fetch(`${API_BASE_URL}/allregistration`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch registrations");
  }

  return res.json(); 
  // expected response:
  // { count: number, registrations: Registration[] }
};
