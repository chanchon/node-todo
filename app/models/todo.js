const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Todo', todoSchema);