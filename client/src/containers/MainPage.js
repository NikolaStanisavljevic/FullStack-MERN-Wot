import React, { Component } from "react";
import "./MainPage.css";
import BasicStats from "../components/BasicStats/BasicStats";
import TankStatsByNation from "../components/TankStats/TankStatsByNation/TankStatsByNation";
import TankStatsByTier from "../components/TankStats/TankStatsByTier/TankStatsByTier";
import TankStatsByClass from "../components/TankStats/TankStatsByClass/TankStatsByClass";
import WinRate from "../components/HistoryStats/WinRate/WinRate";
import WN8 from "../components/HistoryStats/WN8/WN8";
import AvgDmg from "../components/HistoryStats/AvgDmg/AvgDmg";
import MiniList from "../components/MiniList/MiniList";
import VehiclesList from "../components/VehiclesList/VehiclesList";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import Footer from "../components/Footer/Footer";
import Scrollspy from "react-scrollspy";
import "./Navigation.css";

export class Main extends Component {
  state = {
    loadingDone: false,
    smallTable: false,
    mobileTable: false,
    smallMobileTable: false
  };

  clickHandler = props => {
    this.setState({
      loadingDone: true
    });
  };

  // Make event listener on screen resize so i can control numbers of columns in tables based on screen width.
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }
  // Remove listener, throttle the force update.
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  // Function that 'listen' to srceen resize
  resize() {
    this.setState({
      smallTable: window.innerWidth <= 900,
      mobileTable: window.innerWidth <= 500,
      smallMobileTable: window.innerWidth <= 350
    });
  }

  render() {
    // Show Loading Screen
    if (!this.state.loadingDone) {
      return (
        <div>
          <LoadingScreen clicked={this.clickHandler} />
        </div>
      );
      // Display Data
    } else {
      return (
        <div>
          <div className="main">
            <section id="section-1">
              <BasicStats />
            </section>
            <section id="section-2">
              <TankStatsByNation small={this.state.smallMobileTable} />
              <TankStatsByTier small={this.state.smallMobileTable} />
              <TankStatsByClass />
            </section>
            <section id="section-3">
              <h3>Tanks Stats Summary by Class:</h3>
              <MiniList resize={this.state.smallTable} />
            </section>
            <section id="section-4">
              <h3>History Stats:</h3>
              <WinRate />
              <WN8 />
              <AvgDmg />
            </section>
            <section id="section-5">
              <h3 className="last">Vehicles List:</h3>
              <VehiclesList
                small={this.state.smallTable}
                mobile={this.state.mobileTable}
              />
              <Footer />
            </section>
          </div>
          <div className="dotstyle dotstyle-fillup">
            <Scrollspy
              items={[
                "section-1",
                "section-2",
                "section-3",
                "section-4",
                "section-5"
              ]}
              currentClassName="current"
            >
              <li>
                <a href="#section-1">section 1</a>
              </li>
              <li>
                <a href="#section-2">section 2</a>
              </li>
              <li>
                <a href="#section-3">section 3</a>
              </li>
              <li>
                <a href="#section-4">section 4</a>
              </li>
              <li>
                <a href="#section-5">section 5</a>
              </li>
            </Scrollspy>
          </div>
        </div>
      );
    }
  }
}

export default Main;
