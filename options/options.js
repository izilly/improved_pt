// Saves options to localStorage.
function save_options() {
	var status,
		selectShow = document.getElementById("show"),
		optionShow = selectShow.children[selectShow.selectedIndex].value,
		selectColor = document.getElementById("color"),
		optionColor = selectColor.value,
		selectQuotes = document.getElementById("quotes"),
		optionQuotes = selectQuotes.children[selectQuotes.selectedIndex].value,
		selectVideo = document.getElementById("video"),
		optionVideo = selectVideo.children[selectVideo.selectedIndex].value,
		selectReload = document.getElementById("reload"),
		optionReload = selectReload.children[selectReload.selectedIndex].value,
		selectFirst = document.getElementById("first"),
		optionFirst = selectFirst.children[selectFirst.selectedIndex].value,
		selectScroll = document.getElementById("scroll"),
		optionScroll = selectScroll.children[selectScroll.selectedIndex].value,
		selectSFW = document.getElementById("sfw"),
		optionSFW = selectSFW.children[selectSFW.selectedIndex].value,
		selectValidateBB = document.getElementById("validatebb"),
		optionValidateBB = selectValidateBB.children[selectValidateBB.selectedIndex].value;
	localStorage.show = optionShow;
	localStorage.color = optionColor;
	localStorage.quotes = optionQuotes;
	localStorage.video = optionVideo;
	localStorage.reload = optionReload;
	localStorage.first = optionFirst;
	localStorage.scroll = optionScroll;
	localStorage.sfw = optionSFW;
	localStorage.validatebb = optionValidateBB;
	// Update status to let user know options were saved.
	status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	setTimeout(function () {
		status.innerHTML = "";
	}, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	var favorite = localStorage.show,
		colored = localStorage.color,
		videod = localStorage.video,
		quoted = localStorage.quotes,
		reloaded = localStorage.reload,
		firsted = localStorage.first,
		scrolled = localStorage.scroll,
		sfwed = localStorage.sfw,
		validatebbed = localStorage.validatebb,
		selectShow, selectVideo, selectQuotes, selectReload, selectFirst, selectScroll, selectSFW, selectValidateBB, selectColor, i, child;
	if (!favorite) {
	} else {
		selectShow = document.getElementById("show");
		for (i = 0; i < selectShow.children.length; i++) {
			child = selectShow.children[i];
			if (child.value === favorite) {
				child.selected = "true";
				break;
			}
		}
	}
	if (!videod) {
	} else {
		selectVideo = document.getElementById("video");
		for (i = 0; i < selectVideo.children.length; i++) {
			child = selectVideo.children[i];
			if (child.value === videod) {
				child.selected = "true";
				break;
			}
		}
	}
	if (!quoted) {
	} else {
		selectQuotes = document.getElementById("quotes");
		for (i = 0; i < selectQuotes.children.length; i++) {
			child = selectQuotes.children[i];
			if (child.value === quoted) {
				child.selected = "true";
				break;
			}
		}
	}
	if (!reloaded) {
	} else {
		selectReload = document.getElementById("reload");
		for (i = 0; i < selectReload.children.length; i++) {
			child = selectReload.children[i];
			if (child.value === reloaded) {
				child.selected = "true";
				break;
			}
		}
	}
	if (!firsted) {
	} else {
		selectFirst = document.getElementById("first");
		for (i = 0; i < selectFirst.children.length; i++) {
			child = selectFirst.children[i];
			if (child.value === firsted) {
				child.selected = "true";
				break;
			}
		}
	}
	if (!scrolled) {
	} else {
		selectScroll = document.getElementById("scroll");
		for (i = 0; i < selectScroll.children.length; i++) {
			child = selectScroll.children[i];
			if (child.value === scrolled) {
				child.selected = "true";
				break;
			}
		}
	}
	if (!sfwed) {
	} else {
		selectSFW = document.getElementById("sfw");
		for (i = 0; i < selectSFW.children.length; i++) {
			child = selectSFW.children[i];
			if (child.value === sfwed) {
				child.selected = "true";
				break;
			}
		}
	}
	if (!validatebbed) {
	} else {
		selectValidateBB = document.getElementById("validatebb");
		for (i = 0; i < selectValidateBB.children.length; i++) {
			child = selectValidateBB.children[i];
			if (child.value === validatebbed) {
				child.selected = "true";
				break;
			}
		}
	}
	if (!colored) {
		selectColor = document.getElementById("color");
		selectColor.color.fromString("0000FF");
	} else {
		selectColor = document.getElementById("color");
		selectColor.color.fromString(colored);
	}
}

function reset() {
	var status;
	localStorage.clear();
	localStorage.color = "0000FF";
	restore_options();
	// Update status to let user know options were saved.
	status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	setTimeout(function () {
		status.innerHTML = "";
	}, 750);
}

document.addEventListener('DOMContentLoaded', function () {
	jscolor.init();
	restore_options();
	document.getElementById('saveBtn').addEventListener('click', save_options);
	document.getElementById('resetBtn').addEventListener('click', reset);
});
