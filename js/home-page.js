!function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
    "use strict";
    var e = "animsition",
        i = {
            init: function (o) {
                o = t.extend({
                    inClass: "fade-in",
                    outClass: "fade-out",
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: ".animsition-link",
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    loadingInner: "",
                    timeout: !1,
                    timeoutCountdown: 5e3,
                    onLoadEvent: !0,
                    browser: ["animation-duration", "-webkit-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body",
                    transition: function (t) {
                        window.location.href = t
                    }
                }, o), i.settings = {
                    timer: !1,
                    data: {
                        inClass: "animsition-in-class",
                        inDuration: "animsition-in-duration",
                        outClass: "animsition-out-class",
                        outDuration: "animsition-out-duration",
                        overlay: "animsition-overlay"
                    },
                    events: {
                        inStart: "animsition.inStart",
                        inEnd: "animsition.inEnd",
                        outStart: "animsition.outStart",
                        outEnd: "animsition.outEnd"
                    }
                };
                var n = i.supportCheck.call(this, o);
                if (!n && o.browser.length > 0 && (!n || !this.length)) return "console" in window || (window.console = {}, window.console.log = function (t) {
                    return t
                }), this.length || console.log("Animsition: Element does not exist on page."), n || console.log("Animsition: Does not support this browser."), i.destroy.call(this);
                var s = i.optionCheck.call(this, o);
                return s && i.addOverlay.call(this, o), o.loading && i.addLoading.call(this, o), this.each(function () {
                    var n = this,
                        s = t(this),
                        r = t(window),
                        a = t(document),
                        l = s.data(e);
                    l || (o = t.extend({}, o), s.data(e, {options: o}), o.timeout && i.addTimer.call(n), o.onLoadEvent && r.on("load." + e, function () {
                        i.settings.timer && clearTimeout(i.settings.timer), i["in"].call(n)
                    }), r.on("pageshow." + e, function (t) {
                        t.originalEvent.persisted && i["in"].call(n)
                    }), r.on("unload." + e, function () {
                    }), a.on("click." + e, o.linkElement, function (e) {
                        e.preventDefault();
                        var o = t(this),
                            s = o.attr("href");
                        2 === e.which || e.metaKey || e.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && e.ctrlKey ? window.open(s, "_blank") : i.out.call(n, o, s)
                    }))
                })
            }, addOverlay: function (e) {
                t(e.overlayParentElement).prepend('<div class="' + e.overlayClass + '"></div>')
            }, addLoading: function (e) {
                t(e.loadingParentElement).append('<div class="' + e.loadingClass + '">' + e.loadingInner + "</div>")
            }, removeLoading: function () {
                var i = t(this),
                    o = i.data(e).options,
                    n = t(o.loadingParentElement).children("." + o.loadingClass);
                n.fadeOut().remove()
            }, addTimer: function () {
                var o = this,
                    n = t(this),
                    s = n.data(e).options;
                i.settings.timer = setTimeout(function () {
                    i["in"].call(o), t(window).off("load." + e)
                }, s.timeoutCountdown)
            }, supportCheck: function (e) {
                var i = t(this),
                    o = e.browser,
                    n = o.length,
                    s = !1;
                0 === n && (s = !0);
                for (var r = 0; n > r; r++)
                    if ("string" == typeof i.css(o[r])) {
                        s = !0;
                        break
                    }
                return s
            }, optionCheck: function (e) {
                var o, n = t(this);
                return o = e.overlay || n.data(i.settings.data.overlay) ? !0 : !1
            }, animationCheck: function (i, o, n) {
                var s = t(this),
                    r = s.data(e).options,
                    a = typeof i,
                    l = !o && "number" === a,
                    d = o && "string" === a && i.length > 0;
                return l || d ? i = i : o && n ? i = r.inClass : !o && n ? i = r.inDuration : o && !n ? i = r.outClass : o || n || (i = r.outDuration), i
            }, "in": function () {
                var o = this,
                    n = t(this),
                    s = n.data(e).options,
                    r = n.data(i.settings.data.inDuration),
                    a = n.data(i.settings.data.inClass),
                    l = i.animationCheck.call(o, r, !1, !0),
                    d = i.animationCheck.call(o, a, !0, !0),
                    c = i.optionCheck.call(o, s),
                    u = n.data(e).outClass;
                s.loading && i.removeLoading.call(o), u && n.removeClass(u), c ? i.inOverlay.call(o, d, l) : i.inDefault.call(o, d, l)
            }, inDefault: function (e, o) {
                var n = t(this);
                n.css({"animation-duration": o + "ms"}).addClass(e).trigger(i.settings.events.inStart).animateCallback(function () {
                    n.removeClass(e).css({opacity: 1}).trigger(i.settings.events.inEnd)
                })
            }, inOverlay: function (o, n) {
                var s = t(this),
                    r = s.data(e).options;
                s.css({opacity: 1}).trigger(i.settings.events.inStart), t(r.overlayParentElement).children("." + r.overlayClass).css({"animation-duration": n + "ms"}).addClass(o).animateCallback(function () {
                    s.trigger(i.settings.events.inEnd)
                })
            }, out: function (o, n) {
                var s = this,
                    r = t(this),
                    a = r.data(e).options,
                    l = o.data(i.settings.data.outClass),
                    d = r.data(i.settings.data.outClass),
                    c = o.data(i.settings.data.outDuration),
                    u = r.data(i.settings.data.outDuration),
                    p = l ? l : d,
                    h = c ? c : u,
                    f = i.animationCheck.call(s, p, !0, !1),
                    v = i.animationCheck.call(s, h, !1, !1),
                    g = i.optionCheck.call(s, a);
                r.data(e).outClass = f, g ? i.outOverlay.call(s, f, v, n) : i.outDefault.call(s, f, v, n)
            }, outDefault: function (o, n, s) {
                var r = t(this),
                    a = r.data(e).options;
                r.css({"animation-duration": n + 1 + "ms"}).addClass(o).trigger(i.settings.events.outStart).animateCallback(function () {
                    r.trigger(i.settings.events.outEnd), a.transition(s)
                })
            }, outOverlay: function (o, n, s) {
                var r = this,
                    a = t(this),
                    l = a.data(e).options,
                    d = a.data(i.settings.data.inClass),
                    c = i.animationCheck.call(r, d, !0, !0);
                t(l.overlayParentElement).children("." + l.overlayClass).css({"animation-duration": n + 1 + "ms"}).removeClass(c).addClass(o).trigger(i.settings.events.outStart).animateCallback(function () {
                    a.trigger(i.settings.events.outEnd), l.transition(s)
                })
            }, destroy: function () {
                return this.each(function () {
                    var i = t(this);
                    t(window).off("." + e), i.css({opacity: 1}).removeData(e)
                })
            }
        };
    t.fn.animateCallback = function (e) {
        var i = "animationend webkitAnimationEnd";
        return this.each(function () {
            var o = t(this);
            o.on(i, function () {
                return o.off(i), e.call(this)
            })
        })
    }, t.fn.animsition = function (o) {
        return i[o] ? i[o].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof o && o ? void t.error("Method " + o + " does not exist on jQuery." + e) : i.init.apply(this, arguments)
    }
}),
    function (t) {
        "use strict";

        function e(t) {
            return new RegExp("(^|\\s+)" + t + "(\\s+|$)")
        }

        function i(t, e) {
            var i = o(t, e) ? s : n;
            i(t, e)
        }

        var o, n, s;
        "classList" in document.documentElement ? (o = function (t, e) {
            return t.classList.contains(e)
        }, n = function (t, e) {
            t.classList.add(e)
        }, s = function (t, e) {
            t.classList.remove(e)
        }) : (o = function (t, i) {
            return e(i).test(t.className)
        }, n = function (t, e) {
            o(t, e) || (t.className = t.className + " " + e)
        }, s = function (t, i) {
            t.className = t.className.replace(e(i), " ")
        });
        var r = {hasClass: o, addClass: n, removeClass: s, toggleClass: i, has: o, add: n, remove: s, toggle: i};
        "function" == typeof define && define.amd ? define(r) : "object" == typeof exports ? module.exports = r : t.classie = r
    }(window),
    function () {
        "use strict";

        function t(e, o) {
            function n(t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            }

            var s;
            if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) {
                for (var r = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], a = this, l = 0, d = r.length; d > l; l++) a[r[l]] = n(a[r[l]], a);
                i && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function (t, i, o) {
                    var n = Node.prototype.removeEventListener;
                    "click" === t ? n.call(e, t, i.hijacked || i, o) : n.call(e, t, i, o)
                }, e.addEventListener = function (t, i, o) {
                    var n = Node.prototype.addEventListener;
                    "click" === t ? n.call(e, t, i.hijacked || (i.hijacked = function (t) {
                        t.propagationStopped || i(t)
                    }), o) : n.call(e, t, i, o)
                }), "function" == typeof e.onclick && (s = e.onclick, e.addEventListener("click", function (t) {
                    s(t)
                }, !1), e.onclick = null)
            }
        }

        var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
            i = navigator.userAgent.indexOf("Android") > 0 && !e,
            o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
            n = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            s = o && /OS [6-7]_\d/.test(navigator.userAgent),
            r = navigator.userAgent.indexOf("BB10") > 0;
        t.prototype.needsClick = function (t) {
            switch (t.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (t.disabled) return !0;
                    break;
                case "input":
                    if (o && "file" === t.type || t.disabled) return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0
            }
            return /\bneedsclick\b/.test(t.className)
        }, t.prototype.needsFocus = function (t) {
            switch (t.nodeName.toLowerCase()) {
                case "textarea":
                    return !0;
                case "select":
                    return !i;
                case "input":
                    switch (t.type) {
                        case "button":
                        case "checkbox":
                        case "file":
                        case "image":
                        case "radio":
                        case "submit":
                            return !1
                    }
                    return !t.disabled && !t.readOnly;
                default:
                    return /\bneedsfocus\b/.test(t.className)
            }
        }, t.prototype.sendClick = function (t, e) {
            var i, o;
            document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], i = document.createEvent("MouseEvents"), i.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, t.dispatchEvent(i)
        }, t.prototype.determineEventType = function (t) {
            return i && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
        }, t.prototype.focus = function (t) {
            var e;
            o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
        }, t.prototype.updateScrollParent = function (t) {
            var e, i;
            if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
                i = t;
                do {
                    if (i.scrollHeight > i.offsetHeight) {
                        e = i, t.fastClickScrollParent = i;
                        break
                    }
                    i = i.parentElement
                } while (i)
            }
            e && (e.fastClickLastScrollTop = e.scrollTop)
        }, t.prototype.getTargetElementFromEventTarget = function (t) {
            return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
        }, t.prototype.onTouchStart = function (t) {
            var e, i, s;
            if (t.targetTouches.length > 1) return !0;
            if (e = this.getTargetElementFromEventTarget(t.target), i = t.targetTouches[0], o) {
                if (s = window.getSelection(), s.rangeCount && !s.isCollapsed) return !0;
                if (!n) {
                    if (i.identifier && i.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
                    this.lastTouchIdentifier = i.identifier, this.updateScrollParent(e)
                }
            }
            return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = i.pageX, this.touchStartY = i.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
        }, t.prototype.touchHasMoved = function (t) {
            var e = t.changedTouches[0],
                i = this.touchBoundary;
            return Math.abs(e.pageX - this.touchStartX) > i || Math.abs(e.pageY - this.touchStartY) > i ? !0 : !1
        }, t.prototype.onTouchMove = function (t) {
            return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
        }, t.prototype.findControl = function (t) {
            return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }, t.prototype.onTouchEnd = function (t) {
            var e, r, a, l, d, c = this.targetElement;
            if (!this.trackingClick) return !0;
            if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
            if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
            if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, r = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, s && (d = t.changedTouches[0], c = document.elementFromPoint(d.pageX - window.pageXOffset, d.pageY - window.pageYOffset) || c, c.fastClickScrollParent = this.targetElement.fastClickScrollParent), a = c.tagName.toLowerCase(), "label" === a) {
                if (e = this.findControl(c)) {
                    if (this.focus(c), i) return !1;
                    c = e
                }
            } else if (this.needsFocus(c)) return t.timeStamp - r > 100 || o && window.top !== window && "input" === a ? (this.targetElement = null, !1) : (this.focus(c), this.sendClick(c, t), o && "select" === a || (this.targetElement = null, t.preventDefault()), !1);
            return o && !n && (l = c.fastClickScrollParent, l && l.fastClickLastScrollTop !== l.scrollTop) ? !0 : (this.needsClick(c) || (t.preventDefault(), this.sendClick(c, t)), !1)
        }, t.prototype.onTouchCancel = function () {
            this.trackingClick = !1, this.targetElement = null
        }, t.prototype.onMouse = function (t) {
            return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0
        }, t.prototype.onClick = function (t) {
            var e;
            return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
        }, t.prototype.destroy = function () {
            var t = this.layer;
            i && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }, t.notNeeded = function (t) {
            var e, o, n, s;
            if ("undefined" == typeof window.ontouchstart) return !0;
            if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                if (!i) return !0;
                if (e = document.querySelector("meta[name=viewport]")) {
                    if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
                    if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
                }
            }
            if (r && (n = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), n[1] >= 10 && n[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
                if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
                if (document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
            return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (s = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], s >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
        }, t.attach = function (e, i) {
            return new t(e, i)
        }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
            return t
        }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
    }(),
    function (t) {
        t.fn.fitText = function (e, i) {
            var o = e || 1,
                n = t.extend({minFontSize: Number.NEGATIVE_INFINITY, maxFontSize: Number.POSITIVE_INFINITY}, i);
            return this.each(function () {
                var e = t(this),
                    i = function () {
                        e.css("font-size", Math.max(Math.min(e.width() / (10 * o), parseFloat(n.maxFontSize)), parseFloat(n.minFontSize)))
                    };
                i(), t(window).on("resize.fittext orientationchange.fittext", i)
            })
        }
    }(jQuery),
    function (t, e) {
        "use strict";

        function i(t) {
            this.callback = t, this.ticking = !1
        }

        function o(e) {
            return e && "undefined" != typeof t && (e === t || e.nodeType)
        }

        function n(t) {
            if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
            var e, i, s = t || {};
            for (i = 1; i < arguments.length; i++) {
                var r = arguments[i] || {};
                for (e in r) "object" != typeof s[e] || o(s[e]) ? s[e] = s[e] || r[e] : s[e] = n(s[e], r[e])
            }
            return s
        }

        function s(t) {
            return t === Object(t) ? t : {down: t, up: t}
        }

        function r(t, e) {
            e = n(e, r.options), this.lastKnownScrollY = 0, this.elem = t, this.debouncer = new i(this.update.bind(this)), this.tolerance = s(e.tolerance), this.classes = e.classes, this.offset = e.offset, this.scroller = e.scroller, this.initialised = !1, this.onPin = e.onPin, this.onUnpin = e.onUnpin, this.onTop = e.onTop, this.onNotTop = e.onNotTop
        }

        var a = {
            bind: !!function () {
            }.bind,
            classList: "classList" in e.documentElement,
            rAF: !!(t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame)
        };
        t.requestAnimationFrame = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame, i.prototype = {
            constructor: i,
            update: function () {
                this.callback && this.callback(), this.ticking = !1
            },
            requestTick: function () {
                this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
            },
            handleEvent: function () {
                this.requestTick()
            }
        }, r.prototype = {
            constructor: r, init: function () {
                return r.cutsTheMustard ? (this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
            }, destroy: function () {
                var t = this.classes;
                this.initialised = !1, this.elem.classList.remove(t.unpinned, t.pinned, t.top, t.initial), this.scroller.removeEventListener("scroll", this.debouncer, !1)
            }, attachEvent: function () {
                this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
            }, unpin: function () {
                var t = this.elem.classList,
                    e = this.classes;
                (t.contains(e.pinned) || !t.contains(e.unpinned)) && (t.add(e.unpinned), t.remove(e.pinned), this.onUnpin && this.onUnpin.call(this))
            }, pin: function () {
                var t = this.elem.classList,
                    e = this.classes;
                t.contains(e.unpinned) && (t.remove(e.unpinned), t.add(e.pinned), this.onPin && this.onPin.call(this))
            }, top: function () {
                var t = this.elem.classList,
                    e = this.classes;
                t.contains(e.top) || (t.add(e.top), t.remove(e.notTop), this.onTop && this.onTop.call(this))
            }, notTop: function () {
                var t = this.elem.classList,
                    e = this.classes;
                t.contains(e.notTop) || (t.add(e.notTop), t.remove(e.top), this.onNotTop && this.onNotTop.call(this))
            }, getScrollY: function () {
                return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (e.documentElement || e.body.parentNode || e.body).scrollTop
            }, getViewportHeight: function () {
                return t.innerHeight || e.documentElement.clientHeight || e.body.clientHeight
            }, getDocumentHeight: function () {
                var t = e.body,
                    i = e.documentElement;
                return Math.max(t.scrollHeight, i.scrollHeight, t.offsetHeight, i.offsetHeight, t.clientHeight, i.clientHeight)
            }, getElementHeight: function (t) {
                return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight)
            }, getScrollerHeight: function () {
                return this.scroller === t || this.scroller === e.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
            }, isOutOfBounds: function (t) {
                var e = 0 > t,
                    i = t + this.getViewportHeight() > this.getScrollerHeight();
                return e || i
            }, toleranceExceeded: function (t, e) {
                return Math.abs(t - this.lastKnownScrollY) >= this.tolerance[e]
            }, shouldUnpin: function (t, e) {
                var i = t > this.lastKnownScrollY,
                    o = t >= this.offset;
                return i && o && e
            }, shouldPin: function (t, e) {
                var i = t < this.lastKnownScrollY,
                    o = t <= this.offset;
                return i && e || o
            }, update: function () {
                var t = this.getScrollY(),
                    e = t > this.lastKnownScrollY ? "down" : "up",
                    i = this.toleranceExceeded(t, e);
                this.isOutOfBounds(t) || (t <= this.offset ? this.top() : this.notTop(), this.shouldUnpin(t, i) ? this.unpin() : this.shouldPin(t, i) && this.pin(), this.lastKnownScrollY = t)
            }
        }, r.options = {
            tolerance: {up: 0, down: 0},
            offset: 0,
            scroller: t,
            classes: {
                pinned: "headroom--pinned",
                unpinned: "headroom--unpinned",
                top: "headroom--top",
                notTop: "headroom--not-top",
                initial: "headroom"
            }
        }, r.cutsTheMustard = "undefined" != typeof a && a.rAF && a.bind && a.classList, t.Headroom = r
    }(window, document),
    function (t) {
        t && (t.fn.headroom = function (e) {
            return this.each(function () {
                var i = t(this),
                    o = i.data("headroom"),
                    n = "object" == typeof e && e;
                n = t.extend(!0, {}, Headroom.options, n), o || (o = new Headroom(this, n), o.init(), i.data("headroom", o)), "string" == typeof e && o[e]()
            })
        }, t("[data-headroom]").each(function () {
            var e = t(this);
            e.headroom(e.data())
        }))
    }(window.Zepto || window.jQuery),
    function (t) {
        t && t.module("headroom", []).directive("headroom", function () {
            return {
                restrict: "EA",
                scope: {tolerance: "=", offset: "=", classes: "=", scroller: "@"},
                link: function (e, i) {
                    var o = {};
                    t.forEach(Headroom.options, function (t, i) {
                        o[i] = e[i] || Headroom.options[i]
                    }), o.scroller && (o.scroller = t.element(o.scroller)[0]);
                    var n = new Headroom(i[0], o);
                    n.init(), e.$on("destroy", function () {
                        n.destroy()
                    })
                }
            }
        })
    }(window.angular),
    function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t : t(jQuery)
    }(function (t) {
        function e(e) {
            var r = e || window.event,
                a = l.call(arguments, 1),
                d = 0,
                u = 0,
                p = 0,
                h = 0,
                f = 0,
                v = 0;
            if (e = t.event.fix(r), e.type = "mousewheel", "detail" in r && (p = -1 * r.detail), "wheelDelta" in r && (p = r.wheelDelta), "wheelDeltaY" in r && (p = r.wheelDeltaY), "wheelDeltaX" in r && (u = -1 * r.wheelDeltaX), "axis" in r && r.axis === r.HORIZONTAL_AXIS && (u = -1 * p, p = 0), d = 0 === p ? u : p, "deltaY" in r && (p = -1 * r.deltaY, d = p), "deltaX" in r && (u = r.deltaX, 0 === p && (d = -1 * u)), 0 !== p || 0 !== u) {
                if (1 === r.deltaMode) {
                    var g = t.data(this, "mousewheel-line-height");
                    d *= g, p *= g, u *= g
                } else if (2 === r.deltaMode) {
                    var m = t.data(this, "mousewheel-page-height");
                    d *= m, p *= m, u *= m
                }
                if (h = Math.max(Math.abs(p), Math.abs(u)), (!s || s > h) && (s = h, o(r, h) && (s /= 40)), o(r, h) && (d /= 40, u /= 40, p /= 40), d = Math[d >= 1 ? "floor" : "ceil"](d / s), u = Math[u >= 1 ? "floor" : "ceil"](u / s), p = Math[p >= 1 ? "floor" : "ceil"](p / s), c.settings.normalizeOffset && this.getBoundingClientRect) {
                    var y = this.getBoundingClientRect();
                    f = e.clientX - y.left, v = e.clientY - y.top
                }
                return e.deltaX = u, e.deltaY = p, e.deltaFactor = s, e.offsetX = f, e.offsetY = v, e.deltaMode = 0, a.unshift(e, d, u, p), n && clearTimeout(n), n = setTimeout(i, 200), (t.event.dispatch || t.event.handle).apply(this, a)
            }
        }

        function i() {
            s = null
        }

        function o(t, e) {
            return c.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 === 0
        }

        var n, s, r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            a = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            l = Array.prototype.slice;
        if (t.event.fixHooks)
            for (var d = r.length; d;) t.event.fixHooks[r[--d]] = t.event.mouseHooks;
        var c = t.event.special.mousewheel = {
            version: "3.1.12", setup: function () {
                if (this.addEventListener)
                    for (var i = a.length; i;) this.addEventListener(a[--i], e, !1);
                else this.onmousewheel = e;
                t.data(this, "mousewheel-line-height", c.getLineHeight(this)), t.data(this, "mousewheel-page-height", c.getPageHeight(this))
            }, teardown: function () {
                if (this.removeEventListener)
                    for (var i = a.length; i;) this.removeEventListener(a[--i], e, !1);
                else this.onmousewheel = null;
                t.removeData(this, "mousewheel-line-height"), t.removeData(this, "mousewheel-page-height")
            }, getLineHeight: function (e) {
                var i = t(e),
                    o = i["offsetParent" in t.fn ? "offsetParent" : "parent"]();
                return o.length || (o = t("body")), parseInt(o.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
            }, getPageHeight: function (e) {
                return t(e).height()
            }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}
        };
        t.fn.extend({
            mousewheel: function (t) {
                return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
            }, unmousewheel: function (t) {
                return this.unbind("mousewheel", t)
            }
        })
    }), !function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
    "use strict";
    var e = window.Slick || {};
    e = function () {
        function e(e, o) {
            var n, s = this;
            s.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: t(e),
                appendDots: t(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (t, e) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (e + 1) + "</button>"
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !1,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, s.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, t.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.hidden = "hidden", s.paused = !1, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = t(e), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, n = t(e).data("slick") || {}, s.options = t.extend({}, s.defaults, n, o), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, "undefined" != typeof document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = t.proxy(s.autoPlay, s), s.autoPlayClear = t.proxy(s.autoPlayClear, s), s.changeSlide = t.proxy(s.changeSlide, s), s.clickHandler = t.proxy(s.clickHandler, s), s.selectHandler = t.proxy(s.selectHandler, s), s.setPosition = t.proxy(s.setPosition, s), s.swipeHandler = t.proxy(s.swipeHandler, s), s.dragHandler = t.proxy(s.dragHandler, s), s.keyHandler = t.proxy(s.keyHandler, s), s.autoPlayIterator = t.proxy(s.autoPlayIterator, s), s.instanceUid = i++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0), s.checkResponsive(!0)
        }

        var i = 0;
        return e
    }(), e.prototype.addSlide = e.prototype.slickAdd = function (e, i, o) {
        var n = this;
        if ("boolean" == typeof i) o = i, i = null;
        else if (0 > i || i >= n.slideCount) return !1;
        n.unload(), "number" == typeof i ? 0 === i && 0 === n.$slides.length ? t(e).appendTo(n.$slideTrack) : o ? t(e).insertBefore(n.$slides.eq(i)) : t(e).insertAfter(n.$slides.eq(i)) : o === !0 ? t(e).prependTo(n.$slideTrack) : t(e).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function (e, i) {
            t(i).attr("data-slick-index", e)
        }), n.$slidesCache = n.$slides, n.reinit()
    }, e.prototype.animateHeight = function () {
        var t = this;
        if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.animate({height: e}, t.options.speed)
        }
    }, e.prototype.animateSlide = function (e, i) {
        var o = {},
            n = this;
        n.animateHeight(), n.options.rtl === !0 && n.options.vertical === !1 && (e = -e), n.transformsEnabled === !1 ? n.options.vertical === !1 ? n.$slideTrack.animate({left: e}, n.options.speed, n.options.easing, i) : n.$slideTrack.animate({top: e}, n.options.speed, n.options.easing, i) : n.cssTransitions === !1 ? (n.options.rtl === !0 && (n.currentLeft = -n.currentLeft), t({animStart: n.currentLeft}).animate({animStart: e}, {
            duration: n.options.speed,
            easing: n.options.easing,
            step: function (t) {
                t = Math.ceil(t), n.options.vertical === !1 ? (o[n.animType] = "translate(" + t + "px, 0px)", n.$slideTrack.css(o)) : (o[n.animType] = "translate(0px," + t + "px)", n.$slideTrack.css(o))
            },
            complete: function () {
                i && i.call()
            }
        })) : (n.applyTransition(), e = Math.ceil(e), n.options.vertical === !1 ? o[n.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[n.animType] = "translate3d(0px," + e + "px, 0px)", n.$slideTrack.css(o), i && setTimeout(function () {
            n.disableTransition(), i.call()
        }, n.options.speed))
    }, e.prototype.asNavFor = function (e) {
        var i = this,
            o = i.options.asNavFor;
        o && null !== o && (o = t(o).not(i.$slider)), null !== o && "object" == typeof o && o.each(function () {
            var i = t(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function (t) {
        var e = this,
            i = {};
        e.options.fade === !1 ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.autoPlay = function () {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function () {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function () {
        var t = this;
        t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (t.currentSlide - 1 === 0 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
    }, e.prototype.buildArrows = function () {
        var e = this;
        e.options.arrows === !0 && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function () {
        var e, i, o = this;
        if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
            for (i = '<ul class="' + o.options.dotsClass + '">', e = 0; e <= o.getDotCount(); e += 1) i += "<li>" + o.options.customPaging.call(this, o, e) + "</li>";
            i += "</ul>", o.$dots = t(i).appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, e.prototype.buildOut = function () {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, i) {
            t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), (e.options.centerMode === !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function () {
        var t, e, i, o, n, s, r, a = this;
        if (o = document.createDocumentFragment(), s = a.$slider.children(), a.options.rows > 1) {
            for (r = a.options.slidesPerRow * a.options.rows, n = Math.ceil(s.length / r), t = 0; n > t; t++) {
                var l = document.createElement("div");
                for (e = 0; e < a.options.rows; e++) {
                    var d = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var c = t * r + (e * a.options.slidesPerRow + i);
                        s.get(c) && d.appendChild(s.get(c))
                    }
                    l.appendChild(d)
                }
                o.appendChild(l)
            }
            a.$slider.html(o), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function (e, i) {
        var o, n, s, r = this,
            a = !1,
            l = r.$slider.width(),
            d = window.innerWidth || t(window).width();
        if ("window" === r.respondTo ? s = d : "slider" === r.respondTo ? s = l : "min" === r.respondTo && (s = Math.min(d, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            n = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? s < r.breakpoints[o] && (n = r.breakpoints[o]) : s > r.breakpoints[o] && (n = r.breakpoints[o]));
            null !== n ? null !== r.activeBreakpoint ? (n !== r.activeBreakpoint || i) && (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[n]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = n) : (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[n]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = n) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), a = n), e || a === !1 || r.$slider.trigger("breakpoint", [r, a])
        }
    }, e.prototype.changeSlide = function (e, i) {
        var o, n, s, r = this,
            a = t(e.target);
        switch (a.is("a") && e.preventDefault(), a.is("li") || (a = a.closest("li")), s = r.slideCount % r.options.slidesToScroll !== 0, o = s ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                n = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - n, !1, i);
                break;
            case "next":
                n = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + n, !1, i);
                break;
            case "index":
                var l = 0 === e.data.index ? 0 : e.data.index || a.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(l), !1, i), a.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function (t) {
        var e, i, o = this;
        if (e = o.getNavigableIndexes(), i = 0, t > e[e.length - 1]) t = e[e.length - 1];
        else
            for (var n in e) {
                if (t < e[n]) {
                    t = i;
                    break
                }
                i = e[n]
            }
        return t
    }, e.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide), e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).off("mouseenter.slick", t.proxy(e.setPaused, e, !0)).off("mouseleave.slick", t.proxy(e.setPaused, e, !1))), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.$list.off("mouseenter.slick", t.proxy(e.setPaused, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.setPaused, e, !1)), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpRows = function () {
        var t, e = this;
        e.options.rows > 1 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.html(t))
    }, e.prototype.clickHandler = function (t) {
        var e = this;
        e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
    }, e.prototype.destroy = function (e) {
        var i = this;
        i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            t(this).attr("style", t(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
    }, e.prototype.disableTransition = function (t) {
        var e = this,
            i = {};
        i[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.fadeSlide = function (t, e) {
        var i = this;
        i.cssTransitions === !1 ? (i.$slides.eq(t).css({zIndex: i.options.zIndex}), i.$slides.eq(t).animate({opacity: 1}, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), e && setTimeout(function () {
            i.disableTransition(t), e.call()
        }, i.options.speed))
    }, e.prototype.fadeSlideOut = function (t) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(t).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function (t) {
        var e = this;
        null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
        var t = this;
        return t.currentSlide
    }, e.prototype.getDotCount = function () {
        var t = this,
            e = 0,
            i = 0,
            o = 0;
        if (t.options.infinite === !0)
            for (; e < t.slideCount;) ++o, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        else if (t.options.centerMode === !0) o = t.slideCount;
        else
            for (; e < t.slideCount;) ++o, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return o - 1
    }, e.prototype.getLeft = function (t) {
        var e, i, o, n = this,
            s = 0;
        return n.slideOffset = 0, i = n.$slides.first().outerHeight(!0), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = i * n.options.slidesToShow * -1), n.slideCount % n.options.slidesToScroll !== 0 && t + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (t > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (t - n.slideCount)) * n.slideWidth * -1, s = (n.options.slidesToShow - (t - n.slideCount)) * i * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, s = n.slideCount % n.options.slidesToScroll * i * -1))) : t + n.options.slidesToShow > n.slideCount && (n.slideOffset = (t + n.options.slidesToShow - n.slideCount) * n.slideWidth, s = (t + n.options.slidesToShow - n.slideCount) * i), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, s = 0), n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = n.options.vertical === !1 ? t * n.slideWidth * -1 + n.slideOffset : t * i * -1 + s, n.options.variableWidth === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow), e = n.options.rtl === !0 ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, n.options.centerMode === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow + 1), e = n.options.rtl === !0 ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function (t) {
        var e = this;
        return e.options[t]
    }, e.prototype.getNavigableIndexes = function () {
        var t, e = this,
            i = 0,
            o = 0,
            n = [];
        for (e.options.infinite === !1 ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); t > i;) n.push(i), i = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return n
    }, e.prototype.getSlick = function () {
        return this
    }, e.prototype.getSlideCount = function () {
        var e, i, o, n = this;
        return o = n.options.centerMode === !0 ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function (e, s) {
            return s.offsetLeft - o + t(s).outerWidth() / 2 > -1 * n.swipeLeft ? (i = s, !1) : void 0
        }), e = Math.abs(t(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function (t, e) {
        var i = this;
        i.changeSlide({data: {message: "index", index: parseInt(t)}}, e)
    }, e.prototype.init = function (e) {
        var i = this;
        t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots()), e && i.$slider.trigger("init", [i]), i.options.accessibility === !0 && i.initADA()
    }, e.prototype.initArrowEvents = function () {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {message: "previous"}, t.changeSlide), t.$nextArrow.on("click.slick", {message: "next"}, t.changeSlide))
    }, e.prototype.initDotEvents = function () {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {message: "index"}, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.setPaused, e, !0)).on("mouseleave.slick", t.proxy(e.setPaused, e, !1))
    }, e.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.$list.on("touchstart.slick mousedown.slick", {action: "start"}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {action: "move"}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {action: "end"}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), e.$list.on("mouseenter.slick", t.proxy(e.setPaused, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.setPaused, e, !1)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.initUI = function () {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
    }, e.prototype.keyHandler = function (t) {
        var e = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && e.options.accessibility === !0 ? e.changeSlide({data: {message: "previous"}}) : 39 === t.keyCode && e.options.accessibility === !0 && e.changeSlide({data: {message: "next"}}))
    }, e.prototype.lazyLoad = function () {
        function e(e) {
            t("img[data-lazy]", e).each(function () {
                var e = t(this),
                    i = t(this).attr("data-lazy"),
                    o = document.createElement("img");
                o.onload = function () {
                    e.animate({opacity: 0}, 100, function () {
                        e.attr("src", i).animate({opacity: 1}, 200, function () {
                            e.removeAttr("data-lazy").removeClass("slick-loading")
                        })
                    })
                }, o.src = i
            })
        }

        var i, o, n, s, r = this;
        r.options.centerMode === !0 ? r.options.infinite === !0 ? (n = r.currentSlide + (r.options.slidesToShow / 2 + 1), s = n + r.options.slidesToShow + 2) : (n = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), s = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (n = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, s = n + r.options.slidesToShow, r.options.fade === !0 && (n > 0 && n--, s <= r.slideCount && s++)), i = r.$slider.find(".slick-slide").slice(n, s), e(i), r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"), e(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), e(o))
    }, e.prototype.loadSlider = function () {
        var t = this;
        t.setPosition(), t.$slideTrack.css({opacity: 1}), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function () {
        var t = this;
        t.changeSlide({data: {message: "next"}})
    }, e.prototype.orientationChange = function () {
        var t = this;
        t.checkResponsive(), t.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function () {
        var t = this;
        t.autoPlayClear(), t.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function () {
        var t = this;
        t.paused = !1, t.autoPlay()
    }, e.prototype.postSlide = function (t) {
        var e = this;
        e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay === !0 && e.paused === !1 && e.autoPlay(), e.options.accessibility === !0 && e.initADA()
    }, e.prototype.prev = e.prototype.slickPrev = function () {
        var t = this;
        t.changeSlide({data: {message: "previous"}})
    }, e.prototype.preventDefault = function (t) {
        t.preventDefault()
    }, e.prototype.progressiveLazyLoad = function () {
        var e, i, o = this;
        e = t("img[data-lazy]", o.$slider).length, e > 0 && (i = t("img[data-lazy]", o.$slider).first(), i.attr("src", null), i.attr("src", i.attr("data-lazy")).removeClass("slick-loading").load(function () {
            i.removeAttr("data-lazy"), o.progressiveLazyLoad(), o.options.adaptiveHeight === !0 && o.setPosition()
        }).error(function () {
            i.removeAttr("data-lazy"), o.progressiveLazyLoad()
        }))
    }, e.prototype.refresh = function (e) {
        var i, o, n = this;
        o = n.slideCount - n.options.slidesToShow, n.options.infinite || (n.slideCount <= n.options.slidesToShow ? n.currentSlide = 0 : n.currentSlide > o && (n.currentSlide = o)), i = n.currentSlide, n.destroy(!0), t.extend(n, n.initials, {currentSlide: i}), n.init(), e || n.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function () {
        var e, i, o, n = this,
            s = n.options.responsive || null;
        if ("array" === t.type(s) && s.length) {
            n.respondTo = n.options.respondTo || "window";
            for (e in s)
                if (o = n.breakpoints.length - 1, i = s[e].breakpoint, s.hasOwnProperty(e)) {
                    for (; o >= 0;) n.breakpoints[o] && n.breakpoints[o] === i && n.breakpoints.splice(o, 1), o--;
                    n.breakpoints.push(i), n.breakpointSettings[i] = s[e].settings
                }
            n.breakpoints.sort(function (t, e) {
                return n.options.mobileFirst ? t - e : e - t
            })
        }
    }, e.prototype.reinit = function () {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses(0), e.setPosition(), e.$slider.trigger("reInit", [e]), e.options.autoplay === !0 && e.focusHandler()
    }, e.prototype.resize = function () {
        var e = this;
        t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
            e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function (t, e, i) {
        var o = this;
        return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : o.slideCount - 1) : t = e === !0 ? --t : t, o.slideCount < 1 || 0 > t || t > o.slideCount - 1 ? !1 : (o.unload(), i === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(t).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
    }, e.prototype.setCSS = function (t) {
        var e, i, o = this,
            n = {};
        o.options.rtl === !0 && (t = -t), e = "left" == o.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == o.positionProp ? Math.ceil(t) + "px" : "0px", n[o.positionProp] = t, o.transformsEnabled === !1 ? o.$slideTrack.css(n) : (n = {}, o.cssTransitions === !1 ? (n[o.animType] = "translate(" + e + ", " + i + ")", o.$slideTrack.css(n)) : (n[o.animType] = "translate3d(" + e + ", " + i + ", 0px)", o.$slideTrack.css(n)))
    }, e.prototype.setDimensions = function () {
        var t = this;
        t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({padding: "0px " + t.options.centerPadding}) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({padding: t.options.centerPadding + " 0px"})), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
    }, e.prototype.setFade = function () {
        var e, i = this;
        i.$slides.each(function (o, n) {
            e = i.slideWidth * o * -1, i.options.rtl === !0 ? t(n).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : t(n).css({position: "relative", left: e, top: 0, zIndex: i.options.zIndex - 2, opacity: 0})
        }), i.$slides.eq(i.currentSlide).css({zIndex: i.options.zIndex - 1, opacity: 1})
    }, e.prototype.setHeight = function () {
        var t = this;
        if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function (e, i, o) {
        var n, s, r = this;
        if ("responsive" === e && "array" === t.type(i))
            for (s in i)
                if ("array" !== t.type(r.options.responsive)) r.options.responsive = [i[s]];
                else {
                    for (n = r.options.responsive.length - 1; n >= 0;) r.options.responsive[n].breakpoint === i[s].breakpoint && r.options.responsive.splice(n, 1), n--;
                    r.options.responsive.push(i[s])
                } else r.options[e] = i;
        o === !0 && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function () {
        var t = this;
        t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
    }, e.prototype.setProps = function () {
        var t = this,
            e = document.body.style;
        t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && t.animType !== !1
    }, e.prototype.setSlideClasses = function (t) {
        var e, i, o, n, s = this;
        i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(t).addClass("slick-current"), s.options.centerMode === !0 ? (e = Math.floor(s.options.slidesToShow / 2), s.options.infinite === !0 && (t >= e && t <= s.slideCount - 1 - e ? s.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = s.options.slidesToShow + t, i.slice(o - e + 1, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (n = s.slideCount % s.options.slidesToShow, o = s.options.infinite === !0 ? s.options.slidesToShow + t : t, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? i.slice(o - (s.options.slidesToShow - n), o + n).addClass("slick-active").attr("aria-hidden", "false") : i.slice(o, o + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === s.options.lazyLoad && s.lazyLoad()
    }, e.prototype.setupInfinite = function () {
        var e, i, o, n = this;
        if (n.options.fade === !0 && (n.options.centerMode = !1), n.options.infinite === !0 && n.options.fade === !1 && (i = null, n.slideCount > n.options.slidesToShow)) {
            for (o = n.options.centerMode === !0 ? n.options.slidesToShow + 1 : n.options.slidesToShow, e = n.slideCount; e > n.slideCount - o; e -= 1) i = e - 1, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
            for (e = 0; o > e; e += 1) i = e, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
            n.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                t(this).attr("id", "")
            })
        }
    }, e.prototype.setPaused = function (t) {
        var e = this;
        e.options.autoplay === !0 && e.options.pauseOnHover === !0 && (e.paused = t, t ? e.autoPlayClear() : e.autoPlay())
    }, e.prototype.selectHandler = function (e) {
        var i = this,
            o = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
            n = parseInt(o.attr("data-slick-index"));
        return n || (n = 0), i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(n), void i.asNavFor(n)) : void i.slideHandler(n)
    }, e.prototype.slideHandler = function (t, e, i) {
        var o, n, s, r, a = null,
            l = this;
        return e = e || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (e === !1 && l.asNavFor(t), o = t, a = l.getLeft(o), r = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? r : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (o = l.currentSlide, i !== !0 ? l.animateSlide(r, function () {
            l.postSlide(o)
        }) : l.postSlide(o))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (o = l.currentSlide, i !== !0 ? l.animateSlide(r, function () {
            l.postSlide(o)
        }) : l.postSlide(o))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), n = 0 > o ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + o : o >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : o - l.slideCount : o, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, n]), s = l.currentSlide, l.currentSlide = n, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (i !== !0 ? (l.fadeSlideOut(s), l.fadeSlide(n, function () {
            l.postSlide(n)
        })) : l.postSlide(n), void l.animateHeight()) : void(i !== !0 ? l.animateSlide(a, function () {
            l.postSlide(n)
        }) : l.postSlide(n))))
    }, e.prototype.startLoad = function () {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function () {
        var t, e, i, o, n = this;
        return t = n.touchObject.startX - n.touchObject.curX, e = n.touchObject.startY - n.touchObject.curY, i = Math.atan2(e, t), o = Math.round(180 * i / Math.PI), 0 > o && (o = 360 - Math.abs(o)), 45 >= o && o >= 0 ? n.options.rtl === !1 ? "left" : "right" : 360 >= o && o >= 315 ? n.options.rtl === !1 ? "left" : "right" : o >= 135 && 225 >= o ? n.options.rtl === !1 ? "right" : "left" : n.options.verticalSwiping === !0 ? o >= 35 && 135 >= o ? "left" : "right" : "vertical"
    }, e.prototype.swipeEnd = function (t) {
        var e, i = this;
        if (i.dragging = !1, i.shouldClick = i.touchObject.swipeLength > 10 ? !1 : !0, void 0 === i.touchObject.curX) return !1;
        if (i.touchObject.edgeHit === !0 && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) switch (i.swipeDirection()) {
            case "left":
                e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.slideHandler(e), i.currentDirection = 0, i.touchObject = {}, i.$slider.trigger("swipe", [i, "left"]);
                break;
            case "right":
                e = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.slideHandler(e), i.currentDirection = 1, i.touchObject = {}, i.$slider.trigger("swipe", [i, "right"])
        } else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
    }, e.prototype.swipeHandler = function (t) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
            case "start":
                e.swipeStart(t);
                break;
            case "move":
                e.swipeMove(t);
                break;
            case "end":
                e.swipeEnd(t)
        }
    }, e.prototype.swipeMove = function (t) {
        var e, i, o, n, s, r = this;
        return s = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !r.dragging || s && 1 !== s.length ? !1 : (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX, r.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), i = r.swipeDirection(), "vertical" !== i ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), n = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (n = r.touchObject.curY > r.touchObject.startY ? 1 : -1), o = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (o = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.options.vertical === !1 ? r.swipeLeft = e + o * n : r.swipeLeft = e + o * (r.$list.height() / r.listWidth) * n, r.options.verticalSwiping === !0 && (r.swipeLeft = e + o * n), r.options.fade === !0 || r.options.touchMove === !1 ? !1 : r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft)) : void 0)
    }, e.prototype.swipeStart = function (t) {
        var e, i = this;
        return 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void(i.dragging = !0))
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
        var t = this;
        null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
    }, e.prototype.unload = function () {
        var e = this;
        t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function (t) {
        var e = this;
        e.$slider.trigger("unslick", [e, t]), e.destroy()
    }, e.prototype.updateArrows = function () {
        var t, e = this;
        t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function () {
        var t = this;
        null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, e.prototype.visibility = function () {
        var t = this;
        document[t.hidden] ? (t.paused = !0, t.autoPlayClear()) : t.options.autoplay === !0 && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function () {
        var e = this;
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({tabindex: "-1"}), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (i) {
            t(this).attr({role: "option", "aria-describedby": "slick-slide" + e.instanceUid + i})
        }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function (i) {
            t(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + e.instanceUid + i,
                id: "slick-slide" + e.instanceUid + i
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
    }, e.prototype.activateADA = function () {
        var t = this;
        t.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
    }, e.prototype.focusHandler = function () {
        var e = this;
        e.$slider.on("focus.slick blur.slick", "*", function (i) {
            i.stopImmediatePropagation();
            var o = t(this);
            setTimeout(function () {
                e.isPlay && (o.is(":focus") ? (e.autoPlayClear(), e.paused = !0) : (e.paused = !1, e.autoPlay()))
            }, 0)
        })
    }, t.fn.slick = function () {
        var t, i, o = this,
            n = arguments[0],
            s = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (t = 0; r > t; t++)
            if ("object" == typeof n || "undefined" == typeof n ? o[t].slick = new e(o[t], n) : i = o[t].slick[n].apply(o[t].slick, s), "undefined" != typeof i) return i;
        return o
    }
}), !function () {
    "use strict";

    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
    }

    var e = 0,
        i = {};
    t.prototype.queueTrigger = function (t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function (t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function () {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, t.prototype.disable = function () {
        return this.enabled = !1, this
    }, t.prototype.enable = function () {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function () {
        return this.group.next(this)
    }, t.prototype.previous = function () {
        return this.group.previous(this)
    }, t.invokeAll = function (t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, s = e.length; s > n; n++) e[n][t]()
    }, t.destroyAll = function () {
        t.invokeAll("destroy")
    }, t.disableAll = function () {
        t.invokeAll("disable")
    }, t.enableAll = function () {
        t.invokeAll("enable")
    }, t.refreshAll = function () {
        t.Context.refreshAll()
    }, t.viewportHeight = function () {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function () {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function () {
            return this.context.innerHeight() - this.adapter.outerHeight()
        }, "right-in-view": function () {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
    function () {
        "use strict";

        function t(t) {
            window.setTimeout(t, 1e3 / 60)
        }

        function e(t) {
            this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
                x: this.adapter.scrollLeft(),
                y: this.adapter.scrollTop()
            }, this.waypoints = {
                vertical: {},
                horizontal: {}
            }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
        }

        var i = 0,
            o = {},
            n = window.Waypoint,
            s = window.onload;
        e.prototype.add = function (t) {
            var e = t.options.horizontal ? "horizontal" : "vertical";
            this.waypoints[e][t.key] = t, this.refresh()
        }, e.prototype.checkEmpty = function () {
            var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                e = this.Adapter.isEmptyObject(this.waypoints.vertical);
            t && e && (this.adapter.off(".waypoints"), delete o[this.key])
        }, e.prototype.createThrottledResizeHandler = function () {
            function t() {
                e.handleResize(), e.didResize = !1
            }

            var e = this;
            this.adapter.on("resize.waypoints", function () {
                e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
            })
        }, e.prototype.createThrottledScrollHandler = function () {
            function t() {
                e.handleScroll(), e.didScroll = !1
            }

            var e = this;
            this.adapter.on("scroll.waypoints", function () {
                (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
            })
        }, e.prototype.handleResize = function () {
            n.Context.refreshAll()
        }, e.prototype.handleScroll = function () {
            var t = {},
                e = {
                    horizontal: {
                        newScroll: this.adapter.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.adapter.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
            for (var i in e) {
                var o = e[i],
                    n = o.newScroll > o.oldScroll,
                    s = n ? o.forward : o.backward;
                for (var r in this.waypoints[i]) {
                    var a = this.waypoints[i][r],
                        l = o.oldScroll < a.triggerPoint,
                        d = o.newScroll >= a.triggerPoint,
                        c = l && d,
                        u = !l && !d;
                    (c || u) && (a.queueTrigger(s), t[a.group.id] = a.group)
                }
            }
            for (var p in t) t[p].flushTriggers();
            this.oldScroll = {x: e.horizontal.newScroll, y: e.vertical.newScroll}
        }, e.prototype.innerHeight = function () {
            return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
        }, e.prototype.remove = function (t) {
            delete this.waypoints[t.axis][t.key], this.checkEmpty()
        }, e.prototype.innerWidth = function () {
            return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
        }, e.prototype.destroy = function () {
            var t = [];
            for (var e in this.waypoints)
                for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
            for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
        }, e.prototype.refresh = function () {
            var t, e = this.element == this.element.window,
                i = e ? void 0 : this.adapter.offset(),
                o = {};
            this.handleScroll(), t = {
                horizontal: {
                    contextOffset: e ? 0 : i.left,
                    contextScroll: e ? 0 : this.oldScroll.x,
                    contextDimension: this.innerWidth(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left",
                    offsetProp: "left"
                },
                vertical: {
                    contextOffset: e ? 0 : i.top,
                    contextScroll: e ? 0 : this.oldScroll.y,
                    contextDimension: this.innerHeight(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up",
                    offsetProp: "top"
                }
            };
            for (var s in t) {
                var r = t[s];
                for (var a in this.waypoints[s]) {
                    var l, d, c, u, p, h = this.waypoints[s][a],
                        f = h.options.offset,
                        v = h.triggerPoint,
                        g = 0,
                        m = null == v;
                    h.element !== h.element.window && (g = h.adapter.offset()[r.offsetProp]), "function" == typeof f ? f = f.apply(h) : "string" == typeof f && (f = parseFloat(f), h.options.offset.indexOf("%") > -1 && (f = Math.ceil(r.contextDimension * f / 100))), l = r.contextScroll - r.contextOffset, h.triggerPoint = g + l - f, d = v < r.oldScroll, c = h.triggerPoint >= r.oldScroll, u = d && c, p = !d && !c, !m && u ? (h.queueTrigger(r.backward), o[h.group.id] = h.group) : !m && p ? (h.queueTrigger(r.forward), o[h.group.id] = h.group) : m && r.oldScroll >= h.triggerPoint && (h.queueTrigger(r.forward), o[h.group.id] = h.group)
                }
            }
            return n.requestAnimationFrame(function () {
                for (var t in o) o[t].flushTriggers()
            }), this
        }, e.findOrCreateByElement = function (t) {
            return e.findByElement(t) || new e(t)
        }, e.refreshAll = function () {
            for (var t in o) o[t].refresh()
        }, e.findByElement = function (t) {
            return o[t.waypointContextKey]
        }, window.onload = function () {
            s && s(), e.refreshAll()
        }, n.requestAnimationFrame = function (e) {
            var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
            i.call(window, e)
        }, n.Context = e
    }(),
    function () {
        "use strict";

        function t(t, e) {
            return t.triggerPoint - e.triggerPoint
        }

        function e(t, e) {
            return e.triggerPoint - t.triggerPoint
        }

        function i(t) {
            this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
        }

        var o = {vertical: {}, horizontal: {}},
            n = window.Waypoint;
        i.prototype.add = function (t) {
            this.waypoints.push(t)
        }, i.prototype.clearTriggerQueues = function () {
            this.triggerQueues = {up: [], down: [], left: [], right: []}
        }, i.prototype.flushTriggers = function () {
            for (var i in this.triggerQueues) {
                var o = this.triggerQueues[i],
                    n = "up" === i || "left" === i;
                o.sort(n ? e : t);
                for (var s = 0, r = o.length; r > s; s += 1) {
                    var a = o[s];
                    (a.options.continuous || s === o.length - 1) && a.trigger([i])
                }
            }
            this.clearTriggerQueues()
        }, i.prototype.next = function (e) {
            this.waypoints.sort(t);
            var i = n.Adapter.inArray(e, this.waypoints),
                o = i === this.waypoints.length - 1;
            return o ? null : this.waypoints[i + 1]
        }, i.prototype.previous = function (e) {
            this.waypoints.sort(t);
            var i = n.Adapter.inArray(e, this.waypoints);
            return i ? this.waypoints[i - 1] : null
        }, i.prototype.queueTrigger = function (t, e) {
            this.triggerQueues[e].push(t)
        }, i.prototype.remove = function (t) {
            var e = n.Adapter.inArray(t, this.waypoints);
            e > -1 && this.waypoints.splice(e, 1)
        }, i.prototype.first = function () {
            return this.waypoints[0]
        }, i.prototype.last = function () {
            return this.waypoints[this.waypoints.length - 1]
        }, i.findOrCreate = function (t) {
            return o[t.axis][t.name] || new i(t)
        }, n.Group = i
    }(),
    function () {
        "use strict";

        function t(t) {
            this.$element = e(t)
        }

        var e = window.jQuery,
            i = window.Waypoint;
        e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, i) {
            t.prototype[i] = function () {
                var t = Array.prototype.slice.call(arguments);
                return this.$element[i].apply(this.$element, t)
            }
        }), e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
            t[o] = e[o]
        }), i.adapters.push({name: "jquery", Adapter: t}), i.Adapter = t
    }(),
    function () {
        "use strict";

        function t(t) {
            return function () {
                var i = [],
                    o = arguments[0];
                return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function () {
                    var n = t.extend({}, o, {element: this});
                    "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
                }), i
            }
        }

        var e = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
    }(),
    function () {
        var t, e, i, o, n, s = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            },
            r = [].indexOf || function (t) {
                for (var e = 0, i = this.length; i > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            };
        e = function () {
            function t() {
            }

            return t.prototype.extend = function (t, e) {
                var i, o;
                for (i in e) o = e[i], null == t[i] && (t[i] = o);
                return t
            }, t.prototype.isMobile = function (t) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
            }, t.prototype.createEvent = function (t, e, i, o) {
                var n;
                return null == e && (e = !1), null == i && (i = !1), null == o && (o = null), null != document.createEvent ? (n = document.createEvent("CustomEvent"), n.initCustomEvent(t, e, i, o)) : null != document.createEventObject ? (n = document.createEventObject(), n.eventType = t) : n.eventName = t, n
            }, t.prototype.emitEvent = function (t, e) {
                return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0
            }, t.prototype.addEvent = function (t, e, i) {
                return null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
            }, t.prototype.removeEvent = function (t, e, i) {
                return null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
            }, t.prototype.innerHeight = function () {
                return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
            }, t
        }(), i = this.WeakMap || this.MozWeakMap || (i = function () {
            function t() {
                this.keys = [], this.values = []
            }

            return t.prototype.get = function (t) {
                var e, i, o, n, s;
                for (s = this.keys, e = o = 0, n = s.length; n > o; e = ++o)
                    if (i = s[e], i === t) return this.values[e]
            }, t.prototype.set = function (t, e) {
                var i, o, n, s, r;
                for (r = this.keys, i = n = 0, s = r.length; s > n; i = ++n)
                    if (o = r[i], o === t) return void(this.values[i] = e);
                return this.keys.push(t), this.values.push(e)
            }, t
        }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function () {
            function t() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }

            return t.notSupported = !0, t.prototype.observe = function () {
            }, t
        }()), o = this.getComputedStyle || function (t, e) {
            return this.getPropertyValue = function (e) {
                var i;
                return "float" === e && (e = "styleFloat"), n.test(e) && e.replace(n, function (t, e) {
                    return e.toUpperCase()
                }), (null != (i = t.currentStyle) ? i[e] : void 0) || null
            }, this
        }, n = /(\-([a-z]){1})/g, this.WOW = function () {
            function n(t) {
                null == t && (t = {}), this.scrollCallback = s(this.scrollCallback, this), this.scrollHandler = s(this.scrollHandler, this), this.resetAnimation = s(this.resetAnimation, this), this.start = s(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), this.animationNameCache = new i, this.wowEvent = this.util().createEvent(this.config.boxClass)
            }

            return n.prototype.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !0,
                live: !0,
                callback: null
            }, n.prototype.init = function () {
                var t;
                return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
            }, n.prototype.start = function () {
                var e, i, o, n;
                if (this.stopped = !1, this.boxes = function () {
                        var t, i, o, n;
                        for (o = this.element.querySelectorAll("." + this.config.boxClass), n = [], t = 0, i = o.length; i > t; t++) e = o[t], n.push(e);
                        return n
                    }.call(this), this.all = function () {
                        var t, i, o, n;
                        for (o = this.boxes, n = [], t = 0, i = o.length; i > t; t++) e = o[t], n.push(e);
                        return n
                    }.call(this), this.boxes.length)
                    if (this.disabled()) this.resetStyle();
                    else
                        for (n = this.boxes, i = 0, o = n.length; o > i; i++) e = n[i], this.applyStyle(e, !0);
                return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function (t) {
                    return function (e) {
                        var i, o, n, s, r;
                        for (r = [], i = 0, o = e.length; o > i; i++) s = e[i], r.push(function () {
                            var t, e, i, o;
                            for (i = s.addedNodes || [], o = [], t = 0, e = i.length; e > t; t++) n = i[t], o.push(this.doSync(n));
                            return o
                        }.call(t));
                        return r
                    }
                }(this)).observe(document.body, {childList: !0, subtree: !0}) : void 0
            }, n.prototype.stop = function () {
                return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
            }, n.prototype.sync = function (e) {
                return t.notSupported ? this.doSync(this.element) : void 0
            }, n.prototype.doSync = function (t) {
                var e, i, o, n, s;
                if (null == t && (t = this.element), 1 === t.nodeType) {
                    for (t = t.parentNode || t, n = t.querySelectorAll("." + this.config.boxClass), s = [], i = 0, o = n.length; o > i; i++) e = n[i], r.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), s.push(this.scrolled = !0)) : s.push(void 0);
                    return s
                }
            }, n.prototype.show = function (t) {
                return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), this.util().emitEvent(t, this.wowEvent), this.util().addEvent(t, "animationend", this.resetAnimation), this.util().addEvent(t, "oanimationend", this.resetAnimation), this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation), t
            }, n.prototype.applyStyle = function (t, e) {
                var i, o, n;
                return o = t.getAttribute("data-wow-duration"), i = t.getAttribute("data-wow-delay"), n = t.getAttribute("data-wow-iteration"), this.animate(function (s) {
                    return function () {
                        return s.customStyle(t, e, o, i, n)
                    }
                }(this))
            }, n.prototype.animate = function () {
                return "requestAnimationFrame" in window ? function (t) {
                    return window.requestAnimationFrame(t)
                } : function (t) {
                    return t()
                }
            }(), n.prototype.resetStyle = function () {
                var t, e, i, o, n;
                for (o = this.boxes, n = [], e = 0, i = o.length; i > e; e++) t = o[e], n.push(t.style.visibility = "visible");
                return n
            }, n.prototype.resetAnimation = function (t) {
                var e;
                return t.type.toLowerCase().indexOf("animationend") >= 0 ? (e = t.target || t.srcElement, e.className = e.className.replace(this.config.animateClass, "").trim()) : void 0
            }, n.prototype.customStyle = function (t, e, i, o, n) {
                return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {animationDuration: i}), o && this.vendorSet(t.style, {animationDelay: o}), n && this.vendorSet(t.style, {animationIterationCount: n}), this.vendorSet(t.style, {animationName: e ? "none" : this.cachedAnimationName(t)}), t
            }, n.prototype.vendors = ["moz", "webkit"], n.prototype.vendorSet = function (t, e) {
                var i, o, n, s;
                o = [];
                for (i in e) n = e[i], t["" + i] = n, o.push(function () {
                    var e, o, r, a;
                    for (r = this.vendors, a = [], e = 0, o = r.length; o > e; e++) s = r[e], a.push(t["" + s + i.charAt(0).toUpperCase() + i.substr(1)] = n);
                    return a
                }.call(this));
                return o
            }, n.prototype.vendorCSS = function (t, e) {
                var i, n, s, r, a, l;
                for (a = o(t), r = a.getPropertyCSSValue(e), s = this.vendors, i = 0, n = s.length; n > i; i++) l = s[i], r = r || a.getPropertyCSSValue("-" + l + "-" + e);
                return r
            }, n.prototype.animationName = function (t) {
                var e;
                try {
                    e = this.vendorCSS(t, "animation-name").cssText
                } catch (i) {
                    e = o(t).getPropertyValue("animation-name")
                }
                return "none" === e ? "" : e
            }, n.prototype.cacheAnimationName = function (t) {
                return this.animationNameCache.set(t, this.animationName(t))
            }, n.prototype.cachedAnimationName = function (t) {
                return this.animationNameCache.get(t)
            }, n.prototype.scrollHandler = function () {
                return this.scrolled = !0
            }, n.prototype.scrollCallback = function () {
                var t;
                return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                    var e, i, o, n;
                    for (o = this.boxes, n = [], e = 0, i = o.length; i > e; e++) t = o[e], t && (this.isVisible(t) ? this.show(t) : n.push(t));
                    return n
                }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
            }, n.prototype.offsetTop = function (t) {
                for (var e; void 0 === t.offsetTop;) t = t.parentNode;
                for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
                return e
            }, n.prototype.isVisible = function (t) {
                var e, i, o, n, s;
                return i = t.getAttribute("data-wow-offset") || this.config.offset, s = window.pageYOffset, n = s + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, o = this.offsetTop(t), e = o + t.clientHeight, n >= o && e >= s
            }, n.prototype.util = function () {
                return null != this._util ? this._util : this._util = new e
            }, n.prototype.disabled = function () {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent)
            }, n
        }()
    }.call(this), +function (t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in e)
            if (void 0 !== t.style[i]) return {end: e[i]};
        return !1
    }

    t.fn.emulateTransitionEnd = function (e) {
        var i = !1,
            o = this;
        t(this).one("bsTransitionEnd", function () {
            i = !0
        });
        var n = function () {
            i || t(o).trigger(t.support.transition.end)
        };
        return setTimeout(n, e), this
    }, t(function () {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this),
                n = i.data("bs.alert");
            n || i.data("bs.alert", n = new o(this)), "string" == typeof e && n[e].call(i)
        })
    }

    var i = '[data-dismiss="alert"]',
        o = function (e) {
            t(e).on("click", i, this.close)
        };
    o.VERSION = "3.3.5", o.TRANSITION_DURATION = 150, o.prototype.close = function (e) {
        function i() {
            r.detach().trigger("closed.bs.alert").remove()
        }

        var n = t(this),
            s = n.attr("data-target");
        s || (s = n.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var r = t(s);
        e && e.preventDefault(), r.length || (r = n.closest(".alert")), r.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i())
    };
    var n = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = o, t.fn.alert.noConflict = function () {
        return t.fn.alert = n, this
    }, t(document).on("click.bs.alert.data-api", i, o.prototype.close)
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.button"),
                s = "object" == typeof e && e;
            n || o.data("bs.button", n = new i(this, s)), "toggle" == e ? n.toggle() : e && n.setState(e)
        })
    }

    var i = function (e, o) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1
    };
    i.VERSION = "3.3.5", i.DEFAULTS = {loadingText: "loading..."}, i.prototype.setState = function (e) {
        var i = "disabled",
            o = this.$element,
            n = o.is("input") ? "val" : "html",
            s = o.data();
        e += "Text", null == s.resetText && o.data("resetText", o[n]()), setTimeout(t.proxy(function () {
            o[n](null == s[e] ? this.options[e] : s[e]), "loadingText" == e ? (this.isLoading = !0, o.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i))
        }, this), 0)
    }, i.prototype.toggle = function () {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), t && i.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var o = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function () {
        return t.fn.button = o, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (i) {
        var o = t(i.target);
        o.hasClass("btn") || (o = o.closest(".btn")), e.call(o, "toggle"), t(i.target).is('input[type="radio"]') || t(i.target).is('input[type="checkbox"]') || i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.carousel"),
                s = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e),
                r = "string" == typeof e ? e : s.slide;
            n || o.data("bs.carousel", n = new i(this, s)), "number" == typeof e ? n.to(e) : r ? n[r]() : s.interval && n.pause().cycle()
        })
    }

    var i = function (e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.5", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function (e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function (t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function (t, e) {
        var i = this.getItemIndex(e),
            o = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (o && !this.options.wrap) return e;
        var n = "prev" == t ? -1 : 1,
            s = (i + n) % this.$items.length;
        return this.$items.eq(s)
    }, i.prototype.to = function (t) {
        var e = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function (e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function (e, o) {
        var n = this.$element.find(".item.active"),
            s = o || this.getItemForDirection(e, n),
            r = this.interval,
            a = "next" == e ? "left" : "right",
            l = this;
        if (s.hasClass("active")) return this.sliding = !1;
        var d = s[0],
            c = t.Event("slide.bs.carousel", {relatedTarget: d, direction: a});
        if (this.$element.trigger(c), !c.isDefaultPrevented()) {
            if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var u = t(this.$indicators.children()[this.getItemIndex(s)]);
                u && u.addClass("active")
            }
            var p = t.Event("slid.bs.carousel", {relatedTarget: d, direction: a});
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e), s[0].offsetWidth, n.addClass(a), s.addClass(a), n.one("bsTransitionEnd", function () {
                s.removeClass([e, a].join(" ")).addClass("active"), n.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function () {
                    l.$element.trigger(p)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger(p)), r && this.cycle(), this
        }
    };
    var o = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = o, this
    };
    var n = function (i) {
        var o, n = t(this),
            s = t(n.attr("data-target") || (o = n.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var r = t.extend({}, s.data(), n.data()),
                a = n.attr("data-slide-to");
            a && (r.interval = !1), e.call(s, r), a && s.data("bs.carousel").to(a), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n), t(window).on("load", function () {
        t('[data-ride="carousel"]').each(function () {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o)
    }

    function i(e) {
        return this.each(function () {
            var i = t(this),
                n = i.data("bs.collapse"),
                s = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !n && s.toggle && /show|hide/.test(e) && (s.toggle = !1), n || i.data("bs.collapse", n = new o(this, s)), "string" == typeof e && n[e]()
        })
    }

    var o = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    o.VERSION = "3.3.5", o.TRANSITION_DURATION = 350, o.DEFAULTS = {toggle: !0}, o.prototype.dimension = function () {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, o.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (e = n.data("bs.collapse"), e && e.transitioning))) {
                var s = t.Event("show.bs.collapse");
                if (this.$element.trigger(s), !s.isDefaultPrevented()) {
                    n && n.length && (i.call(n, "hide"), e || n.data("bs.collapse", null));
                    var r = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return a.call(this);
                    var l = t.camelCase(["scroll", r].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[r](this.$element[0][l])
                }
            }
        }
    }, o.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var n = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : n.call(this)
            }
        }
    }, o.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, o.prototype.getParent = function () {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (i, o) {
            var n = t(o);
            this.addAriaAndCollapsedClass(e(n), n)
        }, this)).end()
    }, o.prototype.addAriaAndCollapsedClass = function (t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var n = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = n, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (o) {
        var n = t(this);
        n.attr("data-target") || o.preventDefault();
        var s = e(n),
            r = s.data("bs.collapse"),
            a = r ? "toggle" : n.data();
        i.call(s, a)
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent()
    }

    function i(i) {
        i && 3 === i.which || (t(n).remove(), t(s).each(function () {
            var o = t(this),
                n = e(o),
                s = {relatedTarget: this};
            n.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(n[0], i.target) || (n.trigger(i = t.Event("hide.bs.dropdown", s)), i.isDefaultPrevented() || (o.attr("aria-expanded", "false"), n.removeClass("open").trigger("hidden.bs.dropdown", s))))
        }))
    }

    function o(e) {
        return this.each(function () {
            var i = t(this),
                o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new r(this)), "string" == typeof e && o[e].call(i)
        })
    }

    var n = ".dropdown-backdrop",
        s = '[data-toggle="dropdown"]',
        r = function (e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    r.VERSION = "3.3.5", r.prototype.toggle = function (o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = e(n),
                r = s.hasClass("open");
            if (i(), !r) {
                "ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                var a = {relatedTarget: this};
                if (s.trigger(o = t.Event("show.bs.dropdown", a)), o.isDefaultPrevented()) return;
                n.trigger("focus").attr("aria-expanded", "true"), s.toggleClass("open").trigger("shown.bs.dropdown", a)
            }
            return !1
        }
    }, r.prototype.keydown = function (i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var o = t(this);
            if (i.preventDefault(), i.stopPropagation(), !o.is(".disabled, :disabled")) {
                var n = e(o),
                    r = n.hasClass("open");
                if (!r && 27 != i.which || r && 27 == i.which) return 27 == i.which && n.find(s).trigger("focus"), o.trigger("click");
                var a = " li:not(.disabled):visible a",
                    l = n.find(".dropdown-menu" + a);
                if (l.length) {
                    var d = l.index(i.target);
                    38 == i.which && d > 0 && d--, 40 == i.which && d < l.length - 1 && d++, ~d || (d = 0), l.eq(d).trigger("focus")
                }
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = o, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = a, this
    }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", s, r.prototype.toggle).on("keydown.bs.dropdown.data-api", s, r.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", r.prototype.keydown)
}(jQuery), +function (t) {
    "use strict";

    function e(e, o) {
        return this.each(function () {
            var n = t(this),
                s = n.data("bs.modal"),
                r = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            s || n.data("bs.modal", s = new i(this, r)), "string" == typeof e ? s[e](o) : r.show && s.show(o)
        })
    }

    var i = function (e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.5", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function (e) {
        var o = this,
            n = t.Event("show.bs.modal", {relatedTarget: e});
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            o.$element.one("mouseup.dismiss.bs.modal", function (e) {
                t(e.target).is(o.$element) && (o.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var n = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), o.adjustDialog(), n && o.$element[0].offsetWidth, o.$element.addClass("in"), o.enforceFocus();
            var s = t.Event("shown.bs.modal", {relatedTarget: e});
            n ? o.$dialog.one("bsTransitionEnd", function () {
                o.$element.trigger("focus").trigger(s)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(s)
        }))
    }, i.prototype.hide = function (e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function () {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function () {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function (e) {
        var o = this,
            n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && n;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + n).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), s && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var r = function () {
                o.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r();
        } else e && e()
    }, i.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, i.prototype.adjustDialog = function () {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    }, i.prototype.checkScrollbar = function () {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, i.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var o = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function () {
        return t.fn.modal = o, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
        var o = t(this),
            n = o.attr("href"),
            s = t(o.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
            r = s.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(n) && n}, s.data(), o.data());
        o.is("a") && i.preventDefault(), s.one("show.bs.modal", function (t) {
            t.isDefaultPrevented() || s.one("hidden.bs.modal", function () {
                o.is(":visible") && o.trigger("focus")
            })
        }), e.call(s, r, this)
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.tooltip"),
                s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || o.data("bs.tooltip", n = new i(this, s)), "string" == typeof e && n[e]())
        })
    }

    var i = function (t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.5", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, i.prototype.init = function (e, i, o) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var r = n[s];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin",
                    l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function () {
        return i.DEFAULTS
    }, i.prototype.getOptions = function (e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function () {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function (t, o) {
            i[t] != o && (e[t] = o)
        }), e
    }, i.prototype.enter = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, i.prototype.isInStateTrue = function () {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, i.prototype.leave = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), i.isInStateTrue() ? void 0 : (clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function () {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide())
    }, i.prototype.show = function () {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o) return;
            var n = this,
                s = this.tip(),
                r = this.getUID(this.type);
            this.setContent(), s.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && s.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                d = l.test(a);
            d && (a = a.replace(l, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var c = this.getPosition(),
                u = s[0].offsetWidth,
                p = s[0].offsetHeight;
            if (d) {
                var h = a,
                    f = this.getPosition(this.$viewport);
                a = "bottom" == a && c.bottom + p > f.bottom ? "top" : "top" == a && c.top - p < f.top ? "bottom" : "right" == a && c.right + u > f.width ? "left" : "left" == a && c.left - u < f.left ? "right" : a, s.removeClass(h).addClass(a)
            }
            var v = this.getCalculatedOffset(a, c, u, p);
            this.applyPlacement(v, a);
            var g = function () {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n)
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", g).emulateTransitionEnd(i.TRANSITION_DURATION) : g()
        }
    }, i.prototype.applyPlacement = function (e, i) {
        var o = this.tip(),
            n = o[0].offsetWidth,
            s = o[0].offsetHeight,
            r = parseInt(o.css("margin-top"), 10),
            a = parseInt(o.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top += r, e.left += a, t.offset.setOffset(o[0], t.extend({
            using: function (t) {
                o.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth,
            d = o[0].offsetHeight;
        "top" == i && d != s && (e.top = e.top + s - d);
        var c = this.getViewportAdjustedDelta(i, e, l, d);
        c.left ? e.left += c.left : e.top += c.top;
        var u = /top|bottom/.test(i),
            p = u ? 2 * c.left - n + l : 2 * c.top - s + d,
            h = u ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(p, o[0][h], u)
    }, i.prototype.replaceArrow = function (t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, i.prototype.setContent = function () {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function (e) {
        function o() {
            "in" != n.hoverState && s.detach(), n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), e && e()
        }

        var n = this,
            s = t(this.$tip),
            r = t.Event("hide.bs." + this.type);
        return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), this.hoverState = null, this)
    }, i.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function () {
        return this.getTitle()
    }, i.prototype.getPosition = function (e) {
        e = e || this.$element;
        var i = e[0],
            o = "BODY" == i.tagName,
            n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {width: n.right - n.left, height: n.bottom - n.top}));
        var s = o ? {top: 0, left: 0} : e.offset(),
            r = {scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()},
            a = o ? {width: t(window).width(), height: t(window).height()} : null;
        return t.extend({}, n, r, a, s)
    }, i.prototype.getCalculatedOffset = function (t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {top: e.top + e.height / 2 - o / 2, left: e.left - i} : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function (t, e, i, o) {
        var n = {top: 0, left: 0};
        if (!this.$viewport) return n;
        var s = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - s - r.scroll,
                l = e.top + s - r.scroll + o;
            a < r.top ? n.top = r.top - a : l > r.top + r.height && (n.top = r.top + r.height - l)
        } else {
            var d = e.left - s,
                c = e.left + s + i;
            d < r.left ? n.left = r.left - d : c > r.right && (n.left = r.left + r.width - c)
        }
        return n
    }, i.prototype.getTitle = function () {
        var t, e = this.$element,
            i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function (t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function () {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, i.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.enable = function () {
        this.enabled = !0
    }, i.prototype.disable = function () {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function (e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout), this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null
        })
    };
    var o = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = o, this
    }
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.popover"),
                s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || o.data("bs.popover", n = new i(this, s)), "string" == typeof e && n[e]())
        })
    }

    var i = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.5", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function () {
        return i.DEFAULTS
    }, i.prototype.setContent = function () {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, i.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, i.prototype.getContent = function () {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, i.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var o = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function () {
        return t.fn.popover = o, this
    }
}(jQuery), +function (t) {
    "use strict";

    function e(i, o) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.scrollspy"),
                s = "object" == typeof i && i;
            n || o.data("bs.scrollspy", n = new e(this, s)), "string" == typeof i && n[i]()
        })
    }

    e.VERSION = "3.3.5", e.DEFAULTS = {offset: 10}, e.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function () {
        var e = this,
            i = "offset",
            o = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", o = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var e = t(this),
                n = e.data("target") || e.attr("href"),
                s = /^#./.test(n) && t(n);
            return s && s.length && s.is(":visible") && [
                [s[i]().top + o, n]
            ] || null
        }).sort(function (t, e) {
            return t[0] - e[0]
        }).each(function () {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function () {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            o = this.options.offset + i - this.$scrollElement.height(),
            n = this.offsets,
            s = this.targets,
            r = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= o) return r != (t = s[s.length - 1]) && this.activate(t);
        if (r && e < n[0]) return this.activeTarget = null, this.clear();
        for (t = n.length; t--;) r != s[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(s[t])
    }, e.prototype.activate = function (e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function () {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = o, this
    }, t(window).on("load.bs.scrollspy.data-api", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.tab");
            n || o.data("bs.tab", n = new i(this)), "string" == typeof e && n[e]()
        })
    }

    var i = function (e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.5", i.TRANSITION_DURATION = 150, i.prototype.show = function () {
        var e = this.element,
            i = e.closest("ul:not(.dropdown-menu)"),
            o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a"),
                s = t.Event("hide.bs.tab", {relatedTarget: e[0]}),
                r = t.Event("show.bs.tab", {relatedTarget: n[0]});
            if (n.trigger(s), e.trigger(r), !r.isDefaultPrevented() && !s.isDefaultPrevented()) {
                var a = t(o);
                this.activate(e.closest("li"), i), this.activate(a, a.parent(), function () {
                    n.trigger({type: "hidden.bs.tab", relatedTarget: e[0]}), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: n[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function (e, o, n) {
        function s() {
            r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), n && n()
        }

        var r = o.find("> .active"),
            a = n && t.support.transition && (r.length && r.hasClass("fade") || !!o.find("> .fade").length);
        r.length && a ? r.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(), r.removeClass("in")
    };
    var o = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function () {
        return t.fn.tab = o, this
    };
    var n = function (i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n)
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.affix"),
                s = "object" == typeof e && e;
            n || o.data("bs.affix", n = new i(this, s)), "string" == typeof e && n[e]()
        })
    }

    var i = function (e, o) {
        this.options = t.extend({}, i.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.5", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function (t, e, i, o) {
        var n = this.$target.scrollTop(),
            s = this.$element.offset(),
            r = this.$target.height();
        if (null != i && "top" == this.affixed) return i > n ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? n + this.unpin <= s.top ? !1 : "bottom" : t - o >= n + r ? !1 : "bottom";
        var a = null == this.affixed,
            l = a ? n : s.top,
            d = a ? r : e;
        return null != i && i >= n ? "top" : null != o && l + d >= t - o ? "bottom" : !1
    }, i.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function () {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                o = this.options.offset,
                n = o.top,
                s = o.bottom,
                r = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof o && (s = n = o), "function" == typeof n && (n = o.top(this.$element)), "function" == typeof s && (s = o.bottom(this.$element));
            var a = this.getState(r, e, n, s);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""),
                    d = t.Event(l + ".bs.affix");
                if (this.$element.trigger(d), d.isDefaultPrevented()) return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({top: r - e - s})
        }
    };
    var o = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function () {
        return t.fn.affix = o, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var i = t(this),
                o = i.data();
            o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), null != o.offsetTop && (o.offset.top = o.offsetTop), e.call(i, o)
        })
    })
}(jQuery), !function (t, e, i) {
    function o(t, e) {
        return typeof t === e
    }

    function n() {
        var t, e, i, n, s, r, a;
        for (var l in k)
            if (k.hasOwnProperty(l)) {
                if (t = [], e = k[l], e.name && (t.push(e.name.toLowerCase()), e.options && e.options.aliases && e.options.aliases.length))
                    for (i = 0; i < e.options.aliases.length; i++) t.push(e.options.aliases[i].toLowerCase());
                for (n = o(e.fn, "function") ? e.fn() : e.fn, s = 0; s < t.length; s++) r = t[s], a = r.split("."), 1 === a.length ? S[a[0]] = n : (!S[a[0]] || S[a[0]] instanceof Boolean || (S[a[0]] = new Boolean(S[a[0]])), S[a[0]][a[1]] = n), w.push((n ? "" : "no-") + a.join("-"))
            }
    }

    function s(t) {
        var e = b.className,
            i = S._config.classPrefix || "";
        if (x && (e = e.baseVal), S._config.enableJSClass) {
            var o = new RegExp("(^|\\s)" + i + "no-js(\\s|$)");
            e = e.replace(o, "$1" + i + "js$2")
        }
        S._config.enableClasses && (e += " " + i + t.join(" " + i), x ? b.className.baseVal = e : b.className = e)
    }

    function r(t, e) {
        if ("object" == typeof t)
            for (var i in t) $(t, i) && r(i, t[i]);
        else {
            t = t.toLowerCase();
            var o = t.split("."),
                n = S[o[0]];
            if (2 == o.length && (n = n[o[1]]), "undefined" != typeof n) return S;
            e = "function" == typeof e ? e() : e, 1 == o.length ? S[o[0]] = e : (!S[o[0]] || S[o[0]] instanceof Boolean || (S[o[0]] = new Boolean(S[o[0]])), S[o[0]][o[1]] = e), s([(e && 0 != e ? "" : "no-") + o.join("-")]), S._trigger(t, e)
        }
        return S
    }

    function a(t) {
        return t.replace(/([a-z])-([a-z])/g, function (t, e, i) {
            return e + i.toUpperCase()
        }).replace(/^-/, "")
    }

    function l() {
        return "function" != typeof e.createElement ? e.createElement(arguments[0]) : x ? e.createElementNS.call(e, "http://www.w3.org/2000/svg", arguments[0]) : e.createElement.apply(e, arguments)
    }

    function d(t) {
        return t.replace(/([A-Z])/g, function (t, e) {
            return "-" + e.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }

    function c(t, e) {
        return !!~("" + t).indexOf(e)
    }

    function u(t, e) {
        return function () {
            return t.apply(e, arguments)
        }
    }

    function p(t, e, i) {
        var n;
        for (var s in t)
            if (t[s] in e) return i === !1 ? t[s] : (n = e[t[s]], o(n, "function") ? u(n, i || e) : n);
        return !1
    }

    function h() {
        var t = e.body;
        return t || (t = l(x ? "svg" : "body"), t.fake = !0), t
    }

    function f(t, i, o, n) {
        var s, r, a, d, c = "modernizr",
            u = l("div"),
            p = h();
        if (parseInt(o, 10))
            for (; o--;) a = l("div"), a.id = n ? n[o] : c + (o + 1), u.appendChild(a);
        return s = l("style"), s.type = "text/css", s.id = "s" + c, (p.fake ? p : u).appendChild(s), p.appendChild(u), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(e.createTextNode(t)), u.id = c, p.fake && (p.style.background = "", p.style.overflow = "hidden", d = b.style.overflow, b.style.overflow = "hidden", b.appendChild(p)), r = i(u, t), p.fake ? (p.parentNode.removeChild(p), b.style.overflow = d, b.offsetHeight) : u.parentNode.removeChild(u), !!r
    }

    function v(e, o) {
        var n = e.length;
        if ("CSS" in t && "supports" in t.CSS) {
            for (; n--;)
                if (t.CSS.supports(d(e[n]), o)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in t) {
            for (var s = []; n--;) s.push("(" + d(e[n]) + ":" + o + ")");
            return s = s.join(" or "), f("@supports (" + s + ") { #modernizr { position: absolute; } }", function (t) {
                return "absolute" == getComputedStyle(t, null).position
            })
        }
        return i
    }

    function g(t, e, n, s) {
        function r() {
            u && (delete N.style, delete N.modElem)
        }

        if (s = o(s, "undefined") ? !1 : s, !o(n, "undefined")) {
            var d = v(t, n);
            if (!o(d, "undefined")) return d
        }
        for (var u, p, h, f, g, m = ["modernizr", "tspan"]; !N.style;) u = !0, N.modElem = l(m.shift()), N.style = N.modElem.style;
        for (h = t.length, p = 0; h > p; p++)
            if (f = t[p], g = N.style[f], c(f, "-") && (f = a(f)), N.style[f] !== i) {
                if (s || o(n, "undefined")) return r(), "pfx" == e ? f : !0;
                try {
                    N.style[f] = n
                } catch (y) {
                }
                if (N.style[f] != g) return r(), "pfx" == e ? f : !0
            }
        return r(), !1
    }

    function m(t, e, i, n, s) {
        var r = t.charAt(0).toUpperCase() + t.slice(1),
            a = (t + " " + P.join(r + " ") + r).split(" ");
        return o(e, "string") || o(e, "undefined") ? g(a, e, n, s) : (a = (t + " " + A.join(r + " ") + r).split(" "), p(a, e, i))
    }

    function y(t, e, o) {
        return m(t, i, i, e, o)
    }

    var w = [],
        b = e.documentElement,
        k = [],
        T = {
            _version: "3.2.0",
            _config: {classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0},
            _q: [],
            on: function (t, e) {
                var i = this;
                setTimeout(function () {
                    e(i[t])
                }, 0)
            },
            addTest: function (t, e, i) {
                k.push({name: t, fn: e, options: i})
            },
            addAsyncTest: function (t) {
                k.push({name: null, fn: t})
            }
        },
        S = function () {
        };
    S.prototype = T, S = new S;
    var C = T._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];
    T._prefixes = C;
    var $, x = "svg" === b.nodeName.toLowerCase();
    !function () {
        var t = {}.hasOwnProperty;
        $ = o(t, "undefined") || o(t.call, "undefined") ? function (t, e) {
            return e in t && o(t.constructor.prototype[e], "undefined")
        } : function (e, i) {
            return t.call(e, i)
        }
    }(), T._l = {}, T.on = function (t, e) {
        this._l[t] || (this._l[t] = []), this._l[t].push(e), S.hasOwnProperty(t) && setTimeout(function () {
            S._trigger(t, S[t])
        }, 0)
    }, T._trigger = function (t, e) {
        if (this._l[t]) {
            var i = this._l[t];
            setTimeout(function () {
                var t, o;
                for (t = 0; t < i.length; t++) (o = i[t])(e)
            }, 0), delete this._l[t]
        }
    }, S._q.push(function () {
        T.addTest = r
    });
    var E = "Moz O ms Webkit",
        A = T._config.usePrefixes ? E.toLowerCase().split(" ") : [];
    T._domPrefixes = A;
    var O = function (t, e) {
        var i = !1,
            o = l("div"),
            n = o.style;
        if (t in n) {
            var s = A.length;
            for (n[t] = e, i = n[t]; s-- && !i;) n[t] = "-" + A[s] + "-" + e, i = n[t]
        }
        return "" === i && (i = !1), i
    };
    T.prefixedCSSValue = O;
    var P = T._config.usePrefixes ? E.split(" ") : [];
    T._cssomPrefixes = P;
    var D = function (e) {
        var o, n = C.length,
            s = t.CSSRule;
        if ("undefined" == typeof s) return i;
        if (!e) return !1;
        if (e = e.replace(/^@/, ""), o = e.replace(/-/g, "_").toUpperCase() + "_RULE", o in s) return "@" + e;
        for (var r = 0; n > r; r++) {
            var a = C[r],
                l = a.toUpperCase() + "_" + o;
            if (l in s) return "@-" + a.toLowerCase() + "-" + e
        }
        return !1
    };
    T.atRule = D;
    var I = T.testStyles = f;
    S.addTest("touchevents", function () {
        var i;
        if ("ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch) i = !0;
        else {
            var o = ["@media (", C.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            I(o, function (t) {
                i = 9 === t.offsetTop
            })
        }
        return i
    });
    var H = {elem: l("modernizr")};
    S._q.push(function () {
        delete H.elem
    });
    var N = {style: H.elem.style};
    S._q.unshift(function () {
        delete N.style
    }), T.testAllProps = m;
    var M = T.prefixed = function (t, e, i) {
        return 0 === t.indexOf("@") ? D(t) : (-1 != t.indexOf("-") && (t = a(t)), e ? m(t, e, i) : m(t, "pfx"))
    };
    T.prefixedCSS = function (t) {
        var e = M(t);
        return e && d(e)
    }, T.testAllProps = y, S.addTest("csstransitions", y("transition", "all", !0)), n(), s(w), delete T.addTest, delete T.addAsyncTest;
    for (var L = 0; L < S._q.length; L++) S._q[L]();
    t.Modernizr = S
}(window, document),
    function (t) {
        var e = {
                common: {
                    init: function () {
                        Modernizr.addTest("firefox", function () {
                            return !!navigator.userAgent.match(/firefox/i)
                        }), (-1 !== navigator.userAgent.indexOf("MSIE") || navigator.appVersion.indexOf("Trident/") > 0) && t("html").addClass("msie"), t.fn.exists = function (t) {
                            var e = [].slice.call(arguments, 1);
                            return this.length && t.call(this, e), this
                        }, t(function () {
                            FastClick.attach(document.body)
                        }), t(".site-container").animsition({
                            inClass: "fade-in",
                            outClass: "fade-out",
                            inDuration: 1e3,
                            outDuration: 800,
                            linkElement: ".july-link",
                            loading: !0,
                            loadingParentElement: "body",
                            loadingClass: "july-loading",
                            loadingInner: "<div></div><div></div><div></div>"
                        }), t("#navigation-overlay nav ul li").fitText(1.2, {
                            minFontSize: "15px",
                            maxFontSize: "120px"
                        }), t(".frontpage-slider h2").fitText(1.2, {minFontSize: "30px", maxFontSize: "70px"});
                        var e = function () {
                            var t = document.querySelectorAll("video.hero-video-lazyload source");
                            if (!Modernizr.touchevents && t.length) {
                                for (var e = 0; e < t.length; e++) t[e].setAttribute("src", t[e].getAttribute("data-src"));
                                for (var i = document.querySelectorAll("video.hero-video-lazyload"), o = 0; o < i.length; o++) i[o].load()
                            }
                        };
                        e(),
                            function () {
                                function e() {
                                    if (classie.has(o, "navigation-open")) {
                                        classie.remove(o, "navigation-open"), classie.remove(o, "stop-scroll"), classie.add(o, "navigation-close"), classie.remove(n, "navigation-overlay-open"), t(".top-image-veil").exists(function () {
                                            t(".toggle-button").attr("style", toggle_background)
                                        }), t("body").unbind("mousewheel touchmove", s);
                                        var e = function (t) {
                                            if (support.transitions) {
                                                if ("visibility" !== t.propertyName) return;
                                                this.removeEventListener(transEndEventName, e)
                                            }
                                            classie.remove(o, "navigation-close")
                                        };
                                        support.transitions ? o.addEventListener(transEndEventName, e) : e()
                                    } else classie.has(o, "navigation-close") || (classie.add(o, "navigation-open"), classie.add(o, "stop-scroll"), classie.add(n, "navigation-overlay-open"), t(".toggle-button").attr("style", "background-color: #fff"), t("body").bind("mousewheel touchmove", s))
                                }

                                var i = document.getElementById("trigger-overlay"),
                                    o = document.querySelector("body"),
                                    n = document.getElementById("navigation-overlay");
                                t.Event("keydown", {keyCode: 27});
                                transEndEventNames = {
                                    WebkitTransition: "webkitTransitionEnd",
                                    MozTransition: "transitionend",
                                    OTransition: "oTransitionEnd",
                                    msTransition: "MSTransitionEnd",
                                    transition: "transitionend"
                                }, transEndEventName = transEndEventNames[Modernizr.prefixed("transition")], support = {transitions: Modernizr.csstransitions};
                                var s = function (t) {
                                    t.preventDefault(), t.stopPropagation()
                                };
                                t(".top-image-veil").exists(function () {
                                    toggle_background = t(".top-image-veil")[0].style.cssText
                                }), i.addEventListener("click", function () {
                                    e()
                                }), document.addEventListener("keydown", function (t) {
                                    var i = t.keyCode || t.which;
                                    27 === i && classie.has(o, "navigation-open") && e()
                                })
                            }();
                        var i = (t(".case-inner, .page-inner").waypoint(function (e) {
                                case_background = t(".top-image-veil")[0].style.cssText, "down" === e ? (t(".toggle-button").attr("style", case_background), t(".logo a").attr("style", case_background), t(".site-header").addClass("white")) : (t(".toggle-button").attr("style", ""), t(".logo a").attr("style", ""), t(".site-header").removeClass("white"))
                            }, {offset: 40}), t(".site-header").outerHeight(), document.querySelector(".site-header")),
                            o = new Headroom(i, {
                                offset: 200,
                                tolerance: 4,
                                classes: {initial: "animated", pinned: "nav-slide-down", unpinned: "nav-slide-up"}
                            });
                        Modernizr.touchevents || o.init()
                    }, finalize: function () {
                    }
                }, home: {
                    init: function () {
                        function e() {
                            current_background = t("#frontpage-slider .slide.active-slide .slide-veil")[0].style.cssText, t("#navigation-overlay").attr("style", current_background).find("ul li .active").attr("style", current_background), t("body").attr("style", current_background)
                        }

                        function i() {
                            setTimeout(function () {
                                t(s).hasClass("navigation-open") ? t(s).hasClass("navigation-open") && o.unbindScroll() : o.rebindScroll()
                            }, 500)
                        }

                        setTimeout(function () {
                            t("body").removeClass("initial-loading")
                        }, 2e3);
                        var o = t.fn.fsvs({
                                speed: Modernizr.touchevents ? 600 : 900,
                                bodyID: "frontpage-slider",
                                selector: ".slide",
                                mouseSwipeDisance: 40,
                                afterSlide: function () {
                                    e()
                                },
                                mouseWheelEvents: !0,
                                mouseDragEvents: !0,
                                touchEvents: !0,
                                arrowKeyEvents: !0,
                                pagination: !0,
                                nthClasses: !1,
                                detectHash: !1
                            }),
                            n = document.getElementById("trigger-overlay"),
                            s = document.body;
                        n.addEventListener("click", i), current_background = t("#frontpage-slider .slide.active-slide .slide-veil")[0].style.cssText, t("#navigation-overlay nav ul li:first-child").mouseenter(function () {
                            t("#trigger-overlay .toggle-button").attr("style", current_background)
                        }).mouseleave(function () {
                            t("#trigger-overlay .toggle-button").attr("style", "")
                        })
                    }, finalize: function () {
                    }
                }, single: {
                    init: function () {
                        current_svg = t(".top-image-veil")[0].style.cssText, t("#navigation-overlay nav ul li:first-child").mouseenter(function () {
                            t("#trigger-overlay .toggle-button").attr("style", current_svg)
                        }).mouseleave(function () {
                            t("#trigger-overlay .toggle-button").attr("style", "")
                        }), t("#navigation-overlay").attr("style", current_svg).find("ul li .active").attr("style", current_svg), t(function () {
                            t(".case-text a, .case-intro p a, .get-in-touch a").each(function () {
                                t(this).attr("style", current_svg)
                            })
                        })
                    }
                }, single_cases: {
                    init: function () {
                        t(".case-slideshow .slideshow").slick({
                            slide: ".case-slide",
                            speed: 500,
                            arrows: !1,
                            lazyLoad: "ondemand",
                            centerMode: !0,
                            centerPadding: "150px",
                            slidesToShow: 3,
                            responsive: [{
                                breakpoint: 1600,
                                settings: {
                                    slide: ".case-slide",
                                    speed: 500,
                                    arrows: !1,
                                    centerMode: !0,
                                    centerPadding: "300px",
                                    slidesToShow: 1
                                }
                            }, {
                                breakpoint: 1023,
                                settings: {
                                    slide: ".case-slide",
                                    speed: 500,
                                    arrows: !1,
                                    centerMode: !0,
                                    centerPadding: "200px",
                                    slidesToShow: 1
                                }
                            }, {
                                breakpoint: 768,
                                settings: {
                                    slide: ".case-slide",
                                    speed: 500,
                                    arrows: !1,
                                    centerMode: !0,
                                    centerPadding: "100px",
                                    slidesToShow: 1
                                }
                            }, {
                                breakpoint: 480,
                                settings: {
                                    slide: ".case-slide",
                                    speed: 500,
                                    arrows: !1,
                                    centerMode: !0,
                                    centerPadding: "50px",
                                    slidesToShow: 1
                                }
                            }]
                        });
                        var e = new WOW({
                            boxClass: "superstar",
                            animateClass: "enter-stage",
                            offset: 0,
                            mobile: !1,
                            live: !0
                        });
                        e.init()
                    }
                }, page: {
                    init: function () {
                        t("#navigation-overlay nav ul li:first-child").mouseenter(function () {
                            t("#trigger-overlay .toggle-button").attr("style", "background-color: #a7b3c3")
                        }).mouseleave(function () {
                            t("#trigger-overlay .toggle-button").attr("style", "")
                        });
                        var e = new WOW({
                            boxClass: "superstar",
                            animateClass: "enter-stage",
                            offset: 0,
                            mobile: !1,
                            live: !0
                        });
                        e.init()
                    }
                }, archive: {
                    init: function () {
                        if (first_svg = t(".archive-cases .case-item:first-of-type .case-image-veil")[0].style.cssText, t("#navigation-overlay nav ul li:first-child").mouseenter(function () {
                                t("#trigger-overlay .toggle-button").attr("style", first_svg)
                            }).mouseleave(function () {
                                t("#trigger-overlay .toggle-button").attr("style", "")
                            }), t("#navigation-overlay").attr("style", first_svg).find("ul li .active").attr("style", first_svg), !Modernizr.touchevents) {
                            var e, i = document.body,
                                o = document.createElement("div");
                            o.setAttribute("class", "disable-hover"), window.addEventListener("scroll", function () {
                                clearTimeout(e), i.appendChild(o), e = setTimeout(function () {
                                    i.removeChild(o)
                                }, 250)
                            }, !1)
                        }
                        t(".footer-logo").click(function () {
                            return t("body,html").animate({scrollTop: 0}, 700), !1
                        })
                    }
                }
            },
            i = {
                fire: function (t, i, o) {
                    var n, s = e;
                    i = void 0 === i ? "init" : i, n = "" !== t, n = n && s[t], n = n && "function" == typeof s[t][i], n && s[t][i](o)
                }, loadEvents: function () {
                    i.fire("common"), t.each(document.body.className.replace(/-/g, "_").split(/\s+/), function (t, e) {
                        i.fire(e), i.fire(e, "finalize")
                    }), i.fire("common", "finalize")
                }
            };
        t(document).ready(i.loadEvents);
    }(jQuery),
    function (t) {
        t.fn.fsvs = function (e) {
            e = e || {};
            var i = {
                el: null,
                speed: 5e3,
                autoPlay: !1,
                bodyID: "fsvs-body",
                mouseSwipeDisance: 40,
                afterSlide: function () {
                },
                beforeSlide: function () {
                },
                endSlide: function () {
                },
                mouseWheelEvents: !0,
                mouseWheelDelay: !1,
                scrollableArea: "scrollable",
                mouseDragEvents: !0,
                touchEvents: !0,
                arrowKeyEvents: !0,
                pagination: !0,
                nthClasses: !1,
                detectHash: !0,
                slideClass: "slide",
                selector: "> ." + this.slideClass
            };
            for (var o in e) i[o] = e[o];
            e = i;
            var n = null,
                s = 0,
                r = !1,
                a = null,
                l = null,
                d = !1,
                c = 0,
                u = !1,
                p = null,
                h = "active-slide",
                f = function () {
                    var t = window.chrome,
                        e = window.navigator.vendor;
                    return null !== t && "Google Inc." === e ? !0 : !1
                },
                v = function () {
                    if (!r && "" !== window.location.hash) {
                        var e = window.location.hash,
                            i = t("> " + e, l);
                        N.slideToIndex(i.index())
                    }
                    r = !1
                },
                g = function () {
                    t(e.selector, l).each(function (e) {
                        var i = t(this);
                        i.attr("id") || i.attr("id", "slide-" + (e + 1))
                    }), v()
                },
                m = function () {
                    prefixes = ["Webkit", "Moz", "ms", "O"];
                    for (var t in prefixes)
                        if ("undefined" != typeof document.getElementsByTagName("body")[0].style[prefixes[t] + "Transition"]) return !0;
                    return !1
                },
                y = function () {
                    var t;
                    window.onmousedown = function (e) {
                        t = e.y
                    }, window.onmouseup = function (i) {
                        i.y > t + e.mouseSwipeDisance ? N.slideUp() : i.y < t - e.mouseSwipeDisance && N.slideDown()
                    }
                },
                w = function () {
                    window.onmousedown = function () {
                    }, window.onmouseup = function () {
                    }
                },
                b = function () {
                    var i = null;
                    t(window).on("touchstart.fsvs", function (e) {
                        var o = e.originalEvent,
                            n = ["a", "input", "textarea", "select"],
                            s = o.target.nodeName.toLowerCase(),
                            r = !1;
                        if (n.forEach(function (e) {
                                0 !== t(o.target).parents(e).length && (r = !0)
                            }), -1 == t.inArray(s, n) && !r) {
                            var a = o.touches;
                            a && a.length && (i = a[0].pageY), o.preventDefault()
                        }
                    }), t(window).on("touchmove.fsvs", function (t) {
                        var o = t.originalEvent;
                        if (null !== i) {
                            var n = o.touches;
                            if (n && n.length) {
                                var s = i - n[0].pageY;
                                s >= e.mouseSwipeDisance && (N.slideDown(), i = null), s <= -1 * e.mouseSwipeDisance && (N.slideUp(), i = null)
                            }
                            o.preventDefault()
                        }
                    })
                },
                k = function () {
                    t(window).unbind("touchstart.fsvs"), t(window).unbind("touchmove.fsvs")
                },
                T = function (i) {
                    var o = window.event || i,
                        n = 0;
                    "mousewheel" == o.type ? n = -1 * o.originalEvent.wheelDelta : "DOMMouseScroll" == o.type && (n = 40 * o.originalEvent.detail), n = o.wheelDelta || -o.detail || n;
                    Math.max(-1, Math.min(1, n));
                    if (f() && (n = Math.floor(n / 5)), (!d || e.mouseWheelDelay && Date.now() > c + e.mouseWheelDelay) && Math.abs(n) > 5) {
                        c = Date.now(), d = !0;
                        var s = !0,
                            r = t(i.target);
                        if (r.hasClass(e.scrollableArea) || 0 !== r.parents("." + e.scrollableArea).length) {
                            s = !1;
                            var a = r.closest("." + e.scrollableArea);
                            r.hasClass(e.scrollableArea) && (a = r), S(i) && 0 === a.scrollTop() ? s = !0 : a[0].scrollHeight - a.scrollTop() === a.outerHeight() && (s = !0)
                        }
                        s ? S(i) ? N.slideUp() : N.slideDown() : d = !1
                    }
                },
                S = function (t) {
                    var e = window.event || t,
                        i = e.wheelDelta || -e.detail || e.originalEvent.detail,
                        o = Math.max(-1, Math.min(1, i));
                    if (f() && (i = Math.floor(i / 5)), e.originalEvent && e.originalEvent.detail) {
                        if (o > 0) return !1
                    } else if (0 > o) return !1;
                    return !0
                },
                C = function () {
                    t(window).bind("wheel.fsvs mousewheel.fsvs DOMMouseScroll.fsvs MozMousePixelScroll.fsvs", T)
                },
                $ = function () {
                    t(window).unbind("wheel.fsvs mousewheel.fsvs DOMMouseScroll.fsvs MozMousePixelScroll.fsvs", T)
                },
                x = function () {
                    allow = !0, t("input,textarea,select,option", l).bind("focus.fsvs", function () {
                        allow = !1
                    }).bind("blur.fsvs", function () {
                        allow = !0
                    }), window.onkeydown = function (t) {
                        t = t || window.event, "38" == t.keyCode && allow ? N.slideUp() : "40" == t.keyCode && allow && N.slideDown()
                    }
                },
                E = function () {
                    t("input,textarea,select,option", l).unbind("focus.fsvs blur.fsvs"), window.onkeydown = function () {
                    }
                },
                A = function (i) {
                    if (s = i, e.afterSlide(i), e.detectHash) {
                        var o = t(e.selector, l).eq(i);
                        window.location.hash = o[0].id
                    }
                    N.canSlideDown() || e.endSlide(i), e.autoPlay && null === n && I(), d = !1
                },
                O = function (i) {
                    t(e.selector, l).each(function (e) {
                        var o = "nth-class-" + (e % i + 1);
                        t(this).hasClass(o) || t(this).addClass(o)
                    })
                },
                P = function (i) {
                    e.beforeSlide(i), l.is(":animated") && (s = i, l.stop()), l.animate({top: "-" + i * t(window).height() + "px"}, e.speed, function () {
                        A(i)
                    })
                },
                D = function (t) {
                    e.beforeSlide(t), l.css({
                        "-webkit-transform": "translate3d(0, -" + 100 * t + "%, 0)",
                        "-moz-transform": "translate3d(0, -" + 100 * t + "%, 0)",
                        "-ms-transform": "translate3d(0, -" + 100 * t + "%, 0)",
                        transform: "translate3d(0, -" + 100 * t + "%, 0)"
                    }), null !== a && (s = t, clearTimeout(a)), a = setTimeout(function () {
                        A(t), a = null
                    }, e.speed)
                },
                I = function () {
                    n = setInterval(function () {
                        N.canSlideDown() ? N.slideDown() : N.slideToIndex(0)
                    }, e.autoPlay)
                },
                H = function () {
                    l.attr("style", ""), t(e.selector, l).each(function (e) {
                        t(this).removeClass(h)
                    }), t("body").removeClass(h + "-" + p), t("#fsvs-pagination").remove()
                },
                N = {
                    nthClasses: O, addPagination: function () {
                        u = t('<ul id="fsvs-pagination"></ul>'), t(e.selector, l).each(function (e) {
                            var i = s === e ? "pagination-link active" : "pagination-link";
                            t('<li class="' + i + '"><span><span></span></span></li>').appendTo(u)
                        }), 0 !== t("#fsvs-pagination").length && t("#fsvs-pagination").remove(), u.appendTo(t("body"));
                        var i = u.height(),
                            o = e.speed / 1e3;
                        t("span", u).css({
                            "-webkit-transition": "all " + o + "s",
                            "-moz-transition": "all " + o + "s",
                            "-o-transition": "all " + o + "s",
                            transition: "all " + o + "s"
                        }), u.css({
                            marginTop: "-" + i / 2 + "px",
                            right: "25px"
                        }), t("li", u).bind("click.fsvs", function (e) {
                            r = !0, t(".active", u).removeClass("active"), t(this).addClass("active"), N.slideToIndex(t(this).index(), e)
                        })
                    }, setSpeed: function (t) {
                        speed = t / 1e3, l.css({
                            "-webkit-transition": "all " + speed + "s",
                            "-moz-transition": "all " + speed + "s",
                            "-o-transition": "all " + speed + "s",
                            transition: "all " + speed + "s"
                        })
                    }, shouldRun: function () {
                        return t("html").hasClass("fsvs")
                    }, canSlideUp: function () {
                        return 0 === s ? !1 : !0
                    }, canSlideDown: function () {
                        return 0 === t(e.selector, l).eq(s + 1).length ? !1 : !0
                    }, addClasses: function (i, o) {
                        var n = t("body");
                        p = o + 1, n.removeClass(removeClass = h + "-" + (i + 1)), n.addClass(h + "-" + p), t(e.selector, l).eq(i).removeClass(h), t(e.selector, l).eq(o).addClass(h), e.nthClasses && (n.removeClass("active-nth-slide-" + (i % e.nthClasses + 1)), n.addClass("active-nth-slide-" + (o % e.nthClasses + 1)))
                    }, slideToIndex: function (i, o) {
                        var o = o || !1;
                        o && e.autoPlay && (clearInterval(n), n = null), !o && u && (t(".active", u).removeClass("active"), t("> *", u).eq(i).addClass("active")), N.addClasses(s, i), m() ? D(i) : P(i)
                    }, unbind: function () {
                        w(), $(), E(), k(), H(), t("html").removeClass("fsvs")
                    }, rebind: function () {
                        t("html").addClass("fsvs"), N.init()
                    }, unbindScroll: function () {
                        w(), $(), E(), k()
                    }, rebindScroll: function () {
                        y(), C(), x(), b()
                    }, slideDown: function (t) {
                        N.canSlideDown() ? (r = !0, N.slideToIndex(s + 1, t)) : d = !1
                    }, slideUp: function (t) {
                        N.canSlideUp() ? (r = !0, N.slideToIndex(s - 1, t)) : d = !1
                    }, init: function () {
                        l = t(e.el ? e.el : "#" + e.bodyID), m() && N.setSpeed(e.speed), e.pagination && N.addPagination(), e.nthClasses && O(e.nthClasses), e.mouseWheelEvents && C(), e.arrowKeyEvents && x(), e.mouseDragEvents && y(), e.touchEvents && b(), e.detectHash && (g(), window.addEventListener ? window.addEventListener("hashchange", v, !1) : window.attachEvent && window.attachEvent("onhashchange", v)), "" === window.location.hash && N.addClasses(0, 0), e.autoPlay && e.autoPlay > e.speed && I()
                    }
                };
            return N.shouldRun() && N.init(), N
        }
    }(jQuery);
//# sourceMappingURL=main.js.map