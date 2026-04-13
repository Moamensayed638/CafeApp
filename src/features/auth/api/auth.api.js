const BASE_URL = "https://biscofa.runasp.net/api/Auth";

export const forgotPasswordAPI = async (email) => {
    const res = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    return res.json();
};

export const resetPasswordAPI = async (data) => {
    const res = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
};