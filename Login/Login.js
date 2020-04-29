/// <reference path="C:\Users\rk23846\Documents\Visual Studio 2015\Projects\AngularJSApp\AngularJSApp\scripts/angular.min.js" />
/*Description -
Login.js, authorizes a valid user to access the other application features 
like Todo list, Profile and SignOut*/

//Login Controller
angular.module("Route").controller('loginCtrl', function ($scope, $location) {
    //Checks if the user is authenticated then it avoids redirecting him/her to Login Page
    (function () {
        if (sessionStorage.getItem('AuthenticationState') === "Authenticated") {
            $location.path("/Todo", "_self");
        }
    })();

    //Checks if the user is authenticated then it avoids redirecting him/her to Login Page
    if (sessionStorage.getItem('AuthenticationState') === "Authenticated") {
        $location.path('/Todo');
    }
    $scope.Data = {};

    //Check the user inputs
    $scope.check = function () {
        if ($scope.Data.email == undefined || $scope.Data.password == undefined) {
            $scope.error = "*Please fill all the details before submitting";
            return false;
        }
        //To execute javascript code in "strict mode".
        'use strict';
        //assigning form inputs to the variables
        var formUserName = $scope.Data.email
        var formUserPassword = $scope.Data.password;

        //Get data from local storage
        var userListDeserialized = JSON.parse(localStorage.getItem("userData"));

        //validate localstorage for null or undefined
        if (userListDeserialized == undefined || userListDeserialized == null) {
            if (window.confirm('You don\'t have a register account. Please click OK to SignUp')) {
                $location.path('/Register');
            }
        }

        //assigning localStorage values to variables
        var userName = userListDeserialized[0].email;
        var password = userListDeserialized[0].password;

        //Logic for authorizing the user
        if (validateUserName(formUserName) && validateFormPassword(formUserPassword)) {
            //Storing user information on successful login
            sessionStorage.setItem("AuthenticationState", "Authenticated");
            $location.path('/Todo');
        }
        else {
            document.getElementById("error").innerHTML = "*Invalid UserName or Password";
            document.getElementById("password").focus();
        }

        //validate userName
        function validateUserName(formUserName) {
            var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (formUserName.match(mailFormat) && formUserName.toUpperCase() == userName.toUpperCase()) {
                return true;
            }
            else {
                return false;
            }
        }
        //validate password
        function validateFormPassword(formUserPassword) {
            if (formUserPassword == password) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    $scope.clicked = function () {
        $location.path('/Register');
    }
})