import { FcGoogle } from "react-icons/fc";
import { FaApple, FaMicrosoft, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Initialized useNavigate to redirect after login

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        adminCredentials
      ); // Admin login API call
      console.log("Admin logged in:", response.data);

      // Store token in localStorage for admin authorization
      localStorage.setItem("adminToken", response.data.token);

      Swal.fire("Success", "🎉 Admin Login Successful!", "success");
      navigate("/admin"); // Redirect to Admin Dashboard upon successful login
    } catch (error) {
      console.error("Admin login failed:", error);
      Swal.fire("Error", "❌ Admin Login Failed", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials({ ...adminCredentials, [name]: value });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form className="space-y-4" onSubmit={handleAdminLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={adminCredentials.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={adminCredentials.password}
            onChange={handleInputChange}
            required
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-600 dark:text-gray-400">
          or
        </div>

        <div className="flex flex-col space-y-2">
          <button className="flex items-center justify-center gap-2 py-2 bg-gray-100 dark:bg-gray-700 rounded">
            <FcGoogle /> Continue with Google
          </button>
          <button className="flex items-center justify-center gap-2 py-2 bg-gray-100 dark:bg-gray-700 rounded">
            <FaMicrosoft className="text-blue-700" /> Continue with Microsoft
          </button>
          <button className="flex items-center justify-center gap-2 py-2 bg-gray-100 dark:bg-gray-700 rounded">
            <FaApple /> Continue with Apple
          </button>
          <button className="flex items-center justify-center gap-2 py-2 bg-gray-100 dark:bg-gray-700 rounded">
            <FaTwitter className="text-blue-400" /> Continue with Twitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
