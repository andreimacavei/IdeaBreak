const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add some text'],
  },
  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date().toISOString().slice(0, 10),
  },
});

module.exports = mongoose.model('Idea', IdeaSchema);