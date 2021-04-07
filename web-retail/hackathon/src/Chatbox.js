import React, { Component } from 'react';

class Chatbox extends Component{

  render (){
    return(
      <div>
      <div className="chatbox">
        <div className="heading">
            <h1>iQbot<sup>®</sup></h1>
        </div>
        <div>
          <div className="message-box">
            {
              this.props.messages.map((msg,index) => {
                return( <div key = {index} className= {`${msg.textType}`}> {msg.text}  
                {
                  msg.buttons ?
                   <div class="buttons">
                    {
                      msg.buttons.map(button => {
                        return <button className="b"><a  href="https://www.iqmetrix.com/telecom-retail/tier-1-and-2-carriers" target="_blank" > {button.title} </a></button>
                      })
                    }
                   </div> : null
                 }</div>)
              })
            }
          </div>
          <form onSubmit={this.props.handleAddingItems}>
            <input className='message' 
                   type="text" 
                   placeholder="please enter a message"
                   value = {this.props.input}
                   onChange={(e) => {this.props.handleOnchange(e)}} />
            <button>Submit</button>
          </form>
        </div>
      </div>
      <i  onClick={() => {this.props.handleOpenBox()}} className="fas fa-times"></i>
      </div>
    )
  }
}



export default Chatbox;