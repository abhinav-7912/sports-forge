import React,{useState, useEffect} from 'react';
import "./index.scss";
import {useNavigate} from  "react-router-dom";
import user from "../../../assets/user.png";
import SportsforgeLogo from "../../../assets/SportsforgeLogo1.png";
import ProfilePopup from "../ProfilePopup";
import {getAllUsers} from "../../../api/FirestoreAPI"
import SearchUsers from "../SearchUsers";
import { 
  RiHomeLine,
  RiPlayListAddFill,
  RiUserStarLine,
  RiSearchLine,
  RiMessage2Line,
  RiNotification2Line
} from "react-icons/ri";

export default function Topbar({currentUser}) {
    const [popupVisible, setPopupVisible] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    let navigate = useNavigate();
    const goToRoute = (route) => {
      navigate(route);
    };
  
    const displayPopup = () => {
      setPopupVisible(!popupVisible);
    };
  
    const openUser = (user) => {
      navigate("/profile", {
        state: {
          id: user.id,
          email: user.email,
        },
      });
    };
  
    const handleSearch = () => {
      if (searchInput !== "") {
        let searched = users.filter((user) => {
          return Object.values(user)
            .join("")
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
  
        setFilteredUsers(searched);
      } else {
        setFilteredUsers(users);
      }
    };
  
    useEffect(() => {
      let debounced = setTimeout(() => {
        handleSearch();
      }, 1000);
  
      return () => clearTimeout(debounced);
    }, [searchInput]);
  
    useEffect(() => {
      getAllUsers(setUsers);
    }, []);
  return (
  <div className='topbar-main'>
    {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
    <img src={SportsforgeLogo} 
      className='topbar-logo' 
      alt='SportsforgeLogo'
    />

{isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="react-icons">
          <RiSearchLine
            size={30}
            className="react-icon"
            onClick={() => setIsSearch(true)}
          />
          <RiHomeLine
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/home")}
          />
            <RiUserStarLine 
              size={30}
              className='react-icon' 
              onClick={() =>
                navigate("/profile", {
                  state: {
                    id: currentUser?.id,
                  },
                })}
           />
          <RiPlayListAddFill
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/connections")}
          />
          {/* <RiMessage2Line size={30} className='react-icon'/>
          <RiNotification2Line size={30} className='react-icon'/> */}
        </div>
      )}
      {currentUser?.imageLink ? 
      (<img
      className="user-logo"
      src={currentUser?.imageLink}
      alt="user"
      onClick={displayPopup}
      />) : (
        <img
        className="user-logo"
        src={user}
        alt="user"
        onClick={displayPopup}
      />
      )
    } 
      
{searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)}>
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
