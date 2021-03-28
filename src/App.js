import React, { Component } from 'react';
import ClockPage from './components/ClockPage'
import Settings from './components/Settings'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'


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
    const colorForBackground = this.state.isInBreakMode
      ? this.props.restColor ? this.props.restColor : '#64955d'
      : this.props.workColor ? this.props.workColor : '#6495ed'
    const headerText = this.state.currentScreen === 'timer' ? 'Tomato Timer' : 'Settings'
    const screenButtonIcon = this.state.currentScreen === 'timer' ? 'settings' : 'clock outline'
    return (
      <div className="App " style={{ backgroundColor: colorForBackground }}>
        <div className="App-header">
          <h1 style={{color: this.props.titleColor}}>{headerText}</h1>
        </div>
        <div className='app-mode-button'>
          <Button inverted size='mini' onClick={this.changeScreen} icon={screenButtonIcon} />
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


const mapStateToProps = (state) => {
  return {
    restColor: state.restColor,
    workColor: state.workColor,
    titleColor: state.titleColor
  }
}

export default connect(mapStateToProps)(App)
