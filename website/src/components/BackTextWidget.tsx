import React from "react";

function BackTextWidget(props: Props) {
  return (
    <button
      className="buttonStyle"
      onClick={() => {
        props.backTo();
      }}
    >
      Back To {props.text}
    </button>
  );
}

interface Props {
  text: any;
  backTo: any;
}

export default BackTextWidget;
