import { useState } from "react";
import { forgotPassword } from "../services/auth.service";
export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        try {
        await forgotPassword(email);
        setMsg("✅ Check your email for reset token");
        } catch {
        setMsg("❌ Error occurred");
        }

        setLoading(false);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow w-87.5"
        >
            <h2 className="text-xl font-bold text-center mb-4">
            Forgot Password
            </h2>

            <input
            type="email"
            placeholder="Enter email"
            className="w-full p-3 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />

            <button className="w-full bg-blue-600 text-white p-3 rounded">
            {loading ? "Sending..." : "Send Code"}
            </button>

            {msg && <p className="text-center mt-4 text-sm">{msg}</p>}
        </form>
        </div>
    );
}