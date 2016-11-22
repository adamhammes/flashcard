import React from 'react';
import './App.css';
import { FlashcardComponent } from './components/flashcard.js'

const data = {
  prompt: 'Il ______ (vendre) sa voiture hier.',
  answer: 'a vendu'
}

class App extends React.Component {
  render() {
    return <FlashcardComponent {...data}/>;
  }
}

export default App;
