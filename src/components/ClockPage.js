import React, { Component } from 'react'
import { Button, Progress } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ClockPage extends Component {
    state = {
        timer: null,
        time: this.getMaxTime(false),
        isPlaying: false,
        isBreak: false
    }

    getMaxTime(isBreak) {
        if (isBreak) return this.props.restMins * 60 * 1000
        else return 25 * 60 * 1000
    }

    tick = () => {
        if (this.state.time > 0)
            this.setState({ time: this.state.time - 1000 })
        else {
            this.setState({ isBreak: !this.state.isBreak, time: this.getMaxTime(!this.state.isBreak) })
            this.props.onModeSwitched(this.state.isBreak)
            alert(!this.state.isBreak ? "Lets work a bit!" : "Have a break")
        }
    }

    startOrPauseTimer = () => {
        if (this.state.isPlaying) {
            clearInterval(this.state.timer);
            this.setState({ timer: null, isPlaying: false })
        } else {
            this.setState({ timer: setInterval(this.tick, 1000), isPlaying: true, time: this.state.time - 1000 })
        }
    }

    resetTimer = () => {
        clearInterval(this.state.timer);
        this.setState({ timer: null, time: this.getMaxTime(this.state.isBreak), isPlaying: false })
    }

    changeMode = () => {
        clearInterval(this.state.timer);
        const newIsBreak = !this.state.isBreak
        var newTimer = null
        var newTime = this.getMaxTime(newIsBreak)
        var newIsPlaying = false
        if (this.props.startOnModeChanged) {
            newTimer = setInterval(this.tick, 1000)
            newTime -= 1000
            newIsPlaying = true
        }

        this.setState({
            timer: newTimer,
            time: newTime,
            isPlaying: newIsPlaying,
            isBreak: newIsBreak
        })
        this.props.onModeSwitched(newIsBreak)
    }

    timerText = () => {
        const minutes = parseInt(this.state.time / (60 * 1000))
        var seconds = (this.state.time - minutes * 60_000) / 1000
        if (seconds < 10) seconds = "0" + seconds
        return minutes + ":" + seconds;
    }

    calculateProgress = () => {
        return 100 - 100 * this.state.time / this.getMaxTime(this.state.isBreak)
    }

    render() {
        const startPauseButtonIcon = this.state.isPlaying ? 'pause' : 'play'
        const isResetButtonDisabled = this.state.time === this.getMaxTime(this.state.isBreak)
        const modeSwitcherIcon = this.state.isBreak ? 'industry' : 'coffee'
        const isTimerRunning = this.state.timer !== null
        return (
            <div className='clock-page'>
                <h1>{this.timerText()}</h1>
                <div className='progress-bar'>
                    <Progress
                        percent={this.calculateProgress()}
                        active={isTimerRunning}
                        indicating={isTimerRunning}
                    />
                </div>
                <div id="main-buttons">
                    <Button circular size='huge' icon={startPauseButtonIcon} onClick={this.startOrPauseTimer} />
                    <Button circular size='huge' icon='sync alternate' disabled={isResetButtonDisabled} onClick={this.resetTimer} />
                    <Button circular size='huge' icon={modeSwitcherIcon} onClick={this.changeMode} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        startOnModeChanged: state.startOnModeChanged,
        restMins: state.restMins 
    }
}

export default connect(mapStateToProps)(ClockPage)