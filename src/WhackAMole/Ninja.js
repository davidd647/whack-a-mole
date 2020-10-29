import React from "react";

export default class Ninja extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div
        key={this.props.id}
        style={{
          left: this.props.fromLeft + "px",
          bottom: this.props.fromBottom + "px",
          width: "25px",
          height: 25 * (this.props.timer / 100) + "px",
          position: "absolute",
          backgroundColor: "black",
          borderRadius: "5px 5px 0 0",
        }}
        onClick={() =>
          this.props.removeNinja({ ninjaId: this.props.id, hurt: false })
        }
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <div
            style={{
              width: "100%",
              height: "3px",
              position: "absolute",
              top: "5px",
              backgroundColor: "tan",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "4px",
              left: "5px",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: "lightgray",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "4px",
              right: "5px",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: "lightgray",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "4px",
              left: "100%",
              width: "5px",
              height: "5px",
              borderRadius: "5px 5px 0 0",
              backgroundColor: "black",
              transform: "rotate(45deg)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "4px",
              left: "100%",
              width: "5px",
              height: "5px",
              borderRadius: "5px 5px 0 0",
              backgroundColor: "black",
              transform: "rotate(20deg)",
            }}
          ></div>
          {this.props.ninjaGoingUp ? (
            <div
              style={{
                position: "absolute",
                top: "4px",
                right: "calc(100% - 3px)",
                width: "10px",
                height: "5px",
                backgroundColor: "black",
                transform: "rotate(45deg)",
              }}
            ></div>
          ) : null}
          {this.props.ninjaGoingUp ? (
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% - 2px)",
                right: "calc(100% + 2px)",
                width: "10px",
                height: "2px",
                backgroundColor: "silver",
                transform: "rotate(45deg)",
                borderRadius: "10px",
              }}
            ></div>
          ) : null}
          {this.props.ninjaGoingUp ? (
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% - 2px)",
                right: "calc(100% + 2px)",
                width: "10px",
                height: "2px",
                backgroundColor: "silver",
                transform: "rotate(-45deg)",
                borderRadius: "10px",
              }}
            ></div>
          ) : null}
        </div>
      </div>
    );
  }
}
