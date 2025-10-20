

document.querySelector('.garagenav').querySelectorAll('li').forEach((e,i)=>{
    e.addEventListener('click',function(){
        if(e.querySelector('.nav-link').classList.contains('active')){
            e.querySelector('.nav-link').classList.remove('active')
        }
        else{
            document.querySelector('.garagenav').querySelectorAll('li').forEach(e=>{e.querySelector('.nav-link').classList.remove('active')})
            e.querySelector('.nav-link').classList.add('active')
        }
        if(i==0){
            document.querySelector('.garage-section').classList.remove('hidden')
            document.querySelector('#prd2').classList.add('hidden')
        }
        if(i==1){
            document.querySelector('.garage-section').classList.add('hidden')
            document.querySelector('#prd2').classList.remove('hidden')
        }
    })
})