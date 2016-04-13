// Saves options to chrome.storage.sync.
function save_options() {
	var show = document.getElementById('show').value;
	var color = document.getElementById('color').value;
	var quotes = document.getElementById('quotes').value;
	var video = document.getElementById('video').value;
	var reload = document.getElementById('reload').value;
	var first = document.getElementById('first').value;
	var scroll = document.getElementById('scroll').value;
	var sfw = document.getElementById('sfw').value;
	chrome.storage.sync.set({
		show: show,
		color: color,
		quotes: quotes,
		video: video,
		reload: reload,
		first: first,
		scroll: scroll,
		sfw: sfw
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
		status.textContent = '';
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get({
		show: 'click',
		color: '0000FF',
		quotes: 'qno',
		video: 'vload',
		reload: 'true',
		first: 'false',
		scroll: 'true',
		sfw: 'false'
	},
	function(items) {
		document.getElementById('show').value = items.show;
		document.getElementById('color').value = items.color;
		document.getElementById('quotes').value = items.quotes;
		document.getElementById('video').value = items.video;
		document.getElementById('reload').value = items.reload;
		document.getElementById('first').value = items.first;
		document.getElementById('scroll').value = items.scroll;
		document.getElementById('sfw').value = items.sfw;
	});
}

/*function reset() {
	localStorage.clear();
	localStorage["color"] = "0000FF";
	restore_options();
	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
}*/

document.addEventListener('DOMContentLoaded', function() {
	jscolor.init();
	restore_options();
});
document.getElementById('saveBtn').addEventListener('click', save_options);
//document.getElementById('resetBtn').addEventListener('click', reset);