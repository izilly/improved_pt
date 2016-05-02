var improvedPT = {};
(function ($) {
	"use strict";

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
				$('#branding').css('display', 'none');
				$('.col1 .yuimenu a').attr('style', function (i, s) { return (s||'') + 'color: #337ab7 !important;'; });
				$('.col1_container').attr('style', function (i, s) { return (s||'') + 'background: #fafafa !important;'; });
				$('.col1_container').attr('style', function (i, s) { return (s||'') + 'border: 1px solid #ccc !important;'; });
				$('.post_listing .topic_header').css('color', '#444');
				$('.post_listing .topic_header').attr('style', function (i, s) { return (s||'') + 'background: #fff !important;';});
				$('.post_listing .topic_header').attr('style', function (i, s) { return (s||'') + 'border: 1px solid #ccc !important;'; });
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
				$('table.topics_listing, .topics_listing_matte').attr('style', function (i, s) { return (s||'') + 'background: #e7e7e7 !important;'; });
				$('table.topics_listing, .topics_listing_matte').attr('style', function (i, s) { return (s||'') + 'border: #ccc !important;'; });
				$('table.topics_listing thead th').css('color', '#444');
				$("#threads_table tbody tr:not(:hidden):odd").removeClass("even");
				$("#threads_table tbody tr:not(:hidden):even").removeClass("odd");
				$("#threads_table tbody tr").css('background', '#fff');
			}
		});
	};
	improvedPT.main = function () {
		document.addEventListener('pt-threads-loaded', function () {
			console.log('*** threads-loaded: heard ***');
			if (!improvedPT.threads_loaded_done) {
				console.log('*** threads-loaded: running ***');
				improvedPT.aprilFools();
				improvedPT.alterThreadList();
				improvedPT.showIndex();
				// prevent handler from running more than once.
				improvedPT.threads_loaded_done = true;
			}
		});
		// observe mutations on querySelector that matches threads in threadlist
		improvedPT.ready("#threads_table > tbody > tr:last-child",
				function(element){
					console.log('*** threads-loaded: dispatching event ***');
					var event = document.createEvent('Event');
					event.initEvent('pt-threads-loaded', true, true);
					document.dispatchEvent(event);
				}
		);
	};
	$(document).ready(function () {
		improvedPT.main();
	});
}(jQuery));
