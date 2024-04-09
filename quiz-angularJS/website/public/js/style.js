/**/
ScrollReveal().reveal('#quizzes .card', {
    delay: 300, // Thời gian trễ trước khi hiệu ứng bắt đầu.
    duration: 1000, // Thời gian của hiệu ứng.
    distance: '50px', //Khoảng cách mà phần tử di chuyển.
    origin: 'bottom', //Hướng xuất phát của hiệu ứng (trên, dưới, trái, phải, vv.)
    easing: 'ease-in-out', // Kiểu easing (tăng tốc, giảm tốc, vv.).
    interval: 200 // Khoảng thời gian giữa các phần tử được hiển thị (nếu bạn muốn áp dụng hiệu ứng cho nhiều phần tử)
});

ScrollReveal().reveal('#bannerItemLeft', {
    delay: 300,
    duration: 1000,
    distance: '50px',
    origin: 'left',
    easing: 'ease-in-out'
});

ScrollReveal().reveal('#bannerItemRight', {
    delay: 300,
    duration: 1000,
    distance: '50px',
    origin: 'right',
    easing: 'ease-in-out'
});

//
document.addEventListener('DOMContentLoaded', function(){
    const title = document.getElementById('quizzesTitle');
    const spans = document.querySelectorAll('span');
    spans.forEach((span,index) => {
        setTimeout(() => {
            span.classList.add('show');
        }, 100 * index);
    });
})

//
// Lắng nghe sự kiện cuộn trang
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//     document.querySelector('.nav_top').style.top = "0";
//   } else {
//     document.querySelector('.nav_top').style.top = "0"; // Thay đổi chiều cao về 0 khi cuộn lên đầu trang
//   }
// }

