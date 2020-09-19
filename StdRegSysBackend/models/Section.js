const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

sectionSchema.path('name').validate(async (name) => {
    const sectionCount = await mongoose.models.sections.countDocuments({name});
    return !sectionCount;
}, 'Section Already Exists');

const Section = module.exports = mongoose.model('sections', sectionSchema);


