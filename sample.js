var improvedPT = {};
(function ($) {
	"use strict";

	// April fools day shit
	// if you're reading my source code, don't tell anyone about the shenanigans. feel free to contact me and i'll validate your awesomeness
	var date = new Date();
	// Check if April 1
	if (date.getDate() === 1 && date.getMonth() === 3) {
		document.title = 'Drug Band Message Board';
		$(function() {
			$(".poster_name a").each(function() {
				var name = $(this).text();
				if (!name.match(/^.*420.*$/)) {
					$(this).html(name+420);
				} else {
					$(this).html(name+" (I really have 420 in my name)");
				}
			});
		});
	}
	// End April Fools Day

	improvedPT.getBandApiUrlByWebUrl = function (bands, webUrl) {
		var band = bands.filter(function (obj) {
			return obj.webUrl === webUrl;
		});
		return band[0].url;
	};
	improvedPT.checkMT = function () {
		var topic = $("#post-listing .topic_title").text();
		improvedPT.mt = false;
		$.get("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/mythreads?skip=0&pageSize=40", function(data) {
			improvedPT.mythreads = data.aaData;
			for (var i=0; i < improvedPT.mythreads.length; i+=1) {
				if (improvedPT.mythreads[i].Subject === topic) {
					improvedPT.mt = true;
				}
			}
			if (improvedPT.mt) {
				$("#bottom-pagination-container div a:contains('MT')").html($("#bottom-pagination-container div a:contains('MT')").html() + '✔');
				$(".topic_header div a:contains('MT')").html($(".topic_header div a:contains('MT')").html() + '✔');
			}
		});
	};
	improvedPT.addScrollDown = function () {
		$(".topic_header .mod_tools > a:last").after('<span class="usr_tools"><a href="#" id="scrollDown" title="Go Down">Down</a></span>');

		$(document).on("click", "#scrollDown", function (e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $("#applicationHost").height()
			}, "slow");
		});
	};
	improvedPT.afterAjax = function () {
		$('button.btn.btn-default.btn-large.load-more-button').click();
	};
	$(document).off("click", "#bottom-pagination-container div + div > a:last").on("click", "#bottom-pagination-container div + div > a:last", function() {
		improvedPT.afterAjax();
		return false;
	});
	improvedPT.addBumpThread = function () {
		$(".topic_header .mod_tools > span a#scrollDown").before('<a href="#" id="bumpThread" title="Bump">Bump</a><a href="#" id="diaf" title="DIAF">DIAF</a><a href="#" id="kys" title="KYS">KYS</a><a href="#" id="nam" title="NAM">Nam</a></span>');
		$(document).on("click", "#bumpThread, #diaf, #kys, #nam", function () {
			var text = $(this).html();
			if (text === 'Nam') {
				text = 'https://i.imgur.com/znUlc.jpg';
			}
			$("#new_post textarea").val(text);
			$.post("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/posts", {"Body": $("#new_post textarea").val(), "ThreadId": location.pathname.split('/')[4]}, function() {
				improvedPT.mt = true;
				$("#new_post textarea").val("");
				$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
				improvedPT.afterAjax();
			});
		});
	};
	improvedPT.filterByAuthorID = function (obj) {
		return obj.id === parseInt(this.authorId, 10);
	};
	improvedPT.filterForThreadSubject = function (obj) {
		return obj.type === "Thread";
	};
	improvedPT.createPrintPage = function () {
		var tableBody = '', tableHead = '', postBody = '', filteredpostsrefs, date, dateCreated, i;
		for (i = 0; i < improvedPT.posts.length; i += 1) {
			if (i === 0) {
				filteredpostsrefs = improvedPT.postsrefs.filter(improvedPT.filterForThreadSubject);
				tableHead += '<tr><th class="pthead" colspan="2"><span>Thread Subject: ' + filteredpostsrefs[0].subject + '</span><br>Thread ID: ' + filteredpostsrefs[0].id + '</th></tr>';
			}

			filteredpostsrefs = improvedPT.postsrefs.filter(improvedPT.filterByAuthorID, {"authorId": improvedPT.posts[i].authorId});
			date = new Date(improvedPT.posts[i].dateCreated);
			dateCreated = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

			postBody = XBBCODE.process({text: improvedPT.posts[i].body, removeMisalignedTags: false, addInLineBreaks: true});

			tableBody += '<tr id="post' + improvedPT.posts[i].id + '"><td class="ptdata"><span>' + filteredpostsrefs[0].username + '</span><br>' + dateCreated + '</td><td class="ptpost">' + postBody.html + '</td></tr>';
		}
		var opened = window.open('');
		opened.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>My title</title><style type="text/css">blockquote{border:1px solid rgba(221,221,221,.5);padding:3px;margin:6px 15px;}th{font-weight:normal;}td.ptdata,th.pthead{font-size:11px;vertical-align:top;}th.pthead{text-align:left;}td.ptdata{text-align:right;width:150px;padding-bottom:15px;border-top:1px solid rgba(221,221,221,.5);}td.ptdata span,th.pthead span{font-size:12px;font-weight:bold;}td.ptpost{vertical-align:top;font-size:12px;padding-bottom:15px;border-top:1px solid rgba(221,221,221,.5);}</style></head><body><table><thead>' + tableHead + '</thead><tbody>' + tableBody + '</tbody></table></body></html>');
	};
	improvedPT.addPrintThread = function () {
		$(".topic_header .mod_tools > span a#scrollDown").after('<a href="#" id="printThread" title="Print Thread">Print</a>');
		
		$(document).on("click", "#printThread", function (e) {
			e.preventDefault();

			$.get("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/threads/" + location.pathname.split('/')[4] + "/posts?limit=499&skip=0", function(data) {
				improvedPT.posts = data.data;
				improvedPT.postsrefs = data.references;
				improvedPT.createPrintPage();
			});
		});
	};
	improvedPT.addBoldText = function () {
		$('#new_post textarea').after('<a href="#" id="boldText" title="Bold Text">Bold Selected Text</a> | <a href="#" id="italicText" title="Italic Text">Italic Selected Text</a> | <a href="#" id="boldItalicText" title="Bold Italic Text">Bold and Italic Selected Text</a> | <a href="#" id="createLink" title="Create Link">Create Link</a><br><br>');
		$(document).on("click", "#boldText", function (e) {
			e.preventDefault();
			var el = $('#new_post textarea')[0];
			if (el.setSelectionRange) {
				el.value = el.value.substring(0,el.selectionStart) + "[b]" + el.value.substring(el.selectionStart,el.selectionEnd) + "[/b]" + el.value.substring(el.selectionEnd,el.value.length);
			}
		});
	};
	improvedPT.addItalicText = function () {
		$(document).on("click", "#italicText", function (e) {
			e.preventDefault();
			var el = $('#new_post textarea')[0];
			if (el.setSelectionRange) {
				el.value = el.value.substring(0,el.selectionStart) + "[i]" + el.value.substring(el.selectionStart,el.selectionEnd) + "[/i]" + el.value.substring(el.selectionEnd,el.value.length);
			}
		});
	};
	improvedPT.addBoldItalicText = function () {
		$(document).on("click", "#boldItalicText", function (e) {
			e.preventDefault();
			var el = $('#new_post textarea')[0];
			if (el.setSelectionRange) {
				el.value = el.value.substring(0,el.selectionStart) + "[b][i]" + el.value.substring(el.selectionStart,el.selectionEnd) + "[/i][/b]" + el.value.substring(el.selectionEnd,el.value.length);
			}
		});
	};
	improvedPT.addLink = function () {
		var el = $('#new_post textarea')[0],
			tte = '[a href="' + document.getElementById('ptlinkurl').value + '"]' + document.getElementById('ptlinktext').value + '[/a]';
		if (document.getElementById('ptlinkitalic').checked) {tte = "[i]" + tte + "[/i]";}
		if (document.getElementById('ptlinkbold').checked) {tte = "[b]" + tte + "[/b]";}
		el.value += tte;
		document.getElementById('ptlinkurl').value = "";
		document.getElementById('ptlinktext').value = "";
	};
	improvedPT.addLinkBuilder = function () {
		var linkFormElements = '<div class="form-group"><label for="ptlinkurl">Link URL</label><input id="ptlinkurl" type="text" class="form-control"></div><div class="form-group"><label for="ptlinktext">Link Text</label><input id="ptlinktext" type="text" class="form-control"></div><div class="checkbox" style="float:left;vertical-align:top;margin-top:0;margin-right:15px;"><label><input id="ptlinkbold" type="checkbox">Bold</label></div><div class="checkbox"style="float:left;vertical-align:top;margin-top:0;margin-right:15px;"><label><input id="ptlinkitalic" type="checkbox">Italic</label></div><br>';
		$(document).on("click", "#createLink", function (e) {
			e.preventDefault();
			BootstrapDialog.show({
				title: 'Create a Link',
				message: linkFormElements,
				buttons: [{
					label: 'Insert Link',
					action: function (dialogRef) {
						addLink();
						dialogRef.close();
					}
				},
				{
					label: 'Close',
					action: function (dialogRef) {
						dialogRef.close();
					}
				}]
			});
		});
	};
	improvedPT.getPostBodyById = function (posts, postId) {
		var post = posts.filter(function (obj) {
			return obj.id === parseInt(postId, 10);
		});
		return post[0].body;
	};
	improvedPT.enableQuoteOverride = function () {
		$('a[href="#reply"]').parent('span').html('').html('<a class="add_quote_to_reply" title="Quote Post In Reply"><img src="/Content/images/sprites/quote.png"></a>');
		$(document).on('click', '.add_quote_to_reply', function (e) {
			e.preventDefault();
			var postId = $(this).closest('.post_tools').find('a[href^="/PhantasyMail/"]').attr('href').replace(/\D/g,'');
			var userName = $(this).closest('.post_header').find('.poster_name a').text();
			var originalTextAreaContent = $('#new_post textarea').val();
			$.get("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/threads/" + location.pathname.split('/')[4] + "/posts?limit=499&skip=0", function(data) {
				improvedPT.posts = data.data;
				improvedPT.postsrefs = data.references;
				var quotedPostBody = improvedPT.getPostBodyById(improvedPT.posts, postId);
				var quotedQuotedPostBody = '[quote=' + userName + ']' + quotedPostBody + '[/quote]';
				$('#new_post textarea').val(originalTextAreaContent + quotedQuotedPostBody);
				$('html, body').animate({
					scrollTop: $("#reply").offset().top
				}, "slow");
			});
		});
		$('.add_quote_to_reply').css('cursor', 'pointer');
	};
	improvedPT.getBands = function () {
		$.get("https://www.phantasytour.com/api/bands", function(data) {
			improvedPT.bands = data;

			$.get("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/threads/" + location.pathname.split('/')[4] + "/posts?limit=499&skip=0", function(data) {
				improvedPT.posts = data.data;
				improvedPT.postsrefs = data.references;
			});

			setTimeout(improvedPT.checkMT, 2000);
			setTimeout(improvedPT.addScrollDown, 2000);
			setTimeout(improvedPT.addBumpThread, 2500);
			setTimeout(improvedPT.addPrintThread, 2500);
			setTimeout(improvedPT.addBoldText, 2500);
			setTimeout(improvedPT.addItalicText, 2500);
			setTimeout(improvedPT.addBoldItalicText, 2500);
			setTimeout(improvedPT.addLinkBuilder, 2500);
			setTimeout(improvedPT.enableQuoteOverride, 2500);
		});
	};
	$(document).ready(function() {
		improvedPT.getBands();
	});

	improvedPT.replaceLinks = function () {
		/*$.post("http://"+wnindow.location.host + window.location.pathname, {authenticity_token: $('input[name*="authenticity_token"]').val(), post_body:"testing123",post_topic_id: topic,commit: "Post Reply"}, function(data) {
				alert(data);
			});*/
		$("a[href$='.jpg'], a[href$='.jpeg'], a[href$='.png'], a[href$='.gif']").each(function(i) {
			var href = $(this).attr('href');
			var text = $(this).text();
			improvedPT.originalColor = $(this).css("color");
			var stringer = "";
			if (text !== href) {
				stringer = text;
			}
			if (improvedPT.showSet === "load" && ($(this).parents("em").css("font-style") !== "italic" || improvedPT.quotesSet === "qyes")) {
				$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='ptimg" + i + "' src='" + href + "' alt='' style='max-width:100%;' />");
			} else {
				$(this).css("color", "#" + improvedPT.colorSet).attr("class", "ptimg" + i).click(function() {
					$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
					return false;
				});
			}
			$("#ptimg" + i).error(function() {
				$(this).hide().parent("a").css("color", improvedPT.originalColor);
			});
		});
		var temp = true;
		if ($("a[href*='youtube'], a[href*='youtu.be'], a[href*='vimeo'], a[href$='.gifv']").length >= 10) {
			temp = false;
		}
		$("a[href*='youtube'], a[href*='youtu.be']").each(function() {
			var href = $(this).attr("href");
			var text = $(this).text().replace("amp;", "");
			var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
			var id = href.match(myregexp); //^[^v]+v.(.{11}).*
			if (id == null) {return;}
			else {id = id[1];}
			var stringer = "";
			if (text !== href) {
				stringer = text;
			}
			var objectstr = '<iframe class="youtube-player" type="text/html" width="100%" height="385" src="https://www.youtube.com/embed/' + id + '" frameborder="0"></iframe>';

			if ((improvedPT.videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") !== "italic" || improvedPT.quotesSet === "qyes")) {
				$(this).css("color", "black").html(stringer + objectstr);
			} else {
				$(this).css("color", "#" + improvedPT.colorSet).click(function() {
					$(this).css("color", "black").html(stringer + objectstr);
					return false;
				});
			}
		});
		$("a[href*='vimeo']").each(function() {
			var href = $(this).attr("href");
			var text = $(this).text();
			var id = href.match(/[0-9]+/, "");
			var objectstr = '<iframe class="vimeo-player" src="https://player.vimeo.com/video/' + id + '?portrait=0" width="100%" height="335" frameborder="0"></iframe>';
			var stringer = "";
			if (text !== href) {
				stringer = text;
			}
			if ((improvedPT.videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") !== "italic" || improvedPT.quotesSet === "qyes")) {
				$(this).css("color", "black").html(stringer + objectstr);
			} else {
				$(this).css("color", "#" + improvedPT.colorSet).click(function() {
					$(this).css("color", "black").html(stringer + objectstr);
					return false;
				});
			}
		});
		$("a[href$='.gifv']").each(function() {
			var href = $(this).attr("href");
			var text = $(this).text();
			var objectstr = '<iframe class="gifv-player" src="' + href.replace('http://', 'https://') + '" width="100%" height="335" frameborder="0"></iframe>';
			var stringer = "";
			if (text !== href) {
				stringer = text;
			}
			if ((improvedPT.videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") !== "italic" || improvedPT.quotesSet === "qyes")) {
				$(this).css("color", "black").html(stringer + objectstr);
			} else {
				$(this).css("color", "#" + improvedPT.colorSet).click(function() {
					$(this).css("color", "black").html(stringer + objectstr);
					return false;
				});
			}
		});
		$(".post:not(:hidden):even").removeClass("even").addClass("odd");
		$(".post:not(:hidden):odd").removeClass("odd").addClass("even");
		if (improvedPT.scrollSet !== "false") {
			$('.post_body_container').attr('style', function(i, s) { return (s||'') + 'max-height: none !important;'; });
		}
		if (improvedPT.sfwSet !== "false") {
			$(".post:not(:hidden):even").removeClass("odd");
			$(".post:not(:hidden):odd").removeClass("even");
		}
	};
	improvedPT.checkLoad = function () {
		improvedPT.replaceLinks();
	};

	var num;
	$(document).on("mouseup", "ul.pagination li a, button.load-more-button", function() {
		num = $(".post").length;
		setTimeout(improvedPT.checkLoad, 3500);
	});

	$(document).ajaxComplete(function() {
		num = $(".post").length;
		setTimeout(improvedPT.checkLoad, 3500);
	});

	$("#bottom-pagination-container div + div > a:last").prev('a').attr("onclick", "").click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, "slow");
	});



	$(document).off("click", "#bottom-pagination-container div a:contains('MT'), .topic_header div a:contains('MT')").on("click", "#bottom-pagination-container div a:contains('MT'), .topic_header div a:contains('MT')", function() {
		$.post("/api/mythreads/" + location.pathname.split('/')[4], function() {
			$("#bottom-pagination-container div a:contains('MT')").html($("#bottom-pagination-container div a:contains('MT')").html() + '✔').css("color", "#757575");
			$(".topic_header div a:contains('MT')").html($(".topic_header div a:contains('MT')").html() + '✔');
			improvedPT.mt = true;
		});
		return false;
	});

	function checkOc(s, y) {
		var number = 0;
		while (s.indexOf(y, 0) >= 0) {
			number++;
			s = s.replace(y, "");
		}
		return number;
	}

	$("img").on("mousedown", function() {
		improvedPT.lastele = $(this);
	});

	chrome.extension.sendRequest({
		set: "show"
	}, function(response) {
		improvedPT.showSet = response.setShow;
		improvedPT.colorSet = response.setColor;
		improvedPT.quotesSet = response.setQuotes;
		improvedPT.videoSet = response.setVideo;
		improvedPT.reloadTopic = response.setReload;
		improvedPT.scrollSet = response.setScroll;
		improvedPT.sfwSet = response.setSfw;
		if (improvedPT.reloadTopic !== "false") {
			setTimeout(function () {
				$('button[data-bind*="click: postReply"]').after($('button[data-bind*="click: postReply"]').clone().removeAttr('data-bind').removeAttr('disabled').attr('type', 'button').attr('id', 'postReplyBtn')).hide();
				$('button[data-bind*="click: onPreview"]').after($('button[data-bind*="click: onPreview"]').clone().removeAttr('data-bind').removeAttr('disabled').attr('type', 'button').attr('id', 'previewReplyBtn')).hide();
			}, 2500);
			$(document).off('click', '#postReplyBtn').on("click", '#postReplyBtn', function(e) {
				e.preventDefault;
				$(this).val("Posting...").attr('disabled', 'disabled');
				$("#errorExplanation").remove();
				if (checkOc($("#new_post textarea").val(), "quote") > 8) {

					$("#applicationHost").after('<div class="errorExplanation" id="errorExplanation"><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>You cannot have more than 4 quotes.</li></ul></div>');
					$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
					return false;
				}
				if ($("#new_post textarea").val().length < 1) {
					var errorHTML = "<div class='errorExplanation' id='errorExplanation'><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>Body is too short (minimum is 2 characters)</li></ul></div>";
					$("#applicationHost").after(errorHTML);
					return false;
				} else if ($("#new_post textarea").val().length < 2) {
					$("#new_post textarea").val($("#new_post textarea").val() + " ");
				}
				$.post("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" + location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2]) + "/posts", {"Body": $("#new_post textarea").val(), "ThreadId": location.pathname.split('/')[4]}, function() {
					improvedPT.mt = true;
					$("#new_post textarea").val("");
					$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
					improvedPT.afterAjax();
				});
			});
			$(document).off('click', '#previewReplyBtn').on("click", '#previewReplyBtn', function(e) {
				e.preventDefault;
				$(this).val("Previewing...").attr('disabled', 'disabled');
				$("#errorExplanation").remove();
				if (checkOc($("#new_post textarea").val(), "quote") > 8) {

					$("#applicationHost").after('<div class="errorExplanation" id="errorExplanation"><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>You cannot have more than 4 quotes.</li></ul></div>');
					$('#previewReplyBtn').val("Preview").removeAttr("disabled");
					return false;
				}
				if ($("#new_post textarea").val().length < 1) {
					var errorHTML = "<div class='errorExplanation' id='errorExplanation'><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>Body is too short (minimum is 2 characters)</li></ul></div>";
					$("#applicationHost").after(errorHTML);
					return false;
				} else if ($("#new_post textarea").val().length < 2) {
					$("#new_post textarea").val($("#new_post textarea").val() + " ");
				}
				//var app = require('durandal/app');
				//app.showMessage($("#new_post textarea").val(), "Your thoughts...", ["Close"], !0, {style:{width:"800px",height:"400px"}});
				var message = $("#new_post textarea").val();
				var messageBody = XBBCODE.process({text: message, removeMisalignedTags: false, addInLineBreaks: true});
				BootstrapDialog.show({
					title: 'Your thoughts...',
					message: messageBody.html,
					onhide: function () {
						$('#previewReplyBtn').val("Preview").removeAttr("disabled");
					},
					buttons: [{
						label: 'Close',
						action: function (dialogRef) {
							dialogRef.close();
						}
					}]
				});
			});
		}
		if (!improvedPT.colorSet) {
			improvedPT.colorSet = "0000FF";
		}
		setTimeout(function () {
			if (improvedPT.sfwSet !== "false") {
				$('body').attr('style', function(i, s) { return (s||'') + 'background: #fff !important;'; });
				$('#main').css('background', '#fff');
				$('#branding').css('display', 'none');
				$('.col1 .yuimenu a').attr('style', function(i, s) { return (s||'') + 'color: #337ab7 !important;'; });
				$('.col1_container').attr('style', function(i, s) { return (s||'') + 'background: #fafafa !important;'; });
				$('.col1_container').attr('style', function(i, s) { return (s||'') + 'border: 1px solid #ccc !important;'; });
				$('.post_listing .topic_header').css('color', '#444');
				$('.post_listing .topic_header').attr('style', function(i, s) { return (s||'') + 'background: #fff !important;'; });
				$('.post_listing .topic_header').attr('style', function(i, s) { return (s||'') + 'border: 1px solid #ccc !important;'; });
				$('.post_listing .topic_header .mod_tools a').css('color', '#337ab7');
				$('.btn-success').css({"color": "#444", "background-color": "#f0f0f0", "border-color": "#ccc"});
				$('.post_listing .post .post_header span.poster_name a').css('color', '#337ab7');
				$('.rbroundbox h4').css('color', '#444');
				$('#pt_menubar_top_container').css({"height": "50px", "background": "#0c0c0c", "position": "relative", "z-index": "29"});
				$('#pt_menubar_top').css({"z-index": "0", "position": "relative", "display": "block", "visibility": "visible"});
				$('#pt_menubar_top').prepend('<a href="/" id="logo" class="nav__logo"></a>');
				$('.nav__logo').css({"background-image": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAMAAAAPK1hoAAAATlBMVEXLAADOEBD////YQED87+/SICD88PDfYGDVMDDywMDsoKDyv7/bUFD10ND439/lgIDokJD54ODicHDvsLD1z8/rn5/vr6/oj4/bT0/eX18SZPv4AAACRUlEQVR4Ae3W227jLBRA4c3i7LPjHNr3f9FfDCll9NuOpbll3WUjfSEuIZVWq9VqtVqt1k7KLzE6gDm9vI2wDfX6POI2XV4DSAROTL2Ry6oaIdUpeWfX9+S6qpJZq5F3m7wbobDX1MEBtRoApt7kt0h5gHsPMFxTPSnz+CofdwaeIsGAs5LqgPk9UVfUgdRLKd/FP3nZAH1zwZdnEAG1ODUn/YJqHWC0WhzlCcSkzkTpAf1Wk9HJBNjPakxoCCulojIEYKxU9ADEj6oGCMGxp66qA26VOpbtn6oxMSqh9F9lmNW0kv88RcVbYP2gWsCoDjBeSkV19gYslerUAszn6g1YEk1Ba5VNJiAUtWz/VN2AkOhedlW0BmKlYj3Qnarjz9pwoI7yTKuVGuUO6DMVuMsKyIHKzQJrefey/Q9qFM7U/H2iUlfpgA/qKNOhugGLMpWxALM15+r9/LnqCQi+MpQp279wBuKOWk5AXxn5BEz8w3nVCWTQtXEH9HCqJtCpDnB+V7W8r4NilO0fq2k1f10gDpJTK0WVch0UowN8uHJnGeqo1AQ6O1eGTRO1HKllsy6E6UgVn6+DYpTtn6nWJFarl6GO8KPmG1XXxgTY24XfrUWp70f/21Pij6qBUR7m1xjydXCX9dNvrOsGJVUzQJ50+Y4NFKMHfNYnOWgw7NfndWWAMVb/ddgyoZOj1JPddHVQcqH+fClj5Ti94xr/v0+TJxVrgpymvl99bwp571+2Xn1NmEc9sY+J6a9Jq9VqtVqtVus/4SAa34bCihgAAAAASUVORK5CYII=')", "background-position": "0 0", "background-repeat": "no-repeat", "background-size": "60px", "display": "inline-block", "height": "60px", "position": "relative", "width": "60px", "z-index": "33"});
				$('#pt_menubar_top div.bd').css({"position": "absolute", "top": "0", "left": "70px", "line-height": "50px", "display": "block", "width": "914px"});
				$('#pt_menubar_top div.bd ul').css({"position": "absolute", "top": "0", "line-height": "50px", "display": "block", "width": "914px"});
				$('#pt_menubar_top div.bd ul li').css({"line-height": "50px"});
				$('#pt_menubar_top .yuimenubaritem').css({"font-size": "15px", "padding": "0"});
				$('#pt_menubar_top div.bd ul li a').css({"border-right": "1px solid #595959", "font-weight": "300", "display": "inline-block", "line-height": "1", "margin": "0 .4em 0 0", "padding": "0 .3em 0 0", "letter-spacing": ".04em", "-moz-transition": "color .2s", "-o-transition": "color .2s", "-webkit-transition": "color .2s", "transition": "color .2s"});
				$(".post:not(:hidden):even").removeClass("odd");
				$(".post:not(:hidden):odd").removeClass("even");
			}
		}, 3500);
		improvedPT.replaceLinks();
	});

	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		if (request.run === "replaceLinks") {
			var videoset2 = improvedPT.videoSet;
			var showset2 = improvedPT.showSet;
			improvedPT.showSet = "load";
			improvedPT.videoSet = "vload";
			improvedPT.replaceLinks();
			improvedPT.showSet = showset2;
			improvedPT.videoSet = videoset2;
		} else if (request.run === "close") {
			var par = improvedPT.lastele.parent("a");
			improvedPT.lastele.remove();
			var href = par.attr("href");
			var stringer = par.text();
			if (par.text().length === 0) {
				par.html(href);
			}
			par.css("color", "#" + improvedPT.colorSet).click(function() {
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
				par.css("color", "#" + improvedPT.colorSet).click(function() {
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
				par.css("color", "#" + improvedPT.colorSet).click(function() {
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
				par.css("color", "#" + improvedPT.colorSet).click(function() {
					$(this).css("color", "black").html(stringer + '<iframe class="vimeo-player" src="http://player.vimeo.com/video/' + id + '?portrait=0" width="100%" height="335" frameborder="0"></iframe>').unbind('click');
					return false;
				});
			});
			$(".gifv-player").each(function() {
				var par = $(this).parent("a");
				var href = par.attr("href");
				$(this).remove();
				var stringer = par.text();
				if (par.text().length === 0) {
					par.html(href);
				}
				par.css("color", "#" + improvedPT.colorSet).click(function() {
					$(this).css("color", "black").html(stringer + '<iframe class="gifv-player" src="' + href.replace('http://', 'https://') + '" width="100%" height="335" frameborder="0"></iframe>').unbind('click');
					return false;
				});
			});
		}
		sendResponse({}); // snub them.
	});

}(jQuery));