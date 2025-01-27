import React from "react";
import {useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Dashboard: React.FC = () => {
  const { t } = useTranslation(); // Hook for translations

 



  return (
    <h1>Dashboard Component</h1>
  );
};

export default Dashboard;
