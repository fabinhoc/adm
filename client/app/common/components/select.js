(function () {

    angular.module('app').component('fwSelect', {
        bindings: {
            id: '@',
            labelTranslate: '@',
            placeholderTranslate: '@',
            reference: '=',
            model: "=",
            required: "=",
            minlength: "=",
            options:'=',
            form:"="
        },
        controller:['$http' ,fwSelectController],
        templateUrl: "/app/common/templates/select.html"        
    });


    function fwSelectController() {

    }

})()