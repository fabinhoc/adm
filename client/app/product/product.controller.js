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
                
                let rs = response.data;
                let rsOptions = [];

                rsOptions = rs.map(obj => {
                    var rObj = {};
                    rObj['value'] = obj._id;
                    rObj['text'] = obj.name;
                    return rObj;
                });
                vm.allCategories = rsOptions;
            });
        }

        vm.saveProduct = function(){
            vm.submitted = true;
            // /save/image/base64
            console.log(vm.product);
            // $http({
            //     url: baseUrl + "save/image/base64",
            //     method: 'post',
            //     data: { base64: vm.myCroppedImage, name: 'teste' },
            //     async: false,
            //     cache: false
            // }).then(function (response) {
            //     console.log(response.data);
            // });
        }

        
        let original = angular.copy(vm.product);
        vm.revert = function () {
            vm.product = {
                required: '',
                minlength: '',
                maxlength: '',
                length_rage: '',
                type_something: '',
                confirm_type: '',
                foo: '',
                email: '',
                url: '',
                num: '',
                minVal: '',
                maxVal: '',
                valRange: '',
                pattern: ''
            };

            vm.product = angular.copy(original);
            $scope.myImage = '';
            return $scope.form.$setPristine();
        };

        vm._listCategories();
    }
})()