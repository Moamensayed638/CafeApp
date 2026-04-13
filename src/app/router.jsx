import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* redirect from / to forgot-password */}
        <Route path="/" element={<Navigate to="/forgot-password" replace />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}