import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditGraduate = () => {
  const { certificateID } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    certificateID: '',
    firstName: '',
    middleName: '',
    lastName: '',
    college: '',
    department: '',
    gender: '',
    gstatus: '',
    program: '',
    startDate: '',
    endDate: '',
  });
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchGraduate = async () => {
      const res = await axios.get(`http://localhost:5000/api/admin/certificates/${certificateID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.data;
      setFormData(data);
    };
    fetchGraduate();
  }, [certificateID, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/api/admin/certificates/${certificateID}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigate('/admin/graduates'); // navigate back to the graduates list after update
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Edit Graduate</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="certificateID"
          value={formData.certificateID}
          onChange={handleChange}
          placeholder="Certificate ID"
          className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          required
        />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          required
        />
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          placeholder="Middle Name"
          className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          required
        />
        {/* College Select */}
        <select
          name="college"
          value={formData.college}
          onChange={handleChange}
          className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          required
        >
          <option value="">Select College</option>
          <option value="Engineering">Engineering</option>
          <option value="Business">Business</option>
          <option value="Health Science">Health Science</option>
          {/* Add more colleges as needed */}
        </select>
        {/* Department Select */}
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          required
        >
          <option value="">Select Department</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Accounting">Accounting</option>
          {/* Add more departments */}
        </select>
        {/* Gender Select */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {/* Status Select */}
        <select
          name="gstatus"
          value={formData.gstatus}
          onChange={handleChange}
          className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          required
        >
          <option value="">Select Status</option>
          <option value="Graduated">Graduated</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
        </select>
        {/* Program Select */}
        <select
          name="program"
          value={formData.program}
          onChange={handleChange}
          className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          required
        >
          <option value="">Select Program</option>
          <option value="BSc">BSc</option>
          <option value="MSc">MSc</option>
          <option value="PhD">PhD</option>
        </select>
        {/* Start and End Date */}
        <input
          type="date"
          name="startDate"
          value={formData.startDate ? formData.startDate.substring(0, 10) : ''}
          onChange={handleChange}
          placeholder="Start Date"
          className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate ? formData.endDate.substring(0, 10) : ''}
          onChange={handleChange}
          placeholder="End Date"
          className="p-2 rounded bg-gray-100 dark:bg-gray-800"
          required
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Graduate
        </button>
      </form>
    </div>
  );
};

export default EditGraduate;
