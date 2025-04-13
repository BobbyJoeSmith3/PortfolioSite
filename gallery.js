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
    pageDots: true
    // setGallerySize: false
});

const car_nav = document.querySelector('.carousel-nav');
let prev_btn = document.querySelector('.previous');
let next_btn = document.querySelector('.next');
let page_dots = document.querySelector('.flickity-page-dots');

const prev_txt = document.createElement('span');
prev_txt.textContent = "prev";
prev_btn.appendChild(prev_txt);
car_nav.appendChild(prev_btn);

const next_txt = document.createElement('span');
next_txt.textContent = "next";
next_btn.insertBefore(next_txt, next_btn.querySelector('.flickity-button-icon'));
car_nav.appendChild(next_btn);

car_nav.insertBefore(page_dots, next_btn);

// const changeFilterToNav = (mutationList) => {
//     let prev_btn = document.querySelector('.previous');
//     let next_btn = document.querySelector('.next');
//     let page_dots = document.querySelector('.flickity-page-dots');

//     for(let mutation of mutationList) {
//         // Check MutationRecord for added children with a class of previous, next, or flickity-page-dots
//         if (mutation.addedNodes.length >= 1) {
//             if (mutation.addedNodes[0].classList.contains('previous')) {
//                 const prev_txt = document.createElement('span');
//                 prev_txt.textContent = "prev";
//                 prev_btn.appendChild(prev_txt);
//                 car_nav.appendChild(prev_btn);
//             }
//             if (mutation.addedNodes[0].classList.contains('next')) {
//                 const next_txt = document.createElement('span');
//                 next_txt.textContent = "next";
//                 next_btn.insertBefore(next_txt, next_btn.querySelector('.flickity-button-icon'));
//                 car_nav.appendChild(next_btn);
//             }
//             if (mutation.addedNodes[0].classList.contains('flickity-page-dots')) {
//                 car_nav.insertBefore(page_dots, next_btn);
//             }
//         }

//     }

//     filters.classList.add('display-none');
//     car_nav.classList.remove('display-none');
// }