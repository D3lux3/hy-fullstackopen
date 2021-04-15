const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const url = process.env.MONGODB_URI

console.log('Connecting to ', url, "...")
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Succesfully connected to MongoDB...')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minlength: 3,
    },
    number: {
        type: String,
        minlength: 8,
    },
})


phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

phoneSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Phonenumber', phoneSchema);