"use strict";

var XBBCODE = function() {
    function e() {
        s = [];
        var e, t, n;
        for (e in i) if (i.hasOwnProperty(e)) {
            for ("*" === e ? s.push("\\" + e) : (s.push(e), i[e].noParse && y.push(e)), i[e].validChildLookup = {}, 
            i[e].validParentLookup = {}, i[e].restrictParentsTo = i[e].restrictParentsTo || [], 
            i[e].restrictChildrenTo = i[e].restrictChildrenTo || [], n = i[e].restrictChildrenTo.length, 
            t = 0; n > t; t++) i[e].validChildLookup[i[e].restrictChildrenTo[t]] = !0;
            for (n = i[e].restrictParentsTo.length, t = 0; n > t; t++) i[e].validParentLookup[i[e].restrictParentsTo[t]] = !0;
        }
        c = new RegExp("<bbcl=([0-9]+) (" + s.join("|") + ")([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>", "gi"), 
        u = new RegExp("\\[(" + s.join("|") + ")([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]", "gi"), 
        g = new RegExp("\\[(" + y.join("|") + ")([ =][^\\]]*?)?\\]([\\s\\S]*?)\\[/\\1\\]", "gi"), 
        function() {
            for (var e = [], t = 0; t < s.length; t++) "\\*" !== s[t] && e.push("/" + s[t]);
            p = new RegExp("(\\[)((?:" + s.join("|") + ")(?:[ =][^\\]]*?)?)(\\])", "gi"), d = new RegExp("(\\[)(" + e.join("|") + ")(\\])", "gi");
        }();
    }
    function t(e, n, r, o, a, l, u) {
        u = u || [], r++;
        var g, p, d, f, b = new RegExp("(<bbcl=" + r + " )(" + s.join("|") + ")([ =>])", "gi"), h = new RegExp("(<bbcl=" + r + " )(" + s.join("|") + ")([ =>])", "i"), T = l.match(b) || [], m = i[e] || {};
        for (b.lastIndex = 0, T || (l = ""), d = 0; d < T.length; d++) h.lastIndex = 0, 
        f = T[d].match(h)[2].toLowerCase(), m && m.restrictChildrenTo && m.restrictChildrenTo.length > 0 && (m.validChildLookup[f] || (p = 'The tag "' + f + '" is not allowed as a child of the tag "' + e + '".', 
        u.push(p))), g = i[f] || {}, g.restrictParentsTo.length > 0 && (g.validParentLookup[e] || (p = 'The tag "' + e + '" is not allowed as a parent of the tag "' + f + '".', 
        u.push(p)));
        return l = l.replace(c, function(e, n, r, o, a) {
            return u = t(r.toLowerCase(), e, n, r, o, a, u), e;
        }), u;
    }
    function n(e) {
        return e = e.replace(/\<([^\>][^\>]*?)\>/gi, function(e, t) {
            var n = t.match(/^bbcl=([0-9]+) /);
            return null === n ? "<bbcl=0 " + t + ">" : "<" + t.replace(/^(bbcl=)([0-9]+)/, function(e, t, n) {
                return t + (parseInt(n, 10) + 1);
            }) + ">";
        });
    }
    function r(e) {
        return e.replace(/<bbcl=[0-9]+ \/\*>/gi, "").replace(/<bbcl=[0-9]+ /gi, "&#91;").replace(/>/gi, "&#93;");
    }
    function o(e) {
        var t = e.text;
        return t = t.replace(c, k);
    }
    function a(e) {
        for (e = e.replace(/\[(?!\*[ =\]]|list([ =][^\]]*)?\]|\/list[\]])/gi, "<"), e = e.replace(/\[(?=list([ =][^\]]*)?\]|\/list[\]])/gi, ">"); e !== (e = e.replace(/>list([ =][^\]]*)?\]([^>]*?)(>\/list])/gi, function(e, t, n) {
            for (var r = e; r !== (r = r.replace(/\[\*\]([^\[]*?)(\[\*\]|>\/list])/i, function(e, t, n) {
                return n = ">/list]" === n.toLowerCase() ? "</*]</list]" : "</*][*]", "<*]" + t + n;
            })); ) ;
            return r = r.replace(/>/g, "<");
        })); ) ;
        return e = e.replace(/</g, "[");
    }
    function l(e) {
        for (;e !== (e = e.replace(u, function(e, t, r, o) {
            return e = e.replace(/\[/g, "<"), e = e.replace(/\]/g, ">"), n(e);
        })); ) ;
        return e;
    }
    var i, s, c, u, g, p, d, f = {}, b = /^(?:https?|file|c):(?:\/{1,3}|\\{1})[-a-zA-Z0-9:;@#%&()~_?\+=\/\\\.]*$/, h = /^(?:aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/, T = /^#?[a-fA-F0-9]{6}$/, m = /[^\s@]+@[^\s@]+\.[^\s@]+/, x = /^([a-z][a-z0-9_]+|"[a-z][a-z0-9_\s]+")$/i, y = [];
    i = {
        b: {
            openTag: function(e, t) {
                return '<span class="xbbcode-b">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        bbcode: {
            openTag: function(e, t) {
                return "";
            },
            closeTag: function(e, t) {
                return "";
            }
        },
        center: {
            openTag: function(e, t) {
                return '<span class="xbbcode-center">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        code: {
            openTag: function(e, t) {
                return '<span class="xbbcode-code">';
            },
            closeTag: function(e, t) {
                return "</span>";
            },
            noParse: !0
        },
        color: {
            openTag: function(e, t) {
                var n = e.substr(1).toLowerCase() || "black";
                return h.lastIndex = 0, T.lastIndex = 0, h.test(n) || (T.test(n) ? "#" !== n.substr(0, 1) && (n = "#" + n) : n = "black"), 
                '<span style="color:' + n + '">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        email: {
            openTag: function(e, t) {
                var n;
                return n = e ? e.substr(1) : t.replace(/<.*?>/g, ""), m.lastIndex = 0, m.test(n) ? '<a href="mailto:' + n + '">' : "<a>";
            },
            closeTag: function(e, t) {
                return "</a>";
            }
        },
        face: {
            openTag: function(e, t) {
                var n = e.substr(1) || "inherit";
                return x.lastIndex = 0, x.test(n) || (n = "inherit"), '<span style="font-family:' + n + '">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        font: {
            openTag: function(e, t) {
                var n = e.substr(1) || "inherit";
                return x.lastIndex = 0, x.test(n) || (n = "inherit"), '<span style="font-family:' + n + '">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        i: {
            openTag: function(e, t) {
                return '<span class="xbbcode-i">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        img: {
            openTag: function(e, t) {
                var n = t;
                return b.lastIndex = 0, b.test(n) || (n = ""), '<img src="' + n + '" />';
            },
            closeTag: function(e, t) {
                return "";
            },
            displayContent: !1
        },
        justify: {
            openTag: function(e, t) {
                return '<span class="xbbcode-justify">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        large: {
            openTag: function(e, t) {
                var e = e || "", n = e.substr(1) || "inherit";
                return h.lastIndex = 0, T.lastIndex = 0, h.test(n) || (T.test(n) ? "#" !== n.substr(0, 1) && (n = "#" + n) : n = "inherit"), 
                '<span class="xbbcode-size-36" style="color:' + n + '">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        left: {
            openTag: function(e, t) {
                return '<span class="xbbcode-left">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        li: {
            openTag: function(e, t) {
                return "<li>";
            },
            closeTag: function(e, t) {
                return "</li>";
            },
            restrictParentsTo: [ "list", "ul", "ol" ]
        },
        list: {
            openTag: function(e, t) {
                return "<ul>";
            },
            closeTag: function(e, t) {
                return "</ul>";
            },
            restrictChildrenTo: [ "*", "li" ]
        },
        noparse: {
            openTag: function(e, t) {
                return "";
            },
            closeTag: function(e, t) {
                return "";
            },
            noParse: !0
        },
        ol: {
            openTag: function(e, t) {
                return "<ol>";
            },
            closeTag: function(e, t) {
                return "</ol>";
            },
            restrictChildrenTo: [ "*", "li" ]
        },
        php: {
            openTag: function(e, t) {
                return '<span class="xbbcode-code">';
            },
            closeTag: function(e, t) {
                return "</span>";
            },
            noParse: !0
        },
        quote: {
            openTag: function(e, t) {
                return "undefined" != typeof e ? '<blockquote><header><cite title="' + e.replace("=", "") + '">' + e.replace("=", "") + "</cite> said:</header><p><em>" : "<blockquote><em>";
            },
            closeTag: function(e, t) {
                return "undefined" != typeof e ? "</em></p></blockquote>" : "</em><p></p></blockquote>";
            }
        },
        right: {
            openTag: function(e, t) {
                return '<span class="xbbcode-right">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        s: {
            openTag: function(e, t) {
                return '<span class="xbbcode-s">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        size: {
            openTag: function(e, t) {
                var n = parseInt(e.substr(1), 10) || 0;
                return (4 > n || n > 40) && (n = 14), '<span class="xbbcode-size-' + n + '">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        small: {
            openTag: function(e, t) {
                var e = e || "", n = e.substr(1) || "inherit";
                return h.lastIndex = 0, T.lastIndex = 0, h.test(n) || (T.test(n) ? "#" !== n.substr(0, 1) && (n = "#" + n) : n = "inherit"), 
                '<span class="xbbcode-size-10" style="color:' + n + '">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        sub: {
            openTag: function(e, t) {
                return "<sub>";
            },
            closeTag: function(e, t) {
                return "</sub>";
            }
        },
        sup: {
            openTag: function(e, t) {
                return "<sup>";
            },
            closeTag: function(e, t) {
                return "</sup>";
            }
        },
        table: {
            openTag: function(e, t) {
                return '<table class="xbbcode-table">';
            },
            closeTag: function(e, t) {
                return "</table>";
            },
            restrictChildrenTo: [ "tbody", "thead", "tfoot", "tr" ]
        },
        tbody: {
            openTag: function(e, t) {
                return "<tbody>";
            },
            closeTag: function(e, t) {
                return "</tbody>";
            },
            restrictChildrenTo: [ "tr" ],
            restrictParentsTo: [ "table" ]
        },
        tfoot: {
            openTag: function(e, t) {
                return "<tfoot>";
            },
            closeTag: function(e, t) {
                return "</tfoot>";
            },
            restrictChildrenTo: [ "tr" ],
            restrictParentsTo: [ "table" ]
        },
        thead: {
            openTag: function(e, t) {
                return '<thead class="xbbcode-thead">';
            },
            closeTag: function(e, t) {
                return "</thead>";
            },
            restrictChildrenTo: [ "tr" ],
            restrictParentsTo: [ "table" ]
        },
        td: {
            openTag: function(e, t) {
                return '<td class="xbbcode-td">';
            },
            closeTag: function(e, t) {
                return "</td>";
            },
            restrictParentsTo: [ "tr" ]
        },
        th: {
            openTag: function(e, t) {
                return '<th class="xbbcode-th">';
            },
            closeTag: function(e, t) {
                return "</th>";
            },
            restrictParentsTo: [ "tr" ]
        },
        tr: {
            openTag: function(e, t) {
                return '<tr class="xbbcode-tr">';
            },
            closeTag: function(e, t) {
                return "</tr>";
            },
            restrictChildrenTo: [ "td", "th" ],
            restrictParentsTo: [ "table", "tbody", "tfoot", "thead" ]
        },
        u: {
            openTag: function(e, t) {
                return '<span class="xbbcode-u">';
            },
            closeTag: function(e, t) {
                return "</span>";
            }
        },
        ul: {
            openTag: function(e, t) {
                return "<ul>";
            },
            closeTag: function(e, t) {
                return "</ul>";
            },
            restrictChildrenTo: [ "*", "li" ]
        },
        url: {
            openTag: function(e, t) {
                var n;
                return n = e ? e.substr(1) : t.replace(/<.*?>/g, ""), b.lastIndex = 0, b.test(n) || (n = "#"), 
                '<a href="' + n + '">';
            },
            closeTag: function(e, t) {
                return "</a>";
            }
        },
        "*": {
            openTag: function(e, t) {
                return "<li>";
            },
            closeTag: function(e, t) {
                return "</li>";
            },
            restrictParentsTo: [ "list", "ul", "ol" ]
        }
    }, e();
    var k = function(e, t, n, o, a) {
        n = n.toLowerCase();
        var l = i[n].noParse ? r(a) : a.replace(c, k), s = i[n].openTag(o, l), u = i[n].closeTag(o, l);
        return i[n].displayContent === !1 && (l = ""), s + l + u;
    };
    return f.tags = function() {
        return i;
    }, f.addTags = function(t) {
        var n;
        for (n in t) i[n] = t[n];
        e();
    }, f.process = function(e) {
        var n = {
            html: "",
            error: !1
        }, r = [];
        for (e.text = e.text.replace(/</g, "&lt;"), e.text = e.text.replace(/>/g, "&gt;"), 
        e.text = e.text.replace(p, function(e, t, n, r) {
            return "<" + n + ">";
        }), e.text = e.text.replace(d, function(e, t, n, r) {
            return "<" + n + ">";
        }), e.text = e.text.replace(/\[/g, "&#91;"), e.text = e.text.replace(/\]/g, "&#93;"), 
        e.text = e.text.replace(/</g, "["), e.text = e.text.replace(/>/g, "]"); e.text !== (e.text = e.text.replace(g, function(e, t, n, r) {
            return r = r.replace(/\[/g, "&#91;"), r = r.replace(/\]/g, "&#93;"), n = n || "", 
            r = r || "", "[" + t + n + "]" + r + "[/" + t + "]";
        })); ) ;
        return e.text = a(e.text), e.text = l(e.text), r = t("bbcode", e.text, -1, "", "", e.text), 
        n.html = o(e), -1 === n.html.indexOf("[") && -1 === n.html.indexOf("]") || r.push("Some tags appear to be misaligned."), 
        e.removeMisalignedTags && (n.html = n.html.replace(/\[.*?\]/g, "")), e.addInLineBreaks && (n.html = '<div style="white-space:pre-wrap;">' + n.html + "</div>"), 
        n.html = n.html.replace("&#91;", "["), n.html = n.html.replace("&#93;", "]"), n.error = 0 !== r.length, 
        n.errorQueue = r, n;
    }, f;
}();