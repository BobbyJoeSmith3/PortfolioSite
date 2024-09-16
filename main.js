/* ======================
Control-Bar Functionality
======================== */
const control_bar = document.querySelector('.contol-bar');
const contact_btn = document.getElementById('contact_btn');

// Rotate contact info modal button on click
contact_btn.addEventListener('click', () => {
    contact_btn.firstChild.classList.toggle('active');
});

// Filter projects in gallery based on selected keyword buttons in control-bar
const kw_buttons = document.querySelectorAll('button');

// Toggle selectedKeyWords
kw_buttons.forEach((element) => {
    element.addEventListener('click', () => {
        element.classList.toggle('selected');
        if (selectedKeyWords.includes(element.name)) {
            // if the selected keyword is already on the selectedKeywords list find its index and remove it
            const kw_index = selectedKeyWords.indexOf(element.name);
            selectedKeyWords.splice(kw_index, 1);
        } else {
            // otherwise append the keyword to the selectedKeywords list
            selectedKeyWords.push(element.name);
        }

        // Repopulate the projectBuffer based on the revised selectedKeywords list.
        filterKeywords();
    })
})

// Display projects in the gallery based on the filters selected in the control-bar
const filterKeywords = () => {
    //  If no keyword filters are selected, then add all projects to the projectBuffer.
    if (selectedKeyWords.length === 0) {
        populateAllProjects();
    } else {
        populateProjectBuffer();
    }

    // Fadeout Projects
    hideAllProjects();

    // wait for the projects to fade out before removing from DOM
    const hiddenProjects = document.querySelectorAll('.hide');
    hiddenProjects.forEach((project) => {
        project.ontransitionend = () => {
            // Remove all of the previous project divs from the gallery
            clearGallery();
            // And add new ones based on the revised selectedKeywords list
            populateGallery();
            // Bring the gridPattern back to the start
            patternIndex = 0;
            // Generate grid template pattern
            patternGenerator(projectBuffer);
        }
    })

    // Reset the automated timer when a filter is applied
    clearTimeout(timeout);
    timeout = setTimeout(nextSlide, 4000);
}

/* ======================
Screen Size Resonsiveness
======================== */
let galleryModesChanged = false;


const projects = document.querySelectorAll('.project');
const filters = document.querySelector('.filters');
const car_nav = document.querySelector('.carousel-nav');

var carousel = document.querySelector('.main-carousel');
let r = document.querySelector(':root');
let content_flickity = "'flickity'";
let content_none = "''";

var flkty = new Flickity(carousel, {
    // options
    draggable: '>1',
    autoPlay: false,
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    // prevNextButtons: false,
    // pageDots:false,
    watchCSS: true,
});



const changeGalleryToCarousel = () => {
    // clearTimeout(timeout);
    gallery.classList.replace('gallery', 'main-carousel');
    projects.forEach((project) => {
        project.classList.remove('hide');
        // project.classList.add('carousel-cell');
    });
    r.style.setProperty('--after-content', content_flickity);

}



function changeGalleryModes(x) {
    if (galleryModesChanged === false && x.matches === true) {
        changeGalleryToCarousel();
        
        galleryModesChanged = true;
    }

}


const changeFilterToNav = (mutationList) => {
    console.log(mutationList);
    const prev_btn = document.querySelector('.previous');
    const next_btn = document.querySelector('.next');
    const page_dots = document.querySelector('.flickity-page-dots');

    for(let mutation of mutationList) {
        if (mutation.addedNodes.length >= 1) {
            if (mutation.addedNodes[0].classList.contains('previous')) {
                console.log('previous button created!');
                const prev_txt = document.createElement('span');
                prev_txt.textContent = "prev";
                prev_btn.appendChild(prev_txt);
                car_nav.appendChild(prev_btn);
            }
            if (mutation.addedNodes[0].classList.contains('next')) {
                console.log('next button created!');
                const next_txt = document.createElement('span');
                next_txt.textContent = "next";
                next_btn.insertBefore(next_txt, next_btn.querySelector('.flickity-button-icon'));
                car_nav.appendChild(next_btn);
            }
            if (mutation.addedNodes[0].classList.contains('flickity-page-dots')) {
                console.log('page dots created!');
                car_nav.insertBefore(page_dots, next_btn);
                
            }
        }

    }




    filters.classList.add('display-none');

    car_nav.classList.remove('display-none');
}

// config for which mutations to watch for
// must have atleast one: childList, attributes, characterData
let observerConfig = {
    attributes: false,
    attributeOldValues: false,
    // attributeFilter: ['aria-label'],
    childList: true,
    subtree: false,
    characterData: false,
    characterDataOldValue: false
}

let observer = new MutationObserver(changeFilterToNav);
observer.observe(carousel, observerConfig);

// function changeGalleryModes(x) {
//     const projects = document.querySelectorAll('.project');
//     const gallery = document.querySelector('.gallery');
//     const filters = document.querySelector('.filters');
//     const car_nav = document.querySelector('.carousel-nav');
//     if (galleryModesChanged === true && x.matches === true) { // If media query matches
//         clearTimeout(timeout);
//         // gallery.classList.replace('gallery', 'main-carousel');
//         projects.forEach((project) => {
//             project.classList.remove('hide');
//             project.classList.add('carousel-cell')
//         })

//         const prev_btn = document.querySelector('.previous');
//         const next_btn = document.querySelector('.next');
//         const page_dots = document.querySelector('.flickity-page-dots');
        

//         filters.classList.add('hidden');
//         car_nav.appendChild(prev_btn);
//         car_nav.appendChild(page_dots);
//         car_nav.appendChild(next_btn);
//         car_nav.classList.remove('hidden');

//         galleryModesChanged = true;
//     } else if (galleryModesChanged === true && x.matches === false) {
//         const carousel = document.querySelector('.main-carousel')
//         // carousel.classList.replace('main-carousel', 'gallery');
//         projects.forEach((project) => {
//             project.classList.add('hide');
//             project.classList.remove('carousel-cell')
//         });
//         if (selectedKeyWords.length === 0) {
//             clearGallery();
//             loadGalleryAtStart();
//             console.log('there were no selected words')
//         } else {
//             filterKeywords();
//         }
//         filters.classList.remove('hidden');
//         car_nav.classList.add('hidden');

//         // Reset the automated timer
//         clearTimeout(timeout);
//         timeout = setTimeout(nextSlide, 4000);
//     } else if (galleryModesChanged === false && x.matches === true) {
//         clearTimeout(timeout);
//         // gallery.classList.replace('gallery', 'main-carousel');
//         projects.forEach((project) => {
//             project.classList.remove('hide');
//             project.classList.add('carousel-cell')
//         });
        
//         const prev_btn = document.querySelector('.previous');
//         const next_btn = document.querySelector('.next');
//         const page_dots = document.querySelector('.flickity-page-dots');

//         const prev_txt = document.createElement('span');
//         prev_txt.textContent = "prev";
//         const next_txt = document.createElement('span');
//         next_txt.textContent = "next";

//         prev_btn.appendChild(prev_txt);
//         next_btn.insertBefore(next_txt, next_btn.querySelector('.flickity-button-icon'));

//         filters.classList.add('hidden');

//         car_nav.appendChild(prev_btn);
//         car_nav.appendChild(page_dots);
//         car_nav.appendChild(next_btn);
//         car_nav.classList.remove('hidden');
//         galleryModesChanged = true;
//     }
// }

// Create a MediaQueryList object
var x = window.matchMedia("(max-width: 850px)");

// Call listener function at run time
changeGalleryModes(x);


// Attach listener function on state changes
x.addEventListener("change", function () {
    changeGalleryModes(x);
});



// const car_nav = document.querySelector('.carousel-nav');
// const filters = document.querySelector('.filters');
// car_nav.classList.add('hidden');


