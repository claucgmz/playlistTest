/**
 * Created by multiplica on 12/04/16.
 */
angular.module('routerApp')
    .factory('dataService', dataservice);

dataservice.$inject = ['$http'];

function dataservice($http){

    return {
        loadElements: loadElements,
        saveElements : saveElements
    };

    function loadElements() {
        return $http.get('/api/load')
            .then(loadElementsSuccess)
            .catch(loadElementsFailed);

        function loadElementsSuccess(response) {
            console.log(response);
            return response.data.items;
        }

        function loadElementsFailed(error) {
            console.log(error);
        }
    }

    function saveElements(items) {
        return $http({
                method: 'POST',
                url: '/api/save',
                data : items
            })
            .then(saveElementsSuccess)
            .catch(saveElementsFailed);

        function saveElementsSuccess(response) {
            return response.data.items;
        }

        function saveElementsFailed(error) {
            console.log(error);
        }
    }
}
