import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from "./context/UserContext"; 
import { CaptainProvider } from "./context/CaptainContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CaptainProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CaptainProvider>
    </BrowserRouter>
  </StrictMode>
);
