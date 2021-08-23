import React, { useState, useEffect } from 'react'
import { Checkbox, Input, Label } from 'semantic-ui-react'
import lsValues from '../localStorageValues'

const Settings = () => {
    const [titleColor, setTitleColor] = useState()
    const [timerColor, setTimerColor] = useState()
    const [workColor, setWorkColor] = useState()
    const [restColor, setRestColor] = useState()

    const setNewColor = (elementName, colorValue) => {
        localStorage.setItem(elementName, colorValue)
    }

    useEffect(() => {
        // Init localStorage values with default values if they are null
        if (!localStorage.getItem(lsValues.titleColorStr))
            localStorage.setItem(lsValues.titleColorStr, lsValues.titleColorDefaultValue)
        if (!localStorage.getItem(lsValues.timerColorStr))
            localStorage.setItem(lsValues.timerColorStr, lsValues.timerColorDefaultValue)
        if (!localStorage.getItem(lsValues.workColorStr))
            localStorage.setItem(lsValues.workColorStr, lsValues.workColorDefaultValue)
        if (!localStorage.getItem(lsValues.restColorStr))
            localStorage.setItem(lsValues.restColorStr, lsValues.restColorDefaultValue)
        console.log('localStorage.getItem(lsValues.titleColor): ', localStorage.getItem(lsValues.titleColor))
        console.log('localStorage.getItem(lsValues.titltimerColoreColor): ', localStorage.getItem(lsValues.timerColorStr))
        console.log('localStorage.getItem(lsValues.workColorStr):', localStorage.getItem(lsValues.workColorStr))
        console.log('localStorage.getItem(lsValues.restColorStr):', localStorage.getItem(lsValues.restColorStr))
        setTitleColor(localStorage.getItem(lsValues.titleColorStr))
        setTimerColor(localStorage.getItem(lsValues.timerColorStr))
        setWorkColor(localStorage.getItem(lsValues.workColorStr))
        setRestColor(localStorage.getItem(lsValues.restColorStr))
        return () => {
            console.log('Gone away from')
            // Set new values to 
            localStorage.setItem(lsValues.titleColorStr, titleColor)
            localStorage.setItem(lsValues.timerColorStr, timerColor)
            localStorage.setItem(lsValues.workColorStr, workColor)
            localStorage.setItem(lsValues.restColorStr, restColor)
        }
    }, [])

    const createColorPickers = () => {
        const colorPickerSettings = [
            {
                title: 'Title color',
                placeholder: titleColor,
                actionSettingColor: ((colorValue) => setTitleColor(colorValue))
            },
            {
                title: 'Timer color',
                placeholder: localStorage.getItem(lsValues.timerColorStr),
                actionSettingColor: ((colorValue) => setTimerColor(colorValue))
            },
            {
                title: 'Work color',
                placeholder: localStorage.getItem(lsValues.workColorStr),
                actionSettingColor: ((colorValue) => setWorkColor(colorValue))
            },
            {
                title: 'Rest color',
                placeholder: localStorage.getItem(lsValues.restColorStr),
                actionSettingColor: ((colorValue) => setRestColor(colorValue))
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

    return (
        <div className='settings-div'>
            <div className='settings-element'>
                <Input
                    labelPosition='right'
                    type='text'
                    placeholder={localStorage.getItem(lsValues.restMinsStr)}
                    onChange={(event) => localStorage.setItem(lsValues.restMinsStr, event.target.value)}
                >
                    <Label basic>Rest:</Label>
                    <input />
                    <Label>minutes</Label>
                </Input>
            </div>

            {createColorPickers()}

            <div className='settings-element'>
                <Checkbox
                    label={{ children: 'Start timer on Mode switched' }}
                    onChange={(e) => {
                        localStorage.setItem('abc', !localStorage.getItem('abc'))
                        console.log('!localStorage.getItem(abc):', !localStorage.getItem('abc'))
                    }}
                    checked={localStorage.getItem('abc')
                    }
                />
            </div>
        </div>
    )
}

export default Settings