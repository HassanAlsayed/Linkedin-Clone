/* eslint-disable react/prop-types */
import { AddConnection } from "../api/FireStoreAPI";
import { useApp } from "../heplers/Context/useAppContext";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import userImage from "../assets/user.png";
import { useNavigate } from "react-router-dom";

export default function ConnectedUsers({ user }) {
  const { CurrentUser } = useApp();
  const navigate = useNavigate();
  
  const addConnection = () => {
    AddConnection(CurrentUser.userId, user.userId);
  };
  return (
    <>
      <div className="grid-child">
        <img src={user?.imageUrl || userImage} />
        <p
          className="con-name"
          onClick={() => navigate("/ConnectedUserProfile", { state: user })}
        >
          {user?.username}
        </p>
        <p className="con-headline">{user?.headline}</p>
        <button onClick={addConnection}>
          <AiOutlineUsergroupAdd size={20} />
          Connect
        </button>
      </div>
    </>
  );
}
