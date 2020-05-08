/*Description -
It validates and adds the user information to localStorage */

//Registration Controller
angular.module("TodoApp").controller('registrationCtrl', function ($scope, $location) {
    //Checks if the user is authenticated then it avoids redirecting him/her to Registration Page
    (function () {
        if (sessionStorage.getItem('AuthenticationState') === "Authenticated") {
            $location.path("/Todo", "_self");
        }
    })();
    $scope.Data = {};
    //Gets all the input data
    $scope.fetchData = function () {
        var firstName = $scope.Data.firstName;
        var lastName = $scope.Data.lastName;
        var email = $scope.Data.email;
        var tPassword = $scope.Data.password;
        var cPassword = $scope.Data.cpassword;
        var address = $scope.Data.address;
        var gender = $scope.Data.gender;

        if (firstName == undefined || lastName == undefined || email == undefined || tPassword == undefined || cPassword == undefined
            || address == undefined || gender == undefined) {
            $scope.error = "*Please fill all details before submitting";
            return false;
        }

        //validation
        if (validateFirstName(firstName) && validateLastName(lastName) && validateEmail(email) && validatePassword(tPassword) &&
            validatecPassword(cPassword, tPassword) && validateAddress(address) && validateGender(gender)) {
            //To store all the user inputs
            var userList = {};

            //Add data to userList
            userList = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: cPassword,
                address: address,
                gender: gender,
                todolist: []
            };

            //storing data to local storage
            var userListSerialized = JSON.stringify(userList);
            localStorage.setItem("userData", userListSerialized);
            $location.path('/Login');
        }
        //validate firstName
        function validateFirstName(firstName) {
            var letters = /^[A-Za-z]+$/;
            if (firstName.match(letters)) {
                return true;
            }
            else {
                $scope.error = "*FirstName must have alphabet characters only";
                document.getElementById("firstName").focus();
                return false;
            }
        }

        //validate LastName
        function validateLastName(lastName) {
            var letters = /^[A-Za-z]+$/;
            if (lastName.match(letters)) {
                return true;
            }
            else {
                $scope.error = "*LastName must have alphabet characters only";
                document.getElementById("lastName").focus();
                return false;
            }
        }

        //validate Email
        function validateEmail(email) {
            var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email.match(mailFormat)) {
                return true;
            }
            else {
                $scope.error = "*Please enter a valid email Id";
                document.getElementById("email").focus();
                return false;
            }
        }

        //validate Password
        function validatePassword(tPassword) {
            var length = tPassword.length;
            if (length == 0 || length < 8) {
                $scope.error = "*Password should not be empty and must be greater than 8";
                document.getElementById("password").focus();
                return false;
            }
            return true;
        }

        //validate confirmed Password
        function validatecPassword(cPassword, tPassword) {
            var length = cPassword.length;
            if (length == 0 || length < 8 || tPassword != cPassword) {
                $scope.error = "*Confirmed password is not matching with your password";
                document.getElementById("cPassword").focus();
                return false;
            }
            return true;
        }

        //validate address
        function validateAddress(address) {
            var letters = /^[0-9a-zA-Z]+$/;
            if (address.match(letters)) {
                return true;
            }
            else {
                $scope.error = "*User address must have alphanumeric characters only";
                document.getElementById("address").focus();
                return false;
            }
        }

        //validate Gender
        function validateGender(gender) {
            if (gender.toUpperCase() == "MALE") {
                return true;
            }
            else if (gender.toUpperCase() == "FEMALE") {
                return true;
            }
            else {
                $scope.error = "*Value can only be Male or Female";
                document.getElementById("gender").focus();
                return false;
            }
        }
    }
    $scope.clicked = function () {
        $location.path('/Login');
    }
});