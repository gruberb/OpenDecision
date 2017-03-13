var mongoose = require('mongoose');

var DecisionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  updateDate: { type: Date, default: Date.now, required: true },
  related: [ { type: Number } ],
  tags: [ { type: String } ],
  cost: { type: Number },
  time: { type: Number },
  description: { type: String },
  success: { type: Boolean },
  reason: { type: String }
});

module.exports = mongoose.model('Decision', DecisionSchema);