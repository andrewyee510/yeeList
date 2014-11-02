angular.module( 'sailng.zipcodes', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'zipcodes', {
		url: '/zipcodes',
		views: {
			"main": {
				controller: 'ZipcodeCtrl',
				templateUrl: 'zipcodes/index.tpl.html'
			}
		},
		data:{ pageTitle: 'Location' }
	});
})

    //.controller( 'TodoCtrl', function TodoController( $scope, $sails, lodash, config,titleService, TodoModel,$filter, ngTableParams  ) {
//
//    //    titleService.setTitle('Messages');
//    $scope.newTodo = {};
//	$scope.todos = [];
//	$scope.currentUser = config.currentUser;

    .controller( 'ZipcodeCtrl', function ZipcodeController( $scope, $sails, lodash, config, titleService, ZipcodeModel ,$filter ) {
        console.log("zipcode ctrl");
        $scope.zipcodes = [];
        $scope.currentUser = config.currentUser;
 
        $sails.on('zipcode', function (envelope) {

            switch(envelope.verb) {
                case 'created':
                    break;
                case 'destroyed':
                    break;
                case 'updated': //
                    break;
            }
        });


        
        ZipcodeModel.getByCity($scope).then(function(models) {
            console.log(data);
            $scope.zipcodes = models.data;
            var data =$scope.zipcodes;
            console.log('data ',data)
            
        });
    


    });
