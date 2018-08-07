import React, { Component } from 'react';
//import './MemoryGame.css';

class MemoryCard extends Component {
  constructor(props) {
      super(props)
      this.state = {
      
      }
    }
  clicked(cards){
    this.props.click(cards)
  }
  render(){
    return (
      <div className={"card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props.cards)}>
        <img className="front" src={"/img/" + this.props.cards + ".jpg"} alt="front"/>
        <img className="back" src={"/img/back.jpg"} alt="back"/>
      </div>
    )
  }
}
export default MemoryCard;