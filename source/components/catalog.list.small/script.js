( function($) {

  'use strict';
  
  $( function() {
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  
    //right menu
    $( '.b-el-small__menu a' ).click( function(e) {
      e.preventDefault();
      $( '.b-el-small__menu a' ).removeClass( 'i-active' );
      $( this ).addClass( 'i-active' );
      $( '[data-tab]' ).hide();
      $( '[data-tab="el-' + $( this ).data( 'href' ) + '"]' ).show();
      
      if ( $( this ).data( 'href' ) === 'list' && !$( '.b-el-small__wrapper' ).length ) {
        getSmallCatalogList();
      }
    });
    
    $( '.b-el-small__menu a:first' ).click();
    
    function getSmallCatalogList() {
      var $el = $( '.b-el-small' );
    
      $.ajax({
        url: $el.data( 'ajax-url' ),
        type: $el.data( 'ajax-method' ),
        dataType: "html",
        success: function( data ) {
        
          $el.html( data );
    
          $( ".b-el-small__i__img-bw" ).each( function() {
            var img = this,
                $img = $( img );
            
            if( img.complete ) {
              show( $img );
            } else {
              $img.load(function() {
                show( $img );
              });
            }
          });
          
          function show( $img ) {
            var delay = Number( Math.random() * 500 ).toFixed(2);
            setTimeout( function() {
              $img.closest( ".b-el-small__i" ).addClass( "i-loaded" );
            }, delay );
            
          }
          
          /*setTimeout( function() {
            $( '.b-el-small' ).niceScroll();
          }, 100);*/
          
        },
        error: function( a, b, c ) {
          if( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    }
  
    //download maps script
    $( '#elSmallMap' ).addClass( 'i-no-map' );
    $( window ).scroll( function() {
      if ( !$( '#elSmallMap' ).hasClass( 'i-no-map' )) {
        return;
      }
      var top = $( document ).scrollTop() + parseInt( window.screen.height ) - 50;
      if ( $( '#elSmallMap.i-no-map' ).offset().top < top ) {
        $( '#elSmallMap' ).removeClass( 'i-no-map' );
        //download map script
        var widget_id = 'dcnRQqScEU';
        var s = document.createElement('script');
        s.async = true;
        s.defer = true;
        s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBIBtmSOttEUoOM-fuV3gEtf_kGoZhm-YE&callback=initMap';
        var ss = document.getElementsByTagName('script')[0];
        ss.parentNode.insertBefore(s, ss);
      }
    }).scroll();
  
  });
  
  //Google maps
      
    window.initMap = function() {
      
      var mapStyle = [
                {elementType: 'geometry', stylers: [{color: '#212121'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#212121'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                {
                  featureType: 'administrative.locality',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#8a8a8a'}]
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#8a8a8a'}]
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.icon',
                  stylers: [{visibility: 'off'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'geometry',
                  stylers: [{color: '#373737'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#8a8a8a'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{color: '#373737'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#373737'}]
                },
                {
                  featureType: 'road',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#8a8a8a'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{color: '#373737'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#373737'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#8a8a8a'}]
                },
                {
                  featureType: 'transit',
                  elementType: 'geometry',
                  stylers: [{color: '#373737'}]
                },
                {
                  featureType: 'transit.station',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#8a8a8a'}]
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{color: '#373737'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#8a8a8a'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.stroke',
                  stylers: [{color: '#212121'}]
                }
              ];
      
      $.ajax({
        url: $( '#elSmallMap' ).data( 'ajax-url' ),
        type: $( '#elSmallMap' ).data( 'ajax-method' ),
        dataType: "json",
        success: function(data) {
          var coords = [0,0];
          /*
          function recursiveZoom(zoom) {
            if (mapHeight < (zoomLatDiff * zoomToPx.lat * zoomRatio) + 40) {//40 is for bullets
              if (zoom <= defaultZoom) {
                zoomRatio /= 2;
                return recursiveZoom(--zoom);
              } else {
                if (mapWidth < (zoomLngDiff * zoomToPx.lng * zoomRatio) + 40) {//40 is for bullets
                  if (zoom <= defaultZoom) {
                    zoomRatio /= 2;
                    return recursiveZoom(--zoom);
                  } else {
                    return zoom;
                  }
                } else {
                  if (zoom >= defaultZoom) {
                    zoomRatio *= 2;
                    return recursiveZoom(++zoom);
                  } else {
                    return zoom;
                  }
                }
              }
            } else {
              if (zoom >= defaultZoom) {
                zoomRatio *= 2;
                return recursiveZoom(++zoom);
              } else {
                if (mapWidth < (zoomLngDiff * zoomToPx.lng * zoomRatio) + 40) {//40 is for bullets
                  if (zoom <= defaultZoom) {
                    zoomRatio /= 2;
                    return recursiveZoom(--zoom);
                  } else {
                    return zoom;
                  }
                } else {
                  if (zoom >= defaultZoom) {
                    zoomRatio *= 2;
                    return recursiveZoom(++zoom);
                  } else {
                    return zoom;
                  }
                }
              }
            }
          }*/
          
          if ( data && typeof data.markers === 'object' ) {
            /*
            //calculate zoom
            var maxLat = 0, maxLng = 0, minLat = 100, minLng = 100;
            var defaultZoom = 12;
            var zoom = defaultZoom;
            var zoomRatio = 1;
            var zoomToPx = {// for zoom 12
              lat: 5172,//height
              lng: 2916//width
            };
            
            data.markers.forEach( function( curr, index, array ) {
              //lat
              if ( curr.position.lat > maxLat ) {
                maxLat = curr.position.lat;
              }
              if ( curr.position.lat < minLat ) {
                minLat = curr.position.lat;
              }
              //lng
              if ( curr.position.lng > maxLng ) {
                maxLng = curr.position.lng;
              }
              if ( curr.position.lng < minLng ) {
                minLng = curr.position.lng;
              }
            });
            
            var zoomLatDiff = maxLat - minLat;
            var zoomLngDiff = maxLng - minLng;
            
            var mapHeight = $( '#elSmallMap' ).height();
            var mapWidth = $( '#elSmallMap' ).width();
            
            zoom = recursiveZoom( zoom );
            */
            
            //calculate center
            if ( typeof data.current === 'object' ) {
              coords = data.current.position;
            } else {
              if ( window.listSmallMapLat && window.listSmallMapLng ) {
                coords = { "lat": window.listSmallMapLat, "lng": window.listSmallMapLng };
              }
            }
            
            var zoom = window.listSmallMapZoom || 12;
            
            //set map
            var map = new google.maps.Map(document.getElementById( 'elSmallMap' ), {
              center: coords,
              zoom: zoom,
              zoomControl: true,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
              styles: mapStyle
            });
            
            //fit bounds
            /*var bounds = new google.maps.LatLngBounds();
            bounds.extend(myLatLng);
            map.fitBounds(bounds);*/
            
            if ( typeof data.current === 'object' ) {
              
              //current marker
              var marker1 = new google.maps.Marker({
                position: coords,
                map: map,
                icon: '/upload/gmaps-marker-current.png'
              });
                
              marker1.addListener('mouseover', function(e) {
                $( '#infoWindow' ).append( '<div class="b-infowindow"><img src="' + data.current.image + '" width="90" height="90" alt=""><div class="b-infowindow__text"><b>' + data.current.title + '</b><br><span>' + data.current.text + '</span></div></div>' );
                
                var gaEvent = e.xa;
                
                for ( var key in e ) {
                  if ( e[ key ] && e[ key ].clientX && e[ key ].clientY ) {
                    gaEvent = e[ key ];
                  }
                }
                
                if ( !gaEvent ) {
                  return;
                }
                
                var left = gaEvent.clientX;
                var top = gaEvent.clientY + (window.pageYOffset || document.documentElement.scrollTop) - (40+90);
                var docWidth = $( document ).width();
                
                if (( docWidth - left ) < 247 ) {
                  left = docWidth - 250;
                }
                
                if ( top < $( '#elSmallMap' ).offset().top ) {
                  top = gaEvent.clientY + 40;
                }
                
                $( '#infoWindow' ).offset({ top: top, left: left });
              });
              
              marker1.addListener('mouseout', function() {
                $( '#infoWindow' ).empty();
              });
            }
            
            //other markers
            var markers = [];
            var iconImg = '/upload/houses.png';
      
            data.markers.forEach( function( cur, index, arr ) {
            
              markers[ index ] = new google.maps.Marker({
                position: cur.position,
                map: map,
                icon: iconImg
              });
              
              markers[ index ].addListener('mouseover', function(e) {
                $( '#infoWindow' ).append( '<div class="b-infowindow"><img src="' + cur.image + '" width="90" height="90" alt=""><div class="b-infowindow__text"><b>' + cur.title + '</b><br><span>' + cur.text + '</span></div></div>' );
                
                var gaEvent;
                
                for ( var key in e ) {
                  if ( e[ key ] && e[ key ].clientX && e[ key ].clientY ) {
                    gaEvent = e[ key ];
                  }
                }
                
                if ( !gaEvent ) {
                  return;
                }
                
                var left = gaEvent.clientX;
                var top = gaEvent.clientY + (window.pageYOffset || document.documentElement.scrollTop) - (40+90);
                var docWidth = $( document ).width();
                
                if (( docWidth - left ) < 247 ) {
                  left = docWidth - 250;
                }
                
                if ( top < $( '#elSmallMap' ).offset().top ) {
                  top = gaEvent.clientY + 40;
                }
                
                $( '#infoWindow' ).offset({ top: top, left: left });
              });
              
              markers[ index ].addListener('mouseout', function() {
                $( '#infoWindow' ).empty();
              });
              
              markers[ index ].addListener('click', function() {
                window.location.href = cur.href;
              });
              
            });
            
            var markerCluster = new MarkerClusterer( map, markers,
              {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
              }
            );
          }
        },
        error: function(a, b, c) {
          if ( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
      
    };

}( jQuery ));