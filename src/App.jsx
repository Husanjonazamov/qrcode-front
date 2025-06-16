import { React, useState, useEffect } from "react";
import SideBar from "./components/Sidebar/Sidebar";
import MainContent from "./components/Main/Main"
import Cards from "./components/Cards/Cards";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
};

export default App;






// // App.jsx

// import LoginPage from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import Navbar from "./components/Navbar";

// function AppContent() {
//   const location = useLocation();
//   const hideNavbarOn = ['/']
//   return (
//     <>
//       {!hideNavbarOn.includes(location.pathname) && <Navbar />}
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </>
//   );
// }


// function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }


// export default App;