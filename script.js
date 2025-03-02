document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');

    loginButton.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    registerLink.addEventListener('click', function() {
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });

    loginLink.addEventListener('click', function() {
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });

    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target == loginModal || event.target == registerModal) {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const resultList = document.getElementById('result-list');
    const noResultsMessage = document.getElementById('no-results-message');
    const items = Array.from(resultList.getElementsByClassName('result-item'));

    // Изначально скрываем все карточки
    items.forEach(item => item.style.display = 'none');
    noResultsMessage.style.display = 'block';
    noResultsMessage.textContent = 'Выберите фильтры или воспользуйтесь поиском';

    // Функция для сортировки карточек
    function sortCards(criteria) {
        items.sort((a, b) => {
            const aValue = parseInt(a.getAttribute(`data-${criteria}`), 10);
            const bValue = parseInt(b.getAttribute(`data-${criteria}`), 10);
            return bValue - aValue;
        });

        items.forEach(item => resultList.appendChild(item));
        filterCards();
    }

    // Обработчик события изменения радиокнопок
    document.querySelectorAll('input[name="sort"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.id === 'popular') {
                sortCards('popularity');
            } else if (this.id === 'rating') {
                sortCards('rating');
            }
        });
    });

    // Функция для фильтрации карточек
    function filterCards() {
        const filters = document.querySelectorAll('input[name="filter"]:checked');
        const amenities = document.querySelectorAll('input[name="amenity"]:checked');
        const events = document.querySelectorAll('input[name="event"]:checked');

        let visibleItems = 0;

        items.forEach(item => {
            const sportFilters = filters.length ? Array.from(filters).every(filter => item.getAttribute('data-sport').includes(filter.value)) : true;
            const amenityFilters = amenities.length ? Array.from(amenities).every(amenity => item.getAttribute('data-amenity').includes(amenity.value)) : true;
            const eventFilters = events.length ? Array.from(events).every(event => item.getAttribute('data-event').includes(event.value)) : true;

            if (sportFilters && amenityFilters && eventFilters) {
                item.style.display = 'flex';
                visibleItems++;
            } else {
                item.style.display = 'none';
            }
        });

        if (visibleItems === 0) {
            noResultsMessage.style.display = 'block';
            noResultsMessage.textContent = 'Ничего не найдено';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }

    // Обработчик события изменения чекбоксов
    document.querySelectorAll('input[name="filter"], input[name="amenity"], input[name="event"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterCards);
    });

    // Функция для поиска карточек
    function searchCards() {
        const query = document.getElementById('search-input').value.toLowerCase();
        let visibleItems = 0;

        items.forEach(item => {
            const title = item.querySelector('h2').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            if (title.includes(query) || description.includes(query)) {
                item.style.display = 'flex';
                visibleItems++;
            } else {
                item.style.display = 'none';
            }
        });

        if (visibleItems === 0) {
            noResultsMessage.style.display = 'block';
            noResultsMessage.textContent = 'Ничего не найдено';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }

    // Обработчик события ввода текста в поле поиска
    document.getElementById('search-input').addEventListener('input', function() {
        // Убираем сообщение при вводе текста
        noResultsMessage.style.display = 'none';
    });

    // Обработчик события нажатия на кнопку поиска
    document.getElementById('search-button').addEventListener('click', searchCards);

    // Инициализация карты Leaflet
    var map = L.map('map').setView([55.7558, 37.6173], 10); // Координаты для центра карты (Москва)

    // Добавление слоя OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Функция для добавления маркеров на карту
    function addMarkers() {
        items.forEach(item => {
            const lat = item.getAttribute('data-lat');
            const lon = item.getAttribute('data-lon');
            const title = item.querySelector('h2').textContent;

            if (lat && lon) {
                var marker = L.marker([lat, lon]).addTo(map);
                marker.bindPopup(title).openPopup();
            }
        });
    }

    // Вызываем функцию для добавления маркеров
    addMarkers();
});

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');

    loginButton.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    registerLink.addEventListener('click', function() {
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });

    loginLink.addEventListener('click', function() {
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });

    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target == loginModal || event.target == registerModal) {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    });
});

