
const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.text
        case 'SET_TO_ALL':
            return 'ALL'
        default:
            return state
    }
}

export const setFilter = text => {
    return {
        type: 'SET_FILTER',
        text,
    }
}

export const showAll = () => {
    return {
        type: 'SET_TO_ALL',
    }
}

export default filterReducer