import { useState } from "react";
import { LoginAPI, GoogleAPI } from "../api/AuthAPI";
import "../sass/Login.scss";
import linkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../sass/Login.scss";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed in to linkedin!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/Home");
      location.reload();
    } catch (error) {
      toast.error("Please Check Your Credentials!");
    }
  };

  const google = async () => {
    try {
      let googleLogin = await GoogleAPI();
      console.log(googleLogin);
      
      toast.success("signed in with google succeed!");
      localStorage.setItem("userEmail", googleLogin.user.email);
      navigate("/Home");
      location.reload();
    } catch (error) {
      toast.error("you already signed in with this account!");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <img src={linkedinLogo} className="linkedinLogo" />
        <div className="login-wrapper-inner">
          <h1 className="heading">Sign in</h1>
          <p className="sub-heading">Stay updated on your professional world</p>
          <div className="auth-inputs">
            <input
              onChange={(event) =>
                setCredentials({ ...credentials, email: event.target.value })
              }
              type="email"
              className="auth-inputs"
              placeholder="Email"
            />
            <input
              onChange={(event) =>
                setCredentials({ ...credentials, password: event.target.value })
              }
              type="password"
              className="auth-inputs"
              placeholder="Password"
            />
          </div>
          <button onClick={login} className="login-btn">
            Sign in
          </button>
        </div>
        <hr className="hr-text" data-content="or" />
        <div className="google-btn-container">
          <GoogleButton className="google-btn" onClick={google} />
          <p className="go-to-signup">
            New to LinkedIn?
            <span className="join-now" onClick={() => navigate("/")}>
              Join now
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
