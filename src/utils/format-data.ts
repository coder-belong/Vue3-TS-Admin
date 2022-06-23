import moment from "moment";

function formatTime(time) {
	return moment(time).format('YYYY-MM-DD HH:mm:ss ')
}


export {
	formatTime
};
