import React from "react";

/* COMPONENTS */
import BackTextWidget from "./BackTextWidget";

function ChartHeading(props: Props) {
  return (
    <div className="chartHeading">
      <div className="title">{props.title}</div>
      {props.backText ? (
        <BackTextWidget
          text={props.backText}
          backTo={() => {
            props.backTo();
          }}
        />
      ) : null}
    </div>
  );
}

interface Props {
  title: string;
  widgetOptions?: any;
  backText: any;
  backTo: any;
}

export default ChartHeading;
