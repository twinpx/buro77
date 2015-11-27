( function($) {

  'use strict';
  
  $( function() {
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
    
    $( '#gallery' ).slideme({
      arrows: true,
      labels: {
        next: 'next',
        prev: 'prev'
      },
      loop: true,
      transition: 'slide',
      resizable: {
        width: 990,
        height: 450,
      },
      pagination: 'numbers',
      thumbs: {
        width: 50,
        height: 50
      },
      autoslide: true,
      autoslidehoverstop: true,
      interval: 2000,
      swipe: true,
      touch: true
    });
  });

}( jQuery ));