const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  username: {
    type: String,
    required: [true, "Path `username` is required."]
  },
  description: {
    type: String,
    required: [true, "Path `description` is required."]
  },
  duration: {
    type: Number,
    required: [true, "Path `duration` is required."]
  },
  date: {
    type: String,
    required: false
  },
  author_id: String,
})

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;