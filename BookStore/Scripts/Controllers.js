;function MainCtrl($scope, $http, $templateCache) {
    $scope.books = [];
    var tooltipJS = new ToolTipJS();
    //Set the tooltip html content
    var tooltipContent = "<div style='text-align:center'><table>"
    tooltipContent += "<span style='font:bold;font-family:Arial;font-weight:800;font-size:large'>{{Name}}</span><br />";
    tooltipContent += "<tr><td>Author</td><td>{{AuthorName}}</td></tr>";
    tooltipContent += "<tr><td>Publisher</td><td>{{PublisherName}}</td></tr>";
    tooltipContent += "<tr><td>Price</td><td>{{Price}}</td></tr>";
    tooltipContent += "<tr><td>Discount</td><td>{{Discount}}</td></tr>";
    tooltipContent += "<tr><td>Language</td><td>{{Language}}</td></tr>";
    tooltipContent += "<tr><td>Publication Year</td><td>{{PublicationYear}}</td></tr>";
    tooltipContent += "<tr><td>ISBN-13</td><td>{{ISBN13}}</td></tr>";
    tooltipContent += "<tr><td>ISBN-10</td><td>{{ISBN10}}</td></tr></table></div>";
    
    //set the tooltip location preference, these can be reordered as required
    tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Top, "tooltip-Css"));
    tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Right, "tooltip-Css"));
    tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Left, "tooltip-Css"));
    tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Bottom, "tooltip-Css"));

    //first lets get all the books
    $http({
        method: 'GET',
        url: 'api/book/',
        cache: $templateCache
    }).
    success(function (data, status, headers, config) {
        $scope.books = data;
    }).
    error(function (data, status) {
        console.log("Request Failed");
    });
       

    //Get Books by their category
    $scope.GetBooksByCategory = function (category) {
        $http({
            method: 'POST',
            url: 'api/book/',
            data: JSON.stringify(category),
            headers: { 'Content-Type': 'application/json; charset=utf-8', 'dataType': 'json' },
            cache: $templateCache
        }).
        success(function (data, status, headers, config) {
            $scope.books = data;
        }).
        error(function (data, status) {
            console.log("Request Failed");
        });
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
    $scope.GetRatingImage = GetRatingImage;
    $scope.GetActualPrice = GetActualPrice;
    $scope.HasDiscount = HasDiscount;
}

function BookCtrl($scope, $http, $templateCache, $routeParams) {
    $scope.bookId = $routeParams.bookId;
    $scope.book = {};

    $http({
        method: 'GET',
        url: 'api/book/' + $scope.bookId,
        cache: $templateCache
    }).
    success(function (data, status, headers, config) {
        $scope.book = data[0];
    }).
    error(function (data, status) {
        console.log("Request Failed");
    });

    //Get our helper methods
    $scope.GetRatingImage = GetRatingImage;
    $scope.GetActualPrice = GetActualPrice;
    $scope.HasDiscount = HasDiscount;
}

//Gets rating image based on the rating value passed
function GetRatingImage(rating) {
    switch (rating) {
        case 0:
            return "0star.png";
            break;
        case 1:
            return "1star.png";
            break;
        case 2:
            return "2star.png";
            break;
        case 3:
            return "3star.png";
            break;
        case 4:
            return "4star.png";
            break;
        case 5:
            return "5star.png";
            break;
    }
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