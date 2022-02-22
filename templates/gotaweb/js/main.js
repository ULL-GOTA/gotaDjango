// ######### Fichero JavaScript principal ###########
  	  
	  //######## Sistemas de referencia ##############
	  //http://spatialreference.org/ref/epsg/32628/proj4/
	  //crs:84 --> EPSG:4326 ##########
	  var crs4326 = new L.Proj.CRS('EPSG:4326',
	  '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');      
	  
      //Creación sistema referencia EPSG:32628 (WGS-84/UTM-28N), para mapas de Grafcan.########
//      var crs32628 = new L.Proj.CRS('EPSG:32628',
//	  '+proj=utm +zone=28 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');	                  
	  
      
      //########## Adición de capa(s) base: ##############
      
      // 1º) Directamente con openstreetmap ##########
      
      //L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Mapa de pruebas. AluULL', maxZoom: 18}).addTo(map);
      
      // 2º) A través de Mapbox (previa solicitud token acceso). El id permite varios estilos de mapa.############
      
	  var outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicHJ1ZWJhbWFwYm94MjIzMiIsImEiOiJja3dtYXR0ZnkyYTFtMm9xdnBoNWtlYmZyIn0.G7xjcWG47ApIc-7HMp6QpA', { attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> ', maxZoom: 18, id: 'mapbox.satellite'});
	//, accessToken: 'your.mapbox.access.token' .addTo(map); 
      
      
      //########## Adición de OVERLAYS (manualmente): ##############
      /*
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
		          
	  pinar = L.tileLayer.wms('http://wms.magrama.es/sig/Biodiversidad/MFE27/wms.aspx', {
	      layers: 'Pinar de pino canario (Pinus canariensis)',//*nombre capa (layer queryable al consultar la 'get capabilities' de la web
	      format: 'image/png',
	      transparent: true,
	      version: '1.1.1', //version por defecto
	      attribution: "Pinar Canario.",
	  });*/	  	  
	  
      //CAPAS DE PRUEBA gotaWeb ################
      /*  
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
        });*/

    //##############################################
    //##############################################
    
    //var test_WMS = "https://wms.gota-ull.net:8443/ncWMS/wms";
    //var test_WMS = "https://nrt.cmems-du.eu/thredds/wms/cmems_mod_ibi_phy_anfc_0.027deg-3D_P1D-m";
    var test_WMS = "https://ogcie.iblsoft.com/metocean/wms";


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
        var nam, tit, legOK, layer, tdLayer, n, dim;
        leg=[]; //vector con direcc. leyendas
	      ejeZ=[]; //vector con alturas de cada capa
	      defaultZ=[]; //Vector con alturas por defecto
	      //var dim={};
        
        //for (var i=0; i < layerNodes.length; i++) { 
        for (var i=0; i < 58; i++) {//========================== PRUEBAS CON UN Nº CONCRETO DE CAPAS ====================	      
	    
          if (layerNodes[i].hasAttribute('queryable')){            
		        ejeZ.push(null);
		        defaultZ.push(null);

            //NOMBRES de las capas,
            nam = (layerNodes[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue);                         
                
            //Descripcion de la capa
            tit = (layerNodes[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue);
                
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
          }//end_if
        }//end_for
        //alert('Capas habilitadas.');  //Confirmación carga capas
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
      //"OrtoFoto": ortofoto,      
      //"CurvasNivel": outdoors,                  
  };
  
  //Capas de informacion  ## OVERLAYS ##
  var overlays = {
      //"Municipios canarios": municipios,          
      //"PinoCanario": pinar,
      //'temp' : L.timeDimension.layer.wms(T_2m, {cache:50}),      
      //'TEST_LAYER': L.timeDimension.layer.wms(testLayer, {cache:100, updateTimeDimension: true}),
  };


  //####### incluir sliders (elevación/opacidad) ############/

	var sliderElev = document.getElementById("myRange");
	var output = document.getElementById("demo1");
	var sliderOpacity= document.getElementById("opacidad");


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

    //## EVENTO: cambio de capa-base #########

	  var k;
    map.on('baselayerchange', function(changeLayer){
      k=0; 
      while (k < capas._layers.length){
        //alert(capas._layers[k].name);
        if (changeLayer.name == capas._layers[k].name){                
          leyenda = leg[k];
          testLegend.addTo(map);			//se ejecuta testLegend.onAdd()

          //OPACIDAD
          sliderOpacity.value= 50;		//condición inicial del slider
          //changeLayer.layer.setOpacity(0.5); //condición inicial de la opacidad de la capa
          sliderOpacity.oninput= function(){	//evento -cambia sliderOpacity-
            changeLayer.layer.setOpacity(this.value/100);
          }
          
          //ALTURA          
          sliderElev.max= ejeZ[k].length-1;
          sliderElev.value= ejeZ[k].indexOf(defaultZ[k]); //Número de POSICIÓN del valor "default" de ELEVATION.          
          output.innerHTML = defaultZ[k];	//condición inicial                    
          sliderElev.oninput = function() {	//evento -cambia sliderElevation-		        
            output.innerHTML = ejeZ[k][sliderElev.value];            
            changeLayer.layer.setParams({elevation:ejeZ[k][sliderElev.value]});
		      };
          break;
        }//end_inf
        k++;
      }//endWHILE 
    });

		//#########  #########
    
  //añade un control de capas        
    var capas = L.control.layers(baseLayers, overlays).addTo(map);    

  //añade un marcador: 
  // www.etsii.ull.es
  L.marker([28.4829825, -16.3220933]).addTo(map).
      bindPopup('Etsii-ULL');//.openPopup();       
