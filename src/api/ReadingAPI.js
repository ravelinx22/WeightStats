const { ipcRenderer } = window.require('electron');

export function createReading(params) {
	ipcRenderer.send("createReading", params);
}

export function getReadings(params) {
	ipcRenderer.send("getReadings", params);
}

export function deleteReading(params) {
	ipcRenderer.send("deleteReading", params );
}
