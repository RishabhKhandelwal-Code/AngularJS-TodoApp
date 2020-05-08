/// <reference path="angular.min.js" />

angular.module("TodoApp", ["ngRoute"])
.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/Register", {
            templateUrl: "Registration/Registration.html",
            controller: "registrationCtrl",
            css: "Registration/Registration.css"
        })
        .when("/Login", {
            templateUrl: "Login/Login.html",
            controller: "loginCtrl",
            css: 'Login/Login.css'
        })
        .when("/Profile", {
            templateUrl: "Profile/Profile.html",
            controller: "profileCtrl",
            css: "Profile/Profile.css"
        })
        .when("/Todo", {
            templateUrl: "Todo/Todo.html",
            controller: "todoCtrl",
            css: "Todo/Todo.css"
        })
        .when("/TodoCreate", {
            templateUrl: "Todo/TodoCreate.html",
            controller: "todoCreate",
            css: "Todo/TodoCreate.css"
        })
        .when("/TodoEdit", {
            templateUrl: "Todo/TodoEdit.html",
            controller: "todoEdit",
            css: "Todo/TodoCreate.css"
        })
        .when("/AccessDenied", {
            templateUrl: "AccessDenied/AccessDenied.html",
            controller: "accessDeniedCtrl",
            css: "AccessDenied/AccessDenied.css"
        })
        .otherwise(
        {
            redirectTo: "/Login"
        })
    $locationProvider.html5Mode(false);
})
.directive('head', ['$rootScope', '$compile',
    function ($rootScope, $compile) {
        return {
            restrict: 'E',
            link: function (scope, elem) {
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if (current && current.$$route && current.$$route.css) {
                        if (!angular.isArray(current.$$route.css)) {
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function (sheet) {
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if (next && next.$$route && next.$$route.css) {
                        if (!angular.isArray(next.$$route.css)) {
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function (sheet) {
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);
