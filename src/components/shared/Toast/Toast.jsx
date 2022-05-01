import PropTypes from "prop-types";
import React from "react";
import {
  IoCheckmarkDoneCircleOutline,
  IoWarningOutline
} from "react-icons/io5";
import { MdOutlineDangerous } from "react-icons/md";
import ToastContainer, { Icon, Msg } from "../Styles/Containers/Toast";

function Toast({ variant, message, onClick }) {
  let icon;
  let color;
  let textColor;
  if (variant === "success") {
    icon = <IoCheckmarkDoneCircleOutline />;
    color = "green";
  } else if (variant === "warning") {
    icon = <IoWarningOutline />;
    color = "yellow";
    textColor = "black";
  } else {
    icon = <MdOutlineDangerous />;
    color = "red";
  }
  return (
    <ToastContainer onClick={onClick} textColor={textColor} color={color}>
      <Msg>{message}</Msg>
      <Icon>{icon}</Icon>
    </ToastContainer>
  );
}

Toast.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Toast;
