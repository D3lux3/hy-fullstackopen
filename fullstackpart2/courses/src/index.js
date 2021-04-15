import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'



const App = () => {
    const course = {
        name: "Half Stack application development",
        id: 1,
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2
            },
            {
                name: "State of component",
                exercises: 14,
                id: 3
            },
            {
                name: "Redux",
                exercises: 11,
                id: 4
            }
        ]
    }
    const course2 = {
        name: "Node.js",
        id: 2,
        parts: [
            {
                name: "Routing",
                exercises: 3,
                id: 1
            },
            {
                name: "Middlewares",
                exercises: 7,
                id: 2
            }
        ]
    }
    return (
        <div>
            <h1>Web development curriculum</h1>
            <Course course={course} />
            <Course course={course2} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

