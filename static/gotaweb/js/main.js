//clase central, coordenadas y zoom predefinido
  
  //1º forma de incluirlo
  //Archipiélago canario
  /*var map = L.map('map').
  setView([28.25, -15.82], 7.5);*/
  
  //añade 'tile Layer'/mosaico
      //directamente con openstreetmap
	  /*L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Mapa de pruebas. AluULL', maxZoom: 18}).addTo(map);*/
      
      //a través de Mapbox (previa solicitud token acceso). El id permite varios estilos de mapa.
      
	  //Creación sistema referencia EPSG:32628 (WGS-84/UTM-28N), para mapas de Grafcan.
	  //PRUEBAS=============
	  //http://spatialreference.org/ref/epsg/32628/proj4/
	  var crs32628 = new L.Proj.CRS('EPSG:32628',
	  '+proj=utm +zone=28 +ellps=WGS84 +datum=WGS84 +units=m +no_defs',
	  {
	      resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5]
	  });                
	  
      //2º forma: Se crea como variable para incluirlo como capa.    
	  var ortofoto = L.tileLayer.wms('https://idecan1.grafcan.es/ServicioWMS/OrtoExpress?',{
	  layers: 'ortoexpress',
	  //styles: 'default',
	  //continuousWorld: true,
	  format: 'image/jpeg',
	  //transparent: true,
	  version: '1.3.0',                
	  crs: crs32628,
	  }),
	  
	  municipios = L.tileLayer.wms('https://idecan2.grafcan.es/ServicioWMS/CARTO_EST?',{
	  layers: 'MUN',
	  //styles: 'default',
	  //continuousWorld: true,
	  format: 'image/png',
	  transparent: true,
	  version: '1.3.0',                
	  crs: crs32628,
	  }),
	  
	  comarcas = L.tileLayer.wms('https://idecan2.grafcan.es/ServicioWMS/CARTO_EST?',{
	  layers: 'CME1',
	  //styles: 'default',
	  //continuousWorld: true,
	  format: 'image/png',
	  transparent: true,
	  version: '1.3.0',                
	  crs: crs32628,
	  }),
	  
	  streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWx1MDEwMTA2OTkzNyIsImEiOiJjanNvb2hkY3gwbXFyM3lxbHdtY25wZnI2In0.wE4Ct1TZ5cBmcg0QabheJw', { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> ', maxZoom: 18, id: 'mapbox.streets' }),//, accessToken: 'your.mapbox.access.token'                
	  
	  outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWx1MDEwMTA2OTkzNyIsImEiOiJjanNvb2hkY3gwbXFyM3lxbHdtY25wZnI2In0.wE4Ct1TZ5cBmcg0QabheJw', { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> ', maxZoom: 18, id: 'mapbox.outdoors'}),//, accessToken: 'your.mapbox.access.token' .addTo(map);
	  //SERVICIOS WMS
	  
	  pinar = L.tileLayer.wms('http://wms.magrama.es/sig/Biodiversidad/MFE27/wms.aspx', {
	      layers: 'Pinar de pino canario (Pinus canariensis)',//*nombre capa (layer queryable al consultar la 'get capabilities' de la web
	      format: 'image/png',
	      transparent: true,
	      version: '1.1.1',
	      attribution: "Pinar Canario.",
	  }),                
	  
	  geologico = L.tileLayer.wms("http://mapas.igme.es/gis/services/Cartografia_Geologica/IGME_Geologico_1M/MapServer/WMSServer", {
	      layers: '0',//*nombre capa (layer queryable al consultar la 'get capabilities' de la web wms)
	      format: 'image/png',
	      transparent: true,
	      //version: '1.0.0',
	      attribution: "Cartografia Geologica"
	  });

  //Se añaden las capas (en la 2º forma)
  var map = L.map('map', {                        
      //Archipiélago canario            
      center: [28.25, -15.82],
      zoom: 7.5,
      layers: ortofoto //Capa por defecto.
  });        
  
  //añade un control de escala
  L.control.scale().addTo(map);
  
  //Mapas base
  var baseLayers = {
      "OrtoFoto": ortofoto,
      "CurvasNivel": outdoors,            
      "Callejero": streets            
  };
  //Capas de informacion
  var overlays = {            
      "Comarcas": comarcas,
      "Municipios": municipios,
      "Geologico": geologico,
      "PinoCanario": pinar
  };
  
  //añade un control de capas
  L.control.layers(baseLayers, overlays).addTo(map);
  
  //añade un marcador
  //www.etsii.ull.es
  L.marker([28.4829825, -16.3220933]).addTo(map).
      bindPopup('Etsii-ULL');//.openPopup();       
