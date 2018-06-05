(function () {
    'use strict';
    
    angular.module('app.product').controller('ProductCtrl', ['$scope', '$http', '$timeout','Toast', ProductCtrl])

    function ProductCtrl($scope, $http, $timeout, Toast){

        // const variables
        var vm = this;
        const baseUrl = "http://localhost:3003/api/";

        // product form
        // ************************************************************************

        // image crop
        // ======================================================================
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
        // ========================================================================

        // list categories
        // ========================================================================
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
        // ========================================================================

        // create a new product
        // ========================================================================
        vm.saveProduct = function(){

            $scope.form.$submitted = true;
            console.log(vm.product);
            if($scope.form.$valid){

                $http({
                    url: baseUrl + "products",
                    method: 'post',
                    data: vm.product,
                    async: false,
                    cache: false
                }).then(function (response) {
                    console.log(response.data);
                },
                function(err){
                    var msgs = err.data
                    Toast.addMessageError(msgs.errors);
                });

                if(angular.element(document.querySelector('#fileInput')).val() != ""){
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
            }

        }
        // ========================================================================

        // reset form
        // ========================================================================
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
        // ========================================================================

        // ************************************************************************

        //-------------------------------------------------------------------------

        // product lists
        // ************************************************************************

        // config
        // ========================================================================
        vm.selected = [];
        vm.limitOptions = [5, 10, 15];

        vm.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: true,
            limitSelect: true,
            pageSelect: true
        };

        vm.query = {
            order: 'name',
            limit: 5,
            page: 1
        };
        // ========================================================================

        // data
        // ========================================================================
        vm.desserts = {
            "count": 9,
            "data": [
                {
                    "name": "Frozen yogurt",
                    "type": "Ice cream",
                    "calories": { "value": 159.0 },
                    "fat": { "value": 6.0 },
                    "carbs": { "value": 24.0 },
                    "protein": { "value": 4.0 },
                    "sodium": { "value": 87.0 },
                    "calcium": { "value": 14.0 },
                    "iron": { "value": 1.0 }
                }, {
                    "name": "Ice cream sandwich",
                    "type": "Ice cream",
                    "calories": { "value": 237.0 },
                    "fat": { "value": 9.0 },
                    "carbs": { "value": 37.0 },
                    "protein": { "value": 4.3 },
                    "sodium": { "value": 129.0 },
                    "calcium": { "value": 8.0 },
                    "iron": { "value": 1.0 }
                }, {
                    "name": "Frozen yogurt",
                    "type": "Ice cream",
                    "calories": { "value": 159.0 },
                    "fat": { "value": 6.0 },
                    "carbs": { "value": 24.0 },
                    "protein": { "value": 4.0 },
                    "sodium": { "value": 87.0 },
                    "calcium": { "value": 14.0 },
                    "iron": { "value": 1.0 }
                }, {
                    "name": "Ice cream sandwich",
                    "type": "Ice cream",
                    "calories": { "value": 237.0 },
                    "fat": { "value": 9.0 },
                    "carbs": { "value": 37.0 },
                    "protein": { "value": 4.3 },
                    "sodium": { "value": 129.0 },
                    "calcium": { "value": 8.0 },
                    "iron": { "value": 1.0 }
                }, {
                    "name": "Frozen yogurt",
                    "type": "Ice cream",
                    "calories": { "value": 159.0 },
                    "fat": { "value": 6.0 },
                    "carbs": { "value": 24.0 },
                    "protein": { "value": 4.0 },
                    "sodium": { "value": 87.0 },
                    "calcium": { "value": 14.0 },
                    "iron": { "value": 1.0 }
                }, {
                    "name": "Ice cream sandwich",
                    "type": "Ice cream",
                    "calories": { "value": 237.0 },
                    "fat": { "value": 9.0 },
                    "carbs": { "value": 37.0 },
                    "protein": { "value": 4.3 },
                    "sodium": { "value": 129.0 },
                    "calcium": { "value": 8.0 },
                    "iron": { "value": 1.0 }
                }, {
                    "name": "Frozen yogurt",
                    "type": "Ice cream",
                    "calories": { "value": 159.0 },
                    "fat": { "value": 6.0 },
                    "carbs": { "value": 24.0 },
                    "protein": { "value": 4.0 },
                    "sodium": { "value": 87.0 },
                    "calcium": { "value": 14.0 },
                    "iron": { "value": 1.0 }
                }, {
                    "name": "Ice cream sandwich",
                    "type": "Ice cream",
                    "calories": { "value": 237.0 },
                    "fat": { "value": 9.0 },
                    "carbs": { "value": 37.0 },
                    "protein": { "value": 4.3 },
                    "sodium": { "value": 129.0 },
                    "calcium": { "value": 8.0 },
                    "iron": { "value": 1.0 }
                }, {
                    "name": "Frozen yogurt",
                    "type": "Ice cream",
                    "calories": { "value": 159.0 },
                    "fat": { "value": 6.0 },
                    "carbs": { "value": 24.0 },
                    "protein": { "value": 4.0 },
                    "sodium": { "value": 87.0 },
                    "calcium": { "value": 14.0 },
                    "iron": { "value": 1.0 }
                }
            ]
        };
        // ========================================================================

        // data table functions
        // ========================================================================
        vm.loadStuff = function () {
            vm.promise = $timeout(function () {
                // loading
            }, 2000);
        }

        vm.toggleLimitOptions = function () {
            vm.limitOptions = vm.limitOptions ? undefined : [5, 10, 15];
        };
        // ========================================================================

        // ************************************************************************

        //-------------------------------------------------------------------------

        // execute functions
        // ************************************************************************
        vm._listCategories();

        // ************************************************************************
    }
})()