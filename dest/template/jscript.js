(function($) {
    "use strict";
    $(function() {
        function windowEvents() {
            $(window).bind("scroll", scrollWindow).scroll();
            function scrollWindow(e) {
                $(".b-footer").not(".i-animate").each(function() {
                    var $footer = $(this);
                    var bottom = $footer.offset().top;
                    var extra = 250;
                    var scrollToScreen = bottom - document.documentElement.clientHeight + extra;
                    if (window.pageYOffset > scrollToScreen) {
                        $footer.addClass("i-animate");
                    }
                });
                if (!document.getElementById("#bx-panel")) {
                    return;
                }
                var scrolled, panel;
                if ($("#bx-panel").hasClass("bx-panel-fixed")) {
                    return;
                }
                scrolled = getScrolled();
                panel = $("#bx-panel").offset().top + $("#bx-panel").height();
                if (scrolled - panel > 0) {
                    $(".b-side-icons, .b-side-bar").css({
                        top: 0
                    });
                } else {
                    $(".b-side-icons, .b-side-bar").css({
                        top: panel - scrolled + "px"
                    });
                }
            }
            function getScrolled() {
                return window.pageYOffset || document.documentElement.scrollTop;
            }
        }
        $(window).bind("scroll", function(e) {
            $(".b-menu-list").not(".i-animate").each(function() {
                var $menu = $(this);
                $menu.find(".col-sm-4:first, .col-sm-3:first").each(function() {
                    var $col = $(this);
                    var bottom = $col.offset().top + $col.outerHeight();
                    var extra = 0;
                    if (window.matchMedia("(max-width: 767px)").matches) {
                        extra = 250;
                    }
                    var scrollToScreen = bottom - document.documentElement.clientHeight - extra;
                    if (window.pageYOffset > scrollToScreen) {
                        $menu.addClass("i-animate");
                    }
                });
            });
        });
        windowEvents();
        function getScrollbarWidth() {
            var div = document.createElement("div");
            div.style.overflowY = "scroll";
            div.style.width = "50px";
            div.style.height = "50px";
            div.style.visibility = "hidden";
            document.body.appendChild(div);
            var scrollWidth = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
            return scrollWidth;
        }
        function FloatPhone(b) {
            function c() {
                d();
                e();
            }
            function d() {
                j.$elem = $(b);
                j.$elem.data("FloatPhone", j);
                j.scrollEvent = undefined;
                j.scrollIntervalEvent = undefined;
                j.scrollIntervalId = undefined;
                j.showTimeoutId = undefined;
                j.showTime = 3e3;
            }
            function e() {
                f();
                $(window).bind("scroll", g);
                j.$elem.find(".b-icon-close").click(clickClose);
            }
            function f() {
                j.showTimeoutId = setTimeout(function() {
                    h();
                }, j.showTime);
            }
            function g(a) {
                j.scrollEvent = a;
                if (!j.scrollIntervalEvent) {
                    j.scrollIntervalEvent = a;
                    clearTimeout(j.showTimeoutId);
                    i();
                    j.scrollIntervalId = setInterval(function() {
                        return j.scrollIntervalEvent !== j.scrollEvent ? void (j.scrollIntervalEvent = j.scrollEvent) : (clearInterval(j.scrollIntervalId), 
                        j.scrollIntervalEvent = void 0, void f());
                    }, 100);
                }
            }
            function h() {
                if (window.Cookies && window.Cookies.get("showMessage") !== "N") {
                    j.$elem.addClass("i-visible");
                }
            }
            function i() {
                j.$elem.removeClass("i-visible");
            }
            function clickClose() {
                i();
                if (window.Cookies) {
                    Cookies.set("showMessage", "N", {
                        expires: 365,
                        path: window.location.href
                    });
                }
            }
            var j = this;
            c();
        }
        new FloatPhone("#b-float-phone");
        $(".b-price-block__img").lazyload();
        (function() {
            if (!document.getElementById("rightSlidePanel")) {
                return;
            }
            var $bar = $("#rightSlidePanel"), openTime = $bar.data("time") || 3e3, action = $bar.data("action") || "mouseMove", scrollEvent, scrollIntervalEvent, scrollIntervalId, showTimeoutId, showPanelFlag = true, cookieExpiresTime = 0, closeTime = new Date(new Date().getTime() + $bar.data("close-time"));
            if (window.Cookies && Cookies.get("rightSlidePanel") === "N") {
                Cookies.set("rightSlidePanel", "N", {
                    expires: closeTime,
                    path: "/"
                });
                cookieExpiresTime = $bar.data("close-time") - openTime;
                if (cookieExpiresTime < 0) {
                    cookieExpiresTime = 0;
                }
            }
            setTimeout(function() {
                if (action === "pageLoad") {
                    setTimeout(function() {
                        $bar.addClass("i-open");
                    }, openTime);
                } else if (action === "mouseMove") {
                    f();
                    $(window).bind("scroll", g);
                }
                function g(a) {
                    scrollEvent = a;
                    if (!scrollIntervalEvent) {
                        scrollIntervalEvent = a;
                        clearTimeout(showTimeoutId);
                        scrollIntervalId = setInterval(function() {
                            return scrollIntervalEvent !== scrollEvent ? void (scrollIntervalEvent = scrollEvent) : (clearInterval(scrollIntervalId), 
                            scrollIntervalEvent = void 0, void f());
                        }, 100);
                    }
                }
                function h() {
                    if (showPanelFlag) {
                        $bar.addClass("i-open");
                    }
                }
                function f() {
                    showTimeoutId = setTimeout(function() {
                        h();
                    }, openTime);
                }
            }, cookieExpiresTime);
            $bar.find(".b-right-slide-panel-close, .b-right-slide-panel-link").click(function(e) {
                e.preventDefault();
                $bar.removeClass("i-open");
                Cookies.set("rightSlidePanel", "N", {
                    expires: $bar.data("close-time"),
                    path: "/"
                });
                showPanelFlag = false;
            });
            $bar.find(".b-right-slide-panel-button").click(function(e) {
                e.preventDefault();
                $(".b-right-slide-panel").hide();
            });
            $bar.on("click", function(e) {
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
        })();
        function sideCss() {
            if (!$("#bx-panel").length) {
                return;
            }
            $(".b-side-icons, .b-header__fixed, .b-el-small__menu").css({
                top: $("#bx-panel").height() + "px"
            });
            $(".b-side-bar__content").css({
                paddingTop: $("#bx-panel").height() + "px"
            });
            if (window.matchMedia("(max-width: 575px)").matches) {
                $(".b-side-search__content").css({
                    paddingTop: $("#bx-panel").height() + 56 + "px"
                });
            } else {
                $(".b-side-search__content").css({
                    paddingTop: $("#bx-panel").height() + "px"
                });
            }
            $("#bx-panel-expander, #bx-panel-hider").bind("click", function() {
                setTimeout(function() {
                    $(".b-side-icons, .b-header__fixed, .b-el-small__menu").css({
                        top: $("#bx-panel").height() + "px"
                    });
                    $(".b-side-bar__content, .b-side-search__content").css({
                        paddingTop: $("#bx-panel").height() + "px"
                    });
                    sideSearchCSS();
                }, 0);
            });
        }
        window.sideSearchStyleTag = document.createElement("style");
        window.sideSearchStyleTag.type = "text/css";
        function sideSearchCSS() {
            var css = "div.title-search-result { top: " + (parseInt($(".b-side-search__content").css("paddingTop"), 10) + $(".b-side__search").height() + 1) + "px !important; }", head = document.head || document.getElementsByTagName("head")[0];
            $(window.sideSearchStyleTag).empty();
            if (window.sideSearchStyleTag.styleSheet) {
                window.sideSearchStyleTag.styleSheet.cssText = css;
            } else {
                window.sideSearchStyleTag.appendChild(document.createTextNode(css));
            }
            head.appendChild(window.sideSearchStyleTag);
        }
        function sideBar() {
            var $bar = $("#sideBar");
            var $button = $("#sideBarButton");
            $button.click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $("#sideSearch").removeClass("i-open");
                $bar.toggleClass("i-open");
            });
            $(document).on("click", function(e) {
                if ($(e.target).is(".clip img")) {
                    return;
                }
                $bar.removeClass("i-open");
            });
            $bar.on("click", function(e) {
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
        function sideSearch() {
            var $bar = $("#sideSearch");
            var $button = $("#sideSearchButton");
            $button.click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $("#sideBar").removeClass("i-open");
                $bar.toggleClass("i-open");
                $(".b-side__search .form-control").val("").focus();
                $(".b-side__search__result").show();
                $("div.title-search-result").hide().empty();
            });
            $(document).on("click", function(e) {
                if ($(e.target).is(".clip img")) {
                    return;
                }
                $bar.removeClass("i-open");
            });
            $bar.on("click", function(e) {
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
            $("#sideBarTop").click(function(e) {
                e.preventDefault();
                $.scrollTo("body", 500);
            });
            $(window).scroll(function() {
                var scrolled = $(window).scrollTop();
                if (scrolled > 100) {
                    $("#sideBarTop").addClass("i-show");
                } else {
                    $("#sideBarTop").removeClass("i-show");
                }
            });
        }
        $(".b-side__search .form-control").keyup(function() {
            setTimeout(function() {
                sideSearchCSS();
            }, 500);
            if ($(this).val() !== "") {
                $(".b-side__search__close").show();
                $(".b-side__search__result").hide();
            }
        });
        $(".b-side__search__close").click(function() {
            var $input = $(".b-side__search .form-control");
            if ($input.val() !== "") {
                $input.val("").focus();
            } else {
                $("#sideSearchButton").click();
            }
        });
        sideCss();
        sideBarTopButton();
        sideBar();
        sideSearch();
        setTimeout(function() {
            $("div.title-search-result").niceScroll();
        }, 1e3);
    });
    if (!("ontouchstart" in document.documentElement)) {
        $("html").niceScroll();
    }
})(jQuery);

/*! jQuery UI - v1.12.1 - 2018-09-10
* http://jqueryui.com
* Includes: widget.js, keycode.js, widgets/mouse.js, widgets/slider.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */
(function(t) {
    "function" == typeof define && define.amd ? define([ "jquery" ], t) : t(jQuery);
})(function(t) {
    t.ui = t.ui || {}, t.ui.version = "1.12.1";
    var e = 0, i = Array.prototype.slice;
    t.cleanData = function(e) {
        return function(i) {
            var s, n, o;
            for (o = 0; null != (n = i[o]); o++) try {
                s = t._data(n, "events"), s && s.remove && t(n).triggerHandler("remove");
            } catch (a) {}
            e(i);
        };
    }(t.cleanData), t.widget = function(e, i, s) {
        var n, o, a, r = {}, l = e.split(".")[0];
        e = e.split(".")[1];
        var h = l + "-" + e;
        return s || (s = i, i = t.Widget), t.isArray(s) && (s = t.extend.apply(null, [ {} ].concat(s))), 
        t.expr[":"][h.toLowerCase()] = function(e) {
            return !!t.data(e, h);
        }, t[l] = t[l] || {}, n = t[l][e], o = t[l][e] = function(t, e) {
            return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new o(t, e);
        }, t.extend(o, n, {
            version: s.version,
            _proto: t.extend({}, s),
            _childConstructors: []
        }), a = new i(), a.options = t.widget.extend({}, a.options), t.each(s, function(e, s) {
            return t.isFunction(s) ? (r[e] = function() {
                function t() {
                    return i.prototype[e].apply(this, arguments);
                }
                function n(t) {
                    return i.prototype[e].apply(this, t);
                }
                return function() {
                    var e, i = this._super, o = this._superApply;
                    return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, 
                    this._superApply = o, e;
                };
            }(), void 0) : (r[e] = s, void 0);
        }), o.prototype = t.widget.extend(a, {
            widgetEventPrefix: n ? a.widgetEventPrefix || e : e
        }, r, {
            constructor: o,
            namespace: l,
            widgetName: e,
            widgetFullName: h
        }), n ? (t.each(n._childConstructors, function(e, i) {
            var s = i.prototype;
            t.widget(s.namespace + "." + s.widgetName, o, i._proto);
        }), delete n._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o), 
        o;
    }, t.widget.extend = function(e) {
        for (var s, n, o = i.call(arguments, 1), a = 0, r = o.length; r > a; a++) for (s in o[a]) n = o[a][s], 
        o[a].hasOwnProperty(s) && void 0 !== n && (e[s] = t.isPlainObject(n) ? t.isPlainObject(e[s]) ? t.widget.extend({}, e[s], n) : t.widget.extend({}, n) : n);
        return e;
    }, t.widget.bridge = function(e, s) {
        var n = s.prototype.widgetFullName || e;
        t.fn[e] = function(o) {
            var a = "string" == typeof o, r = i.call(arguments, 1), l = this;
            return a ? this.length || "instance" !== o ? this.each(function() {
                var i, s = t.data(this, n);
                return "instance" === o ? (l = s, !1) : s ? t.isFunction(s[o]) && "_" !== o.charAt(0) ? (i = s[o].apply(s, r), 
                i !== s && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + o + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + o + "'");
            }) : l = void 0 : (r.length && (o = t.widget.extend.apply(null, [ o ].concat(r))), 
            this.each(function() {
                var e = t.data(this, n);
                e ? (e.option(o || {}), e._init && e._init()) : t.data(this, n, new s(o, this));
            })), l;
        };
    }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: !1,
            create: null
        },
        _createWidget: function(i, s) {
            s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = e++, 
            this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), 
            this.focusable = t(), this.classesElementLookup = {}, s !== this && (t.data(s, this.widgetFullName, this), 
            this._on(!0, this.element, {
                remove: function(t) {
                    t.target === s && this.destroy();
                }
            }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), 
            this.options = t.widget.extend({}, this.options, this._getCreateOptions(), i), this._create(), 
            this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), 
            this._init();
        },
        _getCreateOptions: function() {
            return {};
        },
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function() {
            var e = this;
            this._destroy(), t.each(this.classesElementLookup, function(t, i) {
                e._removeClass(i, t);
            }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), 
            this.bindings.off(this.eventNamespace);
        },
        _destroy: t.noop,
        widget: function() {
            return this.element;
        },
        option: function(e, i) {
            var s, n, o, a = e;
            if (0 === arguments.length) return t.widget.extend({}, this.options);
            if ("string" == typeof e) if (a = {}, s = e.split("."), e = s.shift(), s.length) {
                for (n = a[e] = t.widget.extend({}, this.options[e]), o = 0; s.length - 1 > o; o++) n[s[o]] = n[s[o]] || {}, 
                n = n[s[o]];
                if (e = s.pop(), 1 === arguments.length) return void 0 === n[e] ? null : n[e];
                n[e] = i;
            } else {
                if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                a[e] = i;
            }
            return this._setOptions(a), this;
        },
        _setOptions: function(t) {
            var e;
            for (e in t) this._setOption(e, t[e]);
            return this;
        },
        _setOption: function(t, e) {
            return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), 
            this;
        },
        _setOptionClasses: function(e) {
            var i, s, n;
            for (i in e) n = this.classesElementLookup[i], e[i] !== this.options.classes[i] && n && n.length && (s = t(n.get()), 
            this._removeClass(n, i), s.addClass(this._classes({
                element: s,
                keys: i,
                classes: e,
                add: !0
            })));
        },
        _setOptionDisabled: function(t) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), 
            t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            });
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            });
        },
        _classes: function(e) {
            function i(i, o) {
                var a, r;
                for (r = 0; i.length > r; r++) a = n.classesElementLookup[i[r]] || t(), a = e.add ? t(t.unique(a.get().concat(e.element.get()))) : t(a.not(e.element).get()), 
                n.classesElementLookup[i[r]] = a, s.push(i[r]), o && e.classes[i[r]] && s.push(e.classes[i[r]]);
            }
            var s = [], n = this;
            return e = t.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, e), this._on(e.element, {
                remove: "_untrackClassesElement"
            }), e.keys && i(e.keys.match(/\S+/g) || [], !0), e.extra && i(e.extra.match(/\S+/g) || []), 
            s.join(" ");
        },
        _untrackClassesElement: function(e) {
            var i = this;
            t.each(i.classesElementLookup, function(s, n) {
                -1 !== t.inArray(e.target, n) && (i.classesElementLookup[s] = t(n.not(e.target).get()));
            });
        },
        _removeClass: function(t, e, i) {
            return this._toggleClass(t, e, i, !1);
        },
        _addClass: function(t, e, i) {
            return this._toggleClass(t, e, i, !0);
        },
        _toggleClass: function(t, e, i, s) {
            s = "boolean" == typeof s ? s : i;
            var n = "string" == typeof t || null === t, o = {
                extra: n ? e : i,
                keys: n ? t : e,
                element: n ? this.element : t,
                add: s
            };
            return o.element.toggleClass(this._classes(o), s), this;
        },
        _on: function(e, i, s) {
            var n, o = this;
            "boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, 
            i = this.element, n = this.widget()), t.each(s, function(s, a) {
                function r() {
                    return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0;
                }
                "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
                var l = s.match(/^([\w:-]*)\s*(.*)$/), h = l[1] + o.eventNamespace, c = l[2];
                c ? n.on(h, c, r) : i.on(h, r);
            });
        },
        _off: function(e, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
            e.off(i).off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), 
            this.hoverable = t(this.hoverable.not(e).get());
        },
        _delay: function(t, e) {
            function i() {
                return ("string" == typeof t ? s[t] : t).apply(s, arguments);
            }
            var s = this;
            return setTimeout(i, e || 0);
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function(e) {
                    this._addClass(t(e.currentTarget), null, "ui-state-hover");
                },
                mouseleave: function(e) {
                    this._removeClass(t(e.currentTarget), null, "ui-state-hover");
                }
            });
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function(e) {
                    this._addClass(t(e.currentTarget), null, "ui-state-focus");
                },
                focusout: function(e) {
                    this._removeClass(t(e.currentTarget), null, "ui-state-focus");
                }
            });
        },
        _trigger: function(e, i, s) {
            var n, o, a = this.options[e];
            if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), 
            i.target = this.element[0], o = i.originalEvent) for (n in o) n in i || (i[n] = o[n]);
            return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [ i ].concat(s)) === !1 || i.isDefaultPrevented());
        }
    }, t.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(e, i) {
        t.Widget.prototype["_" + e] = function(s, n, o) {
            "string" == typeof n && (n = {
                effect: n
            });
            var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
            n = n || {}, "number" == typeof n && (n = {
                duration: n
            }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function(i) {
                t(this)[e](), o && o.call(s[0]), i();
            });
        };
    }), t.widget, t.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    }, t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    var s = !1;
    t(document).on("mouseup", function() {
        s = !1;
    }), t.widget("ui.mouse", {
        version: "1.12.1",
        options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.on("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t);
            }).on("click." + this.widgetName, function(i) {
                return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), 
                i.stopImmediatePropagation(), !1) : void 0;
            }), this.started = !1;
        },
        _mouseDestroy: function() {
            this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function(e) {
            if (!s) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                var i = this, n = 1 === e.which, o = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;
                return n && !o && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, 
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    i.mouseDelayMet = !0;
                }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, 
                !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), 
                this._mouseMoveDelegate = function(t) {
                    return i._mouseMove(t);
                }, this._mouseUpDelegate = function(t) {
                    return i._mouseUp(t);
                }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), 
                e.preventDefault(), s = !0, !0)) : !0;
            }
        },
        _mouseMove: function(e) {
            if (this._mouseMoved) {
                if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e);
                if (!e.which) if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0; else if (!this.ignoreMissingWhich) return this._mouseUp(e);
            }
            return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), 
            e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, 
            this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted);
        },
        _mouseUp: function(e) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), 
            this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), 
            this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), 
            delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, s = !1, e.preventDefault();
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0;
        }
    }), t.widget("ui.slider", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            classes: {
                "ui-slider": "ui-corner-all",
                "ui-slider-handle": "ui-corner-all",
                "ui-slider-range": "ui-corner-all ui-widget-header"
            },
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function() {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, 
            this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), 
            this._refresh(), this._animateOff = !1;
        },
        _refresh: function() {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue();
        },
        _createHandles: function() {
            var e, i, s = this.options, n = this.element.find(".ui-slider-handle"), o = "<span tabindex='0'></span>", a = [];
            for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), 
            n = n.slice(0, i)), e = n.length; i > e; e++) a.push(o);
            this.handles = n.add(t(a.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), 
            this.handle = this.handles.eq(0), this.handles.each(function(e) {
                t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0);
            });
        },
        _createRange: function() {
            var e = this.options;
            e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [ e.values[0], e.values[0] ] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [ this._valueMin(), this._valueMin() ]), 
            this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), 
            this.range.css({
                left: "",
                bottom: ""
            })) : (this.range = t("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), 
            ("min" === e.range || "max" === e.range) && this._addClass(this.range, "ui-slider-range-" + e.range)) : (this.range && this.range.remove(), 
            this.range = null);
        },
        _setupEvents: function() {
            this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), 
            this._focusable(this.handles);
        },
        _destroy: function() {
            this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy();
        },
        _mouseCapture: function(e) {
            var i, s, n, o, a, r, l, h, c = this, u = this.options;
            return u.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), i = {
                x: e.pageX,
                y: e.pageY
            }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, 
            this.handles.each(function(e) {
                var i = Math.abs(s - c.values(e));
                (n > i || n === i && (e === c._lastChangedValue || c.values(e) === u.min)) && (n = i, 
                o = t(this), a = e);
            }), r = this._start(e, a), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, 
            this._addClass(o, null, "ui-state-active"), o.trigger("focus"), l = o.offset(), 
            h = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? {
                left: 0,
                top: 0
            } : {
                left: e.pageX - l.left - o.width() / 2,
                top: e.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, s), this._animateOff = !0, 
            !0));
        },
        _mouseStart: function() {
            return !0;
        },
        _mouseDrag: function(t) {
            var e = {
                x: t.pageX,
                y: t.pageY
            }, i = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, i), !1;
        },
        _mouseStop: function(t) {
            return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, 
            this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, 
            this._clickOffset = null, this._animateOff = !1, !1;
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
        },
        _normValueFromMouse: function(t) {
            var e, i, s, n, o;
            return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, 
            i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), 
            s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), 
            n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o);
        },
        _uiHash: function(t, e, i) {
            var s = {
                handle: this.handles[t],
                handleIndex: t,
                value: void 0 !== e ? e : this.value()
            };
            return this._hasMultipleValues() && (s.value = void 0 !== e ? e : this.values(t), 
            s.values = i || this.values()), s;
        },
        _hasMultipleValues: function() {
            return this.options.values && this.options.values.length;
        },
        _start: function(t, e) {
            return this._trigger("start", t, this._uiHash(e));
        },
        _slide: function(t, e, i) {
            var s, n, o = this.value(), a = this.values();
            this._hasMultipleValues() && (n = this.values(e ? 0 : 1), o = this.values(e), 2 === this.options.values.length && this.options.range === !0 && (i = 0 === e ? Math.min(n, i) : Math.max(n, i)), 
            a[e] = i), i !== o && (s = this._trigger("slide", t, this._uiHash(e, i, a)), s !== !1 && (this._hasMultipleValues() ? this.values(e, i) : this.value(i)));
        },
        _stop: function(t, e) {
            this._trigger("stop", t, this._uiHash(e));
        },
        _change: function(t, e) {
            this._keySliding || this._mouseSliding || (this._lastChangedValue = e, this._trigger("change", t, this._uiHash(e)));
        },
        value: function(t) {
            return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), 
            this._change(null, 0), void 0) : this._value();
        },
        values: function(e, i) {
            var s, n, o;
            if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), 
            this._refreshValue(), this._change(null, e), void 0;
            if (!arguments.length) return this._values();
            if (!t.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(e) : this.value();
            for (s = this.options.values, n = arguments[0], o = 0; s.length > o; o += 1) s[o] = this._trimAlignValue(n[o]), 
            this._change(null, o);
            this._refreshValue();
        },
        _setOption: function(e, i) {
            var s, n = 0;
            switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), 
            this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), 
            this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), 
            this._super(e, i), e) {
              case "orientation":
                this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), 
                this._refreshValue(), this.options.range && this._refreshRange(i), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                break;

              case "value":
                this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                break;

              case "values":
                for (this._animateOff = !0, this._refreshValue(), s = n - 1; s >= 0; s--) this._change(null, s);
                this._animateOff = !1;
                break;

              case "step":
              case "min":
              case "max":
                this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                break;

              case "range":
                this._animateOff = !0, this._refresh(), this._animateOff = !1;
            }
        },
        _setOptionDisabled: function(t) {
            this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
        },
        _value: function() {
            var t = this.options.value;
            return t = this._trimAlignValue(t);
        },
        _values: function(t) {
            var e, i, s;
            if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
            if (this._hasMultipleValues()) {
                for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]);
                return i;
            }
            return [];
        },
        _trimAlignValue: function(t) {
            if (this._valueMin() >= t) return this._valueMin();
            if (t >= this._valueMax()) return this._valueMax();
            var e = this.options.step > 0 ? this.options.step : 1, i = (t - this._valueMin()) % e, s = t - i;
            return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5));
        },
        _calculateNewMax: function() {
            var t = this.options.max, e = this._valueMin(), i = this.options.step, s = Math.round((t - e) / i) * i;
            t = s + e, t > this.options.max && (t -= i), this.max = parseFloat(t.toFixed(this._precision()));
        },
        _precision: function() {
            var t = this._precisionOf(this.options.step);
            return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), 
            t;
        },
        _precisionOf: function(t) {
            var e = "" + t, i = e.indexOf(".");
            return -1 === i ? 0 : e.length - i - 1;
        },
        _valueMin: function() {
            return this.options.min;
        },
        _valueMax: function() {
            return this.max;
        },
        _refreshRange: function(t) {
            "vertical" === t && this.range.css({
                width: "",
                left: ""
            }), "horizontal" === t && this.range.css({
                height: "",
                bottom: ""
            });
        },
        _refreshValue: function() {
            var e, i, s, n, o, a = this.options.range, r = this.options, l = this, h = this._animateOff ? !1 : r.animate, c = {};
            this._hasMultipleValues() ? this.handles.each(function(s) {
                i = 100 * ((l.values(s) - l._valueMin()) / (l._valueMax() - l._valueMin())), c["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", 
                t(this).stop(1, 1)[h ? "animate" : "css"](c, r.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({
                    left: i + "%"
                }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({
                    width: i - e + "%"
                }, {
                    queue: !1,
                    duration: r.animate
                })) : (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({
                    bottom: i + "%"
                }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({
                    height: i - e + "%"
                }, {
                    queue: !1,
                    duration: r.animate
                }))), e = i;
            }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? 100 * ((s - n) / (o - n)) : 0, 
            c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](c, r.animate), 
            "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                width: i + "%"
            }, r.animate), "max" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                width: 100 - i + "%"
            }, r.animate), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                height: i + "%"
            }, r.animate), "max" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({
                height: 100 - i + "%"
            }, r.animate));
        },
        _handleEvents: {
            keydown: function(e) {
                var i, s, n, o, a = t(e.target).data("ui-slider-handle-index");
                switch (e.keyCode) {
                  case t.ui.keyCode.HOME:
                  case t.ui.keyCode.END:
                  case t.ui.keyCode.PAGE_UP:
                  case t.ui.keyCode.PAGE_DOWN:
                  case t.ui.keyCode.UP:
                  case t.ui.keyCode.RIGHT:
                  case t.ui.keyCode.DOWN:
                  case t.ui.keyCode.LEFT:
                    if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(t(e.target), null, "ui-state-active"), 
                    i = this._start(e, a), i === !1)) return;
                }
                switch (o = this.options.step, s = n = this._hasMultipleValues() ? this.values(a) : this.value(), 
                e.keyCode) {
                  case t.ui.keyCode.HOME:
                    n = this._valueMin();
                    break;

                  case t.ui.keyCode.END:
                    n = this._valueMax();
                    break;

                  case t.ui.keyCode.PAGE_UP:
                    n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);
                    break;

                  case t.ui.keyCode.PAGE_DOWN:
                    n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);
                    break;

                  case t.ui.keyCode.UP:
                  case t.ui.keyCode.RIGHT:
                    if (s === this._valueMax()) return;
                    n = this._trimAlignValue(s + o);
                    break;

                  case t.ui.keyCode.DOWN:
                  case t.ui.keyCode.LEFT:
                    if (s === this._valueMin()) return;
                    n = this._trimAlignValue(s - o);
                }
                this._slide(e, a, n);
            },
            keyup: function(e) {
                var i = t(e.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), 
                this._removeClass(t(e.target), null, "ui-state-active"));
            }
        }
    });
});

/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function(f) {
        function g() {
            var b = 0;
            i.each(function() {
                var c = a(this);
                if (!j.skip_invisible || c.is(":visible")) if (a.abovethetop(this, j) || a.leftofbegin(this, j)) ; else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                    if (++b > j.failure_limit) return !1;
                } else c.trigger("appear"), b = 0;
            });
        }
        var h, i = this, j = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: b,
            data_attribute: "original",
            skip_invisible: !1,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), 
        d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), 
        h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function() {
            return g();
        }), this.each(function() {
            var b = this, c = a(b);
            b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), 
            c.one("appear", function() {
                if (!this.loaded) {
                    if (j.appear) {
                        var d = i.length;
                        j.appear.call(b, d, j);
                    }
                    a("<img />").bind("load", function() {
                        var d = c.attr("data-" + j.data_attribute);
                        c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), 
                        c[j.effect](j.effect_speed), b.loaded = !0;
                        var e = a.grep(i, function(a) {
                            return !a.loaded;
                        });
                        if (i = a(e), j.load) {
                            var f = i.length;
                            j.load.call(b, f, j);
                        }
                    }).attr("src", c.attr("data-" + j.data_attribute));
                }
            }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function() {
                b.loaded || c.trigger("appear");
            });
        }), e.bind("resize", function() {
            g();
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function() {
                a(this).trigger("appear");
            });
        }), a(c).ready(function() {
            g();
        }), this;
    }, a.belowthefold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), 
        g <= a(c).offset().top - f.threshold;
    }, a.rightoffold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), 
        g <= a(c).offset().left - f.threshold;
    }, a.abovethetop = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, 
        g >= a(c).offset().top + f.threshold + a(c).height();
    }, a.leftofbegin = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, 
        g >= a(c).offset().left + f.threshold + a(c).width();
    }, a.inviewport = function(b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c));
    }, a.extend(a.expr[":"], {
        "below-the-fold": function(b) {
            return a.belowthefold(b, {
                threshold: 0
            });
        },
        "above-the-top": function(b) {
            return !a.belowthefold(b, {
                threshold: 0
            });
        },
        "right-of-screen": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            });
        },
        "left-of-screen": function(b) {
            return !a.rightoffold(b, {
                threshold: 0
            });
        },
        "in-viewport": function(b) {
            return a.inviewport(b, {
                threshold: 0
            });
        },
        "above-the-fold": function(b) {
            return !a.belowthefold(b, {
                threshold: 0
            });
        },
        "right-of-fold": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            });
        },
        "left-of-fold": function(b) {
            return !a.rightoffold(b, {
                threshold: 0
            });
        }
    });
}(jQuery, window, document);

(function(e) {
    "function" === typeof define && define.amd ? define([ "jquery" ], e) : "object" === typeof exports ? module.exports = e(require("jquery")) : e(jQuery);
})(function(e) {
    var A = !1, E = !1, O = 0, P = 2e3, z = 0, I = [ "webkit", "ms", "moz", "o" ], u = window.requestAnimationFrame || !1, v = window.cancelAnimationFrame || !1;
    if (!u) for (var Q in I) {
        var F = I[Q];
        u || (u = window[F + "RequestAnimationFrame"]);
        v || (v = window[F + "CancelAnimationFrame"] || window[F + "CancelRequestAnimationFrame"]);
    }
    var x = window.MutationObserver || window.WebKitMutationObserver || !1, J = {
        zindex: "auto",
        cursoropacitymin: 0,
        cursoropacitymax: 1,
        cursorcolor: "#424242",
        cursorwidth: "5px",
        cursorborder: "1px solid #fff",
        cursorborderradius: "5px",
        scrollspeed: 60,
        mousescrollstep: 24,
        touchbehavior: !1,
        hwacceleration: !0,
        usetransition: !0,
        boxzoom: !1,
        dblclickzoom: !0,
        gesturezoom: !0,
        grabcursorenabled: !0,
        autohidemode: !0,
        background: "",
        iframeautoresize: !0,
        cursorminheight: 32,
        preservenativescrolling: !0,
        railoffset: !1,
        railhoffset: !1,
        bouncescroll: !0,
        spacebarenabled: !0,
        railpadding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        disableoutline: !0,
        horizrailenabled: !0,
        railalign: "right",
        railvalign: "bottom",
        enabletranslate3d: !0,
        enablemousewheel: !0,
        enablekeyboard: !0,
        smoothscroll: !0,
        sensitiverail: !0,
        enablemouselockapi: !0,
        cursorfixedheight: !1,
        directionlockdeadzone: 6,
        hidecursordelay: 400,
        nativeparentscrolling: !0,
        enablescrollonselection: !0,
        overflowx: !0,
        overflowy: !0,
        cursordragspeed: .3,
        rtlmode: "auto",
        cursordragontouch: !1,
        oneaxismousemode: "auto",
        scriptpath: function() {
            var e = document.getElementsByTagName("script"), e = e.length ? e[e.length - 1].src.split("?")[0] : "";
            return 0 < e.split("/").length ? e.split("/").slice(0, -1).join("/") + "/" : "";
        }(),
        preventmultitouchscrolling: !0
    }, G = !1, R = function() {
        if (G) return G;
        var e = document.createElement("DIV"), c = e.style, h = navigator.userAgent, n = navigator.platform, d = {
            haspointerlock: "pointerLockElement" in document || "webkitPointerLockElement" in document || "mozPointerLockElement" in document
        };
        d.isopera = "opera" in window;
        d.isopera12 = d.isopera && "getUserMedia" in navigator;
        d.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini);
        d.isie = "all" in document && "attachEvent" in e && !d.isopera;
        d.isieold = d.isie && !("msInterpolationMode" in c);
        d.isie7 = d.isie && !d.isieold && (!("documentMode" in document) || 7 == document.documentMode);
        d.isie8 = d.isie && "documentMode" in document && 8 == document.documentMode;
        d.isie9 = d.isie && "performance" in window && 9 <= document.documentMode;
        d.isie10 = d.isie && "performance" in window && 10 == document.documentMode;
        d.isie11 = "msRequestFullscreen" in e && 11 <= document.documentMode;
        d.isieedge = navigator.userAgent.match(/Edge\/12\./);
        d.isie9mobile = /iemobile.9/i.test(h);
        d.isie9mobile && (d.isie9 = !1);
        d.isie7mobile = !d.isie9mobile && d.isie7 && /iemobile/i.test(h);
        d.ismozilla = "MozAppearance" in c;
        d.iswebkit = "WebkitAppearance" in c;
        d.ischrome = "chrome" in window;
        d.ischrome22 = d.ischrome && d.haspointerlock;
        d.ischrome26 = d.ischrome && "transition" in c;
        d.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window;
        d.hasmstouch = window.MSPointerEvent || !1;
        d.hasw3ctouch = (window.PointerEvent || !1) && (0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints);
        d.ismac = /^mac$/i.test(n);
        d.isios = d.cantouch && /iphone|ipad|ipod/i.test(n);
        d.isios4 = d.isios && !("seal" in Object);
        d.isios7 = d.isios && "webkitHidden" in document;
        d.isandroid = /android/i.test(h);
        d.haseventlistener = "addEventListener" in e;
        d.trstyle = !1;
        d.hastransform = !1;
        d.hastranslate3d = !1;
        d.transitionstyle = !1;
        d.hastransition = !1;
        d.transitionend = !1;
        n = [ "transform", "msTransform", "webkitTransform", "MozTransform", "OTransform" ];
        for (h = 0; h < n.length; h++) if ("undefined" != typeof c[n[h]]) {
            d.trstyle = n[h];
            break;
        }
        d.hastransform = !!d.trstyle;
        d.hastransform && (c[d.trstyle] = "translate3d(1px,2px,3px)", d.hastranslate3d = /translate3d/.test(c[d.trstyle]));
        d.transitionstyle = !1;
        d.prefixstyle = "";
        d.transitionend = !1;
        for (var n = "transition webkitTransition msTransition MozTransition OTransition OTransition KhtmlTransition".split(" "), p = " -webkit- -ms- -moz- -o- -o -khtml-".split(" "), q = "transitionend webkitTransitionEnd msTransitionEnd transitionend otransitionend oTransitionEnd KhtmlTransitionEnd".split(" "), h = 0; h < n.length; h++) if (n[h] in c) {
            d.transitionstyle = n[h];
            d.prefixstyle = p[h];
            d.transitionend = q[h];
            break;
        }
        d.ischrome26 && (d.prefixstyle = p[1]);
        d.hastransition = d.transitionstyle;
        a: {
            h = [ "-webkit-grab", "-moz-grab", "grab" ];
            if (d.ischrome && !d.ischrome22 || d.isie) h = [];
            for (n = 0; n < h.length; n++) if (p = h[n], c.cursor = p, c.cursor == p) {
                c = p;
                break a;
            }
            c = "url(//mail.google.com/mail/images/2/openhand.cur),n-resize";
        }
        d.cursorgrabvalue = c;
        d.hasmousecapture = "setCapture" in e;
        d.hasMutationObserver = !1 !== x;
        return G = d;
    }, S = function(k, c) {
        function h() {
            var b = a.doc.css(f.trstyle);
            return b && "matrix" == b.substr(0, 6) ? b.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1;
        }
        function n() {
            var b = a.win;
            if ("zIndex" in b) return b.zIndex();
            for (;0 < b.length && 9 != b[0].nodeType; ) {
                var g = b.css("zIndex");
                if (!isNaN(g) && 0 != g) return parseInt(g);
                b = b.parent();
            }
            return !1;
        }
        function d(b, g, l) {
            g = b.css(g);
            b = parseFloat(g);
            return isNaN(b) ? (b = y[g] || 0, l = 3 == b ? l ? a.win.outerHeight() - a.win.innerHeight() : a.win.outerWidth() - a.win.innerWidth() : 1, 
            a.isie8 && b && (b += 1), l ? b : 0) : b;
        }
        function p(b, g, l, c) {
            a._bind(b, g, function(a) {
                a = a ? a : window.event;
                var c = {
                    original: a,
                    target: a.target || a.srcElement,
                    type: "wheel",
                    deltaMode: "MozMousePixelScroll" == a.type ? 0 : 1,
                    deltaX: 0,
                    deltaZ: 0,
                    preventDefault: function() {
                        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                        return !1;
                    },
                    stopImmediatePropagation: function() {
                        a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.cancelBubble = !0;
                    }
                };
                "mousewheel" == g ? (c.deltaY = -.025 * a.wheelDelta, a.wheelDeltaX && (c.deltaX = -.025 * a.wheelDeltaX)) : c.deltaY = a.detail;
                return l.call(b, c);
            }, c);
        }
        function q(b, g, c) {
            var d, f;
            0 == b.deltaMode ? (d = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaX), f = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaY)) : 1 == b.deltaMode && (d = -Math.floor(b.deltaX * a.opt.mousescrollstep), 
            f = -Math.floor(b.deltaY * a.opt.mousescrollstep));
            g && a.opt.oneaxismousemode && 0 == d && f && (d = f, f = 0, c && (0 > d ? a.getScrollLeft() >= a.page.maxw : 0 >= a.getScrollLeft()) && (f = d, 
            d = 0));
            d && (a.scrollmom && a.scrollmom.stop(), a.lastdeltax += d, a.debounced("mousewheelx", function() {
                var b = a.lastdeltax;
                a.lastdeltax = 0;
                a.rail.drag || a.doScrollLeftBy(b);
            }, 15));
            if (f) {
                if (a.opt.nativeparentscrolling && c && !a.ispage && !a.zoomactive) if (0 > f) {
                    if (a.getScrollTop() >= a.page.maxh) return !0;
                } else if (0 >= a.getScrollTop()) return !0;
                a.scrollmom && a.scrollmom.stop();
                a.lastdeltay += f;
                a.debounced("mousewheely", function() {
                    var b = a.lastdeltay;
                    a.lastdeltay = 0;
                    a.rail.drag || a.doScrollBy(b);
                }, 15);
            }
            b.stopImmediatePropagation();
            return b.preventDefault();
        }
        var a = this;
        this.version = "3.6.6";
        this.name = "nicescroll";
        this.me = c;
        this.opt = {
            doc: e("body"),
            win: !1
        };
        e.extend(this.opt, J);
        this.opt.snapbackspeed = 80;
        if (k) for (var H in a.opt) "undefined" != typeof k[H] && (a.opt[H] = k[H]);
        this.iddoc = (this.doc = a.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
        this.ispage = /^BODY|HTML/.test(a.opt.win ? a.opt.win[0].nodeName : this.doc[0].nodeName);
        this.haswrapper = !1 !== a.opt.win;
        this.win = a.opt.win || (this.ispage ? e(window) : this.doc);
        this.docscroll = this.ispage && !this.haswrapper ? e(window) : this.win;
        this.body = e("body");
        this.iframe = this.isfixed = this.viewport = !1;
        this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;
        this.istextarea = "TEXTAREA" == this.win[0].nodeName;
        this.forcescreen = !1;
        this.canshowonmouseevent = "scroll" != a.opt.autohidemode;
        this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1;
        this.scroll = {
            x: 0,
            y: 0
        };
        this.scrollratio = {
            x: 0,
            y: 0
        };
        this.cursorheight = 20;
        this.scrollvaluemax = 0;
        this.isrtlmode = "auto" == this.opt.rtlmode ? "rtl" == (this.win[0] == window ? this.body : this.win).css("direction") : !0 === this.opt.rtlmode;
        this.observerbody = this.observerremover = this.observer = this.scrollmom = this.scrollrunning = !1;
        do this.id = "ascrail" + P++; while (document.getElementById(this.id));
        this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail = !1;
        this.visibility = !0;
        this.hidden = this.locked = this.railslocked = !1;
        this.cursoractive = !0;
        this.wheelprevented = !1;
        this.overflowx = a.opt.overflowx;
        this.overflowy = a.opt.overflowy;
        this.nativescrollingarea = !1;
        this.checkarea = 0;
        this.events = [];
        this.saved = {};
        this.delaylist = {};
        this.synclist = {};
        this.lastdeltay = this.lastdeltax = 0;
        this.detected = R();
        var f = e.extend({}, this.detected);
        this.ishwscroll = (this.canhwscroll = f.hastransform && a.opt.hwacceleration) && a.haswrapper;
        this.hasreversehr = this.isrtlmode && !f.iswebkit;
        this.istouchcapable = !1;
        !f.cantouch || f.isios || f.isandroid || !f.iswebkit && !f.ismozilla || (this.istouchcapable = !0, 
        f.cantouch = !1);
        a.opt.enablemouselockapi || (f.hasmousecapture = !1, f.haspointerlock = !1);
        this.debounced = function(b, g, c) {
            var d = a.delaylist[b];
            a.delaylist[b] = g;
            d || (a.debouncedelayed = setTimeout(function() {
                if (a) {
                    var g = a.delaylist[b];
                    a.delaylist[b] = !1;
                    g.call(a);
                }
            }, c));
        };
        var t = !1;
        this.synched = function(b, g) {
            a.synclist[b] = g;
            (function() {
                t || (u(function() {
                    t = !1;
                    for (var b in a.synclist) {
                        var g = a.synclist[b];
                        g && g.call(a);
                        a.synclist[b] = !1;
                    }
                }), t = !0);
            })();
            return b;
        };
        this.unsynched = function(b) {
            a.synclist[b] && (a.synclist[b] = !1);
        };
        this.css = function(b, g) {
            for (var c in g) a.saved.css.push([ b, c, b.css(c) ]), b.css(c, g[c]);
        };
        this.scrollTop = function(b) {
            return "undefined" == typeof b ? a.getScrollTop() : a.setScrollTop(b);
        };
        this.scrollLeft = function(b) {
            return "undefined" == typeof b ? a.getScrollLeft() : a.setScrollLeft(b);
        };
        var B = function(a, g, c, d, f, e, h) {
            this.st = a;
            this.ed = g;
            this.spd = c;
            this.p1 = d || 0;
            this.p2 = f || 1;
            this.p3 = e || 0;
            this.p4 = h || 1;
            this.ts = new Date().getTime();
            this.df = this.ed - this.st;
        };
        B.prototype = {
            B2: function(a) {
                return 3 * a * a * (1 - a);
            },
            B3: function(a) {
                return 3 * a * (1 - a) * (1 - a);
            },
            B4: function(a) {
                return (1 - a) * (1 - a) * (1 - a);
            },
            getNow: function() {
                var a = 1 - (new Date().getTime() - this.ts) / this.spd, g = this.B2(a) + this.B3(a) + this.B4(a);
                return 0 > a ? this.ed : this.st + Math.round(this.df * g);
            },
            update: function(a, g) {
                this.st = this.getNow();
                this.ed = a;
                this.spd = g;
                this.ts = new Date().getTime();
                this.df = this.ed - this.st;
                return this;
            }
        };
        if (this.ishwscroll) {
            this.doc.translate = {
                x: 0,
                y: 0,
                tx: "0px",
                ty: "0px"
            };
            f.hastranslate3d && f.isios && this.doc.css("-webkit-backface-visibility", "hidden");
            this.getScrollTop = function(b) {
                if (!b) {
                    if (b = h()) return 16 == b.length ? -b[13] : -b[5];
                    if (a.timerscroll && a.timerscroll.bz) return a.timerscroll.bz.getNow();
                }
                return a.doc.translate.y;
            };
            this.getScrollLeft = function(b) {
                if (!b) {
                    if (b = h()) return 16 == b.length ? -b[12] : -b[4];
                    if (a.timerscroll && a.timerscroll.bh) return a.timerscroll.bh.getNow();
                }
                return a.doc.translate.x;
            };
            this.notifyScrollEvent = function(a) {
                var g = document.createEvent("UIEvents");
                g.initUIEvent("scroll", !1, !0, window, 1);
                g.niceevent = !0;
                a.dispatchEvent(g);
            };
            var L = this.isrtlmode ? 1 : -1;
            f.hastranslate3d && a.opt.enabletranslate3d ? (this.setScrollTop = function(b, g) {
                a.doc.translate.y = b;
                a.doc.translate.ty = -1 * b + "px";
                a.doc.css(f.trstyle, "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
                g || a.notifyScrollEvent(a.win[0]);
            }, this.setScrollLeft = function(b, g) {
                a.doc.translate.x = b;
                a.doc.translate.tx = b * L + "px";
                a.doc.css(f.trstyle, "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
                g || a.notifyScrollEvent(a.win[0]);
            }) : (this.setScrollTop = function(b, g) {
                a.doc.translate.y = b;
                a.doc.translate.ty = -1 * b + "px";
                a.doc.css(f.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
                g || a.notifyScrollEvent(a.win[0]);
            }, this.setScrollLeft = function(b, g) {
                a.doc.translate.x = b;
                a.doc.translate.tx = b * L + "px";
                a.doc.css(f.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
                g || a.notifyScrollEvent(a.win[0]);
            });
        } else this.getScrollTop = function() {
            return a.docscroll.scrollTop();
        }, this.setScrollTop = function(b) {
            return setTimeout(function() {
                a.docscroll.scrollTop(b);
            }, 1);
        }, this.getScrollLeft = function() {
            return a.detected.ismozilla && a.isrtlmode ? Math.abs(a.docscroll.scrollLeft()) : a.docscroll.scrollLeft();
        }, this.setScrollLeft = function(b) {
            return setTimeout(function() {
                a.docscroll.scrollLeft(a.detected.ismozilla && a.isrtlmode ? -b : b);
            }, 1);
        };
        this.getTarget = function(a) {
            return a ? a.target ? a.target : a.srcElement ? a.srcElement : !1 : !1;
        };
        this.hasParent = function(a, g) {
            if (!a) return !1;
            for (var c = a.target || a.srcElement || a || !1; c && c.id != g; ) c = c.parentNode || !1;
            return !1 !== c;
        };
        var y = {
            thin: 1,
            medium: 3,
            thick: 5
        };
        this.getDocumentScrollOffset = function() {
            return {
                top: window.pageYOffset || document.documentElement.scrollTop,
                left: window.pageXOffset || document.documentElement.scrollLeft
            };
        };
        this.getOffset = function() {
            if (a.isfixed) {
                var b = a.win.offset(), g = a.getDocumentScrollOffset();
                b.top -= g.top;
                b.left -= g.left;
                return b;
            }
            b = a.win.offset();
            if (!a.viewport) return b;
            g = a.viewport.offset();
            return {
                top: b.top - g.top,
                left: b.left - g.left
            };
        };
        this.updateScrollBar = function(b) {
            if (a.ishwscroll) a.rail.css({
                height: a.win.innerHeight() - (a.opt.railpadding.top + a.opt.railpadding.bottom)
            }), a.railh && a.railh.css({
                width: a.win.innerWidth() - (a.opt.railpadding.left + a.opt.railpadding.right)
            }); else {
                var g = a.getOffset(), c = g.top, f = g.left - (a.opt.railpadding.left + a.opt.railpadding.right), c = c + d(a.win, "border-top-width", !0), f = f + (a.rail.align ? a.win.outerWidth() - d(a.win, "border-right-width") - a.rail.width : d(a.win, "border-left-width")), e = a.opt.railoffset;
                e && (e.top && (c += e.top), e.left && (f += e.left));
                a.railslocked || a.rail.css({
                    top: c,
                    left: f,
                    height: (b ? b.h : a.win.innerHeight()) - (a.opt.railpadding.top + a.opt.railpadding.bottom)
                });
                a.zoom && a.zoom.css({
                    top: c + 1,
                    left: 1 == a.rail.align ? f - 20 : f + a.rail.width + 4
                });
                if (a.railh && !a.railslocked) {
                    c = g.top;
                    f = g.left;
                    if (e = a.opt.railhoffset) e.top && (c += e.top), e.left && (f += e.left);
                    b = a.railh.align ? c + d(a.win, "border-top-width", !0) + a.win.innerHeight() - a.railh.height : c + d(a.win, "border-top-width", !0);
                    f += d(a.win, "border-left-width");
                    a.railh.css({
                        top: b - (a.opt.railpadding.top + a.opt.railpadding.bottom),
                        left: f,
                        width: a.railh.width
                    });
                }
            }
        };
        this.doRailClick = function(b, g, c) {
            var f;
            a.railslocked || (a.cancelEvent(b), g ? (g = c ? a.doScrollLeft : a.doScrollTop, 
            f = c ? (b.pageX - a.railh.offset().left - a.cursorwidth / 2) * a.scrollratio.x : (b.pageY - a.rail.offset().top - a.cursorheight / 2) * a.scrollratio.y, 
            g(f)) : (g = c ? a.doScrollLeftBy : a.doScrollBy, f = c ? a.scroll.x : a.scroll.y, 
            b = c ? b.pageX - a.railh.offset().left : b.pageY - a.rail.offset().top, c = c ? a.view.w : a.view.h, 
            g(f >= b ? c : -c)));
        };
        a.hasanimationframe = u;
        a.hascancelanimationframe = v;
        a.hasanimationframe ? a.hascancelanimationframe || (v = function() {
            a.cancelAnimationFrame = !0;
        }) : (u = function(a) {
            return setTimeout(a, 15 - Math.floor(+new Date() / 1e3) % 16);
        }, v = clearInterval);
        this.init = function() {
            a.saved.css = [];
            if (f.isie7mobile || f.isoperamini) return !0;
            f.hasmstouch && a.css(a.ispage ? e("html") : a.win, {
                "-ms-touch-action": "none"
            });
            a.zindex = "auto";
            a.zindex = a.ispage || "auto" != a.opt.zindex ? a.opt.zindex : n() || "auto";
            !a.ispage && "auto" != a.zindex && a.zindex > z && (z = a.zindex);
            a.isie && 0 == a.zindex && "auto" == a.opt.zindex && (a.zindex = "auto");
            if (!a.ispage || !f.cantouch && !f.isieold && !f.isie9mobile) {
                var b = a.docscroll;
                a.ispage && (b = a.haswrapper ? a.win : a.doc);
                f.isie9mobile || a.css(b, {
                    "overflow-y": "hidden"
                });
                a.ispage && f.isie7 && ("BODY" == a.doc[0].nodeName ? a.css(e("html"), {
                    "overflow-y": "hidden"
                }) : "HTML" == a.doc[0].nodeName && a.css(e("body"), {
                    "overflow-y": "hidden"
                }));
                !f.isios || a.ispage || a.haswrapper || a.css(e("body"), {
                    "-webkit-overflow-scrolling": "touch"
                });
                var c = e(document.createElement("div"));
                c.css({
                    position: "relative",
                    top: 0,
                    "float": "right",
                    width: a.opt.cursorwidth,
                    height: "0px",
                    "background-color": a.opt.cursorcolor,
                    border: a.opt.cursorborder,
                    "background-clip": "padding-box",
                    "-webkit-border-radius": a.opt.cursorborderradius,
                    "-moz-border-radius": a.opt.cursorborderradius,
                    "border-radius": a.opt.cursorborderradius
                });
                c.hborder = parseFloat(c.outerHeight() - c.innerHeight());
                c.addClass("nicescroll-cursors");
                a.cursor = c;
                var l = e(document.createElement("div"));
                l.attr("id", a.id);
                l.addClass("nicescroll-rails nicescroll-rails-vr");
                var d, h, k = [ "left", "right", "top", "bottom" ], K;
                for (K in k) h = k[K], (d = a.opt.railpadding[h]) ? l.css("padding-" + h, d + "px") : a.opt.railpadding[h] = 0;
                l.append(c);
                l.width = Math.max(parseFloat(a.opt.cursorwidth), c.outerWidth());
                l.css({
                    width: l.width + "px",
                    zIndex: a.zindex,
                    background: a.opt.background,
                    cursor: "default"
                });
                l.visibility = !0;
                l.scrollable = !0;
                l.align = "left" == a.opt.railalign ? 0 : 1;
                a.rail = l;
                c = a.rail.drag = !1;
                !a.opt.boxzoom || a.ispage || f.isieold || (c = document.createElement("div"), a.bind(c, "click", a.doZoom), 
                a.bind(c, "mouseenter", function() {
                    a.zoom.css("opacity", a.opt.cursoropacitymax);
                }), a.bind(c, "mouseleave", function() {
                    a.zoom.css("opacity", a.opt.cursoropacitymin);
                }), a.zoom = e(c), a.zoom.css({
                    cursor: "pointer",
                    "z-index": a.zindex,
                    backgroundImage: "url(" + a.opt.scriptpath + "zoomico.png)",
                    height: 18,
                    width: 18,
                    backgroundPosition: "0px 0px"
                }), a.opt.dblclickzoom && a.bind(a.win, "dblclick", a.doZoom), f.cantouch && a.opt.gesturezoom && (a.ongesturezoom = function(b) {
                    1.5 < b.scale && a.doZoomIn(b);
                    .8 > b.scale && a.doZoomOut(b);
                    return a.cancelEvent(b);
                }, a.bind(a.win, "gestureend", a.ongesturezoom)));
                a.railh = !1;
                var m;
                a.opt.horizrailenabled && (a.css(b, {
                    "overflow-x": "hidden"
                }), c = e(document.createElement("div")), c.css({
                    position: "absolute",
                    top: 0,
                    height: a.opt.cursorwidth,
                    width: "0px",
                    "background-color": a.opt.cursorcolor,
                    border: a.opt.cursorborder,
                    "background-clip": "padding-box",
                    "-webkit-border-radius": a.opt.cursorborderradius,
                    "-moz-border-radius": a.opt.cursorborderradius,
                    "border-radius": a.opt.cursorborderradius
                }), f.isieold && c.css({
                    overflow: "hidden"
                }), c.wborder = parseFloat(c.outerWidth() - c.innerWidth()), c.addClass("nicescroll-cursors"), 
                a.cursorh = c, m = e(document.createElement("div")), m.attr("id", a.id + "-hr"), 
                m.addClass("nicescroll-rails nicescroll-rails-hr"), m.height = Math.max(parseFloat(a.opt.cursorwidth), c.outerHeight()), 
                m.css({
                    height: m.height + "px",
                    zIndex: a.zindex,
                    background: a.opt.background
                }), m.append(c), m.visibility = !0, m.scrollable = !0, m.align = "top" == a.opt.railvalign ? 0 : 1, 
                a.railh = m, a.railh.drag = !1);
                a.ispage ? (l.css({
                    position: "fixed",
                    top: "0px",
                    height: "100%"
                }), l.align ? l.css({
                    right: "0px"
                }) : l.css({
                    left: "0px"
                }), a.body.append(l), a.railh && (m.css({
                    position: "fixed",
                    left: "0px",
                    width: "100%"
                }), m.align ? m.css({
                    bottom: "0px"
                }) : m.css({
                    top: "0px"
                }), a.body.append(m))) : (a.ishwscroll ? ("static" == a.win.css("position") && a.css(a.win, {
                    position: "relative"
                }), b = "HTML" == a.win[0].nodeName ? a.body : a.win, e(b).scrollTop(0).scrollLeft(0), 
                a.zoom && (a.zoom.css({
                    position: "absolute",
                    top: 1,
                    right: 0,
                    "margin-right": l.width + 4
                }), b.append(a.zoom)), l.css({
                    position: "absolute",
                    top: 0
                }), l.align ? l.css({
                    right: 0
                }) : l.css({
                    left: 0
                }), b.append(l), m && (m.css({
                    position: "absolute",
                    left: 0,
                    bottom: 0
                }), m.align ? m.css({
                    bottom: 0
                }) : m.css({
                    top: 0
                }), b.append(m))) : (a.isfixed = "fixed" == a.win.css("position"), b = a.isfixed ? "fixed" : "absolute", 
                a.isfixed || (a.viewport = a.getViewport(a.win[0])), a.viewport && (a.body = a.viewport, 
                0 == /fixed|absolute/.test(a.viewport.css("position")) && a.css(a.viewport, {
                    position: "relative"
                })), l.css({
                    position: b
                }), a.zoom && a.zoom.css({
                    position: b
                }), a.updateScrollBar(), a.body.append(l), a.zoom && a.body.append(a.zoom), a.railh && (m.css({
                    position: b
                }), a.body.append(m))), f.isios && a.css(a.win, {
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                    "-webkit-touch-callout": "none"
                }), f.isie && a.opt.disableoutline && a.win.attr("hideFocus", "true"), f.iswebkit && a.opt.disableoutline && a.win.css({
                    outline: "none"
                }));
                !1 === a.opt.autohidemode ? (a.autohidedom = !1, a.rail.css({
                    opacity: a.opt.cursoropacitymax
                }), a.railh && a.railh.css({
                    opacity: a.opt.cursoropacitymax
                })) : !0 === a.opt.autohidemode || "leave" === a.opt.autohidemode ? (a.autohidedom = e().add(a.rail), 
                f.isie8 && (a.autohidedom = a.autohidedom.add(a.cursor)), a.railh && (a.autohidedom = a.autohidedom.add(a.railh)), 
                a.railh && f.isie8 && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "scroll" == a.opt.autohidemode ? (a.autohidedom = e().add(a.rail), 
                a.railh && (a.autohidedom = a.autohidedom.add(a.railh))) : "cursor" == a.opt.autohidemode ? (a.autohidedom = e().add(a.cursor), 
                a.railh && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "hidden" == a.opt.autohidemode && (a.autohidedom = !1, 
                a.hide(), a.railslocked = !1);
                if (f.isie9mobile) a.scrollmom = new M(a), a.onmangotouch = function() {
                    var b = a.getScrollTop(), c = a.getScrollLeft();
                    if (b == a.scrollmom.lastscrolly && c == a.scrollmom.lastscrollx) return !0;
                    var g = b - a.mangotouch.sy, f = c - a.mangotouch.sx;
                    if (0 != Math.round(Math.sqrt(Math.pow(f, 2) + Math.pow(g, 2)))) {
                        var d = 0 > g ? -1 : 1, l = 0 > f ? -1 : 1, e = +new Date();
                        a.mangotouch.lazy && clearTimeout(a.mangotouch.lazy);
                        80 < e - a.mangotouch.tm || a.mangotouch.dry != d || a.mangotouch.drx != l ? (a.scrollmom.stop(), 
                        a.scrollmom.reset(c, b), a.mangotouch.sy = b, a.mangotouch.ly = b, a.mangotouch.sx = c, 
                        a.mangotouch.lx = c, a.mangotouch.dry = d, a.mangotouch.drx = l, a.mangotouch.tm = e) : (a.scrollmom.stop(), 
                        a.scrollmom.update(a.mangotouch.sx - f, a.mangotouch.sy - g), a.mangotouch.tm = e, 
                        g = Math.max(Math.abs(a.mangotouch.ly - b), Math.abs(a.mangotouch.lx - c)), a.mangotouch.ly = b, 
                        a.mangotouch.lx = c, 2 < g && (a.mangotouch.lazy = setTimeout(function() {
                            a.mangotouch.lazy = !1;
                            a.mangotouch.dry = 0;
                            a.mangotouch.drx = 0;
                            a.mangotouch.tm = 0;
                            a.scrollmom.doMomentum(30);
                        }, 100)));
                    }
                }, l = a.getScrollTop(), m = a.getScrollLeft(), a.mangotouch = {
                    sy: l,
                    ly: l,
                    dry: 0,
                    sx: m,
                    lx: m,
                    drx: 0,
                    lazy: !1,
                    tm: 0
                }, a.bind(a.docscroll, "scroll", a.onmangotouch); else {
                    if (f.cantouch || a.istouchcapable || a.opt.touchbehavior || f.hasmstouch) {
                        a.scrollmom = new M(a);
                        a.ontouchstart = function(b) {
                            if (b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
                            a.hasmoving = !1;
                            if (!a.railslocked) {
                                var c;
                                if (f.hasmstouch) for (c = b.target ? b.target : !1; c; ) {
                                    var g = e(c).getNiceScroll();
                                    if (0 < g.length && g[0].me == a.me) break;
                                    if (0 < g.length) return !1;
                                    if ("DIV" == c.nodeName && c.id == a.id) break;
                                    c = c.parentNode ? c.parentNode : !1;
                                }
                                a.cancelScroll();
                                if ((c = a.getTarget(b)) && /INPUT/i.test(c.nodeName) && /range/i.test(c.type)) return a.stopPropagation(b);
                                !("clientX" in b) && "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, 
                                b.clientY = b.changedTouches[0].clientY);
                                a.forcescreen && (g = b, b = {
                                    original: b.original ? b.original : b
                                }, b.clientX = g.screenX, b.clientY = g.screenY);
                                a.rail.drag = {
                                    x: b.clientX,
                                    y: b.clientY,
                                    sx: a.scroll.x,
                                    sy: a.scroll.y,
                                    st: a.getScrollTop(),
                                    sl: a.getScrollLeft(),
                                    pt: 2,
                                    dl: !1
                                };
                                if (a.ispage || !a.opt.directionlockdeadzone) a.rail.drag.dl = "f"; else {
                                    var g = e(window).width(), d = e(window).height(), d = Math.max(0, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - d), g = Math.max(0, Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - g);
                                    a.rail.drag.ck = !a.rail.scrollable && a.railh.scrollable ? 0 < d ? "v" : !1 : a.rail.scrollable && !a.railh.scrollable ? 0 < g ? "h" : !1 : !1;
                                    a.rail.drag.ck || (a.rail.drag.dl = "f");
                                }
                                a.opt.touchbehavior && a.isiframe && f.isie && (g = a.win.position(), a.rail.drag.x += g.left, 
                                a.rail.drag.y += g.top);
                                a.hasmoving = !1;
                                a.lastmouseup = !1;
                                a.scrollmom.reset(b.clientX, b.clientY);
                                if (!f.cantouch && !this.istouchcapable && !b.pointerType) {
                                    if (!c || !/INPUT|SELECT|TEXTAREA/i.test(c.nodeName)) return !a.ispage && f.hasmousecapture && c.setCapture(), 
                                    a.opt.touchbehavior ? (c.onclick && !c._onclick && (c._onclick = c.onclick, c.onclick = function(b) {
                                        if (a.hasmoving) return !1;
                                        c._onclick.call(this, b);
                                    }), a.cancelEvent(b)) : a.stopPropagation(b);
                                    /SUBMIT|CANCEL|BUTTON/i.test(e(c).attr("type")) && (pc = {
                                        tg: c,
                                        click: !1
                                    }, a.preventclick = pc);
                                }
                            }
                        };
                        a.ontouchend = function(b) {
                            if (!a.rail.drag) return !0;
                            if (2 == a.rail.drag.pt) {
                                if (b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
                                a.scrollmom.doMomentum();
                                a.rail.drag = !1;
                                if (a.hasmoving && (a.lastmouseup = !0, a.hideCursor(), f.hasmousecapture && document.releaseCapture(), 
                                !f.cantouch)) return a.cancelEvent(b);
                            } else if (1 == a.rail.drag.pt) return a.onmouseup(b);
                        };
                        var p = a.opt.touchbehavior && a.isiframe && !f.hasmousecapture;
                        a.ontouchmove = function(b, c) {
                            if (!a.rail.drag || b.targetTouches && a.opt.preventmultitouchscrolling && 1 < b.targetTouches.length || b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
                            if (2 == a.rail.drag.pt) {
                                if (f.cantouch && f.isios && "undefined" == typeof b.original) return !0;
                                a.hasmoving = !0;
                                a.preventclick && !a.preventclick.click && (a.preventclick.click = a.preventclick.tg.onclick || !1, 
                                a.preventclick.tg.onclick = a.onpreventclick);
                                b = e.extend({
                                    original: b
                                }, b);
                                "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, b.clientY = b.changedTouches[0].clientY);
                                if (a.forcescreen) {
                                    var g = b;
                                    b = {
                                        original: b.original ? b.original : b
                                    };
                                    b.clientX = g.screenX;
                                    b.clientY = g.screenY;
                                }
                                var d, g = d = 0;
                                p && !c && (d = a.win.position(), g = -d.left, d = -d.top);
                                var l = b.clientY + d;
                                d = l - a.rail.drag.y;
                                var h = b.clientX + g, w = h - a.rail.drag.x, k = a.rail.drag.st - d;
                                a.ishwscroll && a.opt.bouncescroll ? 0 > k ? k = Math.round(k / 2) : k > a.page.maxh && (k = a.page.maxh + Math.round((k - a.page.maxh) / 2)) : (0 > k && (l = k = 0), 
                                k > a.page.maxh && (k = a.page.maxh, l = 0));
                                var r;
                                a.railh && a.railh.scrollable && (r = a.isrtlmode ? w - a.rail.drag.sl : a.rail.drag.sl - w, 
                                a.ishwscroll && a.opt.bouncescroll ? 0 > r ? r = Math.round(r / 2) : r > a.page.maxw && (r = a.page.maxw + Math.round((r - a.page.maxw) / 2)) : (0 > r && (h = r = 0), 
                                r > a.page.maxw && (r = a.page.maxw, h = 0)));
                                g = !1;
                                if (a.rail.drag.dl) g = !0, "v" == a.rail.drag.dl ? r = a.rail.drag.sl : "h" == a.rail.drag.dl && (k = a.rail.drag.st); else {
                                    d = Math.abs(d);
                                    var w = Math.abs(w), m = a.opt.directionlockdeadzone;
                                    if ("v" == a.rail.drag.ck) {
                                        if (d > m && w <= .3 * d) return a.rail.drag = !1, !0;
                                        w > m && (a.rail.drag.dl = "f", e("body").scrollTop(e("body").scrollTop()));
                                    } else if ("h" == a.rail.drag.ck) {
                                        if (w > m && d <= .3 * w) return a.rail.drag = !1, !0;
                                        d > m && (a.rail.drag.dl = "f", e("body").scrollLeft(e("body").scrollLeft()));
                                    }
                                }
                                a.synched("touchmove", function() {
                                    a.rail.drag && 2 == a.rail.drag.pt && (a.prepareTransition && a.prepareTransition(0), 
                                    a.rail.scrollable && a.setScrollTop(k), a.scrollmom.update(h, l), a.railh && a.railh.scrollable ? (a.setScrollLeft(r), 
                                    a.showCursor(k, r)) : a.showCursor(k), f.isie10 && document.selection.clear());
                                });
                                f.ischrome && a.istouchcapable && (g = !1);
                                if (g) return a.cancelEvent(b);
                            } else if (1 == a.rail.drag.pt) return a.onmousemove(b);
                        };
                    }
                    a.onmousedown = function(b, c) {
                        if (!a.rail.drag || 1 == a.rail.drag.pt) {
                            if (a.railslocked) return a.cancelEvent(b);
                            a.cancelScroll();
                            a.rail.drag = {
                                x: b.clientX,
                                y: b.clientY,
                                sx: a.scroll.x,
                                sy: a.scroll.y,
                                pt: 1,
                                hr: !!c
                            };
                            var g = a.getTarget(b);
                            !a.ispage && f.hasmousecapture && g.setCapture();
                            a.isiframe && !f.hasmousecapture && (a.saved.csspointerevents = a.doc.css("pointer-events"), 
                            a.css(a.doc, {
                                "pointer-events": "none"
                            }));
                            a.hasmoving = !1;
                            return a.cancelEvent(b);
                        }
                    };
                    a.onmouseup = function(b) {
                        if (a.rail.drag) {
                            if (1 != a.rail.drag.pt) return !0;
                            f.hasmousecapture && document.releaseCapture();
                            a.isiframe && !f.hasmousecapture && a.doc.css("pointer-events", a.saved.csspointerevents);
                            a.rail.drag = !1;
                            a.hasmoving && a.triggerScrollEnd();
                            return a.cancelEvent(b);
                        }
                    };
                    a.onmousemove = function(b) {
                        if (a.rail.drag) {
                            if (1 == a.rail.drag.pt) {
                                if (f.ischrome && 0 == b.which) return a.onmouseup(b);
                                a.cursorfreezed = !0;
                                a.hasmoving = !0;
                                if (a.rail.drag.hr) {
                                    a.scroll.x = a.rail.drag.sx + (b.clientX - a.rail.drag.x);
                                    0 > a.scroll.x && (a.scroll.x = 0);
                                    var c = a.scrollvaluemaxw;
                                    a.scroll.x > c && (a.scroll.x = c);
                                } else a.scroll.y = a.rail.drag.sy + (b.clientY - a.rail.drag.y), 0 > a.scroll.y && (a.scroll.y = 0), 
                                c = a.scrollvaluemax, a.scroll.y > c && (a.scroll.y = c);
                                a.synched("mousemove", function() {
                                    a.rail.drag && 1 == a.rail.drag.pt && (a.showCursor(), a.rail.drag.hr ? a.hasreversehr ? a.doScrollLeft(a.scrollvaluemaxw - Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollLeft(Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollTop(Math.round(a.scroll.y * a.scrollratio.y), a.opt.cursordragspeed));
                                });
                                return a.cancelEvent(b);
                            }
                        } else a.checkarea = 0;
                    };
                    if (f.cantouch || a.opt.touchbehavior) a.onpreventclick = function(b) {
                        if (a.preventclick) return a.preventclick.tg.onclick = a.preventclick.click, a.preventclick = !1, 
                        a.cancelEvent(b);
                    }, a.bind(a.win, "mousedown", a.ontouchstart), a.onclick = f.isios ? !1 : function(b) {
                        return a.lastmouseup ? (a.lastmouseup = !1, a.cancelEvent(b)) : !0;
                    }, a.opt.grabcursorenabled && f.cursorgrabvalue && (a.css(a.ispage ? a.doc : a.win, {
                        cursor: f.cursorgrabvalue
                    }), a.css(a.rail, {
                        cursor: f.cursorgrabvalue
                    })); else {
                        var q = function(b) {
                            if (a.selectiondrag) {
                                if (b) {
                                    var c = a.win.outerHeight();
                                    b = b.pageY - a.selectiondrag.top;
                                    0 < b && b < c && (b = 0);
                                    b >= c && (b -= c);
                                    a.selectiondrag.df = b;
                                }
                                0 != a.selectiondrag.df && (a.doScrollBy(2 * -Math.floor(a.selectiondrag.df / 6)), 
                                a.debounced("doselectionscroll", function() {
                                    q();
                                }, 50));
                            }
                        };
                        a.hasTextSelected = "getSelection" in document ? function() {
                            return 0 < document.getSelection().rangeCount;
                        } : "selection" in document ? function() {
                            return "None" != document.selection.type;
                        } : function() {
                            return !1;
                        };
                        a.onselectionstart = function(b) {
                            a.ispage || (a.selectiondrag = a.win.offset());
                        };
                        a.onselectionend = function(b) {
                            a.selectiondrag = !1;
                        };
                        a.onselectiondrag = function(b) {
                            a.selectiondrag && a.hasTextSelected() && a.debounced("selectionscroll", function() {
                                q(b);
                            }, 250);
                        };
                    }
                    f.hasw3ctouch ? (a.css(a.rail, {
                        "touch-action": "none"
                    }), a.css(a.cursor, {
                        "touch-action": "none"
                    }), a.bind(a.win, "pointerdown", a.ontouchstart), a.bind(document, "pointerup", a.ontouchend), 
                    a.bind(document, "pointermove", a.ontouchmove)) : f.hasmstouch ? (a.css(a.rail, {
                        "-ms-touch-action": "none"
                    }), a.css(a.cursor, {
                        "-ms-touch-action": "none"
                    }), a.bind(a.win, "MSPointerDown", a.ontouchstart), a.bind(document, "MSPointerUp", a.ontouchend), 
                    a.bind(document, "MSPointerMove", a.ontouchmove), a.bind(a.cursor, "MSGestureHold", function(a) {
                        a.preventDefault();
                    }), a.bind(a.cursor, "contextmenu", function(a) {
                        a.preventDefault();
                    })) : this.istouchcapable && (a.bind(a.win, "touchstart", a.ontouchstart), a.bind(document, "touchend", a.ontouchend), 
                    a.bind(document, "touchcancel", a.ontouchend), a.bind(document, "touchmove", a.ontouchmove));
                    if (a.opt.cursordragontouch || !f.cantouch && !a.opt.touchbehavior) a.rail.css({
                        cursor: "default"
                    }), a.railh && a.railh.css({
                        cursor: "default"
                    }), a.jqbind(a.rail, "mouseenter", function() {
                        if (!a.ispage && !a.win.is(":visible")) return !1;
                        a.canshowonmouseevent && a.showCursor();
                        a.rail.active = !0;
                    }), a.jqbind(a.rail, "mouseleave", function() {
                        a.rail.active = !1;
                        a.rail.drag || a.hideCursor();
                    }), a.opt.sensitiverail && (a.bind(a.rail, "click", function(b) {
                        a.doRailClick(b, !1, !1);
                    }), a.bind(a.rail, "dblclick", function(b) {
                        a.doRailClick(b, !0, !1);
                    }), a.bind(a.cursor, "click", function(b) {
                        a.cancelEvent(b);
                    }), a.bind(a.cursor, "dblclick", function(b) {
                        a.cancelEvent(b);
                    })), a.railh && (a.jqbind(a.railh, "mouseenter", function() {
                        if (!a.ispage && !a.win.is(":visible")) return !1;
                        a.canshowonmouseevent && a.showCursor();
                        a.rail.active = !0;
                    }), a.jqbind(a.railh, "mouseleave", function() {
                        a.rail.active = !1;
                        a.rail.drag || a.hideCursor();
                    }), a.opt.sensitiverail && (a.bind(a.railh, "click", function(b) {
                        a.doRailClick(b, !1, !0);
                    }), a.bind(a.railh, "dblclick", function(b) {
                        a.doRailClick(b, !0, !0);
                    }), a.bind(a.cursorh, "click", function(b) {
                        a.cancelEvent(b);
                    }), a.bind(a.cursorh, "dblclick", function(b) {
                        a.cancelEvent(b);
                    })));
                    f.cantouch || a.opt.touchbehavior ? (a.bind(f.hasmousecapture ? a.win : document, "mouseup", a.ontouchend), 
                    a.bind(document, "mousemove", a.ontouchmove), a.onclick && a.bind(document, "click", a.onclick), 
                    a.opt.cursordragontouch && (a.bind(a.cursor, "mousedown", a.onmousedown), a.bind(a.cursor, "mouseup", a.onmouseup), 
                    a.cursorh && a.bind(a.cursorh, "mousedown", function(b) {
                        a.onmousedown(b, !0);
                    }), a.cursorh && a.bind(a.cursorh, "mouseup", a.onmouseup))) : (a.bind(f.hasmousecapture ? a.win : document, "mouseup", a.onmouseup), 
                    a.bind(document, "mousemove", a.onmousemove), a.onclick && a.bind(document, "click", a.onclick), 
                    a.bind(a.cursor, "mousedown", a.onmousedown), a.bind(a.cursor, "mouseup", a.onmouseup), 
                    a.railh && (a.bind(a.cursorh, "mousedown", function(b) {
                        a.onmousedown(b, !0);
                    }), a.bind(a.cursorh, "mouseup", a.onmouseup)), !a.ispage && a.opt.enablescrollonselection && (a.bind(a.win[0], "mousedown", a.onselectionstart), 
                    a.bind(document, "mouseup", a.onselectionend), a.bind(a.cursor, "mouseup", a.onselectionend), 
                    a.cursorh && a.bind(a.cursorh, "mouseup", a.onselectionend), a.bind(document, "mousemove", a.onselectiondrag)), 
                    a.zoom && (a.jqbind(a.zoom, "mouseenter", function() {
                        a.canshowonmouseevent && a.showCursor();
                        a.rail.active = !0;
                    }), a.jqbind(a.zoom, "mouseleave", function() {
                        a.rail.active = !1;
                        a.rail.drag || a.hideCursor();
                    })));
                    a.opt.enablemousewheel && (a.isiframe || a.bind(f.isie && a.ispage ? document : a.win, "mousewheel", a.onmousewheel), 
                    a.bind(a.rail, "mousewheel", a.onmousewheel), a.railh && a.bind(a.railh, "mousewheel", a.onmousewheelhr));
                    a.ispage || f.cantouch || /HTML|^BODY/.test(a.win[0].nodeName) || (a.win.attr("tabindex") || a.win.attr({
                        tabindex: O++
                    }), a.jqbind(a.win, "focus", function(b) {
                        A = a.getTarget(b).id || !0;
                        a.hasfocus = !0;
                        a.canshowonmouseevent && a.noticeCursor();
                    }), a.jqbind(a.win, "blur", function(b) {
                        A = !1;
                        a.hasfocus = !1;
                    }), a.jqbind(a.win, "mouseenter", function(b) {
                        E = a.getTarget(b).id || !0;
                        a.hasmousefocus = !0;
                        a.canshowonmouseevent && a.noticeCursor();
                    }), a.jqbind(a.win, "mouseleave", function() {
                        E = !1;
                        a.hasmousefocus = !1;
                        a.rail.drag || a.hideCursor();
                    }));
                }
                a.onkeypress = function(b) {
                    if (a.railslocked && 0 == a.page.maxh) return !0;
                    b = b ? b : window.e;
                    var c = a.getTarget(b);
                    if (c && /INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName) && (!c.getAttribute("type") && !c.type || !/submit|button|cancel/i.tp) || e(c).attr("contenteditable")) return !0;
                    if (a.hasfocus || a.hasmousefocus && !A || a.ispage && !A && !E) {
                        c = b.keyCode;
                        if (a.railslocked && 27 != c) return a.cancelEvent(b);
                        var g = b.ctrlKey || !1, d = b.shiftKey || !1, f = !1;
                        switch (c) {
                          case 38:
                          case 63233:
                            a.doScrollBy(72);
                            f = !0;
                            break;

                          case 40:
                          case 63235:
                            a.doScrollBy(-72);
                            f = !0;
                            break;

                          case 37:
                          case 63232:
                            a.railh && (g ? a.doScrollLeft(0) : a.doScrollLeftBy(72), f = !0);
                            break;

                          case 39:
                          case 63234:
                            a.railh && (g ? a.doScrollLeft(a.page.maxw) : a.doScrollLeftBy(-72), f = !0);
                            break;

                          case 33:
                          case 63276:
                            a.doScrollBy(a.view.h);
                            f = !0;
                            break;

                          case 34:
                          case 63277:
                            a.doScrollBy(-a.view.h);
                            f = !0;
                            break;

                          case 36:
                          case 63273:
                            a.railh && g ? a.doScrollPos(0, 0) : a.doScrollTo(0);
                            f = !0;
                            break;

                          case 35:
                          case 63275:
                            a.railh && g ? a.doScrollPos(a.page.maxw, a.page.maxh) : a.doScrollTo(a.page.maxh);
                            f = !0;
                            break;

                          case 32:
                            a.opt.spacebarenabled && (d ? a.doScrollBy(a.view.h) : a.doScrollBy(-a.view.h), 
                            f = !0);
                            break;

                          case 27:
                            a.zoomactive && (a.doZoom(), f = !0);
                        }
                        if (f) return a.cancelEvent(b);
                    }
                };
                a.opt.enablekeyboard && a.bind(document, f.isopera && !f.isopera12 ? "keypress" : "keydown", a.onkeypress);
                a.bind(document, "keydown", function(b) {
                    b.ctrlKey && (a.wheelprevented = !0);
                });
                a.bind(document, "keyup", function(b) {
                    b.ctrlKey || (a.wheelprevented = !1);
                });
                a.bind(window, "blur", function(b) {
                    a.wheelprevented = !1;
                });
                a.bind(window, "resize", a.lazyResize);
                a.bind(window, "orientationchange", a.lazyResize);
                a.bind(window, "load", a.lazyResize);
                if (f.ischrome && !a.ispage && !a.haswrapper) {
                    var t = a.win.attr("style"), l = parseFloat(a.win.css("width")) + 1;
                    a.win.css("width", l);
                    a.synched("chromefix", function() {
                        a.win.attr("style", t);
                    });
                }
                a.onAttributeChange = function(b) {
                    a.lazyResize(a.isieold ? 250 : 30);
                };
                !1 !== x && (a.observerbody = new x(function(b) {
                    b.forEach(function(b) {
                        if ("attributes" == b.type) return e("body").hasClass("modal-open") && !e.contains(e(".modal-dialog")[0], a.doc[0]) ? a.hide() : a.show();
                    });
                    if (document.body.scrollHeight != a.page.maxh) return a.lazyResize(30);
                }), a.observerbody.observe(document.body, {
                    childList: !0,
                    subtree: !0,
                    characterData: !1,
                    attributes: !0,
                    attributeFilter: [ "class" ]
                }));
                a.ispage || a.haswrapper || (!1 !== x ? (a.observer = new x(function(b) {
                    b.forEach(a.onAttributeChange);
                }), a.observer.observe(a.win[0], {
                    childList: !0,
                    characterData: !1,
                    attributes: !0,
                    subtree: !1
                }), a.observerremover = new x(function(b) {
                    b.forEach(function(b) {
                        if (0 < b.removedNodes.length) for (var c in b.removedNodes) if (a && b.removedNodes[c] == a.win[0]) return a.remove();
                    });
                }), a.observerremover.observe(a.win[0].parentNode, {
                    childList: !0,
                    characterData: !1,
                    attributes: !1,
                    subtree: !1
                })) : (a.bind(a.win, f.isie && !f.isie9 ? "propertychange" : "DOMAttrModified", a.onAttributeChange), 
                f.isie9 && a.win[0].attachEvent("onpropertychange", a.onAttributeChange), a.bind(a.win, "DOMNodeRemoved", function(b) {
                    b.target == a.win[0] && a.remove();
                })));
                !a.ispage && a.opt.boxzoom && a.bind(window, "resize", a.resizeZoom);
                a.istextarea && (a.bind(a.win, "keydown", a.lazyResize), a.bind(a.win, "mouseup", a.lazyResize));
                a.lazyResize(30);
            }
            if ("IFRAME" == this.doc[0].nodeName) {
                var N = function() {
                    a.iframexd = !1;
                    var b;
                    try {
                        b = "contentDocument" in this ? this.contentDocument : this.contentWindow.document;
                    } catch (c) {
                        a.iframexd = !0, b = !1;
                    }
                    if (a.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), 
                    !0;
                    a.forcescreen = !0;
                    a.isiframe && (a.iframe = {
                        doc: e(b),
                        html: a.doc.contents().find("html")[0],
                        body: a.doc.contents().find("body")[0]
                    }, a.getContentSize = function() {
                        return {
                            w: Math.max(a.iframe.html.scrollWidth, a.iframe.body.scrollWidth),
                            h: Math.max(a.iframe.html.scrollHeight, a.iframe.body.scrollHeight)
                        };
                    }, a.docscroll = e(a.iframe.body));
                    if (!f.isios && a.opt.iframeautoresize && !a.isiframe) {
                        a.win.scrollTop(0);
                        a.doc.height("");
                        var g = Math.max(b.getElementsByTagName("html")[0].scrollHeight, b.body.scrollHeight);
                        a.doc.height(g);
                    }
                    a.lazyResize(30);
                    f.isie7 && a.css(e(a.iframe.html), {
                        "overflow-y": "hidden"
                    });
                    a.css(e(a.iframe.body), {
                        "overflow-y": "hidden"
                    });
                    f.isios && a.haswrapper && a.css(e(b.body), {
                        "-webkit-transform": "translate3d(0,0,0)"
                    });
                    "contentWindow" in this ? a.bind(this.contentWindow, "scroll", a.onscroll) : a.bind(b, "scroll", a.onscroll);
                    a.opt.enablemousewheel && a.bind(b, "mousewheel", a.onmousewheel);
                    a.opt.enablekeyboard && a.bind(b, f.isopera ? "keypress" : "keydown", a.onkeypress);
                    if (f.cantouch || a.opt.touchbehavior) a.bind(b, "mousedown", a.ontouchstart), a.bind(b, "mousemove", function(b) {
                        return a.ontouchmove(b, !0);
                    }), a.opt.grabcursorenabled && f.cursorgrabvalue && a.css(e(b.body), {
                        cursor: f.cursorgrabvalue
                    });
                    a.bind(b, "mouseup", a.ontouchend);
                    a.zoom && (a.opt.dblclickzoom && a.bind(b, "dblclick", a.doZoom), a.ongesturezoom && a.bind(b, "gestureend", a.ongesturezoom));
                };
                this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function() {
                    N.call(a.doc[0], !1);
                }, 500);
                a.bind(this.doc, "load", N);
            }
        };
        this.showCursor = function(b, c) {
            a.cursortimeout && (clearTimeout(a.cursortimeout), a.cursortimeout = 0);
            if (a.rail) {
                a.autohidedom && (a.autohidedom.stop().css({
                    opacity: a.opt.cursoropacitymax
                }), a.cursoractive = !0);
                a.rail.drag && 1 == a.rail.drag.pt || ("undefined" != typeof b && !1 !== b && (a.scroll.y = Math.round(1 * b / a.scrollratio.y)), 
                "undefined" != typeof c && (a.scroll.x = Math.round(1 * c / a.scrollratio.x)));
                a.cursor.css({
                    height: a.cursorheight,
                    top: a.scroll.y
                });
                if (a.cursorh) {
                    var d = a.hasreversehr ? a.scrollvaluemaxw - a.scroll.x : a.scroll.x;
                    !a.rail.align && a.rail.visibility ? a.cursorh.css({
                        width: a.cursorwidth,
                        left: d + a.rail.width
                    }) : a.cursorh.css({
                        width: a.cursorwidth,
                        left: d
                    });
                    a.cursoractive = !0;
                }
                a.zoom && a.zoom.stop().css({
                    opacity: a.opt.cursoropacitymax
                });
            }
        };
        this.hideCursor = function(b) {
            a.cursortimeout || !a.rail || !a.autohidedom || a.hasmousefocus && "leave" == a.opt.autohidemode || (a.cursortimeout = setTimeout(function() {
                a.rail.active && a.showonmouseevent || (a.autohidedom.stop().animate({
                    opacity: a.opt.cursoropacitymin
                }), a.zoom && a.zoom.stop().animate({
                    opacity: a.opt.cursoropacitymin
                }), a.cursoractive = !1);
                a.cursortimeout = 0;
            }, b || a.opt.hidecursordelay));
        };
        this.noticeCursor = function(b, c, d) {
            a.showCursor(c, d);
            a.rail.active || a.hideCursor(b);
        };
        this.getContentSize = a.ispage ? function() {
            return {
                w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            };
        } : a.haswrapper ? function() {
            return {
                w: a.doc.outerWidth() + parseInt(a.win.css("paddingLeft")) + parseInt(a.win.css("paddingRight")),
                h: a.doc.outerHeight() + parseInt(a.win.css("paddingTop")) + parseInt(a.win.css("paddingBottom"))
            };
        } : function() {
            return {
                w: a.docscroll[0].scrollWidth,
                h: a.docscroll[0].scrollHeight
            };
        };
        this.onResize = function(b, c) {
            if (!a || !a.win) return !1;
            if (!a.haswrapper && !a.ispage) {
                if ("none" == a.win.css("display")) return a.visibility && a.hideRail().hideRailHr(), 
                !1;
                a.hidden || a.visibility || a.showRail().showRailHr();
            }
            var d = a.page.maxh, f = a.page.maxw, e = a.view.h, h = a.view.w;
            a.view = {
                w: a.ispage ? a.win.width() : parseInt(a.win[0].clientWidth),
                h: a.ispage ? a.win.height() : parseInt(a.win[0].clientHeight)
            };
            a.page = c ? c : a.getContentSize();
            a.page.maxh = Math.max(0, a.page.h - a.view.h);
            a.page.maxw = Math.max(0, a.page.w - a.view.w);
            if (a.page.maxh == d && a.page.maxw == f && a.view.w == h && a.view.h == e) {
                if (a.ispage) return a;
                d = a.win.offset();
                if (a.lastposition && (f = a.lastposition, f.top == d.top && f.left == d.left)) return a;
                a.lastposition = d;
            }
            0 == a.page.maxh ? (a.hideRail(), a.scrollvaluemax = 0, a.scroll.y = 0, a.scrollratio.y = 0, 
            a.cursorheight = 0, a.setScrollTop(0), a.rail && (a.rail.scrollable = !1)) : (a.page.maxh -= a.opt.railpadding.top + a.opt.railpadding.bottom, 
            a.rail.scrollable = !0);
            0 == a.page.maxw ? (a.hideRailHr(), a.scrollvaluemaxw = 0, a.scroll.x = 0, a.scrollratio.x = 0, 
            a.cursorwidth = 0, a.setScrollLeft(0), a.railh && (a.railh.scrollable = !1)) : (a.page.maxw -= a.opt.railpadding.left + a.opt.railpadding.right, 
            a.railh && (a.railh.scrollable = a.opt.horizrailenabled));
            a.railslocked = a.locked || 0 == a.page.maxh && 0 == a.page.maxw;
            if (a.railslocked) return a.ispage || a.updateScrollBar(a.view), !1;
            a.hidden || a.visibility ? !a.railh || a.hidden || a.railh.visibility || a.showRailHr() : a.showRail().showRailHr();
            a.istextarea && a.win.css("resize") && "none" != a.win.css("resize") && (a.view.h -= 20);
            a.cursorheight = Math.min(a.view.h, Math.round(a.view.h / a.page.h * a.view.h));
            a.cursorheight = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight, a.cursorheight);
            a.cursorwidth = Math.min(a.view.w, Math.round(a.view.w / a.page.w * a.view.w));
            a.cursorwidth = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight, a.cursorwidth);
            a.scrollvaluemax = a.view.h - a.cursorheight - a.cursor.hborder - (a.opt.railpadding.top + a.opt.railpadding.bottom);
            a.railh && (a.railh.width = 0 < a.page.maxh ? a.view.w - a.rail.width : a.view.w, 
            a.scrollvaluemaxw = a.railh.width - a.cursorwidth - a.cursorh.wborder - (a.opt.railpadding.left + a.opt.railpadding.right));
            a.ispage || a.updateScrollBar(a.view);
            a.scrollratio = {
                x: a.page.maxw / a.scrollvaluemaxw,
                y: a.page.maxh / a.scrollvaluemax
            };
            a.getScrollTop() > a.page.maxh ? a.doScrollTop(a.page.maxh) : (a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y)), 
            a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)), a.cursoractive && a.noticeCursor());
            a.scroll.y && 0 == a.getScrollTop() && a.doScrollTo(Math.floor(a.scroll.y * a.scrollratio.y));
            return a;
        };
        this.resize = a.onResize;
        this.lazyResize = function(b) {
            b = isNaN(b) ? 30 : b;
            a.debounced("resize", a.resize, b);
            return a;
        };
        this.jqbind = function(b, c, d) {
            a.events.push({
                e: b,
                n: c,
                f: d,
                q: !0
            });
            e(b).bind(c, d);
        };
        this.bind = function(b, c, d, e) {
            var h = "jquery" in b ? b[0] : b;
            "mousewheel" == c ? "onwheel" in a.win ? a._bind(h, "wheel", d, e || !1) : (b = "undefined" != typeof document.onmousewheel ? "mousewheel" : "DOMMouseScroll", 
            p(h, b, d, e || !1), "DOMMouseScroll" == b && p(h, "MozMousePixelScroll", d, e || !1)) : h.addEventListener ? (f.cantouch && /mouseup|mousedown|mousemove/.test(c) && a._bind(h, "mousedown" == c ? "touchstart" : "mouseup" == c ? "touchend" : "touchmove", function(a) {
                if (a.touches) {
                    if (2 > a.touches.length) {
                        var b = a.touches.length ? a.touches[0] : a;
                        b.original = a;
                        d.call(this, b);
                    }
                } else a.changedTouches && (b = a.changedTouches[0], b.original = a, d.call(this, b));
            }, e || !1), a._bind(h, c, d, e || !1), f.cantouch && "mouseup" == c && a._bind(h, "touchcancel", d, e || !1)) : a._bind(h, c, function(b) {
                (b = b || window.event || !1) && b.srcElement && (b.target = b.srcElement);
                "pageY" in b || (b.pageX = b.clientX + document.documentElement.scrollLeft, b.pageY = b.clientY + document.documentElement.scrollTop);
                return !1 === d.call(h, b) || !1 === e ? a.cancelEvent(b) : !0;
            });
        };
        f.haseventlistener ? (this._bind = function(b, c, d, f) {
            a.events.push({
                e: b,
                n: c,
                f: d,
                b: f,
                q: !1
            });
            b.addEventListener(c, d, f || !1);
        }, this.cancelEvent = function(a) {
            if (!a) return !1;
            a = a.original ? a.original : a;
            a.preventDefault();
            a.stopPropagation();
            a.preventManipulation && a.preventManipulation();
            return !1;
        }, this.stopPropagation = function(a) {
            if (!a) return !1;
            a = a.original ? a.original : a;
            a.stopPropagation();
            return !1;
        }, this._unbind = function(a, c, d, f) {
            a.removeEventListener(c, d, f);
        }) : (this._bind = function(b, c, d, f) {
            a.events.push({
                e: b,
                n: c,
                f: d,
                b: f,
                q: !1
            });
            b.attachEvent ? b.attachEvent("on" + c, d) : b["on" + c] = d;
        }, this.cancelEvent = function(a) {
            a = window.event || !1;
            if (!a) return !1;
            a.cancelBubble = !0;
            a.cancel = !0;
            return a.returnValue = !1;
        }, this.stopPropagation = function(a) {
            a = window.event || !1;
            if (!a) return !1;
            a.cancelBubble = !0;
            return !1;
        }, this._unbind = function(a, c, d, f) {
            a.detachEvent ? a.detachEvent("on" + c, d) : a["on" + c] = !1;
        });
        this.unbindAll = function() {
            for (var b = 0; b < a.events.length; b++) {
                var c = a.events[b];
                c.q ? c.e.unbind(c.n, c.f) : a._unbind(c.e, c.n, c.f, c.b);
            }
        };
        this.showRail = function() {
            0 == a.page.maxh || !a.ispage && "none" == a.win.css("display") || (a.visibility = !0, 
            a.rail.visibility = !0, a.rail.css("display", "block"));
            return a;
        };
        this.showRailHr = function() {
            if (!a.railh) return a;
            0 == a.page.maxw || !a.ispage && "none" == a.win.css("display") || (a.railh.visibility = !0, 
            a.railh.css("display", "block"));
            return a;
        };
        this.hideRail = function() {
            a.visibility = !1;
            a.rail.visibility = !1;
            a.rail.css("display", "none");
            return a;
        };
        this.hideRailHr = function() {
            if (!a.railh) return a;
            a.railh.visibility = !1;
            a.railh.css("display", "none");
            return a;
        };
        this.show = function() {
            a.hidden = !1;
            a.railslocked = !1;
            return a.showRail().showRailHr();
        };
        this.hide = function() {
            a.hidden = !0;
            a.railslocked = !0;
            return a.hideRail().hideRailHr();
        };
        this.toggle = function() {
            return a.hidden ? a.show() : a.hide();
        };
        this.remove = function() {
            a.stop();
            a.cursortimeout && clearTimeout(a.cursortimeout);
            a.debouncedelayed && clearTimeout(a.debouncedelayed);
            a.doZoomOut();
            a.unbindAll();
            f.isie9 && a.win[0].detachEvent("onpropertychange", a.onAttributeChange);
            !1 !== a.observer && a.observer.disconnect();
            !1 !== a.observerremover && a.observerremover.disconnect();
            !1 !== a.observerbody && a.observerbody.disconnect();
            a.events = null;
            a.cursor && a.cursor.remove();
            a.cursorh && a.cursorh.remove();
            a.rail && a.rail.remove();
            a.railh && a.railh.remove();
            a.zoom && a.zoom.remove();
            for (var b = 0; b < a.saved.css.length; b++) {
                var c = a.saved.css[b];
                c[0].css(c[1], "undefined" == typeof c[2] ? "" : c[2]);
            }
            a.saved = !1;
            a.me.data("__nicescroll", "");
            var d = e.nicescroll;
            d.each(function(b) {
                if (this && this.id === a.id) {
                    delete d[b];
                    for (var c = ++b; c < d.length; c++, b++) d[b] = d[c];
                    d.length--;
                    d.length && delete d[d.length];
                }
            });
            for (var h in a) a[h] = null, delete a[h];
            a = null;
        };
        this.scrollstart = function(b) {
            this.onscrollstart = b;
            return a;
        };
        this.scrollend = function(b) {
            this.onscrollend = b;
            return a;
        };
        this.scrollcancel = function(b) {
            this.onscrollcancel = b;
            return a;
        };
        this.zoomin = function(b) {
            this.onzoomin = b;
            return a;
        };
        this.zoomout = function(b) {
            this.onzoomout = b;
            return a;
        };
        this.isScrollable = function(a) {
            a = a.target ? a.target : a;
            if ("OPTION" == a.nodeName) return !0;
            for (;a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName); ) {
                var c = e(a), c = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                if (/scroll|auto/.test(c)) return a.clientHeight != a.scrollHeight;
                a = a.parentNode ? a.parentNode : !1;
            }
            return !1;
        };
        this.getViewport = function(a) {
            for (a = a && a.parentNode ? a.parentNode : !1; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName); ) {
                var c = e(a);
                if (/fixed|absolute/.test(c.css("position"))) return c;
                var d = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                if (/scroll|auto/.test(d) && a.clientHeight != a.scrollHeight || 0 < c.getNiceScroll().length) return c;
                a = a.parentNode ? a.parentNode : !1;
            }
            return !1;
        };
        this.triggerScrollEnd = function() {
            if (a.onscrollend) {
                var b = a.getScrollLeft(), c = a.getScrollTop();
                a.onscrollend.call(a, {
                    type: "scrollend",
                    current: {
                        x: b,
                        y: c
                    },
                    end: {
                        x: b,
                        y: c
                    }
                });
            }
        };
        this.onmousewheel = function(b) {
            if (!a.wheelprevented) {
                if (a.railslocked) return a.debounced("checkunlock", a.resize, 250), !0;
                if (a.rail.drag) return a.cancelEvent(b);
                "auto" == a.opt.oneaxismousemode && 0 != b.deltaX && (a.opt.oneaxismousemode = !1);
                if (a.opt.oneaxismousemode && 0 == b.deltaX && !a.rail.scrollable) return a.railh && a.railh.scrollable ? a.onmousewheelhr(b) : !0;
                var c = +new Date(), d = !1;
                a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), 
                d = !0);
                a.checkarea = c;
                if (a.nativescrollingarea) return !0;
                if (b = q(b, !1, d)) a.checkarea = 0;
                return b;
            }
        };
        this.onmousewheelhr = function(b) {
            if (!a.wheelprevented) {
                if (a.railslocked || !a.railh.scrollable) return !0;
                if (a.rail.drag) return a.cancelEvent(b);
                var c = +new Date(), d = !1;
                a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), 
                d = !0);
                a.checkarea = c;
                return a.nativescrollingarea ? !0 : a.railslocked ? a.cancelEvent(b) : q(b, !0, d);
            }
        };
        this.stop = function() {
            a.cancelScroll();
            a.scrollmon && a.scrollmon.stop();
            a.cursorfreezed = !1;
            a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
            a.noticeCursor();
            return a;
        };
        this.getTransitionSpeed = function(b) {
            b = Math.min(Math.round(10 * a.opt.scrollspeed), Math.round(b / 20 * a.opt.scrollspeed));
            return 20 < b ? b : 0;
        };
        a.opt.smoothscroll ? a.ishwscroll && f.hastransition && a.opt.usetransition && a.opt.smoothscroll ? (this.prepareTransition = function(b, c) {
            var d = c ? 20 < b ? b : 0 : a.getTransitionSpeed(b), e = d ? f.prefixstyle + "transform " + d + "ms ease-out" : "";
            a.lasttransitionstyle && a.lasttransitionstyle == e || (a.lasttransitionstyle = e, 
            a.doc.css(f.transitionstyle, e));
            return d;
        }, this.doScrollLeft = function(b, c) {
            var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
            a.doScrollPos(b, d, c);
        }, this.doScrollTop = function(b, c) {
            var d = a.scrollrunning ? a.newscrollx : a.getScrollLeft();
            a.doScrollPos(d, b, c);
        }, this.doScrollPos = function(b, c, d) {
            var e = a.getScrollTop(), h = a.getScrollLeft();
            (0 > (a.newscrolly - e) * (c - e) || 0 > (a.newscrollx - h) * (b - h)) && a.cancelScroll();
            0 == a.opt.bouncescroll && (0 > c ? c = 0 : c > a.page.maxh && (c = a.page.maxh), 
            0 > b ? b = 0 : b > a.page.maxw && (b = a.page.maxw));
            if (a.scrollrunning && b == a.newscrollx && c == a.newscrolly) return !1;
            a.newscrolly = c;
            a.newscrollx = b;
            a.newscrollspeed = d || !1;
            if (a.timer) return !1;
            a.timer = setTimeout(function() {
                var d = a.getScrollTop(), e = a.getScrollLeft(), h = Math.round(Math.sqrt(Math.pow(b - e, 2) + Math.pow(c - d, 2))), h = a.newscrollspeed && 1 < a.newscrollspeed ? a.newscrollspeed : a.getTransitionSpeed(h);
                a.newscrollspeed && 1 >= a.newscrollspeed && (h *= a.newscrollspeed);
                a.prepareTransition(h, !0);
                a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
                0 < h && (!a.scrollrunning && a.onscrollstart && a.onscrollstart.call(a, {
                    type: "scrollstart",
                    current: {
                        x: e,
                        y: d
                    },
                    request: {
                        x: b,
                        y: c
                    },
                    end: {
                        x: a.newscrollx,
                        y: a.newscrolly
                    },
                    speed: h
                }), f.transitionend ? a.scrollendtrapped || (a.scrollendtrapped = !0, a.bind(a.doc, f.transitionend, a.onScrollTransitionEnd, !1)) : (a.scrollendtrapped && clearTimeout(a.scrollendtrapped), 
                a.scrollendtrapped = setTimeout(a.onScrollTransitionEnd, h)), a.timerscroll = {
                    bz: new B(d, a.newscrolly, h, 0, 0, .58, 1),
                    bh: new B(e, a.newscrollx, h, 0, 0, .58, 1)
                }, a.cursorfreezed || (a.timerscroll.tm = setInterval(function() {
                    a.showCursor(a.getScrollTop(), a.getScrollLeft());
                }, 60)));
                a.synched("doScroll-set", function() {
                    a.timer = 0;
                    a.scrollendtrapped && (a.scrollrunning = !0);
                    a.setScrollTop(a.newscrolly);
                    a.setScrollLeft(a.newscrollx);
                    if (!a.scrollendtrapped) a.onScrollTransitionEnd();
                });
            }, 50);
        }, this.cancelScroll = function() {
            if (!a.scrollendtrapped) return !0;
            var b = a.getScrollTop(), c = a.getScrollLeft();
            a.scrollrunning = !1;
            f.transitionend || clearTimeout(f.transitionend);
            a.scrollendtrapped = !1;
            a._unbind(a.doc[0], f.transitionend, a.onScrollTransitionEnd);
            a.prepareTransition(0);
            a.setScrollTop(b);
            a.railh && a.setScrollLeft(c);
            a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
            a.timerscroll = !1;
            a.cursorfreezed = !1;
            a.showCursor(b, c);
            return a;
        }, this.onScrollTransitionEnd = function() {
            a.scrollendtrapped && a._unbind(a.doc[0], f.transitionend, a.onScrollTransitionEnd);
            a.scrollendtrapped = !1;
            a.prepareTransition(0);
            a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
            a.timerscroll = !1;
            var b = a.getScrollTop(), c = a.getScrollLeft();
            a.setScrollTop(b);
            a.railh && a.setScrollLeft(c);
            a.noticeCursor(!1, b, c);
            a.cursorfreezed = !1;
            0 > b ? b = 0 : b > a.page.maxh && (b = a.page.maxh);
            0 > c ? c = 0 : c > a.page.maxw && (c = a.page.maxw);
            if (b != a.newscrolly || c != a.newscrollx) return a.doScrollPos(c, b, a.opt.snapbackspeed);
            a.onscrollend && a.scrollrunning && a.triggerScrollEnd();
            a.scrollrunning = !1;
        }) : (this.doScrollLeft = function(b, c) {
            var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
            a.doScrollPos(b, d, c);
        }, this.doScrollTop = function(b, c) {
            var d = a.scrollrunning ? a.newscrollx : a.getScrollLeft();
            a.doScrollPos(d, b, c);
        }, this.doScrollPos = function(b, c, d) {
            function f() {
                if (a.cancelAnimationFrame) return !0;
                a.scrollrunning = !0;
                if (q = 1 - q) return a.timer = u(f) || 1;
                var b = 0, c, d, e = d = a.getScrollTop();
                if (a.dst.ay) {
                    e = a.bzscroll ? a.dst.py + a.bzscroll.getNow() * a.dst.ay : a.newscrolly;
                    c = e - d;
                    if (0 > c && e < a.newscrolly || 0 < c && e > a.newscrolly) e = a.newscrolly;
                    a.setScrollTop(e);
                    e == a.newscrolly && (b = 1);
                } else b = 1;
                d = c = a.getScrollLeft();
                if (a.dst.ax) {
                    d = a.bzscroll ? a.dst.px + a.bzscroll.getNow() * a.dst.ax : a.newscrollx;
                    c = d - c;
                    if (0 > c && d < a.newscrollx || 0 < c && d > a.newscrollx) d = a.newscrollx;
                    a.setScrollLeft(d);
                    d == a.newscrollx && (b += 1);
                } else b += 1;
                2 == b ? (a.timer = 0, a.cursorfreezed = !1, a.bzscroll = !1, a.scrollrunning = !1, 
                0 > e ? e = 0 : e > a.page.maxh && (e = a.page.maxh), 0 > d ? d = 0 : d > a.page.maxw && (d = a.page.maxw), 
                d != a.newscrollx || e != a.newscrolly ? a.doScrollPos(d, e) : a.onscrollend && a.triggerScrollEnd()) : a.timer = u(f) || 1;
            }
            c = "undefined" == typeof c || !1 === c ? a.getScrollTop(!0) : c;
            if (a.timer && a.newscrolly == c && a.newscrollx == b) return !0;
            a.timer && v(a.timer);
            a.timer = 0;
            var e = a.getScrollTop(), h = a.getScrollLeft();
            (0 > (a.newscrolly - e) * (c - e) || 0 > (a.newscrollx - h) * (b - h)) && a.cancelScroll();
            a.newscrolly = c;
            a.newscrollx = b;
            a.bouncescroll && a.rail.visibility || (0 > a.newscrolly ? a.newscrolly = 0 : a.newscrolly > a.page.maxh && (a.newscrolly = a.page.maxh));
            a.bouncescroll && a.railh.visibility || (0 > a.newscrollx ? a.newscrollx = 0 : a.newscrollx > a.page.maxw && (a.newscrollx = a.page.maxw));
            a.dst = {};
            a.dst.x = b - h;
            a.dst.y = c - e;
            a.dst.px = h;
            a.dst.py = e;
            var k = Math.round(Math.sqrt(Math.pow(a.dst.x, 2) + Math.pow(a.dst.y, 2)));
            a.dst.ax = a.dst.x / k;
            a.dst.ay = a.dst.y / k;
            var n = 0, p = k;
            0 == a.dst.x ? (n = e, p = c, a.dst.ay = 1, a.dst.py = 0) : 0 == a.dst.y && (n = h, 
            p = b, a.dst.ax = 1, a.dst.px = 0);
            k = a.getTransitionSpeed(k);
            d && 1 >= d && (k *= d);
            a.bzscroll = 0 < k ? a.bzscroll ? a.bzscroll.update(p, k) : new B(n, p, k, 0, 1, 0, 1) : !1;
            if (!a.timer) {
                (e == a.page.maxh && c >= a.page.maxh || h == a.page.maxw && b >= a.page.maxw) && a.checkContentSize();
                var q = 1;
                a.cancelAnimationFrame = !1;
                a.timer = 1;
                a.onscrollstart && !a.scrollrunning && a.onscrollstart.call(a, {
                    type: "scrollstart",
                    current: {
                        x: h,
                        y: e
                    },
                    request: {
                        x: b,
                        y: c
                    },
                    end: {
                        x: a.newscrollx,
                        y: a.newscrolly
                    },
                    speed: k
                });
                f();
                (e == a.page.maxh && c >= e || h == a.page.maxw && b >= h) && a.checkContentSize();
                a.noticeCursor();
            }
        }, this.cancelScroll = function() {
            a.timer && v(a.timer);
            a.timer = 0;
            a.bzscroll = !1;
            a.scrollrunning = !1;
            return a;
        }) : (this.doScrollLeft = function(b, c) {
            var d = a.getScrollTop();
            a.doScrollPos(b, d, c);
        }, this.doScrollTop = function(b, c) {
            var d = a.getScrollLeft();
            a.doScrollPos(d, b, c);
        }, this.doScrollPos = function(b, c, d) {
            var f = b > a.page.maxw ? a.page.maxw : b;
            0 > f && (f = 0);
            var e = c > a.page.maxh ? a.page.maxh : c;
            0 > e && (e = 0);
            a.synched("scroll", function() {
                a.setScrollTop(e);
                a.setScrollLeft(f);
            });
        }, this.cancelScroll = function() {});
        this.doScrollBy = function(b, c) {
            var d = 0, d = c ? Math.floor((a.scroll.y - b) * a.scrollratio.y) : (a.timer ? a.newscrolly : a.getScrollTop(!0)) - b;
            if (a.bouncescroll) {
                var f = Math.round(a.view.h / 2);
                d < -f ? d = -f : d > a.page.maxh + f && (d = a.page.maxh + f);
            }
            a.cursorfreezed = !1;
            f = a.getScrollTop(!0);
            if (0 > d && 0 >= f) return a.noticeCursor();
            if (d > a.page.maxh && f >= a.page.maxh) return a.checkContentSize(), a.noticeCursor();
            a.doScrollTop(d);
        };
        this.doScrollLeftBy = function(b, c) {
            var d = 0, d = c ? Math.floor((a.scroll.x - b) * a.scrollratio.x) : (a.timer ? a.newscrollx : a.getScrollLeft(!0)) - b;
            if (a.bouncescroll) {
                var f = Math.round(a.view.w / 2);
                d < -f ? d = -f : d > a.page.maxw + f && (d = a.page.maxw + f);
            }
            a.cursorfreezed = !1;
            f = a.getScrollLeft(!0);
            if (0 > d && 0 >= f || d > a.page.maxw && f >= a.page.maxw) return a.noticeCursor();
            a.doScrollLeft(d);
        };
        this.doScrollTo = function(b, c) {
            a.cursorfreezed = !1;
            a.doScrollTop(b);
        };
        this.checkContentSize = function() {
            var b = a.getContentSize();
            b.h == a.page.h && b.w == a.page.w || a.resize(!1, b);
        };
        a.onscroll = function(b) {
            a.rail.drag || a.cursorfreezed || a.synched("scroll", function() {
                a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
                a.railh && (a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)));
                a.noticeCursor();
            });
        };
        a.bind(a.docscroll, "scroll", a.onscroll);
        this.doZoomIn = function(b) {
            if (!a.zoomactive) {
                a.zoomactive = !0;
                a.zoomrestore = {
                    style: {}
                };
                var c = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "), d = a.win[0].style, h;
                for (h in c) {
                    var k = c[h];
                    a.zoomrestore.style[k] = "undefined" != typeof d[k] ? d[k] : "";
                }
                a.zoomrestore.style.width = a.win.css("width");
                a.zoomrestore.style.height = a.win.css("height");
                a.zoomrestore.padding = {
                    w: a.win.outerWidth() - a.win.width(),
                    h: a.win.outerHeight() - a.win.height()
                };
                f.isios4 && (a.zoomrestore.scrollTop = e(window).scrollTop(), e(window).scrollTop(0));
                a.win.css({
                    position: f.isios4 ? "absolute" : "fixed",
                    top: 0,
                    left: 0,
                    "z-index": z + 100,
                    margin: "0px"
                });
                c = a.win.css("backgroundColor");
                ("" == c || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(c)) && a.win.css("backgroundColor", "#fff");
                a.rail.css({
                    "z-index": z + 101
                });
                a.zoom.css({
                    "z-index": z + 102
                });
                a.zoom.css("backgroundPosition", "0px -18px");
                a.resizeZoom();
                a.onzoomin && a.onzoomin.call(a);
                return a.cancelEvent(b);
            }
        };
        this.doZoomOut = function(b) {
            if (a.zoomactive) return a.zoomactive = !1, a.win.css("margin", ""), a.win.css(a.zoomrestore.style), 
            f.isios4 && e(window).scrollTop(a.zoomrestore.scrollTop), a.rail.css({
                "z-index": a.zindex
            }), a.zoom.css({
                "z-index": a.zindex
            }), a.zoomrestore = !1, a.zoom.css("backgroundPosition", "0px 0px"), a.onResize(), 
            a.onzoomout && a.onzoomout.call(a), a.cancelEvent(b);
        };
        this.doZoom = function(b) {
            return a.zoomactive ? a.doZoomOut(b) : a.doZoomIn(b);
        };
        this.resizeZoom = function() {
            if (a.zoomactive) {
                var b = a.getScrollTop();
                a.win.css({
                    width: e(window).width() - a.zoomrestore.padding.w + "px",
                    height: e(window).height() - a.zoomrestore.padding.h + "px"
                });
                a.onResize();
                a.setScrollTop(Math.min(a.page.maxh, b));
            }
        };
        this.init();
        e.nicescroll.push(this);
    }, M = function(e) {
        var c = this;
        this.nc = e;
        this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0;
        this.snapy = this.snapx = !1;
        this.demuly = this.demulx = 0;
        this.lastscrolly = this.lastscrollx = -1;
        this.timer = this.chky = this.chkx = 0;
        this.time = function() {
            return +new Date();
        };
        this.reset = function(e, k) {
            c.stop();
            var d = c.time();
            c.steptime = 0;
            c.lasttime = d;
            c.speedx = 0;
            c.speedy = 0;
            c.lastx = e;
            c.lasty = k;
            c.lastscrollx = -1;
            c.lastscrolly = -1;
        };
        this.update = function(e, k) {
            var d = c.time();
            c.steptime = d - c.lasttime;
            c.lasttime = d;
            var d = k - c.lasty, p = e - c.lastx, q = c.nc.getScrollTop(), a = c.nc.getScrollLeft(), q = q + d, a = a + p;
            c.snapx = 0 > a || a > c.nc.page.maxw;
            c.snapy = 0 > q || q > c.nc.page.maxh;
            c.speedx = p;
            c.speedy = d;
            c.lastx = e;
            c.lasty = k;
        };
        this.stop = function() {
            c.nc.unsynched("domomentum2d");
            c.timer && clearTimeout(c.timer);
            c.timer = 0;
            c.lastscrollx = -1;
            c.lastscrolly = -1;
        };
        this.doSnapy = function(e, k) {
            var d = !1;
            0 > k ? (k = 0, d = !0) : k > c.nc.page.maxh && (k = c.nc.page.maxh, d = !0);
            0 > e ? (e = 0, d = !0) : e > c.nc.page.maxw && (e = c.nc.page.maxw, d = !0);
            d ? c.nc.doScrollPos(e, k, c.nc.opt.snapbackspeed) : c.nc.triggerScrollEnd();
        };
        this.doMomentum = function(e) {
            var k = c.time(), d = e ? k + e : c.lasttime;
            e = c.nc.getScrollLeft();
            var p = c.nc.getScrollTop(), q = c.nc.page.maxh, a = c.nc.page.maxw;
            c.speedx = 0 < a ? Math.min(60, c.speedx) : 0;
            c.speedy = 0 < q ? Math.min(60, c.speedy) : 0;
            d = d && 60 >= k - d;
            if (0 > p || p > q || 0 > e || e > a) d = !1;
            e = c.speedx && d ? c.speedx : !1;
            if (c.speedy && d && c.speedy || e) {
                var u = Math.max(16, c.steptime);
                50 < u && (e = u / 50, c.speedx *= e, c.speedy *= e, u = 50);
                c.demulxy = 0;
                c.lastscrollx = c.nc.getScrollLeft();
                c.chkx = c.lastscrollx;
                c.lastscrolly = c.nc.getScrollTop();
                c.chky = c.lastscrolly;
                var f = c.lastscrollx, t = c.lastscrolly, v = function() {
                    var d = 600 < c.time() - k ? .04 : .02;
                    c.speedx && (f = Math.floor(c.lastscrollx - c.speedx * (1 - c.demulxy)), c.lastscrollx = f, 
                    0 > f || f > a) && (d = .1);
                    c.speedy && (t = Math.floor(c.lastscrolly - c.speedy * (1 - c.demulxy)), c.lastscrolly = t, 
                    0 > t || t > q) && (d = .1);
                    c.demulxy = Math.min(1, c.demulxy + d);
                    c.nc.synched("domomentum2d", function() {
                        c.speedx && (c.nc.getScrollLeft() != c.chkx && c.stop(), c.chkx = f, c.nc.setScrollLeft(f));
                        c.speedy && (c.nc.getScrollTop() != c.chky && c.stop(), c.chky = t, c.nc.setScrollTop(t));
                        c.timer || (c.nc.hideCursor(), c.doSnapy(f, t));
                    });
                    1 > c.demulxy ? c.timer = setTimeout(v, u) : (c.stop(), c.nc.hideCursor(), c.doSnapy(f, t));
                };
                v();
            } else c.doSnapy(c.nc.getScrollLeft(), c.nc.getScrollTop());
        };
    }, y = e.fn.scrollTop;
    e.cssHooks.pageYOffset = {
        get: function(k, c, h) {
            return (c = e.data(k, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollTop() : y.call(k);
        },
        set: function(k, c) {
            var h = e.data(k, "__nicescroll") || !1;
            h && h.ishwscroll ? h.setScrollTop(parseInt(c)) : y.call(k, c);
            return this;
        }
    };
    e.fn.scrollTop = function(k) {
        if ("undefined" == typeof k) {
            var c = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;
            return c && c.ishwscroll ? c.getScrollTop() : y.call(this);
        }
        return this.each(function() {
            var c = e.data(this, "__nicescroll") || !1;
            c && c.ishwscroll ? c.setScrollTop(parseInt(k)) : y.call(e(this), k);
        });
    };
    var C = e.fn.scrollLeft;
    e.cssHooks.pageXOffset = {
        get: function(k, c, h) {
            return (c = e.data(k, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollLeft() : C.call(k);
        },
        set: function(k, c) {
            var h = e.data(k, "__nicescroll") || !1;
            h && h.ishwscroll ? h.setScrollLeft(parseInt(c)) : C.call(k, c);
            return this;
        }
    };
    e.fn.scrollLeft = function(k) {
        if ("undefined" == typeof k) {
            var c = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;
            return c && c.ishwscroll ? c.getScrollLeft() : C.call(this);
        }
        return this.each(function() {
            var c = e.data(this, "__nicescroll") || !1;
            c && c.ishwscroll ? c.setScrollLeft(parseInt(k)) : C.call(e(this), k);
        });
    };
    var D = function(k) {
        var c = this;
        this.length = 0;
        this.name = "nicescrollarray";
        this.each = function(d) {
            for (var e = 0, h = 0; e < c.length; e++) d.call(c[e], h++);
            return c;
        };
        this.push = function(d) {
            c[c.length] = d;
            c.length++;
        };
        this.eq = function(d) {
            return c[d];
        };
        if (k) for (var h = 0; h < k.length; h++) {
            var n = e.data(k[h], "__nicescroll") || !1;
            n && (this[this.length] = n, this.length++);
        }
        return this;
    };
    (function(e, c, h) {
        for (var n = 0; n < c.length; n++) h(e, c[n]);
    })(D.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function(e, c) {
        e[c] = function() {
            var e = arguments;
            return this.each(function() {
                this[c].apply(this, e);
            });
        };
    });
    e.fn.getNiceScroll = function(k) {
        return "undefined" == typeof k ? new D(this) : this[k] && e.data(this[k], "__nicescroll") || !1;
    };
    e.extend(e.expr[":"], {
        nicescroll: function(k) {
            return e.data(k, "__nicescroll") ? !0 : !1;
        }
    });
    e.fn.niceScroll = function(k, c) {
        "undefined" != typeof c || "object" != typeof k || "jquery" in k || (c = k, k = !1);
        c = e.extend({}, c);
        var h = new D();
        "undefined" == typeof c && (c = {});
        k && (c.doc = e(k), c.win = e(this));
        var n = !("doc" in c);
        n || "win" in c || (c.win = e(this));
        this.each(function() {
            var d = e(this).data("__nicescroll") || !1;
            d || (c.doc = n ? e(this) : c.doc, d = new S(c, e(this)), e(this).data("__nicescroll", d));
            h.push(d);
        });
        return 1 == h.length ? h[0] : h;
    };
    window.NiceScroll = {
        getjQuery: function() {
            return e;
        }
    };
    e.nicescroll || (e.nicescroll = new D(), e.nicescroll.options = J);
});

(function(f) {
    "use strict";
    "function" === typeof define && define.amd ? define([ "jquery" ], f) : "undefined" !== typeof module && module.exports ? module.exports = f(require("jquery")) : f(jQuery);
})(function($) {
    "use strict";
    function n(a) {
        return !a.nodeName || -1 !== $.inArray(a.nodeName.toLowerCase(), [ "iframe", "#document", "html", "body" ]);
    }
    function h(a) {
        return $.isFunction(a) || $.isPlainObject(a) ? a : {
            top: a,
            left: a
        };
    }
    var p = $.scrollTo = function(a, d, b) {
        return $(window).scrollTo(a, d, b);
    };
    p.defaults = {
        axis: "xy",
        duration: 0,
        limit: !0
    };
    $.fn.scrollTo = function(a, d, b) {
        "object" === typeof d && (b = d, d = 0);
        "function" === typeof b && (b = {
            onAfter: b
        });
        "max" === a && (a = 9e9);
        b = $.extend({}, p.defaults, b);
        d = d || b.duration;
        var u = b.queue && 1 < b.axis.length;
        u && (d /= 2);
        b.offset = h(b.offset);
        b.over = h(b.over);
        return this.each(function() {
            function k(a) {
                var k = $.extend({}, b, {
                    queue: !0,
                    duration: d,
                    complete: a && function() {
                        a.call(q, e, b);
                    }
                });
                r.animate(f, k);
            }
            if (null !== a) {
                var l = n(this), q = l ? this.contentWindow || window : this, r = $(q), e = a, f = {}, t;
                switch (typeof e) {
                  case "number":
                  case "string":
                    if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)) {
                        e = h(e);
                        break;
                    }
                    e = l ? $(e) : $(e, q);

                  case "object":
                    if (e.length === 0) return;
                    if (e.is || e.style) t = (e = $(e)).offset();
                }
                var v = $.isFunction(b.offset) && b.offset(q, e) || b.offset;
                $.each(b.axis.split(""), function(a, c) {
                    var d = "x" === c ? "Left" : "Top", m = d.toLowerCase(), g = "scroll" + d, h = r[g](), n = p.max(q, c);
                    t ? (f[g] = t[m] + (l ? 0 : h - r.offset()[m]), b.margin && (f[g] -= parseInt(e.css("margin" + d), 10) || 0, 
                    f[g] -= parseInt(e.css("border" + d + "Width"), 10) || 0), f[g] += v[m] || 0, b.over[m] && (f[g] += e["x" === c ? "width" : "height"]() * b.over[m])) : (d = e[m], 
                    f[g] = d.slice && "%" === d.slice(-1) ? parseFloat(d) / 100 * n : d);
                    b.limit && /^\d+$/.test(f[g]) && (f[g] = 0 >= f[g] ? 0 : Math.min(f[g], n));
                    !a && 1 < b.axis.length && (h === f[g] ? f = {} : u && (k(b.onAfterFirst), f = {}));
                });
                k(b.onAfter);
            }
        });
    };
    p.max = function(a, d) {
        var b = "x" === d ? "Width" : "Height", h = "scroll" + b;
        if (!n(a)) return a[h] - $(a)[b.toLowerCase()]();
        var b = "client" + b, k = a.ownerDocument || a.document, l = k.documentElement, k = k.body;
        return Math.max(l[h], k[h]) - Math.min(l[b], k[b]);
    };
    $.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = {
        get: function(a) {
            return $(a.elem)[a.prop]();
        },
        set: function(a) {
            var d = this.get(a);
            if (a.options.interrupt && a._last && a._last !== d) return $(a.elem).stop();
            var b = Math.round(a.now);
            d !== b && ($(a.elem)[a.prop](b), a._last = this.get(a));
        }
    };
    return p;
});

(function(factory) {
    var registeredInModuleLoader = false;
    if (typeof define === "function" && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === "object") {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function() {
            window.Cookies = OldCookies;
            return api;
        };
    }
})(function() {
    function extend() {
        var i = 0;
        var result = {};
        for (;i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }
    function init(converter) {
        function api(key, value, attributes) {
            var result;
            if (typeof document === "undefined") {
                return;
            }
            if (arguments.length > 1) {
                attributes = extend({
                    path: "/"
                }, api.defaults, attributes);
                if (typeof attributes.expires === "number") {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e5);
                    attributes.expires = expires;
                }
                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}
                if (!converter.write) {
                    value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }
                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);
                return document.cookie = [ key, "=", value, attributes.expires ? "; expires=" + attributes.expires.toUTCString() : "", attributes.path ? "; path=" + attributes.path : "", attributes.domain ? "; domain=" + attributes.domain : "", attributes.secure ? "; secure" : "" ].join("");
            }
            if (!key) {
                result = {};
            }
            var cookies = document.cookie ? document.cookie.split("; ") : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;
            for (;i < cookies.length; i++) {
                var parts = cookies[i].split("=");
                var cookie = parts.slice(1).join("=");
                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }
                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }
                    if (key === name) {
                        result = cookie;
                        break;
                    }
                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }
            return result;
        }
        api.set = api;
        api.get = function(key) {
            return api.call(api, key);
        };
        api.getJSON = function() {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};
        api.remove = function(key, attributes) {
            api(key, "", extend(attributes, {
                expires: -1
            }));
        };
        api.withConverter = init;
        return api;
    }
    return init(function() {});
});