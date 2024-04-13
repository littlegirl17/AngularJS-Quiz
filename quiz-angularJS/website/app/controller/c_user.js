myApp.controller('loginController', function($scope,$http,$rootScope,$location){
    $scope.thongBaoError = false;
    $scope.login = function(){
        $http.get(`http://localhost:3000/users?email=${$scope.email}&password=${$scope.password}`).then(
            function (res) {
                //Nếu nó không trả về cái mảng rỗng 
                if(res.data.length == 0){ 
                    //hông login được
                    $scope.thongBaoError = true; //Khi error true thì no sẽ báo lỗi
                }else{
                    //Lưu biến đăng nhập này vào rootScope và localstorage
                        //Lưu biến rootscope để mình có thể cầm biến user này show thông tin ở nhiều trang khác nhau 
                            //console.log(res);
                            $rootScope.user = res.data[0]; //-> nó sẽ ra cái mảng data và mình chỉ cần lấy đúng 1 phần tử để đăng nhập chỉ cần lấy 1 email và 1 password
                        //Cầm cái object user này Lưu vào localStorage -> JSON.stringify biến cái object $rootScope.user này thành dạng chuỗi 
                            localStorage.setItem('user', JSON.stringify($rootScope.user)); // để kiểm tra bạn đăng nhập và vào application-> localstorage  sẽ thấy thông tin đã được lưu vào đó
            
                    // Chuển trang sau khi login success
                        $location.path('/');//Chuyển về trang chủ
                        //=>  qua mainController
                }
            },
            function(res){
                //login không thành công
                $scope.thongBaoError = true; //Khi error true thì no sẽ báo lỗi
            }
        )
    }
});

myApp.controller('registerController', function($scope,$http){
    $scope.register = function(){
        event.preventDefault();
        // Gửi yêu cầu POST với dữ liệu từ biến $scope.user
        if($scope.myForm.$valid){
            $http.post('http://localhost:3000/users',$scope.user).then(
                function(res){
                    //
                    $scope.thongBao = "Đăng ký thành công";
                    
                }
            )  
        }
        
    }
}); 

myApp.controller('editAccountController', function($scope,$http,$rootScope){
    $scope.thongbao = false;
    $scope.editAccount = function(){
        $http.put('http://localhost:3000/users/'+$scope.user.id,$scope.user).then( //$http.put dùng để gửi yêu cầu để nó cập nhật 1 dữ liệu mới trên máy chủ
            function(res){
                // Cập nhật dữ liệu mới vào $rootScope.user
                $rootScope.user = res.data;
                // và cầm $rootScope.user Cập nhật dữ liệu mới vào local ->Vì bên trong local đang còn lưu dữ liệu login cũ
                localStorage.setItem('user',JSON.stringify($rootScope.user));

                //Thông báo sửa thành công
                $scope.thongbao = true;
            }
        )
    }
}); 