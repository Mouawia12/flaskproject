var swiper = new Swiper("#swiper1", {
    espaceBetween: 0,
    loop:true,
    navigation: {
      nextEl: ".swiper-button-prev",
      prevEl: ".swiper-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    mousewheel: false,
    keyboard: true,
    breakpoints: {
      // when window width is <= 499px
      499: {
        slidesPerView: 2,
      },
      767: {
          slidesPerView: 3,
      },
      1000: {
        slidesPerView: 3,
      },
      1200: {
          slidesPerView: 4,
      },
      3000: {
        slidesPerView: 4,
    },
  }
});

var swiper5 = new Swiper("#swiper2", {
    spaceBetween: 30,
    loop:true,
    navigation: {
      nextEl: ".swiper-button-prev",
      prevEl: ".swiper-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    mousewheel: false,
    keyboard: true,
    breakpoints: {
      // when window width is <= 499px
      499: {
        slidesPerView: 2,
      },
      767: {
          slidesPerView: 3,
      },
      1000: {
        slidesPerView: 3,
      },
      1200: {
          slidesPerView: 4,
      },
      3000: {
        slidesPerView: 4,
    },
  }
});

let bgMap = new Map([
  ['Decorative Interior Paints','/static/images/headerCus01.png'],
  ['Decorative Interior Trust Hygienic','/static/images/headerCus02.png'],
  ['Decorative Exterior','/static/images/headerCus03.png'],
  ['Automotive Paint','/static/images/headerCus04.png'],
  ['Industrial Coatings','/static/images/headerCus05.png'],
  ['Protective Paints','/static/images/headerCus06.png'],
  ['Wood Stain','/static/images/headerCus07.png'],
  ['Fire Intumescent Paints','/static/images/headerCus08.png'],
  ['Floor Coating  &Road Marking','/static/images/headerCus09.png'],
  ['Powder Coatings','/static/images/headerCus10.png'],
  ['Adhesives','/static/images/headerCus11.png'],
  ['Thinners','/static/images/headerCus12.png'],
])
document.querySelector('header').style.background = `url("${bgMap.get(document.querySelector('.subpage').querySelector('span').innerHTML)}")`