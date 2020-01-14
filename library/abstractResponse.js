export class abstractResponse {
	constructor(){
		this.result = ""
	}
	responseSuccess(data, callback) {
		this.result = {
			status: true,
			result: data,
		}
		callback(this.result)
	}
	

	responseSuccessWithMessage(message,data,callback){
		this.result = {
			status: true,
			message : message,
			result: data,
		}
		callback(this.result)
	}

	responseError(message, callback) {
		this.result = {
			status: false,
			error_message: message,
		}
		callback(this.result)
	}
	responseNotFound(message,callback) {
		this.result = {
			status: false,
			error_message: message,
		}
		callback(this.result)
	}
	responseerrorAuth(callback) {
		this.result = {
			status: false,
			error_message : "Unauthorized"
		}
		callback(this.result)
	}
	
	responseValidation(display_message, callback) {
		var result = {
			status: false,
			error_message: display_message.join()
		}
		callback(result)
	}
}                                          