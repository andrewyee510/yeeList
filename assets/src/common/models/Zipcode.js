angular.module('models.zipcode', ['lodash', 'services', 'ngSails',])

    .service('ZipcodeModel', function($q, lodash, utils, $sails) {
        this.getByCity = function() {
            var deferred = $q.defer();
            var url = utils.prepareUrl('zipcode');
            url = "http://localhost:1337/api/zipcode/";
            $sails.get(url, function(models) {
                return deferred.resolve(models);
            });
            return deferred.promise;
        };

        

    });
////'use strict';
//
//angular.module('models.todo', ['lodash', 'services', 'ngSails'])
//
//    .service('TodoModel', function($q, lodash, utils, $sails) {
//        this.getAll = function() {
//            var deferred = $q.defer();
//            var url = utils.prepareUrl('todo');
//
//            $sails.get(url, function(models) 
//                return deferred.resolve(models);
//            });
//
//            return deferred.promise;
//        };
//
//        this.create = function(newModel) {
//            console.log('mode ',newModel)
//            var deferred = $q.defer();
//            var url = utils.prepareUrl('todo');
//
//
//            $sails.post(url, newModel, function(model) {
//                return deferred.resolve(model);
//            });
//
//            return deferred.promise;
//        };
//
//        this.delete = function(model) {
//            console.log('indel')
//            var deferred = $q.defer();
//            var url = utils.prepareUrl('todo/' + model.id);
//
//            $sails.delete(url, function(model) {
//                return deferred.resolve(model);
//            });
//
//            return deferred.promise;
//        };
//    });
