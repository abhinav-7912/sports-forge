import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { editProfile } from "../../../api/FirestoreAPI";
import "./index.scss";

export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState(currentUser);
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };

  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
  };

  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
      </div>

      <div className="profile-edit-inputs">
        <label>Name</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
          value={editInputs.name}
        />
        <label>Profession</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Enter Your Profession Here"
          value={editInputs.headline}
          name="headline"
        />
        <label>Sports</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Enter Sports You play..."
          value={editInputs.sport}
          name="sport"
        />
        <label>Country</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Country"
          name="country"
          value={editInputs.country}
        />
        <label>City</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="City"
          name="city"
          value={editInputs.city}
        />
        <label>Academy/Team</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Enter Academy/Team You Play For"
          value={editInputs.team}
          name="team"
        />
        <label>Email/Website</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Website/Email"
          name="website"
          value={editInputs.website}
        />
        <label>About</label>
        <textarea
          placeholder="About Me"
          className="common-textArea"
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />
        <label>Skills</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Skill"
          name="skills"
          value={editInputs.skills}
        />
      </div>
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Save
        </button>
      </div>
    </div>
  );
}