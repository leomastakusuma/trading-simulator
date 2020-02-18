
import express from "express"
import bodyParser from "body-parser"
import helmet from "helmet"
import config from "config"



import  abstractBotEmiten from "./library/abstractBotEmiten"


var telegram = require('telegram-bot-api');

let app = express()


let apiRouter = express.Router()

app.use(bodyParser.urlencoded({
	limit: "50mb",
	extended: true
}))
app.use(bodyParser.json())
app.use(helmet())

function errorHandler(err, req, res, next) {
	res.status(500)
	let Response = {
		"status": "204",
		"message": "error",
		"display_message": "Opps something wrong with your input",
		"data": {}

	}
	res.json(Response)
	next()

}
app.use(errorHandler)

app.use("/v1", apiRouter)
//load app server using express 
import EmitenController from "./modules/emiten/v1/controller/EmitenController"
import BotController from "./modules/bot/v1/controller/BotController"
import TradingController from "./modules/trading/v1/controller/TradingController"

new EmitenController(apiRouter);
new BotController(apiRouter);
new TradingController(apiRouter)




var api = new telegram({
	token: config.telegramToken,
	updates: {
        enabled: true
    }
});


api.on('message', function(message)
{
	var text = message.text;
	var array = text.split(" ")
	if(array[0]==="/buy"){
		var split = array[1].split(",")
        let body = {
            "code":split[0],
            "jumlah_lot":split[1],
            "harga_beli":split[2]
        }
        getAbstract().middlewarePOST("/trading",body,response=>{
			api.sendMessage({
				chat_id: message.chat.id,
				text: "Data Pembelian sudah disimpan bro! semoga untung, amin.."
			})
        });
	}
	else if(array[0]==="/sell"){
		var split = array[1].split(",")
        let body = {
            "code":split[0],
            "jumlah_lot":split[1],
            "harga_jual":split[2]
        }
        getAbstract().middlewarePOST("/trading/sell",body,response=>{
			let  txt = response.message ? response.message : response.error_message;
			api.sendMessage({
				chat_id: message.chat.id,
				text: "Data Penjualan sudah disimpan bro! untung gak ?.."
			})
        });
	}
	else{
		api.sendMessage({
			chat_id: message.chat.id,
			text: "Sory bro feature belom tersedia"
		})
	}

});




function getAbstract(){
    return  new abstractBotEmiten();
}











var port = config.port
try {
	app.listen(port, "0.0.0.0", function () {
		console.log("listening on *:"+port)
	})
	var env = app.get("env")
	console.log(env)
	console.log("API Start On PORT  " + port)
} catch (e) {
	console.log("Error :\n" + e)
	var port2 = port + 1
	app.listen(port2)
	console.log("API Start On PORT  " + port2)
}