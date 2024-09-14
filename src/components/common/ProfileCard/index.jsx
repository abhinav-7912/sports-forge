import React, { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard"
import { RiEditLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModal";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import "./index.scss";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  console.log(currentProfile);
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
        {currentUser.id === location?.state?.id ? (
          <div className="edit-btn">
            <RiEditLine className="edit-icon" onClick={onEdit} size={30} />
          </div>
        ) : (
          <></>
        )}
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            />
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>

            {currentUser.sport || currentProfile?.sport ? (
              <p className="sport">
              <span className="skill-label">Sports</span>:&nbsp;
              {Object.values(currentProfile).length === 0
                ? currentUser.sport
                : currentProfile?.sport}
            </p>
            ) : (
              <></>
            )}
          
            
            {currentUser.skills || currentProfile?.skills ? (
              <p className="skills">
                <span className="skill-label">Skills: </span>
                {Object.values(currentProfile).length === 0
                  ? currentUser.skills
                  : currentProfile?.skills}
              </p>
            ) : (
              <></>
            )}
            {(currentUser.city || currentUser.country) &&
            (currentProfile?.city || currentProfile?.country) ? (
              <p className="location">
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.city}, ${currentUser.country} `
                  : `${currentProfile?.city}, ${currentUser.country}`}
              </p>
            ) : (
              <></>
            )}
            {currentUser.website || currentProfile?.website ? (
              <>
              <span className="skill-label">Email/Website: </span>
              <a
                className="website"
                target="_blank"
                href={
                  Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website
                }
              >
                
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website}
              </a>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="right-info">
          {currentUser.team || currentProfile?.team ? (
             <p className="team">
             <span className="skill-label">Team: </span>
               {Object.values(currentProfile).length === 0
                 ? currentUser.team
                 : currentProfile?.team}
             </p>
            ) : (
              <></>
            )}
            {currentUser.city || currentProfile?.city ? (
             <p className="city">
             <span className="skill-label">City: </span>
             {Object.values(currentProfile).length === 0
               ? currentUser.city
               : currentProfile?.city}
           </p> 
            ) : (
              <></>
            )}
            {currentUser.country || currentProfile?.country ? (
            <p className="Country">
            <span className="skill-label">Country: </span> 
              {Object.values(currentProfile).length === 0
                ? currentUser.country
                : currentProfile?.country}
            </p> 
            ) : (
              <></>
            )}

          </div>
        </div>
        {currentUser.aboutMe || currentProfile?.aboutMe ? (
             <p className="about-me">
             <span className="skill-label">About Me:<br/></span>
               {Object.values(currentProfile).length === 0
                 ? currentUser.aboutMe
                 : currentProfile?.aboutMe}
             </p>
            ) : (
              <></>
            )}
        

      </div>

      <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
}