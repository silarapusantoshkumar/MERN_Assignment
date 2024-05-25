import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import profilePicture from '../assets/profile.jpg';
import './header.css'

export default function Header() {
  const navigate = useNavigate();

  const handleAddItemClick = () => {
    navigate('/adduser');
  };

  // const navigate = useNavigate();
  const handleHomePageClick = () => {
    navigate('/');
  };

  return (
   <div class= "header">
    {/* logo */}
    <div class= "header_image">
        <img src={logo} alt="logo"  onClick={handleHomePageClick}/>
    </div>

    {/* Profile Pic */}
    <div class="header_container">
    <button type="button" class="header_button" onClick={handleAddItemClick}> ADD ITEM </button>
    <div class="header_profile">
        <img src={profilePicture} alt="profile_pic"/>
    </div>
    </div>
   </div>
  )
}
