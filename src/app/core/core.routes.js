const stateConfig = ($stateProvider, $urlRouterProvider, $locationProvider) => {
    var view1 = {
            url: '/one',
            templateUrl: 'app/partials/view1/view1.tpl.html',
            title: 'Page One'
        },
        view2 = {
            url: '/two',
            templateUrl: 'app/partials/view2/view2.tpl.html',
            title: 'Page Two'
        };

    $stateProvider
        .state('view1', view1)
        .state('view2', view2);

    $urlRouterProvider.otherwise('/one');
    $locationProvider.html5Mode(true).hashPrefix('!');
};

export default stateConfig;