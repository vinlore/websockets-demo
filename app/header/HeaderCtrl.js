var app = angular.module('Header.ctrl', []);

app.controller('HeaderCtrl', function($auth, $state) {
    
    var vm = this;

    vm.logout = () => {
        $auth.logout();
        $state.go('home');
    };

});