import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import "./WN8.css";
import "chartjs-plugin-deferred";

const wn8 = props => {
  const stats = props.syncStats;

  const data = stats.map(res => {
    return res.historyStats.wn8;
  });

  // Destructuring battles array
  const battlesArr = [];
  const battles = data.map(res => {
    return res.map(res1 => {
      return battlesArr.push(res1.Battles);
    });
  });

  // Destructuring wn8 efficiency
  const wn8Arr = [];
  const wn8 = data.map(res => {
    return res.map(res1 => {
      return wn8Arr.push(res1.WN8);
    });
  });

  const chartData = {
    labels: [...battlesArr],
    datasets: [
      {
        label: "WN8",
        data: [...wn8Arr],
        backgroundColor: "#ECF0F1"
      }
    ]
  };

  return (
    <div className="chart wn8">
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "WN8 / Games played",
            fontSize: 25
          },
          legend: {
            display: true,
            position: "top"
          },
          tooltips: {
            enabled: true,
            displayColors: `false${wn8}${battles}`
          },
          plugins: {
            deferred: {
              xOffset: 150, // defer until 150px of the canvas width are inside the viewport
              yOffset: "50%", // defer until 50% of the canvas height are inside the viewport
              delay: 500 // delay of 500 ms after the canvas is considered inside the viewport
            }
          }
        }}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  syncStats: state.get.syncStats
});

export default connect(mapStateToProps, {})(wn8);
