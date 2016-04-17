// Saves options to chrome.storage.sync.
function save_options() {
	var show = DOMPurify.sanitize(document.getElementById('show').value, {SAFE_FOR_JQUERY: true});
	var color = DOMPurify.sanitize(document.getElementById('color').value, {SAFE_FOR_JQUERY: true});
	var quotes = DOMPurify.sanitize(document.getElementById('quotes').value, {SAFE_FOR_JQUERY: true});
	var video = DOMPurify.sanitize(document.getElementById('video').value, {SAFE_FOR_JQUERY: true});
	var reload = DOMPurify.sanitize(document.getElementById('reload').value, {SAFE_FOR_JQUERY: true});
	var first = DOMPurify.sanitize(document.getElementById('first').value, {SAFE_FOR_JQUERY: true});
	var scroll = DOMPurify.sanitize(document.getElementById('scroll').value, {SAFE_FOR_JQUERY: true});
	var sfw = DOMPurify.sanitize(document.getElementById('sfw').value, {SAFE_FOR_JQUERY: true});
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
		video: 'vclick',
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

document.addEventListener('DOMContentLoaded', function() {
	jscolor.init();
	restore_options();
});
document.getElementById('saveBtn').addEventListener('click', save_options);