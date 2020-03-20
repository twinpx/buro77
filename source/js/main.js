function windowEvents() {
    $( window ).bind( "scroll", scrollWindow).scroll();

    function scrollWindow(e) {
      
      //footer
      $( '.b-footer' ).not( '.i-animate' ).each( function() {
        var $footer = $( this );
        var bottom = $footer.offset().top;
        var extra = 250;
        var scrollToScreen = bottom - document.documentElement.clientHeight + extra;
        if ( window.pageYOffset > scrollToScreen ) {
          $footer.addClass( 'i-animate' );
        }
      });
      
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

$( window ).bind( 'scroll', function(e) {
  $( '.b-menu-list' ).not( '.i-animate' ).each( function() {
    var $menu = $( this );
    $menu.find( '.col-sm-4:first, .col-sm-3:first' ).each( function() {
      var $col = $( this );
      var bottom = $col.offset().top + $col.outerHeight();
      var extra = 0;
      if( window.matchMedia("(max-width: 767px)").matches ) {
        extra = 250;
      }
      var scrollToScreen = bottom - document.documentElement.clientHeight - extra;
      if( window.pageYOffset > scrollToScreen ) {
        $menu.addClass( 'i-animate' );
      }
    });
  });
});

windowEvents();

//calculate scrollbar width
function getScrollbarWidth() {
  var div = document.createElement( 'div' );

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';

  document.body.appendChild( div );
  var scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild( div );
  
  return scrollWidth;
}