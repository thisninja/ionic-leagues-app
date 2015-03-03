(function () {
    'use strict';
    angular.module('eliteApp').controller('TeamsCtrl', ['eliteApi', '$scope', function(eliteApi, $scope){
        $scope.data = eliteApi.getLeaguesData();
        $scope.teams = $scope.data.teams;
    }])
})();