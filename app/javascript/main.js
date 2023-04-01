$(document).ready(function () {
    $(".slider").slick({
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
        adaptiveHeight: true,

        prevArrow: ".slick-prev",
        nextArrow: ".slick-next",

        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    centerMode: true,
                },
            },
        ],
    });
}); 

const menuToggle = document.querySelector("#menu-toggle");
const body = document.querySelector("body");
menuToggle.addEventListener("click", function () {
    body.classList.toggle("overflow-hidden");
});


