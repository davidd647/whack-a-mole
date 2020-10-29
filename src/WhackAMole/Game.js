import React from "react";
import Ninja from "./Ninja";
import shuriken from "./shuriken.png";
import cursorImage from "../cursor.gif";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
  mouseLeft: 0,
  mouseTop: 0,
  mouseDown: false,
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
      fromLeft: 2.5 + Math.round(Math.random() * 95),
      fromBottom: Math.round(Math.random() * 95),
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

    if (newState.score > newState.highScore) {
      newState.highScore = newState.score;
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

    if (newState.score >= 40000) {
      newState.addNinjaTimerThreshold = 1;
    } else if (newState.score >= 35000) {
      newState.addNinjaTimerThreshold = 2;
    } else if (newState.score >= 30000) {
      newState.addNinjaTimerThreshold = 3;
    } else if (newState.score >= 25000) {
      newState.addNinjaTimerThreshold = 5;
    } else if (newState.score >= 20000) {
      newState.addNinjaTimerThreshold = 7;
    } else if (newState.score >= 15000) {
      newState.addNinjaTimerThreshold = 8;
    } else if (newState.score >= 10000) {
      newState.addNinjaTimerThreshold = 10;
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
          maxWidth: "500px",
          height: "500px",
          backgroundColor: "#345",
          margin: "0 auto",
          position: "relative",
          cursor: this.state.start && !this.state.finish ? "crosshair" : null,
        }}
        onMouseMove={(e) => {
          const newState = this.state;

          var left = e.nativeEvent.offsetX;

          if (left > 25) {
            newState.mouseLeft = left;
          }

          var top = e.nativeEvent.offsetY;

          if (top > 25) {
            newState.mouseTop = top - 24;
          }

          this.setState(newState);
        }}
        onMouseDown={() => {
          const newState = this.state;
          newState.mouseDown = true;
          this.setState(newState);
        }}
        onMouseUp={() => {
          const newState = this.state;
          newState.mouseDown = false;
          this.setState(newState);
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="pt-3">Life:</div>
          <div
            style={{
              height: "5px",
              width: "50%",
              margin: "0 auto",
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
        </div>
        {this.state.start ? (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>Seconds: {this.state.seconds}</div>
            <div>Score: {this.state.score}</div>
          </div>
        ) : (
          <Card
            className="p-3"
            style={{
              top: "50%",
              left: "50%",
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div style={{ position: "relative" }}>
              <img src={shuriken} alt="Shuriken" />
              <Ninja
                key={1000000}
                id={100000}
                fromLeft={50}
                fromBottom={0}
                timer={100}
                ninjaGoingUp={true}
                removeNinja={() => {}}
              />
            </div>
            <div style={{ color: "black" }}>
              <p className="pt-3">
                In this whack-a-mole spin-off, try to whack the ninjas before
                they throw their ninja stars at you! <br />
                <b>Achieve the highest score!</b>
              </p>
            </div>
            <Button onClick={this.handleStartClick} className="mt-3">
              Start
            </Button>
          </Card>
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
          <Card
            className="p-3"
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div style={{ position: "relative" }}>
              <img src={shuriken} alt="Shuriken" />
              <Ninja
                key={1000000}
                id={100000}
                fromLeft={50}
                fromBottom={0}
                timer={100}
                ninjaGoingUp={true}
                removeNinja={() => {}}
              />
            </div>
            <Card.Text
              style={{
                color: "#333",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <span>Your score: {this.state.score}</span>{" "}
              <span>High score: {this.state.highScore}</span>
            </Card.Text>
            <Button onClick={this.handleRestartClick} className="mt-3">
              Again?
            </Button>
          </Card>
        ) : null}

        {this.state.start && !this.state.finish ? (
          <img
            className="cursor"
            src={cursorImage}
            style={{
              position: "absolute",
              left: this.state.mouseLeft,
              top: this.state.mouseTop,
              transform: this.state.mouseDown ? "rotate(-90deg)" : "",
              pointerEvents: "none",
            }}
            alt="cursor"
          />
        ) : null}
      </div>
    );
  }
}
