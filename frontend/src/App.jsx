// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/common/Navbar';
// import Home from './components/Pages/Home';
// import About from './components/About';
// import Contact from './components/Contact';
// import StudentPortal from './components/StudentPortal';
// import Login from './components/Login';
// import AdminDashboard from './components/Admin/AdminDashboard';
// import CertificateDetail from './components/CertificateDetail';

// import UserManagement from "./components/Admin/UserManagement";
// import ProdictManagement from "./components/Admin/ProdictManagement";
// import OrderManagement from "./components/Admin/OrderManagement";
// import EditProductPage from "./components/Admin/EditProductPage";
// import AdminLayout from './components/Admin/AdminLayout';
// import AdminHomePage from
//  "./components/pages/AdminHomePages";

// function App() {
//   return (<>
//  <Routes> 
//    <Route path="/" element={<Home />} /> 
//         <Route path="/about" element={<About />} /> 
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/student-portal" element={<StudentPortal />} />
//         <Route path="/certificate/:id" element={<CertificateDetail />} />
//         <Route path="/login" element={<Login />} />
//                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
//   <Route path="/" element={<AdminLayout />}>
//             <Route index element={<AdminHomePage />} />
//             <Route path="users" element={<UserManagement />} />
//             <Route path="products" element={<ProdictManagement />} />
//             <Route path="products/:id/edit" element={<EditProductPage />} />
//             <Route path="orders" element={<OrderManagement />} />
//           </Route>
//       </Routes> 
// </>)
// }


// export default App; 






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

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <ThemeProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<GraduateSearch />} />
        <Route path="/certificate/:id" element={<CertificateDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
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
