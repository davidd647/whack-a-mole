import React from "react";
import Game from "./Game";

export default class WhackAMole extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 className="super-font">Whack a Ninja</h1>
        <Game />
      </div>
    );
  }
}
