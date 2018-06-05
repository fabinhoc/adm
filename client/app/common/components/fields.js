(function () {

    angular.module('app').component('fwField', {
        bindings: {
            id:'@',
            labelTranslate:'@',
            icon:'@',
            placeholderTranslate:'@',
            type:'@',
            reference:'=',
            model: "=",
            required:"=",
            minlength:"=",
            form:"="
        },
        templateUrl: "/app/common/templates/fields.html"
    })

})()