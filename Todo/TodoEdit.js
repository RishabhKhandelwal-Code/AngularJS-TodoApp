/// <reference path="C:\Users\rk23846\Documents\Visual Studio 2015\Projects\ToDo\ToDo\scripts/angular.min.js" />

//Description:It allows the user to edit the selected todo item

angular.module("TodoApp").controller('todoEdit', function ($scope, $location) {
    //Checks if the user is authenticated
    (function () {
        if (sessionStorage.getItem('AuthenticationState') === null) {
            $location.path("/AccessDenied", "_self");
        }
    })();

    //Gets the index
    var index = sessionStorage.getItem('key');

    //Get data from local storage
    var data = JSON.parse(localStorage.getItem("userData"));

    if (data.todolist != null || data.todolist != undefined) {
        if (index >= 0) {
            $scope.formData = data.todolist;

            $scope.date = new Date($scope.formData[index].date);
            $scope.title = $scope.formData[index].title;
            $scope.comment = $scope.formData[index].comment;
            $scope.categories = $scope.formData[index].categories;
            $scope.selectedCategory = $scope.formData[index].categories;
        }
    }

    $scope.createList = function () {
        data.todolist[index].date = $scope.date;
        data.todolist[index].title = $scope.title;
        data.todolist[index].comment = $scope.comment;
        data.todolist[index].categories = $scope.categories
        localStorage.setItem("userData", JSON.stringify(data));
        $location.path("/Todo");
    }
});