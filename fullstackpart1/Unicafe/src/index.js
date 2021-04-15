import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}


const StatisticLine = (props) => {
    return (
        <tr><td>{props.text}</td><td>{props.number}{props.mark}</td></tr>
    )
}


const Statistics = ({ good, neutral, bad, sum, all }) => {
    if (sum === 0) {
        return (
            <p>No feedback given</p>
        )
    } else {
        return (
            <table>
                <tbody>
                <StatisticLine text="good" number={good} />
                <StatisticLine text="neutral" number={neutral} />
                <StatisticLine text="bad" number={bad} />
                <StatisticLine text="all" number={sum} />
                <StatisticLine text="average" number={(good - bad) / sum} />
                <StatisticLine text="positive" number={(good * 100 / sum)} mark="%" />
                </tbody>
            </table>
        )
    }
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const sum = good + bad + neutral;
    const handleGoodClick = () => setGood(good + 1);
    const handleNeutralClick = () => setNeutral(neutral + 1);
    const handleBadClick = () => setBad(bad + 1);

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handleGoodClick} text="good" />
            <Button handleClick={handleNeutralClick} text="neutral" />
            <Button handleClick={handleBadClick} text="bad" />
            <h1>statistics</h1>

            <Statistics good={good}
                neutral={neutral}
                bad={bad}
                sum={sum}
            ></Statistics>

        </div>
    )

}

ReactDOM.render(<App />, document.getElementById('root'));

