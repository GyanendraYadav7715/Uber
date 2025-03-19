import React, { useState, useContext, useEffect } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Google from "../components/Google";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../components/logo";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { UserContext } from "../context/UserContext";

const UserLogin = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext) || {};
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser && setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`, // Fixed URL
        formData
      );

      if (response.status === 200) {
        const data = response.data;
        if (setUser) {
          setUser(data.user);
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/Home");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col max-h-screen bg-gray-100 gap-20">
      <Logo />
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Log In as User
          </h2>

          <div className="items-center flex justify-center">
            <Google />
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="relative">
              <InputField
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? (
                  <FaRegEye className="h-5 w-5" />
                ) : (
                  <FaRegEyeSlash className="h-5 w-5" />
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button text="Log In" type="submit" className="w-full bg-black" />
          </form>

          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/UserSignup" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>

          <Link
            to="/CaptainLogin"
            className="block w-full text-center mt-5 bg-black text-white text-lg rounded-lg py-2.5 px-5 hover:bg-gray-800 transition-colors"
          >
            Log In as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
