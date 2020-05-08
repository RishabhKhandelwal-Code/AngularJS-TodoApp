/// <reference path="C:\Users\rk23846\documents\visual studio 2015\Projects\AngularJSApp\AngularJSApp\scripts/angular.min.js" />
//Description: It allows user to add a new Todo item in the list 

angular.module("TodoApp").controller('todoCreate', function ($scope, $location) {
    //Checks if the user is authenticated
    (function () {
        if (sessionStorage.getItem('AuthenticationState') === null) {
            $location.path("/AccessDenied", "_self");
        }
    })();

    $scope.createList = function () {
        var listObj = {
            date: $scope.date,
            title: $scope.title,
            comment: $scope.comment,
            categories: $scope.categories
        };

        var userDetails = JSON.parse(localStorage.getItem("userData"));
        userDetails.todolist.push(listObj);
        localStorage.setItem("userData", JSON.stringify(userDetails));
        $location.path("/Todo");
    };

    $scope.editMode = false;
    $scope.date = '';
    $scope.title = '';
    $scope.comment = '';
    $scope.categories = '';
});