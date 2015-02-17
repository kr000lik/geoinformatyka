ngular.module('Eggly', ['firebase',
  'ngAnimate',
  'ui.router',
  'categories',
  'bookmarks'
]).constant('FIREBASE_URI','<luminous-torch-9705.firebaseio.com>')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('eggly', {
        url: '',
        abstract: true
      })
    ;
    $urlRouterProvider.otherwise('/');
  })

;