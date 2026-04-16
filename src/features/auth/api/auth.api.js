const BASE_URL = "https://biscofa.runasp.net/api/Auth";

// Forgot Password
export const forgotPasswordAPI = async (email) => {
  const res = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.text(); // السيرفر بيرجع text

  if (!res.ok) throw new Error(data);

  return data;
};

// Reset Password
export const resetPasswordAPI = async ({ email, token, newPassword }) => {
  const res = await fetch(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      token,
      newPassword,
    }),
  });

  const data = await res.text();

  if (!res.ok) throw new Error(data);

  return data;
};

// Refresh Token
export const refreshTokenAPI = async (refreshToken) => {
  const res = await fetch(`${BASE_URL}/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data);

  return data;
};