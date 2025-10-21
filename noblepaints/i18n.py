"""Simple in-application internationalisation helpers.

The original project relied on front-end scripts that mutated DOM elements by
array index, which quickly drifted out of sync and produced broken Arabic
translations.  This module centralises shared translations and provides a small
utility for resolving them consistently on both the server and client.
"""

from __future__ import annotations

from typing import Dict, Iterable

AVAILABLE_LANGUAGES: Dict[str, str] = {
    "en": "English",
    "ar": "العربية",
}

# Shared strings used by the public layout (navigation, footer, general UI).
BASE_TRANSLATIONS: Dict[str, Dict[str, str]] = {
    "en": {
        "meta.site_name": "Noble Paints",
        "meta.tagline": "Premium coatings and colour solutions",
        "nav.home": "Home",
        "nav.business_solutions": "Business Solutions",
        "nav.business_solutions.find_product": "Find A Product",
        "nav.business_solutions.product_search": "Product Search",
        "nav.business_solutions.noble_colors": "Noble Colors",
        "nav.business_solutions.ral_colors": "RAL Colors",
        "nav.business_solutions.catalogs": "Catalogs",
        "nav.business_solutions.datasheets": "Technical Datasheets",
        "nav.personal_use": "Personal Use",
        "nav.personal_use.find_product": "Find A Product",
        "nav.categories": "Our Categories",
        "nav.our_story": "Our Story",
        "nav.our_story.about": "About Us",
        "nav.our_story.certificates": "Our Certificates",
        "nav.our_story.approvals": "Approvals",
        "nav.our_story.store": "Find A Store",
        "nav.language": "Language",
        "nav.language.ar": "عربي",
        "nav.language.en": "English",
        "hero.heading.catalogs": "Catalogs",
        "footer.news": "Our News",
        "footer.store_locator": "Store Locator",
        "footer.social_media": "Social Media",
        "footer.contact": "Contact Us",
        "footer.copyright": "Copyright © {year}, Noble Paints Company Ltd.",
        "catalogs.filters.title": "Filter Catalogs",
        "catalogs.filters.category": "Category",
        "catalogs.filters.country": "Country",
        "catalogs.filters.search": "Search",
        "catalogs.filters.reset": "Reset",
        "catalogs.filters.placeholder": "Find a catalog by name",
        "catalogs.meta.summary": "Showing {start}-{end} of {total} catalogs",
        "catalogs.meta.none": "No catalogs available for the selected filters.",
        "catalogs.empty.title": "No catalogs match your filters",
        "catalogs.empty.subtitle": "Try adjusting the filter options or clearing your search terms.",
        "catalogs.card.view": "View",
        "catalogs.card.download": "Download",
        "catalogs.option.all_categories": "All categories",
        "catalogs.option.all_countries": "All countries",
        "auth.login.title": "Administrator Login",
        "auth.login.subtitle": "Access the Noble Paints control panel",
        "auth.login.username": "Username",
        "auth.login.password": "Password",
        "auth.login.submit": "Sign in",
        "auth.login.error": "Incorrect username or password.",
        "auth.login.success": "Welcome back!",
        "auth.logout.success": "You have been signed out.",
        "admin.nav.dashboard": "Dashboard",
        "admin.nav.categories": "Categories",
        "admin.nav.products": "Products",
        "admin.nav.catalogs": "Catalogs",
        "admin.nav.datasheets": "Technical Datasheets",
        "admin.nav.news": "News",
        "admin.nav.certificates": "Certificates",
        "admin.nav.approvals": "Approvals",
        "admin.nav.social": "Social Icons",
        "admin.nav.language": "Language",
        "admin.nav.logout": "Sign out",
        "admin.nav.greeting": "Hello, {name}",
    },
    "ar": {
        "meta.site_name": "دهانات نوبل",
        "meta.tagline": "حلول طلاء وألوان مميزة",
        "nav.home": "الرئيسية",
        "nav.business_solutions": "حلول الأعمال",
        "nav.business_solutions.find_product": "ابحث عن منتج",
        "nav.business_solutions.product_search": "تصفح المنتجات",
        "nav.business_solutions.noble_colors": "ألوان نوبل",
        "nav.business_solutions.ral_colors": "ألوان الرال",
        "nav.business_solutions.catalogs": "الكتالوجات",
        "nav.business_solutions.datasheets": "النشرات الفنية",
        "nav.personal_use": "الاستخدام الشخصي",
        "nav.personal_use.find_product": "ابحث عن منتج",
        "nav.categories": "أقسامنا",
        "nav.our_story": "قصتنا",
        "nav.our_story.about": "من نحن",
        "nav.our_story.certificates": "شهاداتنا",
        "nav.our_story.approvals": "الاعتمادات",
        "nav.our_story.store": "ابحث عن متجر",
        "nav.language": "اللغة",
        "nav.language.ar": "عربي",
        "nav.language.en": "English",
        "hero.heading.catalogs": "الكتالوجات",
        "footer.news": "أخبارنا",
        "footer.store_locator": "مواقع متاجرنا",
        "footer.social_media": "وسائل التواصل الاجتماعي",
        "footer.contact": "تواصل معنا",
        "footer.copyright": "جميع الحقوق محفوظة © {year}، شركة دهانات نوبل المحدودة.",
        "catalogs.filters.title": "تصفية الكتالوجات",
        "catalogs.filters.category": "الفئة",
        "catalogs.filters.country": "الدولة",
        "catalogs.filters.search": "بحث",
        "catalogs.filters.reset": "إعادة تعيين",
        "catalogs.filters.placeholder": "ابحث عن كتالوج بالاسم",
        "catalogs.meta.summary": "عرض {start}-{end} من {total} كتالوج",
        "catalogs.meta.none": "لا توجد كتالوجات مطابقة للإعدادات الحالية.",
        "catalogs.empty.title": "لا توجد كتالوجات مطابقة",
        "catalogs.empty.subtitle": "حاول تعديل خيارات التصفية أو مسح كلمات البحث.",
        "catalogs.card.view": "عرض",
        "catalogs.card.download": "تحميل",
        "catalogs.option.all_categories": "جميع الفئات",
        "catalogs.option.all_countries": "جميع الدول",
        "auth.login.title": "تسجيل دخول المشرف",
        "auth.login.subtitle": "الدخول إلى لوحة التحكم الخاصة بدهانات نوبل",
        "auth.login.username": "اسم المستخدم",
        "auth.login.password": "كلمة المرور",
        "auth.login.submit": "تسجيل الدخول",
        "auth.login.error": "بيانات الدخول غير صحيحة.",
        "auth.login.success": "مرحباً بعودتك!",
        "auth.logout.success": "تم تسجيل الخروج بنجاح.",
        "admin.nav.dashboard": "لوحة التحكم",
        "admin.nav.categories": "الأقسام",
        "admin.nav.products": "المنتجات",
        "admin.nav.catalogs": "الكتالوجات",
        "admin.nav.datasheets": "النشرات الفنية",
        "admin.nav.news": "الأخبار",
        "admin.nav.certificates": "الشهادات",
        "admin.nav.approvals": "الاعتمادات",
        "admin.nav.social": "روابط التواصل",
        "admin.nav.language": "اللغة",
        "admin.nav.logout": "تسجيل الخروج",
        "admin.nav.greeting": "مرحباً، {name}",
    },
}


def get_translation(key: str, lang: str, default: str | None = None) -> str:
    """Return the translation for *key* in *lang* or fall back to English."""
    if lang not in AVAILABLE_LANGUAGES:
        lang = "en"
    lang_bucket = BASE_TRANSLATIONS.get(lang, {})
    if key in lang_bucket:
        return lang_bucket[key]
    fallback = BASE_TRANSLATIONS.get("en", {}).get(key)
    if fallback is not None:
        return fallback
    return default if default is not None else key


def serialise_translations(keys: Iterable[str] | None = None) -> Dict[str, Dict[str, str]]:
    """Return a filtered copy of the base translations suitable for JSON."""
    if keys is None:
        return BASE_TRANSLATIONS
    filtered: Dict[str, Dict[str, str]] = {}
    keys = set(keys)
    for lang, mapping in BASE_TRANSLATIONS.items():
        filtered[lang] = {k: v for k, v in mapping.items() if k in keys}
    return filtered
