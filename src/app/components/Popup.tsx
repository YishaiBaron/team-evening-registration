import React, { FC } from "react";

interface PopupProps {
  handleClose: () => void;
  content: any;
}

const Popup: FC<PopupProps> = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;