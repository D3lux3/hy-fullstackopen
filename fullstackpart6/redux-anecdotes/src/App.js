import React, { useEffect } from 'react'
import NewAnecdoteForm from './newAnecdote'
import Anecdotes from './Anecdotes'
import Notification from './components/Notification'
import Filter from './Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <NewAnecdoteForm />
    </div>
  )
}

export default App