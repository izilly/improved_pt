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
					$(this).html(DOMPurify.sanitize(name + 420, {SAFE_FOR_JQUERY: true}));
				} else {
					$(this).html(DOMPurify.sanitize(name + " (I really have 420 in my name)", {SAFE_FOR_JQUERY: true}));
				}
			});
		});
	}
	// End April Fools Day

	$.fn.focusToEnd = function() {
		return this.each(function() {
			var v = $(this).val();
			$(this).focus().val("").val(v);
		});
	};

	$.fn.selectRange = function (start, end) {
		if(end === undefined) {
			end = start;
		}
		return this.each(function() {
			var range;
			if('selectionStart' in this) {
				this.selectionStart = start;
				this.selectionEnd = end;
			} else if(this.setSelectionRange) {
				this.setSelectionRange(start, end);
			} else if(this.createTextRange) {
				range = this.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', start);
				range.select();
			}
		});
	};

	// setup a MutationObserver
	// https://github.com/ryanmorr/ready
	(function(win){
			'use strict';
			var listeners = [],
			doc = document;
			function ready(selector, fn){
					// Store the selector and callback to be monitored
					listeners.push({
							selector: selector,
							fn: fn
					});
					if(!win.observer){
							// Watch for changes in the document
							win.observer = new MutationObserver(checkListeners);
							win.observer.observe(doc.documentElement, {
									childList: true,
									subtree: true
							});
					}
					// Check if the element is currently in the DOM
					checkSelector(selector, fn);
			}
			function checkListeners(){
					// Check the DOM for elements matching a stored selector
					for(var i = 0, len = listeners.length, listener; i < len; i++){
							listener = listeners[i];
							checkSelector(listener.selector, listener.fn);
					}
			}
			function checkSelector(selector, fn){
					// Query for elements matching the specified selector
					var elements = doc.querySelectorAll(selector), i = 0, len = elements.length, element;
					for(; i < len; i++){
							element = elements[i];
							// Make sure the callback isn't invoked with the
							// same element more than once
							if(!element.ready){
									element.ready = true;
									// Invoke the callback with the element
									fn.call(element, element);
							}
					}
			}
			// Expose `ready`
			win.ready = ready;
	})(improvedPT);

	improvedPT.getBandApiUrlByWebUrl = function (bands, webUrl) {
		var band = bands.filter(function (obj) {
			return obj.webUrl === webUrl;
		});
		return band[0].url;
	};
	improvedPT.checkMT = function () {
		var topic = $("#post-listing .topic_title").text(),
			isLoggedIn = $('.yuimenubaritem.session_menu_item a[href="/my/profile"]').length > 0;
		if (isLoggedIn) {
			improvedPT.mt = false;
			$.get("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" +  DOMPurify.sanitize(location.pathname.split('/')[1], {SAFE_FOR_JQUERY: true}) + "/" + DOMPurify.sanitize(location.pathname.split('/')[2], {SAFE_FOR_JQUERY: true})) + "/mythreads?skip=0&pageSize=40", function (data) {
				var i;
				improvedPT.mythreads = data.aaData;
				for (i = 0; i < improvedPT.mythreads.length; i += 1) {
					if (improvedPT.mythreads[i].Subject === topic) {
						improvedPT.mt = true;
					}
				}
				if (improvedPT.mt) {
					if ($('#bottom-pagination-container div a:contains("✔")').length < 1) {
						$("#bottom-pagination-container div a:contains('MT')").html(DOMPurify.sanitize($("#bottom-pagination-container div a:contains('MT')").html(), {SAFE_FOR_JQUERY: true}) + '✔');
					}
					if ($('.topic_header div a:contains("✔")').length < 1) {
						$(".topic_header div a:contains('MT')").html(DOMPurify.sanitize($(".topic_header div a:contains('MT')").html(), {SAFE_FOR_JQUERY: true}) + '✔');
					}
				}
			});
		}
	};
	improvedPT.addOptionsLink = function () {
		if ($('#improved_pt_options').length < 1) {
			$("#bs-example-navbar-collapse-1 ul.nav.navbar-nav.navbar-right").prepend('<li id="improved_pt_options"><a href="#"><span data-bind="text: label">Options</span></a></li>');
			$('#improved_pt_options a').on('click', function (e) {
				e.preventDefault();
				chrome.runtime.sendMessage({set: "options"});
			}).css('cursor', 'pointer');
		}
	};
	improvedPT.addScrollDown = function () {
		if ($('#scrollDown').length < 1) {
			$(".topic_header .mod_tools > a:last").after('<span class="usr_tools"><a href="#" id="scrollDown" title="Go Down">Down</a></span>');

			$(document).on("click", "#scrollDown", function (e) {
				e.preventDefault();
				$('html, body').animate({
					scrollTop: $("#applicationHost").height()
				}, "slow");
			});
		}
	};
	improvedPT.afterAjax = function () {
		$('button.btn.btn-default.btn-large.load-more-button').click();
		//setTimeout(improvedPT.enableQuoteOverride, 2500);
	};
	improvedPT.addBumpThread = function () {
		if ($('#bumpThread').length < 1) {
			$(".topic_header .mod_tools > span a#scrollDown").before('<a href="#" id="bumpThread" title="Bump">Bump</a><a href="#" id="diaf" title="DIAF">DIAF</a><a href="#" id="lys" title="LYS">LYS</a><a href="#" id="kys" title="KYS">KYS</a><a href="#" id="nam" title="NAM">Nam</a></span>');
			$(document).on("click", "#bumpThread, #diaf, #lys, #kys, #nam", function () {
				var text = DOMPurify.sanitize($(this).html(), {SAFE_FOR_JQUERY: true});
				if (text === 'Nam') {
					text = 'https://i.imgur.com/znUlc.jpg';
				}
				$("#new_post textarea").val(text);
				$.post("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" + DOMPurify.sanitize(location.pathname.split('/')[1], {SAFE_FOR_JQUERY: true}) + "/" + DOMPurify.sanitize(location.pathname.split('/')[2], {SAFE_FOR_JQUERY: true})) + "/posts", {"Body": DOMPurify.sanitize($("#new_post textarea").val(), {SAFE_FOR_JQUERY: true}), "ThreadId": DOMPurify.sanitize(location.pathname.split('/')[4], {SAFE_FOR_JQUERY: true})}, function() {
					improvedPT.mt = true;
					$("#new_post textarea").val("");
					$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
					improvedPT.afterAjax();
				});
			});
		}
	};
	improvedPT.filterByAuthorID = function (obj) {
		return obj.id === parseInt(this.authorId, 10);
	};
	improvedPT.filterForThreadSubject = function (obj) {
		return obj.type === "Thread";
	};
	improvedPT.createTabForPrint = function (tableHead, tableBody) {
		chrome.runtime.sendMessage({
			set: "print",
			tableHead: tableHead,
			tableBody: tableBody
		});
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
		//var opened = window.open('');
		//opened.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>My title</title><style type="text/css">blockquote{border:1px solid rgba(221,221,221,.5);padding:3px;margin:6px 15px;}th{font-weight:normal;}td.ptdata,th.pthead{font-size:11px;vertical-align:top;}th.pthead{text-align:left;}td.ptdata{text-align:right;width:150px;padding-bottom:15px;border-top:1px solid rgba(221,221,221,.5);}td.ptdata span,th.pthead span{font-size:12px;font-weight:bold;}td.ptpost{vertical-align:top;font-size:12px;padding-bottom:15px;border-top:1px solid rgba(221,221,221,.5);}</style></head><body><table><thead>' + tableHead + '</thead><tbody>' + tableBody + '</tbody></table></body></html>');
		//var htmlCode = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>My title</title><style type="text/css">blockquote{border:1px solid rgba(221,221,221,.5);padding:3px;margin:6px 15px;}th{font-weight:normal;}td.ptdata,th.pthead{font-size:11px;vertical-align:top;}th.pthead{text-align:left;}td.ptdata{text-align:right;width:150px;padding-bottom:15px;border-top:1px solid rgba(221,221,221,.5);}td.ptdata span,th.pthead span{font-size:12px;font-weight:bold;}td.ptpost{vertical-align:top;font-size:12px;padding-bottom:15px;border-top:1px solid rgba(221,221,221,.5);}</style></head><body><table><thead>' + tableHead + '</thead><tbody>' + tableBody + '</tbody></table></body></html>';
		improvedPT.createTabForPrint(tableHead, tableBody);
	};
	improvedPT.addPrintThread = function () {
		if ($('#printThread').length < 1) {
			$(".topic_header .mod_tools > span a#scrollDown").after('<a href="#" id="printThread" title="Print Thread">Print</a>');
			
			$(document).on("click", "#printThread", function (e) {
				e.preventDefault();

				$.get("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" + DOMPurify.sanitize(location.pathname.split('/')[1], {SAFE_FOR_JQUERY: true}) + "/" + DOMPurify.sanitize(location.pathname.split('/')[2], {SAFE_FOR_JQUERY: true})) + "/threads/" + DOMPurify.sanitize(location.pathname.split('/')[4], {SAFE_FOR_JQUERY: true}) + "/posts?limit=499&skip=0", function(data) {
					improvedPT.posts = data.data;
					improvedPT.postsrefs = data.references;
					improvedPT.createPrintPage();
				});
			});
		}
	};
	improvedPT.addBoldText = function () {
		if ($('#boldText').length < 1) {
			$('#new_post textarea').attr('id', 'postbox');
			//$('#new_post textarea').after('<a href="#" id="boldText" title="Bold Text">Bold Selected Text</a> | <a href="#" id="italicText" title="Italic Text">Italic Selected Text</a> | <a href="#" id="boldItalicText" title="Bold Italic Text">Bold and Italic Selected Text</a> | <a href="#" id="createLink" title="Create Link">Create Link</a><br><br>');
			$('#new_post textarea').after('<a href="#" id="boldText" title="Bold Text" onclick="setTimeout(function(){var root = ko.contextFor(document.getElementById(\'postbox\')).$root;root.newReplyBody(document.getElementById(\'postbox\').value); $(\'#postbox\').change();}, 169)">Bold Selected Text</a> | <a href="#" id="italicText" title="Italic Text" onclick="setTimeout(function(){var root = ko.contextFor(document.getElementById(\'postbox\')).$root;root.newReplyBody(document.getElementById(\'postbox\').value); $(\'#postbox\').change();}, 169)">Italic Selected Text</a> | <a href="#" id="boldItalicText" title="Bold Italic Text" onclick="setTimeout(function(){var root = ko.contextFor(document.getElementById(\'postbox\')).$root;root.newReplyBody(document.getElementById(\'postbox\').value); $(\'#postbox\').change();}, 169)">Bold and Italic Selected Text</a> | <a href="#" id="createLink" title="Create Link">Create Link</a><br><br>');
			$(document).off("click", "#boldText").on("click", "#boldText", function (e) {
				var el = $('#new_post textarea')[0];
				e.preventDefault();
				if (el.setSelectionRange) {
					el.value = el.value.substring(0,el.selectionStart) + "[b]" + el.value.substring(el.selectionStart,el.selectionEnd) + "[/b]" + el.value.substring(el.selectionEnd,el.value.length);
				}
			});
		}
	};
	improvedPT.addItalicText = function () {
		$(document).off("click", "#italicText").on("click", "#italicText", function (e) {
			var el = $('#new_post textarea')[0];
			e.preventDefault();
			if (el.setSelectionRange) {
				el.value = el.value.substring(0,el.selectionStart) + "[i]" + el.value.substring(el.selectionStart,el.selectionEnd) + "[/i]" + el.value.substring(el.selectionEnd,el.value.length);
			}
		});
	};
	improvedPT.addBoldItalicText = function () {
		$(document).off("click", "#boldItalicText").on("click", "#boldItalicText", function (e) {
			var el = $('#new_post textarea')[0];
			e.preventDefault();
			if (el.setSelectionRange) {
				el.value = el.value.substring(0,el.selectionStart) + "[b][i]" + el.value.substring(el.selectionStart,el.selectionEnd) + "[/i][/b]" + el.value.substring(el.selectionEnd,el.value.length);
			}
		});
	};
	improvedPT.addLinkBuilder = function () {
		$(document).off("click", "#createLink").on("click", "#createLink", function (e) {
			var cursorPosA, cursorPosB, textAreaValue, textBefore, textAfter, anchorText = '', linkCode = '', linkFormElements;
			e.preventDefault();
			cursorPosA = $('#new_post textarea').prop('selectionStart');
			cursorPosB = $('#new_post textarea').prop('selectionEnd');
			textAreaValue = DOMPurify.sanitize($('#new_post textarea').val(), {SAFE_FOR_JQUERY: true});
			if (cursorPosA !== cursorPosB) {
				textBefore = textAreaValue.substring(0, cursorPosA);
				textAfter = textAreaValue.substring(cursorPosB, textAreaValue.length);
				anchorText = textAreaValue.substring(cursorPosA, cursorPosB);
			} else {
				textBefore = textAreaValue.substring(0, cursorPosA);
				textAfter = textAreaValue.substring(cursorPosA, textAreaValue.length);
			}
			linkFormElements = '<div class="form-group"><label for="ptlinkurl">Link URL</label><input id="ptlinkurl" type="text" class="form-control"></div><div class="form-group"><label for="ptlinktext">Link Text</label><input id="ptlinktext" type="text" class="form-control"></div><div class="checkbox" style="float:left;vertical-align:top;margin-top:0;margin-right:15px;"><label><input id="ptlinkbold" type="checkbox">Bold</label></div><div class="checkbox"style="float:left;vertical-align:top;margin-top:0;margin-right:15px;"><label><input id="ptlinkitalic" type="checkbox">Italic</label></div><br>';
			BootstrapDialog.show({
				title: 'Create a Link',
				message: linkFormElements,
				onshown: function () {
					$('#ptlinktext').val(anchorText);
				},
				onhidden: function () {
					$('#new_post textarea').focus().selectRange(cursorPosA + linkCode.length);
				},
				buttons: [{
					label: 'Insert Link',
					action: function (dialogRef) {
						linkCode = '[a href="' + DOMPurify.sanitize($('#ptlinkurl').val(), {SAFE_FOR_JQUERY: true}) + '"]' + DOMPurify.sanitize($('#ptlinktext').val(), {SAFE_FOR_JQUERY: true}) + '[/a]';
						if (document.getElementById('ptlinkitalic').checked) {linkCode = "[i]" + linkCode + "[/i]";}
						if (document.getElementById('ptlinkbold').checked) {linkCode = "[b]" + linkCode + "[/b]";}
						$('#new_post textarea').val(textBefore + linkCode + textAfter);
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
			setTimeout(function(){$('.bootstrap-dialog-footer-buttons .btn-default').attr('onclick', "setTimeout(function(){var root = ko.contextFor(document.getElementById('postbox')).$root;root.newReplyBody(document.getElementById('postbox').value); $('#postbox').change();}, 169)");},169);
		});
	};
	improvedPT.getPostBodyById = function (posts, postId) {
		var post = posts.filter(function (obj) {
			return obj.id === parseInt(postId, 10);
		});
		return post[0].body;
	};
	improvedPT.enableQuoteOverride = function () {
		$('a[href="#reply"]').parent('span').html('').html('<a class="add_quote_to_reply" title="Quote Post In Reply"><img src="/Content/images/sprites/quote.png"></a>').after('<span><a class="add_quote_with_this_to_reply" title=\'Quote Post With "This" In Reply\'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4AQTBx0bHfpc5gAAAPhJREFUOMvd06GOwkAQBuB/L7Q7TWpw1DWkpooET1JTga/kuaobnoAH4AFIcKgmrajAYVjT3VX/uSYcnAF19yfjJl8mkxkFgCLi8Uacc3omIt5aq98BoijyX/gw/xk4HA4IggBKKSRJgr7vXzeKiOOPHI9Haq0JYKo0TXm9Xh/6RMQ9AafTiXEcEwDDMGRZlhOS5zlvt9vvwOVy4Xw+JwAul0uez2eS5H6/n9D1ek1jzDPQdR0XiwUBsKoq3u/3h3HbtuVqtSIAbjYbjuNIEXFKRJy1VjdNg2EYkGUZdrvdy31571HXNYwxKIoC2+3WT8DfPWX16Tt/AzhxzXfaX+pLAAAAAElFTkSuQmCC"></a></span>');
		$(document).off('click', '.add_quote_to_reply, .add_quote_with_this_to_reply').on('click', '.add_quote_to_reply, .add_quote_with_this_to_reply', function (e) {
			var postId = $(this).closest('.post_tools').find('a[href^="/PhantasyMail/"]').attr('href').replace(/\D/g,''),
				userName = $(this).closest('.post_header').find('.poster_name a').text(),
				isAThisQuote = e.target.parentNode.className.indexOf('add_quote_with_this_to_reply') > -1;
			e.preventDefault();
			$.get("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" + DOMPurify.sanitize(location.pathname.split('/')[1], {SAFE_FOR_JQUERY: true}) + "/" + DOMPurify.sanitize(location.pathname.split('/')[2], {SAFE_FOR_JQUERY: true})) + "/threads/" + DOMPurify.sanitize(location.pathname.split('/')[4], {SAFE_FOR_JQUERY: true}) + "/posts?limit=499&skip=0", function(data) {
				var quotedPostBody = '', quotedQuotedPostBody = '', originalTextAreaContent = '';
				improvedPT.posts = data.data;
				improvedPT.postsrefs = data.references;
				quotedPostBody = improvedPT.getPostBodyById(improvedPT.posts, postId);//console.log('quotedPostBody: ' + quotedPostBody);
				quotedQuotedPostBody = '[quote=' + userName + ']' + quotedPostBody + '[/quote]';//console.log('quotedQuotedPostBody: ' + quotedQuotedPostBody);
				if (isAThisQuote) {quotedQuotedPostBody = quotedQuotedPostBody + 'This';}
				originalTextAreaContent = DOMPurify.sanitize($('#new_post textarea').val(), {SAFE_FOR_JQUERY: true});//console.log('originalTextAreaContent: ' + originalTextAreaContent);
				$('#new_post textarea').val(originalTextAreaContent + quotedQuotedPostBody);//console.log('originalTextAreaContent + quotedQuotedPostBody: ' + originalTextAreaContent + quotedQuotedPostBody);
				$('html, body').animate({
					scrollTop: $("#reply").offset().top
				}, "slow");
				$('#new_post textarea').focusToEnd();
			});
		});
		$('.add_quote_to_reply, .add_quote_with_this_to_reply').css('cursor', 'pointer');
	};
	improvedPT.addTheadStats = function () {
		$.get("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" + DOMPurify.sanitize(location.pathname.split('/')[1], {SAFE_FOR_JQUERY: true}) + "/" + DOMPurify.sanitize(location.pathname.split('/')[2], {SAFE_FOR_JQUERY: true})) + "/threads/" + DOMPurify.sanitize(location.pathname.split('/')[4], {SAFE_FOR_JQUERY: true}) + "/posts?limit=499&skip=0", function(data) {
			improvedPT.posts = data.data;
			improvedPT.postsrefs = data.references;

			var filteredpostsrefs, tempPostsData = [], i, totalQty = 0;
			if ($('.ipt_stats_container').length < 1) {
				for (i = 0; i < improvedPT.posts.length; i += 1) {
					filteredpostsrefs = improvedPT.postsrefs.filter(improvedPT.filterByAuthorID, {"authorId": improvedPT.posts[i].authorId});
					if (tempPostsData.filter(improvedPT.filterByAuthorID, {"authorId": improvedPT.posts[i].authorId}).length < 1) {
						tempPostsData.push({id: improvedPT.posts[i].authorId, qty: 1, username: filteredpostsrefs[0].username});
						totalQty += 1;
					} else {
						tempPostsData.filter(improvedPT.filterByAuthorID, {"authorId": improvedPT.posts[i].authorId})[0].qty = tempPostsData.filter(improvedPT.filterByAuthorID, {"authorId": improvedPT.posts[i].authorId})[0].qty + 1;
						totalQty += 1;
					}
				}
				tempPostsData.sort(function (a,b) {
					return (b.qty > a.qty) ? 1 : ((a.qty > b.qty) ? -1 : 0);
				});
				$('.col1_container').after('<div class="ipt_stats_container"><h6>Post Counts</h6><ol></ol></div>');
				for (i = 0; i < tempPostsData.length; i += 1) {
					$('.ipt_stats_container ol').append(DOMPurify.sanitize('<li>' + tempPostsData[i].username + ' ' + tempPostsData[i].qty + ' (' + (Math.round(((tempPostsData[i].qty / totalQty) * 100) * 100)/100).toFixed(2) + '%)</li>', {SAFE_FOR_JQUERY: true})).css({'font-size': '0.7em', 'padding': '5px 0 5px 25px'}).parent('.ipt_stats_container').css({'background': 'rgba(255,255,255,0.25)', 'margin-top': '5px', '-moz-border-radius': '5px', 'border-radius': '5px'}).find('h6').css({'margin': '0', 'padding': '5px 5px 0 9px'});
				}
			}
		});
	};
	improvedPT.getBands = function () {
		$.get("https://www.phantasytour.com/api/bands", function (data) {
			improvedPT.bands = data;

			improvedPT.addTheadStats();

			document.addEventListener('pt-thread-posts-loaded', function () {
				console.log('*** posts-loaded: heard ***');
				if (!improvedPT.posts_loaded_done) {
					console.log('*** posts-loaded: running ***');
					improvedPT.checkMT();
					improvedPT.addOptionsLink();
					improvedPT.addScrollDown();
					improvedPT.addBumpThread();
					improvedPT.addPrintThread();
					improvedPT.addBoldText();
					improvedPT.addItalicText();
					improvedPT.addBoldItalicText();
					improvedPT.addLinkBuilder();
					improvedPT.enableQuoteOverride();
					improvedPT.replaceLinks();
					improvedPT.threadShow();
					improvedPT.overrideMTBtns();
					// prevent handler from running more than once.
					improvedPT.posts_loaded_done = true;
				}
			});
			// observe mutations on querySelector that matches posts
			improvedPT.ready("#applicationHost div > div > div.post:last-child",
					function(element){
						console.log('*** posts-loaded: dispatching event ***');
						var event = document.createEvent('Event');
						event.initEvent('pt-thread-posts-loaded', true, true);
						document.dispatchEvent(event);
					}
			);
		});
		improvedPT.addMessageListener();
	};
	improvedPT.replaceLinks = function () {
		var temp = true;
		/*$.post("http://"+wnindow.location.host + window.location.pathname, {authenticity_token: $('input[name*="authenticity_token"]').val(), post_body:"testing123",post_topic_id: topic,commit: "Post Reply"}, function(data) {
				alert(data);
			});*/
		$("a[href$='.jpg'], a[href$='.jpeg'], a[href$='.png'], a[href$='.gif']").each(function (i) {
			var href = DOMPurify.sanitize($(this).attr('href'), {SAFE_FOR_JQUERY: true}),
				text = $(this).text(),
				stringer = "";
			improvedPT.originalColor = $(this).css("color");
			if (text !== href) {
				stringer = text;
			}
			if (href.indexOf('imgur.com/') > -1) {
				href = href.replace('http://', 'https://');
			}
			if (improvedPT.showSet === "load" && ($(this).parents("em").css("font-style") !== "italic" || improvedPT.quotesSet === "qyes")) {
				$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='ptimg" + i + "' src='" + href + "' alt='' style='max-width:100%;' />");
			} else {
				$(this).css("color", "#" + improvedPT.colorSet).attr("class", "ptimg" + i).click(function () {
					$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + DOMPurify.sanitize($(this).attr('class'), {SAFE_FOR_JQUERY: true}) + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
					return false;
				});
			}
			$("#ptimg" + i).error(function() {
				$(this).hide().parent("a").css("color", improvedPT.originalColor);
			});
		});
		if ($("a[href*='youtube'], a[href*='youtu.be'], a[href*='vimeo'], a[href$='.gifv']").length >= 10) {
			temp = false;
		}
		$("a[href*='youtube'], a[href*='youtu.be']").each(function () {
			var href = DOMPurify.sanitize($(this).attr('href'), {SAFE_FOR_JQUERY: true}),
				text = $(this).text().replace("amp;", ""),
				myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,
				id = href.match(myregexp),
				stringer, objectstr; //^[^v]+v.(.{11}).*
			if (id == null) {return;}
			else {id = id[1];}
			stringer = "";
			if (text !== href) {
				stringer = text;
			}
			objectstr = '<iframe class="youtube-player" type="text/html" width="100%" height="385" src="https://www.youtube.com/embed/' + DOMPurify.sanitize(id, {SAFE_FOR_JQUERY: true}) + '" frameborder="0"></iframe>';

			if ((improvedPT.videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") !== "italic" || improvedPT.quotesSet === "qyes")) {
				$(this).css("color", "black").html(stringer + objectstr);
			} else {
				$(this).css("color", "#" + improvedPT.colorSet).click(function () {
					$(this).css("color", "black").html(stringer + objectstr);
					return false;
				});
			}
		});
		$("a[href*='vimeo']").each(function () {
			var href = DOMPurify.sanitize($(this).attr('href'), {SAFE_FOR_JQUERY: true}),
				text = $(this).text(),
				id = href.match(/[0-9]+/, ""),
				objectstr = '<iframe class="vimeo-player" src="https://player.vimeo.com/video/' + DOMPurify.sanitize(id, {SAFE_FOR_JQUERY: true}) + '?portrait=0" width="100%" height="335" frameborder="0"></iframe>',
				stringer = "";
			if (text !== href) {
				stringer = text;
			}
			if ((improvedPT.videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") !== "italic" || improvedPT.quotesSet === "qyes")) {
				$(this).css("color", "black").html(stringer + objectstr);
			} else {
				$(this).css("color", "#" + improvedPT.colorSet).click(function () {
					$(this).css("color", "black").html(stringer + objectstr);
					return false;
				});
			}
		});
		$("a[href$='.gifv'], a[href$='.webm']").filter(':contains(imgur)').each(function () {
			var href = DOMPurify.sanitize($(this).attr('href'), {SAFE_FOR_JQUERY: true}),
				text = $(this).text().replace("amp;", ""),
				myregexp = /(?:i\.imgur\.com\/)([^"&?\/ ]{7})/i,
				id = href.match(myregexp),
				stringer, objectstr; //^[^v]+v.(.{11}).*
			if (id == null) {return;}
			else {id = id[1];}
			stringer = "";
			if (text !== href) {
				stringer = text;
			}
			objectstr = '<blockquote class="imgur-embed-pub" lang="en" data-id="' + id + '"><a href="//imgur.com/' + id + '">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>';

			if ((improvedPT.videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") !== "italic" || improvedPT.quotesSet === "qyes")) {
				$(this).css("color", "black").html(stringer + objectstr);
			} else {
				$(this).css("color", "#" + improvedPT.colorSet).click(function () {
					$(this).css("color", "black").html(stringer + objectstr);
					return false;
				});
			}
		});
		$('a[href*="archive.org"]').each(function () {
			var href = DOMPurify.sanitize($(this).attr('href'), {SAFE_FOR_JQUERY: true}),
				text = $(this).text().replace("amp;", ""),
				myregexp = /(?:archive\.org\/details\/)([^"&?\/ \t\r\n]+)/i,
				id = href.match(myregexp),
				stringer, objectstr;
			if (id == null) {return;}
			else {id = id[1];}
			stringer = "";
			if (text !== href) {
				stringer = text;
			}
			objectstr = '<iframe class="archiveorg-player" src="https://archive.org/embed/' + DOMPurify.sanitize(id, {SAFE_FOR_JQUERY: true}) + '&playlist=1&list_height=390" width="500" height="420" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>';

			if ((improvedPT.videoSet === "vload" && temp) && ($(this).parents("em").css("font-style") !== "italic" || improvedPT.quotesSet === "qyes")) {
				$(this).css("color", "black").html(stringer + objectstr);
			} else {
				$(this).css("color", "#" + improvedPT.colorSet).click(function () {
					$(this).css("color", "black").html(stringer + objectstr);
					return false;
				});
			}
		});
		$(".post:not(:hidden):even").removeClass("even").addClass("odd");
		$(".post:not(:hidden):odd").removeClass("odd").addClass("even");
		if (improvedPT.scrollSet !== "false") {
			$('.post_body_container').attr('style', function (i, s) { return (s||'') + 'max-height: none !important;'; });
		}
		if (improvedPT.sfwSet !== "false") {
			$(".post:not(:hidden):even").removeClass("odd");
			$(".post:not(:hidden):odd").removeClass("even");
		}
	};
	improvedPT.checkOc = function (s, y) {
		var number = 0;
		while (s.indexOf(y, 0) >= 0) {
			number++;
			s = s.replace(y, "");
		}
		return number;
	};
	improvedPT.containsNonAsciiChars = function (str) {
		return str.split('').some(function (char) {return char.charCodeAt(0) > 127;});
	};
	improvedPT.isValidBBCode = function (tagName, _text) {
		var openRE = new RegExp('\\[' + tagName + '[^[]*\\]', 'ig'),
			closeRE = new RegExp('\\[\\/' + tagName + '\\]', 'ig'),
			openMatches = _text.match(openRE),
			closeMatches = _text.match(closeRE);
		if (openMatches && closeMatches) {
			return Boolean(openMatches.length === closeMatches.length);
		} else {
			if ( !openMatches && !closeMatches ) {
				return true;
			} else {
				return false;
			}
		}
	};
	improvedPT.validateBBCode = function () {
		var postBody = $("#new_post textarea").val(),
			tagNames = ['quote', 'a', 'b', 'i'],
			errMsg = "";
		tagNames.forEach(function (val) {
			if (!improvedPT.isValidBBCode(val, postBody)) {
				errMsg += 'unmatched [' + val + '] tags\n';
			}
		});
		return errMsg;
	};
	improvedPT.showBBCodeWarning = function (errMsg, e, isPreview, parentDiv, postContinue, postAbort) {
		var formMsg = '<div>' + errMsg + '</div>',
			buttonLabels = ['Post anyway', 'Edit before posting'];
		if (isPreview) {
			buttonLabels = ['Preview', 'Edit post'];
		}
		BootstrapDialog.show({
			title: 'Warning: unbalanced formatting tags!',
			message: formMsg,
			buttons: [{
				label: buttonLabels[0],
				action: function (dialogRef) {
					dialogRef.close();
					postContinue(e, parentDiv, isPreview);
				}
			},
			{
				label: buttonLabels[1],
				action: function (dialogRef) {
					dialogRef.close();
					postAbort(e);
				}
			}]
		});
	};
	improvedPT.enableBBCodeMonoCodeSupport = function (postBody, bbCodeTagName, preserveBBCodes) {
		var myRegExp,
			myQtyRegExp,
			myRepRegExp,
			myRepRegExp2,
			strippedBBCodeTagNameWrap, strippedPreserveBBCodesWraps = [], preserveBBCodesRegExString, preserveBBCodesRegExString1, preserveBBCodesRegExString2, preserveBBCodesRegExString3, monoBlock, processedMonoBlock, monoBlockQty, i, ii, postBody, restoreHtml5Doctype, nonMonoBlock, processedNonMonoBlock, nonMonoBlockQty, startsWithHtmlTag, endsWithHtmlTag;
			//myRegExp = /(?:[^]*?)(\[mono\](?!\[mono\])[^]*?\[\/mono\])(?:[^]*?)/i;
			//myQtyRegExp = /(?:[^]*?)(\[mono\](?!\[mono\])[^]*?\[\/mono\])(?:[^]*?)/ig;
			//myRegExp = /(?:[^]*?)(\[mono\](?!\[mono\])[^]*?\[\/mono\]|\[code\](?!\[code\])[^]*?\[\/code\])(?:[^]*?)/i;
			//myQtyRegExp = /(?:[^]*?)(\[mono\](?!\[mono\])[^]*?\[\/mono\]|\[code\](?!\[code\])[^]*?\[\/code\])(?:[^]*?)/ig;
		if (preserveBBCodes.length < 1) {
			myRegExp = new RegExp("(?:[^]*?)(\\[" + bbCodeTagName + "\\](?!\\[" + bbCodeTagName + "\\])[^]*?\\[\\/" + bbCodeTagName + "\\])(?:[^]*?)", "i");
			myQtyRegExp = new RegExp("(?:[^]*?)(\\[" + bbCodeTagName + "\\](?!\\[" + bbCodeTagName + "\\])[^]*?\\[\\/" + bbCodeTagName + "\\])(?:[^]*?)", "ig");
		} else {
			preserveBBCodesRegExString = '';
			for (i = 0; i < preserveBBCodes.length; i += 1) {
				preserveBBCodesRegExString = "|\\[" + preserveBBCodes[i] + "\\](?!\\[" + preserveBBCodes[i] + "\\])[^]*?\\[\\/" + preserveBBCodes[i] + "\\]";
			}
			myRegExp = new RegExp("(?:[^]*?)(\\[" + bbCodeTagName + "\\](?!\\[" + bbCodeTagName + "\\])[^]*?\\[\\/" + bbCodeTagName + preserveBBCodesRegExString + ")(?:[^]*?)", "i");
			myQtyRegExp = new RegExp("(?:[^]*?)(\\[" + bbCodeTagName + "\\](?!\\[" + bbCodeTagName + "\\])[^]*?\\[\\/" + bbCodeTagName + preserveBBCodesRegExString + ")(?:[^]*?)", "ig");
		}
		//console.log(myRegExp);console.log(myQtyRegExp);
		monoBlockQty = postBody.match(myQtyRegExp);
		if (monoBlockQty !== null && monoBlockQty.length > 0) {
			for (i = 0; i < monoBlockQty.length; i += 1) {
				monoBlock = postBody.match(myRegExp);
				//console.log(monoBlock);
				//console.log(monoBlockQty);console.log(monoBlock[1].replace(/\s\r\n/g, ''));
				if (monoBlock !== null && monoBlock.length > 1 && monoBlock[1].replace(/\s\r\n/g, '') !== '[' + bbCodeTagName + '][/' + bbCodeTagName + ']') {
					postBody = postBody.replace(monoBlock[1], '{temp-bbcode-replacement-placeholder}');
					strippedBBCodeTagNameWrap = false;
					myRepRegExp = new RegExp("^\\[" + bbCodeTagName + "\\]", "i");
					myRepRegExp2 = new RegExp("\\[\\/" + bbCodeTagName + "\\]$", "i");
					if (myRepRegExp.test(monoBlock[1]) && myRepRegExp2.test(monoBlock[1])) {
						monoBlock[1] = monoBlock[1].replace(myRepRegExp, '');
						monoBlock[1] = monoBlock[1].replace(myRepRegExp2, '');
						strippedBBCodeTagNameWrap = true;
					}
					
					
					
					if (preserveBBCodes.length > 0) {
						strippedPreserveBBCodesWraps = [];
						for (ii = 0; ii < preserveBBCodes.length; ii += 1) {
							myRepRegExp = new RegExp("^\\[" + preserveBBCodes[ii] + "\\]", "i");
							myRepRegExp2 = new RegExp("\\[\\/" + preserveBBCodes[ii] + "\\]$", "i");
							if (myRepRegExp.test(monoBlock[1]) && myRepRegExp2.test(monoBlock[1])) {
								monoBlock[1] = monoBlock[1].replace(myRepRegExp, '');
								monoBlock[1] = monoBlock[1].replace(myRepRegExp2, '');
								strippedPreserveBBCodesWraps.push(preserveBBCodes[ii]);
							}
							
						}
					}
					restoreHtml5Doctype = false, startsWithHtmlTag = false, endsWithHtmlTag = false;
					if (monoBlock[1].indexOf('<!DOCTYPE html>') > -1) {restoreHtml5Doctype = true;}
					if (monoBlock[1].substring(0, 6) == '<html>') {startsWithHtmlTag = true;}
					if (monoBlock[1].substr(- '</html>'.length) === '</html>') {endsWithHtmlTag = true;}
					//console.log(monoBlock[1]);
					monoBlock[1] = DOMPurify.sanitize(monoBlock[1], {SAFE_FOR_JQUERY: true, WHOLE_DOCUMENT: true, ADD_TAGS: ['link', 'script']});
					//console.log(monoBlock[1]);
					if (restoreHtml5Doctype === true) {monoBlock[1] = '<!DOCTYPE html>\n' + monoBlock[1];}
					if (startsWithHtmlTag === false) {monoBlock[1] = monoBlock[1].replace(/^(<html>\r?\n?\t?<head><\/head><body>\r?\n?\t?\s?)/, '');}
					if (endsWithHtmlTag === false) {monoBlock[1] = monoBlock[1].replace(/(\r?\n?\t?<\/body>\r?\n?\t?<\/html>)$/, '');}
					monoBlock[1] = monoBlock[1].replace('<html><head>', '<html>\n\t<head>');
					monoBlock[1] = monoBlock[1].replace('\t\n</body></html>', '\t</body>\n</html>');
					//console.log(monoBlock[1]);
					if (strippedBBCodeTagNameWrap === true) {monoBlock[1] = '[' + bbCodeTagName + ']' + monoBlock[1] + '[/' + bbCodeTagName + ']';}
					if (strippedPreserveBBCodesWraps.length > 0) {
						for (ii = 0; ii < strippedPreserveBBCodesWraps.length; ii += 1) {
							monoBlock[1] = '[' + strippedPreserveBBCodesWraps[ii] + ']' + monoBlock[1] + '[/' + strippedPreserveBBCodesWraps[ii] + ']';
						}
					}
					//processedMonoBlock = XBBCODE.process({text: monoBlock[1], removeMisalignedTags: false, addInLineBreaks: true});
					//console.log(processedMonoBlock.html);
					postBody = postBody.replace('{temp-bbcode-replacement-placeholder}', monoBlock[1]);
				}
			}
		}
		if (preserveBBCodes.length < 1) {
			myRegExp = new RegExp("(?:^|\\[\\/" + bbCodeTagName + "\\])((?!\\[" + bbCodeTagName + "\\]|\\[\\/" + bbCodeTagName + "\\])[^]*?|)(?:\\[" + bbCodeTagName + "\\]|$)", "i");
			myQtyRegExp = new RegExp("(?:^|\\[\\/" + bbCodeTagName + "\\])((?!\\[" + bbCodeTagName + "\\]|\\[\\/" + bbCodeTagName + "\\])[^]*?|)(?:\\[" + bbCodeTagName + "\\]|$)", "ig");
		} else {
			preserveBBCodesRegExString1 = '', preserveBBCodesRegExString2 = '', preserveBBCodesRegExString3 = '';
			for (i = 0; i < preserveBBCodes.length; i += 1) {
				preserveBBCodesRegExString1 = "|\\[\\/" + preserveBBCodes[i] + "\\]";
				preserveBBCodesRegExString2 = "|(?!\\[" + preserveBBCodes[i] + "\\]|\\[\\/" + preserveBBCodes[i] + "\\])[^]*?";
				preserveBBCodesRegExString3 = "|\\[" + preserveBBCodes[i] + "\\]";
			}
			myRegExp = new RegExp("(?:^|\\[\\/" + bbCodeTagName + "\\]" + preserveBBCodesRegExString1 + ")((?!\\[" + bbCodeTagName + "\\]|\\[\\/" + bbCodeTagName + "\\])[^]*?" + preserveBBCodesRegExString2 + "|)(?:\\[" + bbCodeTagName + "\\]" + preserveBBCodesRegExString3 + "|$)", "i");
			myQtyRegExp = new RegExp("(?:^|\\[\\/" + bbCodeTagName + "\\]" + preserveBBCodesRegExString1 + ")((?!\\[" + bbCodeTagName + "\\]|\\[\\/" + bbCodeTagName + "\\])[^]*?" + preserveBBCodesRegExString2 + "|)(?:\\[" + bbCodeTagName + "\\]" + preserveBBCodesRegExString3 + "|$)", "ig");
		}
		//myRegExp = /(?:^|\[\/mono\])((?!\[mono\]|\[\/mono\])[^]*?|)(?:\[mono\]|$)/i;
		//myQtyRegExp = /(?:^|\[\/mono\])((?!\[mono\]|\[\/mono\])[^]*?|)(?:\[mono\]|$)/ig;
		//myRegExp = /(?:^|\[\/mono\]|\[\/code\])((?!\[mono\]|\[\/mono\])[^]*?|(?!\[code\]|\[\/code\])[^]*?|)(?:\[mono\]|\[code\]|$)/i;
		//myQtyRegExp = /(?:^|\[\/mono\]|\[\/code\])((?!\[mono\]|\[\/mono\])[^]*?|(?!\[code\]|\[\/code\])[^]*?|)(?:\[mono\]|\[code\]|$)/ig;
		nonMonoBlockQty = postBody.match(myQtyRegExp);
		if (nonMonoBlockQty !== null && nonMonoBlockQty.length > 0) {
			for (i = 0; i < nonMonoBlockQty.length; i += 1) {
				nonMonoBlock = postBody.match(myRegExp);
				//console.log(nonMonoBlock);
				//console.log(nonMonoBlockQty);
				if (nonMonoBlock !== null && nonMonoBlock.length > 1) {
					postBody = postBody.replace(nonMonoBlock[1], '{temp-bbcode-replacement-placeholder}');
					nonMonoBlock[1] = DOMPurify.sanitize(nonMonoBlock[1], {SAFE_FOR_JQUERY: true});
					postBody = postBody.replace('{temp-bbcode-replacement-placeholder}', nonMonoBlock[1]);
				}
			}
		}//console.log(postBody);
		return postBody;
	};
	improvedPT.threadShow = function () {
		chrome.runtime.sendMessage({
			set: "show"
		}, function(response) {
			//console.log(response);
			improvedPT.showSet = response.setShow;
			improvedPT.colorSet = response.setColor;
			improvedPT.quotesSet = response.setQuotes;
			improvedPT.videoSet = response.setVideo;
			improvedPT.reloadTopic = response.setReload;
			improvedPT.scrollSet = response.setScroll;
			improvedPT.sfwSet = response.setSfw;
			// todo: add settings
			improvedPT.validateBBSet = response.setValidateBB;
			if (improvedPT.reloadTopic !== "false") {
				if ($('#postReplyBtn').length < 1) {
					$('button[data-bind*="click: postReply"]').after($('button[data-bind*="click: postReply"]').clone().removeAttr('data-bind').removeAttr('disabled').attr('type', 'button').attr('id', 'postReplyBtn')).hide();
				}
				if ($('#previewReplyBtn').length < 1) {
					$('button[data-bind*="click: onPreview"]').after($('button[data-bind*="click: onPreview"]').clone().removeAttr('data-bind').removeAttr('disabled').attr('type', 'button').attr('id', 'previewReplyBtn')).hide();
				}
				$(document).off('click', '#postReplyBtn').on("click", '#postReplyBtn', function(e) {
					var myRegExp = /(?:[^]*?)(\[mono\](?!\[mono\])[^]*?\[\/mono\]|\[code\](?!\[code\])[^]*?\[\/code\])(?:[^]*?)/i,
						myQtyRegExp = /(?:[^]*?)(\[mono\](?!\[mono\])[^]*?\[\/mono\]|\[code\](?!\[code\])[^]*?\[\/code\])(?:[^]*?)/ig,
						errorHTML, isMonoBlock, isCodeBlock, monoBlock, processedMonoBlock, monoBlockQty, i, postBody, restoreHtml5Doctype, nonMonoBlock, processedNonMonoBlock, nonMonoBlockQty, startsWithHtmlTag, endsWithHtmlTag;
					e.preventDefault;
					$(this).val("Posting...").attr('disabled', 'disabled');
					$("#errorExplanation").remove();
					if (improvedPT.checkOc($("#new_post textarea").val(), "quote") > 8) {
						$("#applicationHost").after('<div class="errorExplanation" id="errorExplanation"><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>You cannot have more than 4 quotes.</li></ul></div>');
						$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
						return false;
					}
					if ($("#new_post textarea").val().length < 1) {
						errorHTML = "<div class='errorExplanation' id='errorExplanation'><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>Body is too short (minimum is 2 characters)</li></ul></div>";
						$("#applicationHost").after(errorHTML);
						$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
						return false;
					} else if ($("#new_post textarea").val().length < 2) {
						$("#new_post textarea").val($("#new_post textarea").val() + " ");
					}
					if (improvedPT.containsNonAsciiChars($("#new_post textarea").val())) {
						errorHTML = "<div class='errorExplanation' id='errorExplanation'><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>Please remove non-ASCII characters from the Body of your submission and try again</li></ul></div>";
						$("#applicationHost").after(errorHTML);
						$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
						return false;
					}
					postBody = $("#new_post textarea").val();
					postBody = improvedPT.enableBBCodeMonoCodeSupport(postBody, 'mono', []);
					postBody = improvedPT.enableBBCodeMonoCodeSupport(postBody, 'code', ['mono']);
					$.post("https://www.phantasytour.com" + improvedPT.getBandApiUrlByWebUrl(improvedPT.bands, "/" + DOMPurify.sanitize(location.pathname.split('/')[1], {SAFE_FOR_JQUERY: true}) + "/" + DOMPurify.sanitize(location.pathname.split('/')[2], {SAFE_FOR_JQUERY: true})) + "/posts", {"Body": postBody, "ThreadId": DOMPurify.sanitize(location.pathname.split('/')[4], {SAFE_FOR_JQUERY: true})}, function() {
						improvedPT.mt = true;
						$("#new_post textarea").val("");
						$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
						improvedPT.afterAjax();
					});
				});
				$(document).off('click', '#previewReplyBtn').on("click", '#previewReplyBtn', function(e) {
					var errorHTML, message, messageBody, postBody;
					e.preventDefault;
					$(this).val("Previewing...").attr('disabled', 'disabled');
					$("#errorExplanation").remove();
					if (improvedPT.checkOc($("#new_post textarea").val(), "quote") > 8) {
						$("#applicationHost").after('<div class="errorExplanation" id="errorExplanation"><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>You cannot have more than 4 quotes.</li></ul></div>');
						$('#previewReplyBtn').val("Preview").removeAttr("disabled");
						return false;
					}
					if ($("#new_post textarea").val().length < 1) {
						errorHTML = "<div class='errorExplanation' id='errorExplanation'><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>Body is too short (minimum is 2 characters)</li></ul></div>";
						$("#applicationHost").after(errorHTML);
						$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
						return false;
					} else if ($("#new_post textarea").val().length < 2) {
						$("#new_post textarea").val($("#new_post textarea").val() + " ");
					}
					if (improvedPT.containsNonAsciiChars($("#new_post textarea").val())) {
						errorHTML = "<div class='errorExplanation' id='errorExplanation'><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>Please remove non-ASCII characters from the Body of your submission and try again</li></ul></div>";
						$("#applicationHost").after(errorHTML);
						$('#postReplyBtn').val("Post Reply").removeAttr("disabled");
						return false;
					}
					postBody = $("#new_post textarea").val();
					postBody = improvedPT.enableBBCodeMonoCodeSupport(postBody, 'mono', []);
					postBody = improvedPT.enableBBCodeMonoCodeSupport(postBody, 'code', ['mono']);
					//message = DOMPurify.sanitize(postBody, {SAFE_FOR_JQUERY: true, ADD_TAGS: ['link', 'script']});
					//console.log(postBody);
					messageBody = XBBCODE.process({text: postBody, removeMisalignedTags: false, addInLineBreaks: true});
					BootstrapDialog.show({
						title: 'Your thoughts...',
						message: messageBody.html,
						onshown: function () {
							$('.bootstrap-dialog-message').linkify({target: '_blank'});
						},
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
			if (improvedPT.sfwSet === "true") {
				$('body').attr('style', function(i, s) { return (s||'') + 'background: #fff !important;'; });
				$('#main').css('background', '#fff');
				$('.col1_container').attr('style', function(i, s) { return (s||'') + 'background: #fafafa !important;'; });
				$('.col1_container').attr('style', function(i, s) { return (s||'') + 'border: 1px solid #ccc !important;'; });
				$('.post_listing .topic_header').css('color', '#404040');
				$('.post_listing .topic_header').attr('style', function(i, s) { return (s||'') + 'background: #fff !important;'; });
				$('.post_listing .topic_header').attr('style', function(i, s) { return (s||'') + 'border: 1px solid #ccc !important;'; });
				$('.post_listing .topic_header .mod_tools a').css('color', '#337ab7');
				$('.btn-success').css({"color": "#404040", "background-color": "#f0f0f0", "border-color": "#ccc"});
				$('.post_listing .post .post_header span.poster_name a').css('color', '#337ab7');
				$('.rbroundbox h4').css('color', '#404040');
				$('#navbar').css({"height": "50px", "background": "#0c0c0c"});
				$('.navbar-brand > img').css('display', 'none');
				$('.navbar-brand').css({"background-image": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAMAAAAPK1hoAAAATlBMVEXLAADOEBD////YQED87+/SICD88PDfYGDVMDDywMDsoKDyv7/bUFD10ND439/lgIDokJD54ODicHDvsLD1z8/rn5/vr6/oj4/bT0/eX18SZPv4AAACRUlEQVR4Ae3W227jLBRA4c3i7LPjHNr3f9FfDCll9NuOpbll3WUjfSEuIZVWq9VqtVqt1k7KLzE6gDm9vI2wDfX6POI2XV4DSAROTL2Ry6oaIdUpeWfX9+S6qpJZq5F3m7wbobDX1MEBtRoApt7kt0h5gHsPMFxTPSnz+CofdwaeIsGAs5LqgPk9UVfUgdRLKd/FP3nZAH1zwZdnEAG1ODUn/YJqHWC0WhzlCcSkzkTpAf1Wk9HJBNjPakxoCCulojIEYKxU9ADEj6oGCMGxp66qA26VOpbtn6oxMSqh9F9lmNW0kv88RcVbYP2gWsCoDjBeSkV19gYslerUAszn6g1YEk1Ba5VNJiAUtWz/VN2AkOhedlW0BmKlYj3Qnarjz9pwoI7yTKuVGuUO6DMVuMsKyIHKzQJrefey/Q9qFM7U/H2iUlfpgA/qKNOhugGLMpWxALM15+r9/LnqCQi+MpQp279wBuKOWk5AXxn5BEz8w3nVCWTQtXEH9HCqJtCpDnB+V7W8r4NilO0fq2k1f10gDpJTK0WVch0UowN8uHJnGeqo1AQ6O1eGTRO1HKllsy6E6UgVn6+DYpTtn6nWJFarl6GO8KPmG1XXxgTY24XfrUWp70f/21Pij6qBUR7m1xjydXCX9dNvrOsGJVUzQJ50+Y4NFKMHfNYnOWgw7NfndWWAMVb/ddgyoZOj1JPddHVQcqH+fClj5Ti94xr/v0+TJxVrgpymvl99bwp571+2Xn1NmEc9sY+J6a9Jq9VqtVqtVus/4SAa34bCihgAAAAASUVORK5CYII=')", "background-position": "0 0", "background-repeat": "no-repeat", "background-size": "60px", "display": "inline-block", "height": "60px", "position": "relative", "width": "60px", "z-index": "33"});
				$('#bs-example-navbar-collapse-1 ul.nav.navbar-nav').css('margin', '0 0 0 10px');
				$('#bs-example-navbar-collapse-1 ul.nav.navbar-nav > li').css('line-height', '50px');
				$('#bs-example-navbar-collapse-1 ul.nav.navbar-nav > li > a').css({"border-right": "1px solid #595959", "font-weight": "300", "line-height": "1", "margin": "0 .4em 0 0", "padding": "0 .3em 0 0", "letter-spacing": ".04em", "display": "inline-block"});
				$('#bs-example-navbar-collapse-1 ul.nav.navbar-nav.navbar-right').css('margin', '0 -15px 0 0');
				$('.side-menu ul li a').css('color', '#337ab7');
				$(".post:not(:hidden):even").removeClass("odd");
				$(".post:not(:hidden):odd").removeClass("even");
			}
			improvedPT.replaceLinks();

			if (improvedPT.validateBBSet === 'true') {
				setTimeout(function () {
					var replyBtn = $('#new_post .btn-primary:visible'),
						parentDiv = replyBtn.parent(),
						forcePost, preventPost, restoreListener, postInterceptor;
					preventPost = function () {
						//console.log('preventPost running');
					};
					postInterceptor = function (e) {
						var isPreview, errMsg;
						if (e.target.textContent.search(/preview/i) > -1) {
							//console.log('preview btn canceling');
							isPreview = true;
							//return false;
						} else {
							isPreview = false;
							//console.log(e.target.textContent);
						}
						errMsg = improvedPT.validateBBCode();
						if (errMsg) {
							e.stopPropagation();
							e.preventDefault();
							improvedPT.showBBCodeWarning(errMsg, e, isPreview, parentDiv, forcePost, preventPost);
						}
					};
					restoreListener = function () {
						parentDiv[0].addEventListener("click", postInterceptor, true);
						parentDiv[0].setAttribute('data-hasclickhandler', 'true');
					};
					forcePost = function (e, parentDiv, isPreview) {
						//console.log('force_post running');
						parentDiv[0].removeEventListener("click", postInterceptor, true);
						parentDiv[0].setAttribute('data-hasclickhandler', 'false');
						if (isPreview) {
							//console.log('isPreview, restoring listener');
							e.target.onclick = restoreListener;
						}
						e.target.click();
					};
					if (typeof parentDiv[0] !== 'undefined' && parentDiv[0].getAttribute('data-hasclickhandler') !== 'true') {
						parentDiv[0].addEventListener("click", postInterceptor, true);
						parentDiv[0].setAttribute('data-hasclickhandler', 'true');
					}
				}, 1000);
			}
			/* replace [mono][/mono] tags */
			$('.post_body_container').each(function () {
				var postBody = $(this).html(),
					myRegExp = /(?:[^]*?)(\[mono\](?!\[mono\])[^]*?\[\/mono\]|\[code\](?!\[code\])[^]*?\[\/code\])(?:[^]*?)/i,
					myQtyRegExp = /(?:[^]*?)(\[mono\](?!\[mono\])[^]*?\[\/mono\]|\[code\](?!\[code\])[^]*?\[\/code\])(?:[^]*?)/ig,
				monoBlock, processedMonoBlock, monoBlockQty, i;
				monoBlockQty = postBody.match(myQtyRegExp);
				if (monoBlockQty !== null && monoBlockQty.length > 0) {
					for (i = 0; i < monoBlockQty.length; i += 1) {
						monoBlock = postBody.match(myRegExp);
						//console.log(monoBlock);
						//console.log(monoBlockQty);
						if (monoBlock !== null && monoBlock.length > 1 && monoBlock[1].replace(/\s\r\n/g, '') !== '[mono][/mono]' && monoBlock[1].replace(/\s\r\n/g, '') !== '[code][/code]') {
							postBody = postBody.replace(monoBlock[1], '{temp-bbcode-replacement-placeholder}');
							processedMonoBlock = XBBCODE.process({text: monoBlock[1], removeMisalignedTags: false, addInLineBreaks: true});
							//console.log(processedMonoBlock.html);
							postBody = postBody.replace('{temp-bbcode-replacement-placeholder}', processedMonoBlock.html.replace(/&lt;br\s*[\/]?&gt;/gi, '\n'));
							$(this).html(postBody);
						}
					}
				}
				$('.post_body_container').find('span.xbbcode-code').each(function (i) {
					if ($(this).text() === '') {
						$(this).before('[code][/code]');
						$(this).remove();
					}
				});
			});

		});
	};
	improvedPT.overrideMTBtns = function () {
		if ($('.topic_header div a.improvedpt-mt').length < 1) {
			$('.topic_header div a:contains("MT")').hide().after('<a href="#" title="Add to My Threads" class="improvedpt-mt">MT</a>');
			$('#bottom-pagination-container div a:contains("MT")').hide().after('<a style="margin:10px;" href="#" class="improvedpt-mt">MT</a>');
			$(document).off('click', '#bottom-pagination-container div a:contains("MT"), .topic_header div a:contains("MT")').on('click', '#bottom-pagination-container div a:contains("MT"), .topic_header div a:contains("MT")', function() {
				if ($('#bottom-pagination-container div a:contains("✔")').length < 1 | $('.topic_header div a:contains("✔")').length < 1) {
					$.post("/api/mythreads/" + DOMPurify.sanitize(location.pathname.split('/')[4], {SAFE_FOR_JQUERY: true}), function () {
						$('#bottom-pagination-container div a:contains("MT")').html(DOMPurify.sanitize($('#bottom-pagination-container div a:contains("MT")').html(), {SAFE_FOR_JQUERY: true}) + '✔');
						$('.topic_header div a:contains("MT")').html(DOMPurify.sanitize($('.topic_header div a:contains("MT")').html(), {SAFE_FOR_JQUERY: true}) + '✔');
						improvedPT.mt = true;
					});
				} else {
					$.ajax({url: "/api/mythreads/" + DOMPurify.sanitize(location.pathname.split('/')[4], {SAFE_FOR_JQUERY: true}), method: 'DELETE'}).done(function () {
						$('#bottom-pagination-container div a:contains("MT")').html(DOMPurify.sanitize($('#bottom-pagination-container div a:contains("MT")').html().replace('✔', ''), {SAFE_FOR_JQUERY: true}));
						$('.topic_header div a:contains("MT")').html(DOMPurify.sanitize($('.topic_header div a:contains("MT")').html().replace('✔', ''), {SAFE_FOR_JQUERY: true}));
						improvedPT.mt = false;
					});
				}
				return false;
			});
		}
	};
	improvedPT.addMessageListener = function () {
		chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
			var videoset2, showset2, par, href, stringer;
			if (request.run === "replaceLinks") {
				videoset2 = improvedPT.videoSet;
				showset2 = improvedPT.showSet;
				improvedPT.showSet = "load";
				improvedPT.videoSet = "vload";
				improvedPT.replaceLinks();
				improvedPT.showSet = showset2;
				improvedPT.videoSet = videoset2;
			} else if (request.run === "close") {
				par = improvedPT.lastele.parent("a");
				improvedPT.lastele.remove();
				href = par.attr("href");
				stringer = par.text();
				if (par.text().length === 0) {
					par.html(DOMPurify.sanitize(href, {SAFE_FOR_JQUERY: true}));
				}
				par.css("color", "#" + improvedPT.colorSet).click(function() {
					$(this).css("color", "black").html(DOMPurify.sanitize(stringer + "<img class='addedPTImages' id='" + DOMPurify.sanitize($(this).attr('class'), {SAFE_FOR_JQUERY: true}) + "' src='" + DOMPurify.sanitize(href, {SAFE_FOR_JQUERY: true}) + "' alt='' style='max-width:100%;' />", {SAFE_FOR_JQUERY: true})).unbind('click');
					return false;
				});
			} else if (request.run === "closeAll") {
				$(".addedPTImages").each(function() {
					var par, href, stringer;
					par = $(this).parent("a");
					$(this).remove();
					href = DOMPurify.sanitize(par.attr("href"), {SAFE_FOR_JQUERY: true});
					if (href.indexOf('imgur.com/') > -1) {
						href = href.replace('http://', 'https://');
					}
					stringer = par.text();
					if (par.text().length === 0) {
						par.html(DOMPurify.sanitize(href, {SAFE_FOR_JQUERY: true}));
					}
					par.css("color", "#" + improvedPT.colorSet).click(function() {
						$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + DOMPurify.sanitize($(this).attr('class'), {SAFE_FOR_JQUERY: true}) + "' src='" + DOMPurify.sanitize(href, {SAFE_FOR_JQUERY: true}) + "' alt='' style='max-width:100%;' />").unbind('click');
						return false;
					});
				});
				$(".youtube-player").each(function() {
					var par, href, stringer;
					par = $(this).parent("a");
					$(this).remove();
					href = DOMPurify.sanitize(par.attr("href"), {SAFE_FOR_JQUERY: true});
					stringer = par.text();
					if (par.text().length === 0) {
						par.html(DOMPurify.sanitize(href, {SAFE_FOR_JQUERY: true}));
					}
					par.css("color", "#" + improvedPT.colorSet).click(function() {
						$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + DOMPurify.sanitize($(this).attr('class'), {SAFE_FOR_JQUERY: true}) + "' src='" + DOMPurify.sanitize(href, {SAFE_FOR_JQUERY: true}) + "' alt='' style='max-width:100%;' />").unbind('click');
						return false;
					});
				});
				$(".vimeo-player").each(function() {
					var par, href, id, stringer;
					par = $(this).parent("a");
					href = DOMPurify.sanitize(par.attr("href"), {SAFE_FOR_JQUERY: true});
					$(this).remove();
					id = href.match(/[0-9]+/, "");
					stringer = par.text();
					if (par.text().length === 0) {
						par.html(DOMPurify.sanitize(href, {SAFE_FOR_JQUERY: true}));
					}
					par.css("color", "#" + improvedPT.colorSet).click(function() {
						$(this).css("color", "black").html(stringer + '<iframe class="vimeo-player" src="https://player.vimeo.com/video/' + DOMPurify.sanitize(id, {SAFE_FOR_JQUERY: true}) + '?portrait=0" width="100%" height="335" frameborder="0"></iframe>').unbind('click');
						return false;
					});
				});
				$(".imgur-embed-iframe-pub").each(function() {
					var par, href, stringer, myregexp, id;
					par = $(this).parent("a");
					href = DOMPurify.sanitize(par.attr("href"), {SAFE_FOR_JQUERY: true});
					myregexp = /(?:imgur\.com\/)([^"&?\/ ]{7})/i;
					id = href.match(myregexp);
					if (id == null) {return;}
					else {id = id[1];}
					$(this).remove();
					stringer = par.text();
					if (par.text().length === 0) {
						par.html(href);
					}
					par.css("color", "#" + improvedPT.colorSet).click(function() {
						$(this).css("color", "black").html(stringer + '<blockquote class="imgur-embed-pub" lang="en" data-id="' + DOMPurify.sanitize(id, {SAFE_FOR_JQUERY: true}) + '"><a href="//imgur.com/' + DOMPurify.sanitize(id, {SAFE_FOR_JQUERY: true}) + '">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>').unbind('click');
						return false;
					});
				});
				$(".archiveorg-player").each(function() {
					var par, href, stringer, myregexp, id;
					par = $(this).parent("a");
					href = DOMPurify.sanitize(par.attr("href"), {SAFE_FOR_JQUERY: true});
					$(this).remove();
					myregexp = /(?:archive\.org\/details\/)([^"&?\/ \t\r\n]+)/i;
					id = href.match(myregexp);
					if (id == null) {return;}
					else {id = id[1];}
					stringer = par.text();
					if (par.text().length === 0) {
						par.html(DOMPurify.sanitize(href, {SAFE_FOR_JQUERY: true}));
					}
					par.css("color", "#" + improvedPT.colorSet).click(function() {
						$(this).css("color", "black").html(stringer + '<iframe class="archiveorg-player" src="https://archive.org/embed/' + DOMPurify.sanitize(id, {SAFE_FOR_JQUERY: true}) + '&playlist=1&list_height=390" width="500" height="420" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>').unbind('click');
						return false;
					});
				});
			}
			sendResponse({}); // snub them.
		});
	};
	$(document).ready(function () {
		$(document).off('.data-api');
		improvedPT.getBands();
	});
	$(document).on("mousedown", "img", function () {
		improvedPT.lastele = $(this);
	});
}(jQuery));
