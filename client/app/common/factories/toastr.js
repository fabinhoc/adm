(function () {

    angular.module('app').factory('Toast', ['$mdToast', '$document', Toast]);

    function Toast($mdToast, $document){

        function _show(type, msg){
            
            $mdToast.show({
                controller: '',
                template: '<md-toast class="' + type + '">'+ msg +'</md-toast>',
                hideDelay: 3000,
                position: "top right",
            });            
        }

        function _createContent(msgs){

            var content = "";

            if(msgs instanceof Array){
                msgs.forEach(function(item, index){ 
                    content += '<div class="md-toast-content">' + item + '</div><div class="divider"></div>';
                })
            } else {
                content += '<div class="md-toast-content">' + msgs + '</div><div class="divider"></div>';
            }

            return content;
        }

        function addMessageError(msgs){
            var content = _createContent(msgs);
            _show('md-toast-danger', content);
        }

        function addMessageWarning(msgs){
            var content = _createContent(msgs);
            _show('md-toast-warning', content);
        }

        function addMessageSuccess(msgs){
            var content = _createContent(msgs);
            _show('md-toast-success',content);          
        }

        function addMessageInfo(msgs){
            var content = _createContent(msgs);
            _show('md-toast-info', content);
        }
        return { 
            addMessageError: addMessageError,
            addMessageWarning: addMessageWarning,
            addMessageSuccess: addMessageSuccess,
            addMessageInfo: addMessageInfo
        }
    }

    

})()