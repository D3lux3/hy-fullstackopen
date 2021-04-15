import React, { useState, useEffect } from 'react';
import module from './services/Module'
import Filterform from './components/Filterform'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {

    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [filter, setFilter] = useState('');
    const [errorMessage, setErrorMessage] = useState(null)
    const [messageBool, setMessageBool] = useState(true);

    useEffect(() => {
        module
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])


    const handleInputNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterInput = (event) => {
        setFilter(event.target.value)
        if (event.target.value.length > 0) {
            setShowAll(false);
        } else {
            setShowAll(true);
        }
    }

    const handleInputChange = (event) => {
        setNewName(event.target.value);
    }

    const buttonClickHandler = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber
        }

        if (persons.filter(person => person.name === personObject.name && person.number === personObject.number).length >= 1) {
            alert(`${newName} is already added to phonebook`);
        } else if (persons.filter(person => person.name === personObject.name).length >= 1) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                modifyPersonsNumber(newName, newNumber);
            }
        } else {
            module
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    setErrorMessage(`${newName} has been added to server`)
                    setMessageBool(true)
                    setTimeout(() => {
                        setErrorMessage(null)
                        setMessageBool(true)
                    }, 5000)
                }).catch((error) => {
                    setErrorMessage(error.message)
                    setMessageBool(false)
                    setTimeout(() => {
                        setErrorMessage(null)
                        setMessageBool(true)
                    }, 5000)
                })
        }
    }

    const modifyPersonsNumber = (name, newNumber) => {
        const person = persons.find(p => p.name === name)
        const modifiedPerson = { ...person, number: newNumber }
        module
            .modifyPersonNumber(person.id, modifiedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.name !== name ? person : modifiedPerson))
                setErrorMessage(`${newName}'s number has been modified`)
                setMessageBool(true)
                setTimeout(() => {
                    setErrorMessage(null)
                    setMessageBool(true)
                }, 5000)
            }).catch(error => {
                setErrorMessage(`Information of ${name} has already been removed from server`)
                setMessageBool(false)
                setTimeout(() => {
                    setErrorMessage(null)
                    setMessageBool(true)
                }, 5000)
                setPersons(persons.filter(person => person.name !== name));
            })
    }

    const deleteClickHandler = (id, name) => {
        if (window.confirm(`Delete ${name}`)) {
            module
                .deletePerson(id)
                .then(returnedPerson => {
                    setPersons(persons.filter(person => person.id !== id));
                    setErrorMessage(`Information of ${name} has been removed from server`)
                    setMessageBool(true)
                    setTimeout(() => {
                        setErrorMessage(null)
                        setMessageBool(true)
                    }, 5000)
                }).catch(error => {
                    setErrorMessage(`Information of ${name} has already been removed from server`)
                    setMessageBool(false)
                    setTimeout(() => {
                        setErrorMessage(null)
                        setMessageBool(true)
                    }, 5000)
                    setPersons(persons.filter(person => person.id !== id));
                })
        }
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} messageBool={messageBool} />
            <Filterform handle={handleFilterInput} />
            <h2>add a new</h2>
            <PersonForm handleChange={handleInputChange}
                handleInput={handleInputNumber}
                buttonHandler={buttonClickHandler} />
            <h2>Numbers</h2>
            <Persons showAll={showAll} filter={filter} persons={persons} deleteClickHandler={deleteClickHandler} />
        </div>
    )
}
export default App;