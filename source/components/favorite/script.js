( function($) {

  'use strict';
  
  $( function() {
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
    
    $(document).delegate(".b-favorite-icon", "click", function(e) {
        var $this = $(this),
            url = $this.attr("href"),
            type = "get",
            data = {};
            
        e.preventDefault();
        
        if (!$this.hasClass("i-on")) {
            data.add = "Y";
        }
        
        $this.toggleClass("i-on");
        
        $.ajax({
            url: url,
            type: type,
            dataType: "json",
            data: data,
            success: function(data) {
                try {
                  if ( Number(data.num) === 0 ) {
                    $(".b-favorites-link__num").remove();
                    return;
                  }
                  if ( $(".b-favorites-link__num").length ) {
                    $(".b-favorites-link__num").text(data.num);
                    return;
                  }
                  
                  $(".b-favorites-link").append( '<span class="b-favorites-link__num">' + data.num + '</span>' );
                    
                } catch (e) {}
            },
            error: function() {}
        });
    });
    
  });

}( jQuery ));