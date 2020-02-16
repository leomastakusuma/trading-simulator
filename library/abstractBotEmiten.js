import {
	abstractResponse
} from "./abstractResponse"
import request from "request"
import config from "config"

export default class abstractBotEmiten extends abstractResponse {
	
	generateUniqID() {
		return uuid()
	}
	generateVerify() {
		return Math.floor(Math.random() * 900000) + 100000
	}

	generateSalt() {
		var text = ""
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
		for (var i = 0; i < 6; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length))
		return text
	}

	generatePassword(salt, passwprd) {
		const hash = crypto.createHmac("sha256", salt).update(passwprd).digest("hex")
		return hash
	}
	

	/**
	 * @description check Basic Auth
	 * @param {String} req 
	 * @param {Boolean} callback 
	 */
	validationBasicAuth(req, callback) {
		let auth = req.headers["authorization"]
		if (!auth) {
			callback(false)
		} else {
			var tmp = auth.split(" ")
			var buf = new Buffer(tmp[1], "base64")
			var plain_auth = buf.toString()

			var creds = plain_auth.split(":")
			var username = creds[0]
			var password = creds[1]
			if (username === "carsworld" && password === "EmoZjoGJmP") {
				callback(true)
			} else {
				callback(false)
			}
		}
	}


	/**
	 * @description check Basic Auth
	 * @param {String} req 
	 * @param {Boolean} callback 
	 */
	validationJwtAuth(req, callback) {
		let auth = req.headers["authorization"]
		let jwtPayload = config.get("jwt-payload").etc.jwtPayload
		if (!auth) {
			callback(false)
		} else {
			var token = auth.replace(/Bearer /g, "")
			jwt.verify(token, jwtPayload, function (err, decode) {
				if (err) {
					callback(false)
				} else {
					delete decode["iat"]
					delete decode["exp"]
					callback(decode)
				}
			})
		}
	}

	dateNow() {
		let now = new Date()
		let year = "" + now.getFullYear()
		let month = "" + (now.getMonth() + 1)
		if (month.length == 1) {
			month = "0" + month
		}
		let day = "" + now.getDate()
		if (day.length == 1) {
			day = "0" + day
		}
		let hour = "" + now.getHours()
		if (hour.length == 1) {
			hour = "0" + hour
		}
		let minute = "" + now.getMinutes()
		if (minute.length == 1) {
			minute = "0" + minute
		}
		let second = "" + now.getSeconds()
		if (second.length == 1) {
			second = "0" + second
		}
		return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second

	}

	dateExpired() {
		let now = new Date()
		now.setMinutes(now.getMinutes() - 5)
		let year = "" + now.getFullYear()
		let month = "" + (now.getMonth() + 1)
		if (month.length == 1) {
			month = "0" + month
		}
		let day = "" + now.getDate() - 1;
		if (day.length == 1) {
			day = "0" + day
		}
		let hour = "" + now.getHours()
		if (hour.length == 1) {
			hour = "0" + hour
		}
		let minute = "" + now.getMinutes()
		if (minute.length == 1) {
			minute = "0" + minute
		}
		let second = "" + now.getSeconds()
		if (second.length == 1) {
			second = "0" + second
		}
		return year + "-" + month + "-" + day 
	}


	isStringEmpty(value){
		return (!value || value == undefined || value == "" || value.length == 0)
	}

	middlewareGETSimbol(Symbol, callback) {
		request({
			method: "GET",
			url: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+Symbol+".JK&interval=5min&outputsize=compact&apikey="+config.apiKey,
			json:true
		}, function (err, respon, body) {
			if (err) {
				callback({
					status: 500,
					message: "error",
					display_message: "Opps " + err.syscall + " " + err.code,
					data: {}
				})
			} else {
				let BadGateway = {
					status: false,
					error_message: "Opp someting wrong,please try again",
				}
				if (respon.statusCode == 404 || respon.statusCode == 500 || respon.statusCode == 502) {
					callback(BadGateway)
				} else {
					callback(body)
				}
			}

		})
	}

	middlewarePOST(url, paramsBody, callback) {
		request({
			method: "POST",
			url: config.urlTrading + url,
			json: true,
			body: paramsBody
		}, function (err, respon, body) {

			console.log(body)
			if (err) {
				callback({
					status: 500,
					message: "error",
					display_message: "Opps " + err.syscall + " " + err.code,
					data: {}
				})
			} else {
				let BadGateway = {
					status: false,
					error_message: "Opp someting wrong,please try again",
				}
				if (respon.statusCode == 404 || respon.statusCode == 500 || respon.statusCode == 502) {
					callback(BadGateway)
				} else {
					callback(body)
				}
			}

		})
	}

	
	middlewareGET(params, callback) {
		request({
			method: "GET",
			url: config.apiKey,
			json:true
		}, function (err, respon, body) {
			if (err) {
				callback({
					status: 500,
					message: "error",
					display_message: "Opps " + err.syscall + " " + err.code,
					data: {}
				})
			} else {
				let BadGateway = {
					status: false,
					error_message: "Opp someting wrong,please try again",
				}
				if (respon.statusCode == 404 || respon.statusCode == 500 || respon.statusCode == 502) {
					callback(BadGateway)
				} else {
					callback(body)
				}
			}

		})
	}

	
}