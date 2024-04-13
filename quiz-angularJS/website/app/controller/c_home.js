myApp.controller("homeController", function($scope, $http){
    $scope.listQuiz = [];
    $http.get('http://localhost:3000/quizs').then(
        function(res){
            //thành công
            $scope.listQuiz = res.data;
        },
        function(res){
            //thất bại
            alert("Không tải được dữ liệu"); 
        }
    );

    $scope.listCate = [];
    $http.get(`http://localhost:3000/category`).then(
        function(res){
            //thành công
            $scope.listCate = res.data;
        },
        function(res){
            //thất bại
            alert("Không tải được dữ liệu"); 
        }
    )

    // hàm của nút xem thêm của box quiz - ds được truyền từ ng-repeat bên v_home
    $scope.modal = {};
    $scope.showQuiz = function(ds){
        //console.log(ds);
        $scope.modal = ds;
    }
});


//Trang chi tiet
myApp.controller("detailController", function($scope, $routeParams, $http){
    $scope.quizDetail = {};
    //console.log($routeParams.id);
    $http.get(`http://localhost:3000/quizs/${$routeParams.id}`).then(
        function (res) {
            $scope.quizDetail = res.data;

            //Tăng view khi mỗi lần click xem chi tiết
            $scope.quizDetail.view++;
            $http.patch(`http://localhost:3000/quizs/${$routeParams.id}`,{
                view: $scope.quizDetail.view //cập nhật view lại
            }); 
        },
        function(res){
            //thất bại
            alert("Có lỗi khi lấy dữ liệu"); 
        }
    );

    //Tại vì angular không chịu new Date() nên phải viết ntn 
    $scope.Date = function(ngay){
        return new Date(ngay);
    }

    $scope.reaction = function(type){

        $scope.quizDetail[type]++; 
        //http patch dùng để sửa dữ liệu
        $http.patch(`http://localhost:3000/quizs/${$routeParams.id}`,
        {
            [type]: $scope.quizDetail[type]
        })// {} đây sẽ là data mình sẽ thay đổi

        //Nếu like bị tải lại trang: thì hãy mở lại vsc mà không được có file json  (cd ../)
    }

    // $scope.startQuiz = function(quizId) {
    //     $location.path(`/do/${quizId}`);
    // };
});




























//$routeParams là một service trong AngularJS được sử dụng để trích xuất các tham số từ URL. 





