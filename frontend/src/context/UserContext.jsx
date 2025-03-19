import { createContext, useState } from "react";

export const UserContext = createContext(); // ✅ Ensure it's correctly exported

export const UserProvider = ({ children }) => {
  // ✅ Wrap it in a provider
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
