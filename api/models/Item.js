/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/



module.exports = {
  
  attributes: {
		title: {
			type: 'string',
			required: true
		},
        price:{
            type: 'float',
            required: true
        },
        description:{
            type: 'string',
            required: true
        },
        fileName:{
            type: 'string',
            required: true
        },
        open:{
            type: 'boolean',
            defaultsTo: false,
        },
        dateTime:{
            type: 'datetime',
            required: true
        },
		user: {
			model: 'user'
		},
	},


    getAll: function() {
        return Item.find()
        .then(function (models) {
            return [models];
        });
    },

    getOne: function(id) {
        return Item.findOne(id)
        .then(function (model) {
            return [model];
        });
    }, 

    getMylist: function(id) {
        return Item.find( {where: { user: id }})
        .then(function (model) {
            return [model];
        });
    },

};

