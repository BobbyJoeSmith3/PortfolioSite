

/* ===============================
    Project Database
=============================== */
const allProjects = [
    { class: '.project-1', title: 'Project One Title', pos: 0, src: 'Assets/Projects/watch_the_rubble_01.jpg', keywords: ['Graphic Design', 'Photography', 'Art', 'TestA'] },
    { class: '.project-2', title: 'Project Two Title', pos: 1, src: 'Assets/Projects/watch_the_rubble_03.jpg', keywords: ['Graphic Design', 'Photography', 'Art', 'TestA', 'TestD'] },
    { class: '.project-3', title: 'Project Three Title', pos: 2, src: 'Assets/Projects/Aglaura-1.jpg', keywords: ['Graphic Design', 'Photography', 'TestA'] },
    { class: '.project-4', title: 'Project Four Title', pos: 3, src: 'Assets/Projects/Aglaura-2.jpg', keywords: ['Graphic Design', 'Photography', 'TestA'] },
    { class: '.project-5', title: 'Project Five Title', pos: 4, src: 'Assets/Projects/watch_the_rubble_04.jpg', keywords: ['Graphic Design', 'Photography', 'Art', 'TestA'] },
    { class: '.project-6', title: 'Project Six Title', pos: 5, src: 'Assets/Projects/Aglaura-3.jpg', keywords: ['Graphic Design', 'Photography', 'TestB'] },
    { class: '.project-7', title: 'Project Seven Title', pos: 6, src: 'Assets/Projects/Baltimore-01.jpg', keywords: ['Photography', 'TestB'] },
    { class: '.project-8', title: 'Project Eight Title', pos: 7, src: 'Assets/Projects/Baltimore-02.jpg', keywords: ['Photography', 'TestB'] },
    { class: '.project-9', title: 'Project Nine Title', pos: 8, src: 'Assets/Projects/Baltimore-03.jpg', keywords: ['Photography', 'TestB'] },
    { class: '.project-10', title: 'Project Ten Title', pos: 9, src: 'Assets/Projects/Aglaura-4.jpg', keywords: ['Graphic Design', 'Photography', 'TestB'] },
    { class: '.project-11', title: 'Project Eleven Title', pos: 10, src: 'Assets/Projects/Baltimore-04.jpg', keywords: ['Photography', 'TestC'] },
    { class: '.project-12', title: 'Project Twelve Title', pos: 11, src: 'Assets/Projects/Baltimore-05.jpg', keywords: ['Photography', 'TestC'] },
    { class: '.project-13', title: 'Project Thirteen Title', pos: 12, src: 'Assets/Projects/Baltimore-06.jpg', keywords: ['Photography', 'TestC'] }
];

/* ======================
Initialize Flickity
======================== */

let carousel = document.querySelector('.main-carousel');

const flkty = new Flickity(carousel, {
    // options
    draggable: '>1',
    autoPlay: true,
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    pageDots: true
    // watchCSS: true,
});


/* ======================
Control-Bar Functionality
======================== */
const control_bar = document.querySelector('.contol-bar');
const contact_btn = document.getElementById('contact_btn');

// Rotate contact info modal button on click
contact_btn.addEventListener('click', () => {
    contact_btn.firstChild.classList.toggle('active');
});

// The project buffer is the selection of projects that will be shown in the gallery. Using Set to prevent duplicates when multiple keywords are selected
let projectBuffer = new Set();

// Where we are in the projectBuffer set
let projectBufferIndex = 0;

const populateProjectBuffer = () => {
    // Clear the projectBuffer Set
    // projectBuffer.clear();
    allProjects.forEach((project) => {
        selectedKeyWords.forEach((key) => {
            if (project.keywords.includes(key)) {
                projectBuffer.add(project);
            }
        })
    })
}

const populateAllProjects = () => {
    allProjects.forEach((project) => {
        projectBuffer.add(project);
    })
}

// Create and add divs in the gallery section based on the keywords that are selected
const populateCarousel = () => {

    for (let project of projectBuffer) {
        // create the elements
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'project carousel-cell');
        const newH2 = document.createElement('h2');
        newH2.textContent = project.title;

        const newFigure = document.createElement('figure');

        const newImg = document.createElement('img');
        newImg.setAttribute('src', project.src)

        const newFigcaption = document.createElement('figcaption');
        newFigcaption.setAttribute('class', 'keywords');
        newFigcaption.textContent = `#${project.keywords.join(' #')}`;

        // construct the element and append to dom
        // const gallery = document.querySelector('.gallery');
        // gallery.append(newDiv);
        newDiv.append(newH2);
        newFigure.append(newImg);
        newFigure.append(newFigcaption);
        newDiv.append(newFigure);
        flkty.append(newDiv);

    }
    flkty.reloadCells();
    flkty.resize();
}

// Remove all of the project divs from the gallery section
const clearCarousel = () => {
    let removeThese = document.querySelectorAll('.project');
    removeThese.forEach((element) => flkty.remove(element));
    // removeThese.forEach((element) => element.remove());
}

// Hide projects. 
// Needed to trigger fade-in and out transitions
const fadeOutProjects = () => {
    let projects = carousel.querySelectorAll('.project');
    projects.forEach((project) => {
        project.classList.add('hide');
    })
}

// Filter projects in gallery based on selected keyword buttons in control-bar
const kw_buttons = document.querySelectorAll('.filter_btn');

// The list of keywords users have selected
let selectedKeyWords = ['All'];

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
    if (selectedKeyWords.length === 0 || selectedKeyWords.includes('All') ) {
        populateAllProjects();
    } else {
        populateProjectBuffer();
    }

    // Fadeout Projects
    // fadeOutProjects();

    // wait for the projects to fade out before removing from DOM
    const hiddenProjects = document.querySelectorAll('.hide');
    hiddenProjects.forEach((project) => {
        project.ontransitionend = () => {
            // Remove all of the previous project divs from the gallery
            // clearCarousel();
            // And add new ones based on the revised selectedKeywords list
            populateCarousel();
            
        }
    })

}

filterKeywords();
populateProjectBuffer();
populateCarousel();