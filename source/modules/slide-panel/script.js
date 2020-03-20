function sideCss() {
  if ( !$( '#bx-panel' ).length ) {
    return;
  }
  
  $( '.b-side-icons, .b-header__fixed, .b-el-small__menu' ).css({ top: $( '#bx-panel' ).height() + 'px' });
  $( '.b-side-bar__content' ).css({ paddingTop: $( '#bx-panel' ).height() + 'px' });
  
  if ( window.matchMedia( "(max-width: 575px)" ).matches ) {
    $( '.b-side-search__content' ).css({ paddingTop: $( '#bx-panel' ).height() + 56 + 'px' });
  } else {
    $( '.b-side-search__content' ).css({ paddingTop: $( '#bx-panel' ).height() + 'px' });
  }
  
  $( '#bx-panel-expander, #bx-panel-hider' ).bind( 'click', function () {
    setTimeout( function() {
      $( '.b-side-icons, .b-header__fixed, .b-el-small__menu' ).css({ top: $( '#bx-panel' ).height() + 'px' });
      $( '.b-side-bar__content, .b-side-search__content' ).css({ paddingTop: $( '#bx-panel' ).height() + 'px' });
      sideSearchCSS();
    }, 0);
    
  });
  
}

window.sideSearchStyleTag = document.createElement('style');
window.sideSearchStyleTag.type = 'text/css';

function sideSearchCSS() {
  var css = 'div.title-search-result { top: ' + (parseInt($( '.b-side-search__content' ).css( 'paddingTop' ), 10) + $( '.b-side__search' ).height() + 1) + 'px !important; }',
      head = document.head || document.getElementsByTagName('head')[0];
  
  $( window.sideSearchStyleTag ).empty();
  
  if ( window.sideSearchStyleTag.styleSheet ){
    window.sideSearchStyleTag.styleSheet.cssText = css;
  } else {
    window.sideSearchStyleTag.appendChild( document.createTextNode( css ));
  }

  head.appendChild( window.sideSearchStyleTag );
}

function sideBar() {
    var $bar = $("#sideBar");
    var $button = $("#sideBarButton");
    
    $button.click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $( '#sideSearch' ).removeClass("i-open");
        $bar.toggleClass("i-open");
    });
    
    $(document).on("click", function(e) {
        if ($(e.target).is(".clip img")) {
          return;
        }
        $bar.removeClass("i-open");
    });
    
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
}

function sideSearch() {
    var $bar = $("#sideSearch");
    var $button = $("#sideSearchButton");
    
    $button.click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $( '#sideBar' ).removeClass("i-open");
        $bar.toggleClass("i-open");
        $( '.b-side__search .form-control' ).val( '' ).focus();
        $( '.b-side__search__result' ).show();
        $( 'div.title-search-result' ).hide().empty();
    });
    
    $(document).on("click", function(e) {
        if ($(e.target).is(".clip img")) {
          return;
        }
        $bar.removeClass("i-open");
    });
    
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
}

function sideBarTopButton() {
	$( "#sideBarTop" ).click( function(e) {
		e.preventDefault();
		$.scrollTo( "body", 500);
	});
	
	$( window ).scroll( function() {
		var scrolled = $( window ).scrollTop();
		
		if ( scrolled  > 100 ) {
			$( "#sideBarTop" ).addClass( "i-show" );
		} else {
			$( "#sideBarTop" ).removeClass( "i-show" );
		}
	});
}

$( '.b-side__search .form-control' ).keyup( function() {
  setTimeout( function() {sideSearchCSS();}, 500);
  if ( $( this ).val() !== '' ) {
    $( '.b-side__search__close' ).show();
    $( '.b-side__search__result' ).hide();
  }
});

$( '.b-side__search__close' ).click( function() {
  var $input = $( '.b-side__search .form-control' );
  if ( $input.val() !== '' ) {
    $input.val( '' ).focus();
  } else {
    $("#sideSearchButton").click();
  }
});

sideCss();
sideBarTopButton();
sideBar();
sideSearch();

setTimeout( function() {
  $( 'div.title-search-result' ).niceScroll();
}, 1000);