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


function CalculatePaint() {
  var PaintAmount = 0;
  var SurfaceArea = 0;
  length = $('#length').val();
  width = $('#width').val();
  height = $('#height').val();
  doors = $('#doors').val();
  windows = $('#windows').val();

  SurfaceArea = ((length * height + width * height) * 2) - (2 * 1 * doors) - (1 * 1 * windows);
  PaintAmount = ((SurfaceArea * 2) / 13).toFixed(2);

  $("#surface").html(SurfaceArea + " Square Meters");
  $("#amount").html(PaintAmount + " Litres");
}

function myFunction() {
  debugger;
  var PaintAmount = $('#amount').html();;
  var SurfaceArea = $('#surface').html();;
  length = $('#length').val();
  width = $('#width').val();
  height = $('#height').val();
  doors = $('#doors').val();
  windows = $('#windows').val();

  var link = "/en/Products/Print?ProcutName=Antique Scumble Glaze&PaintAmount=" + PaintAmount + "&SurfaceArea=" + SurfaceArea + "&length=" + length + "&width=" + width + "&height=" + height + "&doors=" + doors + "&windows=" + windows;
  document.location.href = link;
}

function CreatePDFfromHTML() {
  debugger;
  $("#pdflength").text($("#length").val());
  $("#pdfwidth").text($("#width").val());
  $("#pdfheight").text($("#height").val());
  $("#pdfdoors").text($("#doors").val());
  $("#pdfwindows").text($("#windows").val());
  
  $("#pdfsurface").text($("#surface").html());
  $("#pdfamount").text($("#amount").html());
  var HTML_Width = $("#pdfPrint").width();
  var HTML_Height = $("#pdfPrint").height();
  var top_left_margin = 15;
  var PDF_Width = HTML_Width + (top_left_margin * 2);
  var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;

  var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
  $("#pdfPrint").css("display", "block");
  var options = {
      //async: true,
      //allowTaint: false,
      //imageTimeout: 0,
      removeContainer: true,
      //useCORS: true
  }
  html2canvas($("#pdfPrint")[0], options).then(function (canvas) {
      var imgData = canvas.toDataURL("image/jpg", 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      debugger;
      for (var i = 1; i <= totalPDFPages; i++) {
          pdf.addPage(PDF_Width, PDF_Height);
          pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }
      //canvas.clearRect(0, 0, canvas.width, canvas.height); //clear html5 canvas
      pdf.save("Calculator.pdf");
      debugger;
      pdf = null;
      $("#pdfPrint").css("display", "none");
  });
}


document.querySelector('.mainnav').querySelectorAll('li').forEach(e=>{
  e.addEventListener('click',function(){
    document.querySelector('.mainnav').querySelectorAll('li').forEach(e=>{
      e.classList.remove('active')
    })
    document.querySelector(`${this.querySelector('a').getAttribute('href')}`).scrollIntoView({'behavior':'smooth'})
    this.classList.add('active')
  })
})

function myFunction() {
  debugger;
  var PaintAmount = $('#amount').html();;
  var SurfaceArea = $('#surface').html();;
  length = $('#length').val();
  width = $('#width').val();
  height = $('#height').val();
  doors = $('#doors').val();
  windows = $('#windows').val();

  var link = "/en/Products/Print?ProcutName=Antique Scumble Glaze&PaintAmount=" + PaintAmount + "&SurfaceArea=" + SurfaceArea + "&length=" + length + "&width=" + width + "&height=" + height + "&doors=" + doors + "&windows=" + windows;
  document.location.href = link;
}

function CreatePDFfromHTML() {
  debugger;
  $("#pdflength").text($("#length").val());
  $("#pdfwidth").text($("#width").val());
  $("#pdfheight").text($("#height").val());
  $("#pdfdoors").text($("#doors").val());
  $("#pdfwindows").text($("#windows").val());
  
  $("#pdfsurface").text($("#surface").html());
  $("#pdfamount").text($("#amount").html());
  var HTML_Width = $("#pdfPrint").width();
  var HTML_Height = $("#pdfPrint").height();
  var top_left_margin = 15;
  var PDF_Width = HTML_Width + (top_left_margin * 2);
  var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;

  var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
  $("#pdfPrint").css("display", "block");
  var options = {
      //async: true,
      //allowTaint: false,
      //imageTimeout: 0,
      removeContainer: true,
      //useCORS: true
  }
  html2canvas($("#pdfPrint")[0], options).then(function (canvas) {
      var imgData = canvas.toDataURL("image/jpg", 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      debugger;
      for (var i = 1; i <= totalPDFPages; i++) {
          pdf.addPage(PDF_Width, PDF_Height);
          pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }
      //canvas.clearRect(0, 0, canvas.width, canvas.height); //clear html5 canvas
      pdf.save("Calculator.pdf");
      debugger;
      pdf = null;
      $("#pdfPrint").css("display", "none");
  });
}

if(localStorage.getItem('nobleLang')=='ar')
document.querySelectorAll('.LearnMore').forEach(e=>{
  e.innerHTML = 'اعرف المزيد';
});

console.log(localStorage.getItem('nobleLang')=='ar')
if(localStorage.getItem('nobleLang')=='ar'){
  calculate.querySelector('.row').style = 'justify-content:flex-end'
}

document.querySelectorAll('.toRep3').forEach(e=>{
  e.href = e.href + `&lang=${localStorage.getItem('nobleLang')}`
})