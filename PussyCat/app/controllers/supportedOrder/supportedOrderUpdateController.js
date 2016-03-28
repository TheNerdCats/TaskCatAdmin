'use strict';
app.controller('supportedOrderUpdateController', ['$scope', '$window', '$routeParams', 'FileUploader', 'restCall', 'supportedOrderFactory', supportedOrderUpdateController]);

function supportedOrderUpdateController($scope, $window, $routeParams, FileUploader, restCall, supportedOrderFactory){
	var vm = $scope;
	var id = $routeParams.id;
	restCall("GET", "http://localhost:23873/api/Order/SupportedOrder/"+id, null, function (response) {
		vm.supportedOrder = response.data;		
	}, function (error) {
		console.log(error);
	});

	vm.uploader = new FileUploader();
	vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {                
        vm.supportedOrder.ImageUrl = response.FileUrl;        
        $scope.$apply();
    };
	
	vm.imageUpload = function ($event) {	
		$event.preventDefault();		
		supportedOrderFactory.imageUpload(vm.supportedOrder.ImageUrl, vm.uploader.queue[0]);
	};

	vm.registerNewSupportedOrder = function () {
		supportedOrderFactory.register("PUT", vm.supportedOrder);		
	};

	supportedOrderFactory.changeImageEvent();
}