import React from 'react';
import ReactDOM from 'react-dom';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescriptionType extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CourseDescriptionType {
  name: "Fundamentals";
}

interface CoursePartFour extends CourseDescriptionType {
  name: "Best course ever!";
  boring: boolean;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseDescriptionType {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

type CoursePart =  CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const Part: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <>
      {courses.map((part, i) => {
        switch (part.name) {
          case "Fundamentals":
            return <p key={i}>{part.name} {part.exerciseCount} {part.description}</p>
          case "Deeper type usage":
            return <p key={i}> {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
          case "Using props to pass data":
            return <p key={i}>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
            case "Best course ever!":
            return <p key={i}>{part.name} {part.exerciseCount} {part.description} {part.boring}</p>
          default:
            assertNever(part);
        }
      })}
    </>
  )
}


const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Content: React.FC<{ courses: CoursePart[] }> = ({ courses }) => (
  <>
    <Part courses={courses} />
  </>
)

const Total: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {
  return (
    <p>
      Number of exercises{" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}



const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Best course ever!",
      exerciseCount: 14,
      description: "Confusing description",
      boring: false
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};



ReactDOM.render(
  <App />,
  document.getElementById('root')
);