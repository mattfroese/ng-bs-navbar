# ng-bs-navbar

An angular directive and provider for a bootstrap navbar. Also includes a trendy sidebar!


## Usage

### js
Navbar works in conjunction with a provider to setup the routes and title (brand). You can also pass in a `materialIcon` to display beside the nav item (so long as you include the material icon library).

```javascript
angular
.module('app', ['ng-bs-sidenav'])
config(['navbarProvider', function(navbarProvider) {
  navbarProvider.title = {
    path: "/page-one",
    name: "Navbar Example!"
  }
  navbarProvider.routes = [{
    // materialIcon: "code", // uncomment for material icons
    path: "/page-one",
    name: "Page One"
  },{
    // materialIcon: "code",
    path: "/page-two",
    name: "Page Two",
    sub: [{
      // materialIcon: "code",
      path: "/page/two/sub",
      name: "Two Sub"
    }]
  }];
});
```

### html
Include the js, css and optional theme

```html
<script type="text/javascript" src="bower_components/ng-bs-navbar/dist/ng-bs-navbar.js"></script>
<link rel="stylesheet" href="bower_components/ng-bs-navbar/dist/ng-bs-navbar.css" type="text/css" />
<link rel="stylesheet" href="bower_components/ng-bs-navbar/dist/ng-bs-navbar-theme-dark.css" type="text/css" />
<!-- Enable Material Icons
ALl icons available here: https://design.google.com/icons/
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
-->
```

Then add navbar to your page.
```html
  <navbar position="left"></navbar>
```
