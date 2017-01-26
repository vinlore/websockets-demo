var app = angular.module('emailer', [
    'satellizer',
    'ui.router',
    'ui.bootstrap',
    /* Controllers */
    'Home.ctrl',
    'Emails.ctrl',
    'Header.ctrl',
    /* Services */
    'Socket.svc'
]);

app.config(($authProvider, $stateProvider, $urlRouterProvider) => {

    $authProvider.baseUrl = '/api';
    $authProvider.loginUrl = '/login';
    $authProvider.tokenType = '';

    $stateProvider

    .state('home', {
        url: '/',
        templateUrl: 'home/Home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
    })

    .state('emails', {
        url: '/emails',
        templateUrl: 'emails/Emails.html',
        controller: 'EmailsCtrl',
        controllerAs: 'vm'
    })

    .state('emails.detail', {
        url: '/:id',
        templateUrl: 'emails/Email.html',
        controller: 'EmailCtrl',
        controllerAs: 'vm'
    })

    .state('emails.create', {
        url: '/create',
        templateUrl: 'emails/Email.html',
        controller: 'EmailCtrl',
        controllerAs: 'vm'
    })

    $urlRouterProvider.when('', '/');

});