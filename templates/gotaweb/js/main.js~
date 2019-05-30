//clase central, coordenadas y zoom predefinido
  
  //1º forma de incluirlo
  //Archipiélago canario
  /*var map = L.map('map').
  setView([28.25, -15.82], 7.5);*/
  
  //añade 'tile Layer'/mosaico
      //directamente con openstreetmap
	  /*L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Mapa de pruebas. AluULL', maxZoom: 18}).addTo(map);*/
      
      //a través de Mapbox (previa solicitud token acceso). El id permite varios estilos de mapa.
      
	  
	  //Sistemas de referencia
	  //http://spatialreference.org/ref/epsg/32628/proj4/
	  //crs:84 --> EPSG:4326
	  var crs4326 = new L.Proj.CRS('EPSG:4326',
	  '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');      
	  
      //Creación sistema referencia EPSG:32628 (WGS-84/UTM-28N), para mapas de Grafcan.
      var crs32628 = new L.Proj.CRS('EPSG:32628',
	  '+proj=utm +zone=28 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');	                  
	  
      //2º forma: Se crea como variable para incluirlo como capa.    
	  var ortofoto = L.tileLayer.wms('https://idecan1.grafcan.es/ServicioWMS/OrtoExpress?',{
	  layers: 'ortoexpress',
	  //styles: 'default',
	  //continuousWorld: true,
	  format: 'image/jpeg',
	  transparent: true,
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
	  
	  pinar = L.tileLayer.wms('http://wms.magrama.es/sig/Biodiversidad/MFE27/wms.aspx', {
	      layers: 'Pinar de pino canario (Pinus canariensis)',//*nombre capa (layer queryable al consultar la 'get capabilities' de la web
	      format: 'image/png',
	      transparent: true,
	      version: '1.1.1', //version por defecto
	      attribution: "Pinar Canario.",
	  });               	  
      
      //CAPAS DE PRUEBA gotaWeb ********************
        
      var T_2m = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/T_2m',
            crs: crs4326,
            opacity: 0.6,
            format: 'image/png', 
      });

      var albedo = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/albedo',
            crs: crs4326,
            opacity: 0.6,
            format: 'image/png', 
        });
            //********************************
      
    /*PRUEBAS PLUGIN TimeDimension IBIZA **********
    var testWMS= "http://thredds.socib.es/thredds/wms/observational/hf_radar/hf_radar_ibiza-scb_codarssproc001_L1_agg/hf_radar_ibiza-scb_codarssproc001_L1_agg_best.ncd",
    
    testLayer = L.tileLayer.wms(testWMS, {
	  layers: 'sea_water_velocity',
	  version: '1.3.0',
	  format: 'image/png',
	  transparent: true,
	  styles: 'prettyvec/rainbow',
	  markerscale: 15,
	  markerspacing: 10,
	  abovemaxcolor: "extend",
	  belowmincolor: "extend",
	  colorscalerange: "0,0.4",
	  attribution: 'SOCIB HF RADAR | sea_water_velocity'
	});    //************************/

    
    //PROBANDO PLUGIN 'leaflet.wms' (capa virtual)    

	var catastro = L.WMS.source("http://www.ign.es/wms-inspire/pnoa-ma?SERVICE=WMS&", {
   		  opacity: 0.5,
	});	
    
    var geologico = L.WMS.source("http://mapas.igme.es/gis/services/Cartografia_Geologica/IGME_Geologico_1M/MapServer/WMSServer");
    
    var gotaweb_WMS = L.WMS.source('http://10.6.5.230:8080/ncWMS2/wms', {
       crs: crs4326,
       opacity: 0.6,
       format: 'image/png',
    });
    
    
    //LEER CAPAS AUTOMATICAMENTE DESDE FICHERO XML EN SERVIDOR
    //WMS-SERVER (GetCapabilities)
    var xhttp = new XMLHttpRequest();
    
    //No esta listo (onreadystatechange) hasta que se ejecuta
    //todo el resto del codigo JS.
    xhttp.onreadystatechange = function() {
        //if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        //}        
    };
    
    //xhttp.open("GET", "http://mapas.igme.es/gis/services/Cartografia_Geologica/IGME_Geologico_1M/MapServer/WMSServer?request=GetCapabilities&service=WMS", true);
    xhttp.open("GET", "http://10.6.5.230:8080/ncWMS2/wms?request=GetCapabilities&service=WMS", true);
    
    xhttp.send(); //se ejecuta (.onreadystatechange)
        
    function myFunction(xml) {
        var xmlDoc = xml.responseXML;
        var layerNodes = xmlDoc.getElementsByTagName("Layer");               
        var nam, tit, layer,tdLayer; //nombre y titulo de las capas.
        //leg=[]; //vector con las leyendas
        
        //CUIDADO CON LAS CAPAS QUE TENEMOS QUE IGNORAR!!
        //for (var i = 2; i < layerNodes.length; i++) {
        for (var i = 12; i < 13; i++) {
            //La siguiente variable recoge los NOMBRES de las capas,
            // que es realmente lo que interesa
            nam = (layerNodes[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue);                         
            
            //Descripcion de la capa
            tit = (layerNodes[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue);            
            
            //Leyenda asociada a la capa (OJO, NO SIEMPRE EXISTE)
            /*if (var leyenda =  layerNodes[i].getElementsByTagName("OnlineResource")[0].getAttribute('xlink:href')){
                leg.push(leyenda);
            }*/
            //leg.push(layerNodes[i].getElementsByTagName("OnlineResource")[0].getAttribute('xlink:href'));
            
            //L.timeDimension.layer.wms(testLayer, {cache:50});            
            layer = gotaweb_WMS.getLayer(nam);
            
            //timeDimension NO FUNCIONA con plugin de getLayer!!
            //tdLayer = L.timeDimension.layer.wms(layer, {cache:50});
            
            capas.addBaseLayer(layer,tit);
            
            
        }        
    };

  //Se añaden las capas (en la 2º forma)
  var map = L.map('map', {                        
      //Archipiélago canario:            
      center: [28.25, -15.82],
      //Ibiza-pruebas:
      //center: [38.705, 1.15],
      zoom: 7.5,
      layers: outdoors, //Capa por defecto.      
      // (plugin leaflet.TimeDimension)
      timeDimension: true,
      timeDimensionOptions: {
          period: "PT1H",
          timeInterval: "2019-03-21T18:00:00.000Z/2019-03-23T18:00:00.000Z",
          currentTime: Date.parse("2019-03-21T18:00:00.000Z"),
          
          //TEST_IBIZA        
          //timeInterval: "2015-09-01T18:00:00.000Z/2015-09-03T18:00:00.000Z",
          //currentTime: Date.parse("2015-09-01T18:00:00.000Z"),          
      },
      timeDimensionControl: true,
      
      
      //MODIFICAR PARÁMETROS PARA INTENTAR ACELERAR LA SECUENCIA
      timeDimensionControlOptions:{
          loopButton: true,
          playerOptions:{
              //transitionTime: 250, //(250= 4fps)
              buffer: 50,
              //minBufferReady: 100,
          }
      }
  });
    
  //añade un control de escala
  L.control.scale().addTo(map);
  
  //Mapas base
  //var foo = catastro.getLayer("OI.MosaicElement");
  var baseLayers = {
      //"OrtoFoto": ortofoto,      
      //"CurvasNivel": outdoors,            
      //"Callejero": streets,
      "Municipios": municipios,
      //'Catastro': catastro.getLayer("OI.MosaicElement"), //lo contrario, NO FUNCIONA!!
  };
  
  //Capas de informacion
  
  var overlays = {
      //"Comarcas": comarcas,
      //"Geologico": geologico,
      //"PinoCanario": pinar,    
      //'testLayerIbiza': L.timeDimension.layer.wms(testLayer, {cache:50}),      
      'temp' : L.timeDimension.layer.wms(T_2m, {cache:50}),
  };
  /*Object.defineProperty(overlays,'temp',{
      value: L.timeDimension.layer.wms(T_2m, {cache:50}),
  });*/

  
  /***********incluir leyenda
    var testLegend = L.control({
        position: 'bottomright'
    });
    testLegend.onAdd = function(map) {
        var src = testWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=sea_water_velocity&PALETTE=rainbow&colorscalerange=0,0.4";
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML +=
            '<img src="' + src + '" alt="legend">';
        return div;
    };
    testLegend.addTo(map);  **************/
  
    
  //añade un control de capas        
    var capas = L.control.layers(overlays,baseLayers).addTo(map);

  //añade un marcador
 
  //www.etsii.ull.es
  L.marker([28.4829825, -16.3220933]).addTo(map).
      bindPopup('Etsii-ULL');//.openPopup();       
