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

/* ===============================
    Gallery Slides Engine
=============================== */

// Frequently used DOM selectors
const gallery = document.querySelector('.gallery');
let slides; 

// Where we are in the gridPattern array
let patternIndex = 0;
// Where we are in the projectBuffer set
let projectBufferIndex = 0;

// Display pattern for gallery grid
let gridPattern = [
    [4, 5, 2],
    [4, 5, 2, 2],
    [3, 2, 3],
    [2, 1, 2, 1],
    [2, 4, 3, 2],
    [1, 1, 1]
];

// The project buffer is the selection of projects that will be shown in the gallery. Using Set to prevent duplicates when multiple keywords are selected
let projectBuffer = new Set();

// The list of keywords users have selected
const selectedKeyWords = [];

// To automate the movement of the gallery
let timeout;


const populateProjectBuffer = () => {
    // Clear the projectBuffer Set
    projectBuffer.clear();
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

// Dynamically generates a pattern for .gallery's css attribute grid-template-columns based on the number of projects to be displayed in the gallery. Returns a new sequence everytime user clicks on the page.
const patternGenerator = (set) => {
    // Clear projectSequence array
    let projectSequence = [];
    // Get the number of projects in projectBuffer set
    let setSize = set.size;
    // The current sequence from the gridPattern
    let pattern = gridPattern[patternIndex];
    
    // Add a sum total of zeros to projectSequence[] equal to projectBuffer.length. 
    while (projectSequence.length < setSize) {
        projectSequence.push(0);
    }

    // Loop gallery slides when end is reached
    if (projectBufferIndex === projectSequence.length) {
        projectBufferIndex = 0;
    }
    
    // Loop gallery slides one project at a time
    if (projectSequence.length - pattern.length < projectBufferIndex) {
        projectBufferIndex = 0;
        patternIndex = -1;
    }

    // Generate the pattern based on how many projects are in the buffer
    // splice every entry at gridPattern[patternIndex] into projectSequence[] at projectBufferIndex, replacing the numbers that are currently there
    if (setSize === 1) {
        projectSequence = [1];
        document.querySelector('img').style.maxHeight= '80vh';
    } else if (setSize <= 3) { 
        for (let i = 0; i < setSize; i++) {
            projectSequence.splice(projectBufferIndex + i, 1, 1);
        }
    } else {
        for (let i = 0; i < pattern.length; i++) {
            projectSequence.splice(projectBufferIndex + i, 1, pattern[i]);
        }
    }
    
    // iterate projectBufferIndex only if the current sequence has 4 fractions or is last sequence in gridPattern
    if (pattern.length === 4 || patternIndex === gridPattern.length - 1) {   
        projectBufferIndex++;
    } 
    

    // Set gallery gridtemplate
    gallery.style.gridTemplateColumns = projectSequence.map((p) => {
        return `${p}fr`
    }).join(' ');

    // Extra precaution to hide slides
    slides = gallery.querySelectorAll('.project');
    slides.forEach((slide, slideIndex) => {
        if (projectSequence[slideIndex] === 0) {
            slide.classList.add('hide');
        } else {
            // without the timeout, projects will appear too fast to trigger the fade-in transition
            setTimeout(() => {
                slide.classList.remove('hide');
            }, 100);
        }
    })

    // return projectSequence;

}

// Hide projects. 
// Needed to trigger fade-in and out transitions
const hideAllProjects = () => {
    slides = gallery.querySelectorAll('.project');
    slides.forEach((slide, slideIndex) => {
        slide.classList.add('hide');
    })
}

// Create and add divs in the gallery section based on the keywords that are selected
const populateGallery = () => {

    for (let project of projectBuffer) {
        // create the elements
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'project carousel-cell hide');
        const newH2 = document.createElement('h2');
        newH2.textContent = project.title;
        
        const newFigure = document.createElement('figure');
        
        const newImg = document.createElement('img');
        newImg.setAttribute('src', project.src)
        
        const newFigcaption = document.createElement('figcaption');
        newFigcaption.setAttribute('class', 'keywords');
        newFigcaption.textContent = `#${project.keywords.join(' #')}`;
        
        // construct the element and append to dom
        const gallery = document.querySelector('.gallery');
        gallery.append(newDiv);
        newDiv.append(newH2);
        newDiv.append(newFigure);
        newFigure.append(newImg);
        newFigure.append(newFigcaption);

    }
}

// Remove all of the project divs from the gallery section
const clearGallery = () => {
    let deleteThese = document.querySelectorAll('.project');
    deleteThese.forEach((element) => element.remove());
}

// Advance to the next project in the projects gallery
const nextSlide = () => {
    // Iterate patternIndex and loop if at the end of gridPattern array
    (patternIndex < gridPattern.length - 1) ? patternIndex++ : patternIndex = 0;

    patternGenerator(projectBuffer);

    // Reset the automated timer
    // clearTimeout(timeout);
    // timeout = setTimeout(nextSlide, 4000);
}

// function to populate the gallery when page is loaded
const loadGalleryAtStart = () => {
    populateAllProjects();
    populateGallery();
    patternGenerator(projectBuffer);
}

loadGalleryAtStart();
gallery.addEventListener('click', nextSlide);

// Wait a few seconds after loading the page before beginning the automatic gallery slideshow
// timeout = setTimeout(nextSlide, 6000);


