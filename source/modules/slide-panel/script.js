function sideBar() {
    var $bar = $("#sideBar");
    var $button = $("#sideBarButton");
    
    $button.click(function(e) {
        e.preventDefault();
        e.stopPropagation();
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

sideBarTopButton();
sideBar();