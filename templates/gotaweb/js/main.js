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
	  }),                
	  
	  /*geologico = L.tileLayer.wms("http://mapas.igme.es/gis/services/Cartografia_Geologica/IGME_Geologico_1M/MapServer/WMSServer", {
	      layers: '0',//*nombre capa (layer queryable al consultar la 'get capabilities' de la web wms)
	      format: 'image/png',
	      transparent: true,
	      //version: '1.0.0', //version por defecto
	      attribution: "Cartografia Geologica"
	  }),*/
      
      //CAPAS gotaWeb ********************
      
        r_cloud = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/r_cloud',
            crs: crs4326,
            opacity: 0.6,
            //format: 'image/png',          
            //transparent: true,          
            //styles: 'default-scalar/default',	      
            //attribution: "Capa de nubes"
        }),
               
        r_rain = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/r_rain',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        r_ice = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/r_ice',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        r_snow = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/r_snow',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        r_graup = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/r_graup',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        Z_sfc = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/Z_sfc',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        SST = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/SST',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        T_sfc = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/T_sfc',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        p_sfc = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/p_sfc',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        slp = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/slp',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        T_2m = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/T_2m',
            crs: crs4326,
            opacity: 0.8,
        }),
        
        Td_2m = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/Td_2m',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        r_v_2m = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/r_v_2m',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        q_2m = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/q_2m',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        rh_2m = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/rh_2m',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        u_10m_gr = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/u_10m_gr',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        v_10m_gr = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/v_10m_gr',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        u_10m_tr = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/u_10m_tr',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        v_10m_tr = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/v_10m_tr',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        ws_10m = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/ws_10m',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        wd_10m = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/wd_10m',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        precip_g = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/precip_g',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        precip_c = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/precip_c',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        SW_d = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/SW_d',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        LW_d = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/LW_d',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        albedo = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/albedo',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        SH = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/SH',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        LH = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/LH',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        u_star = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/u_star',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        LWP = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/LWP',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        IWP = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/IWP',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        LandMask = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/LandMask',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        LandUse = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/LandUse',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        SeaIce = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/SeaIce',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        Z_p = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/Z_p',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        T_p = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/T_p',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        Td_p = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/Td_p',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        r_v_p = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/r_v_p',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        q_p = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/q_p',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        u_tr_pv_tr_pgroup = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/u_tr_p:v_tr_p-group',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        u_tr_pv_tr_pmag = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/u_tr_p:v_tr_p-mag',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        u_tr_pv_tr_pdir = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/u_tr_p:v_tr_p-dir',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        u_tr_p = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/u_tr_p',
            crs: crs4326,
            opacity: 0.6,
        }),
        
        v_tr_p = L.tileLayer.wms("http://10.6.5.230:8080/ncWMS2/wms", {
            layers: '20190321/v_tr_p',
            crs: crs4326,
            opacity: 0.6,
        }),
		
    testWMS= "http://thredds.socib.es/thredds/wms/observational/hf_radar/hf_radar_ibiza-scb_codarssproc001_L1_agg/hf_radar_ibiza-scb_codarssproc001_L1_agg_best.ncd",
    
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
	});

    
    //Probando plugin 'leaflet.wms' (capa virtual)    

	var catastro = L.WMS.source("http://www.ign.es/wms-inspire/pnoa-ma?SERVICE=WMS&", {
   		  opacity: 0.5,
	});	
    
    var geologico = L.WMS.source('http://mapas.igme.es/gis/services/Cartografia_Geologica/IGME_Geologico_1M/MapServer/WMSServer');
    
    /*geologico.getLayer('0').addTo(map);
    
    var MySource = L.WMS.Source.extend({
        'ajax': function(url, callback) {
            $.ajax(url, {
                'context': this,
                'success': function(result) {
                    callback.call(this, result);
                }
            });
        },
        'showFeatureInfo': function(latlng, info) {
            $('.output').html(info);
        }
    });*/
    
    
    //LEER CAPAS AUTOMATICAMENTE DESDE FICHERO XML EN SERVIDOR
    //WMS-SERVER (GetCapabilities)
    var xhttp = new XMLHttpRequest();
    
    //No esta listo (onreadystatechange) hasta que se ejecuta
    //todo el resto del codigo JS.
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
            capas.addBaseLayer(geologico.getLayer(nam[0]),tit[0]);
            alert(typeof(leg[0]));
        }
    };
    
    xhttp.open("GET", "http://mapas.igme.es/gis/services/Cartografia_Geologica/IGME_Geologico_1M/MapServer/WMSServer?request=GetCapabilities&service=WMS", true);
    
    xhttp.send(); //se ejecuta (.onreadystatechange)
        
    function myFunction(xml) {
        var xmlDoc = xml.responseXML;
        var layerNodes = xmlDoc.getElementsByTagName("Layer");
        nam=[]; //vector con los 'nombres' de las capas
        tit=[]; //vector con las 'descripciones' de las capas        
        leg=[]; //vector con las leyendas
        
        //ignoramos el primer "Layer"[i=0]
        for (var i = 1; i < layerNodes.length; i++) {  
            //La siguiente variable recoge los NOMBRES de las capas,
            // que es realmente lo que interesa
            nam.push(layerNodes[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue); 
            
            tit.push(layerNodes[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue);            
            
            //****** LEER ATRIBUTO DEL NODO DE LA LEYENDA ????
            //leg.push(layerNodes[i].getElementsByTagName("Format")[0].childNodes[0].nodeValue);
        };
    };

  //Se añaden las capas (en la 2º forma)
  var map = L.map('map', {                        
      //Archipiélago canario:            
      center: [28.25, -15.82],
      //Ibiza-pruebas:
      //center: [38.705, 1.15],
      zoom: 7.5,
      layers: [outdoors, testLayer], //Capa por defecto.      
      // (plugin leaflet.TimeDimension)
      timeDimension: true,
      timeDimensionOptions: {
          //timeInterval: "2019-03-21T18:00:00.000Z/2019-03-23T18:00:00.000Z",
          //currentTime: Date.parse("2019-03-21T18:00:00.000Z"),
          timeInterval: "2015-09-01T18:00:00.000Z/2015-09-03T18:00:00.000Z",
          currentTime: Date.parse("2015-09-01T18:00:00.000Z"),
          period: "PT1H",          
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
      //"Municipios": municipios,
      'Catastro': catastro.getLayer("OI.MosaicElement"), //lo contrario, NO FUNCIONA!!
  };
  
  //Capas de informacion  
  var overlays = {
      //"Comarcas": comarcas,
      //"Geologico": geologico,
      //"PinoCanario": pinar,
    /*'r_cloud': L.timeDimension.layer.wms(r_cloud),
    'r_rain': L.timeDimension.layer.wms(r_rain),
    'r_ice': L.timeDimension.layer.wms(r_ice),
    'r_snow': L.timeDimension.layer.wms(r_snow),
    'r_graup': L.timeDimension.layer.wms(r_graup),
    'Z_sfc': L.timeDimension.layer.wms(Z_sfc),
    'SST': L.timeDimension.layer.wms(SST),
    'T_sfc': L.timeDimension.layer.wms(T_sfc),
    'p_sfc': L.timeDimension.layer.wms(p_sfc),
    'slp': L.timeDimension.layer.wms(slp),*/
    'testLayerIbiza': L.timeDimension.layer.wms(testLayer, {cache:50}),
    'T_2m': L.timeDimension.layer.wms(T_2m, {cache:50}),
    /*'Td_2m': L.timeDimension.layer.wms(Td_2m, {cache:50}),
    'r_v_2m': L.timeDimension.layer.wms(r_v_2m, {cache:50}),
    'q_2m': L.timeDimension.layer.wms(q_2m, {cache:50}),
    'rh_2m': L.timeDimension.layer.wms(rh_2m, {cache:50}),
    'u_10m_gr': L.timeDimension.layer.wms(u_10m_gr, {cache:50}),
    'v_10m_gr': L.timeDimension.layer.wms(v_10m_gr, {cache:50}),
    'u_10m_tr': L.timeDimension.layer.wms(u_10m_tr, {cache:50}),
    'v_10m_tr': L.timeDimension.layer.wms(v_10m_tr, {cache:50}),
    'ws_10m': L.timeDimension.layer.wms(ws_10m, {cache:50}),
    'wd_10m': L.timeDimension.layer.wms(wd_10m, {cache:50}),
    'precip_g': L.timeDimension.layer.wms(precip_g, {cache:50}),
    'precip_c': L.timeDimension.layer.wms(precip_c, {cache:50}),
    'SW_d': L.timeDimension.layer.wms(SW_d, {cache:50}),
    'LW_d': L.timeDimension.layer.wms(LW_d, {cache:50}),
    'albedo': L.timeDimension.layer.wms(albedo, {cache:50}),
    'SH': L.timeDimension.layer.wms(SH), {cache:50},
    'LH': L.timeDimension.layer.wms(LH), {cache:50},
    'u_star': L.timeDimension.layer.wms(u_star), {cache:50},
    'LWP': L.timeDimension.layer.wms(LWP), {cache:50},
    'IWP': L.timeDimension.layer.wms(IWP), {cache:50},*/
    /*'LandMask': L.timeDimension.layer.wms(LandMask),
    'LandUse': L.timeDimension.layer.wms(LandUse),
    'SeaIce': L.timeDimension.layer.wms(SeaIce),
    'Z_p': L.timeDimension.layer.wms(Z_p),
    'T_p': L.timeDimension.layer.wms(T_p),
    'Td_p': L.timeDimension.layer.wms(Td_p),
    'r_v_p': L.timeDimension.layer.wms(r_v_p),
    'q_p': L.timeDimension.layer.wms(q_p),
    'u_tr_pv_tr_pgroup': L.timeDimension.layer.wms(u_tr_pv_tr_pgroup),
    'u_tr_pv_tr_pmag': L.timeDimension.layer.wms(u_tr_pv_tr_pmag),
    'u_tr_pv_tr_pdir': L.timeDimension.layer.wms(u_tr_pv_tr_pdir),
    'u_tr_p': L.timeDimension.layer.wms(u_tr_p),
    'v_tr_p': L.timeDimension.layer.wms(v_tr_p),*/
  };
  
  
  //incluir leyenda
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
    testLegend.addTo(map);  
  
    
  //añade un control de capas        
    var capas = L.control.layers(overlays,baseLayers).addTo(map);      
  

  //añade un marcador
  //www.etsii.ull.es
  L.marker([28.4829825, -16.3220933]).addTo(map).
      bindPopup('Etsii-ULL');//.openPopup();       
