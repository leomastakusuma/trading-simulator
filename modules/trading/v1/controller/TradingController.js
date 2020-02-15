import abstractBotEmiten from "../../../../library/abstractBotEmiten";
import {TradingModel} from "../model/TradingModel"
import { EmitenModel } from "../../../emiten/v1/model/EmitenModel";

export default class TradingController extends abstractBotEmiten {

    constructor(props) {
        super(props);
        this.router = props;
        this.router.post("/trading", this.create.bind(this))
        this.router.get("/trading", this.listAll.bind(this))
        this.router.post("/trading/sell/:idTrading",this.sell.bind(this))

    }

    listAll(req,res){
        this.getModelTrading().listTrading((detail)=>{
            if(detail.length > 0){
                this.responseSuccess(detail,(response)=>{
                    res.json(response)
                })
            }else{
                this.responseNotFound("Not Found",(response)=>{
                    res.json(response)
                })
            }
        });
    }
    
    create(req, res) {
        let validation = []
        let errors = []
        validation.push(this.isStringEmpty(req.body.id_emiten) == false ? true : "id_emiten is required")
        validation.push(this.isStringEmpty(req.body.jumlah_lot) == false ? true : "jumlah_lot is required")
        validation.push(this.isStringEmpty(req.body.harga_beli) == false ? true : "harga_beli is required")
        validation.forEach(element => {
            if (element != true) {
                errors.push(element)
            }
        })
        if (errors.length > 0) {
            this.responseValidation(errors, (responseErrors) => {
                res.json(responseErrors)
            })
        } else {        
            this.getModelTrading().checkExist(req.body.id_emiten,exist=>{
                if(exist){
                    let jumlah_lot = req.body.jumlah_lot + exist.jumlah_lot
                    let jumlah_lembar = (req.body.jumlah_lot * 100) + exist.jumlah_lembar
                    let total_bayar = (req.body.harga_beli  * (req.body.jumlah_lot * 100))
                    let rataRataBeli = (total_bayar + exist.total_bayar)/jumlah_lembar
                    let rataRataTotalBayar = rataRataBeli * jumlah_lembar
                    let sales_tax=rataRataTotalBayar * 0.0015;
                    let charge=rataRataTotalBayar * 0.0010;
                    let data = {
                        'jumlah_lot'    : jumlah_lot ,
                        'jumlah_lembar' : jumlah_lembar,
                        'harga_beli'    : rataRataBeli,
                        "total_bayar"   : rataRataTotalBayar,
                        'sales_tax'     : sales_tax,
                        'total_charge'  : charge
                    }
                    this.getModelTrading().updateTrading(data,exist.id,(updateTrading)=>{
                        res.json(updateTrading)
                    });
                }else{
                    let jumlah_lot = req.body.jumlah_lot  
                    let jumlah_lembar = req.body.jumlah_lot * 100
                    let total_bayar = req.body.harga_beli  * jumlah_lembar
                    let sales_tax=total_bayar * 0.0015;
                    let data = {
                        'id_emiten' : req.body.id_emiten,
                        'jumlah_lot'  : jumlah_lot,
                        'jumlah_lembar':jumlah_lembar,
                        'harga_beli' : req.body.harga_beli,
                        "total_bayar":total_bayar,
                        'sales_tax' : sales_tax
                    }
                    this.getModelTrading().createTrading(data,(insertTrading)=>{
                        res.json(insertTrading)
                    });
                }
            })
        }
    }



    sell(req,res){
        let validation = []
        let errors = []
        validation.push(this.isStringEmpty(req.params.idTrading) == false ? true : "idTrading is required")
        validation.forEach(element => {
            if (element != true) {
                errors.push(element)
            }
        })
        if (errors.length > 0) {
            this.responseValidation(errors, (responseErrors) => {
                res.json(responseErrors)
            })
        } else { 
            this.getModelTrading().checkExistTrading(req.params.idTrading,exist=>{
                if(exist){
                    let jumlah_lot = req.body.jumlah_lot  
                    let jumlah_lembar = req.body.jumlah_lot * 100
                    let harga_jual = req.body.harga_jual  
                    let total_harga_jual = req.body.harga_jual  * jumlah_lembar
                    let sell_tax=total_harga_jual * 0.0025;
                    let data = {
                        'id_trading'        :   req.params.idTrading,
                        'jumlah_lot'        :   jumlah_lot,
                        'jumlah_lembar'     :   jumlah_lembar,
                        'harga_jual'        :   harga_jual,
                        'total_harga_jual'  :   total_harga_jual,
                        'sell_tax'          :   sell_tax
                    }
                    this.getModelTrading().sellTrading(data,(sellTrading)=>{
                        res.json(sellTrading)
                    }); 
                }else{
                    this.responseNotFound("Not Found ID Trading",(response)=>{
                        res.json(response)
                    })
                }
            })
        } 
    }

    getModelTrading() {
        return  new TradingModel();
    }
    getModelEmiten() {
        return  new EmitenModel();
	}

}
