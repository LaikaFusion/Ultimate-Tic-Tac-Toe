import React, { Component } from 'react';
import './App.css';
import GameCell from './components/GameCell';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      gameCells:['','','','','','','','','']
    }
  }
  
  gameGridMaker = () =>{
    return this.state.gameCells.map((element,index) => {
        return <GameCell winmethod={this.gameCellWin} gameID={index} key={index}  />
    });
  }
  gameCellWin = (ID,outcome) =>{
    let gameCellsToMod = this.state.gameCells.slice();
    gameCellsToMod.map((element,index) => {
        if(ID === index){
          return element=outcome;
        }
        else{
          return element;
        }
    });

    this.setState({gameCells: gameCellsToMod})
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
