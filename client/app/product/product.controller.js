(function () {
    'use strict';
    
    angular
            .module('app.product')
            .controller('ProductCtrl', ProductCtrl);

    ProductCtrl.$inject = ['$scope', '$http', '$timeout','Toast', '$stateParams','HttpFactory','ObjectDiff','$translate','Log'];

    function ProductCtrl($scope, $http, $timeout, Toast, $stateParams, HttpFactory, ObjectDiff, $translate, Log){
        
        const usedLang = $translate.use();
        
        // const variables
        var vm = this;
        const baseUrl = "http://localhost:3003/api/";
        vm.baseImgUrl = "http://localhost:3003/api/assets/";

        // product form
        // ************************************************************************

        // image crop
        // ======================================================================
        $scope.myImage = '';
        vm.myCroppedImage = '';
        $scope.resImgFormat = 'image/png';
        
        vm.handleFileSelect = function(evt){
            var file = evt.currentTarget.files[0];
            vm.imgType = evt.currentTarget.files[0].type;
            
            var reader = new FileReader();
            reader.onload = function (evt) {

                console.log(evt)

                $scope.$apply(function ($scope) {
                    $scope.myImage = evt.target.result;
                   
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

        // list products
        // ========================================================================
        vm._listProducts = function(){
            HttpFactory.findAll().then(function(response){
                let rs = response.data;
                vm.allProducts = rs;
                
            });
            
        }
        // ========================================================================


        // create a new product
        // ========================================================================
        vm.saveProduct = function(){
           
            // set form submit
            $scope.form.$submitted = true;
           
            if($scope.form.$valid){
                            
                if(angular.element(document.querySelector('#fileInput')).val() != ""){
                    
                    var name = Date.now();
                    var ext = '';
                    ext = vm.imgType.split("/");
                    ext = ext[1];
                         
                    vm.product.photo = name +'.png';
                    
                    var dataValue = { base64: vm.myCroppedImage, name: name };

                    HttpFactory.saveImage(dataValue).then(function (response) {

                        vm.product.photo = response.data.imageinfo.fileName;

                    }, function(err){
                        var msgs = err.data
                        Toast.addMessageError(msgs.errors);
                    });
                }                
                
                HttpFactory.save(vm.product, $stateParams.id).then(function (response) {
                    
                    Toast.addMessageSuccess("Sucesso!");
                    if ($stateParams.id) { 
                        vm._findProduct();

                        HttpFactory.find($stateParams.id).then(function(response){
                            var diff = ObjectDiff.diffOwnProperties(response.data[0], vm.product);
                            
                            if(diff.changed != "equal")
                            {
                                var objectDifferent = [];
                                objectDifferent = diff.value;
                                for(var obj in objectDifferent){
                                    
                                    if (objectDifferent[obj].changed == "primitive change") {
                                        
                                        var match = obj;
                                        var newVal = objectDifferent[obj].added;
                                        var oldVal = objectDifferent[obj].removed;
            
                                        let response = HttpFactory.jsonSchema()
                                        let rs = [];
                                        
                                        rs = response[usedLang];
                                        var field = rs[match].label;
                                        
                                        switch(usedLang){
                                            case 'ptBR':
                                                var msg = field +": alterado de "+ oldVal + " para "+ newVal; 
                                                break;
                                            case 'en':
                                                var msg = field +": changed from "+ oldVal + " to "+ newVal; 
                                                break;
                                            case 'es':
                                                var msg = field +": cambiado de "+ oldVal + " a "+ newVal; 
                                                break;
                                            default:
                                                var msg = field +": alterado de "+ oldVal + " para "+ newVal; 
                                                break;
                                        }
                                        
                                        var data = [];
                                        data = {"reference" : "products", 
                                                "action"    : "update", 
                                                "icon"      : "fa-pencil-square",
                                                "element"   : $stateParams.id,
                                                "message"   : msg }
                                        Log.save(data).then(function(response){
                                            console.log(response);
                                        });
                                        
            
            
                                    }
            
                                }
                            }
                        })

                    } else {
                        vm.revert();

                        switch(usedLang){
                            case 'ptBR':
                                var msg = "criado com sucesso"; 
                                break;
                            case 'en':
                                var msg = "created has been success"; 
                                break;
                            case 'es':
                                var msg = "creado con éxito"; 
                                break;
                            default:
                                var msg = "criado com sucesso"; 
                                break;
                        }
                        var data = [];
                        data = {"reference" : "products", 
                                "action"    : "create", 
                                "icon"      : "fa-check-circle",
                                "element"   : response.data._id,
                                "message"   : msg }
                        Log.save(data).then(function(response){
                            console.log(response);
                        });
                    }
                },
                function(err){
                    var msgs = err.data
                    Toast.addMessageError(msgs.errors);
                });
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
        vm.limitOptions = [15, 20, 35, 50, 100, 200, 300, 400, 800, 1000];

        vm.options = {
            rowSelection: true,
            multiSelect: false,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: true,
            limitSelect: true,
            pageSelect: true
        };

        vm.query = {
            order: 'name',
            limit: 15,
            page: 1
        };
        // ========================================================================

        
        // ========================================================================

        // data table functions
        // ========================================================================
        vm.loadStuff = function () {
            vm.promise = $timeout(function () {
                vm._listProducts();
            }, 2000);
        }

        vm.toggleLimitOptions = function () {
            vm.limitOptions = vm.limitOptions ? undefined : [15, 20, 35, 50, 100, 200, 300, 400, 800, 1000];
        };

        vm.logItem = function (item) {
        };
        // ========================================================================

        // ========================================================================

        // ************************************************************************
        vm._findProduct = function(){
            var id = $stateParams.id;
            if(id){
                HttpFactory.find(id).then(function(response){
                    vm.product = response.data[0]
                    $scope.myImage = "http://localhost:3003/api/assets/"+response.data[0].photo
                });
            }

        }

        // ========================================================================

        // ************************************************************************
        $scope.pie1 = {};
        $scope.bar1 = {};
        $scope.pie1.options = {
            title : {
                text: 'Last Month',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data:['Week 1','Week 2','Week 3','Week 4']
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : true,
            series : [
                {
                    name:'Sales Month',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'Week 1'},
                        {value:310, name:'Week 2'},
                        {value:234, name:'Week 3'},
                        {value:135, name:'Week 4'}
                    ]
                }
            ]
        };
        $scope.bar1.options = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['Anual Sales']
            },
            toolbox: {
                show : true,
                feature : {
                    restore : {show: true, title: "restore"},
                    saveAsImage : {show: true, title: "save as image"}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Anual Sales',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 362.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint : {
                        data : [
                            {type : 'max', name: 'Max'},
                            {type : 'min', name: 'Min'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: 'Average'}
                        ]
                    }
                }
            ]
        };
        //-------------------------------------------------------------------------

        // execute functions
        // ************************************************************************
        vm._listCategories();
        vm._listProducts();
        vm._findProduct();
        // ************************************************************************
    }
})()