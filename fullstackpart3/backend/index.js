require('dotenv').config()
const Phonenumber = require('./models/phonenumber')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static('build'))

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name && !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Phonenumber({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson.toJSON);
        })
        .catch((error) => {
            console.error(error);
            response.status(409).end()
        })
    console.log(JSON.stringify(person));
})


app.delete('/api/persons/:id', (request, response, next) => {

    Phonenumber.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    }

    console.log(person)
    Phonenumber.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON)
        })
        .catch(error => next(error))
})


app.get(('/api/persons'), (request, response) => {
    Phonenumber.find({}).then(numbers => {
        response.json(numbers)
    })
})

app.get(('/api/persons/:id'), (request, response) => {
    Phonenumber.findById(request.params.id)
        .then(number => {
            response.json(number.toJSON())
        })
        .catch(error => {
            console.log(error)
            response.status(404).end()
        })
})



app.get(('/info'), (request, response) => {
    response.send(`<p>Phonebook has info for ${Phonenumber.length} people</p>` +
        `<p>${new Date()}</p>`)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
})