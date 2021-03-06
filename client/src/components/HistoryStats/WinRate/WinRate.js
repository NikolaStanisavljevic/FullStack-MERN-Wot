import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import "./WinRate.css";
import "chartjs-plugin-deferred";

const winRate = props => {
  const stats = props.syncStats;

  const data = stats.map(res => {
    return res.historyStats.winRate;
  });

  // Destructuring battles array
  const battlesArr = [];
  const battles = data.map(res => {
    return res.map(res1 => {
      return battlesArr.push(res1.Battles);
    });
  });

  // Destructuring number of games played array
  const wRateArr = [];
  const wRate = data.map(res => {
    return res.map(res1 => {
      return wRateArr.push(res1.WinRate);
    });
  });

  const chartData = {
    labels: [...battlesArr],
    datasets: [
      {
        label: "Win Rate in %",
        data: [...wRateArr],
        backgroundColor: "#E74C3C"
      }
    ]
  };

  return (
    <div className="chart wr">
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Win Rate / Games played",
            fontSize: 25
          },
          legend: {
            display: true,
            position: "top"
          },
          tooltips: {
            enabled: true,
            displayColors: `false${wRate}${battles}`
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

export default connect(mapStateToProps, {})(winRate);
