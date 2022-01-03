import React, { useState, useEffect } from "react";

function OptionsWidget(props: Props) {
  const [options, setOptions]: any = useState([]);
  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  return (
    <div className="optionsWidget">
      {options.map((d: any, key: any) => {
        return (
          <button
            id={key}
            style={
              d.state ? { backgroundColor: "red" } : { backgroundColor: "blue" }
            }
            onClick={() => {
              let newOptions = options.map((obj: any) => {
                if (obj.title === d.title) {
                  return { title: obj.title, state: true };
                } else {
                  return { title: obj.title, state: false };
                }
              });
              if (!d.state) {
                setOptions(newOptions);
                props.selectedTime({ title: d.title });
              }
            }}
          >
            {d.title}
          </button>
        );
      })}
    </div>
  );
}

interface Props {
  options: any;
  selectedTime: any;
}

export default OptionsWidget;
