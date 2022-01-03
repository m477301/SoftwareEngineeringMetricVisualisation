import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

/* COMPONENTS */
import ActionText from "./ActionText";

function PieChart(props: Props) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (props.data && props.data.length >= 1) {
      // Get positions for each data object
      const piedata = d3.pie().value((d: any) => {
        return d.count as any;
      })(props.data);

      // Define Arcs for graphing and labeling
      const arc = d3.arc().innerRadius(0).outerRadius(91);

      // Define the Size and position of the svg
      const svg = d3
        .select(chartRef.current)
        .attr("width", 250)
        .attr("height", 250)
        .append("g")
        .attr("transform", "translate(125, 125)");

      // Add Tooltip
      const tooldiv = d3
        .select("#pieChart")
        .append("div")
        .style("visibility", "hidden")
        .style("position", "absolute")
        .style("background-color", "#f0d9d9");

      // Draw Pie
      svg
        .append("g")
        .selectAll("path")
        .data(piedata)
        .enter()
        .append("path")
        .attr("d", arc as any)
        .style("fill", function () {
          return "hsl(" + Math.random() * 360 + ",100%,50%)";
        })
        .attr("stroke", "white")
        .on("mouseover", (e: any, d: any) => {
          tooldiv
            .style("visibility", "visible")
            .text(`${e.data.item}: ` + `${e.data.count}`);
        })
        .on("mousemove", (e: any, d: any) => {
          tooldiv.style("top", d3.event.pageY - 50 + "px");
          tooldiv.style("left", d3.event.pageX - 50 + "px");
        })
        .on("mouseout", () => {
          tooldiv.style("visibility", "hidden");
        });
    }
  }, [props.data]);

  return (
    <div id="pieChart">
      {props.data === -1 ? (
        <ActionText text={"Loading..."} />
      ) : props.data[0].count == 0 ? (
        <ActionText text={"No Data Available"} />
      ) : (
        <svg ref={chartRef} />
      )}
    </div>
  );
}

interface Props {
  data: any;
}

export default PieChart;
