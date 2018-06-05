(function () {

    angular.module('app').component('fwTextarea', {
        bindings: {
            id: '@',
            labelTranslate: '@',
            placeholderTranslate: '@',
            reference: '=',
            model: "=",
            required: "=",
            minlength: "=",
            maxlength: "=",
            rows:"@",
            form:"="
        },
        templateUrl: "/app/common/templates/textarea.html"
    })

})()