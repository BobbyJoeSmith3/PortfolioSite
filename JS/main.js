
/* ======================
Control-Bar Functionality
======================== */
const control_bar = document.querySelector('.contol-bar');
const contact_btn = document.querySelector('.contact_btn');

// Rotate contact info modal button on click
contact_btn.addEventListener('click', () => {
    contact_btn.firstChild.classList.toggle('active');
});

/* ======================
Initialize Flickity
======================== */

let carousel = document.querySelector('.main-carousel');

const flkty = new Flickity(carousel, {
    // options
    imagesLoaded: true,
    draggable: '>1',
    autoPlay: true,
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    prevNextButtons: true,
    pageDots: true,
    fullscreen: true
    // setGallerySize: false
});

/* ======================
Carousel Navigation UI
======================== */

const car_nav = document.querySelector('.carousel-nav');
let prev_btn = document.querySelector('.previous');
let next_btn = document.querySelector('.next');
let page_dots = document.querySelector('.flickity-page-dots');
let fullscreen_btn = document.querySelector('.flickity-fullscreen-button');

// Modify Carousel Navigation
const prev_txt = document.createElement('span');
prev_txt.textContent = "prev";
prev_btn.appendChild(prev_txt);
car_nav.appendChild(prev_btn);

const next_txt = document.createElement('span');
next_txt.textContent = "next";
next_btn.insertBefore(next_txt, next_btn.querySelector('.flickity-button-icon'));
car_nav.appendChild(next_btn);
car_nav.insertBefore(page_dots, next_btn);
// Move fullscreen button into carousel
carousel.insertBefore(fullscreen_btn, carousel.firstChild);







