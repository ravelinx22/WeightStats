import moment from 'moment';

const Constants = {
	LOSS: "Loss",
	GAIN: "Gain",
	POUND: 1.0,
	TWO_POUNDS: 2.0,
	DEFAULT_START_DATE: moment(),
	DEFAULT_END_DATE: moment().add(1,"Y")
};

export default Constants;
