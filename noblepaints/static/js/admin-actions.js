(function (window) {
    const DEFAULT_ERROR = 'حدث خطأ غير متوقع. حاول مرة أخرى.';
    const DEFAULT_SUCCESS_TITLE = 'تم بنجاح';
    const DEFAULT_SUCCESS_TEXT = 'تم حفظ التغييرات.';

    const getLoader = () => window.AdminLoader || null;

    const withLoader = async (fn, showLoader = true) => {
        const loader = getLoader();
        if (showLoader && loader && typeof loader.show === 'function') {
            loader.show();
        }
        try {
            return await fn();
        } finally {
            if (showLoader && loader && typeof loader.hide === 'function') {
                loader.hide();
            }
        }
    };

    const parseJson = async (response) => {
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            return null;
        }
        try {
            return await response.json();
        } catch (error) {
            return null;
        }
    };

    const fireModal = (options = {}) => {
        if (window.Swal && typeof window.Swal.fire === 'function') {
            return window.Swal.fire(
                Object.assign(
                    {
                        confirmButtonText: 'حسناً',
                    },
                    options,
                ),
            );
        }
        if (options.showCancelButton) {
            const message = options.text || DEFAULT_ERROR;
            const confirmed = window.confirm(message);
            return Promise.resolve({ isConfirmed: confirmed });
        }
        const message = options.text || options.title || DEFAULT_ERROR;
        window.alert(message);
        return Promise.resolve({ isConfirmed: true });
    };

    const notifySuccess = (options = {}) => {
        return fireModal(
            Object.assign(
                {
                    icon: 'success',
                    title: DEFAULT_SUCCESS_TITLE,
                    text: DEFAULT_SUCCESS_TEXT,
                },
                options,
            ),
        );
    };

    const notifyError = (message, options = {}) => {
        const text = message || DEFAULT_ERROR;
        return fireModal(
            Object.assign(
                {
                    icon: 'error',
                    title: 'خطأ',
                    text,
                },
                options,
            ),
        );
    };

    const notifyWarning = (options = {}) => {
        return fireModal(
            Object.assign(
                {
                    icon: 'warning',
                    title: 'تنبيه',
                    text: DEFAULT_ERROR,
                },
                options,
            ),
        );
    };

    const confirmDelete = (options = {}) => {
        return fireModal(
            Object.assign(
                {
                    icon: 'warning',
                    title: 'تأكيد',
                    text: 'هل أنت متأكد من حذف العنصر ؟',
                    confirmButtonText: 'نعم',
                    cancelButtonText: 'لا',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    showCancelButton: true,
                },
                options,
            ),
        ).then((result) => Boolean(result && result.isConfirmed));
    };

    const buildFetchOptions = (options = {}) => {
        const fetchOptions = {
            method: options.method || 'GET',
            credentials: 'same-origin',
            headers: Object.assign({}, options.headers || {}),
        };

        if (options.body instanceof FormData) {
            fetchOptions.body = options.body;
        } else if (options.body !== undefined && options.body !== null) {
            if (options.json !== false) {
                fetchOptions.headers['Content-Type'] = 'application/json';
                fetchOptions.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
            } else {
                fetchOptions.body = options.body;
            }
        }

        return fetchOptions;
    };

    const request = async (url, options = {}) => {
        return withLoader(async () => {
            const response = await fetch(url, buildFetchOptions(options));
            const payload = await parseJson(response);
            const requestSucceeded = response.ok && (!payload || payload.success !== false);
            if (!requestSucceeded) {
                const message = (payload && (payload.message || payload.error)) || DEFAULT_ERROR;
                throw new Error(message);
            }
            return payload || { success: true };
        }, options.showLoader !== false);
    };

    const requestFormData = (url, formData, options = {}) => {
        return request(
            url,
            Object.assign({}, options, {
                body: formData,
                json: false,
                method: options.method || 'POST',
            }),
        );
    };

    const resolveAdminLang = () => {
        if (typeof window.getLang === 'function') {
            return window.getLang();
        }
        try {
            return (
                window.localStorage.getItem('nobleLangCPanel') ||
                window.localStorage.getItem('nobleLang') ||
                'en'
            );
        } catch (error) {
            return 'en';
        }
    };

    window.AdminApi = {
        request,
        requestFormData,
        notifySuccess,
        notifyError,
        notifyWarning,
        confirmDelete,
        resolveAdminLang,
    };
})(window);
