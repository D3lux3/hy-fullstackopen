import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ clickHandler, text }) => (
    <button onClick={clickHandler}>
        {text}
    </button>
)

const MostVoted = (props) => {
    if (props.voteAmount === 0) {
        return (
            <p>No votes yet...</p>
        )
    } else {
    return (
        <p>  {props.anecdote} has {props.voteAmount} votes</p>
    )
}
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState([] = new Array(anecdotes.length + 1).join('0').split('').map(parseFloat))


    const clickHandler = () => {
        setSelected((Math.floor(Math.random() * props.anecdotes.length)));
    }
    let index = 0;
    const voteClickHandler = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
        console.log(copy)
        console.log(index)
    }
    index = votes.indexOf(Math.max(...votes))

    return (
        <div>
            <h1>Anecdote of the days</h1>
            {props.anecdotes[selected]}
            <p></p>
            <Button clickHandler={voteClickHandler} text={"vote"}></Button>
            <Button clickHandler={clickHandler} text={"next anectode"}></Button>
            <p></p>
            <h1>Anecdote with most votes</h1>
            <MostVoted anecdote={anecdotes[index]} voteAmount={votes[index]}></MostVoted>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)