const section = document.querySelector('.gallery');
const slides = section.querySelectorAll('.project');

let index = 0;

let pattern = [
    [4, 5, 2],
    [4, 5, 2, 2],
    [3, 2, 3],
    [2, 1, 2, 1],
    [2, 4, 3, 2],
    [1, 1, 1]
];

const sources = [
    {src: 'Assets/Projects/Aglaura-1', tags: '#Graphic Design #Book Design'},
    {src: 'Assets/Projects/Aglaura-2', tags: '#Graphic Design #Book Design'},
    {src: 'Assets/Projects/Aglaura-3', tags: '#Graphic Design #Book Design'},
    {src: 'Assets/Projects/watch_the_rubble-01', tags: '#Photography #Graphic Design #Book Design #Performance'},
    {src: 'Assets/Projects/watch_the_rubble-03', tags: '#Photography #Graphic Design #Book Design #Performance'},
    {src: 'Assets/Projects/watch_the_rubble-04', tags: '#Photography #Graphic Design #Book Design #Performance'},
];

// 1. Get the sources index we are on
// 2. Get pattern index we are on and the length of that pattern
// 3. Count the number of .project nodes currently displayed on the screen. If the number of .project nodes < patternIndex.length then add all of the code for an additional .project node. Else-if .project nodes > patternIndex.length then remove the last .project node from DOM.
// 4. Map pattern to section.style.gridTemplateColumns
// 5. Loop through sources starting from sources index and update img src information in the relative 


let timeout;

const nextSlide = () => {
    index += 1
    index %= pattern.length

    section.style.gridTemplateColumns = pattern[index]
        .map((p) => {
            return `${p}fr`
        })
        .join(' ')

    slides.forEach((slide, slideIndex) => {
        if (pattern[index][slideIndex] === 0) {
            slide.classList.add('hide')
        } else {
            slide.classList.remove('hide')
        }
    })

    // clearTimeout(timeout)
    // timeout = setTimeout(nextSlide, 2000)
}

section.addEventListener('click', nextSlide);

// timeout = setTimeout(nextSlide, 2000);
