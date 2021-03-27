export const switchStartOnModeChange = () => {
    return {
        type: 'SWITCH_StartOnModeChange'
    }
}

export const changeMinsToRest = (mins) => {
    return {
        type: 'CHANGE_REST_MINS',
        payload: mins
    }
}

export const setNewRestColor = (color) => {
    return {
        type: 'SET_REST_COLOR',
        payload: color
    }
}

export const setNewWorkColor = (color) => {
    return {
        type: 'SET_WORK_COLOR',
        payload: color
    }
}