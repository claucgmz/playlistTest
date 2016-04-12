/**
 * Created by multiplica on 12/04/16.
 */
angular.module('routerApp', [])
    .controller('PlaylistController', playlistController)

function playlistController($http){
    var vm = this;

    vm.playlist = [];

    vm.addElement = addElement;
    vm.editElement = editElement;
    vm.deleteElement = deleteElement;
    vm.lineThrough = lineThrough;
    vm.loadElements = loadElements;
    vm.saveElements = saveElements;

    function addElement(){

        var name = prompt("Nombre de la playlist:","Playlist");

        if (name != null) {
            var playlist = { name : name , checked: false };
            vm.playlist.push(playlist);
        }

    }

    function editElement(i){
        var name = prompt("Nombre de la playlist:","Playlist");

        if (name != null) {
            vm.playlist[i].name = name;
        }
    }

    function deleteElement(i){
        vm.playlist.splice(i, 1);
    }

    function lineThrough(i){
        vm.playlist[i].checked = !vm.playlist[i].checked;
    }

    function loadElements(){
        $http({
            method: 'GET',
            url: '/api/load'
        }).then(function successCallback(response) {
            vm.playlist = vm.playlist.concat(response.data.items);

        }, function errorCallback(response) {
            console.log(response);
        });
    }

    function saveElements(){
        $http({
            method: 'POST',
            url: '/api/save',
            data : { items: vm.playlist }
        }).then(function successCallback(response) {
            alert('La información ha sido guardada');
            console.log(response);

        }, function errorCallback(response) {
            alert('Hubo un error. La información no ha sido guardada');
            console.log(response);
        });
    }

}