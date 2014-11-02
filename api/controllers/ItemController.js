/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');
module.exports = {
	create: function(req, res) {

    res.view({
      //navItems: navItems,
    });
  },

	upload: function (req, res) {
    var user = req.user;
		var uploadFile = req.file('itemUpload');
    var origifile = uploadFile._files[0].stream.filename;
    var filename = origifile;

    // check if file is existing and change filename if necessary
    while(fs.existsSync(".tmp/uploads/" +filename)){
       // Add 4 random chars at he beginning of the filename 1-9999
      var randomNumber =  Math.floor((Math.random() * 1000) + 1);
      filename = randomNumber +"_"+origifile; 
    };

    var model = {
        title   : req.param('title'),
        price   : req.param('price'),
        description : req.param('description'),
        dateTime : req.param('dateTime'),
        fileName : filename,
        user: user
    };

    uploadFile.upload({ dirname: './../../assets/images', saveAs: filename},
                      function onUploadComplete (err, files) {              // Files will be uploaded to ./assets/images
                                                                              
          if (err) return res.serverError(err);                              // IF ERROR Return and send 500 error with error

          Item.create(model)
            .exec(function (err, item) {
                if (err) {
                    return console.log(err);
                }
                else {
                    //res.json(message);
                  //res.json({status:200,file:files});
                  res.redirect('/item/'+ item.id);

                }
            });
        });
    /*
    uploadFile.upload(filename,function (err, files) {
        fs.rename(".tmp/uploads/"+files[0].filename, "./../../assets/images/" +files[0].filename, function(err){
          console.log(err);
          Item.create(model)
            .exec(function (err, item) {
                if (err) {
                    return console.log(err);
                }
                else {
                    //res.json(message);
                  //res.json({status:200,file:files});
                  res.redirect('/item/'+ item.id);

                }
            });
        });
    });
    */



    },

    getAll: function(req, res) {
      Item.getAll()
      .spread(function(models) {
          console.log('in getAll Items', models)
          res.json({data:models});
      })
      .fail(function(err) {
        // An error occured
      });
    },

    getMylist: function(req, res) {
      Item.getMylist(req.param('id'))
      .spread(function(models) {
          console.log('in getMyList Items', models)
          res.json({data:models});
      })
      .fail(function(err) {
        // An error occured
      });
    },


    detail: function(req, res) {
      Item.getOne(req.param('id'))
      .spread(function(model) {
          console.log('in getAll Items', model);
          res.view({
             model: model,
          });
      })
      .fail(function(err) {
        // An error occured
      });
    },

    search: function(req, res) {
      console.log(req);
      res.view({
        //navItems: navItems,
      });
    },
    
    mylist: function(req, res) {
      console.log(req);
      res.view({
        //navItems: navItems,
      });
    },
    
    
    sendMessage: function (req, res) {
      var itemId = req.param('itemId');
      var userId = req.param('user');
      User.getOne(userId)
      .spread(function(model) {
            var currentdate = new Date(); 
            var dateTime =  currentdate.getDate() + "/"
                      + (currentdate.getMonth()+1)  + "/" 
                      + currentdate.getFullYear() + " @ "  
                      + currentdate.getHours() + ":"  
                      + currentdate.getMinutes();

            var message = {
                  text: req.param('text'),
                  dateTime: dateTime,
                  id: '1',
                  user: model,
              };


            Item.getOne(itemId)
            .spread(function(model) {
                Item.message(model.id, {msg: message});
                console.log("does this even work");
            })
        .fail(function(err) {
          // An error occured
        });
      })
      .fail(function(err) {
      });
  



    },

    'join': function(req, res, next) {
      // Get the ID of the room to join
      var itemId = req.param('itemId');
      // Subscribe the requesting socket to the "message" context, 
      // so it'll get notified whenever Room.message() is called
      // for this room.
          console.log("///////////////////");
          console.log("itemId", itemId);

      Item.getOne(req.param('itemId'))
      .spread(function(model) {
          //Item.subscribe(req.socket, model);
          Item.subscribe(req.socket, model);

      })
      .fail(function(err) {
        // An error occured
      });
     // Continue processing the route, allowing the blueprint
      // to handle adding the user instance to the room's `users`
      // collection.
      return next();
    },
	
};

