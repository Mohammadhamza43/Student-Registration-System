const express = require('express');
const router = express.Router();

const StudentMaster = require('../models/StudentMaster');
const Student = require('../models/Student');
const Course = require('../models/Course');
const {auth} = require('../middleware/authenticate');

router.use(auth);

router.get('/getAll', async (req, res) => {
    try {
        const info = await StudentMaster.find()
            .populate('course')
            .populate({path: 'studentDetail', populate: {path: 'section', model: 'sections'}})
            .exec(function (err, result) {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                res.status(200).send(result);
            });
    } catch (e) {
        res.status(400).send(e + '');
    }
});

router.post('/getById', async (req, res) => {
    try {
        const { id } = req.query;
        const studentById = await StudentMaster.findOne({_id: id})
            .populate('course')
            .populate({path: 'studentDetail', populate: {path: 'section', model: 'sections'}})
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

router.put('/update', async (req, res) => {
    try {
        const { id } = req.query;
        const courseList = await req.body.course;
        let coursesIdList = [];
        for (let i = 0; i < courseList.length; i++) {
            const course = await Course.isCourseCreated(courseList[i].name);
            coursesIdList.push(course._id);
        }
        const master = await StudentMaster.findOne({_id: id}, function (err, doc) {
            doc.course = coursesIdList;
            doc.save();
        });
        const student = await Student.findOne({_id: master.studentDetail._id}, function (err, doc) {
            if (err) {
                res.status(500).send(err + '')
            }
            doc.name = req.body.studentDetail.name;
            doc.email = req.body.studentDetail.email;
            doc.gender = req.body.studentDetail.gender;
            doc.date = req.body.studentDetail.date;
            doc.section = req.body.studentDetail.section;
            doc.std_ID = req.body.studentDetail.std_ID;
            doc.save();
        });
        res.status(200).send(master);
    } catch (e) {
        res.status(500).send(e + ' Internal Server Error')
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.query;
        const master = await StudentMaster.findByIdAndRemove(id);
        const student = await Student.findOne({_id: master.studentDetail._id}, function (err, doc) {
            if (!err) {
                doc.isDeleted = true;
                doc.save();
            }
        });
        if (!master) {
            res.status(404).send({error: 'resource not found'});
        }
        res.status(200).send(master);
    } catch (e) {
        res.status(400).send(e + '');
    }
});

module.exports = router;
