'use strict';

const e = React.createElement;

class bot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      opened: false 
    };
  }

  render() {
    if (this.state.opened) {
      return 'You liked this.';
    }

    return(
      <button onClick={() => this.setState({ liked: true })}>
        Like
      </button>
    )
  }
}

const chatbot = document.querySelector('#bot');
ReactDOM.render(e(bot), chatbot);