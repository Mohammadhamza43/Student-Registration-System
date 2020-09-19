const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

courseSchema.path('name').validate(async (name) => {
    const courseCount = await mongoose.models.courses.countDocuments({name});
    return !courseCount;
}, 'Course Already Exists');

courseSchema.statics.isCourseCreated = async (name) => {
 const course = await Course.findOne({name});
 if (!course) {
     return await Course({name: name}).save();
 }
 return course;
};

const Course = module.exports = mongoose.model('courses', courseSchema);


