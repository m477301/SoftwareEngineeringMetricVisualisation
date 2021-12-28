import React from "react";

/* COMPONENTS */
import OptionsWidget from "./OptionsWidget";

function ChartHeading(props: Props) {
  const selectedTimeOptionsWidget = (data: any) => {
    if (data) props.selectedTime(data);
  };
  return (
    <div className="chartHeading">
      <div className="title">{props.title}</div>
      {props.widgetOptions ? (
        <OptionsWidget
          options={props.widgetOptions}
          selectedTime={selectedTimeOptionsWidget}
        />
      ) : null}
    </div>
  );
}

interface Props {
  title: string;
  widgetOptions?: any;
  selectedTime: any;
}

export default ChartHeading;
