import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserLoging from "../pages/UserLogin";
import UserSignup from "../pages/UserSignup";
import CaptainLogin from "../pages/CaptainLogin";
import CaptainSignup from "../pages/CaptainSignup";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user-login" element={<UserLoging />} />
      <Route path="/user-signup" element={<UserSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
    </Routes>
  );
};

export default App;
