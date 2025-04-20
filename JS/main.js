/* ======================
Initializations
======================== */

// Initialize flickity
// Needs to initialize while page is loadin
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
    $contact_btn.click( ()=> {
        $contact_btn.children('svg').toggleClass('active');
    });

    $('.filters').on('click', 'button', function() {
        let filterValue = $(this).attr('data-filter');
        console.log(filterValue);
        let $cellElements = $carousel.flickity('getCellElements');
        $($cellElements).each( function () {
            $carousel.flickity('remove', $(this));
        })
        filterProjects(filterValue);
        $('.flickity-viewport').imagesLoaded().always(function() {
            resize_carousel();
        });
        
    });

    function filterProjects (filterValue) {
        for (let project of allProjects) {
            if (project.keywords.includes(filterValue)) {
                let proj = document.createElement('div');
                $(proj).addClass(`project carousel-cell ${project.keywords.join(' ')}`);
                let htmlString = `<h2>${project.title}</h2><figure><img class="project carousel-cell-image ${project.keywords.join(" ")}" src="${project.src}"><figcaption class="keywords">#${project.keywords.join(" #")}</figcaption></figure>`;
                $(proj).append(htmlString);
                $carousel.flickity('append', proj);
            }
        }
        
    }
    
    function resize_carousel() {
        $carousel.flickity('reloadCells');
        $carousel.flickity('resize');
        $carousel.flickity('reposition');
    }


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