(function () {
    'use strict';
    angular.module('eliteApp').directive('markdown', ['eliteApi', function(eliteApi){
        var converter = new Showdown.converter();
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                attrs.$observe('markdown', function(value) {
                    var markup = converter.makeHtml(value);
                    element.html(markup);
                })
            }
        }
    }])
})(); 