import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken_] = useState(localStorage.getItem("token"));
  let d=JSON.parse(localStorage.getItem("userdata"))
  const [currUser,setCurrUser_]= useState(d);

  const setToken = (newToken) => {
    setToken_(newToken);
  };
  const setUser = (newUser) => {
    setCurrUser_(newUser);
  };

  useEffect(() => {
    if (token) {
      // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
      localStorage.setItem('userdata',JSON.stringify(currUser));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
      localStorage.removeItem('userdata')
    }
  }, [token, currUser]);


  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      currUser,
      setUser
    }),
    [token, currUser]
  );


  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;