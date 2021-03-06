(function () {
	
	app.directive('checkAvailability', ['$q', '$http', 'ngAuthSettings', function ($q, $http, ngAuthSettings) {
		return {
			require: "ngModel",
			link: function (scope, element, attributes, ngModel) {			
				ngModel.$asyncValidators.checkAvailability = function (modelValue) {
					var deffered = $q.defer();
					$http({
						method: 'GET',
						url: ngAuthSettings.apiServiceBaseUri + "/api/account/check?"+ attributes.property +"=" + modelValue
					}).then(function (response) {
						if (response.data.IsAvailable) deffered.resolve(response);
						else deffered.reject();
					}, function (error) {
						deffered.reject();
					})
					return deffered.promise;
				}

				scope.$watch("value", function () {
					ngModel.$validate();
				})
			}
		};
	}]);
})();