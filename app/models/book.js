var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	_id: {type: String, required: true},
	category: {type: String, required: true, index: true},
	authors: {type: [String], required: true, index: true},
	createdAt: {type: Date, default: Date.now},
	lastUpdated: {type: Date, default: Date.now}
});

BookSchema.pre('update', next => {
	this.lastUpdated = new Date();
	next();
});

BookSchema.pre('save', next => {
	now = new Date();
	if (!this.createdAt) {
		this.createdAt = now;
	}
	next();
});


module.exports = mongoose.model('Book', BookSchema);