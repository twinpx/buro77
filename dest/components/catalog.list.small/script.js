(function($) {
    "use strict";
    $(function() {
        $(".b-el-small__menu a").click(function(e) {
            e.preventDefault();
            $(".b-el-small__menu a").removeClass("i-active");
            $(this).addClass("i-active");
            $("[data-tab]").hide();
            $('[data-tab="el-' + $(this).data("href") + '"]').show();
            if ($(this).data("href") === "list" && !$(".b-el-small__wrapper").length) {
                getSmallCatalogList();
            }
        });
        $(".b-el-small__menu a:first").click();
        function getSmallCatalogList() {
            var $el = $(".b-el-small");
            $.ajax({
                url: $el.data("ajax-url"),
                type: $el.data("ajax-method"),
                dataType: "html",
                success: function(data) {
                    $el.html(data);
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
                },
                error: function(a, b, c) {
                    if (window.console) {
                        console.log(a);
                        console.log(b);
                        console.log(c);
                    }
                }
            });
        }
        $("#elSmallMap").addClass("i-no-map");
        $(window).scroll(function() {
            if (!$("#elSmallMap").hasClass("i-no-map")) {
                return;
            }
            var top = $(document).scrollTop() + parseInt(window.screen.height) - 50;
            if ($("#elSmallMap.i-no-map").offset().top < top) {
                $("#elSmallMap").removeClass("i-no-map");
                var widget_id = "dcnRQqScEU";
                var s = document.createElement("script");
                s.async = true;
                s.defer = true;
                s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIBtmSOttEUoOM-fuV3gEtf_kGoZhm-YE&callback=initMap";
                var ss = document.getElementsByTagName("script")[0];
                ss.parentNode.insertBefore(s, ss);
            }
        }).scroll();
    });
    window.initMap = function() {
        var mapStyle = [ {
            elementType: "geometry",
            stylers: [ {
                color: "#212121"
            } ]
        }, {
            elementType: "labels.text.stroke",
            stylers: [ {
                color: "#212121"
            } ]
        }, {
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#746855"
            } ]
        }, {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#8a8a8a"
            } ]
        }, {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#8a8a8a"
            } ]
        }, {
            featureType: "poi",
            elementType: "labels.icon",
            stylers: [ {
                visibility: "off"
            } ]
        }, {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [ {
                color: "#373737"
            } ]
        }, {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#8a8a8a"
            } ]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [ {
                color: "#373737"
            } ]
        }, {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [ {
                color: "#373737"
            } ]
        }, {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#8a8a8a"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [ {
                color: "#373737"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [ {
                color: "#373737"
            } ]
        }, {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#8a8a8a"
            } ]
        }, {
            featureType: "transit",
            elementType: "geometry",
            stylers: [ {
                color: "#373737"
            } ]
        }, {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#8a8a8a"
            } ]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [ {
                color: "#373737"
            } ]
        }, {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [ {
                color: "#8a8a8a"
            } ]
        }, {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [ {
                color: "#212121"
            } ]
        } ];
        $.ajax({
            url: $("#elSmallMap").data("ajax-url"),
            type: $("#elSmallMap").data("ajax-method"),
            dataType: "json",
            success: function(data) {
                var coords = [ 0, 0 ];
                if (data && typeof data.markers === "object") {
                    if (typeof data.current === "object") {
                        coords = data.current.position;
                    } else {
                        if (window.listSmallMapLat && window.listSmallMapLng) {
                            coords = {
                                lat: window.listSmallMapLat,
                                lng: window.listSmallMapLng
                            };
                        }
                    }
                    var zoom = window.listSmallMapZoom || 12;
                    var map = new google.maps.Map(document.getElementById("elSmallMap"), {
                        center: coords,
                        zoom: zoom,
                        zoomControl: true,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false,
                        styles: mapStyle
                    });
                    if (typeof data.current === "object") {
                        var marker1 = new google.maps.Marker({
                            position: coords,
                            map: map,
                            icon: "/upload/gmaps-marker-current.png"
                        });
                        marker1.addListener("mouseover", function(e) {
                            $("#infoWindow").append('<div class="b-infowindow"><img src="' + data.current.image + '" width="90" height="90" alt=""><div class="b-infowindow__text"><b>' + data.current.title + "</b><br><span>" + data.current.text + "</span></div></div>");
                            var gaEvent = e.xa;
                            for (var key in e) {
                                if (e[key] && e[key].clientX && e[key].clientY) {
                                    gaEvent = e[key];
                                }
                            }
                            if (!gaEvent) {
                                return;
                            }
                            var left = gaEvent.clientX;
                            var top = gaEvent.clientY + (window.pageYOffset || document.documentElement.scrollTop) - (40 + 90);
                            var docWidth = $(document).width();
                            if (docWidth - left < 247) {
                                left = docWidth - 250;
                            }
                            if (top < $("#elSmallMap").offset().top) {
                                top = gaEvent.clientY + (window.pageYOffset || document.documentElement.scrollTop) + 40;
                            }
                            $("#infoWindow").css({
                                top: top,
                                left: left
                            });
                        });
                        marker1.addListener("mouseout", function() {
                            $("#infoWindow").empty();
                        });
                    }
                    var markers = [];
                    var iconImg = "/upload/houses.png";
                    data.markers.forEach(function(cur, index, arr) {
                        markers[index] = new google.maps.Marker({
                            position: cur.position,
                            map: map,
                            icon: iconImg
                        });
                        markers[index].addListener("mouseover", function(e) {
                            $("#infoWindow").append('<div class="b-infowindow"><img src="' + cur.image + '" width="90" height="90" alt=""><div class="b-infowindow__text"><b>' + cur.title + "</b><br><span>" + cur.text + "</span></div></div>");
                            var gaEvent;
                            for (var key in e) {
                                if (e[key] && e[key].clientX && e[key].clientY) {
                                    gaEvent = e[key];
                                }
                            }
                            if (!gaEvent) {
                                return;
                            }
                            var left = gaEvent.clientX;
                            var top = gaEvent.clientY + (window.pageYOffset || document.documentElement.scrollTop) - (40 + 90);
                            var docWidth = $(document).width();
                            if (docWidth - left < 247) {
                                left = docWidth - 250;
                            }
                            if (top < $("#elSmallMap").offset().top) {
                                top = gaEvent.clientY + (window.pageYOffset || document.documentElement.scrollTop) + 40;
                            }
                            $("#infoWindow").css({
                                top: top,
                                left: left
                            });
                        });
                        markers[index].addListener("mouseout", function() {
                            $("#infoWindow").empty();
                        });
                        markers[index].addListener("click", function() {
                            window.location.href = cur.href;
                        });
                    });
                    setTimeout(function() {
                        var markerCluster = new MarkerClusterer(map, markers, {
                            imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
                        });
                    }, 2e3);
                }
            },
            error: function(a, b, c) {
                if (window.console) {
                    console.log(a);
                    console.log(b);
                    console.log(c);
                }
            }
        });
    };
})(jQuery);