/// <reference path="../scripts/angular.min.js" />

//ProfileService, fetches data from the localStorage
angular.module("TodoApp").factory("profileService", function()
{
    return {
        profileData: function()
        {
            return JSON.parse(localStorage.getItem("userData"));
        }
    }
})
