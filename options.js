// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("show");
  var option = select.children[select.selectedIndex].value;
  localStorage["show"] = option;
  var selectColor = document.getElementById("color");
  var optionColor = selectColor.value;
  localStorage["color"] = optionColor;
  var selectQ = document.getElementById("quotes");
  var optionQ = selectQ.children[selectQ.selectedIndex].value;
  localStorage["quotes"] = optionQ;
  var selectV = document.getElementById("video");
  var optionV = selectV.children[selectV.selectedIndex].value;
  localStorage["video"] = optionV;
  var selectR = document.getElementById("reload");
  var optionR = selectR.children[selectR.selectedIndex].value;
  localStorage["reload"] = optionR;
  var selectF = document.getElementById("first");
  var optionF = selectF.children[selectF.selectedIndex].value;
  localStorage["first"] = optionF;
  var selectS = document.getElementById("scroll");
  var optionS = selectS.children[selectS.selectedIndex].value;
  localStorage["scroll"] = optionS;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function reset() {
	localStorage.clear();
	localStorage["color"] = "0000FF";
	restore_options();
	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	status.innerHTML = "Options Saved.";
	setTimeout(function() {
	  status.innerHTML = "";
	}, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage["show"];
  var colored = localStorage["color"];
  var videod = localStorage["video"];
  var quoted = localStorage["quotes"];
  var reloaded = localStorage["reload"];
  var firsted = localStorage["first"];
  var scrolled = localStorage["scroll"];
  if (!favorite) {
  }
  else {
  	var select = document.getElementById("show");
  	for (var i = 0; i < select.children.length; i++) {
  	  var child = select.children[i];
  	  if (child.value == favorite) {
  	    child.selected = "true";
  	    break;
  	  }
  	}
  }
  if (!videod) {
  }
  else {
  	var select = document.getElementById("video");
  	for (var i = 0; i < select.children.length; i++) {
  	  var child = select.children[i];
  	  if (child.value == videod) {
  	    child.selected = "true";
  	    break;
  	  }
  	}
  }
  if (!quoted) {
  }
  else {
  	var select = document.getElementById("quotes");
  	for (var i = 0; i < select.children.length; i++) {
  	  var child = select.children[i];
  	  if (child.value == quoted) {
  	    child.selected = "true";
  	    break;
  	  }
  	}
  }
  if (!reloaded) {
  }
  else {
  	var select = document.getElementById("reload");
  	for (var i = 0; i < select.children.length; i++) {
  	  var child = select.children[i];
  	  if (child.value == reloaded) {
  	    child.selected = "true";
  	    break;
  	  }
  	}
  }
  if (!firsted) {
  }
  else {
  	var select = document.getElementById("first");
  	for (var i = 0; i < select.children.length; i++) {
  	  var child = select.children[i];
  	  if (child.value == firsted) {
  	    child.selected = "true";
  	    break;
  	  }
  	}
  }
  if (!scrolled) {
  }
  else {
  	var select = document.getElementById("scroll");
  	for (var i = 0; i < select.children.length; i++) {
  	  var child = select.children[i];
  	  if (child.value == scrolled) {
  	    child.selected = "true";
  	    break;
  	  }
  	}
  }
  if (!colored) {
  	var select2 = document.getElementById("color");
    select2.color.fromString("0000FF");
  }
  else {
  	var select2 = document.getElementById("color");
  	select2.color.fromString(colored);
  }
}



document.addEventListener('DOMContentLoaded', function() {
  jscolor.init();
  restore_options();
});
document.getElementById('saveBtn').addEventListener('click', save_options);
document.getElementById('resetBtn').addEventListener('click', reset);