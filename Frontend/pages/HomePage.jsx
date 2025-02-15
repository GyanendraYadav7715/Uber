import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full h-screen flex justify-between flex-col  bg-amber-400 bg-[url('https://plus.unsplash.com/premium_photo-1737012422783-590bdd55f7e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHx0cmFmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center">
      <div className="p-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
          alt="Logo"
          className="w-28"
        />
      </div>
      <div className="w-full bg-white py-7 px-5  space-y-5">
        <h2 className="font-bold text-3xl">Get Started with Uber</h2>
        <Link
          to="/user-login"
          className="inline-block rounded bg-black text-2xl font-extrabold text-white w-full py-2 text-center "
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
