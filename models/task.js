var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var taskSchema = new Schema({
    name          : { type: String, required: true, trim: true, index: { unique: true } }
  , description   : { type: String, required: true }
  , date_created  : { type: Date, required: true, default: Date.now }
});

var task = mongoose.model('task', taskSchema);

module.exports = {
  Task: task
};