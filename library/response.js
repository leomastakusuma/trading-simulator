var dateFormat = require("dateformat");
export default class Response {
	constructor() {
		this.result = ""
	}
	responseSuccess(message, data, callback) {
		this.result = {
			status: 200,
			message: "success",
			time: new Date().getTime(),
			message: message,
			data: data,
		}
		callback(this.result)
	}
	responseUpdate(callback) {
		this.result = {
			status: 200,
			status_message: "update success",
			message: "Success update your data",
			data: {},
		}
		callback(this.result)
	}

	responseNotFound(callback) {
		this.result = {
			status: 204,
			message: "not found",
			message: "opps data not found",
			data: {},
		}
		callback(this.result)
	}
	responseerrorAuth(data, callback) {
		this.result = {
			status: 401,
			message: "error",
			message: "Error Authentication",
			data: {},
		}
		callback(this.result)
	}
	responseISExist(message, data, callback) {
		var result = {
			status: 409,
			message: "error",
			message: "field data is already exist",
			data: {}
		}
		callback(result)
	}
	responseFailed(message, data, callback) {
		var result = {
			status: 500,
			message: "error",
			message: "Opps something went wrong,please try again",
			data: data
		}
		callback(result)
	}
	responseCatch(message, callback) {
		var result = {
			status: 500,
			message: "error",
			message: message,
		}
		callback(result)
	}
	responseValidation(message, data, callback) {
		var result = {
			status: 400,
			message: "validation errors",
			message: message,
			data: data
		}
		callback(result)
	}
	logging(msg) {
		console.log(dateFormat(new Date(), 'dd-mm-yyyy HH:MM:ss') + ' - ' + msg);
	}
	err_log(msg) {
		console.error(dateFormat(new Date(), 'dd-mm-yyyy HH:MM:ss') + ' - ' + msg)
	}
}