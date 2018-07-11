(function () {

    angular.module('app').factory('HttpFactory', HttpFactory);

    HttpFactory.$inject = ['$http'];

    function HttpFactory($http){

        const baseUrl = "http://localhost:3003/api/";

        return { 
            find: find,
            saveImage: saveImage,
            save: save,
            findAll, findAll,
            jsonSchema: jsonSchema
       
        }

        function find(id) {
            return $http({
                url: baseUrl + "products/",
                method: 'GET',
                params: {_id:id},
                async: false,
                cache: false
            })
        }

        function save(data, id = null){
            if(id) {
                return $http.put(baseUrl + "products/"+id, data)
            } else {
                return $http.post(baseUrl + "products", data)
            }
        }

        function findAll() {
            return $http({
                url: baseUrl + "products",
                method: 'GET',
                async: false,
                cache: false
            })
        }

        function saveImage(data) {
            return $http({
                url: baseUrl + "save/image/base64",
                method: 'post',
                data: data,
                async: false,
                cache: false
            })
        }

        function jsonSchema() {
            return {
                "ptBR": {
                    "name": {
                        "label": "Nome",
                        "index": "name"
                    },
                    "code": {
                        "label": "Código",
                        "index": "code"
                    },
                    "photo": {
                        "label": "Imagem",
                        "index": "photo"
                    },
                    "category": {
                        "label": "Categoria",
                        "index": "category"
                    },
                    "quantity": {
                        "label": "Quantidade",
                        "index": "quantity"
                    },
                    "price": {
                        "label": "Preço",
                        "index": "price"
                    },
                    "stock": {
                        "label": "Estoque",
                        "index": "stock"
                    },
                    "description": {
                        "label": "Descrição",
                        "index": "description"
                    },
                    "status": {
                        "label": "Status",
                        "index": "status"
                    }
                },
                "en": {
                    "name": {
                        "label": "Name",
                        "index": "name"
                    },
                    "code": {
                        "label": "Code",
                        "index": "code"
                    },
                    "photo": {
                        "label": "Image",
                        "index": "photo"
                    },
                    "category": {
                        "label": "Category",
                        "index": "category"
                    },
                    "quantity": {
                        "label": "Quantity",
                        "index": "quantity"
                    },
                    "price": {
                        "label": "Price",
                        "index": "price"
                    },
                    "stock": {
                        "label": "Stock",
                        "index": "stock"
                    },
                    "description": {
                        "label": "Description",
                        "index": "description"
                    },
                    "status": {
                        "label": "Status",
                        "index": "status"
                    }
                },
                "es": {
                    "name": {
                        "label": "Name",
                        "index": "name"
                    },
                    "code": {
                        "label": "Code",
                        "index": "code"
                    },
                    "photo": {
                        "label": "Image",
                        "index": "photo"
                    },
                    "category": {
                        "label": "Category",
                        "index": "category"
                    },
                    "quantity": {
                        "label": "Quantity",
                        "index": "quantity"
                    },
                    "price": {
                        "label": "Price",
                        "index": "price"
                    },
                    "stock": {
                        "label": "Stock",
                        "index": "stock"
                    },
                    "description": {
                        "label": "Description",
                        "index": "description"
                    },
                    "status": {
                        "label": "Status",
                        "index": "status"
                    }
                }
            }
        }
    }

    

})()