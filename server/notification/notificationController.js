var Notification = require('./notificationModel.js');
var Game = require('../games/gameModel.js');

module.exports ={
	 players : [],
	
	insertNotification : function (req, res) {
		Game.findOne({_id : req.params.id}, function (err, game) {
			if(game){
				players = game.players;
			}else{
				res.status(500).send(err);
			}
		})
		var body = req.body;
		var newNotification = new Notification({
			from : body.from,
			notificationType : body.type,
			game : req.params.id,
			text : body.text
		})

		newNotification.save(function(err, notification) {
			if(notification){
				res.status(200).send(notification);
			}else{
				res.status(500).send(err);
			}
		});
	},


	isRead : function (req, res) {
		console.log(req.body.from)
		var userID = req.body.from
		Notification.findOne({game : req.params.id}, function (err, notification) {
			if(Notification){
				for (var i = 0; i < notification.to.length; i++) {
					if(notification.to[i].playerId.toString() === userID){
						notification.to[i].seen = true;
					} 
				}
				notification.save(function (err, readNotification) {
					if(readNotification){
						res.status(200).send(readNotification);
					}else{
						res.status(500).send(err);
					}
				})
			}else{
				res.status.send(500);
			}
		})
	},

	getNotification : function (req, res) {
		Notification.find({game : req.params.id}, function (err, notification) {
			if(notification){
				res.status(200).send(notification)
			}else{
				res.status(500).send("err")
			}
		})
	}
};

