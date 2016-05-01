var improvedPT = {};
(function ($) {
	"use strict";

	function waitForMutation(parentNode, isMatchFunc, handlerFunc, observeSubtree, disconnectAfterMatch) {
		var defaultIfUndefined = function(val, defaultVal) {
			return (typeof val === "undefined") ? defaultVal : val;
		};
		observeSubtree = defaultIfUndefined(observeSubtree, false);
		disconnectAfterMatch = defaultIfUndefined(disconnectAfterMatch, false);
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.addedNodes) {
					for (var i = 0; i < mutation.addedNodes.length; i++) {
						var node = mutation.addedNodes[i];
						if (isMatchFunc(node)) {
							handlerFunc(node);
							if (disconnectAfterMatch) {observer.disconnect();}
						}
					}
				}
			});
		});
		observer.observe(parentNode, {
			childList: true,
			attributes: false,
			characterData: false,
			subtree: observeSubtree
		});
	return observer;
	}

	var delayedCallToPTThreadsLoaded, detectPTThreadLoad = waitForMutation(
		document.querySelector("#applicationHost"),
		function(node) {
			if (node.nodeType === 1) { return node.querySelector("#threads_table > tbody > tr") !== null;} else {return false;}
		},
		function() {
			clearTimeout(delayedCallToPTThreadsLoaded);
			delayedCallToPTThreadsLoaded = setTimeout(function () {
				var event = document.createEvent('Event');
				event.initEvent('pt-threads-loaded', true, true); //can bubble, and is cancellable
				document.dispatchEvent(event);
			}, 250);
		},
		true,
		false
	);

	// April fools day shit
	// if you're reading my source code, don't tell anyone about the shenanigans. feel free to contact me and i'll validate your awesomeness
	improvedPT.aprilFools = function () {
		var date = new Date();
		// Check if April 1
		if (date.getDate() === 1 && date.getMonth() === 3) {
			document.title = 'Drug Band Message Board';
			$(function() {
				$(".topic_author_display_name > div > a").each(function() {
					var name = $(this).text();
					if (!name.match(/^.*420.*$/)) {
						$(this).html(DOMPurify.sanitize(name + 420, {SAFE_FOR_JQUERY: true}));
					} else {
						$(this).html(DOMPurify.sanitize('wook', {SAFE_FOR_JQUERY: true}));
					}
				});
			});
		}
	};
	improvedPT.alterThreadList = function () {
		$("#threads_table tbody tr:not(:hidden):even").removeClass("even").addClass("odd");
		$("#threads_table tbody tr:not(:hidden):odd").removeClass("odd").addClass("even");
		improvedPT.top2 = $("#threads_table tbody tr").attr("class");
	};
	improvedPT.showIndex = function () {
		chrome.runtime.sendMessage({
			set: "index"
		}, function (response) {
			improvedPT.firstSet = response.setFirst;
			improvedPT.sfwSet = response.setSfw;
			if (improvedPT.firstSet === "true") {
				$(document).on("click", ".topic_subject a", function () {
					$(this).attr("href", DOMPurify.sanitize($(this).attr("href").split('#')[0] + "#page/1", {SAFE_FOR_JQUERY: true}));
				});
			}
			if (improvedPT.sfwSet === "true") {
				$('body').attr('style', function (i, s) { return (s||'') + 'background: #fff !important;'; });
				$('#main').css('background', '#fff');
				$('.col1_container').attr('style', function (i, s) { return (s||'') + 'background: #fafafa !important;'; });
				$('.col1_container').attr('style', function (i, s) { return (s||'') + 'border: 1px solid #ccc !important;'; });
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
				$('table.topics_listing, .topics_listing_matte').attr('style', function (i, s) { return (s||'') + 'background: #e7e7e7 !important;'; });
				$('table.topics_listing, .topics_listing_matte').attr('style', function (i, s) { return (s||'') + 'border: #ccc !important;'; });
				$('table.topics_listing thead th').css('color', '#444');
				$("#threads_table tbody tr:not(:hidden):odd").removeClass("even");
				$("#threads_table tbody tr:not(:hidden):even").removeClass("odd");
				$("#threads_table tbody tr").css('background', '#fff');
			}
		});
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
	improvedPT.main = function () {
		document.addEventListener('pt-threads-loaded', function () {
			improvedPT.aprilFools();
			improvedPT.alterThreadList();
			improvedPT.showIndex();
			improvedPT.addOptionsLink();
		});
	};
	$(document).ready(function () {
		improvedPT.main();
	});
	$(document).on('unload', function () {
		if(typeof detectPTThreadLoad !== 'undefined') {detectPTThreadLoad.disconnect();}
	});
}(jQuery));