(function($) {
    "use strict";
    $(function() {
        var $filter = $("#estateFilter");
        $filter.delegate(".b-estate-filter__button button", "click", function() {
            $.ajax({
                url: "/json/send.php",
                type: "GET",
                dataType: "json",
                data: "id=" + $("#estateFilter .i-active:last").data("id"),
                success: function(data) {
                    if (data.status && data.status === "success" && data.html) {
                        $filter.removeClass("i-preloader");
                        $(".b-estate-filter__menu2").slideUp();
                        $(".b-estate-filter__menu3").slideUp();
                        $(".b-estate-filter__number").slideUp();
                        var $list = $(".b-estate-list:eq(0)");
                        var $lists = $(".b-estate-list");
                        $list.before(data.html);
                        $lists.remove();
                        onloadList($(".b-estate-list"));
                    }
                },
                error: ajaxError
            });
        });
        if ($filter.length) {
            $(".b-estate-filter__menu1 a").click(function(e) {
                e.preventDefault();
                var $a = $(this);
                $a.closest("menu").find("a").removeClass("i-active");
                $a.addClass("i-active");
                $filter.addClass("i-preloader");
                $(".b-estate-filter__menu2").slideUp();
                $(".b-estate-filter__menu3").slideUp();
                $.ajax({
                    url: "/json/step1.php",
                    type: "GET",
                    dataType: "json",
                    data: "id=" + $a.data("id"),
                    success: function(data) {
                        if (data.status && data.status === "success" && data.html) {
                            $filter.removeClass("i-preloader");
                            $(".b-estate-filter__menu2").html(data.html);
                            $(".b-estate-filter__menu2").slideDown();
                            if (data.num) {
                                $(".b-estate-filter__num").text(data.num);
                                $(".b-estate-filter__text").text(data.text);
                                $(".b-estate-filter__number").slideDown();
                            }
                        }
                    },
                    error: ajaxError
                });
            });
            $(".b-estate-filter__menu2").delegate("a", "click", function(e) {
                e.preventDefault();
                var $a = $(this);
                if ($a.hasClass("i-active")) {
                    return;
                }
                $a.closest("menu").find("a").removeClass("i-active");
                $a.addClass("i-active");
                $filter.addClass("i-preloader");
                $(".b-estate-filter__menu3").slideUp();
                $.ajax({
                    url: "/json/step2.php",
                    type: "GET",
                    dataType: "json",
                    data: "id=" + $a.data("id"),
                    success: function(data) {
                        if (data.status && data.status === "success" && data.html) {
                            $filter.removeClass("i-preloader");
                            $(".b-estate-filter__menu3").html(data.html);
                            $(".b-estate-filter__menu3").slideDown();
                            if (data.num) {
                                $(".b-estate-filter__num").text(data.num);
                                $(".b-estate-filter__text").text(data.text);
                            }
                        }
                    },
                    error: ajaxError
                });
            });
            $(".b-estate-filter__menu3").delegate("a", "click", function(e) {
                e.preventDefault();
                var $a = $(this);
                if ($a.hasClass("i-active")) {
                    return;
                }
                $a.closest("menu").find("a").removeClass("i-active");
                $a.addClass("i-active");
                $filter.addClass("i-preloader");
                $.ajax({
                    url: "/json/step3.php",
                    type: "GET",
                    dataType: "json",
                    data: "id=" + $a.data("id"),
                    success: function(data) {
                        if (data.status && data.status === "success") {
                            $filter.removeClass("i-preloader");
                            if (data.num) {
                                $(".b-estate-filter__num").text(data.num);
                                $(".b-estate-filter__text").text(data.text);
                            }
                        }
                    },
                    error: ajaxError
                });
            });
        }
        function ajaxError(a, b, c) {
            if (window.console) {
                console.log(a);
                console.log(b);
                console.log(c);
            }
        }
        function loadLargeItemImages($list) {
            var $item = $list.find(".b-estate-list__i.i-large-item"), $bwImgs = $item.find(".b-estate-list__i__big-img-bw, .b-estate-list__i__small-img-bw"), $imgs = $item.find(".b-estate-list__i__big-img, .b-estate-list__i__small-img"), bwCounter = 0, imgCounter = 0;
            $bwImgs.each(function() {
                var img = this, $img = $(img);
                if (img.complete) {
                    showLargeBw();
                } else {
                    $img.load(function() {
                        showLargeBw();
                    });
                }
            });
            $imgs.each(function() {
                var img = this, $img = $(img);
                if (img.complete) {
                    showLargeImg();
                } else {
                    $img.load(function() {
                        showLargeImg();
                    });
                }
            });
            function showLargeBw() {
                bwCounter++;
                if (bwCounter === $bwImgs.length) {
                    show($item);
                }
                checkLoaded();
            }
            function showLargeImg() {
                imgCounter++;
                if (imgCounter === $imgs.length) {
                    showImg($item);
                }
                checkLoaded();
            }
            function checkLoaded() {
                if ($item.hasClass("i-loaded") && $item.hasClass("i-img-loaded")) {
                    loadEstatesListImages($list);
                }
            }
        }
        function loadEstatesListImages($list) {
            $list.find(".b-estate-list__i:not(.i-large-item)").each(function() {
                var $item = $(this), wHeight = $(window).height() + (window.pageYOffset || document.documentElement.scrollTop), itemTop = $item.offset().top;
                if (itemTop > wHeight + 100 || $item.hasClass("i-loaded") || $item.hasClass("i-img-loaded")) {
                    return;
                }
                $item.find(".b-estate-list__i__img-bw").attr({
                    src: $item.data("img-bw-src")
                });
                $item.find(".b-estate-list__i__img").attr({
                    src: $item.data("img-src")
                });
                var $bwImg = $item.find(".b-estate-list__i__img-bw"), bwImg = $bwImg[0];
                if (bwImg.complete) {
                    show($item);
                } else {
                    $bwImg.load(function() {
                        show($item);
                    });
                }
                var $img = $item.find(".b-estate-list__i__img"), img = $img[0];
                if (img.complete) {
                    showImg($item);
                } else {
                    $img.load(function() {
                        showImg($item);
                    });
                }
            });
        }
        function scrollEvents() {
            $(document).on("scroll", scrollWindow);
            var scrollEvent, scrollIntervalEvent, scrollIntervalId;
            function scrollWindow(e) {
                scrollEvent = e;
                if (scrollIntervalEvent) {
                    return;
                }
                scrollIntervalEvent = e;
                scrollIntervalId = setInterval(function() {
                    if (scrollIntervalEvent !== scrollEvent) {
                        scrollIntervalEvent = scrollEvent;
                        return;
                    }
                    clearInterval(scrollIntervalId);
                    scrollIntervalEvent = undefined;
                    loadEstatesListImages($(".b-estate-list"));
                }, 100);
            }
        }
        function show($item) {
            $item.addClass("i-loaded");
        }
        function showImg($item) {
            $item.addClass("i-img-loaded");
        }
        var $list = $(".b-estate-list");
        onloadList($list);
        if ($list.length && !$list.hasClass("i-plugin")) {
            scrollEvents();
        }
        function onloadList($list) {
            if ($list.length && !$list.hasClass("i-plugin")) {
                if ($list.find(".i-large-item").length) {
                    loadLargeItemImages($list);
                } else {
                    loadEstatesListImages($list);
                }
            }
        }
    });
})(jQuery);