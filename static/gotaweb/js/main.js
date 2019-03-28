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
	  
	  geologico = L.tileLayer.wms("http://mapas.igme.es/gis/services/Cartografia_Geologica/IGME_Geologico_1M/MapServer/WMSServer", {
	      layers: '0',//*nombre capa (layer queryable al consultar la 'get capabilities' de la web wms)
	      format: 'image/png',
	      transparent: true,
	      //version: '1.0.0', //version por defecto
	      attribution: "Cartografia Geologica"
	  }),
      
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
            opacity: 0.6,
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
      //"OrtoFoto": ortofoto,      
      //"CurvasNivel": outdoors,            
      //"Callejero": streets,      
      'Municipios': municipios,
  };
  
  //Capas de informacion  
  var overlays = {
      //"Comarcas": comarcas,
      //"Geologico": geologico,
      //"PinoCanario": pinar,
    'r_cloud':	r_cloud,
    'r_rain':	r_rain,
    'r_ice':	r_ice,
    'r_snow':	r_snow,
    'r_graup':	r_graup,
    'Z_sfc':	Z_sfc,
    'SST':	SST,
    'T_sfc':	T_sfc,
    'p_sfc':	p_sfc,
    'slp':	slp,
    'T_2m':	T_2m,
    'Td_2m':	Td_2m,
    'r_v_2m':	r_v_2m,
    'q_2m':	q_2m,
    'rh_2m':	rh_2m,
    'u_10m_gr':	u_10m_gr,
    'v_10m_gr':	v_10m_gr,
    'u_10m_tr':	u_10m_tr,
    'v_10m_tr':	v_10m_tr,
    'ws_10m':	ws_10m,
    'wd_10m':	wd_10m,
    'precip_g':	precip_g,
    'precip_c':	precip_c,
    'SW_d':	SW_d,
    'LW_d':	LW_d,
    'albedo':	albedo,
    'SH':	SH,
    'LH':	LH,
    'u_star':	u_star,
    'LWP':	LWP,
    'IWP':	IWP,
    'LandMask':	LandMask,
    'LandUse':	LandUse,
    'SeaIce':	SeaIce,
    'Z_p':	Z_p,
    'T_p':	T_p,
    'Td_p':	Td_p,
    'r_v_p':	r_v_p,
    'q_p':	q_p,
    'u_tr_pv_tr_pgroup':	u_tr_pv_tr_pgroup,
    'u_tr_pv_tr_pmag':	u_tr_pv_tr_pmag,
    'u_tr_pv_tr_pdir':	u_tr_pv_tr_pdir,
    'u_tr_p':	u_tr_p,
    'v_tr_p':	v_tr_p,            
  };
  
  //añade un control de capas
  L.control.layers(overlays, baseLayers).addTo(map);
  
  
  //añade un marcador
  //www.etsii.ull.es
  L.marker([28.4829825, -16.3220933]).addTo(map).
      bindPopup('Etsii-ULL');//.openPopup();       
