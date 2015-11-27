( function($) {

  'use strict';
  
  $( function() {
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
    
    $( "#toContactForm" ).click( function() {
			$( window ).scrollTo( "#contactForm", 500 );
		});
    
    $( ".b-address-link" ).click( function(e) {
      $.scrollTo( ".b-estate__map", 500);
      e.preventDefault();
    });
    
  });

}( jQuery ));