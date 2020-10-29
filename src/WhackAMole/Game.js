import React from "react";

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      intervalHolder: null,
      counter: 0,
      seconds: 0,
      life: 10,
    };

    this.handleStartClick = this.handleStartClick.bind(this);
    this.startGameLoop = this.startGameLoop.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
  }

  gameLoop() {
    const newState = this.state;

    newState.counter++;
    newState.seconds = Math.round(newState.counter / 10);

    this.setState(newState);
  }

  startGameLoop() {
    const newState = this.state;

    newState.intervalHolder = setInterval(this.gameLoop, 100);
    newState.start = true;

    this.setState(newState);
  }

  handleStartClick(e) {
    e.preventDefault();
    console.log("hi");
    this.startGameLoop();
  }

  render() {
    return (
      <div
        style={{
          width: "500px",
          height: "500px",
          backgroundColor: "#345",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "5px",
            backgroundColor: "red",
            position: "relative",
          }}
        >
          <div
            style={{
              width: this.state.life * 10 + "%",
              height: "5px",
              backgroundColor: "lightblue",
            }}
          ></div>
        </div>
        {this.state.start ? (
          <div>Seconds: {this.state.seconds}</div>
        ) : (
          <button onClick={this.handleStartClick}>Start</button>
        )}
      </div>
    );
  }
}
