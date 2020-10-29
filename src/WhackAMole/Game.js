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
      ninjaTimer: 0,
      ninjaTimerThreshold: 15,
      ninjas: [],
      newNinjaId: 0,
    };

    this.handleStartClick = this.handleStartClick.bind(this);
    this.startGameLoop = this.startGameLoop.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.addNinja = this.addNinja.bind(this);
    this.removeNinja = this.removeNinja.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  endGame() {
    console.log("game ended!");
  }

  addNinja() {
    // put a ninja into the ninjas array
    // just need coordinates...

    const newState = this.state;

    newState.ninjas.push({
      fromLeft: Math.round(Math.random() * 475),
      fromBottom: Math.round(Math.random() * 475),
      id: newState.newNinjaId,
      timer: 1,
      ninjaGoingUp: true,
    });

    newState.newNinjaId++;

    console.log(newState.ninjas);

    this.setState(newState);
  }

  removeNinja({ ninjaId, hurt }) {
    console.log({ ninjaId, hurt });

    const newState = this.state;

    var index = newState.ninjas.findIndex((ninja) => ninja.id === ninjaId);
    newState.ninjas.splice(index, 1);

    if (hurt) {
      newState.life--;
    }

    if (newState.life <= 0) {
      this.endGame();
    }

    this.setState(newState);
  }

  gameLoop() {
    const newState = this.state;

    if (newState.ninjaTimer > newState.ninjaTimerThreshold) {
      newState.ninjaTimer = 0;
    }
    if (newState.ninjaTimer == 0) {
      this.addNinja();
    }

    newState.counter++;
    newState.seconds = Math.round(newState.counter / 10);
    newState.ninjaTimer++;

    newState.ninjas.forEach((ninja) => {
      ninja.ninjaGoingUp ? (ninja.timer += 3) : (ninja.timer -= 3);
      if (ninja.timer >= 100) {
        ninja.ninjaGoingUp = false;
      }

      if (ninja.timer <= 0) {
        this.removeNinja({ ninjaId: ninja.id, hurt: true });
      }
    });

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
          // overflow: "hidden",
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

        {this.state.ninjas.map((ninja) => {
          return (
            <div
              key={ninja.id}
              style={{
                left: ninja.fromLeft + "px",
                bottom: ninja.fromBottom + "px",
                width: "25px",
                height: 25 * (ninja.timer / 100) + "px",
                position: "absolute",
                backgroundColor: "black",
              }}
              onClick={() =>
                this.removeNinja({ ninjaId: ninja.id, hurt: false })
              }
            ></div>
          );
        })}
      </div>
    );
  }
}
