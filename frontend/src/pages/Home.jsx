import UberLogo from "../assets/Uber-Logo.wine.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="w-full h-screen  space-y-4">
        <div className=" bg-[url(https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,h_256,w_384/v1558544433/assets/d9/d659d2-3eed-4186-9fb8-a62d763f8724/original/Law_PIllar.svg)] bg-cover bg-top h-[82%]">
          <span id="Logo">
            <img src={UberLogo} alt="Uber" className="w-24 ml-1" />
          </span>
        </div>

        <div className="space-y-2 px-3">
          <h2 className=" text-black font-medium text-3xl tracking-tight ">
            Get Started with Uber
          </h2>
          <Link to='/UserLogin' className="bg-black w-full inline-block p-2 rounded-md text-white text-center font-bold text-3xl tracking-wider shadow-lg">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
