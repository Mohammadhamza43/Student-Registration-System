const express = require('express');
const router = express.Router();

const Student = require('../models/Student');
const Course = require('../models/Course');
const StudentMaster = require('../models/StudentMaster');

const {auth} = require('../middleware/authenticate');

router.use(auth);

router.post('/create', async (req, res, next) => {
    let item;
    try {
        const student = await Student({
            std_ID: req.body.studentDetail.std_ID,
            name: req.body.studentDetail.name,
            gender: req.body.studentDetail.gender,
            date: req.body.studentDetail.date,
            email: req.body.studentDetail.email,
            section: req.body.studentDetail.section,
        }).save();
        if (!student) {
            return;
        }
        let courses = [];

        const courseList = await req.body.course;
        for (let i = 0; i < courseList.length; i++ ) {
            const courseID = await Course.isCourseCreated(courseList[i].name);
            courses.push(courseID._id)
        }
        const courseInfo = await StudentMaster({
            course: courses,
            studentDetail: student._id
        }).save();
        res.status(200).send({student: student, courses: courses});
    } catch (e) {
        res.status(500).send({error: e + ''});
    }

});

router.put('/update', async (req, res) => {
   try {
       const { id } = req.query;
       const student = Student.findOneAndUpdate(req.body);
       if (!student) {
           res.status(500).send('No Matching data Found!')
       }
       res.status(200).send(student);

   } catch (e) {
       console.log(e + '');
   }
});

router.get('/getAll', async (req, res) => {
    try {
        const students = await Student.find().populate('section').then(console.log('done'));
        res.status(200).send({students: students});
    } catch (e) {
        res.status(500).send(e + '');
    }
});

router.post('/getById', async (req, res) => {
    try {
        const { id } = req.query;
        const studentById = await Student.findOne({_id: id})
            .populate('section')
            .exec((err, result) => {
                if (err) {
                    res.status(404).send({error: err})
                }
                res.status(200).send({student: result});
            })
    } catch (e) {
        console.log(e + '');
    }

});
module.exports = router;
