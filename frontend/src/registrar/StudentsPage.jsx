import React, { useState } from 'react';
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiEye, FiDownload, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const StudentsPage = () => {
  // Enhanced sample student data
  const [students, setStudents] = useState([
    {
      id: 'RU2023001',
      name: 'Abel Tesfaye',
      program: 'BSc Computer Science',
      department: 'Computer Science',
      college: 'Engineering and Technology',
      status: 'Verfied',
      cgpa: '3.75',
      enrollmentDate: '2023-09-15',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 'RU2023002',
      name: 'Meron Girma',
      program: 'MBA',
      department: 'Business Administration',
      college: 'Business and Economics',
      status: 'Verfied',
      cgpa: '3.92',
      enrollmentDate: '2021-09-10',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 'RU2023003',
      name: 'Yohannes Bekele',
      program: 'BSc Nursing',
      department: 'Nursing',
      college: 'Health Science',
      status: 'Verfied',
      cgpa: '3.45',
      enrollmentDate: '2023-09-20',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 'RU2023004',
      name: 'Selamawit Abebe',
      program: 'PhD Psychology',
      department: 'Psychology',
      college: 'Social Science',
      status: 'Pending',
      cgpa: '3.10',
      enrollmentDate: '2020-09-05',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: 'RU2023005',
      name: 'Dawit Kebede',
      program: 'BSc Civil Engineering',
      department: 'Civil Engineering',
      college: 'Engineering and Technology',
      status: 'Verfied',
      cgpa: '3.68',
      enrollmentDate: '2023-09-18',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: 'RU2023006',
      name: 'Eyerusalem Tadesse',
      program: 'LLB Law',
      department: 'Law',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.55',
      enrollmentDate: '2023-09-12',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    {
      id: 'RU2023007',
      name: 'Tewodros Assefa',
      program: 'BSc Electrical Engineering',
      department: 'Electrical Engineering',
      college: 'Engineering and Technology',
      status: 'Verfied',
      cgpa: '3.20',
      enrollmentDate: '2023-09-22',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    {
      id: 'RU2023008',
      name: 'Hana Mohammed',
      program: 'BSc Accounting',
      department: 'Accounting',
      college: 'Business and Economics',
      status: 'Verfied',
      cgpa: '3.85',
      enrollmentDate: '2023-09-14',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
    },
    {
      id: 'RU2023009',
      name: 'Kebede Hailu',
      program: 'BSc Mechanical Engineering',
      department: 'Mechanical Engineering',
      college: 'Engineering and Technology',
      status: 'Pending',
      cgpa: '2.95',
      enrollmentDate: '2023-09-16',
      avatar: 'https://randomuser.me/api/portraits/men/9.jpg'
    },
    {
      id: 'RU2023010',
      name: 'Alemitu Fekadu',
      program: 'BSc Public Health',
      department: 'Public Health',
      college: 'Health Science',
      status: 'Verfied',
      cgpa: '3.60',
      enrollmentDate: '2023-09-19',
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
    },
    {
      id: 'RU2023011',
      name: 'Getachew Worku',
      program: 'BSc Software Engineering',
      department: 'Computer Science',
      college: 'Engineering and Technology',
      status: 'Verfied',
      cgpa: '3.72',
      enrollmentDate: '2023-09-17',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
    },
    {
      id: 'RU2023012',
      name: 'Zewditu Lemma',
      program: 'BA Economics',
      department: 'Economics',
      college: 'Business and Economics',
      status: 'Verfied',
      cgpa: '3.88',
      enrollmentDate: '2021-09-08',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    {
      id: 'RU2023013',
      name: 'Ashenafi Mengistu',
      program: 'BSc Architecture',
      department: 'Architecture',
      college: 'Engineering and Technology',
      status: 'Verfied',
      cgpa: '3.40',
      enrollmentDate: '2023-09-21',
      avatar: 'https://randomuser.me/api/portraits/men/13.jpg'
    },
    {
      id: 'RU2023014',
      name: 'Birtukan Solomon',
      program: 'BSc Pharmacy',
      department: 'Pharmacy',
      college: 'Health Science',
      status: 'Pending',
      cgpa: '2.80',
      enrollmentDate: '2023-09-15',
      avatar: 'https://randomuser.me/api/portraits/women/14.jpg'
    },
    {
      id: 'RU2023015',
      name: 'Mekonnen Alemu',
      program: 'BSc Chemical Engineering',
      department: 'Chemical Engineering',
      college: 'Engineering and Technology',
      status: 'Verfied',
      cgpa: '3.65',
      enrollmentDate: '2023-09-18',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg'
    },
    {
      id: 'RU2023016',
      name: 'Wubit Abate',
      program: 'BA English Literature',
      department: 'English',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.50',
      enrollmentDate: '2023-09-16',
      avatar: 'https://randomuser.me/api/portraits/women/16.jpg'
    },
    {
      id: 'RU2023017',
      name: 'Girma Tsegaye',
      program: 'BSc Information Systems',
      department: 'Information Science',
      college: 'Engineering and Technology',
      status: 'Verfied',
      cgpa: '3.30',
      enrollmentDate: '2023-09-20',
      avatar: 'https://randomuser.me/api/portraits/men/17.jpg'
    },
    {
      id: 'RU2023018',
      name: 'Meseret Demissie',
      program: 'BSc Midwifery',
      department: 'Midwifery',
      college: 'Health Science',
      status: 'Verfied',
      cgpa: '3.75',
      enrollmentDate: '2023-09-14',
      avatar: 'https://randomuser.me/api/portraits/women/18.jpg'
    },
    {
      id: 'RU2023019',
      name: 'Tadesse Gebre',
      program: 'BSc Food Technology',
      department: 'Food Science',
      college: 'Agriculture and Natural Resource',
      status: 'Verfied',
      cgpa: '3.25',
      enrollmentDate: '2023-09-19',
      avatar: 'https://randomuser.me/api/portraits/men/19.jpg'
    },
    {
      id: 'RU2023020',
      name: 'Hirut Wolde',
      program: 'BA Sociology',
      department: 'Sociology',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.90',
      enrollmentDate: '2021-09-12',
      avatar: 'https://randomuser.me/api/portraits/women/20.jpg'
    },
    {
      id: 'RU2023021',
      name: 'Fikru Teshome',
      program: 'BSc Biotechnology',
      department: 'Biotechnology',
      college: 'Natural and Computational Science',
      status: 'Verfied',
      cgpa: '3.60',
      enrollmentDate: '2023-09-17',
      avatar: 'https://randomuser.me/api/portraits/men/21.jpg'
    },
    {
      id: 'RU2023022',
      name: 'Aster Getahun',
      program: 'BSc Banking and Finance',
      department: 'Banking and Finance',
      college: 'Business and Economics',
      status: 'Verfied',
      cgpa: '3.45',
      enrollmentDate: '2023-09-15',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
    },
    {
      id: 'RU2023023',
      name: 'Yared Mekonnen',
      program: 'BSc Geology',
      department: 'Geology',
      college: 'Natural and Computational Science',
      status: 'Verfied',
      cgpa: '3.35',
      enrollmentDate: '2023-09-21',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg'
    },
    {
      id: 'RU2023024',
      name: 'Rahel Assefa',
      program: 'BSc Hotel Management',
      department: 'Hotel and Tourism Management',
      college: 'Business and Economics',
      status: 'Verfied',
      cgpa: '3.55',
      enrollmentDate: '2023-09-18',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg'
    },
    {
      id: 'RU2023025',
      name: 'Solomon Girma',
      program: 'BSc Statistics',
      department: 'Statistics',
      college: 'Natural and Computational Science',
      status: 'Verfied',
      cgpa: '3.70',
      enrollmentDate: '2023-09-16',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg'
    },
    {
      id: 'RU2023026',
      name: 'Genet Lemma',
      program: 'BA Political Science',
      department: 'Political Science',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.65',
      enrollmentDate: '2023-09-19',
      avatar: 'https://randomuser.me/api/portraits/women/26.jpg'
    },
    {
      id: 'RU2023027',
      name: 'Bekele Abebe',
      program: 'BSc Environmental Science',
      department: 'Environmental Science',
      college: 'Natural and Computational Science',
      status: 'Verfied',
      cgpa: '3.40',
      enrollmentDate: '2023-09-20',
      avatar: 'https://randomuser.me/api/portraits/men/27.jpg'
    },
    {
      id: 'RU2023028',
      name: 'Marta Tesfaye',
      program: 'BSc Marketing',
      department: 'Marketing Management',
      college: 'Business and Economics',
      status: 'Verfied',
      cgpa: '3.50',
      enrollmentDate: '2023-09-17',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    {
      id: 'RU2023029',
      name: 'Assefa Wolde',
      program: 'BSc Physics',
      department: 'Physics',
      college: 'Natural and Computational Science',
      status: 'Verfied',
      cgpa: '3.75',
      enrollmentDate: '2023-09-15',
      avatar: 'https://randomuser.me/api/portraits/men/29.jpg'
    },
    {
      id: 'RU2023030',
      name: 'Tigist Hailu',
      program: 'BSc Psychology',
      department: 'Psychology',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.60',
      enrollmentDate: '2023-09-18',
      avatar: 'https://randomuser.me/api/portraits/women/30.jpg'
    },
    {
      id: 'RU2023031',
      name: 'Desta Mulugeta',
      program: 'BSc Mathematics',
      department: 'Mathematics',
      college: 'Natural and Computational Science',
      status: 'Verfied',
      cgpa: '3.85',
      enrollmentDate: '2023-09-16',
      avatar: 'https://randomuser.me/api/portraits/men/31.jpg'
    },
    {
      id: 'RU2023032',
      name: 'Alemnesh Bekele',
      program: 'BA History',
      department: 'History',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.45',
      enrollmentDate: '2023-09-19',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 'RU2023033',
      name: 'Yohannes Tadesse',
      program: 'BSc Chemistry',
      department: 'Chemistry',
      college: 'Natural and Computational Science',
      status: 'Verfied',
      cgpa: '3.55',
      enrollmentDate: '2023-09-17',
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg'
    },
    {
      id: 'RU2023034',
      name: 'Sara Mohammed',
      program: 'BSc Management',
      department: 'Management',
      college: 'Business and Economics',
      status: 'Verfied',
      cgpa: '3.65',
      enrollmentDate: '2023-09-20',
      avatar: 'https://randomuser.me/api/portraits/women/34.jpg'
    },
    {
      id: 'RU2023035',
      name: 'Teshome Lemma',
      program: 'BSc Biology',
      department: 'Biology',
      college: 'Natural and Computational Science',
      status: 'Verfied',
      cgpa: '3.70',
      enrollmentDate: '2023-09-18',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg'
    },
    {
      id: 'RU2023036',
      name: 'Mihret Abebe',
      program: 'BA Geography',
      department: 'Geography',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.50',
      enrollmentDate: '2023-09-16',
      avatar: 'https://randomuser.me/api/portraits/women/36.jpg'
    },
    {
      id: 'RU2023037',
      name: 'Getnet Hailu',
      program: 'BSc Animal Science',
      department: 'Animal Science',
      college: 'Agriculture and Natural Resource',
      status: 'Verfied',
      cgpa: '3.40',
      enrollmentDate: '2023-09-19',
      avatar: 'https://randomuser.me/api/portraits/men/37.jpg'
    },
    {
      id: 'RU2023038',
      name: 'Elsa Tadesse',
      program: 'BSc Horticulture',
      department: 'Horticulture',
      college: 'Agriculture and Natural Resource',
      status: 'Verfied',
      cgpa: '3.60',
      enrollmentDate: '2023-09-17',
      avatar: 'https://randomuser.me/api/portraits/women/38.jpg'
    },
    {
      id: 'RU2023039',
      name: 'Kassahun Gebre',
      program: 'BSc Forestry',
      department: 'Forestry',
      college: 'Agriculture and Natural Resource',
      status: 'Verfied',
      cgpa: '3.45',
      enrollmentDate: '2023-09-20',
      avatar: 'https://randomuser.me/api/portraits/men/39.jpg'
    },
    {
      id: 'RU2023040',
      name: 'Bethelhem Solomon',
      program: 'BSc Natural Resource Management',
      department: 'Natural Resource Management',
      college: 'Agriculture and Natural Resource',
      status: 'Verfied',
      cgpa: '3.55',
      enrollmentDate: '2023-09-18',
      avatar: 'https://randomuser.me/api/portraits/women/40.jpg'
    },
    {
      id: 'RU2023041',
      name: 'Abebe Kebede',
      program: 'BSc Veterinary Medicine',
      department: 'Veterinary Medicine',
      college: 'Agriculture and Natural Resource',
      status: 'Verfied',
      cgpa: '3.65',
      enrollmentDate: '2023-09-16',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    {
      id: 'RU2023042',
      name: 'Zeritu Hailu',
      program: 'BSc Agro-economics',
      department: 'Agro-economics',
      college: 'Agriculture and Natural Resource',
      status: 'Verfied',
      cgpa: '3.50',
      enrollmentDate: '2023-09-19',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg'
    },
    {
      id: 'RU2023043',
      name: 'Mulugeta Assefa',
      program: 'BSc Plant Science',
      department: 'Plant Science',
      college: 'Agriculture and Natural Resource',
      status: 'Verfied',
      cgpa: '3.40',
      enrollmentDate: '2023-09-17',
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg'
    },
    {
      id: 'RU2023044',
      name: 'Hana Demissie',
      program: 'BSc Soil and Water Conservation',
      department: 'Soil and Water Conservation',
      college: 'Agriculture and Natural Resource',
      status: 'Verfied',
      cgpa: '3.60',
      enrollmentDate: '2023-09-20',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 'RU2023045',
      name: 'Girma Tesfaye',
      program: 'BSc Coffee Science and Technology',
      department: 'Coffee Science and Technology',
      college: 'Agriculture and Natural Resource',
      status: 'Verfied',
      cgpa: '3.75',
      enrollmentDate: '2023-09-18',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 'RU2023046',
      name: 'Meskerem Abate',
      program: 'BA Civics and Ethical Studies',
      department: 'Civics and Ethical Studies',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.55',
      enrollmentDate: '2023-09-16',
      avatar: 'https://randomuser.me/api/portraits/women/46.jpg'
    },
    {
      id: 'RU2023047',
      name: 'Temesgen Wolde',
      program: 'BA Special Needs Education',
      department: 'Special Needs and Inclusive Education',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.65',
      enrollmentDate: '2023-09-19',
      avatar: 'https://randomuser.me/api/portraits/men/47.jpg'
    },
    {
      id: 'RU2023048',
      name: 'Birtukan Mohammed',
      program: 'BA Curriculum and Instruction',
      department: 'Curriculum and Instruction',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.50',
      enrollmentDate: '2023-09-17',
      avatar: 'https://randomuser.me/api/portraits/women/48.jpg'
    },
    {
      id: 'RU2023049',
      name: 'Yared Assefa',
      program: 'BA Political Science and International Relations',
      department: 'Political Science and International Relations',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.70',
      enrollmentDate: '2023-09-20',
      avatar: 'https://randomuser.me/api/portraits/men/49.jpg'
    },
    {
      id: 'RU2023050',
      name: 'Selamawit Gebre',
      program: 'BA English Language and Literature',
      department: 'English Language and Literature',
      college: 'Social Science',
      status: 'Verfied',
      cgpa: '3.60',
      enrollmentDate: '2023-09-18',
      avatar: 'https://randomuser.me/api/portraits/women/50.jpg'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCollege, setSelectedCollege] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Get unique departments based on selected college
  const getFilteredDepartments = () => {
    if (selectedCollege === 'All') {
      // Get all unique departments across all colleges
      const allDepartments = new Set();
      students.forEach(student => allDepartments.add(student.department));
      return Array.from(allDepartments);
    }
    return Array.from(new Set(
      students
        .filter(student => student.college === selectedCollege)
        .map(student => student.department)
    ));
  };

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;
    const matchesCollege = selectedCollege === 'All' || student.college === selectedCollege;
    const matchesDepartment = selectedDepartment === 'All' || student.department === selectedDepartment;
    
    return matchesSearch && matchesStatus && matchesCollege && matchesDepartment;
  });

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Handle student deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      setStudents(students.filter(student => student.id !== id));
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
      {/* Enhanced Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white">Student Records Management</h2>
          <p className="text-blue-100 dark:text-blue-200">
            Comprehensive view and management of all student academic records
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white dark:bg-blue-600 text-blue-600 dark:text-white rounded-lg transition-all hover:bg-opacity-90 hover:shadow-md transform hover:-translate-y-0.5">
            <FiDownload className="mr-2" />
            <span>Export Data</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all hover:shadow-md transform hover:-translate-y-0.5">
            <FiPlus className="mr-2" />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      {/* Enhanced Search and Filter Bar */}
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

      {/* Enhanced Students Table */}
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
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentStudents.length > 0 ? (
                currentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={student.avatar} alt={student.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {student.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{student.program}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {student.college}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{student.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${parseFloat(student.cgpa)/4*100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                          {student.cgpa}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'Verfied' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        student.status === 'Pending' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        student.status === 'Suspended' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button 
                          className="p-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                          title="View Details"
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
                          onClick={() => handleDelete(student.id)}
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
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FiSearch className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">No students found</h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {searchTerm ? 'Try adjusting your search query' : 'No students match your current filters'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination */}
        {filteredStudents.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastStudent, filteredStudents.length)}
                  </span> of{' '}
                  <span className="font-medium">{filteredStudents.length}</span> students
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
    </div>
  );
};

export default StudentsPage;