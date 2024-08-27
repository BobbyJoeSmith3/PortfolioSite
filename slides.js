/* ===============================
    Project Database
=============================== */
const allProjects = [
    { class: '.project-1', title: 'Project One Title', pos: 0, src: 'Assets/Projects/watch_the_rubble_01.jpg', keywords: ['Graphic Design', 'Photography', 'Art'] },
    { class: '.project-2', title: 'Project Two Title', pos: 1, src: 'Assets/Projects/watch_the_rubble_03.jpg', keywords: ['Graphic Design', 'Photography', 'Art'] },
    { class: '.project-3', title: 'Project Three Title', pos: 2, src: 'Assets/Projects/Aglaura-1.jpg', keywords: ['Graphic Design', 'Photography'] },
    { class: '.project-4', title: 'Project Four Title', pos: 3, src: 'Assets/Projects/Aglaura-2.jpg', keywords: ['Graphic Design', 'Photography'] },
    { class: '.project-5', title: 'Project Five Title', pos: 4, src: 'Assets/Projects/watch_the_rubble_04.jpg', keywords: ['Graphic Design', 'Photography', 'Art'] },
    { class: '.project-6', title: 'Project Six Title', pos: 5, src: 'Assets/Projects/Aglaura-3.jpg', keywords: ['Graphic Design', 'Photography'] },
    { class: '.project-7', title: 'Project Seven Title', pos: 6, src: 'Assets/Projects/Baltimore-01.jpg', keywords: ['Photography'] },
    { class: '.project-8', title: 'Project Eight Title', pos: 7, src: 'Assets/Projects/Baltimore-02.jpg', keywords: ['Photography'] },
    { class: '.project-9', title: 'Project Nine Title', pos: 8, src: 'Assets/Projects/Baltimore-03.jpg', keywords: ['Photography'] },
    { class: '.project-10', title: 'Project Ten Title', pos: 9, src: 'Assets/Projects/Aglaura-4.jpg', keywords: ['Graphic Design', 'Photography'] }
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
const selectedKeyWords = ['Graphic Design', 'Photography'];

// To automate the movement of the gallery
let timeout;


const populateProjectBuffer = () => {
    allProjects.forEach((project) => {
        selectedKeyWords.forEach((key) => {
            if (project.keywords.includes(key)) {
                projectBuffer.add(project);
            }
        })
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

    
    if (projectBufferIndex === projectSequence.length) {
        projectBufferIndex = 0;
    }
    
    if (projectSequence.length - pattern.length < projectBufferIndex) {
        console.log('Last project reached, looping back.');
        projectBufferIndex = 0;
        patternIndex = -1;
        // projectSequence.splice(projectBufferIndex, 3, 4, 5, 2);
    }
    
    // splice every entry at gridPattern[patternIndex] into projectSequence[] at projectBufferIndex, replacing the numbers that are currently there
    // if you reach the end of the buffer, then have the pattern loop to the beginning
    for (let i = 0; i < pattern.length; i++) {
        console.log('Not on last project');
        projectSequence.splice(projectBufferIndex + i, 1, pattern[i]);
    }
    
    // iterate projectBufferIndex only if the current sequence has 4 fractions or is last sequence in gridPattern
    if (pattern.length === 4 || patternIndex === gridPattern.length - 1) {   
        projectBufferIndex++;
    } 
    

    // Extra precaution to hide slides
    slides = gallery.querySelectorAll('.project');
    slides.forEach((slide, slideIndex) => {
        if (projectSequence[slideIndex] === 0) {
            slide.classList.add('hide')
        } else {
            slide.classList.remove('hide')
        }
    })

    // Set gallery gridtemplate
    gallery.style.gridTemplateColumns = projectSequence.map((p) => {
        return `${p}fr`
    }).join(' ');

    // patternIndex++;
    return projectSequence;

}

// Create and add divs in the gallery section based on the keywords that are selected
const createProjectElements = () => {

    for (let project of projectBuffer) {
        // create the elements
        const newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'project');
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


// const hideProjects = (patternArray) => {
//     slides = gallery.querySelectorAll('.project');
//     console.log(slides);
//     slides.forEach((slide, slideIndex) => {
//         if (patternArray[slideIndex] === 0) {
//             slide.classList.add('hide')
//         } else {
//             slide.classList.remove('hide')
//         }
//     })
// }
// const hideProjects = () => {
//     slides = gallery.querySelectorAll('.project');
//     console.log(slides);
//     slides.forEach((slide, slideIndex) => {
//         if (pattern[patternIndex][slideIndex] === 0) {
//             slide.classList.add('hide')
//         } else {
//             slide.classList.remove('hide')
//         }
//     })
// }


const clearGallery = () => {
    let deleteThese = document.querySelectorAll('.project');
    deleteThese.forEach((element) => element.remove());
}

const nextSlide = () => {
    // Iterate patternIndex and loop if at the end of gridPattern array
    (patternIndex < gridPattern.length - 1) ? patternIndex++ : patternIndex = 0;

    patternGenerator(projectBuffer);

    clearTimeout(timeout)
    timeout = setTimeout(nextSlide, 4000)
}

// function to populate the gallery when page is loaded
const loadGalleryAtStart = () => {
    populateProjectBuffer();
    patternGenerator(projectBuffer);
    createProjectElements();
}

loadGalleryAtStart();
gallery.addEventListener('click', nextSlide);

// Wait a few seconds after loading the page before beginning the automatic gallery slideshow
timeout = setTimeout(nextSlide, 6000);





// TODO: Create a function that clears all projects from the dom
// let deleteThese = document.querySelectorAll('.project');
// deleteThese.forEach((element) => element.remove());
