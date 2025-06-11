import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function SuperAdminLogin() {
  const [email, setEmail] = useState("superadmin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      const accessToken = response.data?.data?.accessToken;
      const refreshToken = response.data?.data?.refreshToken;
      const adminId = response.data?.data?.admin?._id;

      if (accessToken && refreshToken && adminId) {
        // ✅ Save tokens and user ID in cookies
        Cookies.set("accessToken", accessToken, { expires: 7 });
        Cookies.set("refreshToken", refreshToken, { expires: 7 });
        Cookies.set("userId", adminId, { expires: 7 });

        // ✅ Save auth state in localStorage
        localStorage.setItem("superAdminAuth", "true");

        // ✅ Navigate
        navigate("/super-admin");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Super Admin Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your super admin email"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
