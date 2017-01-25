var divMapa = document.getElementById('mapa');
var divInfomapa = document.getElementById('infomapa');

  navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);
  function fn_mal(){}
  function fn_ok(respuesta){
    var lat = respuesta.coords.latitude;
    var lon = respuesta.coords.longitude;
    var coordenada = lat+','+lon;

    divMapa.innerHTML = '<img src="http://maps.googleapis.com/maps/api/staticmap?size=700x350&markers='+coordenada+'"/>';
    divInfomapa.innerHTML=coordenada;
  }
