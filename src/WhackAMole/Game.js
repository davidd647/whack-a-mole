import React from "react";
import Ninja from "./Ninja";
import shuriken from "./shuriken.png";

import Button from "react-bootstrap/Button";

var defaults = {
  start: false,
  finish: false,
  intervalHolder: null,
  counter: 0,
  seconds: 0,
  life: 10,
  addNinjaTimer: 0,
  addNinjaTimerThreshold: 15,
  ninjas: [],
  newNinjaId: 0,
  score: 0,
  highScore: 0,
};

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaults;

    this.handleStartClick = this.handleStartClick.bind(this);
    this.startGameLoop = this.startGameLoop.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.addNinja = this.addNinja.bind(this);
    this.removeNinja = this.removeNinja.bind(this);
    this.endGame = this.endGame.bind(this);
    this.endGameLoop = this.endGameLoop.bind(this);
    this.handleRestartClick = this.handleRestartClick.bind(this);
  }

  endGame() {
    const newState = this.state;
    newState.finish = true;
    this.setState(newState);

    this.endGameLoop();
  }

  addNinja() {
    const newState = this.state;

    newState.ninjas.push({
      fromLeft: Math.round(Math.random() * 475),
      fromBottom: Math.round(Math.random() * 475),
      id: newState.newNinjaId,
      timer: 1,
      ninjaGoingUp: true,
    });

    newState.newNinjaId++;

    this.setState(newState);
  }

  removeNinja({ ninjaId, hurt }) {
    if (this.state.finish) return;

    const newState = this.state;

    var index = newState.ninjas.findIndex((ninja) => ninja.id === ninjaId);
    newState.ninjas.splice(index, 1);

    hurt ? newState.life-- : (newState.score += 1000);

    if (newState.life <= 0) {
      this.endGame();
    }

    this.setState(newState);
  }

  gameLoop() {
    const newState = this.state;

    if (newState.addNinjaTimer > newState.addNinjaTimerThreshold) {
      newState.addNinjaTimer = 0;
    }
    if (newState.addNinjaTimer === 0) {
      this.addNinja();
    }

    if (newState.score >= 10000) {
      newState.addNinjaTimerThreshold = 10;
    } else if (newState.score >= 15000) {
      newState.addNinjaTimerThreshold = 5;
    } else if (newState.score >= 20000) {
      newState.addNinjaTimerThreshold = 2;
    } else if (newState.score >= 25000) {
      newState.addNinjaTimerThreshold = 1;
    } else if (newState.score >= 30000) {
      newState.addNinjaTimerThreshold = 0.5;
    } else if (newState.score >= 35000) {
      newState.addNinjaTimerThreshold = 0.25;
    } else if (newState.score >= 40000) {
      newState.addNinjaTimerThreshold = 0.01;
    }

    if (newState.score > newState.highScore) {
      newState.highScore = newState.score;
    }

    newState.counter++;
    newState.seconds = Math.round(newState.counter / 10);
    newState.addNinjaTimer++;

    newState.ninjas.forEach((ninja) => {
      ninja.ninjaGoingUp ? (ninja.timer += 3) : (ninja.timer -= 10);
      if (ninja.timer >= 100) {
        ninja.ninjaGoingUp = false;
        newState.life--;
      }

      if (ninja.timer <= 0) {
        this.removeNinja({ ninjaId: ninja.id, hurt: false });
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

  endGameLoop() {
    const newState = this.state;

    clearInterval(newState.intervalHolder);
    newState.intervalHolder = 0;

    this.setState(newState);
  }

  handleStartClick(e) {
    e.preventDefault();
    this.startGameLoop();
  }

  handleRestartClick(e) {
    e.preventDefault();

    const newState = this.state;

    newState.start = false;
    newState.finish = false;
    newState.intervalHolder = null;
    newState.counter = 0;
    newState.seconds = 0;
    newState.life = 10;
    newState.addNinjaTimer = 0;
    newState.addNinjaTimerThreshold = 15;
    newState.ninjas = [];
    newState.newNinjaId = 0;
    newState.score = 0;

    this.setState(newState);
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
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>Seconds: {this.state.seconds}</div>
            <div>Score: {this.state.score}</div>
          </div>
        ) : (
          <div
            style={{
              top: "50%",
              left: "50%",
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          >
            <img src={shuriken} alt="Shuriken" />
            <Button onClick={this.handleStartClick} className="mt-3">
              Start
            </Button>{" "}
            <Ninja
              key={1000000}
              id={100000}
              fromLeft={10}
              fromBottom={100}
              timer={0}
              ninjaGoingUp={false}
              removeNinja={() => {}}
            />
          </div>
        )}

        {this.state.ninjas.map((ninja) => {
          return (
            <Ninja
              key={ninja.id}
              id={ninja.id}
              fromLeft={ninja.fromLeft}
              fromBottom={ninja.fromBottom}
              timer={ninja.timer}
              ninjaGoingUp={ninja.ninjaGoingUp}
              removeNinja={this.removeNinja}
            />
          );
        })}

        {this.state.finish ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "80%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <span>Your score: {this.state.score}</span>{" "}
              <span>High score: {this.state.highScore}</span>
            </div>
            <button onClick={this.handleRestartClick}>Again?</button>
          </div>
        ) : null}
      </div>
    );
  }
}
