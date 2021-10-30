import React from "react";
import doubleCheck from "../assets/done_all.svg";
import Avatar from "./Avatar";

const ContactBox = ({ contact, setContactSelected, messages }) => {
  const newDateArr = messages.sort(function (a, b) {
    return new Date(a.created_at) - new Date(b.created_at);
  });
  let lastMsg = newDateArr[newDateArr.length - 1];
  console.log(lastMsg);
  const truncate = (text, length) => {
    return text.length > length ? `${text.substring(0, length)} ...` : text;
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }
  return (
    <div className="contact-box" onClick={() => setContactSelected(contact)}>
      <Avatar user={contact} />
      <div className="right-section">
        <div className="contact-box-header">
          <h3 className="avatar-title" style={{ fontWeight: "bold" }}>
            {truncate(contact.name, 25)}
          </h3>
          <span className="time-mark">{formatDate(lastMsg.created_at)}</span>
        </div>
        <div className="last-msg">
          <img src={doubleCheck} alt="" className="icon-small" />
          <span className="text">{truncate(lastMsg.content, 25)}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactBox;
