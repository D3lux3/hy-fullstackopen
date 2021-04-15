import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'SETUSER':
            return action.data;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
}

export const initLogin = (user) => {
    return async dispatch => {
        blogService.setToken(user.token)
        dispatch({
            type: 'SETUSER',
            data: user
        })
    }
}

export const login = ({ username, password }) => {
    return async dispatch => {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        dispatch({
            type: 'SETUSER',
            data: user
        })
    }
}

export const logout = () => {
    window.localStorage.clear()
    return async dispatch => {
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default loginReducer 