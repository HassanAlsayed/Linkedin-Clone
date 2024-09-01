import { useNavigate } from "react-router-dom";
import linkedinLogo from "../assets/linkedinLogo.png";
import { useState } from "react";
import { GoogleAPI, RegisterAPI } from "../api/AuthAPI";
import { toast } from "react-toastify";
import GoogleButton from "react-google-button";
import { AddUserInfo } from "../api/FireStoreAPI";

export default function Register() {
  const [credentails, setCredentials] = useState("");
  let navigate = useNavigate();
  let register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Account Created!");
      localStorage.setItem("userEmail", res.user.email);
      let userInfo = {
        username: credentails.username,
        email: credentails.email,
      };
      await AddUserInfo(userInfo);
      navigate("/login");
    } catch (error) {
      toast.error("Your account already used!");
    }
  };
  const google = async () => {
    try {
      let googleRegister = await GoogleAPI();
      localStorage.setItem("userEmail", googleRegister.user.email);

      await AddUserInfo({
        username: googleRegister.user.displayName,
        email: googleRegister.user.email,
        imageUrl: googleRegister.user.photoURL,
      });
      toast.success("signed in with google succeed!");
      navigate("/Login");
    } catch (error) {
      toast.error("you already signed in with this account!");
    }
  };

  return (
    <div className="login-wrapper">
      <img src={linkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, username: event.target.value })
            }
            type="text"
            className="auth-inputs"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="auth-inputs"
            placeholder="Email or phone number"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="auth-inputs"
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={google} />
        <p className="go-to-signup">
          Already on LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/login")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
