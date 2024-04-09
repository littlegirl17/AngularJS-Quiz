

var myApp = angular.module("myApp",["ngRoute"]);

//ROUTE
myApp.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "app/view/v_home.html",
            controller: "homeController",
        })
        .when("/contact", {
            templateUrl: "app/view/v_contact.html",
            controller: "contactController",
        })
        .when("/intro", {
            templateUrl: "app/view/v_intro.html",
            controller: "introController",
        })
        .when("/login", {
            templateUrl: "app/view/v_login.html",
            controller: "loginController",
        })
        .when("/register", {
            templateUrl: "app/view/v_register.html",
            controller: "registerController",
        })
        .when("/detail/:id", {
            templateUrl: "app/view/v_detail.html",
            controller: "detailController",
        })
        .when("/do/:id", {
            templateUrl: "app/view/v_do.html",
            controller: "doController",
        })
        .when("/ketqua/:id", {
            templateUrl: "app/view/v_ketqua.html",
            controller: "ketquaController",
        })
        .when("/category/:id", {
            templateUrl: "app/view/v_catagory.html",
            controller: "categoryController",
        })
        .when("/editAccount", {
            templateUrl: "app/view/v_editAccount.html",
            controller: "editAccountController",
        })
        .otherwise({
            template: "<h1>404</h1><p>Không tìm thấy trang</p>",
        });
});


