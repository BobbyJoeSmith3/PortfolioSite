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
        console.log(element.name);
        if (selectedKeyWords.includes(element.name)) {
            // if the selected keyword is already on the selectedKeywords list find its index and remove it
            const kw_index = selectedKeyWords.indexOf(element.name);
            selectedKeyWords.splice(kw_index, 1);
        } else {
            // otherwise append the keyword to the selectedKeywords list
            selectedKeyWords.push(element.name);
        }
        // Repopulate the project buffer based on the revised selectedKeywords list. If no keyword filters are selected, then add all projects.
        if (selectedKeyWords.length === 0) {
            populateAllProjects();
        } else {
            populateProjectBuffer();
        }
        
        
        // Remove all of the previous project divs from the gallery
        clearGallery();
        // And add new ones based on the revised selectedKeywords list
        populateGallery();
        // Generate grid template pattern
        patternGenerator(projectBuffer);
        console.log(selectedKeyWords);
    })
})

//