import React, { Component } from 'react';
import './App.css';
import GameCell from './components/GameCell';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      gameCells:['','','','','','','','',''],
      initial: true,
      currentActive: 9,
      currentTurn: 'X'
    }
  }
  gameGridMaker = () =>{
    return this.state.gameCells.map((element,index) => {
        return <GameCell switchturn={this.switchTurn} active={(this.state.currentActive=== index || this.state.currentActive=== 9)? true: false} changeactivemethod={this.changeActiveMethod} winmethod={this.gameCellWin} currentTurn={this.state.currentTurn} gameID={index} key={index}  />
    });
  }
  gameCellWin = () =>{
    let gameStates = JSON.parse(localStorage.getItem('gameStates').slice());
    this.setState({gameCells : gameStates},()=>{
      this.calculateWinner();

    });
  }
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
      [2, 4, 6],
    ];
    if(game.indexOf(null) === -1){
      console.log('D');

    }
    lines.forEach(element => {
      if (game[element[0]] === game[element[1]] && game[element[0]] === game[element[2]] && game[element[0]] !== null) {
        console.log(game[element[0]]);
      }
    });
  }
  changeActiveMethod = (value)=>{
    if ( this.state.gameCells[value] ) {
      this.setState({currentActive:9})
    }
    else{
      this.setState({currentActive:value})
    }
  }
  switchTurn= ()=>{
    if (this.state.currentTurn === 'X') {
      this.setState({currentTurn: 'O'})
    } else {
      this.setState({currentTurn: 'X'})
    }
  }
  componentDidMount =()=> {
    if(this.state.initial === true){
      localStorage.setItem('gameStates', (JSON.stringify(Array(9).fill(null))));
      this.setState({initial:false});
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className='gameGrid'>
        {this.gameGridMaker()}
        </div>
      </div>
    );
  }
}

export default App;
