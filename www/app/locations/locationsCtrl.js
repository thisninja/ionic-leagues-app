(function () {
    'use strict';
    angular.module('eliteApp').controller('LocationsCtrl', ['eliteApi', '$scope', function(eliteApi, $scope){
        $scope.data = eliteApi.getLeaguesData();
        $scope.locations = $scope.data.locations;
    }])
})();