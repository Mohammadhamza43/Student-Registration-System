const express = require('express');
const router = express.Router();
const Section = require('../models/Section');
const { auth } = require('../middleware/authenticate');

router.use(auth);


router.post('/create', async (req, res) => {
    try {
        const section = new Section({name: req.body.name});
        await section.save();
        res.status(200).send(section);
    }catch (e) {
        res.status(400).send(e + '');
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const sections = await Section.find({});
        res.status(200).send({sections: sections});
    } catch (e) {
        res.status(400).send(e + '');
    }
});
module.exports = router;
