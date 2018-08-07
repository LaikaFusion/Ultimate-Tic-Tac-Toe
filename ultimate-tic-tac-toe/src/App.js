import React, { Component } from 'react';
import './App.css';
import GameCell from './components/GameCell';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      gameCells:['','','','','','','','',''],
      initial: true,
    }
  }
  gameGridMaker = () =>{
    return this.state.gameCells.map((element,index) => {
        return <GameCell winmethod={this.gameCellWin} gameID={index} key={index}  />
    });
  }
  gameCellWin = () =>{
    let gameStates = JSON.parse(localStorage.getItem('gameStates').slice());
    this.setState({gameCells : gameStates});
  }
  componentDidMount() {
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
