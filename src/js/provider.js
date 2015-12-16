angular
  .module('ng-bs-sidenav')
  .provider('navbar', function() {
    this.$get = function() { return {
      routes: this.routes,
      title:this.title,
      size: this.size,
      position: this.position}; };
    this.routes = [];
    this.title = {};
    this.size = "full";
    this.position = "left";
  })
