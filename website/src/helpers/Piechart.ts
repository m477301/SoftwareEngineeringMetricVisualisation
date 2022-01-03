import { pie } from "d3";

export const dataLanguagesToPieChartData = (data: any) => {
  let pieChartData = [];
  for (var key in data) {
    // skip loop if the property is from prototype
    if (!data.hasOwnProperty(key)) continue;

    pieChartData.push({
      item: key,
      count: data[key],
    });
  }
  console.log("PIEE", pieChartData);
  return pieChartData;
};
