const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://puhelinadmin:${password}@cluster0-dpx5v.mongodb.net/puhelin-app?retryWrites=true`

const name = process.argv[3];
const number = process.argv[4];




mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phoneSchema = {
    name: String,
    number: String,
}

const Phonenumber = mongoose.model('Phonenumber', phoneSchema);

const phonenumber = new Phonenumber(
    {
        name: name,
        number: number,
    }
)

if (name == null && number == null) {
    Phonenumber.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(number => {
            console.log(number.name + " " + number.number)
        })
        mongoose.connection.close();
    })
} else {
    phonenumber.save().then(response => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close();
    })
}





