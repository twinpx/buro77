function windowEvents() {
    $( window ).bind( "scroll", scrollWindow).scroll();
    
    $( 'html' ).niceScroll();

    function scrollWindow(e) {
      if ( !document.getElementById( '#bx-panel' )) {
        return;
      }
      
      var scrolled, panel;
      
      if ( $("#bx-panel").hasClass("bx-panel-fixed") ) {
          return;
      }
      
      scrolled = getScrolled();
      panel = $("#bx-panel").offset().top + $("#bx-panel").height();
      
      if (scrolled - panel > 0) {
          $(".b-side-icons, .b-side-bar").css({
              top: 0
          });
      } else {
          $(".b-side-icons, .b-side-bar").css({
              top: panel - scrolled + "px"
          });
      }
    }

    function getScrolled() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
}

windowEvents();