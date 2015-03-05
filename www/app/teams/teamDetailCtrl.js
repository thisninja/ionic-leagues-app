(function () {
    'use strict';

    angular.module('eliteApp').controller('TeamDetailCtrl', ['$scope', '$stateParams', 'eliteApi', 'myTeamsService', function($scope, $stateParams, eliteApi, myTeamsService) {
    	console.log($stateParams);
        $scope.teamId = Number($stateParams.id);
        console.log('teamId: ', $scope.teamId);
        eliteApi.getLeaguesData().then(function(data) {


        console.log('data.teams: ', data.teams);
        $scope.team = _.chain(data.teams)
        	.flatten("divisionTeams")
        		.find({"id": $scope.teamId})
        			.value();
        console.log('team: ', $scope.team);
        
		$scope.teamName = $scope.team.name;
		$scope.games = _.chain(data.games)
			.filter(isTeamInGame)
				.map(function(item) {
					var isTeam1 = (item.team1Id === $scope.teamId)? true: false;
					var opponentName = isTeam1 ? item.team2: item.team1;
					var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);
					return {
						gameId: item.id,
						opponent: opponentName,
						time: item.time,
						location: item.location,
						locationUrl: item.locationUrl,
						scoreDisplay: scoreDisplay,
						homeAway: (isTeam1 ? 'vs. ': 'at')
					};
				})
					.value();
		$scope.teamStanding = _.chain(data.standings)
			.flatten("divisionStandings")
				.find({"teamId": $scope.teamId})
					.value(); 
		});
		$scope.following = myTeamsService.isFollowedTeam($scope.teamId.toString());
		console.log('games: ', $scope.games);
		function isTeamInGame(item) {
			return item.team1Id === $scope.teamId || item.team2Id === $scope.teamId;
		};
		function getScoreDisplay(isTeam1, team1Score, team2Score) {
			if (team1Score && team2Score) {
				var teamScore = (isTeam1 ? team1Score: team2Score);
				var opponentScore = (isTeam1 ? team2Score: team1Score);
				var winIndicator = teamScore > opponentScore? 'W: ': 'L: ';
				return winIndicator + teamScore + '-' + opponentScore;
			} else {
				return "";
			}
		};
        
        console.log("$stateParams", $stateParams);

    }]);
})();