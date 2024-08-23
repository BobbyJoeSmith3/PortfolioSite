const section = document.querySelector('.gallery');
const slides = section.querySelectorAll('.project');

let pIndex = 0;

// let pattern = [
//     [4, 5, 2, 0, 0, 0],
//     [4, 5, 2, 2, 0, 0],
//     [0, 3, 2, 3, 0, 0],
//     [0, 2, 1, 2, 1, 0],
//     [0, 0, 2, 4, 3, 2],
//     [0, 0, 0, 1, 1, 1],
// ];

let pattern = [
    [4, 5, 2],
    [4, 5, 2, 2],
    [3, 2, 3],
    [2, 1, 2, 1],
    [2, 4, 3, 2],
    [1, 1, 1]
];

let timeout;

const hideProjects = () => {
    slides.forEach((slide, slideIndex) => {
        if (slide.classList.contains('appear')) {
            slide.classList.add('hide')
        }
    })
    // slides.forEach((slide, slideIndex) => {
    //     if (pattern[pIndex][slideIndex] === 0) {
    //         slide.classList.add('hide')
    //     } else {
    //         slide.classList.remove('hide')
    //     }
    // })
}

// hideProjects();

const nextSlide = () => {
    pIndex += 1
    pIndex %= pattern.length

    // hideProjects();
    setTimeout(clearClasses, 1000);

    section.style.gridTemplateColumns = pattern[pIndex]
        .map((p) => {
            return `${p}fr`
        })
        .join(' ')

    // hideProjects();
    orderProjects();
    

    // clearTimeout(timeout)
    // timeout = setTimeout(nextSlide, 2000)
}



const allProjects = [
    {class: '.project-1', title: 'Project One Title', pos: 0},
    {class: '.project-2', title: 'Project Two Title', pos: 1},
    {class: '.project-3', title: 'Project Three Title', pos: 2},
    {class: '.project-4', title: 'Project Four Title', pos: 3},
    {class: '.project-5', title: 'Project Five Title', pos: 4},
    {class: '.project-6', title: 'Project Six Title', pos: 5}
]

const clearClasses = () => {
    allProjects.forEach((currentProject, index, arr) => {
        const e = document.querySelector(currentProject.class);
        e.classList.remove('appear');
        e.classList.remove('hide');
    })
}

const orderProjects = () => {
    // reorder an array by one
    // let arr = [1,2,3,4,5,6];
    // arr.push(arr.shift());

    allProjects.push(allProjects.shift());

    allProjects.forEach((currentProject, index, arr) => {
        currentProject.pos = index;
        const e = document.querySelector(currentProject.class);
        e.style.order = currentProject.pos;
        if (currentProject.pos < pattern[pIndex].length) {
            e.classList.add('appear');
        }
    })
}

section.addEventListener('click', nextSlide);
// section.addEventListener('click', () => {
//     clearClasses();
//     orderProjects();
//     nextSlide();
// })

// timeout = setTimeout(nextSlide, 2000);
