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
    	// TODO
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
	render() {
  	return <div>
    	<h2>Correct</h2>
      <div>Prompt: {this.props.prompt}</div>
      <div>Answer: {this.props.answer}</div>
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
    
    this.childProps = {
    	...this.props,
      handleCardSubmit: this.handleCardSubmit
    }
  }
  
  handleCardSubmit(submitValue) {
  	if (submitValue === this.props.answer) {
    	this.setState({mode: FlashcardMode.Right});
    } else {
    	this.setState({mode: FlashcardMode.Wrong});
    }
  }
  
  render() {
    let innerComponent;
  	if (this.state.mode === FlashcardMode.Prompt) {
    	innerComponent = <FlashcardPrompt {...this.childProps}/>
    } else if (this.state.mode === FlashcardMode.Right) {
    	innerComponent = <FlashcardRight {...this.childProps}/>
    } else if (this.state.mode === FlashcardMode.Wrong) {
    	innerComponent = <FlashcardWrong {...this.childProps}/>
    }

    return <div className='flashcard-container'>{innerComponent}</div>
  }
}
