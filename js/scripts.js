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

var mySwiper = new Swiper('.swiper', {
    // Параметры Swiper
    slidesPerView: 'auto',
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // Включите свайпинг на всех устройствах
    simulateTouch: true,
  });

  document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://127.0.0.1:8000/products/';

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('products-container');
        data.forEach(product => {
            const productElement = document.createElement('div');
            let imagesHtml = '';
            product.images.forEach(image => {
                imagesHtml += `<img src="${image.image}" alt="Product image" style="width:100px;height:auto;">`;
            });

            const colorSelect = document.createElement('select');
            colorSelect.className = 'color-select';
            product.variants.forEach(variant => {
                const option = document.createElement('option');
                option.value = variant.color; // Используем цвет как значение
                option.textContent = variant.color; // и текст опции
                colorSelect.appendChild(option);
            });

            const sizeSelect = document.createElement('select');
            sizeSelect.className = 'size-select';

            // Кнопки для управления количеством
            const quantityControl = document.createElement('div');
            const decreaseButton = document.createElement('button');
            decreaseButton.textContent = '-';
            const increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            const quantityDisplay = document.createElement('span');
            let quantity = 0; // Начальное количество
            quantityDisplay.textContent = quantity;

            decreaseButton.addEventListener('click', () => {
                if (quantity > 0) {
                    quantity -= 1;
                    quantityDisplay.textContent = quantity;
                }
            });

            increaseButton.addEventListener('click', () => {
                quantity += 1;
                quantityDisplay.textContent = quantity;
            });

            // Кнопка "Добавить в корзину"
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Добавить в корзину';
            addToCartButton.className = 'btn btn-primary';
            addToCartButton.addEventListener('click', function() {
                let selectedColor = colorSelect.value;
                let selectedSize = sizeSelect.value;
                let availableQuantity; // Доступное количество для выбранного размера и цвета
            
                const selectedVariant = product.variants.find(variant => variant.color === selectedColor);
                const sizeOption = selectedVariant.sizes.find(size => size.size === selectedSize);
            
                if (sizeOption) {
                    availableQuantity = sizeOption.amount;
                } else {
                    alert("Ошибка: не удалось определить доступное количество.");
                    return;
                }
            
                if (quantity > 0 && quantity <= availableQuantity) {
                    addToCart(product.name, quantity, selectedColor, selectedSize, availableQuantity);
                    console.log(`Добавлено в корзину: ${product.name}, Цвет: ${selectedColor}, Размер: ${selectedSize}, Количество: ${quantity}`);
                } else {
                    alert("Пожалуйста, выберите корректное количество");
                }
            });

            quantityControl.appendChild(decreaseButton);
            quantityControl.appendChild(quantityDisplay);
            quantityControl.appendChild(increaseButton);

            colorSelect.addEventListener('change', function() {
                const selectedColor = this.value;
                const selectedVariant = product.variants.find(variant => variant.color === selectedColor);
                
                sizeSelect.innerHTML = '';

                selectedVariant.sizes.forEach(size => {
                    if (size.amount > 0) {
                        const option = document.createElement('option');
                        option.value = size.size;
                        option.textContent = `${size.size} (Stock: ${size.amount})`;
                        sizeSelect.appendChild(option);
                    }
                });
            });

            colorSelect.dispatchEvent(new Event('change'));

            productElement.innerHTML = `<h3>${product.name}</h3><p>${product.description}</p>${imagesHtml}`;
            productElement.appendChild(colorSelect);
            productElement.appendChild(sizeSelect);
            productElement.appendChild(quantityControl);
            productElement.appendChild(addToCartButton); // Добавление кнопки в элемент продукта
            container.appendChild(productElement);
        });
    })
    .catch(error => console.error("Ошибка:", error));
});


function addToCart(product, quantity, color, size, availableQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (quantity > availableQuantity) {
        alert("Невозможно добавить в корзину: запрашиваемое количество превышает доступное на складе.");
        return;
    }

    const productIndex = cart.findIndex(item => item.product === product && item.color === color && item.size === size);

    if (productIndex !== -1) {
        // Если товар найден в корзине, заменяем его на новое количество
        cart[productIndex] = { product, quantity, color, size };
    } else {
        // Если товар не найден, добавляем его
        cart.push({ product, quantity, color, size });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}
