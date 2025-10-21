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
const checkWraps = Array.from(document.querySelectorAll('.check-wrap'));
const radioWraps = Array.from(document.querySelectorAll('.radio-wrap'));

const clearSelection = () => {
    checkWraps.forEach((wrap) => wrap.classList.remove('checked'));
    radioWraps.forEach((wrap) => wrap.classList.remove('is-selected'));
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

checkWraps.forEach((wrap) => {
    wrap.addEventListener('click', () => {
        clearSelection();
        highlightSelection(wrap);
        const label = wrap.parentElement.querySelector('label');
        const category = label ? label.getAttribute('name') : '';
        navigateWithCategory(category);
    });
});

if (activeLang === 'ar') {
    document.querySelectorAll('.LearnMore').forEach((element) => {
        element.innerHTML = 'اعرف المزيد';
    });
}

radioWraps
    .filter((wrap, index) => wrap.getAttribute('lang') === activeLang && index > 0)
    .forEach((wrap) => {
        wrap.classList.remove('hidden');
    });

clearSelection();
const currentCategory = getParams('category');
if (!currentCategory) {
    highlightSelection(checkWraps[0]);
} else {
    const selected = checkWraps.find((wrap) => {
        const parent = wrap.parentElement;
        if (!parent || parent.classList.contains('hidden')) {
            return false;
        }
        const label = parent.querySelector('label');
        return label && label.getAttribute('name') === currentCategory;
    });
    highlightSelection(selected || checkWraps[0]);
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

if (radioWraps.length) {
    const allLabel = radioWraps[0].querySelector('label');
    if (allLabel) {
        allLabel.innerHTML = activeLang === 'ar' ? 'الكل' : 'All';
    }
}
