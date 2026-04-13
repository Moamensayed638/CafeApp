import { useState } from "react";
import { resetPassword } from "../services/auth.service";

export default function ResetPassword() {
    const [form, setForm] = useState({
        email: "",
        token: "",
        newPassword: "",
    });

    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        try {
        await resetPassword(form);
        setMsg("✅ Password reset successfully");
        } catch {
        setMsg("❌ Failed to reset password");
        }

        setLoading(false);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow w-350px"
        >
            <h2 className="text-xl font-bold text-center mb-4">
            Reset Password
            </h2>

            <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded mb-3"
            onChange={handleChange}
            required
            />

            <input
            type="text"
            name="token"
            placeholder="Token"
            className="w-full p-3 border rounded mb-3"
            onChange={handleChange}
            required
            />

            <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full p-3 border rounded mb-4"
            onChange={handleChange}
            required
            />

            <button className="w-full bg-green-600 text-white p-3 rounded">
            {loading ? "Resetting..." : "Reset Password"}
            </button>

            {msg && <p className="text-center mt-4 text-sm">{msg}</p>}
        </form>
        </div>
    );
}