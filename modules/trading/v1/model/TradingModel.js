import abstractQuery from "../../../../library/abstractQuery"

export class TradingModel extends abstractQuery {
    constructor() {
		super()
		this.sql = ""
		this.escape = ""
	}

    listTrading(callback){
        this.sql ="SELECT t.create_at,t.id,e.name,t.jumlah_lot,jumlah_lembar,harga_beli,total_bayar,total_charge,sales_tax from trading as t JOIN emiten as e ON e.id = t.id_emiten";
        this.escape=[]
        this.queryEscape(this.sql, this.escape, (result) => {
            callback(result)
        })
    }
    createTrading(params,callback){
        this.sql ="INSERT INTO trading (id_emiten,jumlah_lot,jumlah_lembar,harga_beli,total_bayar,total_charge,sales_tax) VALUES (?,?,?,?,?,?,?)"
        this.escape = [params.id_emiten, params.jumlah_lot,params.jumlah_lembar, params.harga_beli,params.total_bayar, params.total_charge,params.sales_tax]
        this.queryEscape(this.sql, this.escape, (result) => {
            callback(result)
        })
    }
    updateTrading(params,idTrading,callback){
        this.sql ="UPDATE trading set jumlah_lot = ? ,jumlah_lembar = ?,harga_beli = ?,total_bayar = ? ,total_charge = ?,sales_tax = ? where id = ?"
        this.escape = [params.jumlah_lot,params.jumlah_lembar, params.harga_beli,params.total_bayar, params.total_charge,params.sales_tax,idTrading]
        this.queryEscape(this.sql, this.escape, (result) => {
            callback(result)
        })
    }

    checkExist(Symbol,callback){
        this.sql ="SELECT * from trading t where t.id_emiten = ? limit ? ";
        this.escape=[Symbol,1]
        this.queryEscape(this.sql, this.escape, (result) => {
            callback(result[0])
        })
    }

}

