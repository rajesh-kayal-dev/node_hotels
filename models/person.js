const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    work:{
        type:String,
        enum:['chef', 'waiter', 'manager', 'cleaner'],
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    
});

personSchema.pre('save', async function(next){
    const person = this;

    //Hash the password if it has been modified (or is new)
    if(!person.isModified('password')) return next();


    try {
        //hash password generate salt
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        person.password = hashedPassword;

        
        next()
    } catch (error) {
        return next(error);
    } 
});
 
personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const Person = mongoose.model('Person', personSchema);

module.exports = Person;