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
        $scope.items = [];    

        $scope.matchAmount = function(item){
            $scope.min = ($scope.min == "" || $scope.min == null) ? undefined : $scope.min; 
            $scope.max = ($scope.max == "" || $scope.max == null) ? undefined : $scope.max; 
            
            if(typeof $scope.min != "undefined" && typeof $scope.max == "undefined"){
                return item.price >= $scope.min;
            }else if(typeof $scope.min == "undefined" && typeof $scope.max != "undefined"){
                return item.price <= $scope.max;
            }else if(typeof $scope.min != "undefined"  && typeof $scope.max != "undefined"){
                return item.price >= $scope.min && item.price <= $scope.max
            }
            return true;
        }

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
