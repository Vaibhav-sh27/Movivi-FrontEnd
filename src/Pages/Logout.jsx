import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { Context } from "../contexts/Context";

const Logout = () => {
  const { setToken, setUser } = useAuth();
  const { setPlay} = useContext(Context);
  const navigate = useNavigate();

  useEffect(()=>{
    const handleLogout = () => {
    setToken();
    setUser();
    setPlay([]);
    navigate("/", { replace: true });
  };
  handleLogout();
  })


  return <></>;
};

export default Logout;