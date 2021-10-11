import React, { useState, useEffect, useRef } from 'react'
import { Button, Progress } from 'semantic-ui-react'

import { useSelector } from "react-redux";

const ClockPage = ({ onModeSwitched }) => {
    const getMaxTime = (isBreak) =>
        isBreak
            ? restMins * 60 * 1000
            : 25 * 60 * 1000

    const [time, setTime] = useState(getMaxTime(false))
    const [isRunnung, setIsRunning] = useState(false)
    const [isBreak, setIsBreak] = useState(false)

    const restMins = useSelector(state => state.restMins)
    const startOnModeChanged = useSelector(state => state.startOnModeChanged)
    const timerColor = useSelector(state => state.timerColor)


    const tick = () => {
        if (time > 0) {
            setTime(time - 1000)
        } else {
            setIsBreak(!isBreak)
            setTime(getMaxTime(isBreak)) //TODO: Is it wrong???? Or should ! be added
            onModeSwitched(isBreak)
            const notifObj = {
                title: !isBreak ? "Lets work a bit!" : "Have a break. U deserve it",
                body: !isBreak ? 'please...' : 'Yoohoo!'
            }
            window.ipcRenderer.send('notify', notifObj)
            alert(notifObj.title)
        }
    }

    useInterval(tick, isRunnung ? 1000 : null)

    const startOrPauseTimer = () => {
        setIsRunning(!isRunnung)
        setTime(time - 1000)
    }

    const resetTimer = () => {
        setTime(getMaxTime(isBreak))
        setIsRunning(false)
    }

    const changeMode = () => {
        setIsBreak(!isBreak)
        var newTime = startOnModeChanged
            ? getMaxTime(!isBreak)
            : getMaxTime(!isBreak) - 1000
        setTime(newTime)
        setIsRunning(startOnModeChanged)
        onModeSwitched(!isBreak)
    }

    const timerText = () => {
        const minutes = parseInt(time / (60_000))
        var seconds = (time - minutes * 60_000) / 1000
        if (seconds < 10) seconds = "0" + seconds
        return minutes + ":" + seconds;
    }

    const calculateProgress = () => {
        return 100 - 100 * time / getMaxTime(isBreak)
    }

    const startPauseButtonIcon = () => isRunnung ? 'pause' : 'play'
    const isResetButtonDisabled = () => time === getMaxTime(isBreak)
    const modeSwitcherIcon = () => isBreak ? 'industry' : 'coffee'

    return (
        <>
            <div id='clock-page'>
                <div id='timer-text'>
                    <h1 style={{ color: timerColor }}>{timerText()}</h1>
                </div>
                <div id='progress-bar'>
                    <Progress
                        percent={calculateProgress()}
                        active={isRunnung}
                        indicating={isRunnung}
                    />
                </div>
                <div id="main-buttons">
                    <Button circular size='huge' icon={startPauseButtonIcon()} onClick={startOrPauseTimer} />
                    <Button circular size='huge' icon='sync alternate' disabled={isResetButtonDisabled()} onClick={resetTimer} />
                    <Button circular size='huge' icon={modeSwitcherIcon()} onClick={changeMode} />
                </div>
            </div>
        </>
    )
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default ClockPage