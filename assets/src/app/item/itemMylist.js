angular.module( 'sailng.itemMylist', [
])


    .controller( 'ItemMylistCtrl', function ItemMylistController( $scope, $sails, lodash, config, titleService, ItemModel ,$filter ) {
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

        console.log(config.currentUser);
        ItemModel.getMylist(config.currentUser.id).then(function(models) {
            $scope.items = models.data;
            var data =$scope.items;
            console.log('data ',data)            
        });
    


    });
