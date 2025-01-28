import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Layout from "../layouts/Layout";
import Customers from "../pages/Customers";
import Bills from "../pages/Bills";

const App: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Load token from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
        <Route path="/register" element={<Register />} />
        {/* Redirect root to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* Layout with sidebar */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={authToken ? <Dashboard /> : <Navigate to="/login" replace/>} />
          <Route path="customer-list" element={<Customers />} />
          <Route path="bill-list" element={<Bills />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
