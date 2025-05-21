// import axios from "axios";
// import { useEffect, useState } from "react";

// const RegistrarDashBoard = () => {
//   const api = `http://localhost:5000/api/admin`;
//   const [certificates, setCertificates] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [collegeCount, setCollegeCount] = useState(0);
//   const [departmentCount, setDepartmentCount] = useState(0);

//   useEffect(() => {
//     const fetchCertificates = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${api}/certificates`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log(response.data);
//         setCertificates(response.data);

//         if (response.data && response.data.length > 0) {
//           // Extract all unique colleges
//           const colleges = [...new Set(response.data.map(cert => cert.college))];
//           console.log("Colleges:", colleges);
//           console.log("Number of colleges:", colleges.length);

//           // Extract all unique departments
//           const departments = [...new Set(response.data.map(cert => cert.department))];
//           console.log("Departments:", departments);
//           console.log("Number of departments:", departments.length);

//           // Set the counts
//           setCollegeCount(colleges.length);
//           setDepartmentCount(departments.length);

//           // Counts per college/department (for debugging)
//           const collegeCounts = response.data.reduce((acc, cert) => {
//             acc[cert.college] = (acc[cert.college] || 0) + 1;
//             return acc;
//           }, {});
//           console.log("Certificates per college:", collegeCounts);

//           const departmentCounts = response.data.reduce((acc, cert) => {
//             acc[cert.department] = (acc[cert.department] || 0) + 1;
//             return acc;
//           }, {});
//           console.log("Certificates per department:", departmentCounts);
//         }

//         setIsLoading(false);
//       } catch (err) {
//         console.error("Error fetching certificates:", err);
//         setError("Failed to fetch certificates. Please try again later.");
//         setIsLoading(false);
//       }
//     };

//     fetchCertificates();
//   }, [api]);

//   const [showRecentList, setShowRecentList] = useState(false);

//   const recentCount = certificates.filter(cert => {
//     const createdDate = new Date(cert.createdAt);
//     const now = new Date();
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(now.getDate() - 7);
//     return createdDate >= sevenDaysAgo;
//   }).length;

//   const last5 = certificates.slice(-5).reverse();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">Total Certificates In System</h2>
//       <p className="text-lg mb-4">{certificates.length}</p>

//       <h2 className="text-xl font-bold mb-2">Total Colleges In System</h2>
//       <p className="text-lg mb-4">{collegeCount}</p>

//       <h2 className="text-xl font-bold mb-2">Total Departments In System</h2>
//       <p className="text-lg">{departmentCount}</p>
//    <h2 className="text-xl font-bold mb-2">Certificates Issued This Year</h2>
// <p className="text-lg">
//   {
//     certificates.filter(
//       cert => new Date(cert.endDate).getFullYear() === new Date().getFullYear()
//     ).length
//   }
// </p>

// <h2 className="text-xl font-bold mb-2">Certificates Issued Last Year</h2>
// <p className="text-lg">
//   {
//     certificates.filter(
//       cert => new Date(cert.endDate).getFullYear() === new Date().getFullYear() - 1
//     ).length
//   }
// </p>
//  <div>
//       <h2
//         className="text-xl font-bold mb-2 cursor-pointer text-blue-600 hover:underline"
//         onClick={() => setShowRecentList(!showRecentList)}
//       >
//         {showRecentList ? "Last 5 Added Certificates" : "Recently Added Certificates"}
//       </h2>

//       {showRecentList ? (
//         <ul className="list-disc pl-4">
//           {last5.map((cert, index) => (
//             <li key={index}>
//               {cert.firstName} {cert.middleName} {cert.lastName}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-lg">{recentCount}</p>
//       )}
//     </div>

//     <button
//   onClick={() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }}
//   className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
// >
//   Refresh Data
// </button>

//     </div>
//   );
// };

// export default RegistrarDashBoard;

import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { FiMoon, FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const RegistrarDashBoard = () => {
  const api = `http://localhost:5000/api/admin`;
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collegeCount, setCollegeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [collegeData, setCollegeData] = useState({});
  const [departmentData, setDepartmentData] = useState({});
  // Add at the top of your component
  const [toggledCard, setToggledCard] = useState(null);

  // Theme state management
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  // Toggle theme
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  // Apply theme class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${api}/certificates`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCertificates(response.data);

        if (response.data?.length > 0) {
          const colleges = [
            ...new Set(response.data.map((cert) => cert.college)),
          ];
          setCollegeCount(colleges.length);

          const departments = [
            ...new Set(response.data.map((cert) => cert.department)),
          ];
          setDepartmentCount(departments.length);

          const collegeCounts = response.data.reduce((acc, cert) => {
            acc[cert.college] = (acc[cert.college] || 0) + 1;
            return acc;
          }, {});
          setCollegeData(collegeCounts);

          const departmentCounts = response.data.reduce((acc, cert) => {
            acc[cert.department] = (acc[cert.department] || 0) + 1;
            return acc;
          }, {});
          setDepartmentData(departmentCounts);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setError("Failed to fetch certificates. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, [api]);

  // Chart data preparation with theme-aware colors
  const getChartColors = () => {
    return darkMode
      ? {
          textColor: "#E5E7EB",
          gridColor: "#374151",
          background: "#1F2937",
          cardBg: "#111827",
          borderColor: "#4B5563",
        }
      : {
          textColor: "#374151",
          gridColor: "#E5E7EB",
          background: "#FFFFFF",
          cardBg: "#F9FAFB",
          borderColor: "#E5E7EB",
        };
  };

  const colors = getChartColors();
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: colors.textColor,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: colors.gridColor,
        },
        ticks: {
          color: colors.textColor,
        },
      },
      y: {
        grid: {
          color: colors.gridColor,
        },
        ticks: {
          color: colors.textColor,
        },
        beginAtZero: true,
      },
    },
  };

  const collegeChartData = {
    labels: Object.keys(collegeData),
    datasets: [
      {
        label: "Certificates by College",
        data: Object.values(collegeData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8AC24A",
          "#607D8B",
          "#E91E63",
          "#9C27B0",
        ],
        borderWidth: 1,
      },
    ],
  };

  const departmentChartData = {
    labels: Object.keys(departmentData),
    datasets: [
      {
        label: "Certificates by Department",
        data: Object.values(departmentData),
        backgroundColor: [
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8AC24A",
          "#607D8B",
          "#E91E63",
          "#9C27B0",
        ],
        borderWidth: 1,
      },
    ],
  };

  const yearlyData = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Certificates per Year",
        data: [
          certificates.filter(
            (cert) => new Date(cert.endDate).getFullYear() === 2020
          ).length,
          certificates.filter(
            (cert) => new Date(cert.endDate).getFullYear() === 2021
          ).length,
          certificates.filter(
            (cert) => new Date(cert.endDate).getFullYear() === 2022
          ).length,
          certificates.filter(
            (cert) => new Date(cert.endDate).getFullYear() === 2023
          ).length,
          certificates.filter(
            (cert) => new Date(cert.endDate).getFullYear() === 2024
          ).length,
        ],
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
        fill: true,
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-8 text-xl dark:bg-gray-900 dark:text-white">
        {error}
      </div>
    );
  }

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Registrar Dashboard
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <span className="flex items-center">
              <FiSun size={20} className="mr-2" /> Light Mode
            </span>
          ) : (
            <span className="flex items-center">
              <FiMoon size={20} className="mr-2" /> Dark Mode
            </span>
          )}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Certificates",
            value: certificates.length,
            color: "blue",
            key: "certificates",
            link: "/registrar/viewallcertificates",
          },
          {
            title: "Colleges",
            value: collegeCount,
            color: "green",
            key: "colleges",
          },
          {
            title: "Departments",
            value: departmentCount,
            color: "purple",
            key: "departments",
          },
          {
            title: "This Year",
            value: certificates.filter(
              (cert) =>
                new Date(cert.endDate).getFullYear() ===
                new Date().getFullYear()
            ).length,
            color: "orange",
            key: "thisYear",
          },
        ].map((card, index) => {
          const CardContent = (
            <div
              className={`p-6 rounded-lg shadow-md transition-colors duration-300 cursor-pointer ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3
                className={`text-gray-500 font-medium ${
                  darkMode ? "text-gray-400" : ""
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`text-3xl font-bold ${
                  card.color === "blue"
                    ? "text-blue-600"
                    : card.color === "green"
                    ? "text-green-600"
                    : card.color === "purple"
                    ? "text-purple-600"
                    : "text-orange-600"
                }`}
              >
                {card.value}
              </p>
            </div>
          );
          // Certificates card navigates, others toggle
          if (card.link) {
            return (
              <Link to={card.link} key={card.key}>
                {CardContent}
              </Link>
            );
          }
          return (
            <div
              key={card.key}
              onClick={() =>
                setToggledCard(toggledCard === card.key ? null : card.key)
              }
            >
              {CardContent}
            </div>
          );
        })}
      </div>

      {/* Toggled Lists */}
      {toggledCard === "colleges" && (
        <div
          className={`mb-6 p-6 rounded-xl shadow-lg border transition-colors duration-300 ${
            darkMode
              ? "bg-gray-900 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-green-500 rounded-sm"></span>
            Colleges List
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[...new Set(certificates.map((cert) => cert.college))]
              .sort()
              .map((college, idx) => (
                <div
                  key={idx}
                  className={`flex items-center px-4 py-2 rounded-lg shadow-sm border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <span className="font-semibold text-green-600 dark:text-green-400 mr-2">
                    {idx + 1}.
                  </span>
                  <span className="truncate">{college}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {toggledCard === "departments" && (
        <div
          className={`mb-6 p-6 rounded-xl shadow-lg border transition-colors duration-300 ${
            darkMode
              ? "bg-gray-900 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-purple-500 rounded-sm"></span>
            Departments List
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[...new Set(certificates.map((cert) => cert.department))]
              .sort()
              .map((dept, idx) => (
                <div
                  key={idx}
                  className={`flex items-center px-4 py-2 rounded-lg shadow-sm border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <span className="font-semibold text-purple-600 dark:text-purple-400 mr-2">
                    {idx + 1}.
                  </span>
                  <span className="truncate">{dept}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {toggledCard === "thisYear" && (
        <div
          className={`mb-6 p-6 rounded-xl shadow-lg border transition-colors duration-300 ${
            darkMode
              ? "bg-gray-900 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-6 bg-orange-500 rounded-sm"></span>
            Certificates Issued This Year
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                    College
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider">
                    End Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {certificates
                  .filter(
                    (cert) =>
                      new Date(cert.endDate).getFullYear() ===
                      new Date().getFullYear()
                  )
                  .map((cert, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0
                          ? darkMode
                            ? "bg-gray-800"
                            : "bg-gray-50"
                          : ""
                      }`}
                    >
                      <td className="px-4 py-2 whitespace-nowrap font-medium">
                        {cert.firstName} {cert.middleName} {cert.lastName}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {cert.college}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {cert.department}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {new Date(cert.endDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div
          className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3
            className={`text-xl font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Certificates by College
          </h3>
          <div className="h-80">
            <Bar data={collegeChartData} options={chartOptions} />
          </div>
        </div>

        <div
          className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3
            className={`text-xl font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Certificates by Department
          </h3>
          <div className="h-80">
            <Pie data={departmentChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Yearly Trend */}
      <div
        className={`p-6 rounded-lg shadow-md mb-8 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Yearly Certificate Trend
        </h3>
        <div className="h-96">
          <Line data={yearlyData} options={chartOptions} />
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className={`p-6 rounded-lg shadow-md transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Recent Certificates
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <tr>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Name
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  College
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Department
                </th>
                <th
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                darkMode
                  ? "divide-gray-700 bg-gray-800"
                  : "divide-gray-200 bg-white"
              }`}
            >
              {certificates
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map((cert, index) => (
                  <tr key={index}>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {cert.firstName} {cert.middleName} {cert.lastName}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {cert.college}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {cert.department}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {new Date(cert.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistrarDashBoard;
