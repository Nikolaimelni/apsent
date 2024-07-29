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


document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.scrollY === 0) {

            window.scrollBy({
                top: window.innerHeight - 70,
                behavior: 'smooth'
            });
        }
    }, 3500);
});

document.addEventListener("DOMContentLoaded", function() {
    const offset = 70; 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});