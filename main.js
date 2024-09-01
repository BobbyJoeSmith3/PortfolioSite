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


