angular.module('models.item', ['lodash', 'services', 'ngSails',])

.service('ItemModel', function($q, lodash, utils, $sails) {

	this.uploadItem = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('item/upload');
		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});
		return deferred.promise;
	};

	this.getAll = function() {
        var deferred = $q.defer();
        var url = utils.prepareUrl('item/getAll');
        $sails.get(url, function(models) {
            return deferred.resolve(models);
        });
        return deferred.promise;
    };

    this.getMylist = function(userId) {
        var deferred = $q.defer();
        console.log(userId);
        var url = utils.prepareUrl('item/getMylist/'+ userId);
        console.log(url);
        $sails.get(url, function(models) {
            return deferred.resolve(models);
        });
        return deferred.promise;
    };

    this.sendMessage = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('item/sendMessage');
		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});
		return deferred.promise;
	};

	this.join = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('item/join/users');
		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});
		return deferred.promise;
	};

});