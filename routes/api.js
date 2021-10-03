const express = require('express');
const router = express.Router();
const api = require('../controllers/api');

router.route('/users')
.post(api.createUser)
.get(api.getUsers)

router.route('/users/:_id/exercises')
.post(api.createExercise)

router.route('/users/:_id/logs')
.get(api.getUserLog)

module.exports = router