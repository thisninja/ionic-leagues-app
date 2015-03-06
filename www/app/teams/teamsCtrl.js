(function () {
    'use strict';
    angular.module('eliteApp').controller('TeamsCtrl', ['eliteApi', '$scope', function(eliteApi, $scope){
    	$scope.loadList = function(forceRefresh) {
	        eliteApi.getLeaguesData(forceRefresh).then(function(data) {
        			$scope.teams = data.teams;
        	}).finally(function() {
        		$scope.$broadcast('scroll.refreshComplete');
        	})
    	};
    	$scope.loadList(false);
    }])
})(); 