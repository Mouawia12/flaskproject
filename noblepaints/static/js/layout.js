(() => {
    const TRANSLATIONS = window.BASE_TRANSLATIONS || {};
    const PAGE_TRANSLATIONS = window.PAGE_TRANSLATIONS || {};

    const getStoredLanguage = () => {
        try {
            return (
                window.localStorage.getItem("nobleLangCPanel") ||
                window.localStorage.getItem("nobleLang") ||
                null
            );
        } catch (error) {
            return null;
        }
    };

    const STORED_LANG = getStoredLanguage();
    const ACTIVE_LANG = window.APP_LANG || STORED_LANG || "en";

    const mergeTranslations = () => {
        const merged = {};
        const langs = new Set([
            ...Object.keys(TRANSLATIONS),
            ...Object.keys(PAGE_TRANSLATIONS),
        ]);
        langs.forEach((lang) => {
            merged[lang] = {
                ...(TRANSLATIONS[lang] || {}),
                ...(PAGE_TRANSLATIONS[lang] || {}),
            };
        });
        return merged;
    };

    const ALL_TRANSLATIONS = mergeTranslations();

    const replaceTokens = (value) => {
        if (typeof value !== "string") {
            return value;
        }
        return value.replace("{year}", new Date().getFullYear());
    };

    const t = (key) => {
        const langBucket = ALL_TRANSLATIONS[ACTIVE_LANG] || {};
        if (key in langBucket) {
            return replaceTokens(langBucket[key]);
        }
        const fallbackBucket = ALL_TRANSLATIONS.en || {};
        if (key in fallbackBucket) {
            return replaceTokens(fallbackBucket[key]);
        }
        return key;
    };

    const applyTranslations = () => {
        document
            .querySelectorAll("[data-i18n-key]")
            .forEach((element) => {
                const key = element.getAttribute("data-i18n-key");
                if (!key) {
                    return;
                }
                const attr = element.getAttribute("data-i18n-attr");
                const value = t(key);
                if (attr) {
                    element.setAttribute(attr, value);
                } else {
                    element.innerHTML = value;
                }
            });

        const pageTitle = document.querySelector("[data-i18n-document]");
        if (pageTitle) {
            const key = pageTitle.getAttribute("data-i18n-document");
            if (key) {
                document.title = t(key);
            }
        }
    };

    const updateDirection = () => {
        const dir = ACTIVE_LANG === "ar" ? "rtl" : "ltr";
        document.documentElement.setAttribute("lang", ACTIVE_LANG);
        document.documentElement.setAttribute("dir", dir);
        document.body.dir = dir;
    };

    const rememberLanguage = () => {
        try {
            const keys = ["nobleLang"];
            if (document.body.classList.contains("admin-body")) {
                keys.push("nobleLangCPanel");
            }
            keys.forEach((key) => window.localStorage.setItem(key, ACTIVE_LANG));
        } catch (error) {
            // Ignore storage errors (private mode etc.)
        }
    };

    const setupLanguageSwitchers = () => {
        document.querySelectorAll("[data-lang-switch]").forEach((trigger) => {
            trigger.addEventListener("click", (event) => {
                event.preventDefault();
                const lang = trigger.getAttribute("data-lang-switch");
                if (!lang || lang === ACTIVE_LANG) {
                    return;
                }
                const url = new URL(window.location.href);
                url.searchParams.set("lang", lang);
                window.location.href = url.toString();
            });
        });
    };

    const markActiveNavigation = () => {
        const path = window.location.pathname.replace(/\/+$/, "") || "/";
        document.querySelectorAll("[data-nav-match]").forEach((link) => {
            const match = link.getAttribute("data-nav-match");
            if (!match) {
                return;
            }
            const normalisedMatch = match.replace(/\/+$/, "") || "/";
            const isActive =
                path === normalisedMatch ||
                (normalisedMatch !== "/" && path.startsWith(normalisedMatch));
            if (isActive) {
                link.classList.add("active");
            }
        });
    };

    const resolveIconClass = (value) => {
        if (!value) {
            return null;
        }
        const trimmed = value.trim();
        if (!trimmed) {
            return null;
        }
        if (trimmed.includes(" ")) {
            return trimmed;
        }
        const normalised = trimmed.replace(/^fa-/, "");
        const brands = new Set([
            "facebook",
            "facebook-f",
            "instagram",
            "linkedin",
            "linkedin-in",
            "youtube",
            "x-twitter",
            "twitter",
            "snapchat",
            "tiktok",
            "whatsapp",
            "behance",
            "dribbble",
        ]);
        if (trimmed.startsWith("fa-solid") || trimmed.startsWith("fa-regular") || trimmed.startsWith("fa-brands")) {
            return trimmed;
        }
        if (brands.has(normalised)) {
            return `fa-brands fa-${normalised}`;
        }
        return `fa-solid fa-${normalised}`;
    };

    const socialIcons = () => {
        const container = document.querySelector("[data-social-feed]");
        if (!container) {
            return;
        }
        fetch("/getsocialIcons/")
            .then((response) => (response.ok ? response.json() : []))
            .then((icons) => {
                if (!Array.isArray(icons)) {
                    return;
                }
                const frag = document.createDocumentFragment();
                icons.forEach((icon) => {
                    if (!icon.link || !icon.icon) {
                        return;
                    }
                    const iconClass = resolveIconClass(icon.icon);
                    if (!iconClass) {
                        return;
                    }
                    const anchor = document.createElement("a");
                    anchor.className = "social-link";
                    anchor.href = icon.link;
                    anchor.target = "_blank";
                    anchor.rel = "noopener";
                    anchor.innerHTML = `<i class="${iconClass}"></i>`;
                    frag.appendChild(anchor);
                });
                if (frag.childNodes.length) {
                    container.innerHTML = "";
                    container.appendChild(frag);
                }
            })
            .catch(() => {
                // Ignore fetch errors; social icons are non-critical.
            });
    };

    const overlayElement = document.querySelector(".page-overlay");
    const overlay = {
        show() {
            if (overlayElement) {
                overlayElement.classList.add("visible");
            }
        },
        hide() {
            if (overlayElement) {
                overlayElement.classList.remove("visible");
            }
        },
    };

    window.AppOverlay = overlay;
    window.getLang = () => ACTIVE_LANG;

    document.addEventListener("DOMContentLoaded", () => {
        updateDirection();
        applyTranslations();
        rememberLanguage();
        setupLanguageSwitchers();
        markActiveNavigation();
        socialIcons();
    });

    window.addEventListener("pageshow", () => {
        overlay.hide();
    });
})();
