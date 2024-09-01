/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./index.scss";
import LikeButton from "../LikeButton";
import { useApp } from "../../heplers/Context/useAppContext";
import { DeletePost, EditPost, GetUserById } from "../../api/FireStoreAPI";
import { useEffect, useMemo, useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import UpdatePost from "../Modal/updatePost";
import userImage from "../../assets/user.png";
import UploadImage from "../../api/StorageAPI";

export default function PostsCard({ docs }) {
  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(docs?.status);
  const [imagePostUrl, setImagePostUrl] = useState(docs?.postUrl);

  const { CurrentUser } = useApp();
  const goToProfile = () => {
    navigate("/ConnectedUserProfile", {
      state: user,
    });
  };

  const editPost = () => {
    EditPost(docs.postId, { status: status, postUrl: imagePostUrl });
    setIsModalOpen(false);
  };

  const PostImage = async (uploadImage) => {
    setImagePostUrl(await UploadImage(uploadImage, false));
  };
  useMemo(() => {
    GetUserById(setUser, docs.userId);
  }, []);

  return (
    <div className="posts-card">
      {docs.userId === CurrentUser.userId && (
        <>
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => setIsModalOpen(!isModalOpen)}
            />
            <UpdatePost
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              status={status}
              setStatus={setStatus}
              editPost={editPost}
              PostImage={PostImage}
              postUrl={imagePostUrl}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => DeletePost(docs.postId)}
            />
          </div>
        </>
      )}
      <div className="div-container">
        <img src={user?.imageUrl || userImage} className="img-profile" />
        <div className="user-info">
          <p className="card-name" onClick={goToProfile}>
            {docs?.username}
          </p>
          <p className="headline">{user?.headline}</p>
        </div>
      </div>
      <p className="status">{docs?.status}</p>
      {docs?.postUrl?.length > 0 && (
        <img src={docs?.postUrl} alt="postImage" className="img-post" />
      )}
      <div className="hr-line">
        <hr />
      </div>
      <LikeButton userId={CurrentUser?.userId} postId={docs?.postId} />
      <p className="timestamp">{docs?.timeStamp}</p>
    </div>
  );
}
