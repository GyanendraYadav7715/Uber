import React, { createContext } from "react";
export const UserContext = createContext();
const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        fullName: {
            firstName: "",
            lastName: "",
        },
        email: "",
        password: "",
    });
  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserContext;
