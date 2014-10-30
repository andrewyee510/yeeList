angular.module( 'sailng.itemDetails', [
])        

    .controller( 'ItemDetailCtrl', function ItemDetailController( $scope, $sails, lodash, config, titleService, ItemModel , $filter ) {
        console.log("itemDetail ctrl");
        $scope.item = [];
        $scope.itemId = itemId      //global var set int detail.ejs
        $scope.newMessage = {};
        $scope.messages = [];
        $scope.currentUser = config.currentUser;


        $sails.on('item', function (envelope) {

            console.log("envelope", envelope);
            $scope.messages.unshift(envelope.data);
            /*
            switch(envelope.verb) {
                case 'created':
                    console.log("created");
                    $scope.messages.unshift(envelope.data);
                break;
                    break;
                case 'destroyed':
                    break;
                case 'updated': //
                    break;
            }
            */
        });

        $scope.sendMessage = function (newMessage) {
            newMessage.user = config.currentUser.id;
            newMessage.itemId = $scope.itemId;
            console.log("message itemId", newMessage.itemId);
            console.log('createMessage:: ', newMessage.cdate, newMessage)
            ItemModel.sendMessage(newMessage).then(function (model) {
                $scope.newMessage.text = '';

            });
            $scope.newMessage.text = '';
        };
    
        ItemModel.join({itemId:$scope.itemId}).then(function(models) {
            //$scope.messages = models;
            console.log(models);
        });

    });
