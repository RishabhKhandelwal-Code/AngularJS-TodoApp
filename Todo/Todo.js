/// <reference path="C:\Users\rk23846\Documents\Visual Studio 2015\Projects\AngularJSApp\AngularJSApp\scripts/angular.min.js" />
/*Description -
It allows user to do all CRUD operations along with sorting and filtering of data*/

angular.module("TodoApp")
    .controller('todoCtrl', function ($rootScope, $scope, $location) {

        //Checks if the user is authenticated
        (function () {
            if (sessionStorage.getItem('AuthenticationState') === null) {
                $location.path("/AccessDenied", "_self");
            }
        })();

        //Get data from local storage
        var data = JSON.parse(localStorage.getItem("userData"));

        if (data.todolist != null || data.todolist != undefined) {
            $scope.formData = data.todolist;
            //Sorting logic
            $scope.sortColumn = $scope.formData.date;
            $scope.reverseSort = false;

            //Sort data function
            $scope.sortData = function (column) {
                $scope.reverseSort = ($scope.sortColumn == column) ?
                    !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }

            //gets the sort class
            $scope.getSortClass = function (column) {

                if ($scope.sortColumn == column) {
                    return $scope.reverseSort
                      ? 'arrow-down'
                      : 'arrow-up';
                }
                return '';
            }

            //To delete Todo list data
            $scope.deleteData = function (index) {
                if (confirm("Do you wish to delete the data?")) {
                    $scope.formData.splice(index, 1);
                    localStorage.setItem("userData", JSON.stringify(data));
                }
            }
        }

        //Gets the user to his profile page
        $scope.goToProfile = function () {
            $location.path('/Profile');
        }

        //To do log out
        $scope.logOut = function () {
            sessionStorage.clear();
            $location.path('/Login');
        }

        //Move the user to create page
        $scope.create = function () {
            $location.path("/TodoCreate");
        }

        //Edits the current todo item
        $scope.editData = function (index) {
            sessionStorage.setItem("key", index);
            $location.path("/TodoEdit");
        }
    });