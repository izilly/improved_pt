chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if (request.set === "show") {
			chrome.storage.sync.get({
				show: 'click',
				color: '0000FF',
				quotes: 'qno',
				video: 'vload',
				reload: 'true',
				scroll: 'true',
				sfw: 'false'
			},
			function(items) {
				sendResponse({setShow: items.show, setColor: items.color, setVideo: items.video, setQuotes: items.quotes, setReload: items.reload, setScroll: items.scroll, setSfw: items.sfw});
			});
		} else if (request.set === "index") {
			chrome.storage.sync.get({
				first: 'true',
				sfw: 'false'
			},
			function(items) {
				sendResponse({setFirst: items.first, setSfw: items.sfw});
			});
		} else {
			sendResponse({}); // snub them.
		}
	});

chrome.storage.sync.get({
	show: 'load'
},
function(items) {
	if (items.show !== "load") {
		var contextMenu = chrome.contextMenus.create({
			"title": "Open All Links",
			"contexts": ["page","selection","link","editable","audio","video"],
			"onclick": send
		});
	}
});

var closeMenu = chrome.contextMenus.create({
	"title": "Close Image",
	"contexts": ["image"],
	"onclick": close
}); 

var contextMenu = chrome.contextMenus.create({
	"title": "Close All Links",
	"contexts": ["page","selection","link","editable","audio","video"],
	"onclick": closeAll
});

function send() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {run: "replaceLinks"}, function(response) {
		});
	});
}
function close() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {run: "close"}, function(response) {
		});
	});
}
function closeAll() {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {run: "closeAll"}, function(response) {
		});
	});
}