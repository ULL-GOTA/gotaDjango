// ######### Fichero JavaScript principal ###########

	  //######## Sistemas de referencia ##############
	  //http://spatialreference.org/ref/epsg/32628/proj4/

	  //crs:84 --> EPSG:4326 ##########
	  var crs4326 = new L.Proj.CRS('EPSG:4326',
	  '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');      
	  
    //Creación sistema referencia EPSG:32628 (WGS-84/UTM-28N), para mapas de Grafcan.########
    var crs32628 = new L.Proj.CRS('EPSG:32628',
	  '+proj=utm +zone=28 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');	                  
	  
      
      //########## Adición de capa(s) base: ##############
      
      // 1º) Directamente con openstreetmap ##########
      
      //L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Mapa de pruebas. AluULL', maxZoom: 18}).addTo(map);
      
      // 2º) A través de Mapbox (previa solicitud token acceso). El id permite varios estilos de mapa.############
      
    var outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicHJ1ZWJhbWFwYm94MjIzMiIsImEiOiJja3dtYXR0ZnkyYTFtMm9xdnBoNWtlYmZyIn0.G7xjcWG47ApIc-7HMp6QpA', { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> ', maxZoom: 18, id: 'mapbox.satellite'});
	  //, accessToken: 'your.mapbox.access.token' .addTo(map); 
      
      
      //########## Adición de OVERLAYS (manualmente): ##############

    var ortofoto = L.tileLayer.wms('https://idecan1.grafcan.es/ServicioWMS/OrtoExpressCIR?',{
	  layers: 'ortoexpressCIR',
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
      format: 'image/png',
      transparent: true,
      version: '1.3.0',
      crs: crs32628,
    });
		          
    //######################### SERVICIOS WMS DE PRUEBAS #####################
    
    
    var test_WMS= "http://10.6.128.184/ncWMS/wms"; //wmsServer_GOTA

    switch(window.location.pathname){
	case '/copernicus/':
	  test_WMS= "https://nrt.cmems-du.eu/thredds/wms/cmems_mod_ibi_phy_anfc_0.027deg-3D_P1D-m";
	  break;
	case '/eumetsat/':
	  test_WMS= "https://view.eumetsat.int/geoserver/msg_fes/rgb_airmass/ows";
	  break;
    }

    //LEER CAPAS AUTOMATICAMENTE DESDE FICHERO XML EN SERVIDOR WMS-SERVER (GetCapabilities)

    var xhttp = new XMLHttpRequest();
    
    //Función a ejecutar cuando server responde OK.
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);          
        }        
    };

    //###### consultar 'GetCapabilities' WMS Server #########  
    xhttp.open("GET", test_WMS + '?request=GetCapabilities&service=WMS&VERSION=1.3.0', true);
    xhttp.send(); //se ejecuta (.onreadystatechange)

    function myFunction(xml) {
        var xmlDoc = xml.responseXML;
        var layerNodes = xmlDoc.getElementsByTagName("Layer");
	      var OnlineResource= xmlDoc.getElementsByTagName("OnlineResource");

        var nam, tit, abstr, legOK, bboxOK, layer, tdLayer, n, dim;
        leg=[]; //vector con direcc. leyendas
	      ejeZ=[]; //vector con alturas de cada capa
	      defaultZ=[]; //Vector con alturas por defecto
        ntitCapas=[[]]; //Vector con nombre, titulo y abstract de capas (matriz TRIdimensional)
        bbox=[[]]; //vector con datos etiqueta <BoundingBox> (matriz BIdimensional)       
        
        for (var i=0; i < layerNodes.length; i++) { 
        //for (var i=0; i < 3; i++) {//========================== PRUEBAS CON UN Nº CONCRETO DE CAPAS ====================
          if (layerNodes[i].hasAttribute('queryable')){            
		        ejeZ.push(null);
		        defaultZ.push(null);            

            //NOMBRES de las capas,
            nam = (layerNodes[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue);
            ntitCapas[ntitCapas.length-1][0]= nam;           
               
            //Descripcion de la capa
            tit = (layerNodes[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue);
            ntitCapas[ntitCapas.length-1][1]= tit;

            //Abstract de la capa
            abstr = (layerNodes[i].getElementsByTagName("Abstract")[0].childNodes[0].nodeValue);
            ntitCapas[ntitCapas.length-1][2]= abstr;

            ntitCapas.push([]);            
                
            layer = L.tileLayer.wms(test_WMS, {
              layers: nam,
              format: 'image/png',
              transparent: true,
              opacity: 0.5,
              crs: L.CRS.EPSG4326,
              attribution: 'gotaWeb 1.0 -ULL-'
            });

            //Dimensión de altura/profundidad (elevationDimension)            
		        dim= layerNodes[i].getElementsByTagName("Dimension");            
            n= 0;
            while (n < dim.length) {       		  
		          if (dim[n].getAttribute('name')== 'elevation'){                
              ejeZ[ejeZ.length-1]= dim[n].childNodes[0].nodeValue.split(',');
              defaultZ[defaultZ.length-1]= dim[n].getAttribute('default');
		          }
		          n++;      
		        }

            //timeDimension-plugin
            tdLayer = L.timeDimension.layer.wms(layer, {cache:100, setDefaultTime:true});                                 
            capas.addBaseLayer(tdLayer,tit);	//Adición de capa al control de capas                                        

            //Leyenda asociada a la capa (NO SIEMPRE EXISTE)
            legOK = layerNodes[i].getElementsByTagName("LegendURL");
            leg.push(legOK[0] ? legOK[0].getElementsByTagName("OnlineResource")[0].getAttribute('xlink:href') : null);

            //Lectura de la etiqueta <BoundingBox>            
            bboxOK= layerNodes[i].getElementsByTagName("BoundingBox");
            //bbox[bbox.length-1].push(bboxOK[0].getAttribute('CRS'));  //######### Casi siempre se repiten los valores...
            bbox[bbox.length-1].push(bboxOK[0].getAttribute('minx'));
            bbox[bbox.length-1].push(bboxOK[0].getAttribute('miny'));
            bbox[bbox.length-1].push(bboxOK[0].getAttribute('maxx'));
            bbox[bbox.length-1].push(bboxOK[0].getAttribute('maxy'));
            bbox.push([]);

          }//end_if
        }//end_for
    };//end_function    

  //Se añaden las capas (en la 2º forma)
  var map = L.map('map', {                        
      //Archipiélago canario:            
      center: [28.25, -15.82],
      zoom: 8,
      layers: outdoors, //Capa por defecto.      
      
      // #####  (plugin leaflet.TimeDimension) ##########
      timeDimension: true,      
      timeDimensionControl: true,
      
      //MODIFICAR PARÁMETROS PARA INTENTAR ACELERAR LA SECUENCIA
      timeDimensionControlOptions:{
          loopButton: true,
          playerOptions:{
          //transitionTime: 250, //(250= 4fps)
          //buffer: 1,
          //minBufferReady: 1,
          }
      }
  });
  
  //añade un control de escala
  L.control.scale().addTo(map);
  
  //Mapas base  ## BASELAYERS ##
  var baseLayers = {
      //"CurvasNivel": outdoors,
  };
  
  //Capas de informacion  ## OVERLAYS ##
  var overlays = {
      "Municipios canarios": municipios,
      "OrtoFoto": ortofoto,
  };
  
  //####### incluir leyenda ############/
    var leyenda;
    testLegend = L.control({
        position: 'bottomleft',
    });

   testLegend.onAdd = function(){        
        var div = L.DomUtil.create('div', 'info legend');
	      leyenda!=null ? div.innerHTML = '<img src="' + leyenda + '" alt="legend">' : div.innerHTML = "<b style='background-color:white'>=== NO LEGEND! ===</b>";        
        return div;
    };

    //=========================

    //## EVENTO: cambio de capa-base #########    
    var $slider = $('#slider');
    var $opacidad= $('#opacidad');
    var coll = document.getElementsByClassName("collapsible");
    var  k; //indice de ntitCapas    
    $('#rt1').html('0'); //valor inicial de la etiqueta

    map.on('baselayerchange', function(changeLayer){
      k=0;
      while (k < capas._layers.length){        
          if (changeLayer.name == ntitCapas[k][1]){
          leyenda = leg[k];
          testLegend.addTo(map);			//se ejecuta testLegend.onAdd()
          coll[0].childNodes[0].nodeValue= ntitCapas[k][1];
          
          //OPACIDAD
          $opacidad.val(25); //condición inicial del slider
          changeLayer.layer.setOpacity(0.25);
          $('#sf2').css('width', 0.25*240);
          $(document).on('input', '#opacidad', function() {
            changeLayer.layer.setOpacity($opacidad.val()/100);      
            $('#sf2').css('width', ($opacidad.val()/100)*240);            
          });          
          
          //ALTURA
          if (defaultZ[k] != null){
            $slider.attr({'max': ejeZ[k].length-1});  //tamanyo vector
            $slider.val(ejeZ[k].indexOf(defaultZ[k])); //Número de POSICIÓN del valor "default" de ELEVATION.
            var $slider_fill= ($slider.val()/(ejeZ[k].length-1)) * 240; //(*)
            $('#sf1').css('width', $slider_fill);
            $('#rt1').text(Number(ejeZ[k][$slider.val()]).toPrecision(4)); //valor por defecto de la capa en la etiqueta

            $(document).on('input', '#slider', function() {
              $slider_fill= ($slider.val()/(ejeZ[k].length-1)) * 240; //(*)
              //(*) ancho slider_fill
              changeLayer.layer.setParams({elevation:ejeZ[k][$slider.val()]});                        
              $('#sf1').css('width', $slider_fill);            
              $('#rt1').text(Number(ejeZ[k][$slider.val()]).toPrecision(4));
            });
          } else{            
            $slider.val(0);            
            $('#sf1').css('width', 0);
            $('#rt1').html('No-Alt');
          }
          break;
        }//end_inf
        k++;
      }//endWHILE      
    });

		//#########  #########
    
  //añade un control de capas        
    var capas = L.control.layers(baseLayers, overlays).addTo(map);

  //adicción de capa VECTORIAL
    $.getJSON("static/gotaweb/json/wind-global.json", function(data) {
      windGlobal = L.velocityLayer({
        displayValues: true,
        displayOptions: {
          velocityType: "Global Wind",
          position: "topright",
          emptyString: "No wind data"
        },
        data: data,
        maxVelocity: 15
      });
      capas.addOverlay(windGlobal, "Wind - Global");
    });

  //añade un marcador: 
  // www.etsii.ull.es
  L.marker([28.4829825, -16.3220933]).addTo(map).
      bindPopup('Etsii-ULL');//.openPopup();       


//============== PERFILES VERTICALES y SERIES TEMPORALES =========

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
  pointPV= (test_WMS+"?REQUEST=GetVerticalProfile&LAYERS="+(ntitCapas[k][0])+"&QUERY_LAYERS="+(ntitCapas[k][0])+"&BBOX="+(bbox[k])+"&SRS=CRS:84&HEIGHT="+map.getSize().y+"&WIDTH="+map.getSize().x+"&X=" + event.containerPoint.x + "&Y=" + event.containerPoint.y + "&VERSION=1.1.1&INFO_FORMAT=image/png");
  pointTS= (test_WMS+"?REQUEST=GetTimeseries&LAYERS="+(ntitCapas[k][0])+"&QUERY_LAYERS="+(ntitCapas[k][0])+"&BBOX="+(bbox[k])+"&SRS=CRS:84&HEIGHT="+map.getSize().y+"&WIDTH="+map.getSize().x+"&X=" + event.containerPoint.x + "&Y=" + event.containerPoint.y + "&VERSION=1.1.1&INFO_FORMAT=image/png");
}

map.on('click', pointToString); //evento 'click' sobre el mapa
map.on('click', onMapClick); //evento 'click' sobre el mapa

//###################

var content = coll[0].nextElementSibling;

coll[0].addEventListener('mouseover', function() {    
  this.classList.toggle("active");    
  content.style.maxHeight = content.scrollHeight + "px"; //abre 'persiana'
  content.getElementsByTagName('p')[0].childNodes[0].nodeValue= ntitCapas[k][2]    
});

coll[0].addEventListener('mouseleave', function() {
  this.classList.toggle("active");
  content.style.maxHeight = null; //cierra 'persiana'
});
