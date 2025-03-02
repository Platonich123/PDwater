document.addEventListener('DOMContentLoaded', function() {
    const sortButtons = document.querySelectorAll('.sort-button');
    const blogPosts = document.querySelectorAll('.blog-post');
    const toggleAuthorsButton = document.querySelector('.toggle-authors');
    const authorsList = document.querySelector('.authors-list');

    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            sortButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            blogPosts.forEach(post => {
                if (category === 'all' || post.classList.contains(category)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    toggleAuthorsButton.addEventListener('click', function() {
        authorsList.classList.toggle('active');
    });
});

// Логика для модальных окон
const loginButton = document.getElementById('login-button');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');

loginButton.onclick = function() {
    loginModal.style.display = "block";
}

registerLink.onclick = function() {
    loginModal.style.display = "none";
    registerModal.style.display = "block";
}

loginLink.onclick = function() {
    registerModal.style.display = "none";
    loginModal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == loginModal || event.target == registerModal) {
        loginModal.style.display = "none";
        registerModal.style.display = "none";
    }
}
