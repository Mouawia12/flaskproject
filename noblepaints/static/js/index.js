$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
    // Avoid following the href location when clicking
    event.preventDefault(); 
    // Avoid having the menu to close when clicking
    event.stopPropagation(); 

    // opening the one you clicked on and closing siblings that were already open
    $(this).parent().siblings().removeClass('open'); /* removes open class on dropdowns that are already open*/
    $(this).parent().toggleClass('open'); /* adds class open on the dropdown that is being clicked on*/
    //$('.dropdown-submenu').not($(this)).parent().removeClass('open');

    var menu = $(this).parent().find("ul");
    var menupos = menu.offset();
  
    if ((menupos.left + menu.width()) + 30 > $(window).width()) {
        var newpos = - menu.width();      
    } else {
        var newpos = $(this).parent().width();
    }
    menu.css({ left:newpos });

});


var swiper = new Swiper("#swiper1", {
    effect: "fade",
    autoplay: {
        delay:3000,
        disableOnInteraction: false,
        observer: false,
        observeParents: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
});


/********************/


if(this.localStorage.getItem('nobleLang')=='ar'){
  document.documentElement.style.setProperty("--swipertrans", 'translate(-1000px,-50%)');
  document.querySelectorAll('.containerAbs').forEach(e=>{
    e.style.right = `${(window.innerWidth - document.querySelector('#navbar').offsetWidth)/2}px`
    e.style.left = `unset`
    if(e.style.right=='0px'){
      e.style.right = '20px'
    }
  })
  document.querySelectorAll('.swiper-text-box').forEach(e=>{
    e.style.direction = 'rtl'
  })
}
else{
  document.querySelectorAll('.containerAbs').forEach(e=>{
    e.style.left = `${(window.innerWidth - document.querySelector('#navbar').offsetWidth)/2}px`
    if(e.style.left=='0px'){
      e.style.left = '20px'
    }
  })
  document.querySelectorAll('.swiper-text-box').forEach(e=>{
    e.style.direction = 'ltr'
  })
}
  

if(this.localStorage.getItem('nobleLang')=='ar')
  document.querySelectorAll('.swiper-img-box').forEach(e=>{
    e.style.left = `${(window.innerWidth - document.querySelector('#navbar').offsetWidth)/2}px`
    e.style.right = `unset`
    e.querySelector('img').style.right = `unset`
    e.querySelector('img').style.left = `0`
})
else
document.querySelectorAll('.swiper-img-box').forEach(e=>{
  e.style.right = `${(window.innerWidth - document.querySelector('#navbar').offsetWidth)/2}px`
})

window.addEventListener('resize',function(){
  if(this.localStorage.getItem('nobleLang')=='ar')
  document.querySelectorAll('.containerAbs').forEach(e=>{
    e.style.right = `${(window.innerWidth - document.querySelector('#navbar').offsetWidth)/2}px`
    if(e.style.right=='0px'){
      e.style.right = '20px'
    }
    e.style.left = `unset`
  })
  else
  document.querySelectorAll('.containerAbs').forEach(e=>{
    e.style.left = `${(window.innerWidth - document.querySelector('#navbar').offsetWidth)/2}px`
    if(e.style.left=='0px'){
      e.style.left = '20px'
    }
  })
  if(this.localStorage.getItem('nobleLang')=='ar')
  document.querySelectorAll('.swiper-img-box').forEach(e=>{
    e.style.left = `${(window.innerWidth - document.querySelector('#navbar').offsetWidth)/2}px`
    e.style.right = `unset`
    e.querySelector('img').style.right = `unset`
    e.querySelector('img').style.left = `0`
  })
  else
  document.querySelectorAll('.swiper-img-box').forEach(e=>{
    e.style.right = `${(window.innerWidth - document.querySelector('#navbar').offsetWidth)/2}px`
  })
});
var swiper5 
/****************************************************/

(async function(){
  await fetch(`/getProducts/?lang=en`)
.then(res=>res.json())
.then(async (res)=>{
  for([i,x] of Object.entries(res)){
    if(x.id==68||x.id==71||x.id==78||x.id==80||x.id==36||x.id==20||x.id==113||x.id==64||x.id==104||x.id==76){
      document.querySelector('#swiper2').querySelector('.swiper-wrapper').insertAdjacentHTML('beforeend',`
      <div class='gamesList_content_div2 adventure popular all swiper-slide swiper-slide5'>
      <img src="${x.img ? x.img : '/static/images/prod01.png'}">
      <div>
          <h3 style="color:#2c2c2c;height: fit-content;">${x.name}</h3>
          <span>${x.desc}</span>
      </div>
      <div>
          <a href="/product/?id=${x.id}" style="color:inherit;width:100%"><span style="width:100%" class="btn btn-success btn-block btn2 btn2radius-big btn2-width">${localStorage.getItem('nobleLang')!='ar'?'Learn More':'تصفح'}</span></a>
      </div>
      <span style="background-image:url('${x.img ? x.img : '/static/images/prod01.png'}')"></span>
      </div>
    `)
    }
  }

  swiper5 = new Swiper("#swiper2", {
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
})
})()




let videoS = function(){
  if(document.querySelector('video').paused){
    document.querySelector('video').play()
    document.querySelector('header').querySelector('img').style.display = 'block'
    document.querySelector('video').style.display = 'none'
  }
  else{
    document.querySelector('header').querySelector('img').style.display = 'none'
    document.querySelector('video').style.display = 'block'
  }
}

document.addEventListener('DOMContentLoaded',videoS)

setInterval(()=>{
  videoS()
},1000)