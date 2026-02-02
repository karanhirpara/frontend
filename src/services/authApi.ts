const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    credentials: "include", // 🔴 REQUIRED
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${API_BASE_URL}/user/registration`, {
    method: "POST",
    credentials: "include", // 🔴 REQUIRED
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
};
