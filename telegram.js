import  abstractBotEmiten from "./library/abstractBotEmiten"
import config from "config"


var telegram = require('telegram-bot-api');
var api = new telegram({
	token: config.telegramToken,
	updates: {
        enabled: true
    }
});

function getAbstract(){
    return  new abstractBotEmiten();
}
