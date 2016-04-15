chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {//console.log(request); console.log(sender);
		if (request.set === "show") {//console.log('background.js received show request');
			chrome.storage.sync.get({
				show: 'click',
				color: '0000FF',
				quotes: 'qno',
				video: 'vload',
				reload: 'true',
				scroll: 'true',
				sfw: 'false'
			},
			function(items) {//console.log(items);
				sendResponse({setShow: items.show, setColor: items.color, setVideo: items.video, setQuotes: items.quotes, setReload: items.reload, setScroll: items.scroll, setSfw: items.sfw});
			});
			return true;
		} else if (request.set === "index") {//console.log('background.js received index request');
			chrome.storage.sync.get({
				first: 'true',
				sfw: 'false'
			},
			function(items) {
				sendResponse({setFirst: items.first, setSfw: items.sfw});
			});
			return true;
		} else if (request.set === "print") {//console.log('background.js received print request');
			chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
				//var url = "data:text/html," + encodeURIComponent(request.html),
				var index = tabs[0].index + 1;
				chrome.tabs.create({index: index, url: chrome.extension.getURL("blankpage.html")}, function (tab) {
					var tableHead = request.tableHead, tableBody = request.tableBody;
					chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
						if (tabId === tab.id) {
							chrome.runtime.sendMessage({action: "loadPrintPage", tableHead: tableHead, tableBody: tableBody}, function(response) {
								//console.log(response);
							});
						}
					});
					sendResponse({tab: tab});
				});
			});
		} else {
			sendResponse({}); // snub them.
		}
	}
);
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