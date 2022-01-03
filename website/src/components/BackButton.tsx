import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton(props: Props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  return (
    <button
      className="buttonStyle--back"
      onClick={() => {
        goBack();
      }}
    >
      {props.text}
    </button>
  );
}

interface Props {
  text: any;
}
export default BackButton;
