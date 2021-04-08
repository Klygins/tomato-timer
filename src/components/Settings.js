import React, { Component } from 'react'
import { Checkbox, Input, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { switchStartOnModeChange } from '../redux/actions'
import { changeMinsToRest } from '../redux/actions'
import { setNewRestColor } from '../redux/actions'
import { setNewWorkColor } from '../redux/actions'
import { setNewTitleColor } from '../redux/actions'
import { setNewTimerColor } from '../redux/actions'


class Settings extends Component {

    createColorPickers = () => {
        const colorPickerSettings = [
            {
                title: 'Title color',
                placeholder: this.props.titleColor,
                actionSettingColor: ((colorValue) => this.props.setNewTitleColor(colorValue))
            },
            {
                title: 'Timer color',
                placeholder: this.props.timerColor,
                actionSettingColor: ((colorValue) => this.props.setNewTimerColor(colorValue))
            },
            {
                title: 'Work color',
                placeholder: this.props.workColor,
                actionSettingColor: ((colorValue) => this.props.setNewWorkColor(colorValue))
            },
            {
                title: 'Rest color',
                placeholder: this.props.restColor,
                actionSettingColor: ((colorValue) => this.props.setNewRestColor(colorValue))
            },
        ]
        return colorPickerSettings.map(setting => {
            return (
                <div className='settings-element' key={setting.title}>
                    <Input
                        labelPosition='right'
                        type='text'
                        placeholder={setting.placeholder}
                        onChange={(event) => setting.actionSettingColor(event.target.value)}
                    >
                        <Label basic>{setting.title}</Label>
                        <input />
                    </Input>
                </div>
            )
        })
    }

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

                {this.createColorPickers()}

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
        workColor: state.workColor,
        titleColor: state.titleColor,
        timerColor: state.timerColor
    }
}


export default connect(
    mapStateToProps,
    {
        switchStartOnModeChange,
        changeMinsToRest,
        setNewRestColor,
        setNewWorkColor,
        setNewTitleColor,
        setNewTimerColor
    }
)(Settings)