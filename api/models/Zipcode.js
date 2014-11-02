/**
* Zipcode.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	attributes: {
		city: {
			type: 'string',
			required: true
		},
		state: {
			type: 'string',
			required: true
		},
		loc: {
			type: 'object',
			required: true
		},pop: {
			type: 'double',
			required: true
		},
	},

	getAll: function() {
		return Zipcode.find()
		.then(function (models) {
			return [models];
		});
	},
	getByCity: function(callback) {

		var MongoClient = require('mongodb').MongoClient; // Driver for connecting to MongoDB

		MongoClient.connect('mongodb://localhost:27017/sailngMongo', function(err, db) {
	        if(err) throw err;

			x =  db.collection("zipcode").aggregate( { $group : { _id : { city : "$city", state : "$state" }, totalPop : { $sum : "$pop" } } }, 
												     { $match : {totalPop : { $gte : 500000 } } }
													    , function(err, result){
										                       	if(err){
										                       		console.log(err);
										                       	}
										                       	db.close();
										                       	callback(null, result);   
									                       });
 		});
	}
};