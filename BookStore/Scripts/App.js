;var bookApp = angular.module('bookStore', []);
bookApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/books', {
        templateUrl: 'books.html',
        controller: MainCtrl
    });
    $routeProvider.when('/book-detail/:bookId', {
        templateUrl: 'book-detail.html',
        controller: BookCtrl
    });
    $routeProvider.otherwise({ redirectTo: '/books' });
}]);