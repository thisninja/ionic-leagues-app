(function () {
    'use strict';
    angular.module('eliteApp').controller('LeaguesCtrl', ['eliteApi', '$scope', '$http', '$state', function(eliteApi, $scope, $http, $state){
        //$scope.leaguesData = eliteApi.getLeaguesData();
        eliteApi.getLeagues().then(function(data) {
            $scope.leagues = data;
        });
        $scope.selectLeague = function(leagueId) {
            eliteApi.setLeagueId(leagueId);
            $state.go('app.teams');
        };
        console.log($scope.leagues, $scope.leaguesData);
    }])
})(); 