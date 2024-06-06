import React, { useContext, useEffect, useRef } from "react";
import styles from "./Login.module.css";
import login from "../assets/login.jpg";
import logo from "../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../contexts/Context";
import AlertModal from '../Components/AlertModal';
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import queryString from 'query-string'

const Login = () => {

  let navigate = useNavigate();
  let emailInputRef= useRef();
  let passInputRef = useRef();
  let location = useLocation();

  const {setShow, setAlert, setPlay} = useContext(Context);
  const {setToken, setUser, currUser, token} = useAuth();

  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[])

  async function handleLogin(e) {
    e.preventDefault();
    let email = emailInputRef.current.value;
    let pass = passInputRef.current.value;
    if(!(email && pass)){
        setAlert("Please Enter Full Details!!!")
        setShow(true);
        return;
    }

    try {
      let res = await axios.post(`${import.meta.env.VITE_BAPI_URL}/login`, {
        email:email, 
        password:pass,
      });
      console.log(res);
       setUser(res.data.data.userdata);
      setToken(res.data.data.token);

      await axios
      .get(`${import.meta.env.VITE_BAPI_URL}/playlist/${res.data.data.userdata._id}/playlists`)
      .then((res) => {
        setPlay(res.data)
        console.log(res);
      })
      .catch((error) => {
        console.log(error)
      })

      const{redirectTo} = queryString.parse(location.search);
      redirectTo? navigate(redirectTo, {replace:'true'}) : navigate('/', {replace:'true'});
   
    //   navigate("/");
      
    } catch (e) {
      console.log(e);
      setAlert(e.response.data)
      setShow(true);
      //alert(e.response.data)
    }
  }
  
  return (
    <div className={styles.login}>
    <AlertModal />
      <div className={styles.page}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="" />
        </Link>
        <div className={styles.desc}>
          <h1>Welcome Back</h1>
          <p>Welcome back! Please enter your details.</p>

          <div className={styles.form}>
            <input type="email" placeholder="Email" ref={emailInputRef} />
            <input type="password" name="" id="" placeholder="Password" ref={passInputRef} />
            <div className={styles.btn} onClick={handleLogin}>
              <h5>Log in</h5>
            </div>
            <div>
              <p>
                Don't have an account? {" "}
                <Link
                  to="/signup"
                  style={{ color: "white", cursor: "pointer" }}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.img}>
        <img src={login} alt="" />
      </div>
    </div>
  );
};

export default Login;
