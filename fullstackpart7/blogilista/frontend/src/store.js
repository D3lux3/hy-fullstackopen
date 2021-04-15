import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    messages: messageReducer,
    login: loginReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store