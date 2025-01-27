import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Dashboard: React.FC = () => {
  const { t } = useTranslation(); // Hook for translations
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Remove the auth token from localStorage
    localStorage.removeItem("authToken");

    // Redirect to login page
    toast.error("Logged Out")
    navigate("/login");
  };



  return (
    
    <div className="flex bg-gray-100 dark:bg-gray-800 min-h-screen">
      {/* Sidebar */}
       {/* Sidebar */}
       <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Billing Dashboard</h2>
        </div>

        {/* Sidebar Items */}
        <ul className="flex flex-col space-y-4">
          <li>
            <a href="/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</a>
          </li>
          <li>
            <a href="/customers" className="hover:bg-gray-700 p-2 rounded">Customers</a>
          </li>
          <li>
            <a href="/invoices" className="hover:bg-gray-700 p-2 rounded">Invoices</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 h-full">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">{t("welcome")}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            {t("logout")}
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("totalCustomers")}</h2>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">256</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("totalBills")}</h2>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">120</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("pendingBills")}</h2>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">30</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("totalRevenue")}</h2>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">$5000</p>
          </div>
        </div>

        {/* Recent Customers */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t("recentCustomers")}</h2>
          <ul className="mt-4 space-y-4">
            <li className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">John Doe</span>
              <Link to="/customers/1" className="text-blue-500 hover:underline">
                {t("view")}
              </Link>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Jane Smith</span>
              <Link to="/customers/2" className="text-blue-500 hover:underline">
                {t("view")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Recent Bills */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t("recentBills")}</h2>
          <ul className="mt-4 space-y-4">
            <li className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Invoice #123 - $150</span>
              <Link to="/bills/1" className="text-blue-500 hover:underline">
                {t("view")}
              </Link>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Invoice #124 - $200</span>
              <Link to="/bills/2" className="text-blue-500 hover:underline">
                {t("view")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
