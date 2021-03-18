import React, { Component } from 'react';
import ClockPage from './components/ClockPage'
import './App.css';

class App extends Component {
  state = {
    isInBreakMode: false
  }
  onModeSwitched = (isBreak) => {
    this.setState({ isInBreakMode: isBreak })
  }

  render() {
    const backgroundStyle = this.state.isInBreakMode ? 'rest' : 'work'
    return (
      <div className={"App " + backgroundStyle}>
        <ClockPage onModeSwitched={this.onModeSwitched} />
      </div>
    );
  }
}

export default App;
