var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    // options
    draggable: '>1',
    autoPlay: true,
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    // fullscreen: true,
});

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

/* ======================
Control-Bar Functionality
======================== */
const control_bar = document.querySelector('.contol-bar');
const contact_btn = document.querySelector('.contact_btn');

// Rotate contact info modal button on click
contact_btn.addEventListener('click', () => {
    contact_btn.firstChild.classList.toggle('active');
});