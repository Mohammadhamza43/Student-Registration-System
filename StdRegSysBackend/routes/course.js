const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { auth } = require('../middleware/authenticate');

router.use(auth);

router.post('/create', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(200).send({course: course});
    } catch (e) {
        res.status(400).send(e + '');
    }

});

router.get('/getAll', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).send({courses: courses});
    }catch (e) {
        res.status(400).send({error: e + ''});
    }
});

module.exports = router;
