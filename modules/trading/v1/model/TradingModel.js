import abstractQuery from "../../../../library/abstractQuery"

export class TradingModel extends abstractQuery {
    constructor() {
		super()
		this.sql = ""
		this.escape = ""
	}

    listTrading(callback){
        this.sql ="SELECT DATE_FORMAT(t.create_at,'%Y-%m-%d %H:%i:%s') transaction_date,e.name,t.jumlah_lot,t.jumlah_lembar,FORMAT(t.harga_beli,0) as harga_beli,FORMAT(t.total_bayar,0) as total_bayar ,FORMAT(t.sales_tax,0) as sales_tax from trading as t JOIN emiten as e ON e.id = t.id_emiten where t.jumlah_lot > 0";
        this.escape=[]
        this.queryEscape(this.sql, this.escape, (result) => {
            callback(result)
        })
    }
    createTrading(params,callback){
        this.sql ="INSERT INTO trading (id_emiten,jumlah_lot,jumlah_lembar,harga_beli,total_bayar,sales_tax) VALUES (?,?,?,?,?,?)"
        this.escape = [params.id_emiten, params.jumlah_lot,params.jumlah_lembar, params.harga_beli,params.total_bayar,params.sales_tax]
        this.queryEscape(this.sql, this.escape, (result) => {
            callback(result)
        })
    }

    sellTrading(params,callback){
        this.sql ="INSERT INTO portofolio (id_trading,jumlah_lot,jumlah_lembar,harga_jual,total_harga_jual,sell_tax) VALUES (?,?,?,?,?,?)"
        this.escape = [params.id_trading, params.jumlah_lot,params.jumlah_lembar, params.harga_jual,params.total_harga_jual,params.sell_tax]
        this.queryEscape(this.sql, this.escape, (result) => {
            callback(result)
        })
    }

    updateTrading(params,idTrading,callback){
        this.sql ="UPDATE trading set jumlah_lot = ? ,jumlah_lembar = ?,harga_beli = ?,total_bayar = ?,sales_tax = ? where id = ?"
        this.escape = [params.jumlah_lot,params.jumlah_lembar, params.harga_beli,params.total_bayar,params.sales_tax,idTrading]
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

    checkExistTrading(idTrading,callback){
        this.sql ="SELECT * from trading t where t.id = ? limit ? ";
        this.escape=[idTrading,1]
        this.queryEscape(this.sql, this.escape, (result) => {
            callback(result[0])
        })
    }

}

