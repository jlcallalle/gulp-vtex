console.log('global.js')
//$(document).ajaxStop(function(){
//  console.log('entro');
//  var url, content, preg;
//    $(".resultItemsWrapper script").each(function(){
//        content   =   $(this)[0].innerHTML;
//        newContent    =   content.replace(/&PS=12&sl=1daabf0d-5f18-47a2-8b3f-709dc17dc522&cc=3&sm=0*/, "&PS=12&sl=1daabf0d-5f18-47a2-8b3f-709dc17dc522&cc=3&sm=0&O=OrderByPriceDESC");
//        preg=/\/buscapagina\?.+&PageNumber=/i;
//        if($('body').hasClass('resultado-busca') && content.search(/\/buscapagina\?/i)>-1){
//          //console.log(newContent);
//            url=preg.exec(newContent);
//            return false;
//        }             
//    });
//});
/* Hover */
! function(e) {
    e.fn.hoverIntent = function(t, n, o) {
        var r = {
            interval: 100,
            sensitivity: 6,
            timeout: 0
        };
        r = "object" == typeof t ? e.extend(r, t) : e.isFunction(n) ? e.extend(r, {
            over: t,
            out: n,
            selector: o
        }) : e.extend(r, {
            over: t,
            out: t,
            selector: n
        });
        var v, i, u, s, h = function(e) {
                v = e.pageX, i = e.pageY
            },
            I = function(t, n) {
                return n.hoverIntent_t = clearTimeout(n.hoverIntent_t), Math.sqrt((u - v) * (u - v) + (s - i) * (s - i)) < r.sensitivity ? (e(n).off("mousemove.hoverIntent", h), n.hoverIntent_s = !0, r.over.apply(n, [t])) : (u = v, s = i, n.hoverIntent_t = setTimeout(function() {
                    I(t, n)
                }, r.interval), void 0)
            },
            a = function(e, t) {
                return t.hoverIntent_t = clearTimeout(t.hoverIntent_t), t.hoverIntent_s = !1, r.out.apply(t, [e])
            },
            c = function(t) {
                var n = e.extend({}, t),
                    o = this;
                o.hoverIntent_t && (o.hoverIntent_t = clearTimeout(o.hoverIntent_t)), "mouseenter" === t.type ? (u = n.pageX, s = n.pageY, e(o).on("mousemove.hoverIntent", h), o.hoverIntent_s || (o.hoverIntent_t = setTimeout(function() {
                    I(n, o)
                }, r.interval))) : (e(o).off("mousemove.hoverIntent", h), o.hoverIntent_s && (o.hoverIntent_t = setTimeout(function() {
                    a(n, o)
                }, r.timeout)))
            };
        return this.on({
            "mouseenter.hoverIntent": c,
            "mouseleave.hoverIntent": c
        }, r.selector)
    }
}(jQuery);


/* Minicart */
! function(t) {
    t.miniCart = function(e, o) {
        var i = this;
        i.settings = {};
        var n = function() {
            var e = '<div id="popup" class="aviso"><i class="fa fa-check-circle" aria-hidden="true"></i><p class="vcenter">¡Producto agregado al carrito!</p><div class="btn close popup_close res-mobile">Seguir comprando</div><a class="btn checkout" href="/checkout">Ir a mi carrito</a></div>';
            t("body").prepend(e), i.setCart(),
                t(document).on("click", ".pre-cart .eliminar", i.removeCartItem),
                t(document).on("click", ".buy-button-ref", i.addCartItem),
                t(document).on("click", ".buy", i.addCartItem)
        };
        i.setCart = function() {
            var e = t(".pre-cart"),
                o = e.find("tbody"),
                n = t(".btn.carrito");
            vtexjs.checkout.getOrderForm().done(function(s) {
                var p = s,
                    d = p.items,
                    r = p.value;
                d.length > 0 ? (e.find(".wrap-scroll").show(), e.find(".resumen").show(), e.find(".empty-cart").hide(), e.removeClass("empty"), o.empty(), t.each(d, function(t, e) {
                    var n = e;
                    o.append(i.setCartItem(n, t)), t + 1 < d.length && o.append('<tr class="linea"><td colspan="4"><p></p></td></tr>')
                })) : (e.find(".wrap-scroll").hide(), e.find(".resumen").hide(), e.find(".empty-cart").show(), e.addClass("empty")), n.find(".num p").text(d.length).parent().fadeIn(250), n.find(".precio .value").text(a(r / 100, ".", ".", 2)).parent().slideDown(250), e.find(".total .numero").text(a(r / 100, ".", ".", 2, !0))
            })
        }, i.setCartItem = function(t, e) {
            var o = t.id,
                i = t.name,
                n = t.additionalInfo.brandName,
                s = t.imageUrl,
                p = t.quantity,
                d = t.price,
                r = a(d / 100, ".", ".", 2, !0),
                l = '<tr class="item item-desktop"><td data-id="' + o + '"><div class="item"><img src="' + s + '" class="img"/><div class="info"><h3>' + i + "</h3><p>" + n + '</p></div></div></td><td><p class="cantidad">' + p + '</p></td><td><p class="precio"> ' + r + ' </p></td><td><p class="icono eliminar" data-index="' + e + '"> X </p></td></tr>';
            return l
        }, i.addCartItem = function(e) {
            e.preventDefault();
            var o, n, a, s, p;
            if (a = new RegExp(/sku=.+?&/g),
                s = a.test(t(".buy-button-ref").attr("href"))) n = t(".buy-button-ref").attr("href").match(/sku=.+?&/g).toString().replace(/\D/g, ""),
                p = t(".buy-button-ref").attr("href").match(/seller=.+?&/g).toString().replace(/\D/g, ""),
                q = t(".buy-button-ref").attr("href").match(/qty=.+?&/g).toString().replace(/\D/g, ""),
                o = {
                    id: n,
                    quantity: q,
                    seller: p,
                }, console.log(q), vtexjs.checkout.addToCart([o]).done(function(e) {
                    i.setCart(), t("#popup").popup({
                        autoopen: !0
                    })
                });
            else {
                if (a = new RegExp(/sku=.+?&/g), s = a.test(t(this).parents(".row").find(".buy-button-normal a").attr("href"))) n = t(this).parents(".row").find(".buy-button-normal a").attr("href").match(/sku=.+?&/g).toString().replace(/\D/g, ""), p = t(this).parents(".row").find(".buy-button-normal a").attr("href").match(/seller=.+?&/g).toString().replace(/\D/g, ""), o = {
                    id: n,
                    quantity: 1,
                    seller: p
                }, vtexjs.checkout.addToCart([o]).done(function(e) {
                    i.setCart(), t("#popup").popup({
                        autoopen: !0
                    })
                });
            }
        }, i.removeCartItem = function() {
            var e = t(this),
                o = e.data("index"),
                n = e.parents(".item");
            n.addClass("removing"), vtexjs.checkout.getOrderForm().then(function(t) {
                var e = t.items[o];
                return e.index = o, vtexjs.checkout.removeItems([e])
            }).done(i.setCart)
        };
        var a = function(t, e, o, i, n) {
            n = n === !0 && this.currency ? this.currency : "string" == typeof n ? n : "", i = "number" != typeof i ? 2 : i;
            var a = "\\d(?=(\\d{3})+" + (i > 0 ? "\\D" : "$") + ")",
                t = (1 * t).toFixed(Math.max(0, ~~i));
            return n + t.replace(".", o || ",").replace(new RegExp(a, "g"), "$&" + (e || "."))
        };
        n()
    }
}(jQuery), ! function(t) {
    var e, o, i = t(window),
        n = {},
        a = [],
        s = [],
        p = null,
        d = "_open",
        r = "_close",
        l = [],
        c = null,
        u = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
        f = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",
        h = {
            _init: function(e) {
                var o = t(e),
                    i = o.data("popupoptions");
                s[e.id] = !1, a[e.id] = 0, o.data("popup-initialized") || (o.attr("data-popup-initialized", "true"), h._initonce(e)), i.autoopen && setTimeout(function() {
                    h.show(e, 0)
                }, 0)
            },
            _initonce: function(o) {
                var i, n, a = t(o),
                    s = t("body"),
                    r = a.data("popupoptions");
                if (p = parseInt(s.css("margin-right"), 10), c = void 0 !== document.body.style.webkitTransition || void 0 !== document.body.style.MozTransition || void 0 !== document.body.style.msTransition || void 0 !== document.body.style.OTransition || void 0 !== document.body.style.transition, "tooltip" == r.type && (r.background = !1, r.scrolllock = !1), r.backgroundactive && (r.background = !1, r.blur = !1, r.scrolllock = !1), r.scrolllock) {
                    var l, f;
                    "undefined" == typeof e && (l = t('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), f = l.children(), e = f.innerWidth() - f.height(99).innerWidth(), l.remove())
                }
                if (a.attr("id") || a.attr("id", "j-popup-" + parseInt(1e8 * Math.random(), 10)), a.addClass("popup_content"), s.prepend(o), a.wrap('<div id="' + o.id + '_wrapper" class="popup_wrapper" />'), i = t("#" + o.id + "_wrapper"), i.css({
                        opacity: 0,
                        visibility: "hidden",
                        position: "absolute"
                    }), u && i.css("cursor", "pointer"), "overlay" == r.type && i.css("overflow", "auto"), a.css({
                        opacity: 0,
                        visibility: "hidden",
                        display: "inline-block"
                    }), r.setzindex && !r.autozindex && i.css("z-index", "100001"), r.outline || a.css("outline", "none"), r.transition && (a.css("transition", r.transition), i.css("transition", r.transition)), a.attr("aria-hidden", !0), r.background && !t("#" + o.id + "_background").length) {
                    s.prepend('<div id="' + o.id + '_background" class="popup_background"></div>');
                    var v = t("#" + o.id + "_background");
                    v.css({
                        opacity: 0,
                        visibility: "hidden",
                        backgroundColor: r.color,
                        position: "fixed",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }), r.setzindex && !r.autozindex && v.css("z-index", "100000"), r.transition && v.css("transition", r.transition)
                }
                "overlay" == r.type && (a.css({
                    textAlign: "left",
                    position: "relative",
                    verticalAlign: "middle"
                }), n = {
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    textAlign: "center"
                }, r.backgroundactive && (n.position = "relative", n.height = "0", n.overflow = "visible"), i.css(n), i.append('<div class="popup_align" />'), t(".popup_align").css({
                    display: "inline-block",
                    verticalAlign: "middle",
                    height: "100%"
                })), a.attr("role", "dialog");
                var m = r.openelement ? r.openelement : "." + o.id + d;
                t(m).each(function(e, o) {
                    t(o).attr("data-popup-ordinal", e), o.id || t(o).attr("id", "open_" + parseInt(1e8 * Math.random(), 10))
                }), a.attr("aria-labelledby") || a.attr("aria-label") || a.attr("aria-labelledby", t(m).attr("id")), "hover" == r.action ? (r.keepfocus = !1, t(m).on("mouseenter", function(e) {
                    h.show(o, t(this).data("popup-ordinal"))
                }), t(m).on("mouseleave", function(t) {
                    h.hide(o)
                })) : t(document).on("click", m, function(e) {
                    e.preventDefault();
                    var i = t(this).data("popup-ordinal");
                    setTimeout(function() {
                        h.show(o, i)
                    }, 0)
                }), r.closebutton && h.addclosebutton(o), r.detach ? a.hide().detach() : i.hide()
            },
            show: function(n, d) {
                var u = t(n);
                if (!u.data("popup-visible")) {
                    u.data("popup-initialized") || h._init(n), u.attr("data-popup-initialized", "true");
                    var f = t("body"),
                        m = u.data("popupoptions"),
                        b = t("#" + n.id + "_wrapper"),
                        g = t("#" + n.id + "_background");
                    if (v(n, d, m.beforeopen), s[n.id] = d, setTimeout(function() {
                            l.push(n.id)
                        }, 0), m.autozindex) {
                        for (var y = document.getElementsByTagName("*"), k = y.length, _ = 0, w = 0; k > w; w++) {
                            var x = t(y[w]).css("z-index");
                            "auto" !== x && (x = parseInt(x, 10), x > _ && (_ = x))
                        }
                        a[n.id] = _, m.background && a[n.id] > 0 && t("#" + n.id + "_background").css({
                            zIndex: a[n.id] + 1
                        }), a[n.id] > 0 && b.css({
                            zIndex: a[n.id] + 2
                        })
                    }
                    m.detach ? (b.prepend(n), u.show()) : b.show(), o = setTimeout(function() {
                        g.fadeIn(50),
                            b.fadeIn(),
                            t("html").addClass("popup_visible").addClass("popup_visible_" + n.id).fadeIn(),
                            b.addClass("popup_wrapper_visible").css({
                                visibility: "visible",
                                opacity: 1
                            })
                    }, 20), m.scrolllock && (f.css("overflow", "hidden"), f.height() > i.height() && f.css("margin-right", p + e)), m.backgroundactive && u.css({
                        top: (i.height() - (u.get(0).offsetHeight + parseInt(u.css("margin-top"), 10) + parseInt(u.css("margin-bottom"), 10))) / 2 + "px"
                    }), u.css({
                        visibility: "visible",
                        opacity: 1
                    }), m.background && (g.css({
                        visibility: "visible",
                        opacity: m.opacity
                    }), setTimeout(function() {
                        g.css({
                            opacity: m.opacity
                        })
                    }, 0)), u.data("popup-visible", !0), h.reposition(n, d), u.data("focusedelementbeforepopup", document.activeElement), m.keepfocus && (u.attr("tabindex", -1), setTimeout(function() {
                        "closebutton" === m.focuselement ? t("#" + n.id + " ." + n.id + r + ":first").focus() : m.focuselement ? t(m.focuselement).focus() : u.focus()
                    }, m.focusdelay)), t(m.pagecontainer).attr("aria-hidden", !0), u.attr("aria-hidden", !1), v(n, d, m.onopen), c ? b.one("transitionend", function() {
                        v(n, d, m.opentransitionend)
                    }) : v(n, d, m.opentransitionend)
                }
            },
            hide: function(e, i) {
                var n = t.inArray(e.id, l);
                if (-1 !== n) {
                    o && clearTimeout(o);
                    var a = t("body"),
                        d = t(e),
                        r = d.data("popupoptions"),
                        u = t("#" + e.id + "_wrapper"),
                        f = t("#" + e.id + "_background");
                    d.data("popup-visible", !1), 1 === l.length ? t("html").removeClass("popup_visible").removeClass("popup_visible_" + e.id) : t("html").hasClass("popup_visible_" + e.id) && t("html").removeClass("popup_visible_" + e.id), l.splice(n, 1), u.hasClass("popup_wrapper_visible") && u.removeClass("popup_wrapper_visible"), r.keepfocus && !i && setTimeout(function() {
                        t(d.data("focusedelementbeforepopup")).is(":visible") && d.data("focusedelementbeforepopup").focus()
                    }, 0), u.fadeOut(), d.css({
                        visibility: "hidden",
                        opacity: 0
                    }), r.background && f.fadeOut(), t(r.pagecontainer).attr("aria-hidden", !1), d.attr("aria-hidden", !0), v(e, s[e.id], r.onclose), c && "0s" !== d.css("transition-duration") ? d.one("transitionend", function(t) {
                        d.data("popup-visible") || (r.detach ? d.hide().detach() : u.hide()), r.scrolllock && setTimeout(function() {
                            a.css({
                                overflow: "visible",
                                "margin-right": p
                            })
                        }, 10), v(e, s[e.id], r.closetransitionend)
                    }) : (r.detach ? d.hide().detach() : u.hide(), r.scrolllock && setTimeout(function() {
                        a.css({
                            overflow: "visible",
                            "margin-right": p
                        })
                    }, 10), v(e, s[e.id], r.closetransitionend))
                }
            },
            toggle: function(e, o) {
                t(e).data("popup-visible") ? h.hide(e) : setTimeout(function() {
                    h.show(e, o)
                }, 0)
            },
            reposition: function(e, o) {
                var n = t(e),
                    a = n.data("popupoptions"),
                    s = t("#" + e.id + "_wrapper");
                if (t("#" + e.id + "_background"), o = o || 0, "tooltip" == a.type) {
                    s.css({
                        position: "absolute"
                    });
                    var p;
                    p = a.tooltipanchor ? t(a.tooltipanchor) : a.openelement ? t(a.openelement).filter('[data-popup-ordinal="' + o + '"]') : t("." + e.id + d + '[data-popup-ordinal="' + o + '"]');
                    var r = p.offset();
                    "right" == a.horizontal ? s.css("left", r.left + p.outerWidth() + a.offsetleft) : "leftedge" == a.horizontal ? s.css("left", r.left + p.outerWidth() - p.outerWidth() + a.offsetleft) : "left" == a.horizontal ? s.css("right", i.width() - r.left - a.offsetleft) : "rightedge" == a.horizontal ? s.css("right", i.width() - r.left - p.outerWidth() - a.offsetleft) : s.css("left", r.left + p.outerWidth() / 2 - n.outerWidth() / 2 - parseFloat(n.css("marginLeft")) + a.offsetleft), "bottom" == a.vertical ? s.css("top", r.top + p.outerHeight() + a.offsettop) : "bottomedge" == a.vertical ? s.css("top", r.top + p.outerHeight() - n.outerHeight() + a.offsettop) : "top" == a.vertical ? s.css("bottom", i.height() - r.top - a.offsettop) : "topedge" == a.vertical ? s.css("bottom", i.height() - r.top - n.outerHeight() - a.offsettop) : s.css("top", r.top + p.outerHeight() / 2 - n.outerHeight() / 2 - parseFloat(n.css("marginTop")) + a.offsettop)
                } else "overlay" == a.type && (a.horizontal ? s.css("text-align", a.horizontal) : s.css("text-align", "center"), a.vertical ? n.css("vertical-align", a.vertical) : n.css("vertical-align", "middle"))
            },
            addclosebutton: function(e) {
                var o;
                o = t(e).data("popupoptions").closebuttonmarkup ? t(n.closebuttonmarkup).addClass(e.id + "_close") : '<button class="popup_close ' + e.id + '_close" title="Close" aria-label="Close"><span aria-hidden="true">Ãƒâ€”</span></button>', $el.data("popup-initialized") && $el.append(o)
            }
        },
        v = function(e, o, i) {
            var n = t(e).data("popupoptions"),
                a = n.openelement ? n.openelement : "." + e.id + d,
                s = t(a + '[data-popup-ordinal="' + o + '"]');
            "function" == typeof i && i.call(t(e), e, s)
        };
    t(document).on("keydown", function(e) {
            if (l.length) {
                var o = l[l.length - 1],
                    i = document.getElementById(o);
                t(i).data("popupoptions").escape && 27 == e.keyCode && h.hide(i)
            }
        }), t(document).on("click", function(e) {
            if (l.length) {
                var o = l[l.length - 1],
                    i = document.getElementById(o),
                    n = t(i).data("popupoptions").closeelement ? t(i).data("popupoptions").closeelement : "." + i.id + r;
                t(e.target).closest(n).length && (e.preventDefault(), h.hide(i)), t(i).data("popupoptions").blur && !t(e.target).closest("#" + o).length && 2 !== e.which && t(e.target).is(":visible") && (t(i).data("popupoptions").background ? (h.hide(i), e.preventDefault()) : h.hide(i, !0))
            }
        }), t(document).on("keydown", function(e) {
            if (l.length && 9 == e.which) {
                var o = l[l.length - 1],
                    i = document.getElementById(o),
                    n = t(i).find("*"),
                    a = n.filter(f).filter(":visible"),
                    s = t(":focus"),
                    p = a.length,
                    d = a.index(s);
                0 === p ? (t(i).focus(), e.preventDefault()) : e.shiftKey ? 0 === d && (a.get(p - 1).focus(), e.preventDefault()) : d == p - 1 && (a.get(0).focus(), e.preventDefault())
            }
        }), t.fn.popup = function(e) {
            return this.each(function() {
                var o = t(this);
                if ("object" == typeof e) {
                    var i = t.extend({}, t.fn.popup.defaults, e, o.data("popupoptions"));
                    o.data("popupoptions", i), n = o.data("popupoptions"), h._init(this)
                } else "string" == typeof e ? (o.data("popupoptions") || (o.data("popupoptions", t.fn.popup.defaults), n = o.data("popupoptions")), h[e].call(this, this)) : (o.data("popupoptions") || (o.data("popupoptions", t.fn.popup.defaults), n = o.data("popupoptions")), h._init(this))
            })
        }, t.fn.popup.defaults = {
            type: "overlay",
            autoopen: !1,
            background: !0,
            backgroundactive: !1,
            color: "#ffffff",
            opacity: "0.8",
            horizontal: "center",
            vertical: "middle",
            offsettop: 0,
            offsetleft: 0,
            escape: !0,
            blur: !0,
            setzindex: !0,
            autozindex: !1,
            scrolllock: !1,
            closebutton: !1,
            closebuttonmarkup: null,
            keepfocus: !0,
            focuselement: null,
            focusdelay: 50,
            outline: !1,
            pagecontainer: null,
            detach: !1,
            openelement: null,
            closeelement: null,
            transition: null,
            tooltipanchor: null,
            beforeopen: null,
            onclose: null,
            onopen: null,
            opentransitionend: null,
            closetransitionend: null
        },
        $('.btn.carrito').on('click', function() {
            $(this).next().fadeIn();
        }),
        $('.pre-cart').on('mouseleave', function() {
            $(this).fadeOut();
        })
}(jQuery);

/****** FUNCIONES GLOBALES MEDIALAB ******/
function discount() {
    $.each($('.itemProduct ul li').not('.itemProduct ul li.helperComplement'), function(e, element) {
        if (!$(this).find('.dscto').length) {
            var antes = $(element).find('.precio .antes').text().substring(3);
            var ahora = $(element).find('.precio .ahora').text().substring(3);
            var nAntes = antes.split(',').join('');
            var nAhora = ahora.split(',').join('');
            if (nAntes !== '') {
                var numDescuento = (1 - (Number(nAhora) / Number(nAntes))) * 100;
                if (numDescuento % 1 != 0)
                    numDescuento = numDescuento.toFixed(0);

                $(element).find('.contentFlag').append('<p class="flag dscto">' + numDescuento + '% <span class="desc-word">dscto </span></p>');
            }
        }
    });
};
//----END FUNCIONES GLOBALES MEDIALAB

/****** SmartResearch ******/
function form_filter_url() {
    var a = new Object,
        b = "";
    return $(".search-multiple-navigator fieldset label input:checked").each(function(b, c) {
        var d = $(this).parentsUntil("fieldset").parent().attr("class").match("filtro_(.*)");
        d = d.length > 1 ? d[1] : null, null != d && (void 0 == a[d] && (a[d] = new Array), a[d].push($(this).val()))
    }), $.each(a, function(a, c) {
        b += a + "=";
        var d = "";
        $.each(c, function(a, b) {
            d += b + ";"
        }), b += d.substr(0, d.length - 1) + "|"
    }), "" != b ? b.substr(0, b.length - 1) : ""
}
"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function() {
    var b = {
        "\u00e7": "c",
        "\u00e6": "ae",
        "\u0153": "oe",
        "\u00e1": "a",
        "\u00e9": "e",
        "\u00ed": "i",
        "\u00f3": "o",
        "\u00fa": "u",
        "\u00e0": "a",
        "\u00e8": "e",
        "\u00ec": "i",
        "\u00f2": "o",
        "\u00f9": "u",
        "\u00e4": "a",
        "\u00eb": "e",
        "\u00ef": "i",
        "\u00f6": "o",
        "\u00fc": "u",
        "\u00ff": "y",
        "\u00e2": "a",
        "\u00ea": "e",
        "\u00ee": "i",
        "\u00f4": "o",
        "\u00fb": "u",
        "\u00e5": "a",
        "\u00e3": "a",
        "\u00f8": "o",
        "\u00f5": "o",
        u: "u",
        "\u00c1": "A",
        "\u00c9": "E",
        "\u00cd": "I",
        "\u00d3": "O",
        "\u00da": "U",
        "\u00ca": "E",
        "\u00d4": "O",
        "\u00dc": "U",
        "\u00c3": "A",
        "\u00d5": "O",
        "\u00c0": "A",
        "\u00c7": "C"
    };
    return this.replace(/[\u00e0-\u00fa]/g, function(a) {
        return "undefined" != typeof b[a] ? b[a] : a
    })
});
"function" !== typeof String.prototype.trim && (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
});
jQuery.fn.vtexSmartResearch = function(opts) {
    var $this = jQuery(this);

    var log = function(msg, type) {
        if (typeof console == "object")
            console.log("[Smart Research - " + (type || "Erro") + "] " + msg);
    };

    var defaults = {
        pageLimit: null, // Número máximo de páginas que o script irá retornar. Exemplo "pageLimit=3" só será retornado resultados até a terceira página
        loadContent: ".itemProduct[id^=ResultItems]", // Elemento que esta em volta da(s) prateleira(s) de produtos.
        shelfClass: ".itemProduct", // Pratelira de produtos (filha do elemento definido de um "loadContent")
        filtersMenu: ".search-multiple-navigator", // Menu com os filtros
        linksMenu: ".search-single-navigator", // Menu de links
        menuDepartament: ".navigation .menu-departamento", // seletor do menu da página de departamentos
        mergeMenu: true, // Define se o menu de links será mesclado com o de filtros será mesclado na página de departamento
        insertMenuAfter: ".search-multiple-navigator h3:first", // O menu de links será inserido após este elemento
        emptySearchElem: jQuery('<div class="vtexsr-emptySearch"></div>'), // Elemento Html (em Objeto jQuery) no qual será adicionado a mensagem de busca vazia
        elemLoading: '<div id="scrollLoading">Cargando ... </div>', // Elemento com mensagem de carregando ao iniciar a requisição da página seguinte
        returnTopText: false, // Mensagem de "retornar ao topo"
        emptySearchMsg: '<h3>No se encontraron productos para esta combinacion de filtros, por favor intente nuevamente.</h3>', // Html com a mensagem para ser apresentada quando não existirem resultados para os filtros selecionados
        filterErrorMsg: "¡Ha habido un error al intentar filtrar la página!", // Mensagem de erro exibida quando existe algum erro de servidor ao aplicar os filtros
        searchUrl: null, // Url da página de busca (opicional)
        usePopup: false, // Opção p/ definir se deseja que a mensagem de não localizado seja exibida em um popup
        showLinks: true, // Exibe o menu de links caso o de filtro não seja encontrado
        popupAutoCloseSeconds: 3, // Caso esteja utilizando popup, defina aqui o tempo para que ele feche automaticamente
        // Função que retorna o valor p/ onde a página deve rolar quando o usuário marca ou desmarca um filtro
        filterScrollTop: function(shelfOffset) {
            //return (shelfOffset.top-20);
        },
        callback: function() {
            callbackSearch("callback");
        },
        // Cálculo do tamanho do conteúdo/vitrine para que uma nova página seja chamada antes do usuário chegar ao "final" do site
        getShelfHeight: function(container) {
            return (container.scrollTop() + container.height());
        },
        // Callback após inserir a prateleira na página
        shelfCallback: function() {
            callbackSearch("shelfCallback");
        },
        // Callback em cada requisição Ajax (Para requisições feitas com sucesso)
        // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
        ajaxCallback: function() {
            callbackSearch("ajaxCallback");
            discount();
        },
        // Função que é executada quando a seleção de filtros não retorna nenhum resultado
        // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
        emptySearchCallback: function() {
            callbackSearch("emptySearchCallback");
        },
        // Função para permitir ou não que a rolagem infinita execute na página esta deve retornar "true" ou "false"
        // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
        authorizeScroll: function() {
            return true;
        },
        // Função para permitir ou não que o conteúdo de "loadContent" seja atualizado. Esta deve retornar "true" ou "false"
        // Recebe como parâmetro um objeto contendo a quantidade total de requisições feitas e a quantidade de filtros selecionados
        authorizeUpdate: function() {
            return true;
        },
        // Callback de cada laço percorrendo os fildsets e os labels. Retorna um objeto com algumas informações
        labelCallback: function(data) {
            callbackSearch("labelCallback");
        }
    };

    var options = jQuery.extend(defaults, opts),
        _console = "object" === typeof(console),
        $empty = jQuery(""),
        elemLoading = jQuery(options.elemLoading),
        currentPage = 2,
        moreResults = true,
        _window = jQuery(window),
        _document = jQuery(document),
        _html = jQuery("html,body"),
        body = jQuery("body"),
        currentSearchUrl = "",
        urlFilters = "",
        searchUrl = "",
        animatingFilter = false,
        loadContentE = jQuery(options.loadContent),
        filtersMenuE = jQuery(options.filtersMenu),
        ajaxCallbackObj = {
            requests: 0,
            filters: 0,
            isEmpty: false
        },
        labelCallbackData = {};

    if (document.location.href.indexOf('O=') > -1) {
        urlFilters = "";
    } else {
        urlFilters = "&O=OrderByPriceDESC";
    }

    var fn = {
        getUrl: function(scroll) {
            var s = scroll || false;
            if (s) {
                return currentSearchUrl.replace(/PageNumber=[0-9]*/, "PageNumber=" + currentPage);
            } else {
                return (searchUrl + urlFilters).replace(/PageNumber=[0-9]*/, "PageNumber=" + pageNumber);
            }

        },
        getSearchUrl: function() {
            var url, content, preg;
            jQuery("script:not([src])").each(function() {
                content = jQuery(this)[0].innerHTML;
                newContent = content.replace(/&PS=12&sl=1daabf0d-5f18-47a2-8b3f-709dc17dc522&cc=3&sm=0*/, "&PS=12&sl=1daabf0d-5f18-47a2-8b3f-709dc17dc522&cc=3&sm=0&O=OrderByPriceDESC");
                preg = /\/buscapagina\?.+&PageNumber=/i;
                if (body.hasClass('resultado-busca') && content.search(/\/buscapagina\?/i) > -1) {
                    //console.log(newContent);
                    url = preg.exec(newContent);
                    return false;
                }
                if (content.search(/\/buscapagina\?/i) > -1) {
                    url = preg.exec(content);
                    return false;
                }
            });

            if (typeof(url) !== "undefined" && typeof(url[0]) !== "undefined") {
                return url[0];
            } else {
                log("No se pudo encontrar la url de búsqueda de la página. \ N Intenta agregar el .js al final de la página. \n[Método: getSearchUrl]");
                return "";
            }
        },
        scrollToTop: function() {
            var elem = body.find("#returnToTop");

            if (elem.length < 1) {
                elem = jQuery('<div id="returnToTop"><a href="#">' + options.returnTopText + '<span class="arrowToTop"></span></a></div>');
                body.append(elem);
            }

            var windowH = _window.height();
            _window.bind("resize", function() {
                windowH = _window.height();
            });
            _window.bind("scroll", function() {
                if (_window.scrollTop() > (windowH))
                    elem.stop(true).fadeTo(300, 1, function() {
                        elem.show();
                    });
                else
                    elem.stop(true).fadeTo(300, 0, function() {
                        elem.hide();
                    });
            });
            elem.bind("click", function() {
                _html.animate({
                    scrollTop: 0
                }, "slow");
                return false;
            });
        },
        infinitScroll: function() {
            var elementPages, pages, currentStatus, tmp;

            elementPages = body.find(".pager:first").attr("id");
            tmp = (elementPages || "").split("_").pop();
            pages = (null !== options.pageLimit) ? options.pageLimit : window["pagecount_" + tmp];
            currentStatus = true;

            // Reportando erros
            // if("undefined"===typeof pages) log("Não foi possível localizar quantidade de páginas.\n Tente adicionar o .js ao final da página. \n[Método: infinitScroll]");

            if ("undefined" === typeof pages)
                pages = 99999999;

            _window.bind('scroll', function() {
                var _this = jQuery(this);
                if (!animatingFilter && currentPage <= pages && moreResults && options.authorizeScroll(ajaxCallbackObj)) {
                    if ((_this.scrollTop() + _this.height()) >= (options.getShelfHeight(loadContentE)) && currentStatus) {
                        var currentItems = loadContentE.find(options.shelfClass).filter(":last");
                        currentItems.after(elemLoading);
                        currentStatus = false;
                        pageJqxhr = jQuery.ajax({
                            url: fn.getUrl(true),
                            success: function(data) {
                                if (data.trim().length < 1) {
                                    moreResults = false;
                                    log("No hay más resultados de la página: " + (currentPage - 1), "Aviso");
                                } else
                                    currentItems.after(data);
                                currentStatus = true;
                                elemLoading.remove();
                                ajaxCallbackObj.requests++;
                                options.ajaxCallback(ajaxCallbackObj);
                            }
                        });
                        currentPage++;
                    }
                } else
                    return false;
            });
        }
    };

    if (null !== options.searchUrl) {
        currentSearchUrl = searchUrl = options.searchUrl;
    } else {
        currentSearchUrl = searchUrl = fn.getSearchUrl();
    }

    // Reporting Errors
    if ($this.length < 1) {
        log("Ninguna opción de filtro encontrado", "Aviso");
        if (options.showLinks) jQuery(options.linksMenu).css("visibility", "visible").show();
        fn.infinitScroll();
        fn.scrollToTop();
        return $this;
    }

    // Reporting Errors
    if (loadContentE.length < 1) {
        log("Elemento para destino de la solicitud no se encontró \n (" + loadContentE.selector + ")");
        return false;
    }
    if (filtersMenuE.length < 1) log("No se encontró el menú de filtros \n (" + filtersMenuE.selector + ")");

    var currentUrl = document.location.href,
        linksMenuE = jQuery(options.linksMenu),
        prodOverlay = jQuery('<div class="vtexSr-overlay"></div>'),
        departamentE = jQuery(options.menuDepartament),
        loadContentOffset = loadContentE.offset(),
        pageNumber = 1,
        shelfJqxhr = null,
        pageJqxhr = null;

    options.emptySearchElem.append(options.emptySearchMsg);
    loadContentE.before(prodOverlay);

    var fns = {
        exec: function() {
            fns.setFilterMenu();
            fns.fieldsetFormat();
            $this.each(function() {
                var _this = jQuery(this),
                    label = _this.parent();

                if (_this.is(":checked")) {
                    urlFilters += "&" + (_this.attr("rel") || "");
                    // Adicionando classe ao label
                    label.addClass("sr_selected");
                }

                fns.adjustText(_this);
                // Add span vazio (depois de executar de "adjustText")
                label.append('<span class="sr_box"></span><span class="sr_box2"></span>');

                _this.bind("change", function() {
                    fns.inputAction();
                    if (_this.is(":checked"))
                        fns.addFilter(_this);
                    else
                        fns.removeFilter(_this);
                    ajaxCallbackObj.filters = $this.filter(":checked").length;
                });
            });

            if ("" !== urlFilters)
                fns.addFilter($empty);
        },
        mergeMenu: function() {
            if (!options.mergeMenu) return false;

            var elem = departamentE;
            elem.insertAfter(options.insertMenuAfter);
            fns.departamentMenuFormat(elem);
        },
        mergeMenuList: function() {
            var i = 0;
            filtersMenuE.find("h3,h4").each(function() {
                var ul = linksMenuE.find("h3,h4").eq(i).next("ul");
                ul.insertAfter(jQuery(this));
                fns.departamentMenuFormat(ul);
                i++;
            });
        },
        departamentMenuFormat: function(elem) {
            elem.find("a").each(function() {
                var a = jQuery(this);
                a.text(fns.removeCounter(a.text()));
            });
        },
        fieldsetFormat: function() {
            labelCallbackData.fieldsetCount = 0;
            labelCallbackData.tmpCurrentLabel = {};

            filtersMenuE.find("fieldset").each(function() {
                var $t = jQuery(this),
                    label = $t.find("label"),
                    fieldsetClass = "filtro_" + ($t.find("h5:first").text() || "").toLowerCase().replaceSpecialChars().replace(/\s/g, "-");

                labelCallbackData[fieldsetClass] = {};

                // Ocultar fieldset quando não existe filtro e sair desste método
                if (label.length < 1) {
                    $t.hide();
                    return;
                }

                // Adicionar classe ao fieldset
                $t.addClass(fieldsetClass);

                // Adicionando classe e título ao label
                label.each(function(ndx) {
                    var t = jQuery(this),
                        v = (t.find("input").val() || ""),
                        labelClass = "sr_" + v.toLowerCase().replaceSpecialChars().replace(/\s/g, "-");

                    labelCallbackData.tmpCurrentLabel = {
                        fieldsetParent: [$t, fieldsetClass],
                        elem: t
                    };

                    labelCallbackData[fieldsetClass][ndx.toString()] = {
                        className: labelClass,
                        title: v
                    };

                    t.addClass(labelClass).attr({
                        "title": v,
                        "index": ndx
                    });

                    options.labelCallback(labelCallbackData);
                });

                labelCallbackData.fieldsetCount++;
            });
        },
        inputAction: function() {
            if (null !== pageJqxhr) pageJqxhr.abort();
            if (null !== shelfJqxhr) shelfJqxhr.abort();
            currentPage = 2;
            moreResults = true;
        },
        addFilter: function(input) {
            urlFilters += "&" + (input.attr("rel") || "");
            prodOverlay.fadeTo(300, 0.6);
            currentSearchUrl = fn.getUrl();
            shelfJqxhr = jQuery.ajax({
                url: currentSearchUrl,
                success: fns.filterAjaxSuccess,
                error: fns.filterAjaxError
            });
            // Adicionando classe ao label
            input.parent().addClass("sr_selected");
        },
        removeFilter: function(input) {
            var url = (input.attr("rel") || "");
            prodOverlay.fadeTo(300, 0.6);
            if (url !== "")
                urlFilters = urlFilters.replace("&" + url, "");

            currentSearchUrl = fn.getUrl();
            shelfJqxhr = jQuery.ajax({
                url: currentSearchUrl,
                success: fns.filterAjaxSuccess,
                error: fns.filterAjaxError
            });
            // Removendo classe do label
            input.parent().removeClass("sr_selected");
        },
        filterAjaxSuccess: function(data) {
            callbackSearch("filterAjaxSuccess");
            var $data = jQuery(data);
            prodOverlay.fadeTo(300, 0, function() {
                jQuery(this).hide();
            });
            fns.updateContent($data);
            ajaxCallbackObj.requests++;
            options.ajaxCallback(ajaxCallbackObj);
            _html.animate({
                scrollTop: options.filterScrollTop((loadContentOffset || {
                    top: 0,
                    left: 0
                }))
            }, 300);

        },
        filterAjaxError: function() {
            callbackSearch("filterAjaxError");
            prodOverlay.fadeTo(300, 0, function() {
                jQuery(this).hide();
            });
            //alert(options.filterErrorMsg);
            log("Hubo un error al intentar hacer la petición de la página con filtros.");
        },
        updateContent: function($data) {
            console.log("actualizando datos");
            callbackSearch("updateContent");
            animatingFilter = true;
            if (!options.authorizeUpdate(ajaxCallbackObj)) return false;

            var shelf = $data.filter(options.shelfClass);
            //shelf = fns.formatContent(shelf); 
            var shelfPage = loadContentE.find(options.shelfClass);

            (shelfPage.length > 0 ? shelfPage : options.emptySearchElem).fadeOut(300, function() {
                jQuery(this).remove();

                // Removendo a mensagem de busca vazia, esta remoção "forçada" foi feita para
                // corrigir um bug encontrado ao clicar em vários filtros
                if (options.usePopup)
                    body.find(".boxPopUp2").vtexPopUp2();
                else
                    options.emptySearchElem.remove();

                if (shelf.length > 0) {
                    shelf.hide();
                    loadContentE.append(shelf);
                    options.shelfCallback();
                    shelf.fadeIn(300, function() {
                        animatingFilter = false;
                    });
                    ajaxCallbackObj.isEmpty = false;
                } else {
                    ajaxCallbackObj.isEmpty = true;

                    if (options.usePopup)
                        options.emptySearchElem.addClass("freeContent autoClose ac_" + options.popupAutoCloseSeconds).vtexPopUp2().stop(true).show();
                    else {
                        loadContentE.append(options.emptySearchElem);
                        options.emptySearchElem.show().css("height", "auto").fadeTo(300, 0.2, function() {
                            options.emptySearchElem.fadeTo(300, 1);
                        });
                    }
                    options.emptySearchCallback(ajaxCallbackObj);
                }
                discount();
            });

        },
        adjustText: function(input) {
            var label = input.parent(),
                text = label.text();
            qtt = "";

            text = fns.removeCounter(text);

            label.text(text).prepend(input);
        },
        removeCounter: function(text) {
            return text.replace(/\([0-9]+\)/ig, function(a) {
                qtt = a.replace(/\(|\)/, "");
                return "";
            });
        },
        setFilterMenu: function() {
            if (filtersMenuE.length > 0) {
                linksMenuE.hide();
                filtersMenuE.show();
            }
        },
        formatContent: function(content) {
            console.log(content[0]);
            var contenido = $.parseHTML(content[0]);

            $.each(contenido.find('.itemProduct ul li').not('.itemProduct ul li.helperComplement'), function(e, element) {
                if (!$(this).find('.flag-dscto').length) {
                    var antes = $(element).find('.precio .antes').text().substring(3);
                    var ahora = $(element).find('.precio .ahora').text().substring(3);
                    var nAntes = antes.split(',').join('');
                    var nAhora = ahora.split(',').join('');
                    if (nAntes !== '') {
                        var numDescuento = (1 - (Number(nAhora) / Number(nAntes))) * 100;
                        if (numDescuento % 1 != 0)
                            numDescuento = numDescuento.toFixed(0);

                        $(element).find('.contentFlag').append('<p class="flag dscto">' + numDescuento + '% <span class="desc-word">dscto </span></p>');
                    }
                }
            });

            return content;

        }
    };

    if (body.hasClass("departamento"))
        fns.mergeMenu();
    else if (body.hasClass("categoria") || body.hasClass("resultado-busca"))
        fns.mergeMenuList();

    fns.exec();
    fn.infinitScroll();
    fn.scrollToTop();
    options.callback();

    // Exibindo o menu
    filtersMenuE.css("visibility", "visible");
};
/****** INICIALIZANDO FUNCIONES ******/
$(function() {
    if ($('body').hasClass('departamento') || $('body').hasClass('categoria') || $('body').hasClass('resultado-busca')) {
        $(".search-multiple-navigator input[type='checkbox']").vtexSmartResearch();

        //llamar a funciones globales
        discount();
    }

    window.history.replaceState({
        pushed: !0
    }, null, window.location.href);
    var e = window.location.search.split("filtro=");
    "object" == typeof(e = e.length > 1 ? decodeURIComponent(e[1]).split("|") : "") && $.each(e, function(e, t) {
        if ((t = t.split("=")).length > 1) {
            var r = t[0],
                a = decodeURIComponent(t[1]).split(";");
            $.each(a, function(e, t) {
                var a = $(".search-multiple-navigator fieldset.filtro_" + r).find("input[value='" + t + "']");
                a.not(":checked").trigger("click");
                var n = a.parent(),
                    i = $.trim(n.text().toLowerCase()),
                    l = new RegExp(" ", "g");
                text2 = jQuery.trim(i), text2 = text2.replace(l, "-"), n.addClass("sr_" + i), $(".filter_checked_wrapper").append("<div class='filter_wrapper_remove sr_" + text2 + " 'data-filter='" + i + "'> <div class='remove_filter'></div><div class='filter_checked'>" + i + "</div></div>")
            })
        }
    }), $("body").on("click", ".search-multiple-navigator fieldset label input", function(e) {
        var t = $(this),
            r = t.parentsUntil("fieldset").parent().attr("class").match("filtro_(.*)"),
            a = (t.val(), window.location.href.split("filtro=")),
            n = window.location.href.match("filtro") ? a[0].substr(0, a[0].length - 1) : a[0];
        if (null != (r = r.length > 1 ? r[1] : null)) {
            var i = (n + ("" == window.location.search || window.location.href.match(/\?filtro/) ? "?" : "&") + "filtro=" + form_filter_url()).replace(" active", "").replace(" closed", "").replace("active closed", "").replace("%20", " ").replace(" ", " ");
            callbackFiltersSearch(form_filter_url().replace(" active", "").replace(" closed", "").replace("active closed", "").replace("%20", " "));
            window.history.pushState({
                pushed: !0
            }, window.title, i)
        }
    });

});
/****** SmartResearch ******/
/* Scrollbar */
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function(e) {
    function t(t) {
        var r = t || window.event,
            l = s.call(arguments, 1),
            c = 0,
            u = 0,
            h = 0,
            f = 0,
            m = 0,
            p = 0;
        if (t = e.event.fix(r), t.type = "mousewheel", "detail" in r && (h = -1 * r.detail), "wheelDelta" in r && (h = r.wheelDelta), "wheelDeltaY" in r && (h = r.wheelDeltaY), "wheelDeltaX" in r && (u = -1 * r.wheelDeltaX), "axis" in r && r.axis === r.HORIZONTAL_AXIS && (u = -1 * h, h = 0), c = 0 === h ? u : h, "deltaY" in r && (h = -1 * r.deltaY, c = h), "deltaX" in r && (u = r.deltaX, 0 === h && (c = -1 * u)), 0 !== h || 0 !== u) {
            if (1 === r.deltaMode) {
                var g = e.data(this, "mousewheel-line-height");
                c *= g, h *= g, u *= g
            } else if (2 === r.deltaMode) {
                var v = e.data(this, "mousewheel-page-height");
                c *= v, h *= v, u *= v
            }
            if (f = Math.max(Math.abs(h), Math.abs(u)), (!i || i > f) && (i = f, n(r, f) && (i /= 40)), n(r, f) && (c /= 40, u /= 40, h /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / i), u = Math[u >= 1 ? "floor" : "ceil"](u / i), h = Math[h >= 1 ? "floor" : "ceil"](h / i), d.settings.normalizeOffset && this.getBoundingClientRect) {
                var x = this.getBoundingClientRect();
                m = t.clientX - x.left, p = t.clientY - x.top
            }
            return t.deltaX = u, t.deltaY = h, t.deltaFactor = i, t.offsetX = m, t.offsetY = p, t.deltaMode = 0, l.unshift(t, c, u, h), a && clearTimeout(a), a = setTimeout(o, 200), (e.event.dispatch || e.event.handle).apply(this, l)
        }
    }

    function o() {
        i = null
    }

    function n(e, t) {
        return d.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
    }
    var a, i, r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        l = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        s = Array.prototype.slice;
    if (e.event.fixHooks)
        for (var c = r.length; c;) e.event.fixHooks[r[--c]] = e.event.mouseHooks;
    var d = e.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var o = l.length; o;) this.addEventListener(l[--o], t, !1);
            else this.onmousewheel = t;
            e.data(this, "mousewheel-line-height", d.getLineHeight(this)), e.data(this, "mousewheel-page-height", d.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var o = l.length; o;) this.removeEventListener(l[--o], t, !1);
            else this.onmousewheel = null;
            e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(t) {
            var o = e(t),
                n = o["offsetParent" in e.fn ? "offsetParent" : "parent"]();
            return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(o.css("fontSize"), 10) || 16
        },
        getPageHeight: function(t) {
            return e(t).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function(e) {
    function t(t) {
        var r = t || window.event,
            l = s.call(arguments, 1),
            c = 0,
            u = 0,
            h = 0,
            f = 0,
            m = 0,
            p = 0;
        if (t = e.event.fix(r), t.type = "mousewheel", "detail" in r && (h = -1 * r.detail), "wheelDelta" in r && (h = r.wheelDelta), "wheelDeltaY" in r && (h = r.wheelDeltaY), "wheelDeltaX" in r && (u = -1 * r.wheelDeltaX), "axis" in r && r.axis === r.HORIZONTAL_AXIS && (u = -1 * h, h = 0), c = 0 === h ? u : h, "deltaY" in r && (h = -1 * r.deltaY, c = h), "deltaX" in r && (u = r.deltaX, 0 === h && (c = -1 * u)), 0 !== h || 0 !== u) {
            if (1 === r.deltaMode) {
                var g = e.data(this, "mousewheel-line-height");
                c *= g, h *= g, u *= g
            } else if (2 === r.deltaMode) {
                var v = e.data(this, "mousewheel-page-height");
                c *= v, h *= v, u *= v
            }
            if (f = Math.max(Math.abs(h), Math.abs(u)), (!i || i > f) && (i = f, n(r, f) && (i /= 40)), n(r, f) && (c /= 40, u /= 40, h /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / i), u = Math[u >= 1 ? "floor" : "ceil"](u / i), h = Math[h >= 1 ? "floor" : "ceil"](h / i), d.settings.normalizeOffset && this.getBoundingClientRect) {
                var x = this.getBoundingClientRect();
                m = t.clientX - x.left, p = t.clientY - x.top
            }
            return t.deltaX = u, t.deltaY = h, t.deltaFactor = i, t.offsetX = m, t.offsetY = p, t.deltaMode = 0, l.unshift(t, c, u, h), a && clearTimeout(a), a = setTimeout(o, 200), (e.event.dispatch || e.event.handle).apply(this, l)
        }
    }

    function o() {
        i = null
    }

    function n(e, t) {
        return d.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
    }
    var a, i, r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        l = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        s = Array.prototype.slice;
    if (e.event.fixHooks)
        for (var c = r.length; c;) e.event.fixHooks[r[--c]] = e.event.mouseHooks;
    var d = e.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var o = l.length; o;) this.addEventListener(l[--o], t, !1);
            else this.onmousewheel = t;
            e.data(this, "mousewheel-line-height", d.getLineHeight(this)), e.data(this, "mousewheel-page-height", d.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var o = l.length; o;) this.removeEventListener(l[--o], t, !1);
            else this.onmousewheel = null;
            e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(t) {
            var o = e(t),
                n = o["offsetParent" in e.fn ? "offsetParent" : "parent"]();
            return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10) || parseInt(o.css("fontSize"), 10) || 16
        },
        getPageHeight: function(t) {
            return e(t).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
}),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}(function(e) {
    ! function(t) {
        var o = "function" == typeof define && define.amd,
            n = "undefined" != typeof module && module.exports,
            a = "https:" == document.location.protocol ? "https:" : "http:";
        o || (n ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + a + "//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js%3E%3C/script%3E"))), t()
    }(function() {
        var t, o = "mCustomScrollbar",
            n = "mCS",
            a = ".mCustomScrollbar",
            i = {
                setTop: 0,
                setLeft: 0,
                axis: "y",
                scrollbarPosition: "inside",
                scrollInertia: 950,
                autoDraggerLength: !0,
                alwaysShowScrollbar: 0,
                snapOffset: 0,
                mouseWheel: {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    deltaFactor: "auto",
                    disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                },
                scrollButtons: {
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                keyboard: {
                    enable: !0,
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                contentTouchScroll: 25,
                documentTouchScroll: !0,
                advanced: {
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize: !0,
                    updateOnImageLoad: "auto",
                    autoUpdateTimeout: 60
                },
                theme: "light",
                callbacks: {
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    alwaysTriggerOffsets: !0
                }
            },
            r = 0,
            l = {},
            s = window.attachEvent && !window.addEventListener ? 1 : 0,
            c = !1,
            d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
            u = {
                init: function(t) {
                    var t = e.extend(!0, {}, i, t),
                        o = h.call(this);
                    if (t.live) {
                        var s = t.liveSelector || this.selector || a,
                            c = e(s);
                        if ("off" === t.live) return void m(s);
                        l[s] = setTimeout(function() {
                            c.mCustomScrollbar(t), "once" === t.live && c.length && m(s)
                        }, 500)
                    } else m(s);
                    return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : p(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        preventDefault: !1,
                        deltaFactor: "auto",
                        normalizeDelta: !1,
                        invert: !1
                    }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), f(t), e(o).each(function() {
                        var o = e(this);
                        if (!o.data(n)) {
                            o.data(n, {
                                idx: ++r,
                                opt: t,
                                scrollRatio: {
                                    y: null,
                                    x: null
                                },
                                overflowed: null,
                                contentReset: {
                                    y: null,
                                    x: null
                                },
                                bindEvents: !1,
                                tweenRunning: !1,
                                sequential: {},
                                langDir: o.css("direction"),
                                cbOffsets: null,
                                trigger: null,
                                poll: {
                                    size: {
                                        o: 0,
                                        n: 0
                                    },
                                    img: {
                                        o: 0,
                                        n: 0
                                    },
                                    change: {
                                        o: 0,
                                        n: 0
                                    }
                                }
                            });
                            var a = o.data(n),
                                i = a.opt,
                                l = o.data("mcs-axis"),
                                s = o.data("mcs-scrollbar-position"),
                                c = o.data("mcs-theme");
                            l && (i.axis = l), s && (i.scrollbarPosition = s), c && (i.theme = c, f(i)), v.call(this), a && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this), e("#mCSB_" + a.idx + "_container img:not(." + d[2] + ")").addClass(d[2]), u.update.call(null, o)
                        }
                    })
                },
                update: function(t, o) {
                    var a = t || h.call(this);
                    return e(a).each(function() {
                        var t = e(this);
                        if (t.data(n)) {
                            var a = t.data(n),
                                i = a.opt,
                                r = e("#mCSB_" + a.idx + "_container"),
                                l = e("#mCSB_" + a.idx),
                                s = [e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal")];
                            if (!r.length) return;
                            a.tweenRunning && Q(t), o && a && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this), t.hasClass(d[3]) && t.removeClass(d[3]), t.hasClass(d[4]) && t.removeClass(d[4]), l.css("max-height", "none"), l.height() !== t.height() && l.css("max-height", t.height()), w.call(this), "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", x(r)), a.overflowed = y.call(this), k.call(this), i.autoDraggerLength && S.call(this), b.call(this), T.call(this);
                            var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
                            "x" !== i.axis && (a.overflowed[0] ? s[0].height() > s[0].parent().height() ? B.call(this) : (Z(t, c[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }), a.contentReset.y = null) : (B.call(this), "y" === i.axis ? M.call(this) : "yx" === i.axis && a.overflowed[1] && Z(t, c[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }))), "y" !== i.axis && (a.overflowed[1] ? s[1].width() > s[1].parent().width() ? B.call(this) : (Z(t, c[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }), a.contentReset.x = null) : (B.call(this), "x" === i.axis ? M.call(this) : "yx" === i.axis && a.overflowed[0] && Z(t, c[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }))), o && a && (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)), N.call(this)
                        }
                    })
                },
                scrollTo: function(t, o) {
                    if (void 0 !== t && null != t) {
                        var a = h.call(this);
                        return e(a).each(function() {
                            var a = e(this);
                            if (a.data(n)) {
                                var i = a.data(n),
                                    r = i.opt,
                                    l = {
                                        trigger: "external",
                                        scrollInertia: r.scrollInertia,
                                        scrollEasing: "mcsEaseInOut",
                                        moveDragger: !1,
                                        timeout: 60,
                                        callbacks: !0,
                                        onStart: !0,
                                        onUpdate: !0,
                                        onComplete: !0
                                    },
                                    s = e.extend(!0, {}, l, o),
                                    c = F.call(this, t),
                                    d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                                c[0] = q.call(this, c[0], "y"), c[1] = q.call(this, c[1], "x"), s.moveDragger && (c[0] *= i.scrollRatio.y, c[1] *= i.scrollRatio.x), s.dur = ae() ? 0 : d, setTimeout(function() {
                                    null !== c[0] && void 0 !== c[0] && "x" !== r.axis && i.overflowed[0] && (s.dir = "y", s.overwrite = "all", Z(a, c[0].toString(), s)), null !== c[1] && void 0 !== c[1] && "y" !== r.axis && i.overflowed[1] && (s.dir = "x", s.overwrite = "none", Z(a, c[1].toString(), s))
                                }, s.timeout)
                            }
                        })
                    }
                },
                stop: function() {
                    var t = h.call(this);
                    return e(t).each(function() {
                        var t = e(this);
                        t.data(n) && Q(t)
                    })
                },
                disable: function(t) {
                    var o = h.call(this);
                    return e(o).each(function() {
                        var o = e(this);
                        o.data(n) && (o.data(n), N.call(this, "remove"), M.call(this), t && B.call(this), k.call(this, !0), o.addClass(d[3]))
                    })
                },
                destroy: function() {
                    var t = h.call(this);
                    return e(t).each(function() {
                        var a = e(this);
                        if (a.data(n)) {
                            var i = a.data(n),
                                r = i.opt,
                                l = e("#mCSB_" + i.idx),
                                s = e("#mCSB_" + i.idx + "_container"),
                                c = e(".mCSB_" + i.idx + "_scrollbar");
                            r.live && m(r.liveSelector || e(t).selector), N.call(this, "remove"), M.call(this), B.call(this), a.removeData(n), $(this, "mcs"), c.remove(), s.find("img." + d[2]).removeClass(d[2]), l.replaceWith(s.contents()), a.removeClass(o + " _" + n + "_" + i.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4])
                        }
                    })
                }
            },
            h = function() {
                return "object" != typeof e(this) || e(this).length < 1 ? a : this
            },
            f = function(t) {
                var o = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                    n = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                    a = ["minimal", "minimal-dark"],
                    i = ["minimal", "minimal-dark"],
                    r = ["minimal", "minimal-dark"];
                t.autoDraggerLength = !(e.inArray(t.theme, o) > -1) && t.autoDraggerLength, t.autoExpandScrollbar = !(e.inArray(t.theme, n) > -1) && t.autoExpandScrollbar, t.scrollButtons.enable = !(e.inArray(t.theme, a) > -1) && t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, i) > -1 || t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition
            },
            m = function(e) {
                l[e] && (clearTimeout(l[e]), $(l, e))
            },
            p = function(e) {
                return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
            },
            g = function(e) {
                return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
            },
            v = function() {
                var t = e(this),
                    a = t.data(n),
                    i = a.opt,
                    r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : "",
                    l = ["<div id='mCSB_" + a.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + a.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + a.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + a.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + a.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + a.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                    s = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical",
                    c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0],
                    u = "yx" === i.axis ? "<div id='mCSB_" + a.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                    h = i.autoHideScrollbar ? " " + d[6] : "",
                    f = "x" !== i.axis && "rtl" === a.langDir ? " " + d[7] : "";
                i.setWidth && t.css("width", i.setWidth), i.setHeight && t.css("height", i.setHeight), i.setLeft = "y" !== i.axis && "rtl" === a.langDir ? "989999px" : i.setLeft, t.addClass(o + " _" + n + "_" + a.idx + h + f).wrapInner("<div id='mCSB_" + a.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + s + "'><div id='mCSB_" + a.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir='" + a.langDir + "' /></div>");
                var m = e("#mCSB_" + a.idx),
                    p = e("#mCSB_" + a.idx + "_container");
                "y" === i.axis || i.advanced.autoExpandHorizontalScroll || p.css("width", x(p)), "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), m.addClass("mCSB_outside").after(c)) : (m.addClass("mCSB_inside").append(c), p.wrap(u)), _.call(this);
                var g = [e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal")];
                g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
            },
            x = function(t) {
                var o = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function() {
                        return e(this).outerWidth(!0)
                    }).get())],
                    n = t.parent().width();
                return o[0] > n ? o[0] : o[1] > n ? o[1] : "100%"
            },
            w = function() {
                var t = e(this).data(n),
                    o = t.opt,
                    a = e("#mCSB_" + t.idx + "_container");
                if (o.advanced.autoExpandHorizontalScroll && "y" !== o.axis) {
                    a.css({
                        width: "auto",
                        "min-width": 0,
                        "overflow-x": "scroll"
                    });
                    var i = Math.ceil(a[0].scrollWidth);
                    3 === o.advanced.autoExpandHorizontalScroll || 2 !== o.advanced.autoExpandHorizontalScroll && i > a.parent().width() ? a.css({
                        width: i,
                        "min-width": "100%",
                        "overflow-x": "inherit"
                    }) : a.css({
                        "overflow-x": "inherit",
                        position: "absolute"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: Math.ceil(a[0].getBoundingClientRect().right + .4) - Math.floor(a[0].getBoundingClientRect().left),
                        "min-width": "100%",
                        position: "relative"
                    }).unwrap()
                }
            },
            _ = function() {
                var t = e(this).data(n),
                    o = t.opt,
                    a = e(".mCSB_" + t.idx + "_scrollbar:first"),
                    i = oe(o.scrollButtons.tabindex) ? "tabindex='" + o.scrollButtons.tabindex + "'" : "",
                    r = ["<a href='#' class='" + d[13] + "' " + i + " />", "<a href='#' class='" + d[14] + "' " + i + " />", "<a href='#' class='" + d[15] + "' " + i + " />", "<a href='#' class='" + d[16] + "' " + i + " />"],
                    l = ["x" === o.axis ? r[2] : r[0], "x" === o.axis ? r[3] : r[1], r[2], r[3]];
                o.scrollButtons.enable && a.prepend(l[0]).append(l[1]).next(".mCSB_scrollTools").prepend(l[2]).append(l[3])
            },
            S = function() {
                var t = e(this).data(n),
                    o = e("#mCSB_" + t.idx),
                    a = e("#mCSB_" + t.idx + "_container"),
                    i = [e("#mCSB_" + t.idx + "_dragger_vertical"), e("#mCSB_" + t.idx + "_dragger_horizontal")],
                    r = [o.height() / a.outerHeight(!1), o.width() / a.outerWidth(!1)],
                    l = [parseInt(i[0].css("min-height")), Math.round(r[0] * i[0].parent().height()), parseInt(i[1].css("min-width")), Math.round(r[1] * i[1].parent().width())],
                    c = s && l[1] < l[0] ? l[0] : l[1],
                    d = s && l[3] < l[2] ? l[2] : l[3];
                i[0].css({
                    height: c,
                    "max-height": i[0].parent().height() - 10
                }).find(".mCSB_dragger_bar").css({
                    "line-height": l[0] + "px"
                }), i[1].css({
                    width: d,
                    "max-width": i[1].parent().width() - 10
                })
            },
            b = function() {
                var t = e(this).data(n),
                    o = e("#mCSB_" + t.idx),
                    a = e("#mCSB_" + t.idx + "_container"),
                    i = [e("#mCSB_" + t.idx + "_dragger_vertical"), e("#mCSB_" + t.idx + "_dragger_horizontal")],
                    r = [a.outerHeight(!1) - o.height(), a.outerWidth(!1) - o.width()],
                    l = [r[0] / (i[0].parent().height() - i[0].height()), r[1] / (i[1].parent().width() - i[1].width())];
                t.scrollRatio = {
                    y: l[0],
                    x: l[1]
                }
            },
            C = function(e, t, o) {
                var n = o ? d[0] + "_expanded" : "",
                    a = e.closest(".mCSB_scrollTools");
                "active" === t ? (e.toggleClass(d[0] + " " + n), a.toggleClass(d[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]), a.removeClass(d[1])) : (e.addClass(d[0]), a.addClass(d[1])))
            },
            y = function() {
                var t = e(this).data(n),
                    o = e("#mCSB_" + t.idx),
                    a = e("#mCSB_" + t.idx + "_container"),
                    i = null == t.overflowed ? a.height() : a.outerHeight(!1),
                    r = null == t.overflowed ? a.width() : a.outerWidth(!1),
                    l = a[0].scrollHeight,
                    s = a[0].scrollWidth;
                return l > i && (i = l), s > r && (r = s), [i > o.height(), r > o.width()]
            },
            B = function() {
                var t = e(this),
                    o = t.data(n),
                    a = o.opt,
                    i = e("#mCSB_" + o.idx),
                    r = e("#mCSB_" + o.idx + "_container"),
                    l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                if (Q(t), ("x" !== a.axis && !o.overflowed[0] || "y" === a.axis && o.overflowed[0]) && (l[0].add(r).css("top", 0), Z(t, "_resetY")), "y" !== a.axis && !o.overflowed[1] || "x" === a.axis && o.overflowed[1]) {
                    var s = dx = 0;
                    "rtl" === o.langDir && (s = i.width() - r.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)), r.css("left", s), l[1].css("left", dx), Z(t, "_resetX")
                }
            },
            T = function() {
                function t() {
                    r = setTimeout(function() {
                        e.event.special.mousewheel ? (clearTimeout(r), L.call(o[0])) : t()
                    }, 100)
                }
                var o = e(this),
                    a = o.data(n),
                    i = a.opt;
                if (!a.bindEvents) {
                    if (O.call(this), i.contentTouchScroll && I.call(this), E.call(this), i.mouseWheel.enable) {
                        var r;
                        t()
                    }
                    H.call(this), X.call(this), i.advanced.autoScrollOnFocus && P.call(this), i.scrollButtons.enable && Y.call(this), i.keyboard.enable && j.call(this), a.bindEvents = !0
                }
            },
            M = function() {
                var t = e(this),
                    o = t.data(n),
                    a = o.opt,
                    i = n + "_" + o.idx,
                    r = ".mCSB_" + o.idx + "_scrollbar",
                    l = e("#mCSB_" + o.idx + ",#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper," + r + " ." + d[12] + ",#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal," + r + ">a"),
                    s = e("#mCSB_" + o.idx + "_container");
                a.advanced.releaseDraggableSelectors && l.add(e(a.advanced.releaseDraggableSelectors)), a.advanced.extraDraggableSelectors && l.add(e(a.advanced.extraDraggableSelectors)), o.bindEvents && (e(document).add(e(!A() || top.document)).unbind("." + i), l.each(function() {
                    e(this).unbind("." + i)
                }), clearTimeout(t[0]._focusTimeout), $(t[0], "_focusTimeout"), clearTimeout(o.sequential.step), $(o.sequential, "step"), clearTimeout(s[0].onCompleteTimeout), $(s[0], "onCompleteTimeout"), o.bindEvents = !1)
            },
            k = function(t) {
                var o = e(this),
                    a = o.data(n),
                    i = a.opt,
                    r = e("#mCSB_" + a.idx + "_container_wrapper"),
                    l = r.length ? r : e("#mCSB_" + a.idx + "_container"),
                    s = [e("#mCSB_" + a.idx + "_scrollbar_vertical"), e("#mCSB_" + a.idx + "_scrollbar_horizontal")],
                    c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
                "x" !== i.axis && (a.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"), l.removeClass(d[8] + " " + d[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"), l.removeClass(d[10])) : (s[0].css("display", "none"), l.addClass(d[10])), l.addClass(d[8]))), "y" !== i.axis && (a.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"), l.removeClass(d[9] + " " + d[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"), l.removeClass(d[11])) : (s[1].css("display", "none"), l.addClass(d[11])), l.addClass(d[9]))), a.overflowed[0] || a.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5])
            },
            D = function(t) {
                var o = t.type,
                    n = t.target.ownerDocument !== document && null !== frameElement ? [e(frameElement).offset().top, e(frameElement).offset().left] : null,
                    a = A() && t.target.ownerDocument !== top.document && null !== frameElement ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];
                switch (o) {
                    case "pointerdown":
                    case "MSPointerDown":
                    case "pointermove":
                    case "MSPointerMove":
                    case "pointerup":
                    case "MSPointerUp":
                        return n ? [t.originalEvent.pageY - n[0] + a[0], t.originalEvent.pageX - n[1] + a[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
                    case "touchstart":
                    case "touchmove":
                    case "touchend":
                        var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
                            r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
                        return t.target.ownerDocument !== document ? [i.screenY, i.screenX, r > 1] : [i.pageY, i.pageX, r > 1];
                    default:
                        return n ? [t.pageY - n[0] + a[0], t.pageX - n[1] + a[1], !1] : [t.pageY, t.pageX, !1]
                }
            },
            O = function() {
                function t(e, t, n, a) {
                    if (f[0].idleTimer = d.scrollInertia < 233 ? 250 : 0, o.attr("id") === h[1]) var i = "x",
                        s = (o[0].offsetLeft - t + a) * l.scrollRatio.x;
                    else var i = "y",
                        s = (o[0].offsetTop - e + n) * l.scrollRatio.y;
                    Z(r, s.toString(), {
                        dir: i,
                        drag: !0
                    })
                }
                var o, a, i, r = e(this),
                    l = r.data(n),
                    d = l.opt,
                    u = n + "_" + l.idx,
                    h = ["mCSB_" + l.idx + "_dragger_vertical", "mCSB_" + l.idx + "_dragger_horizontal"],
                    f = e("#mCSB_" + l.idx + "_container"),
                    m = e("#" + h[0] + ",#" + h[1]),
                    p = d.advanced.releaseDraggableSelectors ? m.add(e(d.advanced.releaseDraggableSelectors)) : m,
                    g = d.advanced.extraDraggableSelectors ? e(!A() || top.document).add(e(d.advanced.extraDraggableSelectors)) : e(!A() || top.document);
                m.bind("contextmenu." + u, function(e) {
                    e.preventDefault()
                }).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function(t) {
                    if (t.stopImmediatePropagation(), t.preventDefault(), ee(t)) {
                        c = !0, s && (document.onselectstart = function() {
                            return !1
                        }), W.call(f, !1), Q(r);
                        var n = (o = e(this)).offset(),
                            l = D(t)[0] - n.top,
                            u = D(t)[1] - n.left,
                            h = o.height() + n.top,
                            m = o.width() + n.left;
                        h > l && l > 0 && m > u && u > 0 && (a = l, i = u), C(o, "active", d.autoExpandScrollbar)
                    }
                }).bind("touchmove." + u, function(e) {
                    e.stopImmediatePropagation(), e.preventDefault();
                    var n = o.offset(),
                        r = D(e)[0] - n.top,
                        l = D(e)[1] - n.left;
                    t(a, i, r, l)
                }), e(document).add(g).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function(e) {
                    if (o) {
                        var n = o.offset(),
                            r = D(e)[0] - n.top,
                            l = D(e)[1] - n.left;
                        if (a === r && i === l) return;
                        t(a, i, r, l)
                    }
                }).add(p).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function() {
                    o && (C(o, "active", d.autoExpandScrollbar), o = null), c = !1, s && (document.onselectstart = null), W.call(f, !0)
                })
            },
            I = function() {
                function o(e) {
                    if (!te(e) || c || D(e)[2]) t = 0;
                    else {
                        t = 1, b = 0, C = 0, d = 1, y.removeClass("mCS_touch_action");
                        var o = O.offset();
                        u = D(e)[0] - o.top, h = D(e)[1] - o.left, z = [D(e)[0], D(e)[1]]
                    }
                }

                function a(e) {
                    if (te(e) && !c && !D(e)[2] && (T.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!C || b) && d)) {
                        g = J();
                        var t = k.offset(),
                            o = D(e)[0] - t.top,
                            n = D(e)[1] - t.left,
                            a = "mcsLinearOut";
                        if (E.push(o), L.push(n), z[2] = Math.abs(D(e)[0] - z[0]), z[3] = Math.abs(D(e)[1] - z[1]), B.overflowed[0]) var i = I[0].parent().height() - I[0].height(),
                            r = u - o > 0 && o - u > -i * B.scrollRatio.y && (2 * z[3] < z[2] || "yx" === T.axis);
                        if (B.overflowed[1]) var l = I[1].parent().width() - I[1].width(),
                            f = h - n > 0 && n - h > -l * B.scrollRatio.x && (2 * z[2] < z[3] || "yx" === T.axis);
                        r || f ? (X || e.preventDefault(), b = 1) : (C = 1, y.addClass("mCS_touch_action")), X && e.preventDefault(), _ = "yx" === T.axis ? [u - o, h - n] : "x" === T.axis ? [null, h - n] : [u - o, null], O[0].idleTimer = 250, B.overflowed[0] && s(_[0], R, a, "y", "all", !0), B.overflowed[1] && s(_[1], R, a, "x", W, !0)
                    }
                }

                function i(e) {
                    if (!te(e) || c || D(e)[2]) t = 0;
                    else {
                        t = 1, e.stopImmediatePropagation(), Q(y), p = J();
                        var o = k.offset();
                        f = D(e)[0] - o.top, m = D(e)[1] - o.left, E = [], L = []
                    }
                }

                function r(e) {
                    if (te(e) && !c && !D(e)[2]) {
                        d = 0, e.stopImmediatePropagation(), b = 0, C = 0, v = J();
                        var t = k.offset(),
                            o = D(e)[0] - t.top,
                            n = D(e)[1] - t.left;
                        if (!(v - g > 30)) {
                            var a = "mcsEaseOut",
                                i = 2.5 > (w = 1e3 / (v - p)),
                                r = i ? [E[E.length - 2], L[L.length - 2]] : [0, 0];
                            x = i ? [o - r[0], n - r[1]] : [o - f, n - m];
                            var u = [Math.abs(x[0]), Math.abs(x[1])];
                            w = i ? [Math.abs(x[0] / 4), Math.abs(x[1] / 4)] : [w, w];
                            var h = [Math.abs(O[0].offsetTop) - x[0] * l(u[0] / w[0], w[0]), Math.abs(O[0].offsetLeft) - x[1] * l(u[1] / w[1], w[1])];
                            _ = "yx" === T.axis ? [h[0], h[1]] : "x" === T.axis ? [null, h[1]] : [h[0], null], S = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia];
                            var y = parseInt(T.contentTouchScroll) || 0;
                            _[0] = u[0] > y ? _[0] : 0, _[1] = u[1] > y ? _[1] : 0, B.overflowed[0] && s(_[0], S[0], a, "y", W, !1), B.overflowed[1] && s(_[1], S[1], a, "x", W, !1)
                        }
                    }
                }

                function l(e, t) {
                    var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
                    return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3]
                }

                function s(e, t, o, n, a, i) {
                    e && Z(y, e.toString(), {
                        dur: t,
                        scrollEasing: o,
                        dir: n,
                        overwrite: a,
                        drag: i
                    })
                }
                var d, u, h, f, m, p, g, v, x, w, _, S, b, C, y = e(this),
                    B = y.data(n),
                    T = B.opt,
                    M = n + "_" + B.idx,
                    k = e("#mCSB_" + B.idx),
                    O = e("#mCSB_" + B.idx + "_container"),
                    I = [e("#mCSB_" + B.idx + "_dragger_vertical"), e("#mCSB_" + B.idx + "_dragger_horizontal")],
                    E = [],
                    L = [],
                    R = 0,
                    W = "yx" === T.axis ? "none" : "all",
                    z = [],
                    H = O.find("iframe"),
                    P = ["touchstart." + M + " pointerdown." + M + " MSPointerDown." + M, "touchmove." + M + " pointermove." + M + " MSPointerMove." + M, "touchend." + M + " pointerup." + M + " MSPointerUp." + M],
                    X = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
                O.bind(P[0], function(e) {
                    o(e)
                }).bind(P[1], function(e) {
                    a(e)
                }), k.bind(P[0], function(e) {
                    i(e)
                }).bind(P[2], function(e) {
                    r(e)
                }), H.length && H.each(function() {
                    e(this).bind("load", function() {
                        A(this) && e(this.contentDocument || this.contentWindow.document).bind(P[0], function(e) {
                            o(e), i(e)
                        }).bind(P[1], function(e) {
                            a(e)
                        }).bind(P[2], function(e) {
                            r(e)
                        })
                    })
                })
            },
            E = function() {
                function o() {
                    return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
                }

                function a(e, t, o) {
                    d.type = o && i ? "stepped" : "stepless", d.scrollAmount = 10, U(r, e, t, "mcsLinearOut", o ? 60 : null)
                }
                var i, r = e(this),
                    l = r.data(n),
                    s = l.opt,
                    d = l.sequential,
                    u = n + "_" + l.idx,
                    h = e("#mCSB_" + l.idx + "_container"),
                    f = h.parent();
                h.bind("mousedown." + u, function() {
                    t || i || (i = 1, c = !0)
                }).add(document).bind("mousemove." + u, function(e) {
                    if (!t && i && o()) {
                        var n = h.offset(),
                            r = D(e)[0] - n.top + h[0].offsetTop,
                            c = D(e)[1] - n.left + h[0].offsetLeft;
                        r > 0 && r < f.height() && c > 0 && c < f.width() ? d.step && a("off", null, "stepped") : ("x" !== s.axis && l.overflowed[0] && (0 > r ? a("on", 38) : r > f.height() && a("on", 40)), "y" !== s.axis && l.overflowed[1] && (0 > c ? a("on", 37) : c > f.width() && a("on", 39)))
                    }
                }).bind("mouseup." + u + " dragend." + u, function() {
                    t || (i && (i = 0, a("off", null)), c = !1)
                })
            },
            L = function() {
                function t(t, n) {
                    if (Q(o), !z(o, t.target)) {
                        var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100,
                            d = i.scrollInertia;
                        if ("x" === i.axis || "x" === i.mouseWheel.axis) var u = "x",
                            h = [Math.round(r * a.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)],
                            f = "auto" !== i.mouseWheel.scrollAmount ? h[1] : h[0] >= l.width() ? .9 * l.width() : h[0],
                            m = Math.abs(e("#mCSB_" + a.idx + "_container")[0].offsetLeft),
                            p = c[1][0].offsetLeft,
                            g = c[1].parent().width() - c[1].width(),
                            v = "y" === i.mouseWheel.axis ? t.deltaY || n : t.deltaX;
                        else var u = "y",
                            h = [Math.round(r * a.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)],
                            f = "auto" !== i.mouseWheel.scrollAmount ? h[1] : h[0] >= l.height() ? .9 * l.height() : h[0],
                            m = Math.abs(e("#mCSB_" + a.idx + "_container")[0].offsetTop),
                            p = c[0][0].offsetTop,
                            g = c[0].parent().height() - c[0].height(),
                            v = t.deltaY || n;
                        "y" === u && !a.overflowed[0] || "x" === u && !a.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v), i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== p || 0 > v && p !== g || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), t.deltaFactor < 5 && !i.mouseWheel.normalizeDelta && (f = t.deltaFactor, d = 17), Z(o, (m - v * f).toString(), {
                            dir: u,
                            dur: d
                        }))
                    }
                }
                if (e(this).data(n)) {
                    var o = e(this),
                        a = o.data(n),
                        i = a.opt,
                        r = n + "_" + a.idx,
                        l = e("#mCSB_" + a.idx),
                        c = [e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal")],
                        d = e("#mCSB_" + a.idx + "_container").find("iframe");
                    d.length && d.each(function() {
                        e(this).bind("load", function() {
                            A(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + r, function(e, o) {
                                t(e, o)
                            })
                        })
                    }), l.bind("mousewheel." + r, function(e, o) {
                        t(e, o)
                    })
                }
            },
            R = new Object,
            A = function(t) {
                var o = !1,
                    n = !1,
                    a = null;
                if (void 0 === t ? n = "#empty" : void 0 !== e(t).attr("id") && (n = e(t).attr("id")), !1 !== n && void 0 !== R[n]) return R[n];
                if (t) {
                    try {
                        a = (i = t.contentDocument || t.contentWindow.document).body.innerHTML
                    } catch (e) {}
                    o = null !== a
                } else {
                    try {
                        var i = top.document;
                        a = i.body.innerHTML
                    } catch (e) {}
                    o = null !== a
                }
                return !1 !== n && (R[n] = o), o
            },
            W = function(e) {
                var t = this.find("iframe");
                if (t.length) {
                    var o = e ? "auto" : "none";
                    t.css("pointer-events", o)
                }
            },
            z = function(t, o) {
                var a = o.nodeName.toLowerCase(),
                    i = t.data(n).opt.mouseWheel.disableOver,
                    r = ["select", "textarea"];
                return e.inArray(a, i) > -1 && !(e.inArray(a, r) > -1 && !e(o).is(":focus"))
            },
            H = function() {
                var t, o = e(this),
                    a = o.data(n),
                    i = n + "_" + a.idx,
                    r = e("#mCSB_" + a.idx + "_container"),
                    l = r.parent();
                e(".mCSB_" + a.idx + "_scrollbar ." + d[12]).bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i, function(o) {
                    c = !0, e(o.target).hasClass("mCSB_dragger") || (t = 1)
                }).bind("touchend." + i + " pointerup." + i + " MSPointerUp." + i, function() {
                    c = !1
                }).bind("click." + i, function(n) {
                    if (t && (t = 0, e(n.target).hasClass(d[12]) || e(n.target).hasClass("mCSB_draggerRail"))) {
                        Q(o);
                        var i = e(this),
                            s = i.find(".mCSB_dragger");
                        if (i.parent(".mCSB_scrollTools_horizontal").length > 0) {
                            if (!a.overflowed[1]) return;
                            var c = "x",
                                u = n.pageX > s.offset().left ? -1 : 1,
                                h = Math.abs(r[0].offsetLeft) - u * (.9 * l.width())
                        } else {
                            if (!a.overflowed[0]) return;
                            var c = "y",
                                u = n.pageY > s.offset().top ? -1 : 1,
                                h = Math.abs(r[0].offsetTop) - u * (.9 * l.height())
                        }
                        Z(o, h.toString(), {
                            dir: c,
                            scrollEasing: "mcsEaseInOut"
                        })
                    }
                })
            },
            P = function() {
                var t = e(this),
                    o = t.data(n),
                    a = o.opt,
                    i = n + "_" + o.idx,
                    r = e("#mCSB_" + o.idx + "_container"),
                    l = r.parent();
                r.bind("focusin." + i, function() {
                    var o = e(document.activeElement),
                        n = r.find(".mCustomScrollBox").length;
                    o.is(a.advanced.autoScrollOnFocus) && (Q(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = n ? 17 * n : 0, t[0]._focusTimeout = setTimeout(function() {
                        var e = [ne(o)[0], ne(o)[1]],
                            n = [r[0].offsetTop, r[0].offsetLeft],
                            i = [n[0] + e[0] >= 0 && n[0] + e[0] < l.height() - o.outerHeight(!1), n[1] + e[1] >= 0 && n[0] + e[1] < l.width() - o.outerWidth(!1)],
                            s = "yx" !== a.axis || i[0] || i[1] ? "all" : "none";
                        "x" === a.axis || i[0] || Z(t, e[0].toString(), {
                            dir: "y",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: s,
                            dur: 0
                        }), "y" === a.axis || i[1] || Z(t, e[1].toString(), {
                            dir: "x",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: s,
                            dur: 0
                        })
                    }, t[0]._focusTimer))
                })
            },
            X = function() {
                var t = e(this).data(n),
                    o = n + "_" + t.idx,
                    a = e("#mCSB_" + t.idx + "_container").parent();
                a.bind("scroll." + o, function() {
                    0 === a.scrollTop() && 0 === a.scrollLeft() || e(".mCSB_" + t.idx + "_scrollbar").css("visibility", "hidden")
                })
            },
            Y = function() {
                var t = e(this),
                    o = t.data(n),
                    a = o.opt,
                    i = o.sequential,
                    r = n + "_" + o.idx,
                    l = ".mCSB_" + o.idx + "_scrollbar";
                e(l + ">a").bind("contextmenu." + r, function(e) {
                    e.preventDefault()
                }).bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, function(n) {
                    function r(e, o) {
                        i.scrollAmount = a.scrollButtons.scrollAmount, U(t, e, o)
                    }
                    if (n.preventDefault(), ee(n)) {
                        var l = e(this).attr("class");
                        switch (i.type = a.scrollButtons.scrollType, n.type) {
                            case "mousedown":
                            case "touchstart":
                            case "pointerdown":
                            case "MSPointerDown":
                                if ("stepped" === i.type) return;
                                c = !0, o.tweenRunning = !1, r("on", l);
                                break;
                            case "mouseup":
                            case "touchend":
                            case "pointerup":
                            case "MSPointerUp":
                            case "mouseout":
                            case "pointerout":
                            case "MSPointerOut":
                                if ("stepped" === i.type) return;
                                c = !1, i.dir && r("off", l);
                                break;
                            case "click":
                                if ("stepped" !== i.type || o.tweenRunning) return;
                                r("on", l)
                        }
                    }
                })
            },
            j = function() {
                function t(t) {
                    function n(e, t) {
                        r.type = i.keyboard.scrollType, r.scrollAmount = i.keyboard.scrollAmount, "stepped" === r.type && a.tweenRunning || U(o, e, t)
                    }
                    switch (t.type) {
                        case "blur":
                            a.tweenRunning && r.dir && n("off", null);
                            break;
                        case "keydown":
                        case "keyup":
                            var l = t.keyCode ? t.keyCode : t.which,
                                s = "on";
                            if ("x" !== i.axis && (38 === l || 40 === l) || "y" !== i.axis && (37 === l || 39 === l)) {
                                if ((38 === l || 40 === l) && !a.overflowed[0] || (37 === l || 39 === l) && !a.overflowed[1]) return;
                                "keyup" === t.type && (s = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), n(s, l))
                            } else if (33 === l || 34 === l) {
                                if ((a.overflowed[0] || a.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type) {
                                    Q(o);
                                    var h = 34 === l ? -1 : 1;
                                    if ("x" === i.axis || "yx" === i.axis && a.overflowed[1] && !a.overflowed[0]) var f = "x",
                                        m = Math.abs(c[0].offsetLeft) - h * (.9 * d.width());
                                    else var f = "y",
                                        m = Math.abs(c[0].offsetTop) - h * (.9 * d.height());
                                    Z(o, m.toString(), {
                                        dir: f,
                                        scrollEasing: "mcsEaseInOut"
                                    })
                                }
                            } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((a.overflowed[0] || a.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
                                if ("x" === i.axis || "yx" === i.axis && a.overflowed[1] && !a.overflowed[0]) var f = "x",
                                    m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                                else var f = "y",
                                    m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                                Z(o, m.toString(), {
                                    dir: f,
                                    scrollEasing: "mcsEaseInOut"
                                })
                            }
                    }
                }
                var o = e(this),
                    a = o.data(n),
                    i = a.opt,
                    r = a.sequential,
                    l = n + "_" + a.idx,
                    s = e("#mCSB_" + a.idx),
                    c = e("#mCSB_" + a.idx + "_container"),
                    d = c.parent(),
                    u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                    h = c.find("iframe"),
                    f = ["blur." + l + " keydown." + l + " keyup." + l];
                h.length && h.each(function() {
                    e(this).bind("load", function() {
                        A(this) && e(this.contentDocument || this.contentWindow.document).bind(f[0], function(e) {
                            t(e)
                        })
                    })
                }), s.attr("tabindex", "0").bind(f[0], function(e) {
                    t(e)
                })
            },
            U = function(t, o, a, i, r) {
                function l(e) {
                    c.snapAmount && (u.scrollAmount = c.snapAmount instanceof Array ? "x" === u.dir[0] ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount);
                    var o = "stepped" !== u.type,
                        n = r || (e ? o ? m / 1.5 : p : 1e3 / 60),
                        a = e ? o ? 7.5 : 40 : 2.5,
                        d = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)],
                        f = [s.scrollRatio.y > 10 ? 10 : s.scrollRatio.y, s.scrollRatio.x > 10 ? 10 : s.scrollRatio.x],
                        g = "x" === u.dir[0] ? d[1] + u.dir[1] * (f[1] * a) : d[0] + u.dir[1] * (f[0] * a),
                        v = "x" === u.dir[0] ? d[1] + u.dir[1] * parseInt(u.scrollAmount) : d[0] + u.dir[1] * parseInt(u.scrollAmount),
                        x = "auto" !== u.scrollAmount ? v : g,
                        w = i || (e ? o ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear"),
                        _ = !!e;
                    return e && 17 > n && (x = "x" === u.dir[0] ? d[1] : d[0]), Z(t, x.toString(), {
                        dir: u.dir[0],
                        scrollEasing: w,
                        dur: n,
                        onComplete: _
                    }), e ? void(u.dir = !1) : (clearTimeout(u.step), void(u.step = setTimeout(function() {
                        l()
                    }, n)))
                }
                var s = t.data(n),
                    c = s.opt,
                    u = s.sequential,
                    h = e("#mCSB_" + s.idx + "_container"),
                    f = "stepped" === u.type,
                    m = c.scrollInertia < 26 ? 26 : c.scrollInertia,
                    p = c.scrollInertia < 1 ? 17 : c.scrollInertia;
                switch (o) {
                    case "on":
                        if (u.dir = [a === d[16] || a === d[15] || 39 === a || 37 === a ? "x" : "y", a === d[13] || a === d[15] || 38 === a || 37 === a ? -1 : 1], Q(t), oe(a) && "stepped" === u.type) return;
                        l(f);
                        break;
                    case "off":
                        clearTimeout(u.step), $(u, "step"), Q(t), (f || s.tweenRunning && u.dir) && l(!0)
                }
            },
            F = function(t) {
                var o = e(this).data(n).opt,
                    a = [];
                return "function" == typeof t && (t = t()), t instanceof Array ? a = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null] : (a[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t, a[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t), "function" == typeof a[0] && (a[0] = a[0]()), "function" == typeof a[1] && (a[1] = a[1]()), a
            },
            q = function(t, o) {
                if (null != t && void 0 !== t) {
                    var a = e(this),
                        i = a.data(n),
                        r = i.opt,
                        l = e("#mCSB_" + i.idx + "_container"),
                        s = l.parent(),
                        c = typeof t;
                    o || (o = "x" === r.axis ? "x" : "y");
                    var d = "x" === o ? l.outerWidth(!1) - s.width() : l.outerHeight(!1) - s.height(),
                        h = "x" === o ? l[0].offsetLeft : l[0].offsetTop,
                        f = "x" === o ? "left" : "top";
                    switch (c) {
                        case "function":
                            return t();
                        case "object":
                            if (!(p = t.jquery ? t : e(t)).length) return;
                            return "x" === o ? ne(p)[1] : ne(p)[0];
                        case "string":
                        case "number":
                            if (oe(t)) return Math.abs(t);
                            if (-1 !== t.indexOf("%")) return Math.abs(d * parseInt(t) / 100);
                            if (-1 !== t.indexOf("-=")) return Math.abs(h - parseInt(t.split("-=")[1]));
                            if (-1 !== t.indexOf("+=")) {
                                var m = h + parseInt(t.split("+=")[1]);
                                return m >= 0 ? 0 : Math.abs(m)
                            }
                            if (-1 !== t.indexOf("px") && oe(t.split("px")[0])) return Math.abs(t.split("px")[0]);
                            if ("top" === t || "left" === t) return 0;
                            if ("bottom" === t) return Math.abs(s.height() - l.outerHeight(!1));
                            if ("right" === t) return Math.abs(s.width() - l.outerWidth(!1));
                            if ("first" === t || "last" === t) {
                                var p = l.find(":" + t);
                                return "x" === o ? ne(p)[1] : ne(p)[0]
                            }
                            return e(t).length ? "x" === o ? ne(e(t))[1] : ne(e(t))[0] : (l.css(f, t), void u.update.call(null, a[0]))
                    }
                }
            },
            N = function(t) {
                function o() {
                    return clearTimeout(h[0].autoUpdate), 0 === l.parents("html").length ? void(l = null) : void(h[0].autoUpdate = setTimeout(function() {
                        return c.advanced.updateOnSelectorChange && (s.poll.change.n = i(), s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n, void r(3)) : c.advanced.updateOnContentResize && (s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + h[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth, s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n, void r(1)) : !c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (s.poll.img.n = h.find("img").length, s.poll.img.n === s.poll.img.o) ? void((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o()) : (s.poll.img.o = s.poll.img.n, void h.find("img").each(function() {
                            a(this)
                        }))
                    }, c.advanced.autoUpdateTimeout))
                }

                function a(t) {
                    if (e(t).hasClass(d[2])) r();
                    else {
                        var o = new Image;
                        o.onload = function(e, t) {
                            return function() {
                                return t.apply(e, arguments)
                            }
                        }(o, function() {
                            this.onload = null, e(t).addClass(d[2]), r(2)
                        }), o.src = t.src
                    }
                }

                function i() {
                    !0 === c.advanced.updateOnSelectorChange && (c.advanced.updateOnSelectorChange = "*");
                    var e = 0,
                        t = h.find(c.advanced.updateOnSelectorChange);
                    return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function() {
                        e += this.offsetHeight + this.offsetWidth
                    }), e
                }

                function r(e) {
                    clearTimeout(h[0].autoUpdate), u.update.call(null, l[0], e)
                }
                var l = e(this),
                    s = l.data(n),
                    c = s.opt,
                    h = e("#mCSB_" + s.idx + "_container");
                return t ? (clearTimeout(h[0].autoUpdate), void $(h[0], "autoUpdate")) : void o()
            },
            V = function(e, t, o) {
                return Math.round(e / t) * t - o
            },
            Q = function(t) {
                var o = t.data(n);
                e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal").each(function() {
                    K.call(this)
                })
            },
            Z = function(t, o, a) {
                function i(e) {
                    return s && c.callbacks[e] && "function" == typeof c.callbacks[e]
                }

                function r() {
                    return [c.callbacks.alwaysTriggerOffsets || _ >= S[0] + y, c.callbacks.alwaysTriggerOffsets || -B >= _]
                }

                function l() {
                    var e = [f[0].offsetTop, f[0].offsetLeft],
                        o = [x[0].offsetTop, x[0].offsetLeft],
                        n = [f.outerHeight(!1), f.outerWidth(!1)],
                        i = [h.height(), h.width()];
                    t[0].mcs = {
                        content: f,
                        top: e[0],
                        left: e[1],
                        draggerTop: o[0],
                        draggerLeft: o[1],
                        topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(n[0]) - i[0])),
                        leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(n[1]) - i[1])),
                        direction: a.dir
                    }
                }
                var s = t.data(n),
                    c = s.opt,
                    d = {
                        trigger: "internal",
                        dir: "y",
                        scrollEasing: "mcsEaseOut",
                        drag: !1,
                        dur: c.scrollInertia,
                        overwrite: "all",
                        callbacks: !0,
                        onStart: !0,
                        onUpdate: !0,
                        onComplete: !0
                    },
                    u = [(a = e.extend(d, a)).dur, a.drag ? 0 : a.dur],
                    h = e("#mCSB_" + s.idx),
                    f = e("#mCSB_" + s.idx + "_container"),
                    m = f.parent(),
                    p = c.callbacks.onTotalScrollOffset ? F.call(t, c.callbacks.onTotalScrollOffset) : [0, 0],
                    g = c.callbacks.onTotalScrollBackOffset ? F.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
                if (s.trigger = a.trigger, 0 === m.scrollTop() && 0 === m.scrollLeft() || (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"), m.scrollTop(0).scrollLeft(0)), "_resetY" !== o || s.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]), s.contentReset.y = 1), "_resetX" !== o || s.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]), s.contentReset.x = 1), "_resetY" !== o && "_resetX" !== o) {
                    if (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]), s.contentReset.x = null), !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]), s.contentReset.x = null), c.snapAmount) {
                        var v = c.snapAmount instanceof Array ? "x" === a.dir ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount;
                        o = V(o, v, c.snapOffset)
                    }
                    switch (a.dir) {
                        case "x":
                            var x = e("#mCSB_" + s.idx + "_dragger_horizontal"),
                                w = "left",
                                _ = f[0].offsetLeft,
                                S = [h.width() - f.outerWidth(!1), x.parent().width() - x.width()],
                                b = [o, 0 === o ? 0 : o / s.scrollRatio.x],
                                y = p[1],
                                B = g[1],
                                T = y > 0 ? y / s.scrollRatio.x : 0,
                                M = B > 0 ? B / s.scrollRatio.x : 0;
                            break;
                        case "y":
                            var x = e("#mCSB_" + s.idx + "_dragger_vertical"),
                                w = "top",
                                _ = f[0].offsetTop,
                                S = [h.height() - f.outerHeight(!1), x.parent().height() - x.height()],
                                b = [o, 0 === o ? 0 : o / s.scrollRatio.y],
                                y = p[0],
                                B = g[0],
                                T = y > 0 ? y / s.scrollRatio.y : 0,
                                M = B > 0 ? B / s.scrollRatio.y : 0
                    }
                    b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [0, 0] : b[1] >= S[1] ? b = [S[0], S[1]] : b[0] = -b[0], t[0].mcs || (l(), i("onInit") && c.callbacks.onInit.call(t[0])), clearTimeout(f[0].onCompleteTimeout), G(x[0], w, Math.round(b[1]), u[1], a.scrollEasing), !s.tweenRunning && (0 === _ && b[0] >= 0 || _ === S[0] && b[0] <= S[0]) || G(f[0], w, Math.round(b[0]), u[0], a.scrollEasing, a.overwrite, {
                        onStart: function() {
                            a.callbacks && a.onStart && !s.tweenRunning && (i("onScrollStart") && (l(), c.callbacks.onScrollStart.call(t[0])), s.tweenRunning = !0, C(x), s.cbOffsets = r())
                        },
                        onUpdate: function() {
                            a.callbacks && a.onUpdate && i("whileScrolling") && (l(), c.callbacks.whileScrolling.call(t[0]))
                        },
                        onComplete: function() {
                            if (a.callbacks && a.onComplete) {
                                "yx" === c.axis && clearTimeout(f[0].onCompleteTimeout);
                                var e = f[0].idleTimer || 0;
                                f[0].onCompleteTimeout = setTimeout(function() {
                                    i("onScroll") && (l(), c.callbacks.onScroll.call(t[0])), i("onTotalScroll") && b[1] >= S[1] - T && s.cbOffsets[0] && (l(), c.callbacks.onTotalScroll.call(t[0])), i("onTotalScrollBack") && b[1] <= M && s.cbOffsets[1] && (l(), c.callbacks.onTotalScrollBack.call(t[0])), s.tweenRunning = !1, f[0].idleTimer = 0, C(x, "hide")
                                }, e)
                            }
                        }
                    })
                }
            },
            G = function(e, t, o, n, a, i, r) {
                function l() {
                    w.stop || (g || h.call(), g = J() - p, s(), g >= w.time && (w.time = g > w.time ? g + d - (g - w.time) : g + d - 1, w.time < g + 1 && (w.time = g + 1)), w.time < n ? w.id = u(l) : m.call())
                }

                function s() {
                    n > 0 ? (w.currVal = c(w.time, v, _, n, a), x[t] = Math.round(w.currVal) + "px") : x[t] = o + "px", f.call()
                }

                function c(e, t, o, n, a) {
                    switch (a) {
                        case "linear":
                        case "mcsLinear":
                            return o * e / n + t;
                        case "mcsLinearOut":
                            return e /= n, e--, o * Math.sqrt(1 - e * e) + t;
                        case "easeInOutSmooth":
                            return e /= n / 2, 1 > e ? o / 2 * e * e + t : (e--, -o / 2 * (e * (e - 2) - 1) + t);
                        case "easeInOutStrong":
                            return e /= n / 2, 1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, o / 2 * (2 - Math.pow(2, -10 * e)) + t);
                        case "easeInOut":
                        case "mcsEaseInOut":
                            return e /= n / 2, 1 > e ? o / 2 * e * e * e + t : (e -= 2, o / 2 * (e * e * e + 2) + t);
                        case "easeOutSmooth":
                            return e /= n, e--, -o * (e * e * e * e - 1) + t;
                        case "easeOutStrong":
                            return o * (1 - Math.pow(2, -10 * e / n)) + t;
                        case "easeOut":
                        case "mcsEaseOut":
                        default:
                            var i = (e /= n) * e,
                                r = i * e;
                            return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e)
                    }
                }
                e._mTween || (e._mTween = {
                    top: {},
                    left: {}
                });
                var d, u, h = (r = r || {}).onStart || function() {},
                    f = r.onUpdate || function() {},
                    m = r.onComplete || function() {},
                    p = J(),
                    g = 0,
                    v = e.offsetTop,
                    x = e.style,
                    w = e._mTween[t];
                "left" === t && (v = e.offsetLeft);
                var _ = o - v;
                w.stop = 0, "none" !== i && null != w.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(w.id) : clearTimeout(w.id), w.id = null), d = 1e3 / 60, w.time = g + d, u = window.requestAnimationFrame ? window.requestAnimationFrame : function(e) {
                    return s(), setTimeout(e, .01)
                }, w.id = u(l)
            },
            J = function() {
                return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
            },
            K = function() {
                var e = this;
                e._mTween || (e._mTween = {
                    top: {},
                    left: {}
                });
                for (var t = ["top", "left"], o = 0; o < t.length; o++) {
                    var n = t[o];
                    e._mTween[n].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[n].id) : clearTimeout(e._mTween[n].id), e._mTween[n].id = null, e._mTween[n].stop = 1)
                }
            },
            $ = function(e, t) {
                try {
                    delete e[t]
                } catch (o) {
                    e[t] = null
                }
            },
            ee = function(e) {
                return !(e.which && 1 !== e.which)
            },
            te = function(e) {
                var t = e.originalEvent.pointerType;
                return !(t && "touch" !== t && 2 !== t)
            },
            oe = function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            ne = function(e) {
                var t = e.parents(".mCSB_container");
                return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
            },
            ae = function() {
                var e = function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }();
                return !!e && document[e]
            };
        e.fn[o] = function(t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[o] = function(t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[o].defaults = i, window[o] = !0, e(window).bind("load", function() {
            e(a)[o](), e.extend(e.expr[":"], {
                mcsInView: e.expr[":"].mcsInView || function(t) {
                    var o, n, a = e(t),
                        i = a.parents(".mCSB_container");
                    if (i.length) return o = i.parent(), (n = [i[0].offsetTop, i[0].offsetLeft])[0] + ne(a)[0] >= 0 && n[0] + ne(a)[0] < o.height() - a.outerHeight(!1) && n[1] + ne(a)[1] >= 0 && n[1] + ne(a)[1] < o.width() - a.outerWidth(!1)
                },
                mcsInSight: e.expr[":"].mcsInSight || function(t, o, n) {
                    var a, i, r, l, s = e(t),
                        c = s.parents(".mCSB_container"),
                        d = "exact" === n[3] ? [
                            [1, 0],
                            [1, 0]
                        ] : [
                            [.9, .1],
                            [.6, .4]
                        ];
                    if (c.length) return a = [s.outerHeight(!1), s.outerWidth(!1)], r = [c[0].offsetTop + ne(s)[0], c[0].offsetLeft + ne(s)[1]], i = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth], l = [a[0] < i[0] ? d[0] : d[1], a[1] < i[1] ? d[0] : d[1]], r[0] - i[0] * l[0][0] < 0 && r[0] + a[0] - i[0] * l[0][1] >= 0 && r[1] - i[1] * l[1][0] < 0 && r[1] + a[1] - i[1] * l[1][1] >= 0
                },
                mcsOverflow: e.expr[":"].mcsOverflow || function(t) {
                    var o = e(t).data(n);
                    if (o) return o.overflowed[0] || o.overflowed[1]
                }
            })
        })
    })
});