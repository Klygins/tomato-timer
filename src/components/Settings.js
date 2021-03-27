import React, { Component } from 'react'
import { Checkbox, Input, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { switchStartOnModeChange } from '../redux/actions'
import { changeMinsToRest } from '../redux/actions'
import { setNewRestColor } from '../redux/actions'
import { setNewWorkColor } from '../redux/actions'

class ClockPage extends Component {
    render() {
        return (
            <div className='settings-div'>
                <div className='settings-element'>
                    <Input
                        labelPosition='right'
                        type='text'
                        placeholder={this.props.restMins}
                        onChange={(event) => this.props.changeMinsToRest(event.target.value)}
                    >
                        <Label basic>Rest:</Label>
                        <input />
                        <Label>minutes</Label>
                    </Input>
                </div>
                <div className='settings-element'>
                    <Input
                        labelPosition='right'
                        type='text'
                        placeholder={this.props.workColor}
                        onChange={(event) => this.props.setNewWorkColor(event.target.value)}
                    >
                        <Label basic>Work color</Label>
                        <input />
                    </Input>
                </div>
                <div className='settings-element'>
                    <Input
                        labelPosition='right'
                        type='text'
                        placeholder={this.props.restColor}
                        onChange={(event) => this.props.setNewRestColor(event.target.value)}
                    >
                        <Label basic>Rest color</Label>
                        <input />
                    </Input>
                </div>
                <div className='settings-element'>
                    <Checkbox
                        label={{ children: 'Start timer on Mode switched' }}
                        onChange={this.props.switchStartOnModeChange}
                        checked={this.props.startOnModeChanged}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        startOnModeChanged: state.startOnModeChanged,
        restMins: state.restMins,
        restColor: state.restColor,
        workColor: state.workColor
    }
}


export default connect(
    mapStateToProps,
    {
        switchStartOnModeChange,
        changeMinsToRest,
        setNewRestColor,
        setNewWorkColor
    }
)(ClockPage)