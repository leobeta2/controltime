var divMapa = document.getElementById('mapa');

  navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);
  function fn_mal(){}
  function fn_ok(respuesta){
    var lat = respuesta.coords.latitude;
    var lon = respuesta.coords.longitude;
    var coordenada = lat+','+lon;

    divMapa.innerHTML = '<img src="http://maps.googleapis.com/maps/api/staticmap?size=1200x800&markers='+coordenada+'"/>';

  }
