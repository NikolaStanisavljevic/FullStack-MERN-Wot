import React from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import "./TankStatsByNation.css";
import "chart.piecelabel.js";
import "chartjs-plugin-deferred";

const tankStatsByNation = props => {
  const stats = props.syncStats;

  const data = stats.map(res => {
    return res.tankStats.tankStatsByNation;
  });

  // Destructuring nations array
  const nationsArr = [];
  const nations = data.map(res => {
    return res.map(res1 => {
      return nationsArr.push(res1.Nation);
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
        label: ["Battles By Nation"],
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
    <div className="chart nation">
      <Doughnut
        data={chartData}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Battles By Nations",
            fontSize: 25
          },
          legend: {
            display: !props.small,
            position: "right"
          },
          pieceLabel: {
            render: `percentage${nations}${games}`
          },
          plugins: {
            deferred: {
              xOffset: 150, // defer until 150px of the canvas width are inside the viewport
              yOffset: "101%", // defer until 101% of the canvas height are inside the viewport (fix for bug)
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

export default connect(mapStateToProps, {})(tankStatsByNation);
