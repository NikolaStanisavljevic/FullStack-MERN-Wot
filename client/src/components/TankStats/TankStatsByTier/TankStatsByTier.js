import React from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import "chart.piecelabel.js";
import "chartjs-plugin-deferred";
import "./TankStatsByTier.css";

const tankStatsByTier = props => {
  const stats = props.syncStats;

  const data = stats.map(res => {
    return res.tankStats.tankStatsByTier;
  });

  // Destructuring tier array
  const tierArr = [];
  const tier = data.map(res => {
    return res.map(res1 => {
      return tierArr.push(res1.Tier);
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
    labels: [...tierArr],
    datasets: [
      {
        label: ["Battles By Tier"],
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
          "#413659",
          "#FF69B4"
        ]
      }
    ]
  };

  return (
    <div className="chart tier">
      <Doughnut
        data={chartData}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Battles By Tier",
            fontSize: 25
          },
          legend: {
            display: !props.small,
            position: "right"
          },
          pieceLabel: {
            render: `percentage ${games}${tier}`
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

export default connect(
  mapStateToProps,
  {}
)(tankStatsByTier);
