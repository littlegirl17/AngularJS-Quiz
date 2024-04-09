myApp.controller("categoryController", function($scope,$routeParams,$http){
    $scope.listCate = [];
    $http.get('http://localhost:3000/category').then(
        function(res){
            $scope.listCate = res.data;
        },
        function(res){
            //mẹ thành công
            alert("Lỗi khi tải danh sách danh mục.");

        }
    )

    $scope.listCateID = [];
    $http.get(`http://localhost:3000/quizs?iddm=${$routeParams.id}`).then(
        function(res){
            $scope.listCateID = res.data;
        },
        function(res){
            //mẹ thành công
        }
    )

    //Xem thêm
    $scope.modal = {};
    $scope.showQuiz = function(ds){
        $scope.modal = ds;
    }
});

//$routeParams là một service trong AngularJS được sử dụng để trích xuất các tham số từ URL. 