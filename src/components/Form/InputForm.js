import React, { Component } from 'react';
import './_inputForm.scss';

class InputForm extends Component {
  constructor(){
    super();
    this.state = {
      userInput: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      userInput: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addItemToDb(this.state.userInput.trim());
    this.setState({
      userInput: ''
    });
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit} className={`input ${this.state.userInput.length > 0 ? "input--filled" : ""}`}>
        <input onChange={this.handleChange} type="text" id="userInput" className="input__field" value={this.state.userInput} />
        <label htmlFor="userInput" className="input__label">
          <span className="input__label-content">What's on your mind?</span>
        </label>
        <input type="submit" />
      </form>
    )
  }
}

export default InputForm;