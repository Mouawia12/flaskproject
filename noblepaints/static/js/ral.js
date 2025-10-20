/*[...document.querySelector('#colors').querySelectorAll('tr')].filter((_,i)=>i>0).forEach((e,i)=>{
    let name = e.querySelectorAll('td')[0].innerHTML + ' ' + e.querySelectorAll('td')[3].innerHTML
    let color = e.querySelectorAll('td')[1].innerHTML
    contentarea.querySelectorAll('li')[i].querySelector('a').setAttribute('title',name)
    contentarea.querySelectorAll('li')[i].querySelector('a').innerHTML = `<span style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:bold">${e.querySelectorAll('td')[0].innerHTML}</span><span>${e.querySelectorAll('td')[3].innerHTML}</span></span>`
    contentarea.querySelectorAll('li')[i].querySelector('a').style.background = color
})*/


contentarea.querySelectorAll('li').forEach(e=>{
    e.querySelector('a').href = '#'
})