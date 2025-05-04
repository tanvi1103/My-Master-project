import RegistrarLayout from './RegistrarLayout.jsx';

const RegistrarDashboard = () => {
  return (
    <RegistrarLayout>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Welcome back!</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Here's an overview of your recent activities and important notifications.
        </p>
        {/* Add your dashboard content here */}
      </div>
    </RegistrarLayout>
  );
};

export default RegistrarDashboard;