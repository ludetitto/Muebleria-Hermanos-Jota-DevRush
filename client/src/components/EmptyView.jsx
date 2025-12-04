import React from "react";
import "../assets/css/emptyView.css";

export default function EmptyView({
  icon,
  title,
  message,
  btnText,
  handleOnClick,
}) {
  return (
    <div className="empty-view-container">
      {icon}
      <h2>{title}</h2>
      <p>{message}</p>
      <button className="btn-primary" onClick={handleOnClick}>
        {btnText}
      </button>
    </div>
  );
}
