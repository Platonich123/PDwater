document.addEventListener('DOMContentLoaded', function() {
    // Модальные окна
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');

    // Логика модальных окон
    loginButton.addEventListener('click', () => loginModal.style.display = 'block');
    registerLink.addEventListener('click', () => { loginModal.style.display = 'none'; registerModal.style.display = 'block'; });
    loginLink.addEventListener('click', () => { registerModal.style.display = 'none'; loginModal.style.display = 'block'; });
    closeButtons.forEach(button => button.addEventListener('click', () => { loginModal.style.display = 'none'; registerModal.style.display = 'none'; }));
    window.addEventListener('click', (event) => { if (event.target == loginModal || event.target == registerModal) { loginModal.style.display = 'none'; registerModal.style.display = 'none'; } });

    // Данные о спотах
    const spots = [
        {
            name: "Яхт-клуб \"Ореховая бухта\"",
            address: "Московская область, городской округ Мытищи, деревня Волынское, Ореховая улица",
            lat: 55.8789,
            lon: 37.6543,
            rating: 4,
            image: "card/cts.png",
            amenities: ["Можно детям", "Есть инвентарь"],
            events: ["соревнования"],
            sports: ["Моторная тяга", "Весло", "Спец. оборудование"]
        },
        {
            name: "ProYachting",
            address: "Ленинградское шоссе. 39, стр. 6",
            lat: 55.8236,
            lon: 37.4849,
            rating: 5,
            image: "card/cv.png",
            amenities: ["есть инвентарь", "инструктор"],
            events: ["события"],
            sports: ["Моторная тяга"]
        },
        {
            name: "Прогулка на парусной яхте",
            address: "Московская область, г. Подльск, Улица 1 мая, д. 10",
            lat: 55.5912,
            lon: 37.3045,
            rating: 3,
            image: "card/frs.png",
            amenities: ["Можно детям", "есть инвентарь", "инструктор"],
            events: ["соревнования"],
            sports: ["Спец. оборудование"]
        },
        {
            name: "Прогулка на сапе",
            address: "г. Москва, ул. Наташкинская улица, ст.1",
            lat: 55.7558,
            lon: 37.6173,
            rating: 2,
            image: "card/rfg.png",
            events: ["соревнования"],
            sports: ["Весло", "Спец. оборудование"]
        },
        {
            name: "Royal Yacht Club",
            address: "г. Москва, ул. Никольский тупик",
            lat: 55.7522,
            lon: 37.6156,
            rating: 1,
            image: "card/XXXL.webp",
            amenities: ["Можно детям", "инструктор"],
            sports: ["Моторная тяга", "Весло", "Спец. оборудование"]
        },
        {
            name: "Подмосковная Ривьера",
            address: "г. Москва, Ленинградское шоссе, ст.1",
            lat: 55.7964,
            lon: 37.5343,
            rating: 6,
            image: "card/xdxx.webp",
            amenities: ["Можно детям"],
            events: ["события"],
            sports: ["Моторная тяга", "Яхта", "Спец. оборудование"]
        }
    ];

    // Инициализация карты
    const map = L.map('map').setView([55.7558, 37.6173], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let markers = [];

    // Функция обновления маркеров на карте
    function updateMap(filteredSpots = spots) {
        // Очищаем старые маркеры
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        // Добавляем новые
        filteredSpots.forEach(spot => {
            const marker = L.marker([spot.lat, spot.lon]).addTo(map);
            marker.bindPopup(createPopupContent(spot));
            markers.push(marker);
        });

        // Автомасштабирование
        if (filteredSpots.length > 0) {
            const group = new L.featureGroup(markers);
            map.fitBounds(group.getBounds().pad(0.1));
        }
    }

    // Создание содержимого попапа
    function createPopupContent(spot) {
        return `
            <div class="spot-popup">
                <h3>${spot.name}</h3>
                <p>${spot.address}</p>
                <div class="rating">Рейтинг: ${'★'.repeat(spot.rating)}${'☆'.repeat(5-spot.rating)}</div>
                <div class="sports">Спорт: ${spot.sports.join(', ')}</div>
            </div>
        `;
    }

    // Функция фильтрации
    function applyFilters() {
        const searchQuery = document.getElementById('search-input').value.toLowerCase();
        const sportFilters = Array.from(document.querySelectorAll('input[name="filter"]:checked')).map(cb => cb.value);
        const amenityFilters = Array.from(document.querySelectorAll('input[name="amenity"]:checked')).map(cb => cb.value);
        const eventFilters = Array.from(document.querySelectorAll('input[name="event"]:checked')).map(cb => cb.value);

        const filtered = spots.filter(spot => {
            // Поиск по тексту
            const matchesSearch = searchQuery === '' || 
                spot.name.toLowerCase().includes(searchQuery) || 
                spot.address.toLowerCase().includes(searchQuery);

            // Фильтры по категориям
            const matchesSports = sportFilters.length === 0 || 
                sportFilters.some(filter => spot.sports.includes(filter));
                
            const matchesAmenities = amenityFilters.length === 0 || 
                amenityFilters.every(filter => spot.amenities.includes(filter));
                
            const matchesEvents = eventFilters.length === 0 || 
                eventFilters.every(filter => spot.events.includes(filter));

            return matchesSearch && matchesSports && matchesAmenities && matchesEvents;
        });

        updateMap(filtered);
    }

    // Инициализация
    updateMap();

    // Обработчики событий
    document.getElementById('search-button').addEventListener('click', applyFilters);
    document.getElementById('search-input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') applyFilters();
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
});