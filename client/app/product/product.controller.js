(function () {
    'use strict';
    
    angular.module('app.product').controller('ProductCtrl', ['$scope', '$http', ProductCtrl])

    function ProductCtrl($scope, $http){
        var vm = this;
        const baseUrl = "http://localhost:3003/api/";

        vm.myImage = '';
        vm.myCroppedImage = '';

        vm.handleFileSelect = function(evt){
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function (vm) {
                    vm.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change', vm.handleFileSelect);

        vm._listCategories = function(){
            $http({
                url: baseUrl + "categories",
                method: 'GET',
                async: false,
                cache: false
            }).then(function(response){
                vm.allCategories = response.data;
            });
        }

        vm.saveProduct = function(){
            vm.submitted = true;
            // /save/image/base64
            $http({
                url: baseUrl + "save/image/base64",
                method: 'post',
                data: { base64: vm.myCroppedImage, name: 'teste' },
                async: false,
                cache: false
            }).then(function (response) {
                console.log(response.data);
            });
        }

        vm._listCategories();
    }
})()