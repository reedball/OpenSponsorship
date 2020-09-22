angular.module('formApp', ['ngAnimate', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController'
        })
        
        .state('form.profile', {
            url: '/profile',
            templateUrl: 'form-profile.html'
        })
        .state('form.personal', {
            url: '/personal',
            templateUrl: 'form-personal.html'
        })
        .state('form.interests', {
            url: '/interests',
            templateUrl: 'form-interests.html'
        })
        
        .state('form.submit', {
            url: '/submit',
            templateUrl: 'submit.html'
        });
    $urlRouterProvider.otherwise('/form/profile');
})

.controller('formController', function($scope, $http) {
    $scope.formData = {};
    $scope.status = false;
    $scope.datastatus = true;
    $scope.processForm = function(formData) {

        if(Object.keys(formData).length == 0) {
            $scope.datastatus = false;
            $scope.status = false;
           return;
        } else {
            $http.post("http://localhost:8080/user", formData).success((data, status) => {
                if( status == "200") {
                    $scope.status = true;
                }
                console.log($scope.status);
            })
        }
        
    };

});

