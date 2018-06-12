const mongoose = require("mongoose");

const ReadingSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	},
	value: Number,
    taken: Date 
});

module.exports = mongoose.model("Reading", ReadingSchema);
