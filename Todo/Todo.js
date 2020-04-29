/// <reference path="C:\Users\rk23846\Documents\Visual Studio 2015\Projects\AngularJSApp\AngularJSApp\scripts/angular.min.js" />
/*Description -
It allows user to do all CRUD operations along with sorting and filtering of data*/

angular.module("Route")
    .controller('todoCtrl', function ($scope, $location) {
        //Checks if the user is authenticated
        (function () {
            if (sessionStorage.getItem('AuthenticationState') === null) {
                $location.path("/AccessDenied", "_self");
            }
        })();
        //formData holds all the user inputs
        $scope.formData = [];
        $scope.createList = function (index) {
            if (index >= 0) {
                //For edit
                $scope.formData[index].date = $scope.date;
                $scope.formData[index].title = $scope.title;
                $scope.formData[index].comment = $scope.comment;
                $scope.formData[index].categories = $scope.categories;
            }
            else {
                //for newly added data
                $scope.formData.push({
                    date: $scope.date,
                    title: $scope.title,
                    comment: $scope.comment,
                    categories: $scope.categories
                });
            }
            //Reset the form
            $scope.editMode = false;
            $scope.date = '';
            $scope.title = '';
            $scope.comment = '';
            $scope.categories = '';

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

            //To edit Todo list data
            $scope.editData = function (index) {
                $scope.editMode = true;
                $scope.editIndex = index;
                $scope.date = $scope.formData[index].date;
                $scope.title = $scope.formData[index].title;
                $scope.comment = $scope.formData[index].comment;
                $scope.categories = $scope.formData[index].categories;
            }

            //To delete Todo list data
            $scope.deleteData = function (index) {
                $scope.formData.splice(index, 1)
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
    });