document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('catalogFilterForm');
    if (!filterForm) {
        return;
    }

    const showOverlay = () => {
        if (window.AppOverlay && typeof window.AppOverlay.show === 'function') {
            window.AppOverlay.show();
        }
    };

    filterForm.querySelectorAll('[data-auto-submit]').forEach(element => {
        element.addEventListener('change', () => {
            showOverlay();
            filterForm.submit();
        });
    });

    const clearButton = document.getElementById('catalogClearFilters');
    if (clearButton) {
        clearButton.addEventListener('click', event => {
            event.preventDefault();
            const searchInput = filterForm.querySelector('input[name="search"]');
            if (searchInput) {
                searchInput.value = '';
            }
            filterForm.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
            });
            showOverlay();
            filterForm.submit();
        });
    }

    filterForm.addEventListener('submit', () => {
        showOverlay();
    });
});
