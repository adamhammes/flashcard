import React from 'react';

import './flashcard.css';

class FlashcardWrong extends React.Component {
	constructor(props) {
  	super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  handleChange(event) {
  	if (event.target.value === this.props.answer) {
    	this.props.onCardComplete(false);
    }
  }
  
  handleSubmit(event) {
    event.preventDefault();
  }
  
  render() {
  	return <div>
    	<h2>Copy The Answer</h2>
    	<div>Prompt: {this.props.prompt}</div>
      <div>Answer: {this.props.answer}</div>
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" onChange={this.handleChange} autoFocus/>
        </label>
      </form>
   	</div>
  }
}

// eventually should transition when key is pressed
class FlashcardRight extends React.Component {
  constructor(props) {
    super(props);

    this.handleCardSubmit = this.handleCardSubmit.bind(this);
  }

  handleCardSubmit(event) {
    event.preventDefault();
    this.props.onCardComplete(true);
  }

	render() {
  	return <div>
    	<h2>Correct</h2>
      <div>Prompt: {this.props.prompt}</div>
      <div>Answer: {this.props.answer}</div>
      <form onSubmit={this.handleCardSubmit}>
        <input type="submit"/>
      </form>
    </div>
  }
}

class FlashcardPrompt extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {value: ''}
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
  	this.setState({value: event.target.value})
  }
  
  handleSubmit(event) {
  	event.preventDefault();
    this.props.handleCardSubmit(this.state.value);
  }
  
	render() {
  	return <div> 
    	<div>{this.props.prompt}</div>
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} autoFocus/>
        </label>
        <input type="submit"/>
      </form>
   	</div>
  }
}

var FlashcardMode = {
	"Prompt": 1,
  "Wrong": 2,
  "Right": 3
}

export class FlashcardComponent extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {mode: FlashcardMode.Prompt}
    
    this.handleCardSubmit = this.handleCardSubmit.bind(this);
    this.onCardComplete = this.onCardComplete.bind(this);
  }
  
  handleCardSubmit(submitValue) {
  	if (submitValue === this.props.answer) {
    	this.setState({mode: FlashcardMode.Right});
    } else {
    	this.setState({mode: FlashcardMode.Wrong});
    }
  }

  onCardComplete(wasCorrect) {
    this.setState({mode: FlashcardMode.Prompt});
    this.props.onCardComplete(wasCorrect);
  }
  
  render() {
    const childProps = {
    	id: this.props.id,
      prompt: this.props.prompt,
      answer: this.props.answer,
      onCardComplete: this.onCardComplete,
      handleCardSubmit: this.handleCardSubmit
    };

    let innerComponent;
  	if (this.state.mode === FlashcardMode.Prompt) {
    	innerComponent = <FlashcardPrompt {...childProps}/>
    } else if (this.state.mode === FlashcardMode.Right) {
    	innerComponent = <FlashcardRight {...childProps}/>
    } else if (this.state.mode === FlashcardMode.Wrong) {
    	innerComponent = <FlashcardWrong {...childProps}/>
    }

    return <div className='flashcard-container'>{innerComponent}</div>
  }
}
