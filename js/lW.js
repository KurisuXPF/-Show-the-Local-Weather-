window.onload=function() {
    var app = angular.module('Weather', []);
    app.factory('WeatherApi', function ($http) {
        var obj = {};
        obj.getIP = function () {
            return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
        }
        obj.getCurrent = function (parameters) {
            var ip;
            ip = parameters.ip;
            var api = "https://free-api.heweather.com/v5/weather?";
            var APPKey = "&key=a24d0f8fe855458aa418894a172af648&city=";
            var cb = "&callback=JSON_CALLBACK";
            return $http.get(api + APPKey + ip + cb);
        };
        return obj
    });
    app.controller('MainCtrl', function ($scope, WeatherApi) {
        $scope.Data = {};
        WeatherApi.getIP().success(function (data) {
            var ip = data.ip;
            WeatherApi.getCurrent({ip: ip}).success(function (data) {
                var _Data = data;
                $scope.Data = _Data.HeWeather5[0];
                delete $scope.items[Object.keys($scope.items)[0]];
            });
        })
    });
};