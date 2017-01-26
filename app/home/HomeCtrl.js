var app = angular.module('Home.ctrl', []);

app.controller('HomeCtrl', function($auth, $state) {

    var vm = this;

    vm.user = {
        username: null,
        password: null
    };

    vm.login = () => {
        $auth
        .login(vm.user)
        .then((res) => {
            if (res.data.token) {
                $state.go('emails');
            }
        }, (err) => {
            console.log(err);
        });
    };

});