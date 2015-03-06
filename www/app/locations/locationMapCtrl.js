(function () {
    'use strict';
    angular.module('eliteApp').controller('LocationMapCtrl', ['$scope', 'eliteApi', '$stateParams', function($scope, eliteApi, $stateParams){
        $scope.locationId = Number($stateParams.id);
        $scope.map = {
            center: {
                latitude: 38.897677,
                longitude: -77.036530,
            },
            zoom: 12
        };
        $scope.marker = {};
        eliteApi.getLeaguesData().then(function(data) {
            $scope.location = _.find(data.locations, {id: $scope.locationId});
            $scope.marker = {
                latitude: $scope.location.latitude,
                longitude: $scope.location.longitude,
                title: $scope.location.name + '<br/>(Tap for direction)',
                showWindow: true
            };
            $scope.map.center.latitude = $scope.marker.latitude;
            $scope.map.center.longitude = $scope.marker.longitude;
        });
        $scope.locationClick = function(marker) {
            window.location = 'geo: ' + marker.latitude + ', ' + marker.longitude + ';u=35';
        }
    }])
})(); 