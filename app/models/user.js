var mongoose = require('mongoose');
var Schema = mongoose.Schema;

UserSchema = new Schema({
	_id: {type: String, required: true},
	password: {type: String, required: true},
	admin: {type: Boolean, default: false},
	createdAt: {type: Date, default: Date.now},
	lastUpdated: {type: Date, default: Date.now}
});

UserSchema.pre('update', next => {
	this.lastUpdated = new Date();
	next();
});

UserSchema.pre('save', next => {
	now = new Date();
	if (!this.createdAt) {
		this.createdAt = now;
	}
	next();
});


module.exports = mongoose.model('User', UserSchema);