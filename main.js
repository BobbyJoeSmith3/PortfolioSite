/* ======================
Control-Bar Functionality
======================== */
const control_bar = document.querySelector('.contol-bar');
const contact_btn = document.getElementById('contact_btn');

// Rotate contact info modal button on click
contact_btn.addEventListener('click', () => {
    contact_btn.firstChild.classList.toggle('active');
});

