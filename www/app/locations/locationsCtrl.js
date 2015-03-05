(function () {
    'use strict';
    angular.module('eliteApp').controller('LocationsCtrl', ['eliteApi', '$scope', function(eliteApi, $scope){
        eliteApi.getLeaguesData().then(function(data) {
        	$scope.locations = data.locations;	
        });
    }])
})();