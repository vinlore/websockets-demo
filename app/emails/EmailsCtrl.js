var app = angular.module('Emails.ctrl', []);

app.controller('EmailsCtrl', function($auth, $scope, Socket) {
    
    var vm = this;
    var id;

    vm.emails = [];

    Socket.emit('load emails');

    Socket.on('emails loaded', (emails) => {
        $scope.$apply(() => {
            vm.emails = emails;
        });
    });
})

app.controller('EmailCtrl', function($auth, Socket, $http) {

    var vm = this;

    vm.email = {
        user_from: $auth.getPayload().username,
        user_to: null,
        subject: null,
        body: null
    };

    vm.send = () => {
        Socket.emit('send email', vm.email);
    };

})