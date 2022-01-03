import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

/* COMPONENTS */
import ActionText from "./ActionText";

function BarChart(props: Props) {
  const chartRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const update = useRef(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (update.current) {
        d3.selectAll("g").remove();
      } else {
        update.current = true;
      }
    });
    if (props.data && props.data.length >= 1) {
      if (chartRef.current !== null) {
        d3.select("#barChart").select("svg").selectAll("g").remove();
      }

      drawChart(props.data, dimensions);
    }
  }, [props.data, dimensions]);
  const margin = { top: 25, bottom: 15, right: 15, left: 30 };

  const drawChart = (data: any, dimensions: any) => {
    const chartWidth = dimensions.width / 2 - margin.left - margin.right;

    const chartHeight = dimensions.height / 3.5 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .attr("width", chartWidth + margin.left + margin.right)
      .attr("height", chartHeight + margin.top + margin.bottom);

    const x = d3
      .scaleBand()
      .domain(d3.range(data.length) as any)
      .range([margin.left, chartWidth - margin.right])
      .padding(0.1);

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0, " + chartHeight + ")")
      .call(
        d3
          .axisBottom(x)
          .tickFormat((i) => data[i].timeScale)
          .tickSizeOuter(0)
      );

    const max: any = d3.max(data, function (d: any) {
      return d.data.length;
    });

    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([chartHeight, margin.top]);

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(d3.axisLeft(y));

    svg
      .append("g")
      .attr("fill", "#be3b63")
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i: any) => x(i) as any)
      .attr("y", (d: any) => y(d.data.length))
      .attr("height", (d: any) => y(0) - y(d.data.length))
      .attr("width", x.bandwidth())
      .on("click", function (d, i) {
        if (props.convertScale) {
          props.convertScale(d);
        }
      });

    svg
      .exit()
      .transition()
      .duration(300)
      .attr("y", (d) => chartHeight)
      .attr("height", 0)
      .remove();
  };

  return (
    <div id="barChart">
      {props.data === -1 ? (
        <ActionText text={"Loading..."} />
      ) : props.data.length == 0 ? (
        <ActionText text={"No Data Available"} />
      ) : (
        <svg ref={chartRef} />
      )}
    </div>
  );
}

interface Props {
  data: any;
  convertScale?: any;
}

export default BarChart;
