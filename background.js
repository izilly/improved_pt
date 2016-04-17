chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {//console.log(request); console.log(sender);
		if (request.set === "show") {//console.log('background.js received show request');
			chrome.storage.sync.get({
				show: 'click',
				color: '0000FF',
				quotes: 'qno',
				video: 'vclick',
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
				first: 'false',
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

chrome.storage.sync.get({
	show: 'load'
},
function(items) {
	if (items.show !== "load") {
		chrome.contextMenus.create({
			"title": "Open All Links",
			"contexts": ["page","selection","link","editable","audio","video"],
			"onclick": send
		});
	}
});

chrome.contextMenus.create({
	"title": "Close Image",
	"contexts": ["image"],
	"onclick": close
}); 

chrome.contextMenus.create({
	"title": "Close All Links",
	"contexts": ["page","selection","link","editable","audio","video"],
	"onclick": closeAll
});