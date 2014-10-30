angular.module('models.room', ['lodash', 'services', 'ngSails',])

.service('RoomModel', function($q, lodash, utils, $sails) {

	this.join = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('room/join');
		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});
		return deferred.promise;
	};

});