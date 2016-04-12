if (typeof (WBBLANG)=="undefined") {WBBLANG = {};}
WBBLANG['en'] = CURLANG = {
	bold: "Bold",
	italic: "Italic",
	underline: "Underline",
	strike: "Strike",
	link: "Link",
	img: "Insert image",
	sup: "Superscript",
	sub: "Subscript",
	justifyleft: "Align left",
	justifycenter: "Align center",
	justifyright: "Align right",
	table: "Insert table",
	bullist: "• Unordered list",
	numlist: "1. Ordered list",
	quote: "Quote",
	offtop: "Offtop",
	code: "Code",
	spoiler: "Spoiler",
	fontcolor: "Font color",
	fontsize: "Font size",
	fontfamily: "Font family",
	fs_verysmall: "Very small",
	fs_small: "Small",
	fs_normal: "Normal",
	fs_big: "Big",
	fs_verybig: "Very big",
	smilebox: "Insert emoticon",
	video: "Insert YouTube",
	removeFormat:"Remove Format",
	
	modal_link_title: "Insert link",
	modal_link_text: "Display text",
	modal_link_url: "URL",
	modal_email_text: "Display email",
	modal_email_url: "Email",
	modal_link_tab1: "Insert URL",
	
	modal_img_title: "Insert image",
	modal_img_tab1: "Insert URL",
	modal_img_tab2: "Upload image",
	modal_imgsrc_text: "Enter image URL",
	modal_img_btn: "Choose file",
	add_attach: "Add Attachment",
	
	modal_video_text: "Enter the URL of the video",
	
	close: "Close",
	save: "Save",
	cancel: "Cancel",
	remove: "Delete",
	
	validation_err: "The entered data is invalid",
	error_onupload: "Error during file upload",
	
	fileupload_text1: "Drop file here",
	fileupload_text2: "or",
	
	loading: "Loading",
	auto: "Auto",
	views: "Views",
	downloads: "Downloads",
	
	//smiles
	sm1: "Smile",
	sm2: "Laughter",
	sm3: "Wink",
	sm4: "Thank you",
	sm5: "Scold",
	sm6: "Shock",
	sm7: "Angry",
	sm8: "Pain",
	sm9: "Sick"
};
var options = {
	"bbmode": false,
	onlyBBmode: false,
	themeName: "default",
	bodyClass: "",
	lang: "ru",
	tabInsert: true,
	//			toolbar:			false,
	//img upload config 
	imgupload: false,
	img_uploadurl: "/iupload.php",
	img_maxwidth: 800,
	img_maxheight: 800,
	hotkeys: true,
	showHotkeys: true,
	autoresize: true,
	resize_maxheight: 800,
	loadPageStyles: true,
	traceTextarea: true,
	//			direction:			"ltr",
	smileConversion: true,

	//END img upload config 
	buttons: "bold,italic,underline,strike,sup,sub,|,img,video,link,|,bullist,numlist,|,fontcolor,fontsize,fontfamily,|,justifyleft,justifycenter,justifyright,|,quote,code,table,removeFormat",
	allButtons: {
		bold: {
			title: CURLANG.bold,
			buttonHTML: '<span class="fonticon ve-tlb-bold1">\uE018</span>',
			excmd: 'bold',
			hotkey: 'ctrl+b',
			transform: {
				'<b>{SELTEXT}</b>': "[b]{SELTEXT}[/b]",
				'<strong>{SELTEXT}</strong>': "[b]{SELTEXT}[/b]"
			}
		},
		italic: {
			title: CURLANG.italic,
			buttonHTML: '<span class="fonticon ve-tlb-italic1">\uE001</span>',
			excmd: 'italic',
			hotkey: 'ctrl+i',
			transform: {
				'<i>{SELTEXT}</i>': "[i]{SELTEXT}[/i]",
				'<em>{SELTEXT}</em>': "[i]{SELTEXT}[/i]"
			}
		},
		underline: {
			title: CURLANG.underline,
			buttonHTML: '<span class="fonticon ve-tlb-underline1">\uE002</span>',
			excmd: 'underline',
			hotkey: 'ctrl+u',
			transform: {
				'<u>{SELTEXT}</u>': "[u]{SELTEXT}[/u]"
			}
		},
		strike: {
			title: CURLANG.strike,
			buttonHTML: '<span class="fonticon fi-stroke1 ve-tlb-strike1">\uE003</span>',
			excmd: 'strikeThrough',
			transform: {
				'<strike>{SELTEXT}</strike>': "[s]{SELTEXT}[/s]",
				'<s>{SELTEXT}</s>': "[s]{SELTEXT}[/s]"
			}
		},
		sup: {
			title: CURLANG.sup,
			buttonHTML: '<span class="fonticon ve-tlb-sup1">\uE005</span>',
			excmd: 'superscript',
			transform: {
				'<sup>{SELTEXT}</sup>': "[sup]{SELTEXT}[/sup]"
			}
		},
		sub: {
			title: CURLANG.sub,
			buttonHTML: '<span class="fonticon ve-tlb-sub1">\uE004</span>',
			excmd: 'subscript',
			transform: {
				'<sub>{SELTEXT}</sub>': "[sub]{SELTEXT}[/sub]"
			}
		},
		link: {
			title: CURLANG.link,
			buttonHTML: '<span class="fonticon ve-tlb-link1">\uE007</span>',
			hotkey: 'ctrl+shift+2',
			modal: {
				title: CURLANG.modal_link_title,
				width: "500px",
				tabs: [{
					input: [{
						param: "SELTEXT",
						title: CURLANG.modal_link_text,
						type: "div"
					}, {
						param: "URL",
						title: CURLANG.modal_link_url,
						validation: '^http(s)?://'
					}]
				}]
			},
			transform: {
				'<a href="{URL}">{SELTEXT}</a>': "[url={URL}]{SELTEXT}[/url]",
				'<a href="{URL}">{URL}</a>': "[url]{URL}[/url]"
			}
		},
		img: {
			title: CURLANG.img,
			buttonHTML: '<span class="fonticon ve-tlb-img1">\uE006</span>',
			hotkey: 'ctrl+shift+1',
			addWrap: true,
			modal: {
				title: CURLANG.modal_img_title,
				width: "600px",
				tabs: [{
					title: CURLANG.modal_img_tab1,
					input: [{
						param: "SRC",
						title: CURLANG.modal_imgsrc_text,
						validation: '^http(s)?://.*?\.(jpg|png|gif|jpeg)$'
					}]
				}]/*,
				onLoad: imgLoadModal*/
			},
			transform: {
				'<img src="{SRC}" />': "[img]{SRC}[/img]",
				'<img src="{SRC}" width="{WIDTH}" height="{HEIGHT}"/>': "[img width={WIDTH},height={HEIGHT}]{SRC}[/img]"
			}
		},
		bullist: {
			title: CURLANG.bullist,
			buttonHTML: '<span class="fonticon ve-tlb-list1">\uE009</span>',
			excmd: 'insertUnorderedList',
			transform: {
				'<ul>{SELTEXT}</ul>': "[list]{SELTEXT}[/list]",
				'<li>{SELTEXT}</li>': "[*]{SELTEXT}[/*]"
			}
		},
		numlist: {
			title: CURLANG.numlist,
			buttonHTML: '<span class="fonticon ve-tlb-numlist1">\uE00a</span>',
			excmd: 'insertOrderedList',
			transform: {
				'<ol>{SELTEXT}</ol>': "[list=1]{SELTEXT}[/list]",
				'<li>{SELTEXT}</li>': "[*]{SELTEXT}[/*]"
			}
		},
		quote: {
			title: CURLANG.quote,
			buttonHTML: '<span class="fonticon ve-tlb-quote1">\uE00c</span>',
			hotkey: 'ctrl+shift+3',
			subInsert: true,
			transform: {
				'<div class="quote">{SELTEXT}</div>':'[quote]{SELTEXT}[/quote]',
				'<blockquote><header><cite title="{AUTHOR}">{AUTHOR}</cite> said:</header><p><em>{SELTEXT}</em></p></blockquote>' : "[quote={AUTHOR}]{SELTEXT}[/quote]"
			}
		},
		code: {
			title: CURLANG.code,
			buttonText: '[code]',
			/* buttonHTML: '<span class="fonticon">\uE00d</span>', */
			hotkey: 'ctrl+shift+4',
			onlyClearText: true,
			transform: {
				'<code>{SELTEXT}</code>': "[code]{SELTEXT}[/code]"
			}
		},
		offtop: {
			title: CURLANG.offtop,
			buttonText: 'offtop',
			transform: {
				'<span style="font-size:10px;color:#ccc">{SELTEXT}</span>': "[offtop]{SELTEXT}[/offtop]"
			}
		},
		fontcolor: {
			type: "colorpicker",
			title: CURLANG.fontcolor,
			excmd: "foreColor",
			valueBBname: "color",
			subInsert: true,
			colors: "#000000,#444444,#666666,#999999,#b6b6b6,#cccccc,#d8d8d8,#efefef,#f4f4f4,#ffffff,-, \
							 #ff0000,#980000,#ff7700,#ffff00,#00ff00,#00ffff,#1e84cc,#0000ff,#9900ff,#ff00ff,-, \
							 #f4cccc,#dbb0a7,#fce5cd,#fff2cc,#d9ead3,#d0e0e3,#c9daf8,#cfe2f3,#d9d2e9,#ead1dc, \
							 #ea9999,#dd7e6b,#f9cb9c,#ffe599,#b6d7a8,#a2c4c9,#a4c2f4,#9fc5e8,#b4a7d6,#d5a6bd, \
							 #e06666,#cc4125,#f6b26b,#ffd966,#93c47d,#76a5af,#6d9eeb,#6fa8dc,#8e7cc3,#c27ba0, \
							 #cc0000,#a61c00,#e69138,#f1c232,#6aa84f,#45818e,#3c78d8,#3d85c6,#674ea7,#a64d79, \
							 #900000,#85200C,#B45F06,#BF9000,#38761D,#134F5C,#1155Cc,#0B5394,#351C75,#741B47, \
							 #660000,#5B0F00,#783F04,#7F6000,#274E13,#0C343D,#1C4587,#073763,#20124D,#4C1130",
			transform: {
				'<font color="{COLOR}">{SELTEXT}</font>': '[color={COLOR}]{SELTEXT}[/color]'
			}
		},
		table: {
			type: "table",
			title: CURLANG.table,
			cols: 10,
			rows: 10,
			cellwidth: 20,
			transform: {
				'<td>{SELTEXT}</td>': '[td]{SELTEXT}[/td]',
				'<tr>{SELTEXT}</tr>': '[tr]{SELTEXT}[/tr]',
				'<table class="wbb-table">{SELTEXT}</table>': '[table]{SELTEXT}[/table]'
			},
			skipRules: true
		},
		fontsize: {
			type: 'select',
			title: CURLANG.fontsize,
			options: "fs_verysmall,fs_small,fs_normal,fs_big,fs_verybig"
		},
		fontfamily: {
			type: 'select',
			title: CURLANG.fontfamily,
			excmd: 'fontName',
			valueBBname: "font",
			options: [{
				title: "Arial",
				exvalue: "Arial"
			}, {
				title: "Comic Sans MS",
				exvalue: "Comic Sans MS"
			}, {
				title: "Courier New",
				exvalue: "Courier New"
			}, {
				title: "Georgia",
				exvalue: "Georgia"
			}, {
				title: "Lucida Sans Unicode",
				exvalue: "Lucida Sans Unicode"
			}, {
				title: "Tahoma",
				exvalue: "Tahoma"
			}, {
				title: "Times New Roman",
				exvalue: "Times New Roman"
			}, {
				title: "Trebuchet MS",
				exvalue: "Trebuchet MS"
			}, {
				title: "Verdana",
				exvalue: "Verdana"
			}],
			transform: {
				'<font face="{FONT}">{SELTEXT}</font>': '[font={FONT}]{SELTEXT}[/font]'
			}
		},
		smilebox: {
			type: 'smilebox',
			title: CURLANG.smilebox,
			buttonHTML: '<span class="fonticon ve-tlb-smilebox1">\uE00b</span>'
		},
		justifyleft: {
			title: CURLANG.justifyleft,
			buttonHTML: '<span class="fonticon ve-tlb-textleft1">\uE015</span>',
			groupkey: 'align',
			transform: {
				'<p style="text-align:left">{SELTEXT}</p>': '[left]{SELTEXT}[/left]'
			}
		},
		justifyright: {
			title: CURLANG.justifyright,
			buttonHTML: '<span class="fonticon ve-tlb-textright1">\uE016</span>',
			groupkey: 'align',
			transform: {
				'<p style="text-align:right">{SELTEXT}</p>': '[right]{SELTEXT}[/right]'
			}
		},
		justifycenter: {
			title: CURLANG.justifycenter,
			buttonHTML: '<span class="fonticon ve-tlb-textcenter1">\uE014</span>',
			groupkey: 'align',
			transform: {
				'<p style="text-align:center">{SELTEXT}</p>': '[center]{SELTEXT}[/center]'
			}
		},
		video: {
			title: CURLANG.video,
			buttonHTML: '<span class="fonticon ve-tlb-video1">\uE008</span>',
			modal: {
				title: CURLANG.video,
				width: "600px",
				tabs: [{
					title: CURLANG.video,
					input: [{
						param: "SRC",
						title: CURLANG.modal_video_text
					}]
				}]/*,
				onSubmit: function(cmd, opt, queryState) {
					var url = this.$modal.find('input[name="SRC"]').val();
					if (url) {
						url = url.replace(/^\s+/, "").replace(/\s+$/, "");
					}
					var a;
					if (url.indexOf("youtu.be") != -1) {
						a = url.match(/^http[s]*:\/\/youtu\.be\/([a-z0-9_-]+)/i);
					} else {
						a = url.match(/^http[s]*:\/\/www\.youtube\.com\/watch\?.*?v=([a-z0-9_-]+)/i);
					}
					if (a && a.length == 2) {
						var code = a[1];
						this.insertAtCursor(this.getCodeByCommand(cmd, {
							src: code
						}));
					}
					this.closeModal();
					this.updateUI();
					return false;
				}*/
			},
			transform: {
				'<iframe src="http://www.youtube.com/embed/{SRC}" width="640" height="480" frameborder="0"></iframe>': '[video]{SRC}[/video]'
			}
		},

		//select options
		fs_verysmall: {
			title: CURLANG.fs_verysmall,
			buttonText: "fs1",
			excmd: 'fontSize',
			exvalue: "1",
			transform: {
				'<font size="1">{SELTEXT}</font>': '[size=50]{SELTEXT}[/size]'
			}
		},
		fs_small: {
			title: CURLANG.fs_small,
			buttonText: "fs2",
			excmd: 'fontSize',
			exvalue: "2",
			transform: {
				'<font size="2">{SELTEXT}</font>': '[size=85]{SELTEXT}[/size]'
			}
		},
		fs_normal: {
			title: CURLANG.fs_normal,
			buttonText: "fs3",
			excmd: 'fontSize',
			exvalue: "3",
			transform: {
				'<font size="3">{SELTEXT}</font>': '[size=100]{SELTEXT}[/size]'
			}
		},
		fs_big: {
			title: CURLANG.fs_big,
			buttonText: "fs4",
			excmd: 'fontSize',
			exvalue: "4",
			transform: {
				'<font size="4">{SELTEXT}</font>': '[size=150]{SELTEXT}[/size]'
			}
		},
		fs_verybig: {
			title: CURLANG.fs_verybig,
			buttonText: "fs5",
			excmd: 'fontSize',
			exvalue: "6",
			transform: {
				'<font size="6">{SELTEXT}</font>': '[size=200]{SELTEXT}[/size]'
			}
		},

		removeformat: {
			title: CURLANG.removeFormat,
			buttonHTML: '<span class="fonticon ve-tlb-removeformat1">\uE00f</span>',
			excmd: "removeFormat"
		}
	},
	systr: {
		'<br/>': "\n",
		'<span class="wbbtab">{SELTEXT}</span>': '   {SELTEXT}'
	},
	customRules: {
		td: [
			["[td]{SELTEXT}[/td]", {
				seltext: {
					rgx: false,
					attr: false,
					sel: false
				}
			}]
		],
		tr: [
			["[tr]{SELTEXT}[/tr]", {
				seltext: {
					rgx: false,
					attr: false,
					sel: false
				}
			}]
		],
		table: [
				["[table]{SELTEXT}[/table]", {
					seltext: {
						rgx: false,
						attr: false,
						sel: false
					}
				}]
			]
			//blockquote: [["   {SELTEXT}",{seltext: {rgx:false,attr:false,sel:false}}]]
	},
	smileList: [
		//{title:CURLANG.sm1, img: '<img src="{themePrefix}{themeName}/img/smiles/sm1.png" class="sm">', bbcode:":)"},
	],
	attrWrap: ['src', 'color', 'href'] //use becouse FF and IE change values for this attr, modify [attr] to _[attr]
};

var txtArea = document.getElementById('new_post').getElementsByTagName('textarea');
var $txtArea = $(txtArea);
var id = $txtArea.attr("id") || setUID(txtArea);
var height = options.minheight || $txtArea.outerHeight();
var maxheight = options.resize_maxheight;
var mheight = (options.autoresize===true) ? options.resize_maxheight : height;
var $body = $(strf('<div class="wysibb-text-editor" style="max-height:{maxheight}px;min-height:{height}px"></div>',{maxheight:mheight,height:height})).insertAfter($txtArea);
var body = $body[0];


var lastid = 1, rsellist, lastRange, cleartext;

function init() {
	$.log("Init");
	//check for mobile
	var isMobile = function(a) {(/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a))}(navigator.userAgent||navigator.vendor||window.opera);
	
	//use bbmode on mobile devices
	//this.isMobile = true; //TEMP
	if (options.onlyBBmode===true) {options.bbmode=true;}
	//create array of controls, for queryState
	controllers = [];
	
	//convert button string to array
	options.buttons = options.buttons.toLowerCase();
	options.buttons = options.buttons.split(",");
	
	//init system transforms
	options.allButtons["_systr"] = {};
	options.allButtons["_systr"]["transform"]= options.systr;
	
	smileFind();
	initTransforms();
	
	//sort smiles
	if (options.smileList && options.smileList.length>0) {
		options.smileList.sort(function(a,b) {
			return (b.bbcode.length-a.bbcode.length);
		})
	}
}

function wrapAttrs(html) {
	$.each(options.attrWrap,function(i,a) {
		html = html.replace(a+'="','_'+a+'="');
	});
	return html;
}

function unwrapAttrs(html) {
	$.each(options.attrWrap,function(i,a) {
		html = html.replace('_'+a+'="',a+'="');
	});
	return html;
}

function elFromString(str) {
	if (str.indexOf("<")!=-1 && str.indexOf(">")!=-1) {
		//create tag
		var wr = document.createElement("SPAN");
		$(wr).html(str);
		setUID(wr,"wbb");
		return ($(wr).contents().size()>1) ? wr:wr.firstChild;
	}else{
		//create text node
		return document.createTextNode(str);
	}
}

function setUID(el,attr) {
	var id = "wbbid_"+(++lastid);
	if (el) {
		$(el).attr(attr || "id",id);
	}
	return id;
}

function getAttributeList(el) {
	var a=[];
	$.each(el.attributes,function(i,attr) {
		if (attr.specified) {
			a.push(attr.name);
		}
	});
	return a;
}

function filterByNode(node) {
	var $n = $(node);
	var tagName = $n.get(0).tagName.toLowerCase();
	var filter=tagName;
	var attributes = getAttributeList($n.get(0));
	$.each(attributes, $.proxy(function(i, item) {
		var v = $n.attr(item);
		/* $.log("v: "+v);
		if ($.inArray(item,options.attrWrap)!=-1) {
			item = '_'+item;
		} */
		//$.log(item);
		if (item.substr(0,1)=="_") {item=item.substr(1,item.length)}
		if (v && !v.match(/\{.*?\}/)) {
			//$.log("I1: "+item);
			if (item=="style") {
				var v = $n.attr(item);
				var va = v.split(";");
				$.each(va,function(i,f) {
					if (f && f.length>0) {
						filter+='['+item+'*="'+$.trim(f)+'"]';
					}
				});
			}else{
				filter+='['+item+'="'+v+'"]';
			}
		}else if (v && item=="style") {
			//$.log("I2: "+item);
			var vf = v.substr(0,v.indexOf("{"));
			if (vf && vf!="") {
				var v = v.substr(0,v.indexOf("{"));
				var va = v.split(";");
				$.each(va,function(i,f) {
					filter+='['+item+'*="'+f+'"]';
				});
				//filter+='['+item+'*="'+v.substr(0,v.indexOf("{"))+'"]';
			}
		}else{ //1.2.2
			//$.log("I3: "+item);
			filter+='['+item+']';
		}
	},this));
	
	//index
	var idx = $n.parent().children(filter).index($n);
	if (idx>0) {
		filter+=":eq("+$n.index()+")";
	}
	return filter;
}

function getValidationRGX(s) {
	if (s.match(/\[\S+\]/)) {
		return s.replace(/.*(\\*\[\S+\]).*/,"$1");
	}
	return "";
}

function relFilterByNode(node,stop) {
	var p="";
	$.each(options.attrWrap, function(i,a) {
		stop = stop.replace('['+a,'[_'+a);
	});
	while (node && node.tagName!="BODY" && !$(node).is(stop)) {
		p=filterByNode(node)+" "+p;
		if (node) {node = node.parentNode;}
	}
	return p;
}

function getRegexpReplace(str,validname) {
	str = str.replace(/(\(|\)|\[|\]|\.|\*|\?|\:|\\)/g,"\\$1") 
		.replace(/\s+/g,"\\s+")
		.replace(validname.replace(/(\(|\)|\[|\]|\.|\*|\?|\:|\\)/g,"\\$1"),"(.+)")
		.replace(/\{\S+?\}/g,".*");
	return (str);
}

function sortArray(ar,asc) {
	ar.sort(function(a,b) {
		return (a.length-b.length)*(asc || 1);
	});
	return ar;
}

function keysToLower(o) {
	$.each(o,function(k,v) {
		if (k!=k.toLowerCase()) {
			delete o[k];
			o[k.toLowerCase()]=v;
		}
	});
	return o;
}

function strf(str,data) {
	data = keysToLower($.extend({},data));
	return str.replace(/\{([\w\.]*)\}/g, function (str, key) {key = key.toLowerCase();var keys = key.split("."), value = data[keys.shift().toLowerCase()];$.each(keys, function () { value = value[this]; }); return (value === null || value === undefined) ? "" : value;});
}

function initTransforms() {
	$.log("Create rules for transform HTML=>BB");
	var o = options;
	//need to check for active buttons
	if (!o.rules) {o.rules={};}
	if (!o.groups) {o.groups={};} //use for groupkey, For example: justifyleft,justifyright,justifycenter. It is must replace each other.
	var  btnlist = o.buttons.slice();
	
	//add system transform
	btnlist.push("_systr");
	for (var bidx=0; bidx<btnlist.length; bidx++) {
		var ob = o.allButtons[btnlist[bidx]];
		if (!ob ) {continue;}
		ob.en=true;
		
		//check for simplebbcode
		if (ob.simplebbcode && $.isArray(ob.simplebbcode) && ob.simplebbcode.length==2) {
			ob.bbcode = ob.html = ob.simplebbcode[0]+"{SELTEXT}"+ob.simplebbcode[1];
			if (ob.transform) delete ob.transform;
			if (ob.modal)  delete ob.modal;
		}
		
		//add transforms to option list
		if (ob.type=="select" && typeof(ob.options)=="string") {
			var olist = ob.options.split(",");
			$.each(olist,function(i,op) {
				if ($.inArray(op,btnlist)==-1) {
					btnlist.push(op);
				}
			});
		}
		if (ob.transform && ob.skipRules!==true) {
			var obtr = $.extend({},ob.transform);
			
			/* if (ob.addWrap) {
				//addWrap
				$.log("needWrap");
				for (var bhtml in obtr) {
					var bbcode = ob.transform[bhtml];
					var newhtml = '<span wbb="'+btnlist[bidx]+'">'+bhtml+'</span>';
					obtr[newhtml] = bbcode;
				}
			} */
			
			for (var bhtml in obtr) {
				var orightml = bhtml;
				var bbcode = obtr[bhtml];
				
				//create root selector for isContain bbmode
				if (!ob.bbSelector) {ob.bbSelector=[];}
				if ($.inArray(bbcode,ob.bbSelector)==-1) {
					ob.bbSelector.push(bbcode);
				}
				if (options.onlyBBmode===false) {
				
					//wrap attributes 
					bhtml = wrapAttrs(bhtml);
					

					var $bel = $(document.createElement('DIV')).append($(elFromString(bhtml,document)));
					var rootSelector = filterByNode($bel.children());
					
					
					//check if current rootSelector is exist, create unique selector for each transform (1.2.2)
					if (rootSelector=="div" || typeof(o.rules[rootSelector])!="undefined") {
						//create unique selector
						$.log("create unique selector: "+rootSelector);
						setUID($bel.children());
						rootSelector = filterByNode($bel.children());
						$.log("New rootSelector: "+rootSelector);
						//replace transform with unique selector
						var nhtml2 = $bel.html();
						nhtml2 = unwrapAttrs(nhtml2);
						var obhtml = unwrapAttrs(bhtml);
						
						
						ob.transform[nhtml2]=bbcode;
						delete ob.transform[obhtml];
						
						bhtml=nhtml2;
						orightml = nhtml2;
					}
					
					//create root selector for isContain
					if (!ob.excmd) {
						if (!ob.rootSelector) {ob.rootSelector=[];}
						ob.rootSelector.push(rootSelector);
					}
					
					//check for rules on this rootSeletor
					if (typeof(o.rules[rootSelector])=="undefined") {
						o.rules[rootSelector]=[];
					}
					var crules={};
					
					if (bhtml.match(/\{\S+?\}/)) {
						$bel.find('*').each($.proxy(function(idx,el) {
							//check attributes
							
							var attributes = getAttributeList(el);
							$.each(attributes,$.proxy(function(i, item) {
								var attr = $(el).attr(item);
								if (item.substr(0,1)=='_') {
									item = item.substr(1);
								}
								
								var r = attr.match(/\{\S+?\}/g);
								if (r) {
									for (var a=0; a<r.length; a++) {
										var rname = r[a].substr(1,r[a].length-2);
											rname = rname.replace(getValidationRGX(rname),"");
										var p = relFilterByNode(el,rootSelector);
										var regRepl = (attr!=r[a]) ? getRegexpReplace(attr,r[a]):false;
										crules[rname.toLowerCase()]={sel:(p) ? $.trim(p):false,attr:item,rgx:regRepl}
									}
								}
							},this));
							
							//check for text
							var  sl=[];
							if (!$(el).is("iframe")) {
								$(el).contents().filter(function() {return this.nodeType===3}).each($.proxy(function(i,rel) {
									var txt = rel.textContent || rel.data;
									if (typeof(txt)=="undefined") {return true;}
									var r = txt.match(/\{\S+?\}/g)
									if (r) {
										for (var a=0; a<r.length; a++) {	
											var rname = r[a].substr(1,r[a].length-2);
												rname = rname.replace(getValidationRGX(rname),"");
											var p = relFilterByNode(el,rootSelector);
											var regRepl = (txt!=r[a]) ? getRegexpReplace(txt,r[a]):false;
											var sel = (p) ? $.trim(p):false;
											if ($.inArray(sel,sl)>-1 || $(rel).parent().contents().size()>1) {
												//has dublicate and not one children, need wrap
												var nel = $("<span>").html("{"+rname+"}");
												setUID(nel,"wbb");
												var start = (txt.indexOf(rname)+rname.length)+1;
												var after_txt = txt.substr(start,txt.length-start);
												//create wrap element
												rel.data = txt.substr(0,txt.indexOf(rname)-1);
												$(rel).after(elFromString(after_txt,document)).after(nel);
												
												sel=((sel) ? sel+" ":"")+filterByNode(nel);
												regRepl=false;
											}
											crules[rname.toLowerCase()]={sel:sel,attr:false,rgx:regRepl}
											sl[sl.length]=sel;
										}
									}
								},this));
							}
							sl=null;
							
							
						},this));
						
						var nbhtml = $bel.html();
						//UnWrap attributes 
						nbhtml = unwrapAttrs(nbhtml);
						if (orightml!=nbhtml) {
							//if we modify html, replace it
							delete ob.transform[orightml];
							ob.transform[nbhtml]=bbcode;
							bhtml=nbhtml;
						}
						
					}
					o.rules[rootSelector].push([bbcode,crules]);
					
					//check for onlyClearText
					if (ob.onlyClearText===true) {
						if (!cleartext) {cleartext={};}
						cleartext[rootSelector]=btnlist[bidx];
					}
					
					//check for groupkey
					if (ob.groupkey) {
						if (!o.groups[ob.groupkey]) {o.groups[ob.groupkey]=[]}
						o.groups[ob.groupkey].push(rootSelector);
					}
				}
			}
			
			//sort rootSelector
			if (ob.rootSelector) {
				sortArray(ob.rootSelector,-1);
			}
				
			var htmll = $.map(ob.transform,function(bb,html) {return html}).sort(function(a,b) {
					return ((b[0] || "").length-(a[0] || "").length)
			});
			ob.bbcode = ob.transform[htmll[0]];
			ob.html = htmll[0];
		}
	};
	
	options.btnlist=btnlist; //use for transforms, becouse select elements not present in buttons
	
	//add custom rules, for table,tr,td and other
	$.extend(o.rules,options.customRules);

	//smile rules
	o.srules={};
	if (options.smileList) {
		$.each(o.smileList,$.proxy(function(i,sm) {
			var $sm = $(strf(sm.img,o));
			var f = filterByNode($sm);
			o.srules[f]=[sm.bbcode,sm.img];
		},this));
	}
	
	//sort transforms by bbcode length desc
	for (var rootsel in o.rules) {
		options.rules[rootsel].sort(function(a,b) {
			return (b[0].length-a[0].length)
		});
	}
	
	//create rootsel list
	rsellist = [];
	for (var rootsel in options.rules) {
		rsellist.push(rootsel);
	}
	sortArray(rsellist,-1);
}

function fixTableTransform(html) {
	if (!html) {return "";}
	if ($.inArray("table", options.buttons)==-1) {
		return html.replace(/\<(\/*?(table|tr|td|tbody))[^>]*\>/ig,"");
	}else{
		return html.replace(/\<(\/*?(table|tr|td))[^>]*\>/ig,"[$1]".toLowerCase()).replace(/\<\/*tbody[^>]*\>/ig,"");
	}
}

function toBB(data) {
	if (!data) {return "";};
	var $e = (typeof(data)=="string") ? $('<span>').html(data):$(data);
	//remove last BR
	$e.find("div,blockquote,p").each(function() {
		if (this.nodeType!=3 && this.lastChild && this.lastChild.tagName=="BR") {
			$(this.lastChild).remove();
		}
	})
	if ($e.is("div,blockquote,p") && $e[0].nodeType!=3 && $e[0].lastChild && $e[0].lastChild.tagName=="BR") {
		$($e[0].lastChild).remove();
	}
	//END remove last BR
	
	//Remove BR
	$e.find("ul > br, table > br, tr > br").remove();
	//IE
	
	var outbb="";
	
	//transform smiles
	$.each(options.srules,$.proxy(function(s,bb) {
		$e.find(s).replaceWith(bb[0]);
	},this));
	
	$e.contents().each($.proxy(function(i,el) {
		var $el = $(el);
		if (el.nodeType===3) {
			outbb+=el.data.replace(/\n+/,"").replace(/\t/g,"   ");
		}else{
			//process html tag
			var rpl,processed=false;

			//for (var rootsel in options.rules) {
			for (var j=0; j<rsellist.length; j++) {
				var rootsel = rsellist[j];
				if ($el && $el.is(rootsel)) {
					//it is root sel
					var rlist = options.rules[rootsel];
					for (var i=0; i<rlist.length; i++) {
						var bbcode = rlist[i][0];
						var crules = rlist[i][1];
						var skip=false,keepElement=false,keepAttr=false;
						if (!$el.is("br")) {
							bbcode = bbcode.replace(/\n/g,"<br>");
						}
						bbcode = bbcode.replace(/\{(.*?)(\[.*?\])*\}/g,$.proxy(function(str,s,vrgx) {
							var c = crules[s.toLowerCase()];
							//if (typeof(c)=="undefined") {$.log("Param: {"+s+"} not found in HTML representation.");skip=true;return s;}
							if (typeof(c)=="undefined") {$.log("Param: {"+s+"} not found in HTML representation.");skip=true;}
							var $cel = (c.sel) ? $(el).find(c.sel):$(el);
							if (c.attr && !$cel.attr(c.attr)) {skip=true;return s;} //skip if needed attribute not present, maybe other bbcode
							var cont = (c.attr) ? $cel.attr(c.attr):$cel.html();
							if (typeof(cont)=="undefined" || cont==null) {skip=true;return s;}
							var regexp = c.rgx;
							
							//style fix 
							if (regexp && c.attr=="style" && regexp.substr(regexp.length-1,1)!=";") {
								regexp+=";";
							}
							if (c.attr=="style" && cont && cont.substr(cont.length-1,1)!=";") {cont+=";"}
							//prepare regexp
							var rgx = (regexp) ? new RegExp(regexp,""):false;
							if (rgx) {
								if (cont.match(rgx)) {
									var m = cont.match(rgx);
									if (m && m.length==2) {
										cont=m[1];
									}
								}else{
									cont="";
								}
							}
							
							//if it is style attr, then keep tag alive, remove this style
							if (c.attr && skip===false) {
								if (c.attr=="style") {
									keepElement=true;
									var nstyle="";
									var r = c.rgx.replace(/^\.\*\?/,"").replace(/\.\*$/,"").replace(/;$/,"");
									$($cel.attr("style").split(";")).each(function(idx,style) {
										if (style && style!="") {
											if (!style.match(r)) {
												nstyle+=style+";";
											}
										}
									});
									if (nstyle=="") {
										$cel.removeAttr("style");
									}else{
										$cel.attr("style",nstyle);
									}
								}else if (c.rgx===false){  
									keepElement=true;
									keepAttr=true;
									$cel.removeAttr(c.attr);
								}
							}
							if ($el.is('table,tr,td,font')) {keepElement=true;}
							
							return cont || "";
						},this));
						if (skip) {continue;}
						if ($el.is("img,br,hr")) {
							//replace element
							outbb+=bbcode;
							$el=null;
							break;
						}else{
							if (keepElement && !$el.attr("notkeep")) {
								if ($el.is("table,tr,td")) {
									bbcode = fixTableTransform(bbcode);
									outbb+=toBB($('<span>').html(bbcode));
									$el=null;
								}else{
									$el.empty().html('<span>'+bbcode+'</span>');
								}
								
							}else{
								if ($el.is("iframe")) {
									outbb+=bbcode;
								}else{
									$el.empty().html(bbcode);
									outbb+=toBB($el);
									$el=null;
									
								}
								break;
							}
						}
					}
				}
			}
			if (!$el || $el.is("iframe,img")) {return true;}
			outbb+=toBB($el);
		}
	},this));
	
	outbb.replace(/\uFEFF/g,"");
	return outbb;
}

function smileFind() {
	if (options.smilefind) {
		var $smlist = $(options.smilefind).find('img[alt]');
		if ($smlist.size()>0) {
			options.smileList=[];
			$smlist.each($.proxy(function(i,el) {
				var $el=$(el);
				options.smileList.push({title:$el.attr("title"),bbcode:$el.attr("alt"),img:$el.removeAttr("alt").removeAttr("title")[0].outerHTML});
			},this));
		}
	}
}

function getCursorPosBB() {	
	var pos=0;
	if ('selectionStart' in txtArea) {
		pos = txtArea.selectionStart;
	}else{
		txtArea.focus();
		var r = getRange();
		var rt = document.body.createTextRange();
		rt.moveToElementText(txtArea);
		rt.setEndPoint('EndToStart',r);
		pos = rt.text.length;
	}
	return pos;
}

function setCursorPosBB(pos) {
	if (options.bbmode) {
		if (window.getSelection) {
			txtArea.selectionStart=pos;
			txtArea.selectionEnd=pos;
		}else{
			var range = txtArea.createTextRange();
			range.collapse(true);
			range.move('character', pos);
			range.select();
		}
	}
}

function selectRange(rng) {
	if (rng) {
		if (!window.getSelection) {
			rng.select();
		}else{
			var sel = getSelection();
			sel.removeAllRanges();
			sel.addRange(rng);
		}
	}
}

function selectLastRange() {
	if (lastRange) {
		body.focus();
		selectRange(lastRange);
		lastRange=false;
	}
}

function getSelection() {
	if (window.getSelection) {
		return window.getSelection();
	}else if (document.selection) {
		return (options.bbmode) ? document.selection.createRange():document.selection.createRange();
	}
}

function getRange() {
	if (window.getSelection) {
		var sel = getSelection();
		if (sel.getRangeAt && sel.rangeCount>0) {
			return sel.getRangeAt(0);
		}else if (sel.anchorNode) {
			var range = (options.bbmode) ? document.createRange() : document.createRange();
			range.setStart (sel.anchorNode, sel.anchorOffset);
			range.setEnd (sel.focusNode, sel.focusOffset);
			return range;
		}
	}else{
		return (options.bbmode===true) ? document.selection.createRange():document.selection.createRange();
	}
}

function execNativeCommand(cmd,param) { 
	//$.log("execNativeCommand: '"+cmd+"' : "+param); 
	body.focus(); //set focus to frame body
	if (cmd=="insertHTML" && !window.getSelection) { //IE does't support insertHTML
		var r = (lastRange) ? lastRange : document.selection.createRange(); //IE 7,8 range lost fix
		r.pasteHTML(param);
		var txt = $('<div>').html(param).text(); //for ie selection inside block
		var brsp = txt.indexOf("\uFEFF");
		if (brsp>-1) {
			r.moveStart('character',(-1)*(txt.length-brsp));
			r.select();
		}
		lastRange=false;
	}else if (cmd=="insertHTML") { //fix webkit bug with insertHTML
		var sel = getSelection();
		var e = elFromString(param);
		var rng = (lastRange) ? lastRange : getRange();
		rng.deleteContents();
		rng.insertNode(e);
		rng.setStartAfter(e);
		rng.setEndAfter(e);
		rng.collapse(false);
		sel.removeAllRanges();
		sel.addRange(rng);
	}else{
		if (typeof param == "undefined") {param=false;}
		if (lastRange) {
			$.log("Last range select");
			selectLastRange()
		}
		document.execCommand(cmd, false, param);
	}
	
}

function getSelectNode(rng) {
	body.focus();
	if (!rng) {rng = getRange();}
	if (!rng) {return $body;}
	//return (window.getSelection) ? rng.commonAncestorContainer:rng.parentElement();
	var sn = (window.getSelection) ? rng.commonAncestorContainer:rng.parentElement();
	if ($(sn).is(".imgWrap")) {sn = $(sn).children("img")[0];}
	return sn;
}

function splitPrevNext(node) {
	if (node.nodeType==3) {node = node.parentNode};
	var f = filterByNode(node).replace(/\:eq.*$/g,"");
	if ($(node.nextSibling).is(f)) {
		$(node).append($(node.nextSibling).html());
		$(node.nextSibling).remove();
	}
	if ($(node.previousSibling).is(f)) {
		$(node).prepend($(node.previousSibling).html());
		$(node.previousSibling).remove();
	}
}

function insertAtCursor(code,forceBBMode) {
	if (typeof(code)!="string") {code = $("<div>").append(code).html();}
	if ((options.bbmode && typeof(forceBBMode)=="undefined") || forceBBMode===true) {
		var clbb = code.replace(/.*(\[\/\S+?\])$/,"$1");
		var p = getCursorPosBB()+((code.indexOf(clbb)!=-1 && code.match(/\[.*\]/)) ? code.indexOf(clbb):code.length);
		if (document.selection) {
			//IE
			txtArea.focus();
			getSelection().text=code;
		}else if (txtArea.selectionStart || txtArea.selectionStart == '0') {
			txtArea.value = txtArea.value.substring(0, txtArea.selectionStart) + code + txtArea.value.substring(txtArea.selectionEnd, txtArea.value.length);
		}
		if (p<0) {p=0;}
		setCursorPosBB(p);
	}else{
		execNativeCommand("insertHTML",code);
		var node = getSelectNode();
		if (!$(node).closest("table,tr,td")) {
			splitPrevNext(node);
		}
	}
}

$.log = function (msg) {
	if (typeof(wbbdebug)!="undefined" && wbbdebug===true) {
		if (typeof(console)!="undefined") {
			console.log(msg);
		}else{
			$("#exlog").append('<p>'+msg+'</p>');  
		}
	}
}

init();

toBB();