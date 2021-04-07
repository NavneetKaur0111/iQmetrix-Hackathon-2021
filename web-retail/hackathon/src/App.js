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
      messages :[],
      url: 'http://6.tcp.ngrok.io:12371/webhooks/rest/webhook',
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
        messages : [...prevstate.messages ,new ResponseText('outgoing', prevstate.input , null)],
        input : "",
        })
      )
    }
  }

  handleGettingResponse(text){
    fetch(`${this.state.url}`, {
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
      let buttons = null;
      if(response[0].buttons)
      {
        buttons = response[0].buttons
      }
      this.setState(prevstate => ({
        messages : [...prevstate.messages ,new ResponseText('incoming', response[0].text, buttons )],
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
  constructor(textType, text, buttons)
  {
     this.textType = textType;
     this.text = text;
     this.buttons = buttons;
  }
}

export default App;
