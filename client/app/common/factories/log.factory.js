(function () {

    angular.module('app').factory('Log', Log);

    Log.$inject = ['$http'];

    function Log($http){

        const baseUrl = "http://localhost:3003/api/";

        return {
            save: save
        }

        function save(data) {
            return $http.post(baseUrl + "log", data);
        }

    }

})()