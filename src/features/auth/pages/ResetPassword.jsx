import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPasswordAPI } from "../api/auth.api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // 1. Validate link params
    if (!email || !token) {
      return setMessage("Invalid reset link ❌");
    }

    // 2. Validate inputs
    if (!password || !confirmPassword) {
      return setMessage("All fields are required ❌");
    }

    // 3. Password match
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match ❌");
    }

    // 4. Optional: password strength
    if (password.length < 6) {
      return setMessage("Password must be at least 6 characters ❌");
    }

    try {
      setLoading(true);

      await resetPasswordAPI({
        email,
        token,
        newPassword: password,
      });

      setMessage("Password reset successfully ✅");

      // redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(
        err?.message || "Something went wrong while resetting password ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className={`p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-500"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
};

export default ResetPassword;