import React, { useState } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiDownload, 
  FiPlus, 
  FiChevronLeft, 
  FiChevronRight, 
  FiX 
} from 'react-icons/fi';

const StudentsPage = () => {
  // Sample certificate data matching your schema
  const [certificates, setCertificates] = useState([
    {
      certificateID: 'RU2023001',
      firstName: 'Abel',
      middleName: 'T',
      lastName: 'Tesfaye',
      college: 'Engineering and Technology',
      department: 'Computer Science',
      program: 'BSc Computer Science',
      gstatus: 'Verified',
      cgpa: 3.75,
      gender: 'Male',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      startDate: '2020-09-15',
      endDate: '2024-06-15'
    },
    {
      certificateID: 'RU2023002',
      firstName: 'Meron',
      middleName: 'G',
      lastName: 'Girma',
      college: 'Business and Economics',
      department: 'Business Administration',
      program: 'MBA',
      gstatus: 'Verified',
      cgpa: 3.92,
      gender: 'Female',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      startDate: '2019-09-10',
      endDate: '2023-06-10'
    },
    // Add more sample data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCollege, setSelectedCollege] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const certificatesPerPage = 5;

  // Get full name
  const getFullName = (certificate) => {
    return `${certificate.firstName} ${certificate.middleName} ${certificate.lastName}`;
  };

  // Get unique departments based on selected college
  const getFilteredDepartments = () => {
    if (selectedCollege === 'All') {
      const allDepartments = new Set();
      certificates.forEach(cert => allDepartments.add(cert.department));
      return Array.from(allDepartments);
    }
    return Array.from(new Set(
      certificates
        .filter(cert => cert.college === selectedCollege)
        .map(cert => cert.department)
    ));
  };

  // Filter certificates based on search and filters
  const filteredCertificates = certificates.filter(cert => {
    const fullName = getFullName(cert).toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                         cert.certificateID.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || cert.gstatus === selectedStatus;
    const matchesCollege = selectedCollege === 'All' || cert.college === selectedCollege;
    const matchesDepartment = selectedDepartment === 'All' || cert.department === selectedDepartment;
    
    return matchesSearch && matchesStatus && matchesCollege && matchesDepartment;
  });

  // Pagination logic
  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
  const currentCertificates = filteredCertificates.slice(indexOfFirstCertificate, indexOfLastCertificate);
  const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage);

  // Handle certificate deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate record?')) {
      setCertificates(certificates.filter(cert => cert.certificateID !== id));
    }
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle college change - reset department filter
  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
    setSelectedDepartment('All');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white">Certificate Records Management</h2>
          <p className="text-blue-100 dark:text-blue-200">
            Comprehensive view and management of all certificate records
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white dark:bg-blue-600 text-blue-600 dark:text-white rounded-lg transition-all hover:bg-opacity-90 hover:shadow-md transform hover:-translate-y-0.5">
            <FiDownload className="mr-2" />
            <span>Export Data</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all hover:shadow-md transform hover:-translate-y-0.5">
            <FiPlus className="mr-2" />
            <span>Add New Certificate</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-11 transition-all duration-200 focus:shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-11 transition-all duration-200 focus:shadow-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* College Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-11 transition-all duration-200 focus:shadow-md"
              value={selectedCollege}
              onChange={handleCollegeChange}
            >
              <option value="All">All Colleges</option>
              <option value="Engineering and Technology">Engineering</option>
              <option value="Business and Economics">Business</option>
              <option value="Health Science">Health Science</option>
              <option value="Social Science">Social Science</option>
              <option value="Agriculture and Natural Resource">Agriculture</option>
              <option value="Natural and Computational Science">Natural Science</option>
            </select>
          </div>

          {/* Department Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-11 transition-all duration-200 focus:shadow-md"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              disabled={selectedCollege === 'All' && selectedDepartment === 'All'}
            >
              <option value="All">
                {selectedCollege === 'All' ? 'Select College First' : 'All Departments'}
              </option>
              {getFilteredDepartments().map(department => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  CGPA
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Study Period
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentCertificates.length > 0 ? (
                currentCertificates.map((cert) => (
                  <tr key={cert.certificateID} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={cert.photo} alt={getFullName(cert)} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {getFullName(cert)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {cert.certificateID}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{cert.program}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {cert.college}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{cert.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${(cert.cgpa/4)*100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                          {cert.cgpa.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cert.gstatus === 'Verified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        cert.gstatus === 'Pending' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {cert.gstatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {new Date(cert.startDate).toLocaleDateString()} - {new Date(cert.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button 
                          className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                          title="View Details"
                          onClick={() => {
                            setSelectedCertificate(cert);
                            setIsModalOpen(true);
                          }}
                        >
                          <FiEye className="h-5 w-5" />
                        </button>
                        <button 
                          className="p-2 text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 className="h-5 w-5" />
                        </button>
                        <button 
                          className="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                          onClick={() => handleDelete(cert.certificateID)}
                          title="Delete"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FiSearch className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">No certificates found</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {searchTerm ? 'Try adjusting your search query' : 'No certificates match your current filters'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredCertificates.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  Showing <span className="font-medium">{indexOfFirstCertificate + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastCertificate, filteredCertificates.length)}
                  </span> of{' '}
                  <span className="font-medium">{filteredCertificates.length}</span> certificates
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border flex items-center ${
                    currentPage === 1
                      ? 'border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <FiChevronLeft className="h-4 w-4 mr-1" />
                  <span>Previous</span>
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === number
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md border flex items-center ${
                    currentPage === totalPages
                      ? 'border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <span>Next</span>
                  <FiChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {isModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Graduate Details
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        className="h-16 w-16 rounded-full object-cover" 
                        src={selectedCertificate.photo} 
                        alt={getFullName(selectedCertificate)} 
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {getFullName(selectedCertificate)}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedCertificate.certificateID}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                      Academic Information
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Program:</span> {selectedCertificate.program}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Department:</span> {selectedCertificate.department}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">College:</span> {selectedCertificate.college}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">CGPA:</span> {selectedCertificate.cgpa.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                      Status Information
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Graduation Status:</span> 
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                          selectedCertificate.gstatus === 'Verified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          selectedCertificate.gstatus === 'Pending' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {selectedCertificate.gstatus}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Study Period:</span> 
                        {new Date(selectedCertificate.startDate).toLocaleDateString()} - {new Date(selectedCertificate.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Gender:</span> {selectedCertificate.gender}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                      Actions
                    </h4>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                        Generate Certificate
                      </button>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors">
                        View Transcript
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;