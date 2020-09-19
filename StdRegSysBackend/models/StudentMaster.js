const mongoose = require('mongoose');

const masterSchema = mongoose.Schema({
    studentDetail: {
        type: mongoose.Schema.Types.ObjectID, ref: 'studentdetails',
    },
    course: [{
        type: mongoose.Schema.Types.ObjectID, ref: 'courses',
    }]
});

const StudentMaster = module.exports = mongoose.model('studentcourseinfo', masterSchema);

