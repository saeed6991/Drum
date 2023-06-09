import React, { useState } from "react";

function App(props) {
  const styling = {
    margin: "10px",
  };
  const labelStyling = {
    width: "150px",
    height: "60px",
    backgroundColor: "grey",
    margin: "10px",
  };
  const divButtonsStyling = {
    display: "grid",
    gridTemplateColumns: "repeat(3, .1fr)",
    gridGap: "15px",
    margin: "20px",
  };

  const [keyPressed, setKeyPressed] = useState("");

  const handleKeyDown = (event) => {
    console.log("Key pressed:", event.key);
    const keyPressed = event.key;
    setKeyPressed(keyPressed);
    var button;
    switch (keyPressed) {
      case "q":
        button = document.getElementById("Q");
        break;
      case "w":
        button = document.getElementById("W");
        break;
      case "e":
        button = document.getElementById("E");
        break;
      case "a":
        button = document.getElementById("A");
        break;
      case "s":
        button = document.getElementById("S");
        break;
      case "d":
        button = document.getElementById("D");
        break;
      case "z":
        button = document.getElementById("Z");
        break;
      case "x":
        button = document.getElementById("X");
        break;
      case "c":
        button = document.getElementById("C");
        break;
      default:
        button = null;
        break;
    }
    console.log(button);
    if (button) {
      console.log(button);
      button.click();
    }
  };

  return (
    <div className="container" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="keys"></div>
      <div className="buttonsContainer">
        <div className="powerButton" style={styling}>
          <div>
            <p>Power</p>
            <PowerButton />
          </div>
        </div>
        <div className="stateLabel" style={labelStyling}>
          <p>{keyPressed}</p>
        </div>
        <div className="vollumeInput">
          <VolumeInput />
        </div>
        <div className="bankButtons" style={divButtonsStyling}>
          <BankButtons buttonText="Q" />
          <BankButtons buttonText="W" />
          <BankButtons buttonText="E" />
          <BankButtons buttonText="A" />
          <BankButtons buttonText="S" />
          <BankButtons buttonText="D" />
          <BankButtons buttonText="Z" />
          <BankButtons buttonText="X" />
          <BankButtons buttonText="C" />
        </div>
        <div className="vollumeInput" style={styling}>
          <div>
            <p>Bank</p>
            <PowerButton />
          </div>
        </div>
      </div>
    </div>
  );
}

class BankButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: false,
      source: "",
    };
    this.buttonClicked = this.buttonClicked.bind(this);
    this.audioRef = React.createRef();
  }
  buttonClicked() {
    console.log(this.props.buttonText);

    switch (this.props.buttonText) {
      case "Q":
        this.setState({
          source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
        });
        break;
      case "W":
        this.setState({
          source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
        });
        break;
      case "E":
        this.setState({
          source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
        });
        break;
      case "A":
        this.setState({
          source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
        });
        break;
      case "S":
        this.setState({
          source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
        });
        break;
      case "D":
        this.setState({
          source: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
        });
        break;
      case "Z":
        this.setState({
          source: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
        });
        break;
      case "X":
        this.setState({
          source: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
        });
        break;
      case "C":
        this.setState({
          source: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
        });
        break;
    }
    console.log(this.state.source);
    this.setState({
      button: true,
    });
    setTimeout(() => {
      this.setState({
        button: false,
      });
    }, 200);
  }
  render() {
    const divStylingNormal = {
      backgroundColor: "rgb(114, 133, 45)",
      width: "120px",
      height: "60px",
      textAlign: "center",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      borderRadius: "50px 50px 10px 10px",
    };
    const divStylingButtonPushed = {
      backgroundColor: "rgb(50, 0, 0)",
      width: "120px",
      height: "60px",
      textAlign: "center",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      borderRadius: "50px",
      color: "white",
    };
    if (!this.state.button) {
      return (
        <div
          style={divStylingNormal}
          id={this.props.buttonText}
          onClick={this.buttonClicked}
        >
          <p>{this.props.buttonText}</p>
        </div>
      );
    } else {
      return (
        <div
          style={divStylingButtonPushed}
          id={this.props.buttonText}
          onClick={this.buttonClicked}
        >
          <p>{this.props.buttonText}</p>
          <audio src={this.state.source} autoPlay ref={this.audioRef}></audio>
        </div>
      );
    }
  }
}

class VolumeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 60,
    };
    this.handleVolumeKey = this.handleVolumeKey.bind(this);
  }
  handleVolumeKey(event) {
    const newVolume = event.target.value;
    this.setState({
      volume: newVolume,
    });
  }
  render() {
    return (
      <div>
        <input
          max="100"
          min="0"
          step="1"
          type="range"
          value="60"
          onChange={this.handleVolumeKey}
        ></input>
      </div>
    );
  }
}

class PowerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      On: true,
    };
    this.PowerPushed = this.PowerPushed.bind(this);
  }

  PowerPushed() {
    if (this.state.On) {
      this.setState({
        On: false,
      });
    } else {
      this.setState({
        On: true,
      });
    }
  }

  render() {
    const frameStyling = {
      backgroundColor: "black",
      width: "100px",
      height: "50px",
    };

    const buttonStylingOn = {
      backgroundColor: "yellow",
      width: "40px",
      height: "40px",
      float: "right",
      margin: "5% 3%",
    };

    const buttonStylingOff = {
      backgroundColor: "yellow",
      width: "40px",
      height: "40px",
      float: "left",
      margin: "5% 3%",
    };

    if (this.state.On) {
      return (
        <div style={frameStyling} onClick={this.PowerPushed}>
          <div style={buttonStylingOn}></div>
        </div>
      );
    } else {
      return (
        <div style={frameStyling} onClick={this.PowerPushed}>
          <div style={buttonStylingOff}></div>
        </div>
      );
    }
  }
}

export default App;
