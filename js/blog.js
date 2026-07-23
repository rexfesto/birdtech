// ===== BLOG SEARCH & FILTER =====
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.tag-btn');
const articlesList = document.getElementById('articlesList');
const articles = document.querySelectorAll('.article-card');

function filterArticles() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeTag = document.querySelector('.tag-btn.active').getAttribute('data-tag');
    
    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const tags = article.getAttribute('data-tags').split(',');
        const matchesSearch = title.includes(searchTerm) || article.textContent.toLowerCase().includes(searchTerm);
        const matchesTag = activeTag === 'all' || tags.includes(activeTag);
        
        if (matchesSearch && matchesTag) {
            article.style.display = 'block';
            article.style.animation = 'slideIn 0.3s ease';
        } else {
            article.style.display = 'none';
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', filterArticles);
}

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterArticles();
        });
    });
}

console.log('Blog functionality loaded');
