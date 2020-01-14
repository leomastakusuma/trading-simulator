import {Bankmodel, EmitenModel} from "../model/EmitenModel"
import abstractBotEmiten from "../../../../library/abstractBotEmiten";
export default class EmitenController extends abstractBotEmiten {

    constructor(props) {
        super(props);
        this.router = props;
        this.router.post("/emiten", this.create.bind(this))
        this.router.get("/emiten", this.listAll.bind(this))

    }

    listAll(req,res){
       
        this.getModelEmiten().listEmiten((detail)=>{
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
        // validation.push(this.isStringEmpty(req.body.bank_code) == false ? true : "bank_code is required")
        validation.push(this.isStringEmpty(req.body.bank_name) == false ? true : "bank_name is required")
        // validation.push(this.isStringEmpty(req.body.bank_swift) == false ? true : "bank_swift is required")
        // validation.push(this.isStringEmpty(req.body.jumlah_vendor) == false ? true : "jumlah_vendor is required")
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
            let data = {
                'bank_code' : req.body.bank_code,
                'bank'  : req.body.bank_name,
                'bank_swift' : req.body.bank_swift,
                'jumlah_vendor' : req.body.jumlah_vendor
            }
            
            this.getModelBank().insertBank(data,(insertBeneficiaryBank)=>{
                
            });
            this.responseSuccess("Success Insert",(response)=>{
                res.json(response)
            })

        }
    }


    getModelEmiten() {
        return  new EmitenModel();
	}

}
