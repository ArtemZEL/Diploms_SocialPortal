const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    default: 'General'
  },
  date: {
    type: Date,
    default: Date.now
  },
  color:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Note', NoteSchema);
