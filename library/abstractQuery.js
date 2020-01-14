import mysql from "mysql"
import config from "config"
let dbConfig = config.dbConfig

//CONECTION
const Connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
	password: dbConfig.password,
	dateStrings: true,
    database: dbConfig.database
})


console.log(config.dbConfig.password)
export default class abstractQuery {
	queryEscape(Query, Params, callback) {
		let Log = Connection.query(Query, Params, function (err, results) {
			let queryLog = config.queryLog
			if(queryLog){
				console.log(Log.sql)
			}
			if(err){
				// throw new Error(err)
				console.log(err)
			}
			else{
				callback(results)
			}
		})
	}
	
}


