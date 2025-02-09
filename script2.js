document.addEventListener('DOMContentLoaded', function() {
    const showMoreButton = document.getElementById('show-more-button');
    const categoryGrid = document.getElementById('category-grid');
    const hiddenItems = categoryGrid.querySelectorAll('.hidden');
    let isExpanded = false;

    showMoreButton.addEventListener('click', function() {
        if (!isExpanded) {
            hiddenItems.forEach(item => item.classList.remove('hidden'));
            showMoreButton.textContent = 'Свернуть ';
            showMoreButton.innerHTML = 'Свернуть <span>&#9650;</span>';
        } else {
            hiddenItems.forEach(item => item.classList.add('hidden'));
            showMoreButton.textContent = 'Показать еще ';
            showMoreButton.innerHTML = 'Показать еще <span>&#9660;</span>';
        }
        isExpanded = !isExpanded;
    });
});
