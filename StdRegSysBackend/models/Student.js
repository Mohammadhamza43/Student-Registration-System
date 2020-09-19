const mongoose = require('mongoose');
const validator = require('validator');

const studentDetailSchema = mongoose.Schema({
    std_ID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email Address');
            }
        }
    },
    section: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'sections',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
studentDetailSchema.path('email').validate(async (email) => {
    const emailCount = await mongoose.models.studentdetails.countDocuments({email});
    return !emailCount;
}, 'Email Already Exists');

studentDetailSchema.path('std_ID').validate(async (std_ID) => {
    const stdIDCount = await mongoose.models.studentdetails.countDocuments({std_ID});
    return !stdIDCount;
}, 'Student Already Exists');

const studentDetail = module.exports = mongoose.model('studentdetails', studentDetailSchema);


