import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import aapl from "./aapl.json";
import { Type } from "./types";
// import { howto, altplot } from "@d3/example-components";

function LineChart(props: Props) {
  const svgRef: any = useRef();

  useEffect(() => {
    draw();
  }, []);

  const draw = () => {
    d3.select("#container").select("svg").remove();
    d3.select("#container").select(".tooltip").remove();

    const xAxiswidth = props.width - props.left - props.right;
    const yAxisHeight = props.height - props.top - props.bottom;

    const clean_data = aapl.map((d) => {
      let newDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.date);
      return {
        date: newDate,
        close: +d.close,
        tooltipContent: `<b>x: </b>${newDate?.getDay()}<br><b>y: </b>${+d.close}`,
      };
    });

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
        d3.extent(clean_data, (d) => {
          return d.date;
        }) as [Date, Date]
      )
      .range([0, xAxiswidth])
      .nice();

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(clean_data, (d) => {
          return Math.max(
            ...clean_data.map((dt) => (dt as unknown as Type.Data).close)
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
      .call((g) =>
        g
          .append("text")
          .attr("x", -(props.left - 20))
          .attr("y", -10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Lines")
      );

    svg.selectAll("text").attr("stroke-width", 0.2);

    svg
      .append("path")
      .datum(clean_data)
      .attr("fill", "none")
      .attr("stroke", "#eec5d0")
      .attr("stroke-width", 1)
      .attr(
        "d",
        //@ts-ignore
        d3
          .line()
          .x((d) => {
            //@ts-ignore
            return x(d.date);
          })
          .y((d) => {
            //@ts-ignore
            return y(d.close);
          })
      );

    // Append a circle
    svg
      .append("circle")
      .attr("id", "circleBasicTooltip")
      .attr("cx", 100)
      .attr("cy", 100)
      .attr("r", 40)
      .attr("fill", "#69b3a2");

    // create a tooltip
    var tooltip = d3
      .select(".LineChart")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .text("I'm a circle!");

    d3.select("#circleBasicTooltip")
      .on("mouseover", function () {
        console.log("over");
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function (event) {
        console.log("move", d3.event);
      })
      .on("mouseout", function () {
        console.log("out");
        return tooltip.style("visibility", "hidden");
      });
  };

  return <svg ref={svgRef} className="LineChart" />;
}

interface Props {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export default LineChart;
