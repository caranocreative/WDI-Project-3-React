import React, { Component } from 'react';
import MemoryCard from '../MemoryCard';
import '../MemoryGame.css';

class MemoryGame extends Component {
  constructor(props) {
      super(props)
      this.state = {
        cards: ['1','2','3','4','5','6','7','8','9'],
        duplicatedCards: [],
        randomizedCards: [],
        finalizedCards: [],
        openedCards: []
      }
      this.start()
    }
    handleClick(name,index){
      if(this.state.openedCards.length === 2){
        setTimeout(() => {
          this.check()
        },750)
      }else {
        let cards = {
          name,
          index
        }
        let finalizedCards = this.state.finalizedCards
        let openedCards = this.state.openedCards
        finalizedCards[index].close = false
        this.state.cards.push(cards)
        this.setState({
          openedCards: openedCards,
          finalizedCards: finalizedCards
        })
        if(this.state.openedCards.length === 2){
          setTimeout(() => {
            this.check();
          },750)
        }
      }
    } 
    check(){
      let finalizedCards = this.state.finalizedCards
      if((this.state.openedCards[0].name === this.state.openedCards[1].name) && (this.state.openedCards[0].index !== this.state.openedCards[1].index)){
        finalizedCards[this.state.openedCards[0].index].complete = true
        finalizedCards[this.state.openedCards[1].index].complete = true
      }else {
        finalizedCards[this.state.openedCards[0].index].close = true
        finalizedCards[this.state.openedCards[1].index].close = true
      }
      this.setState({
        finalizedCards,
        openedCards: []
      })
    }
    start(){
      let finalizedCards = [];
      this.state.duplicatedCards = this.state.cards.concat(this.state.cards)
      this.state.randomizedCards = this.shuffle(this.state.duplicatedCards)
      this.state.randomizedCards.map((name,index) => {
        finalizedCards.push({
          name,
          close: true,
          complete: false,
          fail: false
        })
      })
      this.state.finalizedCards = finalizedCards
    }
    shuffle(array){
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array
    }
    render(){
      
      return (
        <div className="memory-game">
            {this.state.finalizedCards.map((cards, index) => {
                return <MemoryCard cards={cards.name} click={() => {this.handleClick(cards.name,index)}} close={cards.close} complete={cards.complete}/>
              })}
        </div>
      )
    }
}




export default MemoryGame;