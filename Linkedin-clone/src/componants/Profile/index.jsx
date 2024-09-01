/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import PostsCard from "../PostsCard";
import "./index.scss";
import { EditProfile, GetPosts } from "../../api/FireStoreAPI";
import { HiOutlinePencil } from "react-icons/hi";
import TopBar from "../TopBar";
import UploadImage from "../../api/StorageAPI";
import FileUploadModal from "../FileUploadModal";
import userImage from "../../assets/user.png";

export default function ProfileCard({ currentuser, onEdit }) {
  const [allPosts, setAllPosts] = useState([]);
  const [image, setImage] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  useMemo(() => {
    GetPosts(setAllPosts);
  }, []);

  const GetImage = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadImage = async () => {
    let imageUrl = await UploadImage(image, true);
    setModalOpen(false);
    EditProfile(currentuser.userId, { imageUrl: imageUrl });
  };

  let currentEmail = localStorage.getItem("userEmail");

  return (
    <>
      <FileUploadModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getImage={GetImage}
        uploadImage={uploadImage}
        currentImage={image}
      />
      <div className="topbar">
        <TopBar />
      </div>
      <div className="profile-card">
        <div className="edit-btn">
          <HiOutlinePencil onClick={onEdit} className="edit-icon" />
        </div>
        <div className="profile-info">
          <div>
            <img
              src={currentuser?.imageUrl || userImage}
              alt={currentuser?.username}
              className="profile-image"
              onClick={() => setModalOpen(!modalOpen)}
            />
            <h3 className="username">{currentuser?.username}</h3>
            <h3 className="heading">{currentuser?.headline}</h3>
            {currentuser?.city?.length > 0 &&
              currentuser?.country?.length > 0 && (
                <>
                  <p className="location">{`${currentuser?.city} , ${currentuser?.country}`}</p>
                </>
              )}
            <a className="website" href={currentuser?.website} target="_blank">
              {currentuser?.website}
            </a>
          </div>
          <div className="right-info">
            <p className="college">{currentuser?.college}</p>
            <p className="company">{currentuser?.company}</p>
          </div>
        </div>
        <p className="about-me">{currentuser?.aboutMe}</p>
        <span className="skill-label">
          <span>{currentuser?.skills?.length > 0 && <b>Skills:</b>}</span>
          &nbsp;{currentuser?.skills}
        </span>
      </div>
      <div className="profile-status-main">
        {allPosts
          .map((doc) => {
            return doc;
          })
          .filter((post) => {
            return post && post.userEmail === currentuser?.email;
          })
          .map((post) => (
            <div key={post.postId} className="post">
              <PostsCard docs={post} />
            </div>
          ))}
      </div>
    </>
  );
}
