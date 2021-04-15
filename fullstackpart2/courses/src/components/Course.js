import React from 'react'
const Header = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
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

const Course = ({ course }) => {
    const t = course.parts
    return (
        <div>
            <Header name={course.name} />
            {course.parts.map(part => (
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            ))}
            <Total course={course}></Total>
        </div>
    )
}

const Total = ({ course }) => {
    const taulu = course.parts.map(part => part.exercises)
    const sum = taulu.reduce((a, b) => a + b)
    return (
        <div>
            <p> <b>Total of {sum} exercises</b></p>
        </div>

    )
}

export default Course