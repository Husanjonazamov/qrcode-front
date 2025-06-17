import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import LoginPage from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Cards from "./components/Cards/Cards";
import PdfPage from "./components/PdfPage/PdfPage";
import ViewPdfPage from "./components/ViewPdf/ViewsPdf";



const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (err) {
    return false;
  }
};

function ProtectedRoute() {
  const token = localStorage.getItem("access");
  return token && isTokenValid(token) ? <Outlet /> : <Navigate to="/" replace />;
}

function RedirectIfAuthenticated({ children }) {
  const token = localStorage.getItem("access");
  const location = useLocation();

  if (token && isTokenValid(token)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          }
        />

        <Route path="/view-pdf/:id" element={<ViewPdfPage />} />

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route element={<Dashboard />}>
            <Route
              index
              element={
                <div className="w-full">
                  <Cards />
                </div>
              }
            />
            <Route path="pdf" element={<PdfPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
