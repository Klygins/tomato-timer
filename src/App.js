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
    const headerText = "Tomato app";
    const isBreakStyle = this.state.isInBreakMode ? 'rest' : 'work'
    return (
      <div className={"App " + isBreakStyle}>
        {/* <div className="App-header">
          <h1>{headerText}</h1>
        </div> */}
        <div>
          <ClockPage onModeSwitched={this.onModeSwitched} />
        </div>

      </div>
    );
  }
}

export default App;
