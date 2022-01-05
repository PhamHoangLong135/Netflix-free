import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../authContext/apiCalls";
import { authFadeInUpVariants, staggerOne } from "../../motionUtils";
import { motion } from "framer-motion";
import { AuthContext } from "../../authContext/AuthContext";
import  useForm from "../../hooks/useForm";
import "./login.scss";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { dispatch } = useContext(AuthContext);

//   const formLogin = (e) => {

//     e.preventDefault();
//     login({ email, password }, dispatch);
//   }

//   const { handleChange, values, errors, handleSubmit } = useForm(formLogin);

//   return (
//     <div className="login">
//       <div className="top">
//         <div className="wrapper">
//           <img
//             className="logo"
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
//             alt=""
//           />
//         </div>
//       </div>
//       <div className="container">
//         <form onSubmit={handleSubmit}>
//           <h1>Sign In</h1>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email..."
//             onChange={handleChange}
//           />
//           {
//             errors.email && <h3>{errors.email}</h3>
//           }
//           <input
//             minLength="8"
//             type="password"
//             name="password"
//             placeholder="Password..."
//             onChange={handleChange}
//           />
//           {
//             errors.password && <h3>{errors.password}</h3>
//           }
//           <button className="loginButton" onClick={handleSubmit}>
//             Sign In
//           </button>
//           <span>
//             New to Netflix?
//             <Link to={{ pathname: "/register" }}>
//               <b> Sign up now.</b>
//             </Link>
//           </span>
//           <small>
//             This page is protected by Google reCAPTCHA to ensure you're not a
//             bot.
//             <a href="https://support.google.com/recaptcha/?hl=en">
//               <b> Learn more.</b>
//             </a>
//           </small>
//         </form>
//       </div>
//     </div>
//   );
// }


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          <span>
            New to Netflix?
            <Link
              to={{ pathname: "/register" }}>
              <b> Sign up now.</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <a href="https://support.google.com/recaptcha/?hl=en">
              <b> Learn more.</b>
            </a>
          </small>
        </form>
      </div>
    </div>
  );
}