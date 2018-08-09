import React, { Component } from "react";
import "./App.css";
import GameCell from "./components/GameCell";
import Modal from "react-modal";

Modal.setAppElement("#root");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameCells: ["", "", "", "", "", "", "", "", ""],
      initial: true,
      currentActive: 9,
      currentTurn: "X",
      showModalInstructions: false,
      showModalCredits: false,
      showModalWinner: false,
      winner: ""
    };
  }
  gameGridMaker = () => {
    return this.state.gameCells.map((element, index) => {
      return (
        <GameCell
          switchturn={this.switchTurn}
          active={
            this.state.currentActive === index || this.state.currentActive === 9
              ? true
              : false
          }
          changeactivemethod={this.changeActiveMethod}
          winmethod={this.gameCellWin}
          currentTurn={this.state.currentTurn}
          gameID={index}
          key={index}
        />
      );
    });
  };
  gameCellWin = () => {
    let gameStates = JSON.parse(localStorage.getItem("gameStates").slice());
    this.setState({ gameCells: gameStates }, () => {
      this.calculateWinner();
    });
  };
  calculateWinner = () => {
    const game = this.state.gameCells;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    if (game.indexOf(null) === -1) {
      this.setState({ winner: "D" });
      this.toggleOverlay("Instructions");
    }
    lines.forEach(element => {
      if (
        game[element[0]] === game[element[1]] &&
        game[element[0]] === game[element[2]] &&
        game[element[0]] !== null
      ) {
        this.setState({ winner: game[element[0]] });
        this.toggleOverlay("Instructions");
      }
    });
  };
  changeActiveMethod = value => {
    if (this.state.gameCells[value]) {
      this.setState({ currentActive: 9 });
    } else {
      this.setState({ currentActive: value });
    }
  };
  switchTurn = () => {
    if (this.state.currentTurn === "X") {
      this.setState({ currentTurn: "O" });
    } else {
      this.setState({ currentTurn: "X" });
    }
  };
  toggleOverlay = which => {
    const modalName = "showModal" + which;
    if (this.state[modalName]) {
      this.setState({ [modalName]: false });
    } else {
      this.setState({ [modalName]: true });
    }
  };
  reset = () => {
    this.setState({ initial: true });
    window.location.reload();
  };
  componentDidMount = () => {
    if (this.state.initial === true) {
      localStorage.setItem("gameStates", JSON.stringify(Array(9).fill(null)));
      this.setState({ initial: false });
    }
  };

  render() {
    return (
      <div className="App">
        <Modal
          onRequestClose={() => {
            this.toggleOverlay("Instructions");
          }}
          className="Modal"
          isOpen={this.state.showModalInstructions}
        >
          <div className="closeButtonRow">
            <button
              className="closeButton"
              onClick={() => {
                this.toggleOverlay("Instructions");
              }}
            >
              X
            </button>
          </div>
          <div className="titleRow">
            <span className="title">How to play:</span>
          </div>
          <div className="instructions">
            <p>
              The game starts with X playing wherever they want in any of the 81
              empty spots. This move 'sends' their opponent to its relative
              location. For example, if X played in the top right square of
              their local board, then O needs to play next in the local board at
              the top right of the global board. O can then play in any one of
              the nine available spots in that local board, each move sending X
              to a different local board.
            </p>

            <p>
              If a move is played so that it is to win a local board by the
              rules of normal tic-tac-toe, then the entire local board is marked
              as a victory for the player in the global board.
            </p>

            <p>
              Once the outcome of a local board is decided (win or draw), no
              more moves may be played in that board. If a player is sent to
              such a board, then that player may play in any other board.
            </p>

            <p>
              Game play ends when either a player wins the global board, or
              there are no legal moves remaining.
            </p>
            <p>
              {" "}
              -
              <a href="https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe#Rules">
                WIKIPEDIA
              </a>
            </p>
          </div>
        </Modal>
        <Modal
          onRequestClose={() => {
            this.toggleOverlay();
          }}
          className="Modal"
          isOpen={this.state.showModalCredits}
        >
          <div className="closeButtonRow">
            <button
              className="closeButton"
              onClick={() => {
                this.toggleOverlay("Credits");
              }}
            >
              X
            </button>
          </div>
          <div className="titleRow">
            <span className="title">Credits:</span>
          </div>
          <div className="credits">
            <div className="creditsLine">
              This implementation of Ultimate Tic Tac Toe was written by: <br />
              <span className="name">Andrew McLaughlin</span>
            </div>

            <div className="creditsLine">
              <a href="https://github.com/LaikaFusion/Ultimate-Tic-Tac-Toe">
                GitHub
              </a>
            </div>
          </div>
        </Modal>
        <Modal
          onRequestClose={() => {
            this.toggleOverlay();
          }}
          className="Modal"
          isOpen={this.state.showModalWinner}
        >
          <div className="closeButtonRow">
            <button
              className="closeButton"
              onClick={() => {
                this.toggleOverlay("Winner");
              }}
            >
              X
            </button>
          </div>
          <div className="titleRow">
            <span className="title">
              {this.state.winner === "D"
                ? "Draw"
                : "Winner " + this.state.winner}
            </span>
          </div>
          <div>
            <button onClick={this.reset}> RESET</button>
          </div>
        </Modal>
        <div className="game">
          <div className="title titleBorder">Ultimate Tic Tac Toe</div>
          <div className="buttonRow">
            <button
              className="smallButton"
              onClick={() => {
                this.toggleOverlay("Instructions");
              }}
            >
              How to Play!
            </button>
            <button
              className="smallButton"
              onClick={() => {
                this.toggleOverlay("Credits");
              }}
            >
              Credits{" "}
            </button>
          </div>
          <div className="gameGrid">{this.gameGridMaker()}</div>
          <div className="smallButton">Turn: {this.state.currentTurn}</div>
        </div>
      </div>
    );
  }
}

export default App;
