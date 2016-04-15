
angular.module("instantApplyApp.services", [])
.config(['$httpProvider', function($httpProvider) {
    
}
]).factory('apphttp', ['$http', function ($http) {

    var methods = {  
        request: function (params, callback, methodName, header) {

            var mode = (localStorage && localStorage.mode) ? localStorage.mode : 'STATIC';

            var BASEURL = {
                "LOCAL": 'http://localhost/',
                "DEV": 'http://DEV/',
                "TEST_VPN": 'http://TEST_VPN/', //url while connecting from mobile device
                "TEST": 'http://TEST/', //url while connecting from dev server 
                "PRODUCTION": 'https://PRODUCTION/',
                "UAT": 'https://UAT/',
                "STATIC": 'stubs/'
            };

            var URI = {
                'MainMenu': 'main',
                'Dashboard': 'dashboardinfo'
            };

            var STATIC_URI = {
                'MainMenu': 'main.json'
            };

            var postMethods = ['MainMenu'];
            var deleteMethods = [];

            var serverUrl = (mode == "STATIC") ? STATIC_URI[methodName] : URI[methodName];
            var url_ = BASEURL[mode] + serverUrl;

            var req = {
                method: (mode == "STATIC") ? 'GET': ((postMethods.indexOf(methodName) !== -1) ? 'POST' : ((deleteMethods.indexOf(methodName) !== -1) ? 'DELETE' : 'GET')),
                params: params,
                dataType: 'json',
                url: url_
            };

            if (header) {
                req.headers = { 'api-key': sessionStorage.api_key };
            }
            $http(req).
            success(function (data, status, headers, config) {
                if (typeof callback.success == "function") {
                    callback.success.call(this, data, status);
                }
            }).
            error(function (data, status, headers, config) {
                if (typeof callback.error == "function") {
                    callback.error.call(this, data, status);
                }
            });
        },
      

    }
    return methods;
}]).factory('error',  function (apphttp) {
    var methods = {
        errorMsg: function (params,scope) {
            var msg = {
                "1005": scope.lang.per_det
            };
            return msg[params];
        }
    }
    return methods;
}).factory('login', ['apphttp', function (apphttp) {
    var methods = {
        validateLogin: function (params, callback) {
            var methodName = 'MainMenu';
            apphttp.request(params,callback,methodName);           
        },        
    }
    return methods;
}]);



