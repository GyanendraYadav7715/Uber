import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Google from "../components/Google";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../components/logo";

const CaptainLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("https://your-api-url.com/login", formData);
      alert("Login Successful!");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col max-h-screen  bg-gray-100 gap-20">
      <Logo />
      <div className="flex items-center justify-center   px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Log In as Captain
          </h2>

          <div className="items-center flex justify-center">
            {" "}
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
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button
              text="Log In"
              type="submit"
              className="w-full bg-orange-600"
            />
          </form>

          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/CaptainSignup" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>

          <Link
            to="/UserLogin"
            className="block w-full text-center mt-5 bg-black text-white text-lg rounded-lg py-2.5 px-5 hover:bg-gray-800 transition-colors"
          >
            Log In as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
