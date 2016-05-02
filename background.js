
function getStorageWrapper () {
	var wrapper = {};
	wrapper.defaultOptions = {
						show: 'click',
						color: '0000FF',
						quotes: 'qno',
						video: 'vclick',
						reload: 'true',
						first: 'false',
						scroll: 'true',
						sfw: 'false',
						validatebb: 'true'
	};

	wrapper.chromeStorage = {
		get: function (items, callback) {
			// use defaultOptions if no items given
			if (typeof items === 'undefined') {
				items = wrapper.defaultOptions;
			}
			wrapper.storageArea.get(items, callback);
		},
		set: function (items, callback) {
			wrapper.storageArea.set(items, callback);
		}
	};


	wrapper.localStorage = {
		get: function (items, callback) {
			if (typeof items === 'undefined') {
				items = wrapper.defaultOptions;
			}
			// convert items to object
			var _items = {};
			if (typeof items === 'string') {
				_items[items] = undefined;
			} else if (Array.isArray(items)) {
				items.forEach(function(k,i,a) {_items[k] = undefined;});
			} else if (typeof items === 'object') {
				_items = items;
			}
			// get current values and update with default values if needed
			Object.keys(_items).forEach(function(k,i,a) {
				// get current value from localStorage
				var current = localStorage.getItem(k);
				// update localStorage if unset and a default value was given
				if (current === null && _items[k] !== undefined) {
					localStorage.setItem(k, _items[k]);
					current = localStorage.getItem(k);
				}
				// update _items to reflect current value from localStorage
				_items[k] = current;
			});
			callback(_items);
		},
		set: function (items, callback) {
			Object.keys(items).forEach(function(k,i,a) {
				localStorage.setItem(k, items[k]);
			});
			callback();
		}
	};

	// check for chrome.storage.sync/local support,
	// falling back to localStorage if necessary
	if (typeof chrome.storage !== 'undefined' &&
			  ( typeof chrome.storage.sync !== 'undefined' ||
					typeof chrome.storage.local !== 'undefined' )
		 ) {
		wrapper.storageArea = (typeof chrome.storage.sync !== 'undefined') ? chrome.storage.sync : chrome.storage.local;
		wrapper.get = wrapper.chromeStorage.get;
		wrapper.set = wrapper.chromeStorage.set;
	} else {
		wrapper.storageArea = localStorage;
		wrapper.get = wrapper.localStorage.get;
		wrapper.set = wrapper.localStorage.set;
	}
	return wrapper;
}
var storageWrapper = getStorageWrapper();

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.set === "getopts") {
			storageWrapper.get(request.defaults, function(items) {
				sendResponse(items);
			});
			return true;
		} else if (request.set === "setopts") {
			storageWrapper.set(request.items, function(items) {
				sendResponse(items);
			});
			return true;
		} else if (request.set === "show") {
			storageWrapper.get(request.defaults, function(opts) {
				var items = {setShow: opts.show, setColor: opts.color, setVideo: opts.video, setQuotes: opts.quotes, setReload: opts.reload, setScroll: opts.scroll, setSfw: opts.sfw, setValidateBB: opts.validatebb};
				sendResponse(items);
			});
			chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
				chrome.tabs.insertCSS(tabs[0].id, {code: '.xbbcode-code, .xbbcode-mono{white-space: pre-wrap; font-size: 0.84615em; font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;}'});
			});
			return true;
		} else if (request.set === "index") {
			storageWrapper.get({first: false, sfw: false}, function(opts) {
				var items = {setFirst: opts.first, setSfw: opts.sfw};
				sendResponse(items);
			});
			return true;
		} else if (request.set === "print") {
			chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
				//var url = "data:text/html," + encodeURIComponent(request.html),
				var index = tabs[0].index + 1;
				chrome.tabs.create({index: index, url: chrome.extension.getURL("print/blankpage.html")}, function (tab) {
					var tableHead = request.tableHead, tableBody = request.tableBody;
					chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
						if (tabId === tab.id) {
							chrome.runtime.sendMessage({action: "loadPrintPage", tableHead: tableHead, tableBody: tableBody});
						}
					});
					sendResponse({tab: tab});
				});
			});
		} else if (request.set === "options") {//console.log('background.js received print request');
			chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
				//var url = "data:text/html," + encodeURIComponent(request.html),
				var index = tabs[0].index + 1, optionsHref, isFirefox = typeof InstallTrigger !== 'undefined';
				optionsHref = "options/options_ui.html";
				chrome.tabs.create({index: index, url: chrome.extension.getURL(optionsHref)}, function (tab) {
					sendResponse({tab: tab});
				});
			});
		} else {
			sendResponse({}); // snub them.
		}
	}
);

function send() {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {run: "replaceLinks"});
	});
}
function close() {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {run: "close"});
	});
}
function closeAll() {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {run: "closeAll"});
	});
}


storageWrapper.get(undefined, function(opts) {
	if (opts.show !== "load") {
		chrome.contextMenus.create({
			"id": "cmOpenAllLinks",
			"title": "Open All Links",
			"contexts": ["page","selection","link","editable","audio","video"],
			"onclick": send
		});
	}
});

chrome.contextMenus.create({
	"id": "cmCloseImage",
	"title": "Close Image",
	"contexts": ["image"],
	"onclick": close
});

chrome.contextMenus.create({
	"id": "cmCloseAllLinks",
	"title": "Close All Links",
	"contexts": ["page","selection","link","editable","audio","video"],
	"onclick": closeAll
});


