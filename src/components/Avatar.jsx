import React from "react";
import avatarImg from "../assets/avatar_placeholder.png";

function Avatar({ user, showName }) {
  return (
    <div className="avatar-component">
      <img className="avatar" src={avatarImg} alt="" />
      {showName && <h3 className="avatar-title">{user.name}</h3>}
    </div>
  );
}

export default Avatar;
