/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./index.scss";
import { EditProfile } from "../../api/FireStoreAPI";
import TopBar from "../TopBar";

export default function ProfileEdit({ currentUser, onEdit }) {
  const [editInputs, setEditInputs] = useState(currentUser);
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };

  const updateInfo = () => {
    EditProfile(currentUser.userId, editInputs);
    onEdit();
  };
  return (
    <>
      <div className="topbar">
        <TopBar />
      </div>
      <div className="profile-card">
        <div className="edit-btn">
          <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
        </div>

        <div className="profile-edit-inputs">
          <label>Name</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Name"
            name="username"
            value={editInputs?.username || ""}
          />
          <label>Headline</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Headline"
            value={editInputs?.headline || ""}
            name="headline"
          />
          <label>Country</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Country"
            name="country"
            value={editInputs?.country || ""}
          />
          <label>City</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="City"
            name="city"
            value={editInputs?.city || ""}
          />
          <label>Company</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Company"
            value={editInputs?.company || ""}
            name="company"
          />
          <label>Industry </label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Industry"
            name="industry"
            value={editInputs?.industry || ""}
          />
          <label>College</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="College"
            name="college"
            value={editInputs?.college || ""}
          />
          <label>Website</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Website"
            name="website"
            value={editInputs?.website || ""}
          />
          <label>About</label>
          <textarea
            placeholder="About Me"
            className="common-textArea"
            onChange={getInput}
            rows={5}
            name="aboutMe"
            value={editInputs?.aboutMe || ""}
          />
          <label>Skills</label>
          <input
            onChange={getInput}
            className="edit-input"
            placeholder="Skill"
            name="skills"
            value={editInputs?.skills || ""}
          />
        </div>
        <div className="save-container">
          <button className="save-btn" onClick={updateInfo}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}
