
  });
  
  $( window ).load( function(e) {
    if ( !( "ontouchstart" in document.documentElement )) {
      $( 'html' ).niceScroll();
    }
  });

}( jQuery ));