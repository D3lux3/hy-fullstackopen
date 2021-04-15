import React from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'
import { setNotification } from './reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}



const Anecdotes = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state.anecdotes
        } else {
            return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        }
    })

    const voteClickHandler = ({ anecdote }) => {
        dispatch(voteAnecdote(anecdote))
        props.setNotification(`you voted '${anecdote.content}'`, 5)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() =>
                        voteClickHandler({ anecdote })
                    }
                />
            )}
        </div>
    )
}

const mapDispatchToProps = {
    setNotification,

}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdoteReducer,
        notification: state.notificationReducer,
        filter: state.filterReducer
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Anecdotes)