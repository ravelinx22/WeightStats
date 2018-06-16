/**
 * Returns the number of weeks passed from start date to end date.
 */
export function weeksPassed(startDate, endDate) {
	var t2 = endDate.getTime();
	var t1 = startDate.getTime();
	return parseInt((t2-t1)/(24*3600*1000*7), 10);
}
