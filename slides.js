const section = document.querySelector('.gallery');
const slides = section.querySelectorAll('.project');

let index = 0;

let pattern = [
    [4, 5, 2, 0, 0, 0],
    [4, 5, 2, 2, 0, 0],
    [0, 3, 2, 3, 0, 0],
    [0, 2, 1, 2, 1, 0],
    [0, 0, 2, 4, 3, 2],
    [0, 0, 0, 1, 1, 1],
];

const allProjects = [

]

const projectBuffer = [

]

const currentSlides = [
    
]

let timeout;

const hideProjects = () => {
    slides.forEach((slide, slideIndex) => {
        if (pattern[index][slideIndex] === 0) {
            slide.classList.add('hide')
        } else {
            slide.classList.remove('hide')
        }
    })
}

hideProjects();

const nextSlide = () => {
    index += 1
    index %= pattern.length

    section.style.gridTemplateColumns = pattern[index]
        .map((p) => {
            return `${p}fr`
        })
        .join(' ')

    hideProjects();

    // clearTimeout(timeout)
    // timeout = setTimeout(nextSlide, 2000)
}

section.addEventListener('click', nextSlide);

// timeout = setTimeout(nextSlide, 2000);
