/* eslint-disable react/prop-types */
import "./index.scss";
import { Logout } from "../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { GetCurrentUser } from "../../api/FireStoreAPI";
import { useMemo, useState } from "react";
import userImage from "../../assets/user.png";

export default function PopUp({ popupVisible }) {
  const [currentuser, setCurrentUser] = useState({});
  useMemo(() => {
    GetCurrentUser(setCurrentUser);
  }, []);
  const navigate = useNavigate();

  const profile = () => {
    navigate("/Profile");
  };

  const handleLogout = () => {
    Logout();
    navigate("/login");
  };

  return (
    <>
      {popupVisible && (
        <div className="popup-card">
          <img
            src={currentuser?.imageUrl || userImage}
            className="img-profile"
          />
          <p className="name" onClick={() => navigate("/Profile")}>
            {currentuser?.username}
          </p>
          <p className="headline">{currentuser?.headline}</p>
          <Button methode={profile} Logout={handleLogout} />
        </div>
      )}
    </>
  );
}
