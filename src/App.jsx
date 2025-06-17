import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import LoginPage from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Cards from "./components/Cards/Cards";
import PdfPage from "./components/PdfPage/PdfPage";
import ViewPdfPage from "./components/ViewPdf/ViewsPdf";

// 🔒 Token tekshirish
const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (err) {
    return false;
  }
};

// 🛡️ Faqat login bo‘lsa ochiladigan sahifalar
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access");
  if (token && isTokenValid(token)) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}

// 🔄 Login redirect
function RedirectIfAuthenticated({ children }) {
  const token = localStorage.getItem("access");
  if (token && isTokenValid(token)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login sahifasi */}
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          }
        />

        <Route path="/qr/show/:id" element={<ViewPdfPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Cards />} />
          <Route path="pdf" element={<PdfPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
