import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


interface LoginProps {
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({setAuthToken}) => {
  const { t } = useTranslation(); // Hook for translations
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  // Redirect to dashbaord if already logged in 

  useEffect(()=>{
    const authToken = localStorage.getItem("authToken");
    if(authToken){
      navigate("/dashboard");
    }
  }, [navigate])

  const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log("Login form submitted", formData);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login",{
        username: formData.username,
        password: formData.password
      })
      console.log("Logged in Data " + response.data)
      const token = response.data.token;
      const clientId = response.data.clientId;
      setAuthToken(token); // Update state in App.tsx
      localStorage.setItem("authToken", token);
      localStorage.setItem("clientId", clientId );
      toast.success(response?.data?.message);
      navigate("/dashboard");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err:any){
      const message = err.response?.data?.message || t("somethingWentWrong");
      setError(message);
      toast.error(message);
      console.error("Login Failed:", message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
          {t("login")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("username")}
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("password")}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {t("login")}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          {t("dontHaveAccount")}{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            {t("register")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
