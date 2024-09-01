/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import "./index.scss";
import Index from "../Modal";
import {
  Post,
  GetPosts,
  GetConnections,
  GetUsers,
} from "../../api/FireStoreAPI";
import PostsCard from "../PostsCard";
import getCurrentTimeStamp from "../../heplers/useMoment";
import userImage from "../../assets/user.png";
import UploadImage from "../../api/StorageAPI";
import { useNavigate } from "react-router-dom";

export default function PostStatus({ currentUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [connections, setConnections] = useState([]);
  const [users, setUsers] = useState([]);
  const [imagePostUrl, setImagePostUrl] = useState("");

  let userEmail = localStorage.getItem("userEmail");
  let navigate = useNavigate();

  let post = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: userEmail,
      username: currentUser.username,
      userId: currentUser.userId,
      postUrl: imagePostUrl,
    };
    await Post(object);
    await setIsModalOpen(false);
    await setStatus("");
  };

  useMemo(() => {
    GetPosts(setAllPosts);
    GetUsers(setUsers);
    GetConnections(setConnections);
  }, []);

  const PostImage = async (uploadImage) => {
    setImagePostUrl(await UploadImage(uploadImage, false));
  };

  const connectionTargetIds = connections.map(
    (connection) => connection.targetId
  );

  return (
    <div className="post-status-main">
      <div className="user-details">
        <img
          src={currentUser?.imageUrl || userImage}
          alt={currentUser?.username || "Default User"}
        />
        <p className="name-det" onClick={() => navigate("/Profile")}>
          {currentUser?.username}
        </p>
        <p className="headline-det">{currentUser?.headline}</p>
      </div>
      <div className="post-status">
        <button
          className="open-post-modal"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={currentUser?.imageUrl || userImage}
            alt="imageProfile"
            className="post-image"
          />
          Start a post, try writing with AI
        </button>
      </div>
      <Index
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        status={status}
        setStatus={setStatus}
        post={post}
        setUploadImage={PostImage}
        imagePostUrl={imagePostUrl}
        setImagePostUrl={setImagePostUrl}
      />
      {allPosts
        .map((docs) => {
          return docs;
        })
        .filter((posts) => {
          return (
            posts &&
            posts.userEmail !== userEmail &&
            connectionTargetIds.includes(posts?.userId)
          );
        })
        .map((post) => {
          return (
            <div key={post.postId}>
              <PostsCard docs={post} />
            </div>
          );
        })}
    </div>
  );
}
