 /* ======================
Initialize Flickity
======================== */
// Needs to initialize while page is loading

let $carousel = $('.main-carousel');

$carousel.flickity({
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


$(function() {
    /* ======================
    Control-Bar Functionality
    ======================== */
    const $control_bar = $('.contol-bar');
    const $contact_btn = $('.contact_btn');

    // Rotate contact info modal button on click
    // $contact_btn.addEventListener('click', () => {
    //     $contact_btn.firstChild.classList.toggle('active');
    // });

    $contact_btn.click( ()=> {
        $contact_btn.children('svg').toggleClass('active');
    });


    /* ======================
    Carousel Navigation UI
    ======================== */
    const $car_nav = $('.carousel-nav');
    let $prev_btn = $('.previous');
    let $next_btn = $('.next');
    let $page_dots = $('.flickity-page-dots');
    let $fullscreen_btn = $('.flickity-fullscreen-button');

    // Modify Carousel Navigation
    $car_nav.append($prev_btn).append($page_dots).append($next_btn);
    $('.previous .flickity-button-icon').after($('<span>prev</span>'));
    $('.next .flickity-button-icon').before($('<span>next</span>'));

    
    // Move fullscreen button into carousel
    $carousel.prepend($fullscreen_btn);
});