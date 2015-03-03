(function () {
    'use strict';
    angular.module('eliteApp').controller('GameCtrl', ['$stateParams', 'eliteApi', '$scope', function($stateParams, eliteApi, $scope){
        $scope.gameId = Number($stateParams.id);
        $scope.data = eliteApi.getLeaguesData();
        $scope.game = _.find($scope.data.games, {"id": $scope.gameId});
    }])
})(); 