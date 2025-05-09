import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const departments = [
  "Mechanical engineering",
  "Civil Engineering",
  "Electrical and Computer Engineering",
  "Computer Science",
  "Biology",
  "Chemistry",
  "Mathematics",
  "Physics",
  "Sport Science",
  "Geology",
  "Statistics",
  "Animal Science",
  "Agricultural Economics",
  "Natural Resources Management",
  "Soil Resource and Watershed Management",
  "Horticulture ",
  "General Forestry",
  "Veterinary Medicine  ",
  "Coffee science and Technology",
  " Accounting and Finance",
  "Banking and Finance",
  "Business and Economics",
  "Economics",
  "Marketing Management ",
  "Management",
  "Public Administration Management",
  "Hotel and Tourism Management",
  "Public Health Department",
  "Pharmacy Department",
  "Nursing Department",
  "Midwifery Department",
  "English Language and Literature Department",
  "Geography and Environmental Studies Department",
  "History and Heritage Management Department",
  "Special Needs and Inclusive Education Department",
  "Sociology Department",
  "Psychology Department",
  "Law",
  "Curriculum and Instruction Department",
  "Social Anthropology Department",
  "Political Science and International Relations Department",
];

const GraduateSearch = () => {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    cgpa: "",
    department: "",
    gender: "",
    endDate: "",
  });

  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
  });
  const [academicDetails, setAcademicDetails] = useState({
    cgpa: "",
    department: "",
    endDate: "",
  });
  const nationalidurl = import.meta.env.VITE_NATIONAL_ID_ROUTE;
  useEffect(() => {
    const fetchPersonalDetails = async () => {
      if (nationalId.length >= 10) {
        // Basic validation for national ID length
        setIsFetching(true);
        setError("");
        try {
          // Replace with your actual National ID API endpoint
          const { data } = await axios.get(
            `http://localhost:7000/api/national-ids/nationalIdNumber`,
            {
              params: { nationalIdNumber: nationalId },
            }
          );

          if (data.success && data.nationalID) {
            setPersonalDetails({
              firstName: data.nationalID.firstName || "",
              middleName: data.nationalID.middleName || "",
              lastName: data.nationalID.lastName || "",
              gender: data.nationalID.gender || "",
            });
          } else {
            setError(data.error || "No record found with this national ID");
          }
        } catch (err) {
          setError(
            err.response?.data?.message ||
              "No record found with this national ID"
          );
        } finally {
          setIsFetching(false);
        }
      } else if (nationalId.length > 0 && nationalId.length !== 16) {
        setError("National ID must be 16 digits");
      }
    };

    const debounceTimer = setTimeout(fetchPersonalDetails, 500);
    return () => clearTimeout(debounceTimer);
  }, [nationalId]);

  const handleAcademicChange = (e) => {
    setAcademicDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNationalIdChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow numbers
    setNationalId(value);
    if (value.length !== 16) {
      setError(value.length > 0 ? "National ID must be 16 digits" : "");
    } else {
      setError("");
    }
  };

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setCertificate(null);
    setIsSearching(true);

    try {
      const searchParams = {
        ...personalDetails,
        ...academicDetails,
      };
      console.log("Search Params:", searchParams);
      const { data } = await axios.get(
        "http://localhost:5000/api/certificates/name",
        {
          params: searchParams,
        }
      );
      console.log("Search Result:", data);


      setCertificate(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSearching(false);
    }
  };

  const handleOpen = async () => {
    if (certificate) {
      console.log("Certificate ID:", certificate.certificateID
);

     await navigate(`/certificate/${certificate.certificateID}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 overflow-x-hidden">
      <div className="w-full max-w-full md:max-w-7xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Search Graduate
        </h2>

        {/* National ID Search Field */}
        <div className="mb-6">
          <label
            htmlFor="nationalId"
            className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Search by National ID (16 digits)
          </label>
          <input
            type="text"
            id="nationalId"
            name="nationalId"
            placeholder="Enter 16-digit National ID"
            value={nationalId}
            onChange={handleNationalIdChange}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
            maxLength={16}
          />
          {isFetching && (
            <p className="mt-2 text-blue-500">Searching national records...</p>
          )}
          {error && nationalId.length !== 16 && (
            <p className="mt-2 text-red-500">{error}</p>
          )}
        </div>

        {/* Personal Details (from National ID) */}
        {personalDetails.firstName && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Personal Details (from National ID)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  value={personalDetails.firstName}
                  readOnly
                  className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={personalDetails.middleName}
                  readOnly
                  className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  value={personalDetails.lastName}
                  readOnly
                  className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Gender
                </label>
                <input
                  type="text"
                  value={personalDetails.gender}
                  readOnly
                  className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Academic Details (for certificate search) */}
        {personalDetails.firstName && (
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  CGPA
                </label>
                <input
                  type="number"
                  name="cgpa"
                  value={academicDetails.cgpa}
                  onChange={handleAcademicChange}
                  min="2.00"
                  max="4.00"
                  step="0.01"
                  className="mt-1 p-2 w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Department
                </label>
                <select
                  name="department"
                  value={academicDetails.department}
                  onChange={handleAcademicChange}
                  className="mt-1 p-2 w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.sort((a, b)=>a.localeCompare(b)).map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Graduation Year
                </label>
                <select
                  name="endDate"
                  value={academicDetails.endDate}
                  onChange={handleAcademicChange}
                  className="mt-1 p-2 w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              disabled={!personalDetails.firstName || isSearching}
            >
              {isSearching ? "Searching..." : "Search Certificate"}
            </button>
          </form>
        )}

        {error && nationalId.length === 16 && (
          <p className="mt-4 text-red-600">{error}</p>
        )}

        {certificate && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Certificate Found</h3>
            <p>Full Name: {certificate.firstName} {certificate.middleName} {certificate.lastName}</p>
            <button
              onClick={handleOpen}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              View Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraduateSearch;
