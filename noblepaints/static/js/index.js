(function () {
  const FEATURED_IDS = new Set([68, 71, 78, 80, 36, 20, 113, 64, 104, 76]);
  const toolsGrid = document.querySelector('[data-essential-tools]');
  if (!toolsGrid) {
    return;
  }

  const emptyState = document.querySelector('[data-essential-empty]');
  const currentLang = window.APP_LANG || localStorage.getItem('nobleLang') || document.documentElement.lang || 'en';

  const formatDescription = (value) => {
    if (!value) {
      return '';
    }
    const withoutHtml = value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
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

    const description = document.createElement('p');
    description.textContent = formatDescription(product.desc);

    const actions = document.createElement('div');
    actions.className = 'essential-tool-card__actions';

    const cta = document.createElement('a');
    cta.className = 'btn btn-outline-primary w-100';
    cta.href = `/product/?id=${encodeURIComponent(product.id)}&lang=${encodeURIComponent(currentLang)}`;
    cta.textContent = currentLang === 'ar' ? 'تصفح المنتج' : 'View product';

    actions.appendChild(cta);
    body.appendChild(title);
    body.appendChild(description);
    body.appendChild(actions);
    card.appendChild(media);
    card.appendChild(body);

    return card;
  };

  const renderProducts = (products) => {
    const featuredProducts = products.filter((item) => FEATURED_IDS.has(item.id));

    if (!featuredProducts.length) {
      if (emptyState) {
        emptyState.hidden = false;
      }
      return;
    }

    const fragment = document.createDocumentFragment();
    featuredProducts.forEach((product) => {
      fragment.appendChild(createCard(product));
    });

    toolsGrid.appendChild(fragment);
    if (emptyState) {
      emptyState.hidden = true;
    }
  };

  fetch(`/getProducts/?lang=${encodeURIComponent(currentLang)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load products');
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        return;
      }
      renderProducts(data);
    })
    .catch(() => {
      if (emptyState) {
        emptyState.hidden = false;
      }
    });
})();
