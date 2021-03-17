import './res/App.css';
import React from 'react';
import ClockPage from './components/ClockPage'


class App extends React.Component {
  state = {
    isInBreakMode: false
  }
  onModeSwitched = (isBreak) => {
    this.setState({ isInBreakMode: isBreak })
  }

  render() {
    const isBreakStyle = this.state.isInBreakMode ? 'rest' : 'work'
    return (
      <div className={"App " + isBreakStyle}>
        <ClockPage onModeSwitched={this.onModeSwitched} />
      </div>
    );
  }
}

export default App;
