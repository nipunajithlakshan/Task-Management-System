import { createContext, useState } from "react";
import { getLocalStoragedata } from "../helpers/StorageHelper";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(getLocalStoragedata("token"));
  const [userId, setUserId] = useState(getLocalStoragedata("userId"));
  const [userName, setUserName] = useState(getLocalStoragedata("userName")); 

  const authConfig = {
    headers: {
      "Access-Control-Allow": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const config = {
    headers: {
      "Access-Control-Allow": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  return (
    <AuthContext.Provider
      value={{
        authConfig,
        config,
        setToken,
        token,
        userId,
        setUserId,  
        userName,
        setUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
