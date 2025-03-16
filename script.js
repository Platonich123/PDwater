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
    let markers = [];
    let map;

    // Инициализация карты
    function initMap() {
        map = L.map('map').setView([55.7558, 37.6173], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        addMarkers();
    }

    // Добавление маркеров на карту
    function addMarkers() {
        // Очищаем существующие маркеры
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        items.forEach(item => {
            if (item.style.display !== 'none') {
                const lat = parseFloat(item.getAttribute('data-lat'));
                const lon = parseFloat(item.getAttribute('data-lon'));
                const title = item.querySelector('h2').textContent;
                const description = item.querySelector('p').textContent;

                if (lat && lon) {
                    const marker = L.marker([lat, lon]).addTo(map);
                    marker.bindPopup(`<h2>${title}</h2><p>${description}</p>`);
                    
                    // Связываем маркер с карточкой
                    marker.on('click', () => {
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        item.style.backgroundColor = '#f0f0f0';
                        setTimeout(() => {
                            item.style.backgroundColor = 'white';
                        }, 1500);
                    });

                    markers.push(marker);
                }
            }
        });

        // Если есть маркеры, центрируем карту по ним
        if (markers.length > 0) {
            const group = new L.featureGroup(markers);
            map.fitBounds(group.getBounds().pad(0.1));
        }
    }

    // Функция для фильтрации карточек
    function filterCards() {
        const filters = document.querySelectorAll('input[name="filter"]:checked');
        const amenities = document.querySelectorAll('input[name="amenity"]:checked');
        const events = document.querySelectorAll('input[name="event"]:checked');

        let visibleItems = 0;

        items.forEach(item => {
            const sportFilters = filters.length ? Array.from(filters).every(filter => 
                item.getAttribute('data-sport').split(',').includes(filter.value)) : true;
            const amenityFilters = amenities.length ? Array.from(amenities).every(amenity => 
                item.getAttribute('data-amenity').split(',').includes(amenity.value)) : true;
            const eventFilters = events.length ? Array.from(events).every(event => 
                item.getAttribute('data-event').split(',').includes(event.value)) : true;

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

        // Обновляем маркеры после фильтрации
        addMarkers();
    }

    // Функция для поиска
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

        // Обновляем маркеры после поиска
        addMarkers();
    }

    // Инициализация карты
    initMap();

    // Обработчики событий
    document.querySelectorAll('input[name="filter"], input[name="amenity"], input[name="event"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterCards);
    });

    document.getElementById('search-button').addEventListener('click', searchCards);
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchCards();
        }
    });

    // Добавляем обработчики событий для карточек
    items.forEach(item => {
        item.addEventListener('click', () => {
            const lat = parseFloat(item.getAttribute('data-lat'));
            const lon = parseFloat(item.getAttribute('data-lon'));
            if (lat && lon) {
                map.setView([lat, lon], 14);
                const marker = markers.find(m => 
                    m.getLatLng().lat === lat && 
                    m.getLatLng().lng === lon
                );
                if (marker) {
                    marker.openPopup();
                }
            }
        });
    });
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

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');

    // Логика для открытия модального окна входа
    loginButton.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    // Логика для переключения на модальное окно регистрации
    registerLink.addEventListener('click', function() {
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });

    // Логика для переключения на модальное окно входа
    loginLink.addEventListener('click', function() {
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });

    // Логика для закрытия модальных окон
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    // Логика для закрытия модальных окон при клике вне их области
    window.addEventListener('click', function(event) {
        if (event.target == loginModal || event.target == registerModal) {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    });

    // Инициализация карты Leaflet
    var map = L.map('map').setView([55.7558, 37.6173], 10); // Координаты для центра карты (Москва)

    // Добавление слоя OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
});
