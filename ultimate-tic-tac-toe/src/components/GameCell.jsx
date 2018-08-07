import React, { Component } from 'react';

class gameCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: '',
      gameBoard: [],
      winner: ''
      
    }
  }
  componentDidMount() {
    this.setState({
      ID: this.props.gameID, gameBoard:Array(9).fill(null)
    })
  }
  calculateWinner() {
    const game = this.state.gameBoard;
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
      this.writeWin('D');

    }
    lines.forEach(element => {
      if (game[element[0]] === game[element[1]] && game[element[0]] === game[element[2]] && game[element[0]] !== null) {
        this.writeWin(game[element[0]]);
      }
    });
  }
  
  fillSquare = (event)=>{
        if( event.target.textContent !=='' || event.target.textContent !=='X' || event.target.textContent !=='O'){
      let currentBoard = this.state.gameBoard.slice();
      currentBoard[event.target.id] = this.props.currentTurn;   
      this.props.changeactivemethod(parseInt(event.target.id));

      this.props.switchturn();
      this.setState({gameBoard:currentBoard}, ()=>{
        this.calculateWinner();
      })
    }
  }
  writeWin(toWrite){
    let gameStates = JSON.parse(localStorage.getItem('gameStates').slice());
    gameStates[this.state.ID] = toWrite;
    window.localStorage.setItem('gameStates', JSON.stringify(gameStates));
    this.props.winmethod();
    this.setState({winner: toWrite})

  }
  
  render() {
    return (
      <div className={this.props.active ? 'gameCell active':'gameCell inactive'}>
      <div className={ this.state.winner ?'cellCover displaySomething':'cellCover'}>{this.state.winner}</div>
        {this.state.gameBoard.map((element,index) => {
          return <div onClick={(element)?()=>{}:this.fillSquare} id={ index.toString() } key={this.state.ID.toString() + index.toString() } className='subGameCell'> {element} </div>
        })}
      </div>
    );
  }
}

export default gameCell;