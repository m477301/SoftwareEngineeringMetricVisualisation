import React from "react";

function ActionText(props: Props) {
  return <h1>{props.text}</h1>;
}

interface Props {
  text: any;
}

export default ActionText;
