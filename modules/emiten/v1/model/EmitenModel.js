import abstractQuery from "../../../../library/abstractQuery"

export class EmitenModel extends abstractQuery {
    constructor() {
		super()
		this.sql = ""
		this.escape = ""
	}

	listEmiten(callback){
		this.sql ="SELECT * from emiten";
		this.escape = []
		this.queryEscape(this.sql, this.escape, (result) => {
			callback(result)
		})
	}
	checkExistEmiten(code,callback){
        this.sql ="SELECT * from emiten t where code = ? limit ? ";
        this.escape=[code,1]
        this.queryEscape(this.sql, this.escape, (result) => {
            callback(result[0])
        })
	}
	createEmiten(params,callback){
        this.sql ="INSERT INTO emiten (code,name,type_emiten) VALUES (?,?,?)"
        this.escape = [params.code, params.name,params.type_emiten]
        this.queryEscape(this.sql, this.escape, (resultInsert) => {
			this.checkExistEmiten(params.code,resultGet=>{
				callback(resultGet)
			})
        })
    }

}

