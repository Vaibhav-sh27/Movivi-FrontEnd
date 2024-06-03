import React, { useContext, useRef } from "react";
import styles from "./Signup.module.css";
import signup from "../assets/signup.jpg";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../contexts/Context";
import AlertModal from '../Components/AlertModal';
import axios from "axios";

const Signup = () => {

  let navigate = useNavigate();
  let emailInputRef= useRef("");
  let nameInputRef= useRef("");
  let passInputRef = useRef("");

  const {setShow, setAlert} = useContext(Context);

  async function handleSignup(e) {
    e.preventDefault();
    let email = emailInputRef.current.value;
    let name = nameInputRef.current.value;
    let pass = passInputRef.current.value;

    if(!(email && name && pass)){
        setAlert("Please Enter Full Details!!!")
        setShow(true);
        return;
    }

    try {
      let res = await axios.post(`${import.meta.env.VITE_BAPI_URL}/register`, {
        email:email,
        name: name,
        password:pass, 
      });

      console.log(res);

      setAlert("User Registerd Successfully! Please Sign In")
      setShow(true);
      navigate("/login");
    } catch (e) {
      // alert(e.response.data)
      console.log(e);
      setAlert(e.response.data)
      setShow(true);
    }
  }
  return (
    <div className={styles.signup}>
    <AlertModal/>
      <div className={styles.img}>
        <img className={styles.img} src={signup} alt="" />
        <div className={styles.overimg}>
          <Link to="/" className={styles.logo}>
            <img className={styles.logo} src={logo} alt="" />
          </Link>
          <div className={styles.text}>
            <div className={styles.insidetext}>
              <h1>Benefits of your free IMDb account</h1>

              <h4>Personalized Recommendations</h4>
              <p>Discover shows you'll love.</p>

              <h4>Your Ratings</h4>
              <p>Rate and remember everything you've seen.</p>

              <h4>Contribute to IMDb</h4>
              <p>
                Add data that will be seen by millions of people and get cool
                badges.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.page}>
        <div className={styles.desc}>
          <h1>Create an account</h1>
          <p>Let's get started with your 30 days free trial.</p>

          <div className={styles.form}>
          <input type="text" placeholder="Name" ref={nameInputRef}/>
            <input type="email" placeholder="Email" ref={emailInputRef}/>
            <input type="password" name="" id="" placeholder="Password" ref={passInputRef}/>
            <div className={styles.btn} onClick={handleSignup}>
              <h5>Create account</h5>
            </div>
            <div>
              <p>
              Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "white", cursor: "pointer" }}
                >
                   Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
