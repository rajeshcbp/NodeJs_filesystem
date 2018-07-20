var app = angular.module('index', ['config', 'ngCookies', 'ui-notification'])

var baseAddress = config_module._invokeQueue[0][2][1].LOGIN_URL;
var url = "";

app.factory('indexFactory', function ($http, $window) {
    return {
        
        getAllUserDetails: function () {
            url = baseAddress + "GetAllData";
            return $http.get(url);
        },
        getUserDetails: function (Id) {
            url = baseAddress + "Product/" + Id;
            return $http.get(url);
        }
       
    };
});




app.controller('indexController', function ($scope, $http, indexFactory, $cookies, $cookieStore, $window, $location, Notification) {
   
    //get all accounts
    $scope.getAdmin = function () {
        indexFactory.getAllUserDetails().success(function (resultData1) {
            console.log("resultData1==", resultData1);
            $scope.products = resultData1;
            $scope.Userslength = $scope.products.length;
            console.log("Total products==", $scope.Userslength);
        })
    }
    $scope.getAdmin();

    // Window refresh
    $scope.refresh = function () {
        $window.location.reload();
        // window.location.href = "/";
    };

   

    

    // Get single user details
    $scope.getDetails = function (Id) {
        $scope.userId = Id
        console.log("$scope.userId =", $scope.userId);
        indexFactory.getUserDetails($scope.userId).success(function (data) {
            if (data) {
                $scope.myProductDetails = data;
                console.log("$scope.user =", $scope.user);

                // sharedDetails.addData($scope.user);
                // console.log("$scope.userDetails==", $scope.userDetails);
                // window.location.href = "/Details";
            } else {

                console.log("errorMessage =", $scope.errorMessage);
            }
        }).error(function (data) {
            Notification.error({
                message: userData.name + ' ' + ',userProfile Adding Failed ',
                delay: 1000
            });
            //$scope.error = "An Error has occured while Adding userProfile! " + data.ExceptionMessage;
        });
        //End of signup api invoke    
    };

     
    

})



