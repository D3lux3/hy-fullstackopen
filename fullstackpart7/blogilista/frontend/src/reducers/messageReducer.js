
const messageReducer = (state = '', action) => {
    switch (action.type) {
        case 'WRONGLOGIN':
            return 'Wrong credentials'
        case 'REMOVEBLOG':
            return 'Error while trying to remove blog'
        case 'ERRORLIKE':
            return 'Error while trying to like a blog'
        case 'CLEARMESSAGE':
            return ''
        default:
            return state
    }
}

export const setErrorMessage = type => {
    return {
        type: type
    }
}

export default messageReducer