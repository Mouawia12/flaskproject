const overlayElement = document.querySelector('.overlay');

const getActiveLang = () => {
    if (typeof window.getLang === 'function') {
        return window.getLang();
    }
    try {
        return window.localStorage.getItem('nobleLang') || 'en';
    } catch (error) {
        return 'en';
    }
};

function getParams(query) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params[query];
}

const activeLang = getActiveLang();
const optionElements = Array.from(document.querySelectorAll('[data-category-option]'));
const checkWraps = optionElements
    .map((option) => option.querySelector('.check-wrap'))
    .filter(Boolean);

const clearSelection = () => {
    checkWraps.forEach((wrap) => wrap.classList.remove('checked'));
    optionElements.forEach((wrap) => wrap.classList.remove('is-selected'));
};

const highlightSelection = (wrap) => {
    if (!wrap) {
        return;
    }
    wrap.classList.add('checked');
    const parent = wrap.parentElement;
    if (parent && parent.classList) {
        parent.classList.add('is-selected');
    }
};

const updateCategoryLabels = () => {
    const lang = getActiveLang();
    document.querySelectorAll('[data-label-en]').forEach((label) => {
        const text = lang === 'ar' ? label.getAttribute('data-label-ar') : label.getAttribute('data-label-en');
        if (text) {
            label.textContent = text;
        }
    });
    const allLabel = document.querySelector('[data-category-value="All"]');
    if (allLabel) {
        allLabel.textContent = lang === 'ar' ? 'الكل' : 'All';
    }
};

const navigateWithCategory = (category) => {
    const search = getParams('search') || '';
    const country = getParams('country') || '';
    const targetCategory = category || '';
    if (overlayElement) {
        overlayElement.style = '';
        overlayElement.classList.remove('loaded');
    }
    window.location.href = `/productsSearch/?category=${targetCategory}&page=1&search=${search}&country=${country}&lang=${activeLang}`;
};

optionElements.forEach((option) => {
    const wrap = option.querySelector('.check-wrap');
    if (!wrap) {
        return;
    }
    wrap.addEventListener('click', () => {
        const label = option.querySelector('[data-category-value]');
        const value = label ? label.getAttribute('data-category-value') : '';
        const input = option.querySelector('input[type="radio"]');
        if (input) {
            input.checked = true;
        }
        clearSelection();
        highlightSelection(wrap);
        navigateWithCategory(value);
    });
});

if (activeLang === 'ar') {
    document.querySelectorAll('.LearnMore').forEach((element) => {
        element.innerHTML = 'اعرف المزيد';
    });
}

updateCategoryLabels();

clearSelection();
const currentCategory = getParams('category');
if (!currentCategory) {
    highlightSelection(checkWraps[0]);
} else {
    const selectedOption = optionElements.find((option) => {
        const label = option.querySelector('[data-category-value]');
        return label && label.getAttribute('data-category-value') === currentCategory;
    });
    const wrap = selectedOption ? selectedOption.querySelector('.check-wrap') : null;
    highlightSelection(wrap || checkWraps[0]);
}

const searchButton = document.getElementById('Searchbtn');
if (searchButton) {
    searchButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (overlayElement) {
            overlayElement.style = '';
            overlayElement.classList.remove('loaded');
        }
        const searchInput = this.previousElementSibling;
        const searchValue = searchInput ? searchInput.value : '';
        const category = getParams('category') || '';
        const page = getParams('page') || 1;
        const country = getParams('country') || '';
        window.location.href = `/productsSearch/?category=${category}&page=${page}&search=${searchValue}&country=${country}&lang=${activeLang}`;
    });
}

const countrySelect = document.getElementById('selectCountries');
if (countrySelect) {
    countrySelect.addEventListener('change', function (event) {
        event.preventDefault();
        if (overlayElement) {
            overlayElement.style = '';
            overlayElement.classList.remove('loaded');
        }
        const category = getParams('category') || '';
        const page = getParams('page') || 1;
        const search = getParams('search') || '';
        const country = this.value || '';
        window.location.href = `/productsSearch/?category=${category}&page=${page}&search=${search}&country=${country}&lang=${activeLang}`;
    });
}

