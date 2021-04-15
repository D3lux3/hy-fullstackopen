
const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            console.log(action.text)
            return action.text
        case 'EMPTY_MESSAGE':
            state = null
            return state
        default:
            return state
    }
}

export const setNotification = (text, num) => {
    return async dispatch => {
        await dispatch({
            type: 'SET_MESSAGE',
            text,
        })
        let timer;
        clearTimeout(timer)
        timer = setTimeout(() => {
            dispatch(emptyNotification())
        }, num * 1000)
    }
}

export const emptyNotification = () => {
    return {
        type: 'EMPTY_MESSAGE',
    }
}

export default notificationReducer