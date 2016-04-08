/*
Copyright (C) 2011 Patrick Gillespie, http://patorjk.com/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
    Extendible BBCode Parser v1.0.0
    By Patrick Gillespie (patorjk@gmail.com)
    Website: http://patorjk.com/

    This module allows you to parse BBCode and to extend to the mark-up language
    to add in your own tags.
*/



var XBBCODE = (function() {

    // -----------------------------------------------------------------------------
    // Set up private variables
    // -----------------------------------------------------------------------------

    var me = {},
        urlPattern = /^(?:https?|file|c):(?:\/{1,3}|\\{1})[-a-zA-Z0-9:;@#%&()~_?\+=\/\\\.]*$/,
        colorNamePattern = /^(?:aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/,
        colorCodePattern = /^#?[a-fA-F0-9]{6}$/,
        emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/,
        fontFacePattern = /^([a-z][a-z0-9_]+|"[a-z][a-z0-9_\s]+")$/i,
        tags,
        tagList,
        tagsNoParseList = [],
        bbRegExp,
        pbbRegExp,
        pbbRegExp2,
        openTags,
        closeTags;

    /* -----------------------------------------------------------------------------
     * tags
     * This object contains a list of tags that your code will be able to understand.
     * Each tag object has the following properties:
     *
     *   openTag - A function that takes in the tag's parameters (if any) and its
     *             contents, and returns what its HTML open tag should be.
     *             Example: [color=red]test[/color] would take in "=red" as a
     *             parameter input, and "test" as a content input.
     *             It should be noted that any BBCode inside of "content" will have
     *             been processed by the time it enter the openTag function.
     *
     *   closeTag - A function that takes in the tag's parameters (if any) and its
     *              contents, and returns what its HTML close tag should be.
     *
     *   displayContent - Defaults to true. If false, the content for the tag will
     *                    not be displayed. This is useful for tags like IMG where
     *                    its contents are actually a parameter input.
     *
     *   restrictChildrenTo - A list of BBCode tags which are allowed to be nested
     *                        within this BBCode tag. If this property is omitted,
     *                        any BBCode tag may be nested within the tag.
     *
     *   restrictParentsTo - A list of BBCode tags which are allowed to be parents of
     *                       this BBCode tag. If this property is omitted, any BBCode
     *                       tag may be a parent of the tag.
     *
     *   noParse - true or false. If true, none of the content WITHIN this tag will be
     *             parsed by the XBBCode parser.
     *
     *
     *
     * LIMITIONS on adding NEW TAGS:
     *  - Tag names should be alphanumeric (including underscores) and all tags should have an opening tag
     *    and a closing tag.
     *    The [*] tag is an exception because it was already a standard
     *    bbcode tag. Technecially tags don't *have* to be alphanumeric, but since
     *    regular expressions are used to parse the text, if you use a non-alphanumeric
     *    tag names, just make sure the tag name gets escaped properly (if needed).
     * --------------------------------------------------------------------------- */

    tags = {
        "b": {
            openTag: function(params,content) {
                return '<span class="xbbcode-b">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        /*
            This tag does nothing and is here mostly to be used as a classification for
            the bbcode input when evaluating parent-child tag relationships
        */
        "bbcode": {
            openTag: function(params,content) {
                return '';
            },
            closeTag: function(params,content) {
                return '';
            }
        },
        "center": {
            openTag: function(params,content) {
                return '<span class="xbbcode-center">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },

        "code": {
            openTag: function(params,content) {
                return '<span class="xbbcode-code">';
            },
            closeTag: function(params,content) {
                return '</span>';
            },
            noParse: true
        },
        "color": {
            openTag: function(params,content) {

                var colorCode = (params.substr(1)).toLowerCase() || "black";
                colorNamePattern.lastIndex = 0;
                colorCodePattern.lastIndex = 0;
                if ( !colorNamePattern.test( colorCode ) ) {
                    if ( !colorCodePattern.test( colorCode ) ) {
                        colorCode = "black";
                    } else {
                        if (colorCode.substr(0,1) !== "#") {
                            colorCode = "#" + colorCode;
                        }
                    }
                }

                return '<span style="color:' + colorCode + '">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "email": {
            openTag: function(params,content) {

                var myEmail;

                if (!params) {
                    myEmail = content.replace(/<.*?>/g,"");
                } else {
                    myEmail = params.substr(1);
                }

                emailPattern.lastIndex = 0;
                if ( !emailPattern.test( myEmail ) ) {
                    return '<a>';
                }

                return '<a href="mailto:' + myEmail + '">';
            },
            closeTag: function(params,content) {
                return '</a>';
            }
        },
        "face": {
            openTag: function(params,content) {

                var faceCode = params.substr(1) || "inherit";
                fontFacePattern.lastIndex = 0;
                if ( !fontFacePattern.test( faceCode ) ) {
                        faceCode = "inherit";
                }
                return '<span style="font-family:' + faceCode + '">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },


        "font": {
            openTag: function(params,content) {

                var faceCode = params.substr(1) || "inherit";
                fontFacePattern.lastIndex = 0;
                if ( !fontFacePattern.test( faceCode ) ) {
                        faceCode = "inherit";
                }
                return '<span style="font-family:' + faceCode + '">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },

        "i": {
            openTag: function(params,content) {
                return '<span class="xbbcode-i">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "img": {
            openTag: function(params,content) {

                var myUrl = content;

                urlPattern.lastIndex = 0;
                if ( !urlPattern.test( myUrl ) ) {
                    myUrl = "";
                }

                return '<img src="' + myUrl + '" />';
            },
            closeTag: function(params,content) {
                return '';
            },
            displayContent: false
        },
        "justify": {
            openTag: function(params,content) {
                return '<span class="xbbcode-justify">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "large": {
            openTag: function(params,content) {
				var params = params || '';
				var colorCode = params.substr(1) || "inherit";
                colorNamePattern.lastIndex = 0;
                colorCodePattern.lastIndex = 0;
                if ( !colorNamePattern.test( colorCode ) ) {
                    if ( !colorCodePattern.test( colorCode ) ) {
                        colorCode = "inherit";
                    } else {
                        if (colorCode.substr(0,1) !== "#") {
                            colorCode = "#" + colorCode;
                        }
                    }
                }


                return '<span class="xbbcode-size-36" style="color:' + colorCode + '">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "left": {
            openTag: function(params,content) {
                return '<span class="xbbcode-left">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "li": {
            openTag: function(params,content) {
                return "<li>";
            },
            closeTag: function(params,content) {
                return "</li>";
            },
            restrictParentsTo: ["list","ul","ol"]
        },
        "list": {
            openTag: function(params,content) {
                return '<ul>';
            },
            closeTag: function(params,content) {
                return '</ul>';
            },
            restrictChildrenTo: ["*", "li"]
        },
        "noparse": {
            openTag: function(params,content) {
                return '';
            },
            closeTag: function(params,content) {
                return '';
            },
            noParse: true
        },
        "ol": {
            openTag: function(params,content) {
                return '<ol>';
            },
            closeTag: function(params,content) {
                return '</ol>';
            },
            restrictChildrenTo: ["*", "li"]
        },
        "php": {
            openTag: function(params,content) {
                return '<span class="xbbcode-code">';
            },
            closeTag: function(params,content) {
                return '</span>';
            },
            noParse: true
        },
        "quote": {
            openTag: function(params,content) {
                //console.log(params);
                return '<blockquote><header><cite title="' + params.replace("=", "") + '">' + params.replace("=", "") + '</cite> said:</header><p><em>';
            },
            closeTag: function(params,content) {
                return '</em></p></blockquote>';
            }
        },
        "right": {
            openTag: function(params,content) {
                return '<span class="xbbcode-right">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "s": {
            openTag: function(params,content) {
                return '<span class="xbbcode-s">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "size": {
            openTag: function(params,content) {

                var mySize = parseInt(params.substr(1),10) || 0;
                if (mySize < 4 || mySize > 40) {
                    mySize = 14;
                }

                return '<span class="xbbcode-size-' + mySize + '">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "small": {
            openTag: function(params,content) {
				var params = params || '';
				var colorCode = params.substr(1) || "inherit";
                colorNamePattern.lastIndex = 0;
                colorCodePattern.lastIndex = 0;
                if ( !colorNamePattern.test( colorCode ) ) {
                    if ( !colorCodePattern.test( colorCode ) ) {
                        colorCode = "inherit";
                    } else {
                        if (colorCode.substr(0,1) !== "#") {
                            colorCode = "#" + colorCode;
                        }
                    }
                }

                return '<span class="xbbcode-size-10" style="color:' + colorCode + '">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },

        "sub": {
            openTag: function(params,content) {
                return '<sub>';
            },
            closeTag: function(params,content) {
                return '</sub>';
            }
        },
        "sup": {
            openTag: function(params,content) {
                return '<sup>';
            },
            closeTag: function(params,content) {
                return '</sup>';
            }
        },

        "table": {
            openTag: function(params,content) {
                return '<table class="xbbcode-table">';
            },
            closeTag: function(params,content) {
                return '</table>';
            },
            restrictChildrenTo: ["tbody","thead", "tfoot", "tr"]
        },
        "tbody": {
            openTag: function(params,content) {
                return '<tbody>';
            },
            closeTag: function(params,content) {
                return '</tbody>';
            },
            restrictChildrenTo: ["tr"],
            restrictParentsTo: ["table"]
        },
        "tfoot": {
            openTag: function(params,content) {
                return '<tfoot>';
            },
            closeTag: function(params,content) {
                return '</tfoot>';
            },
            restrictChildrenTo: ["tr"],
            restrictParentsTo: ["table"]
        },
        "thead": {
            openTag: function(params,content) {
                return '<thead class="xbbcode-thead">';
            },
            closeTag: function(params,content) {
                return '</thead>';
            },
            restrictChildrenTo: ["tr"],
            restrictParentsTo: ["table"]
        },
        "td": {
            openTag: function(params,content) {
                return '<td class="xbbcode-td">';
            },
            closeTag: function(params,content) {
                return '</td>';
            },
            restrictParentsTo: ["tr"]
        },
        "th": {
            openTag: function(params,content) {
                return '<th class="xbbcode-th">';
            },
            closeTag: function(params,content) {
                return '</th>';
            },
            restrictParentsTo: ["tr"]
        },
        "tr": {
            openTag: function(params,content) {
                return '<tr class="xbbcode-tr">';
            },
            closeTag: function(params,content) {
                return '</tr>';
            },
            restrictChildrenTo: ["td","th"],
            restrictParentsTo: ["table","tbody","tfoot","thead"]
        },
        "u": {
            openTag: function(params,content) {
                return '<span class="xbbcode-u">';
            },
            closeTag: function(params,content) {
                return '</span>';
            }
        },
        "ul": {
            openTag: function(params,content) {
                return '<ul>';
            },
            closeTag: function(params,content) {
                return '</ul>';
            },
            restrictChildrenTo: ["*", "li"]
        },
        "url": {
            openTag: function(params,content) {

                var myUrl;

                if (!params) {
                    myUrl = content.replace(/<.*?>/g,"");
                } else {
                    myUrl = params.substr(1);
                }

                urlPattern.lastIndex = 0;
                if ( !urlPattern.test( myUrl ) ) {
                    myUrl = "#";
                }

                return '<a href="' + myUrl + '">';
            },
            closeTag: function(params,content) {
                return '</a>';
            }
        },
        /*
            The [*] tag is special since the user does not define a closing [/*] tag when writing their bbcode.
            Instead this module parses the code and adds the closing [/*] tag in for them. None of the tags you
            add will act like this and this tag is an exception to the others.
        */
        "*": {
            openTag: function(params,content) {
                return "<li>";
            },
            closeTag: function(params,content) {
                return "</li>";
            },
            restrictParentsTo: ["list","ul","ol"]
        }
    };

    // create tag list and lookup fields
    function initTags() {
        tagList = [];
        var prop,
            ii,
            len;
        for (prop in tags) {
            if (tags.hasOwnProperty(prop)) {
                if (prop === "*") {
                    tagList.push("\\" + prop);
                } else {
                    tagList.push(prop);
                    if ( tags[prop].noParse ) {
                        tagsNoParseList.push(prop);
                    }
                }

                tags[prop].validChildLookup = {};
                tags[prop].validParentLookup = {};
                tags[prop].restrictParentsTo = tags[prop].restrictParentsTo || [];
                tags[prop].restrictChildrenTo = tags[prop].restrictChildrenTo || [];

                len = tags[prop].restrictChildrenTo.length;
                for (ii = 0; ii < len; ii++) {
                    tags[prop].validChildLookup[ tags[prop].restrictChildrenTo[ii] ] = true;
                }
                len = tags[prop].restrictParentsTo.length;
                for (ii = 0; ii < len; ii++) {
                    tags[prop].validParentLookup[ tags[prop].restrictParentsTo[ii] ] = true;
                }
            }
        }

        bbRegExp = new RegExp("<bbcl=([0-9]+) (" + tagList.join("|") + ")([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>", "gi");
        pbbRegExp = new RegExp("\\[(" + tagList.join("|") + ")([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]", "gi");
        pbbRegExp2 = new RegExp("\\[(" + tagsNoParseList.join("|") + ")([ =][^\\]]*?)?\\]([\\s\\S]*?)\\[/\\1\\]", "gi");

        // create the regex for escaping ['s that aren't apart of tags
        (function() {
            var closeTagList = [];
            for (var ii = 0; ii < tagList.length; ii++) {
                if ( tagList[ii] !== "\\*" ) { // the * tag doesn't have an offical closing tag
                    closeTagList.push ( "/" + tagList[ii] );
                }
            }

            openTags = new RegExp("(\\[)((?:" + tagList.join("|") + ")(?:[ =][^\\]]*?)?)(\\])", "gi");
            closeTags = new RegExp("(\\[)(" + closeTagList.join("|") + ")(\\])", "gi");
        })();

    };
    initTags();

    // -----------------------------------------------------------------------------
    // private functions
    // -----------------------------------------------------------------------------

    function checkParentChildRestrictions(parentTag, bbcode, bbcodeLevel, tagName, tagParams, tagContents, errQueue) {

        errQueue = errQueue || [];
        bbcodeLevel++;

        // get a list of all of the child tags to this tag
        var reTagNames = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])","gi"),
            reTagNamesParts = new RegExp("(<bbcl=" + bbcodeLevel + " )(" + tagList.join("|") + ")([ =>])","i"),
            matchingTags = tagContents.match(reTagNames) || [],
            cInfo,
            errStr,
            ii,
            childTag,
            pInfo = tags[parentTag] || {};

        reTagNames.lastIndex = 0;

        if (!matchingTags) {
            tagContents = "";
        }

        for (ii = 0; ii < matchingTags.length; ii++) {
            reTagNamesParts.lastIndex = 0;
            childTag = (matchingTags[ii].match(reTagNamesParts))[2].toLowerCase();

            if ( pInfo && pInfo.restrictChildrenTo && pInfo.restrictChildrenTo.length > 0 ) {
                if ( !pInfo.validChildLookup[childTag] ) {
                    errStr = "The tag \"" + childTag + "\" is not allowed as a child of the tag \"" + parentTag + "\".";
                    errQueue.push(errStr);
                }
            }
            cInfo = tags[childTag] || {};
            if ( cInfo.restrictParentsTo.length > 0 ) {
                if ( !cInfo.validParentLookup[parentTag] ) {
                    errStr = "The tag \"" + parentTag + "\" is not allowed as a parent of the tag \"" + childTag + "\".";
                    errQueue.push(errStr);
                }
            }

        }

        tagContents = tagContents.replace(bbRegExp, function(matchStr, bbcodeLevel, tagName, tagParams, tagContents ) {
            errQueue = checkParentChildRestrictions(tagName.toLowerCase(), matchStr, bbcodeLevel, tagName, tagParams, tagContents, errQueue);
            return matchStr;
        });
        return errQueue;
    }

    /*
        This function updates or adds a piece of metadata to each tag called "bbcl" which
        indicates how deeply nested a particular tag was in the bbcode. This property is removed
        from the HTML code tags at the end of the processing.
    */
    function updateTagDepths(tagContents) {
        tagContents = tagContents.replace(/\<([^\>][^\>]*?)\>/gi, function(matchStr, subMatchStr) {
            var bbCodeLevel = subMatchStr.match(/^bbcl=([0-9]+) /);
            if (bbCodeLevel === null) {
                return "<bbcl=0 " + subMatchStr + ">";
            } else {
                return "<" + subMatchStr.replace(/^(bbcl=)([0-9]+)/, function(matchStr, m1, m2) {
                    return m1 + (parseInt(m2, 10) + 1);
                }) + ">";
            }
        });
        return tagContents;
    }

    /*
        This function removes the metadata added by the updateTagDepths function
    */
    function unprocess(tagContent) {
        return tagContent.replace(/<bbcl=[0-9]+ \/\*>/gi,"").replace(/<bbcl=[0-9]+ /gi,"&#91;").replace(/>/gi,"&#93;");
    }

    var replaceFunct = function(matchStr, bbcodeLevel, tagName, tagParams, tagContents) {

        tagName = tagName.toLowerCase();

        var processedContent = tags[tagName].noParse ? unprocess(tagContents) : tagContents.replace(bbRegExp, replaceFunct),
            openTag = tags[tagName].openTag(tagParams,processedContent),
            closeTag = tags[tagName].closeTag(tagParams,processedContent);

        if ( tags[tagName].displayContent === false) {
            processedContent = "";
        }

        return openTag + processedContent + closeTag;
    };

    function parse(config) {
        var output = config.text;
        output = output.replace(bbRegExp, replaceFunct);
        return output;
    }

    /*
        The star tag [*] is special in that it does not use a closing tag. Since this parser requires that tags to have a closing
        tag, we must pre-process the input and add in closing tags [/*] for the star tag.
        We have a little levaridge in that we know the text we're processing wont contain the <> characters (they have been
        changed into their HTML entity form to prevent XSS and code injection), so we can use those characters as markers to
        help us define boundaries and figure out where to place the [/*] tags.
    */
    function fixStarTag(text) {
        text = text.replace(/\[(?!\*[ =\]]|list([ =][^\]]*)?\]|\/list[\]])/ig, "<");
        text = text.replace(/\[(?=list([ =][^\]]*)?\]|\/list[\]])/ig, ">");

        while (text !== (text = text.replace(/>list([ =][^\]]*)?\]([^>]*?)(>\/list])/gi, function(matchStr,contents,endTag) {

            var innerListTxt = matchStr;
            while (innerListTxt !== (innerListTxt = innerListTxt.replace(/\[\*\]([^\[]*?)(\[\*\]|>\/list])/i, function(matchStr,contents,endTag) {
                if (endTag.toLowerCase() === ">/list]") {
                    endTag = "</*]</list]";
                } else {
                    endTag = "</*][*]";
                }
                return "<*]" + contents + endTag;
            })));

            innerListTxt = innerListTxt.replace(/>/g, "<");
            return innerListTxt;
        })));

        // add ['s for our tags back in
        text = text.replace(/</g, "[");
        return text;
    }

    function addBbcodeLevels(text) {
        while ( text !== (text = text.replace(pbbRegExp, function(matchStr, tagName, tagParams, tagContents) {
            matchStr = matchStr.replace(/\[/g, "<");
            matchStr = matchStr.replace(/\]/g, ">");
            return updateTagDepths(matchStr);
        })) );
        return text;
    }

    // -----------------------------------------------------------------------------
    // public functions
    // -----------------------------------------------------------------------------

    // API, Expose all available tags
    me.tags = function() {
        return tags;
    }

    // API
    me.addTags = function(newtags) {
        var tag;
        for (tag in newtags) {
            tags[tag] = newtags[tag];
        }
        initTags();
    }

    me.process = function(config) {

        var ret = {html: "", error: false},
            errQueue = [];

        config.text = config.text.replace(/</g, "&lt;"); // escape HTML tag brackets
        config.text = config.text.replace(/>/g, "&gt;"); // escape HTML tag brackets

        config.text = config.text.replace(openTags, function(matchStr, openB, contents, closeB) {
            return "<" + contents + ">";
        });
        config.text = config.text.replace(closeTags, function(matchStr, openB, contents, closeB) {
            return "<" + contents + ">";
        });

        config.text = config.text.replace(/\[/g, "&#91;"); // escape ['s that aren't apart of tags
        config.text = config.text.replace(/\]/g, "&#93;"); // escape ['s that aren't apart of tags
        config.text = config.text.replace(/</g, "["); // escape ['s that aren't apart of tags
        config.text = config.text.replace(/>/g, "]"); // escape ['s that aren't apart of tags

        // process tags that don't have their content parsed
        while ( config.text !== (config.text = config.text.replace(pbbRegExp2, function(matchStr, tagName, tagParams, tagContents) {
            tagContents = tagContents.replace(/\[/g, "&#91;");
            tagContents = tagContents.replace(/\]/g, "&#93;");
            tagParams = tagParams || "";
            tagContents = tagContents || "";
            return "[" + tagName + tagParams + "]" + tagContents + "[/" + tagName + "]";
        })) );

        config.text = fixStarTag(config.text); // add in closing tags for the [*] tag
        config.text = addBbcodeLevels(config.text); // add in level metadata

        errQueue = checkParentChildRestrictions("bbcode", config.text, -1, "", "", config.text);

        ret.html = parse(config);;

        if ( ret.html.indexOf("[") !== -1 || ret.html.indexOf("]") !== -1) {
            errQueue.push("Some tags appear to be misaligned.");
        }

        if (config.removeMisalignedTags) {
            ret.html = ret.html.replace(/\[.*?\]/g,"");
        }
        if (config.addInLineBreaks) {
            ret.html = '<div style="white-space:pre-wrap;">' + ret.html + '</div>';
        }

        ret.html = ret.html.replace("&#91;", "["); // put ['s back in
        ret.html = ret.html.replace("&#93;", "]"); // put ['s back in

        ret.error = errQueue.length !== 0;
        ret.errorQueue = errQueue;

        return ret;
    };

    return me;
})();

	// April fools day shit
	// if you're reading my source code, don't tell anyone about the shenanigans. feel free to contact me and i'll validate your awesomeness
var date = new Date();
// Check if April 1
if (date.getDate() === 1 && date.getMonth() === 3) {
	document.title = 'Drug Band Message Board';
	$(function() {
		$(".topic_header .require_logged_in").after('<span class="usr_tools"><a href="#" id="bump" title="Bump">Bump</a><a href="#" id="diaf" title="DIAF">DIAF</a><a href="#" id="kys" title="KYS">KYS</a><a href="#" id="nam" title="NAM">Nam</a></span>');
		$(".poster_name a").each(function() {
			var name = $(this).text();
			if (!name.match(/^.*420.*$/))
				$(this).html(name+420);
			else
				$(this).html(name+" (I really have 420 in my name)");
		});

		$("#kys, #diaf, #nam").live("click", function() {
				var text = $(this).html();
				if (text === 'Nam')
					text = 'http://i.imgur.com/znUlc.jpg';
				$("#post_body").html(text);
				$.post("https://" + window.location.host + window.location.pathname, $("#new_post").serialize(), function(data) {
					mt = true;
					$("#post_body").val("");
					$("#post_submit").val("Post Reply").removeAttr("disabled");
					afterAjax();
				});
			//});
		});
	});
}
	// End April Fools Day

	var bandsObj = {"phish": 1}, i, ii, iii, posts, postsrefs, userData, tempUserData, postBody, tableBody, showSet, colorSet, quotesSet, videoSet, setScroll, reloadTopic, mythreads, mt, lastele, originalColor, overlap;
			$(document).ready(function() {
				var tCMT = setTimeout("checkMT()", 2000);
				var tASD = setTimeout("addScrollDown()", 2000);
				var tAPT = setTimeout("addPrintThread()", 2500);
			});

			function checkMT() {
				var topic = $("#post-listing .topic_title").text();
				var mt = false;
				$.get("https://www.phantasytour.com/api/bands/" + bandsObj[location.pathname.split('/')[2]] + "/mythreads?skip=0&pageSize=40", function(data) {
					mythreads = data.aaData;
					for (var i=0; i < mythreads.length; i+=1) {
						if (mythreads[i]["Subject"] === topic) {
							mt = true;
						}
					}
					if (mt) {
						$("#bottom-pagination-container div a:contains('MT')").html($("#bottom-pagination-container div a:contains('MT')").html() + '✔');
						$(".topic_header div a:contains('MT')").html($(".topic_header div a:contains('MT')").html() + '✔');
					}
				});
			}

			var num;
			$("ul.pagination li a, button.load-more-button").live("mouseup", function() {
				num = $(".post").length;
				var t = setTimeout("checkLoad()", 3500);
		
			});
		
			function checkLoad() {
				replaceLinks();

			}

			$(document).ajaxComplete(function() {
				num = $(".post").length;
				var t = setTimeout("checkLoad()", 3500);
			});

			function addScrollDown() {
				$(".topic_header .mod_tools > a:last").after('<span class="usr_tools"><a href="#" id="scrollDown" title="Go Down">Down</a></span>');

				$("#scrollDown").live("click", function (e) {
					e.preventDefault();
					$('html, body').animate({
						scrollTop: $("#applicationHost").height()
					}, "slow");
				});
			}

			function filterByAuthorID(obj) {
				return obj.id == this.authorId;
			}

			function filterForThreadSubject(obj) {
				return obj.type == "Thread";
			}

			function createPrintPage() {
				var filteredpostsrefs, date, dateCreated;
				tableBody = '', tableHead = '', postBody = '';
				for (iii = 0; iii < posts.length; iii += 1) {//console.log(tempUserData[posts[iii]["authorId"]]);
					if (iii === 0) {
						filteredpostsrefs = postsrefs.filter(filterForThreadSubject);
						tableHead += '<tr><th class="pthead" colspan="2"><span>Thread Subject: ' + filteredpostsrefs[0]["subject"] + '</span><br>Thread ID: ' + filteredpostsrefs[0]["id"] + '</th></tr>';
					}

					filteredpostsrefs = postsrefs.filter(filterByAuthorID, {"authorId": posts[iii]["authorId"]});
					date = new Date(posts[iii]["dateCreated"]);
					dateCreated = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

					postBody = XBBCODE.process({text: posts[iii]["body"], removeMisalignedTags: false, addInLineBreaks: false});

					tableBody += '<tr id="post' + posts[iii]["id"] + '"><td class="ptdata"><span>' + filteredpostsrefs[0]["username"] + '</span><br>' + dateCreated + '</td><td class="ptpost">' + postBody.html + '</td></tr>';
				}
				var opened = window.open('');
				opened.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>My title</title><style type="text/css">blockquote{border:1px solid rgba(221,221,221,.5);padding:3px;margin:6px 15px;}th{font-weight:normal;}td.ptdata,th.pthead{font-size:11px;vertical-align:top;}th.pthead{text-align:left;}td.ptdata{text-align:right;width:150px;padding-bottom:15px;border-top:1px solid rgba(221,221,221,.5);}td.ptdata span,th.pthead span{font-size:12px;font-weight:bold;}td.ptpost{vertical-align:top;font-size:12px;padding-bottom:15px;border-top:1px solid rgba(221,221,221,.5);}</style></head><body><table><thead>' + tableHead + '</thead><tbody>' + tableBody + '</tbody></table></body></html>');
			}

			function addPrintThread() {
				$(".topic_header .mod_tools > span a#scrollDown").after('<a href="#" id="printThread" title="Print Thread">Print</a>');
				
				$("#printThread").live("click", function (e) {
					e.preventDefault();

					$.get("https://www.phantasytour.com/api/bands/" + bandsObj[location.pathname.split('/')[2]] + "/threads/" + location.pathname.split('/')[4] + "/posts?limit=499&skip=0", function(data) {
						posts = data.data;
						postsrefs = data.references;
						createPrintPage();
					});
				});
			}

			$("#bump").live("click", function () {
				//$.get("http://www.phishvids.com/bump.php", function(data) {
					$("#new_post textarea").html("Bump");
					$.post("https://" + window.location.host + window.location.pathname, $("#new_post").serialize(), function(data) {
						mt = true;
						$("#new_post textarea").val("");
						$('button[data-bind*="click: postReply"]').text("Post Reply").removeAttr("disabled");
						afterAjax();
					});
				//});
			});
		
			$("#bottom-pagination-container div + div > a:last").prev('a').attr("onclick", "").click(function() {
				$('html, body').animate({
					scrollTop: 0
				}, "slow");
			});
		
			$("#bottom-pagination-container div + div > a:last").attr("onclick", "").live("click", function() {
				afterAjax();
				return false;
			});
		
			$(".posts_footer a:nth(1), .topic_header .require_logged_in a").attr("onclick", "").live("click", function() {
				$.post("/topic_bookmarks?topic_bookmark%5Btopic_id%5D=" + topic, function() {
					$(".posts_footer .require_logged_in").css("color", "#757575").html('✔');
					$(".topic_header .require_logged_in").css({
						"float": "right",
						"font-size": "9px",
						"padding": "4px 4px"
					}).html('✔');
					mt = true;
				});
				return false;
			});
		
			function afterAjax() {
				$("#boards_ajax_container").load("https://" + window.location.host + window.location.pathname + " #boards_ajax_container > *", function() {
					$(".posts_footer a:last").attr("onclick", "");
					$(".topic_header .require_logged_in").after('<span class="usr_tools"><a href="#" id="scrollDown" title="Go Down">Down</a></span>');
					if (mt) {
						$(".posts_footer .require_logged_in").css("color", "#757575").html('✔');
						$(".topic_header .require_logged_in").css({
							"float": "right",
							"font-size": "9px",
							"padding": "4px 4px"
						}).html('✔');
					}
					$(".posts_footer a:last").prev('a').attr("onclick", "").click(function() {
						$('html, body').animate({
							scrollTop: 0
						}, "slow");
					});
					findHidden();
					replaceLinks();
					//alert($('script[src*=pt_js_cached]').attr("src"));
					//$("head").append("<script type='text/javascript' src='"+$('script[src*=pt_js_cached]').attr("src")+"'>setup_show_tooltips()</script>");
				});
			}
		
			function showOverlap() {
				for (var i = 0; i < overlap; i++) {
					$(".overlap_post:nth(" + (4 - i) + ")").show();
				}
			}
		
			function replaceLinks() {
		/*$.post("http://"+window.location.host + window.location.pathname, {authenticity_token: $('input[name*="authenticity_token"]').val(), post_body:"testing123",post_topic_id: topic,commit: "Post Reply"}, function(data) {
						alert(data);
					});*/
				$("a[href$='.jpg'], a[href$='.jpeg'], a[href$='.png'], a[href$='.gif']").each(function(i) {
					var href = $(this).attr('href');
					var text = $(this).text();
					originalColor = $(this).css("color");
					var stringer = "";
					if (text != href) {
						stringer = text;
					}
					if (showSet === "load" && ($(this).parents("em").css("font-style") != "italic" || quotesSet === "qyes")) {
						$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='ptimg" + i + "' src='" + href + "' alt='' style='max-width:100%;' />");
					} else {
						$(this).css("color", "#" + colorSet).attr("class", "ptimg" + i).click(function() {
							$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
							return false;
						});
					}
					$("#ptimg" + i).error(function() {
						$(this).hide().parent("a").css("color", originalColor);
					});
				});
				var temp = true;
				if ($("a[href*='youtube'], a[href*='youtu.be'], a[href*='vimeo']").length >= 10) {
					temp = false;
				}
				$("a[href*='youtube'], a[href*='youtu.be']").each(function(i) {
					var href = $(this).attr("href");
					var text = $(this).text().replace("amp;", "");
					var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
					var id = href.match(myregexp); //^[^v]+v.(.{11}).*
					if (id == null) return;
					else id = id[1];
					var stringer = "";
					if (text != href) {
						stringer = text;
					}
					//console.log(id);
					var objectstr = '<iframe class="youtube-player" type="text/html" width="100%" height="385" src="https://www.youtube.com/embed/' + id + '" frameborder="0"></iframe>';
		
					if ((videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") != "italic" || quotesSet === "qyes")) {
						$(this).css("color", "black").html(stringer + objectstr);
					} else {
						$(this).css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + objectstr);
							return false;
						});
					}
				});
				$("a[href*='vimeo']").each(function(i) {
					var href = $(this).attr("href");
					var text = $(this).text();
					var id = href.match(/[0-9]+/, "");
					var objectstr = '<iframe class="vimeo-player" src="https://player.vimeo.com/video/' + id + '?portrait=0" width="100%" height="335" frameborder="0"></iframe>';
					var stringer = "";
					if (text != href) {
						stringer = text;
					}
					if ((videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") != "italic" || quotesSet === "qyes")) {
						$(this).css("color", "black").html(stringer + objectstr);
					} else {
						$(this).css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + objectstr);
							return false;
						});
					}
				});
				$(".post:not(:hidden):even").removeClass("even").addClass("odd");
				$(".post:not(:hidden):odd").removeClass("odd").addClass("even");
				if (scrollSet != "false") {
					$(".post_body_container").css("max-height", "none");
				}
			}
		
			function getNumber(s) {
				var string = new Array();
				for (var i = 1; i < s.length; i++) {
					if (parseInt(s.slice(-i)) >= 0) {
						string = s.slice(-i);
					} else {
						break;
					}
				}
				return string;
			}
		
			function checkOc(s, y) {
				var number = 0;
				while (s.indexOf(y, 0) >= 0) {
					number++;
					s = s.replace(y, "");
				}
				return number;
			}
		
			function findHidden() {
				$("script[src=]").each(function() {
					var text = $(this).text();
					var index = text.indexOf("PT.board_overlap_window");
					if (text.indexOf("set_hidden_authors") >= 0) {
						for (var i = 0; i < text.length; i++) {
							if (text.slice(i, i + 2) === "([") {
								var hide = text.slice(i + 1, -11);
								hidePosts(eval(hide));
								break;
							}
						}
					} else if (index >= 0) {
						overlap = text.slice(index + 26, index + 27);
						showOverlap();
						return;
					}
				});
			}
		
			function hidePosts(a) {
				for (var i = 0; i < a.length; i++) {
					$(".author_" + a[i]).hide();
				}
			}
		
			$("img").live("mousedown", function() {
				lastele = $(this);
			});
		
			chrome.extension.sendRequest({
				set: "show"
			}, function(response) {
				showSet = response.setShow;
				colorSet = response.setColor;
				quotesSet = response.setQuotes;
				videoSet = response.setVideo;
				reloadTopic = response.setReload;
				scrollSet = response.setScroll;
				if (reloadTopic != "false") {
					$("#post_submit").type = "button";
					$("#post_submit").attr("onclick", "return false;").live("click", function() {
						$(this).val("Posting...").attr('disabled', 'disabled');
						$("#errorExplanation").remove();
						if (checkOc($("#post_body").val(), "quote") > 8) {
		
							$("#boards_ajax_container").after('<div class="errorExplanation" id="errorExplanation"><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>You cannot have more than 4 quotes.</li></ul></div>');
							$("#post_submit").val("Post Reply").removeAttr("disabled");
							return false;
						}
						if ($("#post_body").val().length < 1) {
							var errorHTML = "<div class='errorExplanation' id='errorExplanation'><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>Body is too short (minimum is 2 characters)</li></ul></div>";
							$("#boards_ajax_container").after(errorHTML);
							return false;
						} else if ($("#post_body").val().length < 2) {
							$("#post_body").val($("#post_body").val() + " ")
						}
						$.post("http://" + window.location.host + window.location.pathname, $("#new_post").serialize(), function(data) {
							mt = true;
							$("#post_body").val("");
							$("#post_submit").val("Post Reply").removeAttr("disabled");
							afterAjax();
						});
					});
				}
				if (!colorSet) {
					colorSet = "0000FF";
				}
				replaceLinks();
			});
		
			chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
				if (request.run === "replaceLinks") {
					var videoset2 = videoSet;
					var showset2 = showSet;
					showSet = "load";
					videoSet = "vload";
					replaceLinks();
					showSet = showset2;
					videoSet = videoset2;
				} else if (request.run === "close") {
					var par = lastele.parent("a");
					lastele.remove();
					var href = par.attr("href");
					var stringer = par.text();
					if (par.text().length === 0) {
						par.html(href);
					}
					par.css("color", "#" + colorSet).click(function() {
						$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
						return false;
					});
				} else if (request.run === "closeAll") {
					$(".addedPTImages").each(function() {
						var par = $(this).parent("a");
						$(this).remove();
						var href = par.attr("href");
						var stringer = par.text();
						if (par.text().length === 0) {
							par.html(href);
						}
						par.css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
							return false;
						});
					});
					$(".youtube-player").each(function() {
						var par = $(this).parent("a");
						$(this).remove();
						var href = par.attr("href");
						var stringer = par.text();
						if (par.text().length === 0) {
							par.html(href);
						}
						par.css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
							return false;
						});
					});
					$(".vimeo-player").each(function() {
						var par = $(this).parent("a");
						var href = par.attr("href");
						$(this).remove();
						var id = href.match(/[0-9]+/, "");
						var stringer = par.text();
						if (par.text().length === 0) {
							par.html(href);
						}
						par.css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + '<iframe class="vimeo-player" src="http://player.vimeo.com/video/' + id + '?portrait=0" width="100%" height="335" frameborder="0"></iframe>').unbind('click');
							return false;
						});
					});
				}
				sendResponse({}); // snub them.
			});