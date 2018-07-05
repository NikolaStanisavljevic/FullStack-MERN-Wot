import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import "chartjs-plugin-deferred";
import "./AvgDmg.css";

const avgDmg = props => {
  const stats = props.syncStats;

  const data = stats.map(res => {
    return res.historyStats.avgDmg;
  });

  // Destructuring battles array
  const battlesArr = [];
  const battles = data.map(res => {
    return res.map(res1 => {
      return battlesArr.push(res1.Battles);
    });
  });

  // Destructuring average damage per game
  const averageArr = [];
  const average = data.map(res => {
    return res.map(res1 => {
      return averageArr.push(res1.Average);
    });
  });

  const chartData = {
    labels: [...battlesArr],
    datasets: [
      {
        label: "Average Damage",
        data: [...averageArr],
        backgroundColor: "#3498DB"
      }
    ]
  };

  return (
    <div className="chart avg">
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Average Damage / Games played",
            fontSize: 25
          },
          legend: {
            display: true,
            position: "top"
          },
          tooltips: {
            enabled: true,
            displayColors: `false${average}${battles}`
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

export default connect(mapStateToProps, {})(avgDmg);
