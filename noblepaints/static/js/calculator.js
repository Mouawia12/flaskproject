function CalculatePaint() {
    var PaintAmount = 0;
    var SurfaceArea = 0;
    length = $('#length').val();
    width = $('#width').val();
    height = $('#height').val();
    doors = $('#doors').val();
    windows = $('#windows').val();

    SurfaceArea = ((length * height + width * height) * 2) - (2 * 1 * doors) - (1 * 1 * windows);
    PaintAmount = ((SurfaceArea * 2) / 8.46).toFixed(2);

    $("#surface").html(SurfaceArea + " Square Meters");
    $("#amount").html(PaintAmount + " Litres");
}

document.querySelectorAll('.toRep3').forEach(e=>{
    e.href = e.href + `?lang=${localStorage.getItem('nobleLang')}`
  })

