(function($) {
    "use strict";
    $(function() {
        if (window.matchMedia("(max-width: 767px)").matches) {
            $(".fotorama").data("fotorama").resize({
                width: "200%",
                height: "400px"
            });
        }
    });
})(jQuery);