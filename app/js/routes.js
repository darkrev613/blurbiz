(function () {
    'use strict';

    /**
     * Route configuration for the Blurbiz module.
     */
    angular.module('Blurbiz').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            // For unmatched routes
            $urlRouterProvider.otherwise('/login');

            // Application routes
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/auth/login.html',
                    controller: 'LoginController'
                })
                .state('register', {
                    url: '/signup', 
                    templateUrl: 'templates/auth/signup.html',
                    controller: 'SignupController'
                })
                .state('confirmation', {
                    url: '/confirm/:uuid',
                    templateUrl: 'templates/auth/waiting.html',
                    controller: 'ConfirmControlller'
                })
                .state('waiting', {
                    url: '/unverified',
                    templateUrl: 'templates/auth/waiting.html',
                    // controller: 'WaitingController'
                })
                .state('index', {
                    url: '/',
                    templateUrl: 'templates/project/all.html',
                    controller: 'Project.IndexController',
                    data: { pageTitle: 'All Projects' }
                })
                .state('tables', {
                    url: '/tables',
                    templateUrl: 'templates/tables.html',
                    // controller: 'Schedule.IndexController',
                    data: { pageTitle: 'Schedule' }
                });
        }
    ])
    .run(['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
        $rootScope.$on('$locationChnageStart', function(event, next, current) {
            var publicPages = ['/login', '/signup'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !AuthService.getToken()) {
                $location.path('/login');
            }
            else if (restrictedPage && AuthService.getToken() && !AuthService.getConfirmStatus()) {
                $location.path('/waiting');
            }
        });
    }]);
    // .run(['$http', '$rootScope', '$window', '$cookieStore', 'UserService', function($http, $rootScope, $window, $cookieStore, UserService) {
    //     // add JWT token as default auth header
    //     $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

    //     // update active tab on state change
    //     $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //         $rootScope.pageTitle = toState.data.pageTitle;
    //     });

    //     /**
    //      * Sidebar Toggle & Cookie Control
    //      */
    //     var mobileView = 992;

    //     UserService.GetCurrent().then(function(user) {
    //         $rootScope.user = user;
    //     });

    //     $rootScope.getWidth = function() {
    //         return window.innerWidth;
    //     };

    //     $rootScope.$watch($rootScope.getWidth, function(newValue, oldValue) {
    //         if (newValue >= mobileView) {
    //             if (angular.isDefined($cookieStore.get('toggle'))) {
    //                 $rootScope.toggle = ! $cookieStore.get('toggle') ? false : true;
    //             } else {
    //                 $rootScope.toggle = true;
    //             }
    //         } else {
    //             $rootScope.toggle = false;
    //         }

    //     });

    //     $rootScope.toggleSidebar = function() {
    //         $rootScope.toggle = !$rootScope.toggle;
    //         $cookieStore.put('toggle', $rootScope.toggle);
    //     };

    //     window.onresize = function() {
    //         $rootScope.$apply();
    //     };
    // }]);    

    // manually bootstrap angular after the JWT token is retrieved from the server
    // $(function () {
    //     // get JWT token from server
    //     $.get('/app/token', function (token) {
    //         window.jwtToken = token;

    //         angular.bootstrap(document, ['Blurbiz']);
    //     });
    // });
})();