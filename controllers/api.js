const User     = require('../model/User');
const Exercise = require('../model/Exercise');
const dateUtil = require('../utils/toDateString');

module.exports.createUser = async (req, res) => {
  try {
    let user = await User.create({username: req.body.username})
    res.status(201).json({username: user.username, _id: user._id})
  } 
  catch(err) {
    res.status(500).send(err)
  }
}

module.exports.getUsers = async (req, res) => {
  try {
    let users = await User
    .find({})
    .select("-__v")
    res.status(200).send(users)
  } 
  catch (err) {
    res.status(500).send(err)
  }
}

module.exports.createExercise = async (req, res) => {
  try {
    let user = await User.findById(req.params['_id'])

    if (!user) return res.status(404).send('Unknown userId')

    let exercise = await Exercise.create({
      username   : user.username,
      description: req.body.description,
      duration   : req.body.duration,
      date       : req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString(),
      author_id  : user._id
    })

    res.status(201).json({
      username   : exercise.username,
      date       : exercise.date,
      duration   : Number(exercise.duration),
      description: exercise.description,
      _id        : exercise.author_id
    })
  } 
  catch(err) {
    res.status(500).send(err.errors.description.message)
  }
}

module.exports.getUserLog = async (req, res) => {
  try{
    let user = await User.findById(req.params['_id'])
    if (!user) return res.status(404).send('Unknown userId')

    let exercises = Exercise
    .find({author_id: req.params['_id']})
    .select('-__v -username -_id -author_id')
    if (req.query.limit) exercises.limit(Number(req.query.limit))

    exercises = await exercises

    if (new Date(req.query.from) != 'Invalid Date') {
      exercises = exercises.filter(a => new Date(a.date) >= new Date(req.query.from))
    }

    if (new Date(req.query.to) != 'Invalid Date') {
      exercises = exercises.filter(a => new Date(a.date) <= new Date(req.query.to))
    }

    res.status(200).json({
      username: user.username,
      count   : exercises.length,
      _id     : user._id,
      log     : exercises
    })
  } catch (err) {
    res.status(500).send(err.errors.description.message)
  }
}