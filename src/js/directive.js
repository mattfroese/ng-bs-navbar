angular
  .module('ng-bs-sidenav')
  .directive('navbar', ['$parse', '$window', 'navbar', function($parse, $window, navbar) {
    return {
      restrict: 'AE',
      replace: true,
      transclude: false,
      scope: {
          title: '@',
          size: '@',
          position: '@'
      },
      controller: ['$scope', '$location', '$route', function ($scope, $location, $route) {
        $scope.navClass = function ( page, parent ) {
          var active = page.path != "" && $location.path().slice(0, page.path.length) == page.path;
          var c = active ? 'active' : '';
          c += page.sub != undefined && page.sub.length > 0 ? ' dropdown' : '';
          c += page.subOpen ? ' open' : '';
          c += page.subIsActive ? ' active-sub' : '';

          if( parent && active ) {
            // open parent menu if sub is active
            if( !$scope.isCondensed && !parent.subOpen && parent.subOpen == undefined) {
              parent.subOpen = true;
            }
            parent.subIsActive = true;
          } else if( parent ) {
            parent.subIsActive = false;
          }
          return c;
        };
        $scope.navigate = function( route ) {
          if( route.sub ) {
            route.subOpen = !route.subOpen;
            return;
          } else {
            $scope.navCollapsed = true;
            $location.path( route.path );
          }

          angular.forEach($scope.routes, function (value, key) {
            // Collapse any open subs
            if( $scope.isCondensed ) {
              if( value.subOpen ) {
                value.subOpen = false;
              }
            }
            value.subIsActive = false;
          });
        }

        $scope.navbar = navbar;
        $scope.isCollapsed = true;

        angular.forEach($route.routes, function (value, key) {
            if (value.navitem) {
                var routeitem = {};
                routeitem.path = value.originalPath;
                routeitem.name = value.name;
                routeitem.templateUrl = value.templateUrl;
                routeitem.controller = value.controller;
                $scope.routes.push(routeitem);
            }
        });

      }],
      template:
        '<nav ng-class="{\'navbar-fixed-left\': navbar.position == \'left\', \'navbar-condensed\': navbar.size == \'condensed\', \'navbar-fixed-top\': navbar.position==\'top\'}" class="navbar ng-bs-sidenav" role="navigation">' +
          '<div class="navbar-header">' +
              '<button type="button" class="navbar-toggle" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" ng-class="{\'active\' : !navCollapsed}">' +
                  '<span class="sr-only">Toggle navigation</span>' +
                  '<span class="icon-bar"></span>' +
                  '<span class="icon-bar"></span>' +
                  '<span class="icon-bar"></span>' +
              '</button>' +
              '<a id="Ludicbrand" class="navbar-brand" href="#{{navbar.title.path}}">' +
                '<div class="icon" ng-show="navbar.title.svg" ng-include="navbar.title.svg"></div>' +
                '<i ng-show="navbar.title.materialIcon" class="icon material-icons">{{navbar.title.materialIcon}}</i>' +
                '<span class="title">{{navbar.title.name}}</span>' +
              '</a>' +
          '</div>' +
          '<div class="collapse navbar-collapse" ng-class="!navCollapsed && \'in\'">' +
            '<ul class="nav navbar-nav">' +
                '<li ng-repeat="route in navbar.routes" data-ng-class="navClass(route)">' +
                    '<a ng-click="navigate(route)" ng-class="{\'dropdown-toggle\': route.sub }">' +
                      '<i ng-show="route.materialIcon" class="icon material-icons">{{route.materialIcon}}</i>' +
                      '<span class="title">{{route.name}}</span>' +
                      '<span ng-show="route.sub" class="caret"><span>' +
                    '</a>' +
                    '<ul class="dropdown-menu" ng-show="route.sub">' +
                      '<li ng-repeat="subroute in route.sub" data-ng-class="navClass(subroute,route)">' +
                        '<a ng-click="navigate(subroute)">' +
                          '<i ng-show="subroute.materialIcon" class="icon material-icons">{{subroute.materialIcon}}</i>' +
                          '<span class="title">{{subroute.name}}</span>' +
                        '</a>' +
                      '</li>' +
                    '</ul>' +
                '</li>' +
            '</ul>' +
          '</div>' +
        '</nav>'
    };
}]);
