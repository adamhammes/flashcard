import React from 'react';
import './App.css';
import Deck from './components/deck.js'

const data = [
  {
    id: 1,
    prompt: 'Il ______ (vendre) sa voiture hier.',
    answer: 'a vendu'
  },
  {
    id: 2,
    prompt: 'Nous ______ (vendre) notre maison la semaine dernière.',
    answer: 'avons vendu'
  }
];

class App extends React.Component {
  render() {
    return <Deck cards={data}/>;
  }
}

export default App;
