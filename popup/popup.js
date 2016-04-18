document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('optionsLink').style.cursor = "pointer";
  document.getElementById('optionsLink').onclick = function (e) {
    chrome.runtime.openOptionsPage(function () {
      //console.log('options');
    });
  };
});
