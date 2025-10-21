(function () {
  const grid = document.querySelector('[data-essential-tools]');
  if (!grid) {
    return;
  }

  const FEATURED_ORDER = [68, 71, 78, 80, 36, 20, 113, 64, 104, 76];
  const FEATURED_IDS = new Set(FEATURED_ORDER.map((value) => Number(value)));
  const emptyState = document.querySelector('[data-essential-empty]');
  const section = grid.closest('[data-essential-tools-section]');
  const fallbackLang = 'en';
  const currentLang = (
    window.APP_LANG ||
    localStorage.getItem('nobleLang') ||
    document.documentElement.lang ||
    fallbackLang
  ).trim() || fallbackLang;

  const hasContent = () => grid.children.length > 0;

  const clearStates = () => {
    if (emptyState) {
      emptyState.hidden = true;
    }
    if (section) {
      section.removeAttribute('data-essential-tools-empty');
      section.removeAttribute('data-essential-tools-error');
    }
  };

  const showEmptyState = () => {
    if (hasContent()) {
      clearStates();
      return;
    }
    if (emptyState) {
      emptyState.hidden = false;
    }
    if (section) {
      section.setAttribute('data-essential-tools-empty', '');
      section.removeAttribute('data-essential-tools-error');
    }
  };

  const showErrorState = () => {
    if (hasContent()) {
      clearStates();
      return;
    }
    if (emptyState) {
      emptyState.hidden = false;
    }
    if (section) {
      section.setAttribute('data-essential-tools-error', '');
      section.removeAttribute('data-essential-tools-empty');
    }
  };

  const formatDescription = (value) => {
    if (!value) {
      return '';
    }
    const withoutHtml = String(value)
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (withoutHtml.length <= 160) {
      return withoutHtml;
    }
    return `${withoutHtml.slice(0, 157)}…`;
  };

  const createCard = (product) => {
    const imageUrl = product.img || '/static/images/prod01.png';
    const card = document.createElement('article');
    card.className = 'essential-tool-card';

    const media = document.createElement('div');
    media.className = 'essential-tool-card__media';
    media.style.backgroundImage = `url('${imageUrl}')`;
    media.setAttribute('role', 'img');
    media.setAttribute('aria-label', product.name || 'Product image');

    const body = document.createElement('div');
    body.className = 'essential-tool-card__body';

    const title = document.createElement('h3');
    title.textContent = product.name || '';
    body.appendChild(title);

    const description = formatDescription(product.desc);
    if (description) {
      const descriptionEl = document.createElement('p');
      descriptionEl.textContent = description;
      body.appendChild(descriptionEl);
    }

    const actions = document.createElement('div');
    actions.className = 'essential-tool-card__actions';

    const linkLang = product.lang || currentLang;
    const cta = document.createElement('a');
    cta.className = 'btn btn-outline-primary w-100';
    cta.href = `/product/?id=${encodeURIComponent(product.id)}&lang=${encodeURIComponent(linkLang)}`;
    cta.textContent = linkLang === 'ar' ? 'تصفح المنتج' : 'View product';

    actions.appendChild(cta);
    body.appendChild(actions);
    card.appendChild(media);
    card.appendChild(body);

    return card;
  };

  const renderProducts = (products) => {
    const fragment = document.createDocumentFragment();
    products.forEach((product) => {
      fragment.appendChild(createCard(product));
    });
    grid.innerHTML = '';
    grid.appendChild(fragment);
    clearStates();
  };

  const selectFeatured = (products) => {
    const mapping = new Map();
    products.forEach((item) => {
      if (!item || typeof item.id === 'undefined') {
        return;
      }
      const numericId = Number(item.id);
      if (Number.isNaN(numericId)) {
        return;
      }
      if (!mapping.has(numericId)) {
        mapping.set(numericId, item);
      }
    });

    return FEATURED_ORDER
      .map((id) => mapping.get(id))
      .filter((item) => Boolean(item));
  };

  const fetchProducts = (lang) => fetch(`/getProducts/?lang=${encodeURIComponent(lang)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load products');
      }
      return response.json();
    });

  const hydrate = (products) => {
    if (!Array.isArray(products)) {
      return false;
    }
    const featured = selectFeatured(products);
    if (!featured.length) {
      return false;
    }
    renderProducts(featured);
    return true;
  };

  const attemptLoad = (lang, allowFallback) => fetchProducts(lang)
    .then((data) => {
      const hydrated = hydrate(data);
      if (hydrated) {
        return true;
      }
      if (allowFallback && lang !== fallbackLang) {
        return attemptLoad(fallbackLang, false);
      }
      showEmptyState();
      return false;
    })
    .catch(() => {
      if (allowFallback && lang !== fallbackLang) {
        return attemptLoad(fallbackLang, false);
      }
      showErrorState();
      return false;
    });

  attemptLoad(currentLang, true);
})();
