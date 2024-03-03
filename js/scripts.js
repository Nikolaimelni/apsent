document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-info');
    const responsiveLists = document.querySelectorAll('.responsive-list');

    toggleButtons.forEach(function(toggleButton) {
        toggleButton.addEventListener('click', function() {
            const responsiveList = this.parentNode;
            const isListOpen = responsiveList.classList.contains('open');
            responsiveList.classList.toggle('open');
            
            this.textContent = isListOpen ? 'Tap to open description' : 'Tap to hide description';
        });
    });

    function checkSize() {
        responsiveLists.forEach(function(responsiveList) {
            const toggleButton = responsiveList.querySelector('.toggle-info');
            if (window.innerWidth > 768) {
                responsiveList.classList.add('open');
            } else {
                responsiveList.classList.remove('open');
                toggleButton.textContent = 'Tap to open description';
            }
        });
    }

    window.addEventListener('resize', checkSize);
    checkSize();
});

document.addEventListener("DOMContentLoaded", function() {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function(link) {
        link.addEventListener("click", function() {
            navbarCollapse.classList.remove("show");
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const elementsToAnimate = document.querySelectorAll('.hidden');

    function checkVisibility() {
        elementsToAnimate.forEach(function(element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }

    checkVisibility();

    window.addEventListener('scroll', checkVisibility);
});

let currentImageIndex = 0;
const images = document.querySelectorAll('.img-hover-zoom');

document.querySelectorAll('.img-hover-zoom').forEach((item, index) => {
    item.addEventListener('click', event => {
        currentImageIndex = index;
        updateModalImage();
        const modal = new bootstrap.Modal(document.getElementById('imageModal'));
        modal.show();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("fs-frm");
    const emailInput = document.getElementById("email-address");
    const successMessage = document.getElementById("submitSuccessMessage");
    const errorMessage = document.getElementById("submitErrorMessage");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        resetValidationStates();

        let isValid = true;

        if (!form.checkValidity()) {
            showValidationErrors();
            isValid = false;
        }

        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add("is-invalid");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const formData = new FormData(form);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://formspree.io/f/xyyrkzpq", true);
        xhr.setRequestHeader("Accept", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                successMessage.classList.remove("d-none");
                errorMessage.classList.add("d-none");
            } else {
                errorMessage.textContent = "There was an error submitting the form. Please try again.";
                errorMessage.classList.remove("d-none");
            }
        };

        xhr.onerror = () => {
            errorMessage.textContent = "There was a network error. Please check your internet connection and try again.";
            errorMessage.classList.remove("d-none");
        };

        xhr.send(formData);
    });

    const resetValidationStates = () => {
        form.querySelectorAll(".form-control").forEach(input => {
            input.classList.remove("is-invalid");
        });
    };

    const showValidationErrors = () => {
        form.querySelectorAll(":invalid").forEach(input => {
            input.classList.add("is-invalid");
        });
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email.toLowerCase());
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMore');
    const albumCards = document.querySelectorAll('.album-card');
    let currentItems = calculateInitialItems();

    function calculateInitialItems() {
        const width = window.innerWidth;
        if (width < 576) {
            return 1;
        } else if (width >= 576 && width < 768) {
            return 2;
        } else if (width >= 768 && width < 992) {
            return 3;
        } else if (width >= 992 && width < 1200) {
            return 4;
        } else {
            return 6; 
        }
    }

    albumCards.forEach((item, index) => {
        if (index < currentItems) {
            item.style.display = 'block';
        }
    });

    loadMoreBtn.addEventListener('click', function() {
        const totalItems = currentItems + (calculateInitialItems() * 2);
        albumCards.forEach((item, index) => {
            if (index < totalItems && index >= currentItems) {
                item.style.display = 'block';
            }
        });
        currentItems = totalItems;

        if (currentItems >= albumCards.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('background-video');
    const youtubeLink = document.getElementById('youtube-link');
    const muteButton = document.getElementById('mute-button');

    if (video.canPlayType('video/mp4') === "") {
        youtubeLink.style.display = 'block';
    } else {
        video.style.display = 'block';
        muteButton.style.display = 'block';

-        muteButton.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                muteButton.textContent = 'Выключить звук';
            } else {
                video.muted = true;
                muteButton.textContent = 'Включить звук';
            }
        });

        video.play().catch(() => {
            video.style.display = 'none';
            muteButton.style.display = 'none';
            youtubeLink.style.display = 'block';
        });
    }
});