(function($) {
    "use strict";
    $(function() {
        $(".b-el-small__i__img-bw").each(function() {
            var img = this, $img = $(img);
            if (img.complete) {
                show($img);
            } else {
                $img.load(function() {
                    show($img);
                });
            }
        });
        function show($img) {
            var delay = Number(Math.random() * 500).toFixed(2);
            setTimeout(function() {
                $img.closest(".b-el-small__i").addClass("i-loaded");
            }, delay);
        }
        setTimeout(function() {
            $(".b-el-small").niceScroll();
        }, 100);
    });
})(jQuery);