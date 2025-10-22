document.addEventListener('DOMContentLoaded', () => {
    const categoriesSection = document.querySelector('#productsCategories');
    if (!categoriesSection) {
        return;
    }

    const overlay = document.querySelector('.page-overlay');

    categoriesSection.querySelectorAll('.paintbox').forEach((card) => {
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');

        const navigateToCategory = () => {
            const targetUrl = card.getAttribute('data-target-url');
            const categoryId = card.getAttribute('data-category-id');
            if (!targetUrl && !categoryId) {
                return;
            }

            if (overlay) {
                overlay.classList.add('visible');
            }

            const destination = targetUrl || `/productsSearch/?category=${encodeURIComponent(categoryId)}&page=1`;
            window.location.href = destination;
        };

        card.addEventListener('click', navigateToCategory);
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigateToCategory();
            }
        });
    });
});
