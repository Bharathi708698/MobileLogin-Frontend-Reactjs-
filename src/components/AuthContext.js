import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <AuthContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
