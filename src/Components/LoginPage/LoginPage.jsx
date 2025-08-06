import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function LoginComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: "terrascope",
    password: "12345",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = async () => {
    if (!formData.username || !formData.password) {
      setError("Username and password are required.");
      return;
    }
  
    const validUsername = "terrascope";
    const validPassword = "12345";
  
    if (formData.username === validUsername && formData.password === validPassword) {
      localStorage.setItem("username", formData.username);
      navigate("/Dashboards");
    } else {
      setError("Invalid credentials. Please try again.");
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const authenticateUser = async (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          credentials.username === "user" &&
          credentials.password === "password"
        ) {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: "Invalid credentials" });
        }
      }, 1000);
    });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen authentication-background">
        <div className="w-full max-w-md border rounded-lg p-10 bg-white relative shadow-lg">
          <div className="mb-6">
            <p className="text-black text-4xl font-semibold font-mono mb-2">
              Member Login
            </p>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>

          <div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-medium"
              onClick={handleValidation}
            >
              Login
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default LoginComponent;