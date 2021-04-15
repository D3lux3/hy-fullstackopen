import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Content = (props) => {
    const t = props.course.parts
    return (
        <div>
            <Part name={t[0].name} exercises={t[0].exercises} />
            <Part name={t[1].name} exercises={t[1].exercises} />
            <Part name={t[2].name} exercises={t[2].exercises} />
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
        </div>

    )
}

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10
            },
            {
                name: "Using props to pass data",
                exercises: 7
            },
            {
                name: "State of component",
                exercises: 14
            }
        ]
}



    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
