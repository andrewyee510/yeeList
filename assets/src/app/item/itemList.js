angular.module( 'sailng.itemLists', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'itemLists', {
		url: '/itemLists',
        views: {
            "main": {
                controller: 'ItemListCtrl',
                templateUrl: 'item/itemList.tpl.html'
            }
        },
        data:{ pageTitle: 'ItemList' }
	});
})
        

    .controller( 'ItemListCtrl', function ItemListController( $scope, $sails, lodash, config, titleService, ItemModel ,$filter ) {
        console.log("itemlist ctrl");
        $scope.items = [];
        
        console.log('socket io item');
        $sails.on('item', function (envelope) {

            switch(envelope.verb) {
                case 'created':
                    break;
                case 'destroyed':
                    break;
                case 'updated': //
                    break;
            }
        });
    


        ItemModel.getAll($scope).then(function(models) {
            console.log(data);
            $scope.items = models.data;
            var data =$scope.items;
            console.log('data ',data)
            
        });
    


    });
