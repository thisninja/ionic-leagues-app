(function () {
    'use strict';
    angular.module('eliteApp').controller('TeamsCtrl', ['eliteApi', '$scope', function(eliteApi, $scope){
        eliteApi.getLeaguesData().then(function(data) {
        	$scope.teams = data.teams;
        });
        
    }])
})(); 