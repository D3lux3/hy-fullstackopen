import React from 'react';

const Persons = ({ persons, filter, showAll, deleteClickHandler }) => {
    const personsToShow = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        personsToShow.map(person => <p key={persons.name}>{person.name} {person.number} <button onClick={() => deleteClickHandler(person.id, person.name)}>delete</button></p>)
    )



}


export default Persons;