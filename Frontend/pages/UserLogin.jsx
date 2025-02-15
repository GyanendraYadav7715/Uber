import  { useState } from "react";
const UserLogin = () => {
  const [input, setInput] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full h-screen">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        What`s your phone number or email?
      </h2>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-4">
        <span className="px-3 py-4 bg-gray-200 border-r border-gray-300 flex">
          <span>🇮🇳</span> +91
        </span>
        <input
          type="number"
          
          className="w-full p-4 outline-none"
          placeholder="Enter phone number or email"
          value={input}
          max={10}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-800 transition">
        Continue
      </button>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-3 rounded-md hover:bg-gray-200 transition">
        <img
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt="Google"
          className="w-7 h-7"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default UserLogin;
