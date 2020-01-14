import abstractBotEmiten from "../../../../library/abstractBotEmiten";
export default class BotController extends abstractBotEmiten {

    constructor(props) {
        super(props);
        this.router = props;
        this.router.get("/watch", this.listWatch.bind(this))

    }

    listWatch(req,res){
       this.middlewareGET("ANTM",reponse=>{
            res.json(reponse)
       });
    }

}
