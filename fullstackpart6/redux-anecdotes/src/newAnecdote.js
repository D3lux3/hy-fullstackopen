import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from './reducers/anecdoteReducer'
import { setNotification } from './reducers/notificationReducer'

const NewAnecdoteForm = (props) => {

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.newAnecdote(content)
        props.setNotification(`you created new anecdote '${content}'`, 5)
    }

    return (
        <form onSubmit={createAnecdote}>
            <h2>create new</h2>
            <div>
                <input name="anecdote" />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

const mapDispatchToProps = {
    setNotification,
    newAnecdote,
}

export default connect(
    null,
    mapDispatchToProps)(NewAnecdoteForm)