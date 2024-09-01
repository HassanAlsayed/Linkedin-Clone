/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import PostsCard from "../PostsCard";
import "./index.scss";
import { GetPosts } from "../../api/FireStoreAPI";
import TopBar from "../TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import userImage from "../../assets/user.png";
import SendMessage from "../Modal/SendMessage";

export default function ConnectedProfile() {
  const [allPosts, setAllPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");

  const location = useLocation();
  const user = location.state;

  useMemo(() => {
    GetPosts(setAllPosts);
  }, []);
  return (
    <>
      <div className="topbar">
        <TopBar />
      </div>
      <div className="profile-card">
        <div className="profile-info">
          <div>
            <img
              src={user?.imageUrl || userImage}
              alt={user?.username}
              className="profile-image"
            />
            <h3 className="username">{user?.username}</h3>
            <h3 className="heading">{user?.headline}</h3>
            {user?.city?.length > 0 ||
              (user?.country?.length > 0 && (
                <>
                  <p className="location">{`${user?.city} , ${user?.country}`}</p>
                </>
              ))}
            <a
              className="website"
              href={user?.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user?.website}
            </a>
          </div>
          <div className="right-info">
            <p className="college">{user?.college}</p>
            <p className="company">{user?.company}</p>
          </div>
        </div>
        <p className="about-me">{user?.aboutMe}</p>
        <span className="skill-label">
          <span>{user?.skills?.length > 0 && <b>Skills:</b>}</span>
          &nbsp;{user?.skills}
        </span>
        <button onClick={() => setIsModalOpen(true)}>Message</button>
      </div>
      <SendMessage
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        status={status}
        setStatus={setStatus}
        user={user}
      />
      <div className="profile-status-main">
        {allPosts
          .filter((post) => post && post.userEmail === user?.email)
          .map((post) => (
            <div key={post.postId} className="post">
              <PostsCard docs={post} />
            </div>
          ))}
      </div>
    </>
  );
}
