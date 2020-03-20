( function() {

    if ( !document.getElementById( 'rightSlidePanel' )) {
      return;
    }
    
    var $bar = $("#rightSlidePanel"),
        openTime = $bar.data( 'time' ) || 3000,//ms
        action = $bar.data( 'action' ) || 'mouseMove',
        scrollEvent, scrollIntervalEvent, scrollIntervalId, showTimeoutId,
        showPanelFlag = true,
        cookieExpiresTime = 0,
        closeTime = new Date( new Date().getTime() + $bar.data( 'close-time' ));//ms
        
    //check cookie
    if ( window.Cookies && Cookies.get( 'rightSlidePanel' ) === 'N' ) {
      Cookies.set( 'rightSlidePanel', 'N', { expires: closeTime, path: '/' });
      cookieExpiresTime = $bar.data( 'close-time' ) - openTime;
      if ( cookieExpiresTime < 0 ) {
        cookieExpiresTime = 0;
      }
    }
    
    setTimeout( function() {
        
      //action = pageLoad || mouseMove
      if ( action === 'pageLoad' ) {
        setTimeout( function() {
          $bar.addClass("i-open");
        }, openTime );
      } else if ( action === 'mouseMove' ) {
        f();
        $(window).bind("scroll", g);
      }
      
      function g(a) {
          scrollEvent = a;
          if ( !scrollIntervalEvent ) {
            scrollIntervalEvent = a;
            clearTimeout(showTimeoutId);
            //$bar.removeClass( 'i-open' );
            scrollIntervalId = setInterval(function() {
              return scrollIntervalEvent !== scrollEvent ? void(scrollIntervalEvent = scrollEvent) : (clearInterval(scrollIntervalId), scrollIntervalEvent = void 0, void f());
            }, 100);
          }
      }

      function h() {
        if ( showPanelFlag ) {
          $bar.addClass("i-open");
        }
      }
      
      function f() {
          showTimeoutId = setTimeout(function() {
              h();
          }, openTime);
      }
      
    }, cookieExpiresTime );
    
    //click on the document
    /*$(document).on("click", function(e) {
        if ($(e.target).is(".clip img")) {
          return;
        }
        $bar.removeClass( 'i-open' );
    });*/
    
    //close button
    $bar.find( '.b-right-slide-panel-close, .b-right-slide-panel-link' ).click( function(e) {
      e.preventDefault();
      $bar.removeClass( 'i-open' );
      //set cookie
      Cookies.set( 'rightSlidePanel', 'N', { expires: $bar.data( 'close-time' ), path: '/' });
      //set flag
      showPanelFlag = false;
    });
    
    //click button
    $bar.find( '.b-right-slide-panel-button' ).click( function(e) {
      e.preventDefault();
      $( '.b-right-slide-panel' ).hide();
    });
    
    //swipe
    $bar.on( 'click', function(e) {
      e.stopPropagation();
    }).on("swiperight", function() {
        if (window.matchMedia("(min-width: 521px)").matches) {
            $bar.addClass("i-open");
        }
    }).on("swipeleft", function() {
        if (window.matchMedia("(min-width: 521px)").matches) {
            $bar.removeClass("i-open");
        }
    }).on("swipedown", function() {
        if (window.matchMedia("(max-width: 520px)").matches) {
            $bar.addClass("i-open");
        }
    }).on("swipeup", function() {
        if (window.matchMedia("(max-width: 520px)").matches) {
            $bar.removeClass("i-open");
        }
    });
}());