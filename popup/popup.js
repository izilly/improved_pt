document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('optionsLink').style.cursor = "pointer";
	document.getElementById('optionsLink').onclick = function (e) {
		var optionsUrl = chrome.extension.getURL('options/options_ui.html');
		chrome.tabs.query({'title': "PT'd Settings"}, function(tabs) {
			if (tabs[0] && tabs[0].url == optionsUrl) {
				chrome.tabs.update(tabs[0].id, {active: true});
			} else {
				chrome.tabs.create({url: optionsUrl, active: true});
			}
		});
	};
});
