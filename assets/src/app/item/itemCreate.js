angular.module( 'sailng.itemCreate', [
])

.controller( 'ItemCreateCtrl', function ItemCreateController( $scope, $state, config ) {
    $scope.newItem = {};
    $scope.uploadItem = function (newItem) {

        ItemModel.create(newItem).then(function (model) {
            console.log("aaa");

        });
        $scope.newMessage.title = '';
    };

    $scope.createItem = function (newMessage) {
            newMessage.user = config.currentUser.id;
            newMessage.status = 1;
            console.log('createMessage:: ', newMessage.cdate, newMessage)
            MessageModel.create(newMessage).then(function (model) {
                $scope.newMessage.title = '';
                console.log("aaa");

            });
            $scope.newMessage.title = '';
        };
});