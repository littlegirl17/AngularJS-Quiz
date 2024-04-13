myApp.controller("doController", function($scope, $routeParams, $http, $location){
    $scope.doQuiz = {};

    // Lấy dữ liệu của bài quiz từ endpoint
    $http.get(`http://localhost:3000/quizs/${$routeParams.id}`).then(
        function(res){
            // Gán dữ liệu vào biến $scope.doQuiz
            $scope.doQuiz = res.data;

            $scope.startDate = new Date().toLocaleString("sv-SE", {timeZone: "Asia/Ho_Chi_Minh"}) ;

            //Lưu thời điểm bắt đầu làm bài lần đầu tiên, kiểm tra trong localStorage có cái deadline chưa, nếu chưa thì nos là lần đầu tiên
            if(localStorage.getItem('deadline') == undefined){
                //nếu kiểm tra chưa có thì mình thêm nó vào
                    // thời điểm hiện tại
                    $scope.now = new Date();
                    // lấy ra thông tin ngày giờ từ Now
                    $scope.year = $scope.now.getFullYear();
                    $scope.month = $scope.now.getMonth();
                    $scope.day = $scope.now.getDate();
                    $scope.hour = $scope.now.getHours();
                    $scope.min = $scope.now.getMinutes() + $scope.doQuiz.time; // công thêm với thời gian quy định làm bài
                    $scope.second = $scope.now.getSeconds();
                    // đặt thời điểm hoàn thành bài làm
                    $scope.deadline = new Date($scope.year,$scope.month,$scope.day,$scope.hour,$scope.min,$scope.second); // lấy ra thêm 1 dòng của làm bài (NGHĨA LÀ THỜI ĐIỂM CỦA DEADLINE)
                    //lưu thời gian làm bài đầu tiên: nghĩa là cho dù bạn đnag làm và thoát ra thì thời gian làm bài vẫn đang tiếp tục
                    localStorage.setItem('deadline', $scope.deadline); 
                        
                    console.log($scope.now, $scope.deadline);
            }

            //tính thời gian:  đếm ngược từ thời diểm hiện tại đến cho tới cái deadline còn bao nhiêu phút nửa
                //thực hiện hành động lặp di lặp lại
                $scope.timer = setInterval(function() {
                    // Đảm bảo rằng AngularJS nhận biết sự thay đổi của $scope.phut và $scope.giay
                    $scope.$apply(function() { //$scope.$apply() sẽ thông báo cho AngularJS biết rằng có thay đổi trong phạm vi AngularJS và cần phải cập nhật lại giao diện người dùng.
                        // Đoạn mã tính toán và cập nhật $scope.phut và $scope.giay
                        $scope.deadline = new Date(localStorage.getItem('deadline'));
                        $scope.now = new Date();
                        $scope.milisecond = $scope.deadline - $scope.now; //mili giiay
                        // 1000 chia lấy giây, 60 chia lây phut // % 60 chia lấy dư, tai vi chia ra phut thì dư ra số giây 
                        $scope.phut = Math.floor($scope.milisecond / 1000 / 60).toString().padStart(2, '0'); //có thể làm cho một số trở thành một chuỗi với ít nhất hai chữ số //toString()dùng để chuyển một số sang chuỗi. //padStart dùng để thêm các ký tự vào đầu chuỗi cho đến khi đạt đến độ dài mong muốn.
                        $scope.giay = Math.floor($scope.milisecond / 1000 % 60).toString().padStart(2, '0');

                        if($scope.milisecond <= 0){ //nếu milisec <= 0 thì kết thúc thời gian làm bài
                            //gọi hàm submitQuiz bài làm để kết thúc
                            $scope.submitQuiz();
                            //dừng việc gọi hàm lặp
                            clearInterval($scope.timer);
                        }
                    });
                }, 1000);


            //Show ra câu hỏi và câu trả lời
                // Random các câu hỏi
                $scope.doQuiz.questions = $scope.doQuiz.questions.sort(() => {
                    return Math.random()-0.5; 
                })

                //Truy cập vào mảng quizs tới mảng question của object doQuiz và lặp từng phần tử của mảng questions là các câu hỏi
                $scope.doQuiz.questions.forEach(function(question) {
                    //Log ra câu hỏi
                        //console.log(question.content);

                    //nếu đê là $scope.type thì sau mỗi lần lặp giá trị mới sẽ ghi đè lên giá trị cũ và giá trị cuối cùng sẽ là giá trị mà tất cả dối tượng sẽ thấy 
                    var type = (question.answer.length > 1) ? 'checkbox' : 'radio'; 
                    
                    question.options.sort(() => {
                        return Math.random()-0.5; // dùng hàm sắp xếp để random ra các câu hỏi bên trong options
                    }) //-0.5: sort(), bạn cần trả về một số âm nếu bạn muốn đảo ngược thứ tự của các phần tử trong mảng và một số dương nếu bạn muốn giữ nguyên thứ tự. 
                    
                    //Tiếp tục lặp qua mảng option của mỗi object question ->> để lấy ra các câu đáp án 
                    question.options.forEach(function(option){
                        //Log ra tên các đáp án
                            //console.log(option.content);
                            option.type = type;//// Đảm bảo thuộc tính type được định nghĩa cho mỗi option

                    })
                });

            //Lưu trữ đáp án
                $scope.clickCount = {}; // là một object trống để lưu trữ số lần click cho mỗi lựa chọn
                $scope.selectList = {};// lưu lại các lựa chọn của người dùng trong quá trình làm bài.
                $scope.toggleChecked = function(checkk, name, value, type) {
                    if (!$scope.clickCount[value]) {
                        checkk = true; // Nếu là lần đầu tiên click, đặt giá trị là true
                        $scope.clickCount[value] = 1; // Đánh dấu đã click lần đầu
                    } else {
                        if ($scope.clickCount[value] % 2 === 0) {
                            checkk = true; // Nếu là lần click chẵn (lần click thứ 4, 6, 8,...), đặt giá trị là true
                        } else {
                            checkk = false; // Nếu là lần click lẻ (lần click thứ 3, 5, 7,...), đặt giá trị là false
                        }
                        $scope.clickCount[value]++; // Tăng biến đếm cho lần click tiếp theo 
                        //console.log($scope.clickCount[value]);
                    }
                    // console.log("câu hỏi:", name.split('-').pop());
                    // console.log("câu trả lời:", value);
                    // console.log("Type:", type);
                    // console.log("checkk:", checkk);


                    //Id câu hỏi lưu vào idQuestion
                    $scope.idQuestion = name.split('-').pop();
                    if(type == 'radio'){
                        // Trường hợp radio: gán giá trị của đáp án được chọn vào một mảng mới trong selectList[id của câu hỏi đỏ]
                        $scope.selectList[$scope.idQuestion] = [value];                
                    }else{
                        //checkbox
                        if($scope.selectList[$scope.idQuestion] == undefined){
                            $scope.selectList[$scope.idQuestion] = [];
                        }
                        if(!checkk){ // checkk là true | !checkk la false
                            //Nếu !check là false là người dùng đã ko chọn đáp án đó nửa, thì sẽ loại bỏ đáp án đó khỏi danh sách selectList
                            $scope.index = $scope.selectList[$scope.idQuestion].indexOf(value);
                            $scope.selectList[$scope.idQuestion].splice($scope.index,1);
                        }else{
                            $scope.selectList[$scope.idQuestion].push(value);
                        }
                    }
                    /*
                    console.log($scope.selectList);
                    */
                };
            
            
             // Hàm lấy ra các đáp án từ dữ liệu câu hỏi
                // $scope.getAnswers = function(questions) {
                //     var answers = {};
                //     questions.forEach(function(question) {
                //         answers[question.id] = question.answer;
                //     });
                //     return answers;
                // };
                // // Lấy ra các đáp án từ dữ liệu câu hỏi và gán vào biến $scope.answers
                // $scope.answers = $scope.getAnswers($scope.doQuiz.questions);
                // console.log("Các đáp án là:");
                // console.log($scope.answers);

        },
        function(res){
            // Xử lý khi thất bại
        }
    );

    $scope.submitQuiz = function() {
        $scope.SoCauDung = 0;
        //Check câu trả lời có đúng 
            // Sử dụng vòng lặp forEach để lặp qua từng câu hỏi
            $scope.doQuiz.questions.forEach(function(question) {
                $scope.selectedOptions = $scope.selectList[question.id] || []; 
                $scope.correctOptions = question.answer || []; 
                
                $scope.check = true; // Giả sử câu trả lời đúng mặc định
                // Kiểm tra số lượng lựa chọn của người dùng có bằng số lượng đáp án đúng
                    if ($scope.selectedOptions.length === $scope.correctOptions.length) {
                        // Lặp qua từng lựa chọn của người dùng
                        for (var i = 0; i < $scope.selectedOptions.length; i++) {
                            // Kiểm tra xem mỗi lựa chọn của người dùng có trong danh sách đáp án đúng không
                            if (!$scope.correctOptions.includes($scope.selectedOptions[i])) { //includes() được sử dụng để kiểm tra xem một phần tử cụ thể có tồn tại trong một mảng hay không, mà không quan tâm đến thứ tự của các phần tử trong mảng đó. (ko phủ định thì NẾU CÓ -TRUE, KHÔNG THÌ - FALSE) (! PHỦ ĐỊNH NẾU CÓ - FALSE, KHÔNG CÓ THÌ TRUE)
                                // Nếu không tồn tại, đánh dấu là lựa chọn của người dùng là false
                                $scope.check = false;
                                break;
                            }
                        }
                    } else {
                        // Nếu số lượng lựa chọn của người dùng không bằng số lượng đáp án đúng
                        $scope.check = false;
                    }
            
                if ($scope.check) {
                    $scope.SoCauDung++;
                }
            });
        

        //Show ra kết quả điểm
            // Tính toán tỷ lệ và điểm
            $scope.ketqua = {
                //Tính toán tỉ lệ phần trăm
                tiLe: $scope.SoCauDung / $scope.doQuiz.questions.length * 100,
                //Tính số điểm
                diem: $scope.SoCauDung / $scope.doQuiz.questions.length * $scope.doQuiz.score,
                // Bao nhiêu câu đúng
                SoCauDung: $scope.SoCauDung,
                // Số câu hỏi
                soCau: $scope.doQuiz.questions.length
            };
        
            // Lưu kết quả vào localStorage khi nộp bài
            localStorage.setItem('ketqua', JSON.stringify($scope.ketqua));
        
            // Gán giá trị kết quả vào biến ketqua
            $scope.ketqua = $scope.ketqua;
        


        //  Lưu điểm vào bảng scores
            $scope.user = JSON.parse(localStorage.getItem('user'));
            $scope.idUser = $scope.user.id; // lấy ra id của user từ local
            $scope.idQuiz = $scope.doQuiz.id; //lấy ra id của quizs
            $scope.diem = $scope.ketqua.diem; //lấy ra điểm của bài làm 
            $scope.endDate = new Date().toLocaleString("sv-SE", {timeZone: "Asia/Ho_Chi_Minh"});
            $http.post('http://localhost:3000/scores',{idUser: $scope.idUser,idQuiz: $scope.idQuiz ,score: $scope.diem, startDate: $scope.startDate, endDate: $scope.endDate}).then(
                function(res){

                },
                function(res){
                    alert('Lưu điểm và quiz và user vào bảng scores thất bại');
                }
            ) 
        
        //khi kết thúc gọi hàm removeItem đẻ xóa deadline trước đó trong local, để những lần sau vào làm nó sẽ set deadline mới
            localStorage.removeItem('deadline');
    };
    
});