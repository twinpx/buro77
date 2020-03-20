(function($) {
    "use strict";
    $(function() {
        var ajaxFlag = true;
        var timerId;
        if (window.matchMedia("(max-width: 575px)").matches) {
            $(".b-filter__icon").click(function(e) {
                e.preventDefault();
                $(".b-filter__menu-body").slideToggle();
                $(".b-filter__sort").slideUp();
            });
            $(".b-filter__sort-icon").click(function(e) {
                e.preventDefault();
                $(".b-filter__sort").slideToggle();
                $(".b-filter__menu-body").slideUp();
            });
        }
        $(".b-dropdown-button").click(function(e) {
            e.preventDefault();
            var $button = $(this);
            var flag = true;
            if ($button.find(".b-dropdown").is(":hidden")) {
                flag = false;
            }
            $(".b-dropdown").slideUp();
            if (!flag) {
                $button.find(".b-dropdown").slideToggle();
            }
        });
        $(".b-dropdown").click(function(e) {
            e.stopPropagation();
        });
        $(document).bind("click", function(e) {
            if ($(e.target).closest(".b-dropdown-button").length) {
                return;
            }
            $(".b-dropdown").slideUp();
        });
        $(".b-dropdown :radio").change(function(e) {
            var $radio = $(this);
            var $button = $radio.closest(".b-dropdown-button");
            $button.find(".b-dropdown-text").text($radio.siblings("label").text());
            formSubmit($button);
        });
        $("#stageRangeSlider").slider({
            range: true,
            min: $("#stageRangeSlider").data("min"),
            max: $("#stageRangeSlider").data("max"),
            values: [ $("#stageRangeSlider").closest(".b-dropdown-button").find("[name=MIN_STAGE]").val(), $("#stageRangeSlider").closest(".b-dropdown-button").find("[name=MAX_STAGE]").val() ],
            slide: function(event, ui) {
                slideSlide(event, ui);
            },
            change: function(event, ui) {
                slideChange(event, ui);
            }
        });
        function slideSlide(event, ui) {
            if (ui.values[0] === ui.values[1]) {
                $("#stageRangeText").text(ui.values[1] + " этаж");
            } else {
                $("#stageRangeText").text("С " + ui.values[0] + " по " + ui.values[1] + " этаж");
            }
        }
        function slideChange(event, ui) {
            var $button = $("#stageRangeText").closest(".b-dropdown-button");
            if (ui.values[0] === ui.values[1]) {
                $button.find(".b-dropdown-text").text(ui.values[1] + " этаж");
            } else {
                $button.find(".b-dropdown-text").text(ui.values[0] + "-" + ui.values[1] + " этаж");
            }
            $button.find('[name="MIN_STAGE"]').val(ui.values[0]);
            $button.find('[name="MAX_STAGE"]').val(ui.values[1]);
            formSubmit($button);
        }
        if ($("#stageRangeSlider").slider("values", 0) === $("#stageRangeSlider").slider("values", 1)) {
            $("#stageRangeText").text($("#stageRangeSlider").slider("values", 0) + " этаж");
        } else {
            $("#stageRangeText").text("С " + $("#stageRangeSlider").slider("values", 0) + " по " + $("#stageRangeSlider").slider("values", 1) + " этаж");
        }
        function formSubmit($button) {
            var $form = $button.closest("form");
            var time;
            if (window.matchMedia("(min-width: 576px)").matches) {
                time = 200;
            } else {
                time = 1e3;
            }
            clearTimeout(timerId);
            timerId = setTimeout(function() {
                if (window.matchMedia("(min-width: 576px)").matches) {
                    $button.find(".b-dropdown").slideUp();
                } else {
                    $(".b-filter__sort").slideUp();
                    $(".b-filter__menu-body").slideUp();
                }
                if (!ajaxFlag) {
                    return;
                }
                ajaxFlag = false;
                $.ajax({
                    url: $form.attr("action"),
                    type: $form.attr("method"),
                    dataType: "html",
                    data: $form.serialize(),
                    beforeSend: function() {
                        $(".b-filter__result").addClass("i-hidden");
                        setTimeout(function() {
                            $(".b-filter").addClass("i-preloader");
                        }, 300);
                        window.history.replaceState({}, "", String(window.location).substring(0, String(window.location).indexOf("?")) + "?" + $form.serialize());
                        var elementId = $form.find("input[name=ELEMENT]").val();
                        Cookies.set("filter" + elementId, $form.serialize(), {
                            expires: 365,
                            path: window.location.pathname
                        });
                    },
                    success: function(data) {
                        setTimeout(function() {
                            $(".b-filter").removeClass("i-preloader");
                            $(".b-filter__result").html(data).removeClass("i-hidden");
                            ajaxFlag = true;
                        }, 300);
                    },
                    error: function ajaxError(a, b, c) {
                        if (window.console) {
                            console.log(a);
                            console.log(b);
                            console.log(c);
                        }
                    }
                });
            }, time);
        }
        var elementId = $(".b-filter input[name=ELEMENT]").val();
        var query = {};
        if (window.location.search) {
            query = parseQuery(window.location.search);
        } else if (Cookies.get("filter" + elementId)) {
            query = parseQuery(Cookies.get("filter" + elementId));
        }
        var $elem;
        for (var key in query) {
            $elem = $(".b-filter__menu form [name=" + key + "]");
            if ($elem.length) {
                switch ($elem.attr("type")) {
                  case "radio":
                    if (query[key]) {
                        $elem.closest(".b-filter__menu-item, .b-filter__sort-item").find("[value=" + query[key] + "]").attr({
                            checked: "checked"
                        }).change();
                    }
                    break;

                  case "hidden":
                    $elem.val(query[key]);
                    if (key === "MIN_STAGE" && query.MAX_STAGE) {
                        slideSlide(null, {
                            values: [ query.MIN_STAGE, query.MAX_STAGE ]
                        });
                        $("#stageRangeSlider").slider("values", 0, query.MIN_STAGE);
                        $("#stageRangeSlider").slider("values", 1, query.MAX_STAGE);
                        slideChange(null, {
                            values: [ query.MIN_STAGE, query.MAX_STAGE ]
                        });
                    }
                    break;
                }
            }
        }
        function parseQuery(queryString) {
            var query = {};
            var pairs = (queryString[0] === "?" ? queryString.substr(1) : queryString).split("&");
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split("=");
                query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
            }
            return query;
        }
    });
})(jQuery);