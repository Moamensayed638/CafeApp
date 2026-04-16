import { useState } from "react";
import { forgotPasswordAPI } from "../api/auth.api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      return setMessage("Email is required ❌");
    }

    try {
      setLoading(true);

      await forgotPasswordAPI(email);

      setMessage("Check your email for reset link 📧");
    } catch (err) {
      setMessage(err?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            disabled={loading}
            className={`p-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-500"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="mt-3 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;