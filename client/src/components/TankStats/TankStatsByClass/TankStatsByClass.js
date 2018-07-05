import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import "./TankStatsByClass.css";
import "chart.piecelabel.js";

const tankStatsByClass = props => {
  const stats = props.syncStats;

  const data = stats.map(res => {
    return res.tankStats.tankStatsByClass;
  });

  // Destructuring nations array
  const nationsArr = [];
  const nations = data.map(res => {
    return res.map(res1 => {
      return nationsArr.push(res1.Class);
    });
  });

  // Destructuring number of games played array
  const gamesArr = [];
  const games = data.map(res => {
    return res.map(res1 => {
      return gamesArr.push(res1.Games);
    });
  });

  const chartData = {
    labels: [...nationsArr],
    datasets: [
      {
        label: ["Battles By Class"],
        data: [...gamesArr],
        backgroundColor: [
          "#2C3E50",
          "#E74C3C",
          "#ECF0F1",
          "#3498DB",
          "#F26101",
          "#FFFF9D",
          "#BEEB9F",
          "#044C29",
          "#413659"
        ]
      }
    ]
  };

  return (
    <div className="class">
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Battles By Class",
            fontSize: 25
          },
          legend: {
            display: false,
            text: `${nations}${games}`
          },
          plugins: {
            deferred: {
              xOffset: 150, // defer until 150px of the canvas width are inside the viewport
              yOffset: "60%", // defer until 60% of the canvas height are inside the viewport
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

export default connect(mapStateToProps, {})(tankStatsByClass);
