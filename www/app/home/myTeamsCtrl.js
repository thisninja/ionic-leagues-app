(function () {
    'use strict';
    angular.module('eliteApp').controller('MyTeamsCtrl', ['myTeamsService', 'eliteApi', '$scope', '$state', function(myTeamsService, eliteApi, $scope, $state){
    	$scope.myTeams = myTeamsService.getFollowedTeams();
    	$scope.goToTeam = function(team) {
    		eliteApi.setLeagueId(team.leagueId);
    		$state.go('app.team-detail', {id: team.id})
    	};
    }])
})(); 