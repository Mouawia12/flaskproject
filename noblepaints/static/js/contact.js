(function () {
    const form = document.querySelector('[data-contact-form]');
    if (!form) {
        return;
    }

    const successAlert = document.querySelector('[data-contact-success]');
    const errorAlert = document.querySelector('[data-contact-error]');
    const submitButton = form.querySelector('button[type="submit"]');

    function showAlert(element, show) {
        if (!element) return;
        element.classList.toggle('d-none', !show);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!form.reportValidity()) {
            return;
        }

        showAlert(successAlert, false);
        showAlert(errorAlert, false);

        const formData = new FormData(form);
        const payload = {
            type: formData.get('topic') || '',
            name: (formData.get('name') || '').trim(),
            comp: (formData.get('company') || '').trim(),
            email: (formData.get('email') || '').trim(),
            phone: (formData.get('phone') || '').trim(),
            message: (formData.get('message') || '').trim(),
        };

        submitButton.disabled = true;
        submitButton.setAttribute('data-loading', 'true');

        try {
            const response = await fetch('/sendC/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            form.reset();
            showAlert(successAlert, true);
        } catch (error) {
            console.error('Contact form submission failed:', error);
            showAlert(errorAlert, true);
        } finally {
            submitButton.disabled = false;
            submitButton.removeAttribute('data-loading');
        }
    }

    form.addEventListener('submit', handleSubmit);
})();
