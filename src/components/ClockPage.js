import React, { Component } from 'react'
import { Button, Segment } from 'semantic-ui-react'
import './ClockPage.css'

class ClockPage extends Component {
    state = {
        isPlaying: false,
        isBreak: false,
        time: this.getMaxTime(false),
        timer: null,
    }

    getMaxTime(isBreak) {
        if (isBreak) return 7 * 60 * 1000
        else return 25 * 60 * 1000
    }

    tick = () => {
        if (this.state.time > 0)
            this.setState({ time: this.state.time - 1000 })
        else {
            // clearInterval(this.state.timer);
            this.setState({ isBreak: !this.state.isBreak, time: this.getMaxTime(!this.state.isBreak) })
            this.props.onModeSwitched(this.state.isBreak)
            alert(!this.state.isBreak ? 'Have a break' : "Lets work a bit!")
        }
    }

    startOrPauseTimer = () => {
        if (this.state.isPlaying) {
            clearInterval(this.state.timer);
            this.setState({ timer: null, isPlaying: false })
        } else {
            this.setState({ timer: setInterval(this.tick, 1000), isPlaying: true })
        }
    }

    resetTimer = () => {
        clearInterval(this.state.timer);
        this.setState({ timer: null, time: this.getMaxTime(this.state.isBreak), isPlaying: false })
    }

    changeMode = () => {
        clearInterval(this.state.timer);
        const newIsBreak = !this.state.isBreak
        this.setState({ timer: null, time: this.getMaxTime(newIsBreak), isBreak: newIsBreak, isPlaying: false })
        this.props.onModeSwitched(newIsBreak)
    }

    render() {
        const minutes = parseInt(this.state.time / (60 * 1000))
        var seconds = (this.state.time - minutes * 60_000) / 1000
        if (seconds < 10) seconds = "0" + seconds
        const timerText = minutes + ":" + seconds;

        const startPauseButtonIcon = this.state.isPlaying ? 'pause' : 'play'
        return (
            <div className='clock-page'>
                <div className="App-header">
                    <h1>Tomato Timer</h1>
                </div>
                <h1>{timerText}</h1>
                <div className="ToggleButton">
                    {/* <Segment.Group inverted> */}
                        <Button inverted size='huge' icon={startPauseButtonIcon} onClick={this.startOrPauseTimer} />
                        <Button inverted size='huge' icon='sync' onClick={this.resetTimer} />
                        <Button inverted size='huge' icon='coffee' onClick={this.changeMode} />
                    {/* </Segment.Group> */}
                </div>
            </div>
        );
    }
}

export default ClockPage