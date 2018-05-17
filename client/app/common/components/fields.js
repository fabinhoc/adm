(function () {

    angular.module('app').component('fwField', {
        bindings: {
            id:'@',
            labelTranslate:'@',
            required:'=',
            icon:'@',
            placeholderTranslate:'@',
            type:'@',
            reference:'=',
            model: "="
        },
        templateUrl: "/app/common/templates/fields.html"
    })

})()