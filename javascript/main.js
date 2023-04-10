$(document).ready(function () {
    $(".slider").slick({
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1, 
        variableWidth: true,

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

lightGallery(document.getElementById("lightgallery")); 
lightGallery(document.getElementById("lightgallery-2")); 
lightGallery(document.getElementById("lightgallery-3")); 
lightGallery(document.getElementById("lightgallery-4")); 
 
