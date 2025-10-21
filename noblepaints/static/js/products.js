document.addEventListener('DOMContentLoaded', () => {
    const categoriesSection = document.querySelector('#productsCategories');
    if (!categoriesSection) {
        return;
    }

    const overlay = document.querySelector('.page-overlay');

    categoriesSection.querySelectorAll('.paintbox').forEach((card) => {
        card.addEventListener('click', () => {
            const identifier = card.getAttribute('idNum');
            if (!identifier) {
                return;
            }

            if (overlay) {
                overlay.classList.add('visible');
            }

            const targetUrl = `/products/${encodeURIComponent(identifier)}/`;
            window.location.href = targetUrl;
        });
    });
});
