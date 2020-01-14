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
	

}

