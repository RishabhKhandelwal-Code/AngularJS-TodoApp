/*Description -
It allows user to update their information and
hence saves it to localStorage*/

angular.module("Route").controller("profileCtrl", function ($scope, $location) {
    //To execute javascript code in "strict mode".
    'use strict';

    //Checks if the user is authenticated
    (function () {
        if (sessionStorage.getItem('AuthenticationState') === null) {
            $location.path("/AccessDenied", "_self");
        }
    })();

    //To get data from local storage
    var userListDeserialized = JSON.parse(localStorage.getItem("userData"));
    //Note - userListDeserialized is been validated already in login.js
    $scope.Data = {};
    //Bind data to html
    (function () {
        var firstName = userListDeserialized[0].firstName;
        var lastName = userListDeserialized[0].lastName;
        var email = userListDeserialized[0].email;
        var address = userListDeserialized[0].address;
        var password = userListDeserialized[0].password;
        $scope.Data.firstName = firstName;
        $scope.Data.lastName = lastName;
        $scope.Data.email = email;
        $scope.Data.address = address;
        $scope.Data.password = password;
    })();

    //To update form data
    $scope.formUpdation = function () {
        (function () {
            //Update it to local storage
            userListDeserialized[0].firstName = $scope.Data.firstName;
            userListDeserialized[0].lastName = $scope.Data.lastName;
            userListDeserialized[0].email = $scope.Data.email;
            userListDeserialized[0].address = $scope.Data.address;
            userListDeserialized[0].password = $scope.Data.password;

            var userListSerialized = JSON.stringify(userListDeserialized);
            localStorage.setItem("userData", userListSerialized);
            alert("Data updated successfuly");
        })();
    }
});