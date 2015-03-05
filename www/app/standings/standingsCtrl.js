(function () {
    'use strict';
    angular.module('eliteApp').controller('StandingsCtrl', ['eliteApi', '$scope', function(eliteApi, $scope){
        eliteApi.getLeaguesData().then(function(data) {
        	$scope.standings = data.standings;
        });
        
    }])
})(); 