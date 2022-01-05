import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import  useForm from "../../hooks/useForm";
import "./register.scss";

export default function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const formRegister = () => {

    console.log("Callback function when form is submitted!");
    console.log("Form Values ", values);
  }

  const { handleChange, values, errors, handleSubmit } = useForm(formRegister);

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post("auth/register", { email, username, password });
      history.push("/login");
    } catch (err) { }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />

          <Link to="/login" >
            <button className="loginButton">Sign In</button>
          </Link>
        </div>
      </div>
      
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input 
            type="email" 
            name="email"
            placeholder="Email..."
            onChange={handleChange}
            ref={emailRef}
            className="inputOutline" 
            />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input 
            type="username"
            name="username" 
            placeholder="username" 
            onChange={handleChange}
            ref={usernameRef} 
            />
            <input 
            type="password" 
            name="pasword"
            placeholder="password" 
            onChange={handleChange}
            ref={passwordRef} 
            />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
