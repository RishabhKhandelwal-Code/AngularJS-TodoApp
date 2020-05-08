/*Description -
It allows user to update their information and
hence saves it to localStorage*/

angular.module("TodoApp").controller("profileCtrl", function ($scope, $location, profileService) {
    //To execute javascript code in "strict mode".
    'use strict';

    //Checks if the user is authenticated
    (function () {
        if (sessionStorage.getItem('AuthenticationState') === null) {
            $location.path("/AccessDenied", "_self");
        }
    })();

    //To get data from local storage
    //var userListDeserialized = JSON.parse(localStorage.getItem("userData"));
    var userListDeserialized = profileService.profileData();
    //Note - userListDeserialized is been validated already in login.js
    $scope.Data = {};
    //Bind data to html
    (function () {
        var firstName = userListDeserialized.firstName;
        var lastName = userListDeserialized.lastName;
        var email = userListDeserialized.email;
        var address = userListDeserialized.address;
        var password = userListDeserialized.password;
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
            userListDeserialized.firstName = $scope.Data.firstName;
            userListDeserialized.lastName = $scope.Data.lastName;
            userListDeserialized.email = $scope.Data.email;
            userListDeserialized.address = $scope.Data.address;
            userListDeserialized.password = $scope.Data.password;

            var userListSerialized = JSON.stringify(userListDeserialized);
            localStorage.setItem("userData", userListSerialized);
            alert("Data updated successfuly");
        })();
    }
});