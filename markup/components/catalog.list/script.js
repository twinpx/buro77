!function(a){"use strict";a(function(){function b(a,b,c){window.console&&(console.log(a),console.log(b),console.log(c))}function c(b){function c(){l++,l===j.length&&f(i),h()}function e(){m++,m===k.length&&g(i),h()}function h(){i.hasClass("i-loaded")&&i.hasClass("i-img-loaded")&&d(b)}var i=b.find(".b-estate-list__i.i-large-item"),j=i.find(".b-estate-list__i__big-img-bw, .b-estate-list__i__small-img-bw"),k=i.find(".b-estate-list__i__big-img, .b-estate-list__i__small-img"),l=0,m=0;j.each(function(){var b=this,d=a(b);b.complete?c():d.load(function(){c()})}),k.each(function(){var b=this,c=a(b);b.complete?e():c.load(function(){e()})})}function d(b){b.find(".b-estate-list__i:not(.i-large-item)").each(function(){var b=a(this),c=a(window).height()+(window.pageYOffset||document.documentElement.scrollTop),d=b.offset().top;if(!(d>c+100||b.hasClass("i-loaded")||b.hasClass("i-img-loaded"))){b.find(".b-estate-list__i__img-bw").attr({src:b.data("img-bw-src")}),b.find(".b-estate-list__i__img").attr({src:b.data("img-src")});var e=b.find(".b-estate-list__i__img-bw"),h=e[0];h.complete?f(b):e.load(function(){f(b)});var i=b.find(".b-estate-list__i__img"),j=i[0];j.complete?g(b):i.load(function(){g(b)})}})}function e(){function b(b){c=b,e||(e=b,f=setInterval(function(){return e!==c?void(e=c):(clearInterval(f),e=void 0,void d(a(".b-estate-list")))},100))}a(document).on("scroll",b);var c,e,f}function f(a){a.addClass("i-loaded")}function g(a){a.addClass("i-img-loaded")}function h(a){a.length&&!a.hasClass("i-plugin")&&(a.find(".i-large-item").length?c(a):d(a))}var i=a("#estateFilter");i.delegate(".b-estate-filter__button button","click",function(){i.addClass("i-preloader"),a.ajax({url:"/json/send.php",type:"GET",dataType:"json",data:"id="+a("#estateFilter .i-active:last").data("id"),success:function(b){if(b.status&&"success"===b.status&&b.html){i.removeClass("i-preloader"),a(".b-estate-filter__menu2").slideUp(),a(".b-estate-filter__menu3").slideUp(),a(".b-estate-filter__number").slideUp();var c=a(".b-estate-list:eq(0)"),d=a(".b-estate-list");c.before(b.html),d.remove(),h(a(".b-estate-list"))}},error:b})}),i.length&&(a(".b-estate-filter__menu1 a").click(function(c){c.preventDefault();var d=a(this);d.closest("menu").find("a").removeClass("i-active"),d.addClass("i-active"),i.addClass("i-preloader"),a(".b-estate-filter__menu2").slideUp(),a(".b-estate-filter__menu3").slideUp(),a.ajax({url:"/json/step1.php",type:"GET",dataType:"json",data:"id="+d.data("id"),success:function(b){b.status&&"success"===b.status&&b.html&&(i.removeClass("i-preloader"),a(".b-estate-filter__menu2").html(b.html),a(".b-estate-filter__menu2").slideDown(),b.num&&(a(".b-estate-filter__num").text(b.num),a(".b-estate-filter__text").text(b.text),a(".b-estate-filter__number").slideDown()))},error:b})}),a(".b-estate-filter__menu2").delegate("a","click",function(c){c.preventDefault();var d=a(this);d.hasClass("i-active")||(d.closest("menu").find("a").removeClass("i-active"),d.addClass("i-active"),i.addClass("i-preloader"),a(".b-estate-filter__menu3").slideUp(),a.ajax({url:"/json/step2.php",type:"GET",dataType:"json",data:"id="+d.data("id"),success:function(b){b.status&&"success"===b.status&&b.html&&(i.removeClass("i-preloader"),a(".b-estate-filter__menu3").html(b.html),a(".b-estate-filter__menu3").slideDown(),b.num&&(a(".b-estate-filter__num").text(b.num),a(".b-estate-filter__text").text(b.text)))},error:b}))}),a(".b-estate-filter__menu3").delegate("a","click",function(c){c.preventDefault();var d=a(this);d.hasClass("i-active")||(d.closest("menu").find("a").removeClass("i-active"),d.addClass("i-active"),i.addClass("i-preloader"),a.ajax({url:"/json/step3.php",type:"GET",dataType:"json",data:"id="+d.data("id"),success:function(b){b.status&&"success"===b.status&&(i.removeClass("i-preloader"),b.num&&(a(".b-estate-filter__num").text(b.num),a(".b-estate-filter__text").text(b.text)))},error:b}))}));var j=a(".b-estate-list");h(j),j.length&&!j.hasClass("i-plugin")&&e()})}(jQuery);