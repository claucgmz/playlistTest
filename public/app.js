/**
 * Created by multiplica on 12/04/16.
 */
angular.module('routerApp', [])
    .controller('PlaylistController', playlistController)

function playlistController($http, dataService){
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
        dataService.loadElements().then(function(data){
            vm.playlist = vm.playlist.concat(data);
        });
    }

    function saveElements(){
        dataService.saveElements({ items: vm.playlist }).then(function(data){
            alert('La información ha sido guardada');
            console.log(data);
        });
    }



}