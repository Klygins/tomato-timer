import React, { Component } from 'react';
import ClockPage from './components/ClockPage'
import Settings from './components/Settings'
import { Button } from 'semantic-ui-react'


class App extends Component {
  state = {
    isInBreakMode: false,
    currentScreen: 'timer'
  }
  onModeSwitched = (isBreak) => {
    this.setState({ isInBreakMode: isBreak })
  }

  changeScreen = () => {
    const newScreen = this.state.currentScreen === 'timer' ? 'settings' : 'timer'
    this.setState({ currentScreen: newScreen })
  }

  render() {
    const backgroundStyle = this.state.isInBreakMode ? 'rest' : 'work'
    const headerText = this.state.currentScreen === 'timer' ? 'Tomato Timer' : 'Settings'
    const screenButtonIcon = this.state.currentScreen === 'timer' ? 'settings' : 'clock outline'

    return (
      <div className={"App " + backgroundStyle}>
        <div className="App-header">
          <h1>{headerText}</h1>
        </div>
        <div className='app-mode-button'>
          <Button size='mini' color='blue'  onClick={this.changeScreen} icon={screenButtonIcon} />
        </div>

        <div hidden={this.state.currentScreen === 'settings'}>
          <ClockPage onModeSwitched={this.onModeSwitched} />
        </div>
        <div hidden={this.state.currentScreen === 'timer'}>
          <Settings />
        </div>
      </div>
    );
  }
}

export default App;
