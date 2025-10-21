document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.admin-sidebar');
    const toggle = document.querySelector('[data-sidebar-toggle]');

    if (sidebar && toggle) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    const overlay = window.AppOverlay;
    window.AdminLoader = {
        show() {
            if (overlay && typeof overlay.show === 'function') {
                overlay.show();
            }
        },
        hide() {
            if (overlay && typeof overlay.hide === 'function') {
                overlay.hide();
            }
        },
    };
    document.querySelectorAll('[data-overlay-trigger]').forEach((link) => {
        link.addEventListener('click', () => {
            window.AdminLoader.show();
        });
    });
});
