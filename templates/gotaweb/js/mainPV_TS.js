// ######### Fichero JavaScript principal ###########
  	  
	  //######## Sistemas de referencia ##############
	  //http://spatialreference.org/ref/epsg/32628/proj4/
	  //crs:84 --> EPSG:4326 ##########
	  var crs4326 = new L.Proj.CRS('EPSG:4326',
	  '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');      
	  
      //Creación sistema referencia EPSG:32628 (WGS-84/UTM-28N), para mapas de Grafcan.########
      var crs32628 = new L.Proj.CRS('EPSG:32628',
	  '+proj=utm +zone=28 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');	                  
	  
      
      //########## Adicion de capa(s) base: ##############
      
      var outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicHJ1ZWJhbWFwYm94MjIzMiIsImEiOiJja3dtYXR0ZnkyYTFtMm9xdnBoNWtlYmZyIn0.G7xjcWG47ApIc-7HMp6QpA', { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> ', maxZoom: 18, id: 'mapbox.satellite'});

    //##########################################################

    var gfsTemp = L.tileLayer.wms("https://ogcie.iblsoft.com/metocean/wms", {
                    layers: 'gfs-temperature-isbl',
                    format: 'image/png',
                    transparent: true,
                    opacity: 0.5,
                    crs: L.CRS.EPSG4326,		  
		            //maxZoom: 8,
                    //elevation: 850,
                    //attribution: 'gotaWeb 1.0 -ULL-'
                });

    var foamTemp = L.tileLayer.wms("http://godiva.rdg.ac.uk/ncWMS2/wms", {
                    layers: 'foam/TMP',
                    format: 'image/png',
                    transparent: true,
                    opacity: 0.5,
                    crs: L.CRS.EPSG4326,
                });

    //##############################################
    //##############################################
    
    var test_WMS = "http://godiva.rdg.ac.uk/ncWMS2/wms";
    //var test_WMS = "https://ogcie.iblsoft.com/metocean/wms";
    //var test_WMS = "https://wms.gota-ull.net:8443/ncWMS/wms";
    //var test_WMS = "https://nrt.cmems-du.eu/thredds/wms/cmems_mod_ibi_phy_anfc_0.027deg-3D_P1D-m";
    

    //##############################################
  var map = L.map('map', {                        
      //Archipiélago canario:            
      center: [28.25, -15.82],
      zoom: 8,
      layers: outdoors, //Capa por defecto.            
  });

    
  //añade un control de escala
  L.control.scale().addTo(map);
  
  //Mapas base  ## BASELAYERS ##
  var baseLayers = {      
    // SIN baseLayers (pruebas)
  };
  
  //Capas de informacion  ## OVERLAYS ##
  var overlays = {
	"GFS-Temp-IsobLev": gfsTemp,
	"foam-Temp": foamTemp
  };
  
  //añade un control de capas        
    var capas = L.control.layers(baseLayers, overlays).addTo(map);

  //añade un marcador: 
  // www.etsii.ull.es
  L.marker([28.4829825, -16.3220933]).addTo(map).
      bindPopup('Etsii-ULL');//.openPopup();       


var bboxFoamTmp = [-180.0,-81.5,180.0,89.5];
var bbox= bboxFoamTmp.toString(); //opcionalmente, cambia a 'string' cuando uses la variable.


var popup = L.popup();
var pointPV, pointTS;
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
	.setContent("<h3>Coordenadas: </h3><b>"+ e.latlng +
			'</b><p><h4><a href="javascript:abreWindowPV();">Perfil vertical</a></p>'+
			'<p><a href="javascript:abreWindowTS();">Time Series</a></p></h4>')
        .openOn(map);
}

function abreWindowPV(event) {
	window.open(pointPV,"_blank","width=750, height=600");
}

function abreWindowTS(event) {
	window.open(pointTS,"_blank","width=750, height=600");
}

function pointToString(event) {
	pointPV= (test_WMS+"?REQUEST=GetVerticalProfile&LAYERS=foam/TMP&QUERY_LAYERS=foam/TMP&BBOX="+bbox+"&SRS=CRS:84&FEATURE_COUNT=5&HEIGHT="+map.getSize().y+"&WIDTH="+map.getSize().x+"&X=" + event.containerPoint.x + "&Y=" + event.containerPoint.y + "&VERSION=1.1.1&INFO_FORMAT=image/png");
	pointTS= (test_WMS+"?REQUEST=GetTimeseries&LAYERS=foam/TMP&QUERY_LAYERS=foam/TMP&BBOX="+bbox+"&SRS=CRS:84&FEATURE_COUNT=5&HEIGHT="+map.getSize().y+"&WIDTH="+map.getSize().x+"&X=" + event.containerPoint.x + "&Y=" + event.containerPoint.y + "&ELEVATION=5&VERSION=1.1.1&INFO_FORMAT=image/png");
}

map.on('click', pointToString); //evento 'click' sobre el mapa
map.on('click', onMapClick); //evento 'click' sobre el mapa
//==================================
