const gallery = document.querySelector('.gallery');
const slides = gallery.querySelectorAll('.project');

let patternIndex = 0;

let pattern = [
    [4, 5, 2, 0, 0, 0],
    [4, 5, 2, 2, 0, 0],
    [0, 3, 2, 3, 0, 0],
    [0, 2, 1, 2, 1, 0],
    [0, 0, 2, 4, 3, 2],
    [0, 0, 0, 1, 1, 1],
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

const currentSlides = [];

const selectedKeyWords = ['Cover'];

let timeout;

const hideProjects = () => {
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
    patternIndex += 1
    patternIndex %= pattern.length

    gallery.style.gridTemplateColumns = pattern[patternIndex]
        .map((p) => {
            return `${p}fr`
        })
        .join(' ')

    hideProjects();

    // clearTimeout(timeout)
    // timeout = setTimeout(nextSlide, 2000)
}

const populateProjectBuffer = () => {
    allProjects.forEach((project) => {
        console.log(`project = ${project}`)
        selectedKeyWords.forEach((key) => {
            console.log(`key = ${key}`)
            if (project.keywords.includes(key)) {
                projectBuffer.add(project);
            }
        })
    })
    console.log(projectBuffer);
}

populateProjectBuffer();

gallery.addEventListener('click', nextSlide);


// timeout = setTimeout(nextSlide, 2000);
