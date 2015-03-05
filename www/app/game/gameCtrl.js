(function () {
    'use strict';
    angular.module('eliteApp').controller('GameCtrl', ['$stateParams', 'eliteApi', '$scope', function($stateParams, eliteApi, $scope){
        $scope.gameId = Number($stateParams.id);
        eliteApi.getLeaguesData().then(function(data) {
        	$scope.game = _.find(data.games, {"id": $scope.gameId});
        });
    }])
})(); 