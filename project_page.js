var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    // options
    draggable: '>1',
    autoPlay: true,
    cellAlign: 'left',
    contain: true,
    wrapAround: true
});

// element argument can be a selector string
//   for an individual element
// var flkty = new Flickity('.main-carousel', {
//     // options

// });

const prev_btn = document.querySelector('.previous');
const next_btn = document.querySelector('.next');
const page_dots = document.querySelector('.flickity-page-dots');
const car_nav = document.querySelector('.carousel-nav');

const prev_txt = document.createElement('span');
prev_txt.textContent = "prev";
const next_txt = document.createElement('span');
next_txt.textContent = "next";

prev_btn.appendChild(prev_txt);
// next_btn.appendChild(next_txt);
next_btn.insertBefore(next_txt, next_btn.querySelector('.flickity-button-icon'));


car_nav.appendChild(prev_btn);
car_nav.appendChild(page_dots);
car_nav.appendChild(next_btn);