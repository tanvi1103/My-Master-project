import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaMicrosoft, FaTwitter } from 'react-icons/fa';

const AdminLogin = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded border dark:bg-gray-700"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-center text-gray-600 dark:text-gray-400">or</div>

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