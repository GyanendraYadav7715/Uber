import { Routes, Route } from "react-router-dom";
import Start from "./pages/ Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserHome from "./pages/UserHome";
import CaptainHome from "./pages/CaptainHome";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/UserHome" element={<UserHome />} />
      <Route path="/CaptainHome" element={<CaptainHome/>}/>
      <Route path="/UserLogin" element={<UserLogin />} />
      <Route path="/UserSignup" element={<UserSignup />} />
      <Route path="/CaptainLogin" element={<CaptainLogin />} />
      <Route path="/CaptainSignup" element={<CaptainSignup />} />
    </Routes>
  );
};

export default App;
