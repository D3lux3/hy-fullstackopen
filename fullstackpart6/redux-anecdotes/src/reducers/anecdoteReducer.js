import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const id = action.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: (anecdoteToChange.votes + 1)
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
        .sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)

    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state;
  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.update(anecdote.id, { ...anecdote, votes: (anecdote.votes + 1) })
    dispatch({
      type: 'VOTE_ANECDOTE',
      id: updateAnecdote.id
    })
  }
}

export default reducer