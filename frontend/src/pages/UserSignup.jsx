 
import { useState, useContext } from "react";
import InputField from "../components/InputField";
import Logo from "../components/logo";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // ✅ Correct import
import { registerUser } from "../services/AuthService";
import ShowPasswordToggle from "../components/ShowPasswordToggle";

export default function UserSignup() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext) || {}; // ✅ Ensure context exists

  const [formData, setFormData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "firstname" || name === "lastname") {
        return {
          ...prev,
          fullname: { ...prev.fullname, [name]: value },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const togglePasswordVisibility = () => {  
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
     if (
        !formData.email ||
        !formData.password ||
        !formData.fullname.firstname)
    {
      setError("All fields are required");
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response.status === 201) {
        setUser(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/UserHome");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong.Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col max-h-screen bg-gray-100 gap-20">
      <Logo />
      <div className="flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            User Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-5">
              <InputField
                type="text"
                name="firstname"
                placeholder="Firstname"
                value={formData.fullname.firstname}
                onChange={handleChange}
              />
              <InputField
                type="text"
                name="lastname"
                placeholder="Lastname"
                value={formData.fullname.lastname}
                onChange={handleChange}
              />
            </div>
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
              <ShowPasswordToggle
                showPassword={showPassword}
                toggle={togglePasswordVisibility}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
            >
              Register
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <Link
              to="/UserLogin"
              className="block w-full text-center mt-5 bg-black text-white text-lg rounded-lg py-2.5 px-5 hover:bg-gray-800 transition-colors"
            >
              Log In
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
