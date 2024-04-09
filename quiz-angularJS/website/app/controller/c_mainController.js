
myApp.controller('mainController', function($scope,$rootScope,$location){
    if(localStorage.getItem('user')){
        //Lấy dữ liệu user đã lưu trong local gán lại cho $rootScope.user
        $rootScope.user = JSON.parse(localStorage.getItem('user'));
    }

    //Đăng xuất
        $scope.logout = function(){
            localStorage.removeItem('user');
            delete $rootScope.user;
            $location.path('/login');//Chuyển về trang login
        }
}) 