var mongoose = require('mongoose');
var Decision = require('./decision');

var WorkspaceSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  admin: [ { type: String } ],
  category: { type: String },
  tags: [ { type: String } ],
  description: { type: String },
  decisions: [ Decision.schema ],
  creationDate: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Workspace', WorkspaceSchema);