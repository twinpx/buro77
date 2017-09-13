(function($) {
    "use strict";
    $(function() {
        $("#toContactForm").click(function() {
            $(window).scrollTo("#contactForm", 500);
        });
        $(".b-address-link").click(function(e) {
            $.scrollTo(".b-estate__map", 500);
            e.preventDefault();
        });
        if (document.getElementById("estateProgress")) {
            $(window).scroll(function() {
                if (!$(".b-estate-progressbar__percent").hasClass("i-animated") && $(document).scrollTop() + $(window).height() - $(".b-estate-progressbar").offset().top > 100) {
                    $(".b-estate-progressbar__percent").addClass("i-animated").css({
                        width: parseInt($(".b-estate-progressbar__percent").text(), 10) + "%"
                    });
                }
            });
        }
        $(".b-top-menu a").click(function(e) {
            $.scrollTo($("" + $(this).attr("href")), 500);
            e.preventDefault();
            return false;
        });
    });
})(jQuery);