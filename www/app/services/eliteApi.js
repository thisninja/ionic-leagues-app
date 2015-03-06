(function() {
    angular.module('eliteApp').factory('eliteApi', ['$http', '$q', '$ionicLoading', 'DSCacheFactory', function($http, $q, $ionicLoading, DSCacheFactory){
        self.leaguesCache = DSCacheFactory.get('leaguesCache');
        self.leagueDataCache = DSCacheFactory.get('leagueDataCache');
        self.leaguesCache.setOptions({
        	onExpire: function(key, value) {
        		getLeagues()
        			.then(function() {
        				console.log('leagues cache was auto refreshed ', new Date().toGMTString());
        				
        			}, function() {
        				console.log('Error getting data. ', new Date().toGMTString());
        				self.leaguesCache.put(key, value);
        			});
        	}
        });
        self.leagueDataCache.setOptions({
        	onExpire: function(key, value) {
        		getLeaguesData()
        			.then(function() {
        				console.log('league data cache was auto refreshed ', new Date().toGMTString());
        				
        			}, function() {
        				console.log('Error getting data. ', new Date().toGMTString());
        				self.leagueDataCache.put(key, value);
        			});
        	}
        });
        self.staticCache = DSCacheFactory.get('staticCache');
	    function setLeagueId(leagueId) {
        	self.staticCache.put('currentLeagueId', leagueId);
        };
        function getLeagueId() {
        	return self.staticCache.get('currentLeagueId');
        };
        function getLeagues(){
        	var deffered = $q.defer(),
        	cacheKey = 'leagues',
        	leaguesData = self.leaguesCache.get(cacheKey);
        	if(leaguesData) {
        		console.log('The data was found inside cache ', leaguesData);
        		deffered.resolve(leaguesData); 
        	} else {
        		$http.get('http://elite-schedule.net/api/leaguedata')
            	.success(function(data) {
            		console.log('Received data via HTTP');
            		self.leaguesCache.put(cacheKey, data);
        			deffered.resolve(data); 
            	});
        	}
            return deffered.promise; 
        };
        function getLeaguesData(forceRefresh) {
        	if(typeof forceRefresh === "undefined") {forceRefresh = false};

        	var deffered = $q.defer(),
        	cacheKey = 'leagueData-' + getLeagueId(),
        	leagueData = null;
        	if(!forceRefresh) {
        		leagueData = self.leagueDataCache.get(cacheKey);
        	}
        	if(leagueData) {
        		console.log('The data was found inside cache ', leagueData);
        		deffered.resolve(leagueData); 
        	} else {
        		$ionicLoading.show({template: 'Loading...'});
	            $http.get('http://elite-schedule.net/api/leaguedata/' + getLeagueId())
            	.success(function(data) {
            		console.log('Received data via HTTP');
            		self.leagueDataCache.put(cacheKey, data);
            		$ionicLoading.hide();
        			deffered.resolve(data); 

            	})
            	.error(function() {
            		console.log('There is an error while making http call');
            		$ionicLoading.hide();
            		deffered.reject();
            	})
        	}
            return deffered.promise;
        };

        return {
            getLeagues: getLeagues,
            getLeaguesData: getLeaguesData,
            setLeagueId: setLeagueId
        };
    }])
})();