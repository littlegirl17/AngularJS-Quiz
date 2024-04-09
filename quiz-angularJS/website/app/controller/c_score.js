myApp.controller("ketquaController", function($scope,$http,$routeParams){
    $http.get(`http://localhost:3000/scores?idUser=${$routeParams.id}`).then(
        function(res){
            $scope.score = res.data;
            console.log($scope.score);

            $scope.score.forEach(function (item) {
                $http.get(`http://localhost:3000/quizs/${item.idQuiz}`).then(
                    function(res){
                        item.quizName = res.data.name
                    },
                    function(res){

                    }
                )
            });
        },
        function(res){

        }
    )
})