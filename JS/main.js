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
        // Filter Engine
        let filterValue = $(this).attr('data-filter');
        let $cellElements = $carousel.flickity('getCellElements');
        let $filterButtons = $('.filters').children('button');
        // Apply selected class to selected filter button
        $filterButtons.each( function () {
            if ($(this).attr('data-filter') == filterValue) {
                if ($(this).hasClass('selected') == false) {
                    $(this).addClass('selected');
                }
            } else if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
        });
        // Remove projects from carousel
        $($cellElements).each( function () {
            $carousel.flickity('remove', $(this));
        });
        // Add only filtered projects to carousel
        filterProjects(filterValue);
        $('.flickity-viewport').imagesLoaded().always(function() {
            resize_carousel();
        });
        
    });

    function filterProjects (filterValue) {
        for (let project of allProjects) {
            if (filterValue == '*') {
                let proj = document.createElement('div');
                $(proj).addClass(`project carousel-cell ${project.keywords.join(' ')}`);
                let htmlString = `<h2>${project.title}</h2><figure><img class="project carousel-cell-image ${project.keywords.join(" ")}" src="${project.src}"><figcaption class="keywords">#${project.keywords.join(" #")}</figcaption></figure>`;
                $(proj).append(htmlString);
                $carousel.flickity('append', proj);
            } else if (project.keywords.includes(filterValue)) {
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