const express = require('express');
const router = express.Router();
const {User} = require('../models/User');
const {auth} = require('../middleware/authenticate');

router.post('/create', async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token})
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({error: 'Login Failed: Check Your Credentials'});
    }
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch (e) {
    res.status(400).send(e + '');
    console.log(e);
  }
});

router.get('/getAll', auth, async (req, res) => {
  try {
    res.send({users: [req.user]});
  } catch (e) {
    res.status(500).send({error: e + ''});
  }
});

module.exports = router;
