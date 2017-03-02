(function($) {
    "use strict";
    $(function() {
        $("#gallery").slideme({
            arrows: true,
            labels: {
                next: "next",
                prev: "prev"
            },
            loop: true,
            transition: "slide",
            resizable: {
                width: 990,
                height: 450
            },
            pagination: "numbers",
            thumbs: {
                width: 50,
                height: 50
            },
            autoslide: true,
            autoslidehoverstop: true,
            interval: 2e3,
            swipe: true,
            touch: true
        });
    });
})(jQuery);