myApp.controller("categoryController", function($scope,$routeParams,$http){
    $scope.listCate = [];
    $http.get('http://localhost:3000/category').then(
        function(res){
            $scope.listCate = res.data;
            $scope.showCategoryName($routeParams.id);

        },
        function(res){
            //mẹ thành công
            alert("Lỗi khi tải danh sách danh mục.");

        }
    )
    // Hiển thị tên của danh mục khi click vào
    $scope.showCategoryName = function(id) {
        $scope.categoryName = ""; // Đảm bảo rằng tên danh mục là trống khi chưa tìm thấy
        $scope.listCate.forEach(function(cate) {
            if (cate.id === id) {
                $scope.categoryName = cate.name;
            }
        });
        console.log($scope.categoryName);
    };

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

    //loc
    $scope.customOrder =  function(loc){
        if($scope.nhieuIt === 'more'){
            return -loc.view; // lọc theeo từ nhiều tới ít (VIEW CAO )
        }else if($scope.nhieuIt === 'less'){
            return loc.view; // Lọc chiều ít tới nhiều (ÍT view)
        }else{
            return 0;
        }
    }

});

//$routeParams là một service trong AngularJS được sử dụng để trích xuất các tham số từ URL. 