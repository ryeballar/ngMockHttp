(function(ng) {

	var version = ng.version,
		major = version.major,
		minor = version.minor,
		dot = version.dot,
		hasAsyncCallback = major <= 1 && minor <= 4 && dot < 3;

	ng.mock.http = {
		init: function() {

			ng.module('ngMock', ['ng', 'ngMockE2E']).provider({
				$exceptionHandler: ng.mock.$ExceptionHandlerProvider,
				$log: ng.mock.$LogProvider,
				$interval: ng.mock.$IntervalProvider,
				$rootElement: ng.mock.$RootElementProvider
			}).config(['$provide', function($provide) {
				if(hasAsyncCallback) {
					$provide.decorator('$$asyncCallback', ng.mock.$AsyncCallbackDecorator);
				}
				$provide.decorator('$timeout', ng.mock.$TimeoutDecorator);
				$provide.decorator('$$rAF', ng.mock.$RAFDecorator);
				$provide.decorator('$rootScope', ng.mock.$RootScopeDecorator);
				$provide.decorator('$controller', ng.mock.$ControllerDecorator);
			}]);

		},

		reset: function() {

			ng.module('ngMock', ['ng']).provider({
				$browser: ng.mock.$BrowserProvider,
				$exceptionHandler: ng.mock.$ExceptionHandlerProvider,
				$log: ng.mock.$LogProvider,
				$interval: ng.mock.$IntervalProvider,
				$httpBackend: ng.mock.$HttpBackendProvider,
				$rootElement: ng.mock.$RootElementProvider
			}).config(['$provide', function($provide) {
				if(hasAsyncCallback) {
					$provide.decorator('$$asyncCallback', ng.mock.$AsyncCallbackDecorator);
				}
				$provide.decorator('$timeout', ng.mock.$TimeoutDecorator);
				$provide.decorator('$$rAF', ng.mock.$RAFDecorator);
				$provide.decorator('$rootScope', ng.mock.$RootScopeDecorator);
				$provide.decorator('$controller', ng.mock.$ControllerDecorator);
			}]);

		}
	};

})(window.angular);
