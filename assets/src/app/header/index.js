angular.module( 'sailng.header', [
])

.controller( 'HeaderCtrl', function HeaderController( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;

    var navItems = [];

    if (!$scope.currentUser) {
        navItems.push({title: 'Register', translationKey: 'navigation:register', url: '/register', cssClass: 'fa fa-briefcase'});
        navItems.push({title: 'Login', translationKey: 'navigation:login', url: '/login', cssClass: 'fa fa-comments'});
    }else{
        navItems.push({title: 'My Items', translationKey: 'navigation:messages', url: '/item/mylist', cssClass: 'fa fa-comments'});
        navItems.push({title: 'Create Item', translationKey: 'navigation:todos', url: '/item/create', cssClass: 'fa fa-comments'});
    }

    $scope.navItems = navItems;
});