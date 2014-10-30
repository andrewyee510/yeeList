var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		username: {
			type: 'string',
			required: true,
			unique: true
		},
		email: {
			type: 'email',
			required: true,
			unique: true
		},
		first_name: {
			type: 'string',
			required: true
		},
        role: {
            type: 'INTEGER',
            required: false
        },

        make: {
            type: 'string',
            required: false
        },
        model: {
            type: 'string',
            required: false
        },
        year: {
            type: 'INTEGER',
            required: false
        },
        plate: {
            type: 'string',
            required: false
        },
        state: {
            type: 'INTEGER',
            required: false
        },
        no: {
            type: 'string',
            required: false
        },

		message_count: {
			type: 'number'
		},
		// A User can have many messages
		messages: {
			collection: 'message',
			via: 'user'
		},

		items: {
			collection: 'item',
			via: 'users',
			dominant: true
		},

		passports : { collection: 'Passport', via: 'user' }
        //,       "cars":'array'
	},

	getAll: function() {
		return User.find()
		.then(function (models) {
			return [models];
		});
	},

	getOne: function(id) {
		return User.findOne(id)
		.then(function (model) {
			return [model];
		});
	},

	// Hook that gets called after the default publishUpdate is run.
  	// We'll use this to tell all public chat rooms about the user update.
	afterPublishUpdate: function (id, changes, req, options) {

		// Get the full user model, including what rooms they're subscribed to
		User.findOne(id).populate('items').exec(function(err, user) {
			// Publish a message to each room they're in.  Any socket that is 
			// subscribed to the room will get the message. Saying it's "from" id:0
			// will indicate to the front-end code that this is a systen message
			// (as opposed to a message from a user)
			sails.util.each(user.items, function(item) {
				var previousName = options.previous.name == 'unknown' ? 'User #'+id : options.previous.name;
				Item.message(item.id, {item:{id:item.id}, from: {id:0}, msg: previousName+" changed their name to "+changes.name}, req);		
			});
			
		});
		
	}



};