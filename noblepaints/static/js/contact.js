window.intlTelInput(document.querySelector('#inputphone'),{})

$('.contact-us-section .countryrow .countryname').click(function () {
    debugger;
    var trig = $(this);
    if (trig.hasClass('activetab')) {
        trig.next('.contact-us-section .countryrow .stores').slideToggle('slow');
        trig.removeClass('activetab');
    } else {
        $('.activetab').next('.contact-us-section .countryrow .stores').slideToggle('slow');
        $('.activetab').removeClass('activetab');
        trig.next('.contact-us-section .countryrow .stores').slideToggle('slow');
        trig.addClass('activetab');
    };
    return false;
});



if(localStorage.getItem('nobleLang')=='ar'){
    document.querySelector('.countryname').style = 'background-position: 0% 50%;'
    document.querySelector('.countryname img').style = 'margin-right: -2px;margin-left: 19px;'
    document.querySelector('.stores ul').style = 'border-right: 1px solid #dee2e6;border-left:0;'
}

submit.addEventListener('click',async function(evt){
    evt.preventDefault()
    let data = {
        'name':document.querySelector('#inputname').value,
        'comp':document.querySelector('#inputcomp').value,
        'email':document.querySelector('#inputemail').value,
        'phone':document.querySelector('.iti__selected-flag').getAttribute("title").split(': ')[1] + document.querySelector('#inputphone').value,
        'message':document.querySelector('#inputmessage').value,
        'type':document.querySelector('#inputtype').value
      }
      console.log(data)
      await fetch(`/sendC/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(()=>{
        if(localStorage.getItem('nobleLang')=='ar')
        Swal.fire(
            'تم تلقي طلبك',
            'سيتم التواصل معك في أقرب وقت',
            'success'
          )
        else
        Swal.fire(
            'Thanks!',
            'We\'ll contact you as soon as possible',
            'success'
          )
      })
})

if(localStorage.getItem('nobleLang')=='ar'){
    let ca = [
        `الإسم`,
        `اسم الشركة`,
        `البريد الإلكتروني`,
        `رقم الهاتف`,
        `الوظائف`,
        `التسويق`,
        `المبيعات المحلية`,
        `مبيعات التصدير`,
        `الدعم الفني`,
        `إرسال`,
    ]
    document.querySelectorAll('.text10').forEach((e,i)=>{
        if(i!=4&&i!=5&&i!=6&&i!=7&&i!=8)
        e.placeholder = ca [i]
        if(i==4||i==5||i==6||i==7||i==8){
            e.value = ca[i]
            e.innerHTML = ca[i]
        }
        if(i==9){
            e.innerHTML = ca[i]
        }
        

    })
}

document.querySelector('.iti__selected-flag').querySelector('div').classList = 'iti__flag iti__sa'
document.querySelector('.iti__selected-flag').setAttribute("title","Saudi Arabia ( العربية السعودية): +966")

