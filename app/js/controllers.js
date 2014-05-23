'use strict';

/* Controllers */

angular.module('myApp.controllers', ['emailParser'])
  .controller('MyCtrl1', ['$scope', function($scope) {
    $scope.clock= new Date();
		var updateClock = function() {
		$scope.clock.now = new Date();
	};
	setInterval(function() {
		$scope.$apply(updateClock);
	},1000);
	updateClock();
		  }])
  .controller('MyCtrl2', ['$scope','EmailParser', function($scope, EmailParser) {
     $scope.to = 'ari@fullstack.io';
            $scope.emailBody = 'Hello __to__';
            // Set up a watch
            $scope.$watch('emailBody', function(body) {
              if (body) {
                $scope.previewText =
                  EmailParser.parse(body, {
                    to: $scope.to
                  });
              }
            });		
  }]);
/* function MyController($scope){
	$scope.clock = {
	now: new Date();
	};
	var updateClock = function() {
		$scope.clock.now = new Date();
	};
	setInterval(function() {
		$scope.$apply(updateClock);
	},1000);
	updateClock();
};
*/
   angular.module('emailParser', [])
      .config(['$interpolateProvider',
        function($interpolateProvider) {
          $interpolateProvider.startSymbol('__');
          $interpolateProvider.endSymbol('__');
    }])
    .factory('EmailParser', ['$interpolate',
      function($interpolate) {
        // a service to handle parsing
        return {
          parse: function(text, context) {
            var template = $interpolate(text);
            return template(context);
          }
        };
    }]);