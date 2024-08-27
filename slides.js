const gallery = document.querySelector('.gallery');
const slides = gallery.querySelectorAll('.project');

// Where we are in the gridPattern array
let patternIndex = 0;
// Where we are in the projectBuffer set
let projectBufferIndex = 0;

let pattern = [
    [4, 5, 2, 0, 0, 0],
    [4, 5, 2, 2, 0, 0],
    [0, 3, 2, 3, 0, 0],
    [0, 2, 1, 2, 1, 0],
    [0, 0, 2, 4, 3, 2],
    [0, 0, 0, 1, 1, 1]
];

let gridPattern = [
    [4, 5, 2],
    [4, 5, 2, 2],
    [3, 2, 3],
    [2, 1, 2, 1],
    [2, 4, 3, 2],
    [1, 1, 1]
];


const allProjects = [
    { class: '.project-1', title: 'Project One Title', pos: 0, src: 'Assets/Projects/watch_the_rubble_01.jpg', keywords: ['Graphic Design', 'Photography', 'Art', 'Cover'] },
    { class: '.project-2', title: 'Project Two Title', pos: 1, src: 'Assets/Projects/watch_the_rubble_03.jpg', keywords: ['Graphic Design', 'Photography', 'Art', 'Cover'] },
    { class: '.project-3', title: 'Project Three Title', pos: 2, src: 'Assets/Projects/Aglaura-1.jpg', keywords: ['Graphic Design', 'Photography', 'Cover'] },
    { class: '.project-4', title: 'Project Four Title', pos: 3, src: 'Assets/Projects/Aglaura-2.jpg', keywords: ['Graphic Design', 'Photography', 'Cover'] },
    { class: '.project-5', title: 'Project Five Title', pos: 4, src: 'Assets/Projects/watch_the_rubble_04.jpg', keywords: ['Graphic Design', 'Photography', 'Art', 'Cover'] },
    { class: '.project-6', title: 'Project Six Title', pos: 5, src: 'Assets/Projects/Aglaura-3.jpg', keywords: ['Graphic Design', 'Photography', 'Cover'] },
    { class: '.project-7', title: 'Project Seven Title', pos: 6, src: 'Assets/Projects/Baltimore-01.jpg', keywords: [ 'Photography', 'Cover'] },
    { class: '.project-8', title: 'Project Eight Title', pos: 7, src: 'Assets/Projects/Baltimore-02.jpg', keywords: ['Photography', 'Cover'] },
    { class: '.project-9', title: 'Project Nine Title', pos: 8, src: 'Assets/Projects/Baltimore-03.jpg', keywords: ['Photography', 'Cover'] },
    { class: '.project-10', title: 'Project Ten Title', pos: 9, src: 'Assets/Projects/Aglaura-4.jpg', keywords: ['Graphic Design', 'Photography', 'Cover'] }
];


let projectBuffer = new Set();

const selectedKeyWords = ['Cover'];

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

populateProjectBuffer();

const patternGenerator = (set) => {
    // Clear projectSequence array
    let projectSequence = [];
    let setSize = set.size;
    // Add a sum total of zeros to projectSequence[] equal to projectBuffer.length. 
    while (projectSequence.length < setSize) {
        projectSequence.push(0);
    }

    // splice every entry at gridPattern[patternIndex] into projectSequence[] at projectBufferIndex, replacing the numbers that are currently there
    // if you reach the end of the buffer, then have the pattern loop to the beginning

    let pattern = gridPattern[patternIndex];
    console.log(pattern);
    console.log(pattern.length);
    console.log(`patternIndex = ${patternIndex}`);

    for (let i = 0; i < pattern.length; i++) {
        console.log('Not on last project');
        projectSequence.splice(projectBufferIndex + i, 1, pattern[i]);
    }

    
    // iterate projectBufferIndex only if the current sequence has 4 fractions or is last sequence in gridPattern
    if (pattern.length === 4 || patternIndex === gridPattern.length - 1) {   
        projectBufferIndex++;
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

    // patternIndex++;
    return projectSequence;

}

patternGenerator(projectBuffer);



const createProjectElements = () => {
    gallery.style.gridTemplateColumns = patternGenerator(projectBuffer)
        .map((p) => {
            return `${p}fr`
        })
        .join(' ');

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

createProjectElements();

const hideProjects = () => {
    console.log(slides);
    slides.forEach((slide, slideIndex) => {
        if (pattern[patternIndex][slideIndex] === 0) {
            slide.classList.add('hide')
        } else {
            slide.classList.remove('hide')
        }
    })
}

hideProjects();



const nextSlide = () => {
    // Iterate patternIndex and loop if at the end of gridPattern array
    (patternIndex < gridPattern.length - 1) ? patternIndex++ : patternIndex = 0;

    gallery.style.gridTemplateColumns = patternGenerator(projectBuffer)
        .map((p) => {
            return `${p}fr`
        })
        .join(' ');

    hideProjects();

    // clearTimeout(timeout)
    // timeout = setTimeout(nextSlide, 2000)
}




gallery.addEventListener('click', nextSlide);


// timeout = setTimeout(nextSlide, 2000);
