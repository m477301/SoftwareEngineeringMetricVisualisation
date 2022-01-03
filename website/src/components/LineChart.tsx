import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
// import { currentEvent } from "d3-selection";

import { Type } from "./types";
// import { howto, altplot } from "@d3/example-components";

function LineChart(props: Props) {
  const svgRef: any = useRef(null);

  useEffect(() => {
    draw();
  }, [props.data]);

  const draw = () => {
    d3.select("#container").select("svg").remove();
    // d3.select("#container").select(".tooltip").remove();

    const xAxiswidth = props.width - props.left - props.right;
    const yAxisHeight = props.height - props.top - props.bottom;

    // const clean_data = props.data.map((d:any) => {
    //   let newDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.date);
    //   return {
    //     date: newDate,
    //     close: +d.close,
    //     tooltipContent: `<b>x: </b>${newDate?.getDay()}<br><b>y: </b>${+d.close}`,
    //   };
    // });

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${props.width} ${props.height}`)
      .append("g")
      .attr("transform", `translate(${props.left}, ${props.top})`)
      .attr("color", "#85c4e9");

    // Scales
    const x = d3
      .scaleTime()
      .domain(
        d3.extent(props.data, (d: any) => {
          return d.date;
        }) as any
      )
      .range([0, xAxiswidth])
      .nice();

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(props.data, (d: any) => {
          return Math.max(
            ...props.data.map((dt: any) => (dt as unknown as Type.Data).close)
          );
        }),
      ] as [number, number])
      .range([yAxisHeight, 0])
      .nice();

    // gridlines in x axis function
    function make_x_gridlines() {
      return d3.axisBottom(x).ticks(5);
    }

    // gridlines in y axis function
    function make_y_gridlines() {
      return d3.axisLeft(y).ticks(5);
    }

    // add the X gridlines
    svg
      .append("g")
      .attr("transform", "translate(0," + yAxisHeight + ")")
      .call(
        make_x_gridlines()
          .tickSize(-yAxisHeight)
          .tickFormat("" as any)
      )
      .attr("stroke-width", 0.2);

    // add the Y gridlines
    svg
      .append("g")
      .call(
        make_y_gridlines()
          .tickSize(-xAxiswidth)
          .tickFormat("" as any)
      )
      .attr("stroke-width", 0.2);

    svg
      .append("g")
      .attr("transform", `translate(0, ${yAxisHeight})`)
      .call(d3.axisBottom(x))
      .attr("fill", "none")
      .attr("stroke", "#85c4e9")
      .attr("stroke-width", 4);

    svg
      .append("g")
      .call(d3.axisLeft(y))
      .attr("stroke", "#85c4e9")
      .attr("stroke-width", 4)
      .call((g: any) =>
        g
          .append("text")
          .attr("x", -(props.left - 20))
          .attr("y", -10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Lines")
      );

    svg.selectAll("text").attr("stroke-width", 0.2);

    var path = svg
      .append("path")
      .datum(props.data)
      .attr("fill", "none")
      .attr("stroke", "#eec5d0")
      .attr("stroke-width", 1)
      .attr(
        "d",
        //@ts-ignore
        d3
          .line()
          .x((d: any) => {
            //@ts-ignore
            return x(d.date);
          })
          .y((d: any) => {
            //@ts-ignore
            return y(d.close);
          })
      );

    svg.on("mousemove", function () {
      let point = d3.mouse(svgRef.current);
    });
  };

  // Tooltip
  // const toolDiv = d3
  //   .select("#chartArea")
  //   .append("div")
  //   .style("visibility", "hidden")
  //   .style("position", "absolute")
  //   .style("background-color", "red");

  return (
    <div className="canvas">
      <svg ref={svgRef} id="chartArea" className="LineChart" />;
    </div>
  );
}
interface Props {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  data: any;
}

export default LineChart;
