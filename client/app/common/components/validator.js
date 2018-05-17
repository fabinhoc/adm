(function () {

    angular.module('app').component('fwValidator', {
        bindings: {
            message: '@',
            validation:'='
        },
        template: `<small ng-message="$ctrl.validation" class="color-danger">{{ $ctrl.message }}</small>`
    })

})()