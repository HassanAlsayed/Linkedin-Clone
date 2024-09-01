/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import LinkedinLogo from "../../assets/linkedinLogo.png";
import userImage from "../../assets/user.png";
import "./index.scss";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PopUp from "../PopUp";
import SearchUsers from "../SearchUser";
import { GetConnections, GetUsers } from "../../api/FireStoreAPI";
import { useApp } from "../../heplers/Context/useAppContext";

export default function TopBar() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [takeSearch, setTakeSearch] = useState("");
  const [connections, setConnections] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  let navigate = useNavigate();
  let userEmail = localStorage.getItem("userEmail");
  const { CurrentUser } = useApp();

  const connectionTargetIds = connections.map(
    (connection) => connection.targetId
  );

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  useMemo(() => {
    GetUsers(setUsers);
    GetConnections(setConnections);
  }, []);

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [takeSearch]);

  const goToProfile = (user) => {
    navigate("/ConnectedUserProfile", {
      state: user,
    });
  };

  const handleSearch = () => {
    if (takeSearch !== "") {
      let searched = users.filter((user) => {
        return Object.values(user.username)
          .join("")
          .toLowerCase()
          .includes(takeSearch.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <div className="topbar-main">
      <SearchUsers setTakeSearch={setTakeSearch} />
      <img
        className="linkedin-logo"
        src={LinkedinLogo}
        alt="LinkedinLogo"
        onClick={() => navigate("/Home")}
      />
      <div className="react-icons">
        <AiOutlineHome
          size={30}
          className="react-icon"
          onClick={() => navigate("/Home")}
        />
        <AiOutlineUserSwitch size={30} className="react-icon" />
        <BsBriefcase size={30} className="react-icon" />
        <AiOutlineMessage
          size={30}
          className="react-icon"
          onClick={() => navigate("/Messaging", { state: messages })}
        />
        <AiOutlineBell size={30} className="react-icon" />
      </div>
      <img
        className="user-logo"
        src={CurrentUser?.imageUrl || userImage}
        alt="user"
        onClick={displayPopup}
      />
      <PopUp popupVisible={popupVisible} />
      {takeSearch.length > 0 && (
        <div className="search-results">
          {filteredUsers
            .map((users) => {
              return users;
            })
            .filter((users) => {
              return (
                users &&
                users.userEmail !== userEmail &&
                connectionTargetIds.includes(users?.userId)
              );
            })
            .map((user) => {
              return (
                <div
                  key={user.userId}
                  className="search-inner"
                  onClick={() => goToProfile(user)}
                >
                  <img src={user?.imageUrl || userImage} />
                  <p className="res-name">{user?.username}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
