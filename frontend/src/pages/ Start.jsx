import UberLogo from "../assets/Uber-Logo.wine.png";
import { Link } from "react-router-dom";

const Start = () => {
  
  return (
    <div>
      <div className="w-full h-screen  space-y-4">
        <div className=" bg-[url(https://i.pinimg.com/736x/26/de/95/26de95fabb49fe57f8f72f37718fccdc.jpg)] bg-cover bg-top h-[82%]">
          <span id="Logo">
            <img src={UberLogo} alt="Uber" className="w-24 ml-1" />
          </span>
        </div>

        <div className="space-y-2 px-3">
          <h2 className=" text-black font-medium text-3xl tracking-tight ">
            Get Started with Uber
          </h2>
          <Link
            to="/UserLogin"
            className="bg-[#0c0c0c] w-full inline-block p-2 rounded-md text-white text-center font-bold text-3xl tracking-wider shadow-lg"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
