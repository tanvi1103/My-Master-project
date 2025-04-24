import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './components/Pages/Home';
import About from './components/About';
import Contact from './components/Contact';
import StudentPortal from './components/StudentPortal';
import Login from './components/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import CertificateDetail from './components/CertificateDetail';

import UserManagement from "./components/Admin/UserManagement";
import ProdictManagement from "./components/Admin/ProdictManagement";
import OrderManagement from "./components/Admin/OrderManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from
 "./components/pages/AdminHomePages";

function App() {
  return (<>
 <Routes> 
   <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/student-portal" element={<StudentPortal />} />
        <Route path="/certificate/:id" element={<CertificateDetail />} />
        <Route path="/login" element={<Login />} />
                   <Route path="/admin-dashboard" element={<AdminDashboard />} />
  <Route path="/" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProdictManagement />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
      </Routes> 
</>)
}

export default App; 

// import React, { useEffect, useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import GraduateSearch from './pages/GraduateSearch';
// import AdminLogin from './pages/AdminLogin';
// import AdminDashboard from './pages/AdminDashboard';
// import ThemeToggle from './components/ThemeToggle';

// const App = () => {
//   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (theme === 'dark') {
//       root.classList.add('dark');
//     } else if (theme === 'light') {
//       root.classList.remove('dark');
//     } else {
//       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//       root.classList.toggle('dark', prefersDark);
//     }
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
//       <ThemeToggle theme={theme} setTheme={setTheme} />

//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/search" element={<GraduateSearch />} />
//         <Route path="/admin" element={<AdminLogin />} />
//         <Route path="/dashboard/*" element={<AdminDashboard />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;






// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import GraduateSearch from "./pages/GraduateSearch";
// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import AddGraduate from "./pages/AddGraduate";
// import ViewUpdateGraduates from "./pages/ViewUpdateGraduates";
// import ThemeProvider from "./components/ThemeProvider";
// import AdminSidebar from "./pages/AdminSidebar";
// import AdminLayout from "./components/AdminLayout";

// const App = () => {
//   return (
//     <ThemeProvider>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/search" element={<GraduateSearch />} />
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route
//           path="/admin"
//           element={
//             <AdminLayout>
//               <AdminDashboard />
//             </AdminLayout>
//           }
//         />

//         <Route
//           path="/admin/add-graduate"
//           element={
//             <AdminLayout>
//               <AddGraduate />
//             </AdminLayout>
//           }
//         />

//         <Route
//           path="/admin/view-graduates"
//           element={
//             <AdminLayout>
//               <ViewUpdateGraduates />
//             </AdminLayout>
//           }
//         />
//       </Routes>
//     </ThemeProvider>
//   );
// };

// export default App;
