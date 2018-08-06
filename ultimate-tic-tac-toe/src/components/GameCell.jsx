import React, { Component } from 'react';

class gameCell extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ID: '',
    }
  }
  componentDidMount() {
    this.setState({
      ID: this.props.gameID
    })
  }
  
  
  render() {
    return (
      <div className='gameCell'>
        <span onClick={this.props.winmethod}> X </span>
        <span> O </span>
        <span> D </span>
      </div>
    );
  }
}

export default gameCell;