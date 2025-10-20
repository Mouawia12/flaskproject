
document.querySelectorAll('.check-wrap').forEach(e=>{
    document.querySelectorAll('.check-wrap').forEach(e=>{
        e.classList.remove('checked')
    })
    e.addEventListener('click',function(){
        document.querySelectorAll('.check-wrap').forEach(e=>{
            e.classList.remove('checked')
        })
        e.classList.add('checked')
        document.querySelector('.overlay').style=''
    document.querySelector('.overlay').classList.remove('loaded')
        location.href = `/TechnicalDatasheets/?category=${e.parentElement.querySelector('label').getAttribute('name')}&page=1&search=${getParams('search')}&country=${getParams('country')}&lang=${localStorage.getItem('nobleLang')}`
    })
});

[...document.querySelectorAll('.radio-wrap')].filter((e,i)=>e.getAttribute('lang')==localStorage.getItem('nobleLang')&&i>0).forEach(e=>{
    e.classList.remove('hidden')
})

if(!getParams('category'))
    [...document.querySelectorAll('.check-wrap')][0].classList.add('checked');
else
[...document.querySelectorAll('.check-wrap')].filter(e=>!e.parentElement.classList.contains('hidden')&&e.parentElement.querySelector('label').getAttribute('name')==getParams('category'))[0]?.classList.add('checked');

Searchbtn.addEventListener('click',function(evt){
    evt.preventDefault()
    document.querySelector('.overlay').style=''
    document.querySelector('.overlay').classList.remove('loaded')
    location.href = `/TechnicalDatasheets/?category=${getParams('category')}&page=${getParams('page')}&search=${this.previousElementSibling.value}&country=${getParams('country')}&lang=${localStorage.getItem('nobleLang')}`
})

selectCountries.addEventListener('change',function(evt){
    evt.preventDefault()
    document.querySelector('.overlay').style=''
    document.querySelector('.overlay').classList.remove('loaded')
    location.href = `/TechnicalDatasheets/?category=${getParams('category')}&page=${getParams('page')}&search=${getParams('search')}&country=${this.value}&lang=${localStorage.getItem('nobleLang')}`
})

function getParams(query){
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
      return params[query];
}




if(localStorage.getItem('nobleLang') == 'ar')
[...document.querySelectorAll('.radio-wrap')][0].querySelector('label').innerHTML = 'الكل'
else
[...document.querySelectorAll('.radio-wrap')][0].querySelector('label').innerHTML = 'All';
