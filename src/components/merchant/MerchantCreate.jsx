import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function MerchantCreate() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showUpdateForm, setShowUpdateForm] = useState({
    show: false,
    id: null,
  });
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  const createMerchant = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setStatus("loading");

    try {
      const formData = new FormData(e.target);
      const basicData = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const response = await axios.post(
        "/api/v1/merchants/super-admin/create-merchant",
        basicData
      );

      setMessage({
        text:
          response.data?.message || "Merchant account created successfully!",
        type: "success",
      });

      setShowUpdateForm({ show: true, id: response.data?.merchant?._id });
      setFormValues({});
      e.target.reset();

      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      console.error(error);
      setMessage({
        text: error.response?.data?.message || "Failed to create merchant.",
        type: "error",
      });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 text-center flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create Merchant Account
        </h2>

        {message.text && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-sm text-center font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form
          onSubmit={createMerchant}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="merchant@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full flex items-center justify-center px-4 py-3 font-semibold rounded-lg transition duration-200 ${
                status === "loading"
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white`}
            >
              {status === "loading" ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create Merchant
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/admin"
            className="text-indigo-600 font-medium hover:underline transition"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
