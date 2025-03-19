import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
 
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
       

      <Route path="/UserLogin" element={<UserLogin />} />
      <Route path="/UserSignup" element={<UserSignup />} />
      <Route path="/CaptainLogin" element={<CaptainLogin />} />
      <Route path="/CaptainSignup" element={<CaptainSignup />} />
    </Routes>
  );
};

export default App;
