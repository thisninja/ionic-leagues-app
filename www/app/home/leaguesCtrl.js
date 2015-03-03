(function () {
    'use strict';
    angular.module('eliteApp').controller('LeaguesCtrl', ['eliteApi', '$scope', '$http', '$state', function(eliteApi, $scope, $http, $state){
        $scope.leaguesData = eliteApi.getLeaguesData();
        $scope.leagues = eliteApi.getLeagues();
        $scope.selectLeague = function(leagueId) {
            $state.go('app.teams');
        };
        console.log($scope.leagues, $scope.leaguesData);
    }])
})();