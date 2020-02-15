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
        validation.push(this.isStringEmpty(req.body.code) == false ? true : "code is required")
        validation.push(this.isStringEmpty(req.body.name) == false ? true : "name is required")
        validation.push(this.isStringEmpty(req.body.type) == false ? true : "type is required")
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
                'code' : req.body.code,
                'name' : req.body.name,
                'type_emiten' : req.body.type,
            }
            this.getModelEmiten().checkExistEmiten(req.body.code,existEmiten=>{
                if(existEmiten){
                    this.responseError("Emiten Exist",response=>{
                        res.json(response);
                    })
                }else{
                    this.getModelEmiten().createEmiten(data,succes=>{
                        if(succes){
                            this.responseSuccess("Success Insert",(response)=>{
                                res.json(response)
                            })
                        }else{
                            this.responseError("error create emiten",response=>{
                                res.json(response)
                            })
                        }
                    });
                }
            })

        }
    }


    getModelEmiten() {
        return  new EmitenModel();
	}

}
