import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Chatbox from './Chatbox';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      input : "",
      open: false,
      messages :[]
    };
    this.handleOpenBox = this.handleOpenBox.bind(this);
    this.handleAddingItems = this.handleAddingItems.bind(this);
  }

  handleOnChange = (e) => {
    this.setState({input : e.target.value });
  };

  handleAddingItems(e){
    e.preventDefault();
    if(this.state.input !== "" && this.state.input !== null){
      this.handleGettingResponse(this.state.input);
      this.setState(prevstate => ({
        messages : [...prevstate.messages ,new ResponseText('outgoing', prevstate.input )],
        input : "",
        })
      )
    }
  }

  handleGettingResponse(text){
    fetch('http://0661849c53df.ngrok.io/webhooks/rest/webhook', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "sender": "test_user",
        "message": `${text}`,
      })
    })
    .then(data => data.json())
    .then(response => {
      console.log(response);
      this.setState(prevstate => ({
        messages : [...prevstate.messages ,new ResponseText('incoming', response[0].text )],
        })
      )
      });
  }

  handleOpenBox () {
    if(this.state.open){
      this.setState({
        open: false
      });
    }
    else {
      this.setState({
        open: true
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="bot" id="bot">
        {
          (this.state.open)? <Chatbox handleOpenBox={this.handleOpenBox}
                                      messages={this.state.messages} 
                                      handleAddingItems={this.handleAddingItems} 
                                      handleOnchange = {this.handleOnChange}
                                      input = {this.state.input}
                                      /> : <i onClick={this.handleOpenBox} className="fas fa-robot"></i>
        }     
        </div>
      </div>
    );
  }
}

class ResponseText{
  constructor(textType, text)
  {
     this.textType = textType;
     this.text = text;
  }
}

export default App;
