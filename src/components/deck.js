import React from 'react';

import { FlashcardComponent } from './flashcard.js';
import { setUnion, setDifference, elemFromSet } from '../utils/set.js';

export default class Deck extends React.Component {
    constructor(props) {
        super(props);

        this.cardMap = new Map();
        for (let card of this.props.cards) {
            this.cardMap.set(card.id, card);
        }

        const cards = new Set(this.props.cards.map(card => card.id));
        const cardsCorrect = new Set();
        const cardsWrong = new Set();
        const currentCard = this.pickNewCard(cards, cardsCorrect, cardsWrong);

        this.state = {
            cards: cards,
            cardsCorrect: cardsCorrect,
            cardsWrong: cardsWrong,
            currentCard: currentCard,
        };

        this.onCardComplete = this.onCardComplete.bind(this);
    }

    /// Picks a new card to display, based on available cards and a record of
    /// which cards have been missed and which haven't. Returns `null` if every
    /// card has been seen.
    pickNewCard(cards, cardsCorrect, cardsWrong) {
        const pickedCards = setUnion(cardsCorrect, cardsWrong);
        const unpickedCards = setDifference(cards, pickedCards);
        return elemFromSet(unpickedCards) || null;
    }

    onCardComplete(wasCorrect) {
        if (wasCorrect) {
            this.state.cardsCorrect.add(this.state.currentCard);
        } else {
            this.state.cardsWrong.add(this.state.currentCard);
        }
        
        const newCard = this.pickNewCard(this.state.cards,
                                         this.state.cardsCorrect,
                                         this.state.cardsWrong);
        this.setState({currentCard: newCard});
    }

    render() {
        const card = this.cardMap.get(this.state.currentCard);
        return <FlashcardComponent {...card} onCardComplete={this.onCardComplete} />;
    }
}
