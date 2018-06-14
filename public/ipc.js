const electron = require("electron");
const ipc = electron.ipcMain;
const Reading = require("../src/models/Reading.js");

ipc.on("createReading", function(event, params) {
	var newReading = new Reading(params);
	newReading.save((err) => {
		if(err) throw err;
		event.sender.send("responseCreateReading");
	});
});

ipc.on("getReadings", function(event, params) {
	Reading.find(params, null, { sort: { taken: -1 } }, function(err, docs) {
		event.sender.send("responseGetReadings", docs);
	});
});

ipc.on("deleteReading", function(event, params) {
	Reading.remove(params, (err) => {
		if(err) throw err;
		event.sender.send("responseDeleteReading");
	});
});
