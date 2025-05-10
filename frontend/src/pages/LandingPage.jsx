import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Welcome to the Graduate Verification System
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center max-w-xl">
        Verify the graduation status of Bonga University students securely and easily. Start by searching for a graduate or log in as an administrator.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Search Graduate
        </Link>
        <Link
          to="/admin/login"
          className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition"
        >
          Admin Login
        </Link>
      </div>
    </main>
  );
};

export default LandingPage;