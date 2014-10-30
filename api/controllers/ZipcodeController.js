/**
 * ZipcodeController
 *
 * @description :: Server-side logic for managing zipcodes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getAll: function(req, res) {
		Zipcode.getAll()
		.spread(function(models) {
                console.log('in getAll user', models)

                res.json({data:models});
		})
		.fail(function(err) {
			// An error occured
		});
	},
	getByCity: function(req, res) {
		console.log(req);
		console.log("getByCity");
		Zipcode.getByCity(function(err, result){
			if(err){
				console.log(err);
			}else{
				console.log(result);
				//res.json(result);
				Zipcode.watch(req);
                Zipcode.subscribe(req.socket, result);
				res.json({data: result});
			}
		});
	},
};

