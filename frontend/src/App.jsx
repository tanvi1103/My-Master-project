import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import GraduateSearch from "./pages/GraduateSearch";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddGraduate from "./pages/AddGraduate";
import ViewUpdateGraduates from "./pages/ViewUpdateGraduates";
import ThemeProvider from "./pages/ThemeProvider";
import AdminSidebar from "./pages/AdminSidebar"; 
import AdminLayout from "./pages/AdminLayout";
import CertificateDetail from './components/CertificateDetail';
import EditGraduate from './pages/EditCertificate';
import axios from 'axios';
import BulkGraduateUpload from "./pages/BulkGraduateUpload";
import SingleGraduateForm from "./pages/SingleGraduateForm";
import UserSignup from "./pages/UserSignup";

import RegistrarDashboard from "./registrar/RegistrarDashboard ";
import RegistrarLayout from "./registrar/RegistrarLayout"; 
import StudentsPage from "./registrar/StudentsPage";
import UserLogin from "./pages/UserLogin";
import ForgotPassword from "./pages/ResetPassword";
import UserLayout from "./user/UserLayout";
import RegistrarLogin from "./registrar/RegistrarLogin";
import { useState } from "react";
import { useEffect } from "react";
import ViewAllGraduate from "./registrar/ViewAllGraguate";
import RegistrarEditGraduate from "./registrar/RegistrarEditGraduate";



axios.defaults.withCredentials = true;

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

      useEffect(() => {
      const fetchCurrentUser = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/auth/me', {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
          });
          setCurrentUser(res.data);
        } catch (err) {
          console.error('Error fetching current user:', err);
          const timer = setTimeout(() => {
            navigate('/registrar/login');
          }, 2000);
          return () => clearTimeout(timer);
        }
      };
      fetchCurrentUser();
    }, []);


  return (
    <ThemeProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* <Route path="/externalUser" element={<UserLayout />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/search" element={<GraduateSearch />} />
        {/* <Route path="/certificate/:id" element={<CertificateDetail />} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/registrar/login" element={<RegistrarLogin />} />

{/* External user routes */}
        <Route path="/externalUser" element={
          <UserLayout>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Welcome To The Bonga University Graduate Verification System!</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Here's an overview of your recent activities and important notifications.
              </p>
              <GraduateSearch />
            </div>
          </UserLayout>
        } />
        <Route path="/externalUser/certificate/:id" element={
          <UserLayout>
            <CertificateDetail />
          </UserLayout>
        } />

        {/* registrar routes */}
        <Route path="/registrar" element={
              <RegistrarLayout currentUser={currentUser}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Welcome back!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Here's an overview of your recent activities and important notifications.
                </p>
                {/* Add your dashboard content here */}
              </div>
            </RegistrarLayout>
        } />
``
        <Route path="/registrar/verifyunverified" element={
              <RegistrarLayout currentUser={currentUser}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Welcome back!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Here's an overview of your recent activities and important notifications.
                </p>
                {/* Add your dashboard content here */}
              </div>
            </RegistrarLayout>
        } />

        <Route path="/registrar/viewverified" element={
              <RegistrarLayout currentUser={currentUser}>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Welcome back!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Here's an overview of your recent activities and important notifications.
                </p>
                {/* Add your dashboard content here */}
              </div>
            </RegistrarLayout>
        } />

        <Route path="/registrar/viewallcertificates" element={
              <RegistrarLayout currentUser={currentUser}>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Welcome back!</h3>
                <ViewAllGraduate />
                {/* Add your dashboard content here */}
              </div>
            </RegistrarLayout>
        } />
        <Route
          path="/registrar/edit-graduate/:certificateID"
          element={
            <RegistrarLayout>
              <RegistrarEditGraduate />
            </RegistrarLayout>
          }
        />

        <Route path="/registrar/studentRecords" element={
                           <RegistrarLayout currentUser={currentUser}>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Welcome back!</h3>
                <StudentsPage />
                {/* Add your dashboard content here */}
              </div>
            </RegistrarLayout>
        } />



       {/* admin routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />


        <Route
          path="/admin/add-graduate"
          element={
            <AdminLayout>
              <AddGraduate />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/add-graduate/single"
          element={
            <AdminLayout>
              <SingleGraduateForm />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/add-graduate/file"
          element={
            <AdminLayout>
              <BulkGraduateUpload />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/view-graduates"
          element={
            <AdminLayout>
              <ViewUpdateGraduates />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/edit-graduate/:certificateID"
          element={
            <AdminLayout>
              <EditGraduate />
            </AdminLayout>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
