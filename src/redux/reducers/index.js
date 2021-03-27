import { combineReducers } from 'redux'

// Utils
function isHexColor(hex) {
    if (hex[0] === '#') hex = hex.substring(1)
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
}

// Reducers
const startOnModeChanged = (state = false, action) => {
    switch (action.type) {
        case 'SWITCH_StartOnModeChange':
            return !state;
        default: return state
    }
}

const restMins = (state = 7, action) => {
    switch (action.type) {
        case 'CHANGE_REST_MINS':
            return action.payload;
        default: return state
    }
}

const restColor = (state = '#64955d', action) => {
    switch (action.type) {
        case 'SET_REST_COLOR':
            if (action.payload[0] !== '#') action.payload = '#' + action.payload
            if (isHexColor(action.payload))
                return state = action.payload;
            return state
        default: return state
    }
}

const workColor = (state = '#6495ed', action) => {
    switch (action.type) {
        case 'SET_WORK_COLOR':
            if (action.payload[0] !== '#') action.payload = '#' + action.payload
            if (isHexColor(action.payload))
                return state = action.payload;
            return state
        default: return state
    }
}

// Combining them
const allReducers = combineReducers({
    startOnModeChanged,
    restMins,
    restColor,
    workColor
})

// Exporting reducers
export default allReducers