import  abstractBotEmiten from "./library/abstractBotEmiten"


var telegram = require('telegram-bot-api');
var api = new telegram({
	token: '1048529604:AAEYJMfcvAcTLN2XV93Yt_0VOBT-iFI7xWY',
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
