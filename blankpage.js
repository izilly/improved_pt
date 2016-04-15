//console.log('start');
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		/*console.log(sender.tab ?
		"from a content script:" + sender.tab.url :
		"from the extension");*/
		if (request.action === "loadPrintPage") {
			//console.log(request.tableHead);
			//console.log(request.tableBody);
			document.getElementById("thead").innerHTML = request.tableHead;
			document.getElementById("tbody").innerHTML = request.tableBody;
			sendResponse({status: "done"});
		}
	}
);