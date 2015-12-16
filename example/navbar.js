angular
.module('ng-bs-navbar-example', ['ngRoute','ng-bs-navbar'])
.config(['$routeProvider','navbarProvider', function($routeProvider, navbarProvider) {
  $routeProvider
  .when('/page-one', {
    template: 'Page One',
    controller: 'PageOneController'
  })
  .when('/page-two', {
    template: 'Page Two',
    controller: 'PagTwoController'
  })
  .when('/page/two/sub', {
    template: 'Page Two Sub Item',
    controller: 'PageTwoSubController'
  })
  .otherwise({
    redirectTo: '/page-one'
  });

  navbarProvider.title = {
    path: "/page-one",
    name: "Navbar Example!"
  }

  navbarProvider.routes = [{
    materialIcon: "code",
    path: "/page-one",
    name: "Page One"
  },{
    materialIcon: "code",
    path: "/page-two",
    name: "Page Two",
    sub: [{
      materialIcon: "code",
      path: "/page/two/sub",
      name: "Two Sub"
    }]
  }];
}]);

angular.module('ng-bs-navbar-example').controller('PageOneController', function(){ });
angular.module('ng-bs-navbar-example').controller('PageTwoController', function(){ });
angular.module('ng-bs-navbar-example').controller('PageTwoSubController', function(){ });

angular.module('ng-bs-navbar-example').controller('ExampleController', function( $scope, navbar ){
  $scope.position = navbar.position;
  $scope.$watch('position', function(v) {
    navbar.position = v;
  });

  $scope.size = navbar.size;
  $scope.$watch('size', function(v) {
    navbar.size = v;
  });

});
