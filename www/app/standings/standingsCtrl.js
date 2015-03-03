(function () {
    'use strict';
    angular.module('eliteApp').controller('StandingsCtrl', ['eliteApi', '$scope', function(eliteApi, $scope){
        $scope.data = eliteApi.getLeaguesData();
        $scope.standings = $scope.data.standings;
    }])
})();