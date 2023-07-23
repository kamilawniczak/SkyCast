import React from "react";
import { Chart } from "react-charts";

const ChartContainer = ({ meteoData, className, active_Btn, unitsData }) => {
  const lable = `${active_Btn} ${unitsData && "(" + unitsData + ")"}`;

  const data = React.useMemo(
    () => [
      {
        label: lable,
        data: meteoData,
      },
    ],
    [meteoData]
  );

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum[0],
    }),
    [meteoData]
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum[1],
      },
    ],
    [meteoData]
  );

  return (
    <div className={className}>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          dark: true,
          series: {
            type: "line",
          },
        }}
      />
    </div>
  );
};

export default ChartContainer;
