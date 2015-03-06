(function () {
    'use strict';
    angular.module('eliteApp').controller('RulesCtrl', ['eliteApi', '$scope', function(eliteApi, $scope){
        
        eliteApi.getLeaguesData().then(function(data) {
            console.log('data league: ', data);
            $scope.mainContent = data.league.rulesScreen;
        });
    }])
})(); 