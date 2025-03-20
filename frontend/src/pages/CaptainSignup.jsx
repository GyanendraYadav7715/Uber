import { useState, useContext } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import Logo from "../components/logo";
import { Link,useNavigate } from "react-router-dom";
import ShowPasswordToggle from "../components/ShowPasswordToggle";
import { CaptainContext } from "../context/CaptainContext";
import { registerCaptain } from "../services/AuthService";

export default function CaptainSignup() {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainContext) || {};

  const [formData, setFormData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle: { 
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "firstname" ||
          name === "lastname") {
        return {
          ...prev,
          fullname: { ...prev.fullname, [name]: value },
        };
      } else if (
        name === "color" ||
        name ==="plate" ||
        name === "capacity" ||
        name === "vehicleType"
      ) {
        return {
          ...prev,
          vehicle: { ...prev.vehicle, [name]: value },
        };
      }
      return { ...prev, [name]: value };
    });
    };

  const togglePasswordVisibility = () => {
    setShowPassword((prev)=>!prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.fullname.firstname ||
      !formData.vehicle.capacity ||
      !formData.vehicle.vehicleType ||
      !formData.vehicle.plate
        
    ) {
      setError("All fields are required");
      return;
    }
    console.log("Captain Registered: ", formData);
    try {
      const response = await registerCaptain(formData);
      if (response.status === 201) {
        setCaptain(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("captain", JSON.stringify(response.data.captain));
        navigate("/CaptainHome");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="flex flex-col max-h-screen  bg-gray-100 ">
      <Logo />
      <div className="  flex items-center justify-center   p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Captain Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center   gap-5">
              <InputField
                type="text"
                name="firstname"
                placeholder="Firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              <InputField
                type="text"
                name="lastname"
                placeholder="lastname"
                value={formData.lastname}
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
            <div className="flex items-center   gap-5">
              <InputField
                type="text"
                name="color"
                placeholder=" Color"
                value={formData.color}
                onChange={handleChange}
              />
              <InputField
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>
            <InputField
              type="text"

              name="plate"
              placeholder="Plate Number"
              value={formData.plate}
              onChange={handleChange}
            />
            <div>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option>Vehicle Role</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="bike">Bike</option>
              </select>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:opacity-90 mt-6 text-lg font-semibold"
            >
              Register
            </button>
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <Link
              to="/CaptainLogin"
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
