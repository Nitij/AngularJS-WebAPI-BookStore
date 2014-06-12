;
var tooltipContent = "";
var bookApp = angular.module('bookStore', []);

bookApp.factory("BooksDataService", function ($http, $q) {
    var mybooks = [];

    var OpType = {
        GetAllBooks: 1,
        GetBooksByCatagory: 2,
        GetBookById: 3
    };

    var read = function (operation, data) {
        var deferred = $q.defer();
        if (operation === OpType.GetAllBooks || operation === OpType.GetBookById) {
            deferred.resolve($http({
                method: 'GET',
                url: 'api/book/' + data
            }));
            return deferred.promise;
        }
        else if (operation === OpType.GetBooksByCatagory) {
            deferred.resolve($http({
                method: 'POST',
                url: 'api/book/',
                data: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json; charset=utf-8', 'dataType': 'json' }
            }));
            return deferred.promise;
        }
        else { console.log("Unidentified method"); }
    };
    return {
        Books: mybooks,
        ReadBooks: read,
        OperationType: OpType
    };
});

bookApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/books', {
        templateUrl: 'books.html',
        controller: 'MainCtrl'
    });
    $routeProvider.when('/book-detail/:bookId', {
        templateUrl: 'book-detail.html',
        controller: 'BookCtrl'
    });
    $routeProvider.otherwise({ redirectTo: '/books' });    
}]);

bookApp.controller('MainCtrl', function ($scope, BooksDataService) {
    var tooltipJS = new ToolTipJS();
    $scope.books = [];

    //first lets get all the books
    BooksDataService.ReadBooks(BooksDataService.OperationType.GetAllBooks, "").
        then(function (config, data, headers, status) { $scope.books = arguments[0].data; });

    //set the tooltip location preference, these can be reordered as required
    tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Top, "tooltip-Css"));
    tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Right, "tooltip-Css"));
    tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Left, "tooltip-Css"));
    tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Bottom, "tooltip-Css"));

    //Get Books by their category   
    $scope.GetBooksByCategory = function (category) {
        BooksDataService.ReadBooks(BooksDataService.OperationType.GetBooksByCatagory, category).
            then(function (config, data, headers, status) {$scope.books = arguments[0].data; });
    };

    //set the tooltips for all the book images
    $scope.SetToolTip = function (id, name, author, publisher, price, discount, language, year, isbn13, isbn10) {
        var content = tooltipContent;
        content = content.replace("{{Name}}", name);
        content = content.replace("{{AuthorName}}", author);
        content = content.replace("{{PublisherName}}", publisher);
        content = content.replace("{{Price}}", price);
        content = content.replace("{{Discount}}", Math.round(discount * 100) + "%");
        content = content.replace("{{Language}}", language);
        content = content.replace("{{PublicationYear}}", year);
        content = content.replace("{{ISBN13}}", isbn13);
        content = content.replace("{{ISBN10}}", isbn10);

        tooltipJS.applyTooltip("imgBook" + id, content, 5, true);
    };

    //Get our helper methods
    $scope.GetRatingImage = getRatingImage;
    $scope.GetActualPrice = GetActualPrice;
    $scope.HasDiscount = HasDiscount;
    
});

bookApp.controller('BookCtrl', function ($scope, $routeParams, BooksDataService) {
    $scope.bookId = $routeParams.bookId;
    $scope.book = {};
    BooksDataService.ReadBooks(BooksDataService.OperationType.GetBookById, $scope.bookId).
        then(function (config, data, headers, status) { $scope.book = arguments[0].data[0]; });

    //Get our helper methods
    $scope.GetRatingImage = getRatingImage;
    $scope.GetActualPrice = GetActualPrice;
    $scope.HasDiscount = HasDiscount;
});

//Gets rating image based on the rating value passed
function getRatingImage(rating){
  return rating + "star.png";
}

//Gets the actual price after deducting the discount
function GetActualPrice(price, discount) {
    var discountString = Math.round(discount * 100) + "%";
    var finalPrice = price - (price * discount)
    if (discount > 0) {
        return "Rs. " + Math.round(finalPrice) + "(" + discountString + ")";
    }
    else {
        return "";
    }
};

//Determines if there is any discount for the book or not
function HasDiscount(discount) {
    return (discount > 0);
};

//Set the tooltip html content
tooltipContent = "<div style='text-align:center'><table>"
tooltipContent += "<span style='font:bold;font-family:Arial;font-weight:800;font-size:large'>{{Name}}</span><br />";
tooltipContent += "<tr><td>Author</td><td>{{AuthorName}}</td></tr>";
tooltipContent += "<tr><td>Publisher</td><td>{{PublisherName}}</td></tr>";
tooltipContent += "<tr><td>Price</td><td>{{Price}}</td></tr>";
tooltipContent += "<tr><td>Discount</td><td>{{Discount}}</td></tr>";
tooltipContent += "<tr><td>Language</td><td>{{Language}}</td></tr>";
tooltipContent += "<tr><td>Publication Year</td><td>{{PublicationYear}}</td></tr>";
tooltipContent += "<tr><td>ISBN-13</td><td>{{ISBN13}}</td></tr>";
tooltipContent += "<tr><td>ISBN-10</td><td>{{ISBN10}}</td></tr></table></div>";



