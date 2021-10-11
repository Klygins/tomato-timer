import React, { useState } from 'react';
import ClockPage from './components/ClockPage'
import Settings from './components/Settings'
import { Button } from 'semantic-ui-react'
import { useSelector } from "react-redux";

const screens = {
    timer: {
        header: 'Tomato Timer',
        icon: 'clock outline',

    },
    settings: {
        header: 'Settings',
        icon: 'settings',

    },
    projects: {
        header: 'Projects',
        icon: 'fighter jet',

    }
}

const App = () => {
    const [isInBreakMode, setIsInBreakMode] = useState(false)
    const [currentScreen, setCurrentScreen] = useState(screens.timer)

    const restColor = useSelector(state => state.restColor)
    const workColor = useSelector(state => state.workColor)
    const titleColor = useSelector(state => state.titleColor)

    const onModeSwitched = (isBreak) => setIsInBreakMode(isBreak)

    const changeScreen = (newScreen) => setCurrentScreen(newScreen)
    

    const colorForBackground = () =>
        isInBreakMode
            ? restColor || '#64955d'
            : workColor || '#6495ed'
    const screenButtonIcon = () => currentScreen === screens.timer ? screens.settings.icon : screens.timer.icon

    return (
        <div className="App " style={{ backgroundColor: colorForBackground() }}>
            <div className="App-header">
                <h1 style={{ color: titleColor }}>{currentScreen.header}</h1>
            </div>

            <div hidden={currentScreen !== screens.timer}>
                <ClockPage onModeSwitched={onModeSwitched} />
            </div>
            <div hidden={currentScreen !== screens.settings}>
                <Settings />
            </div>

            <div id='app-mode-button'>
                <Button
                    inverted
                    size='mini'
                    onClick={() => changeScreen(currentScreen === screens.timer ? screens.settings : screens.timer)}
                    icon={screenButtonIcon()} />
            </div>
        </div>
    );
}


export default App
