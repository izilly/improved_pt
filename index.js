var firstSet, top2;

	// April fools day shit
	// if you're reading my source code, don't tell anyone about the shenanigans. feel free to contact me and i'll validate your awesomeness
var aprilfools = function() {
	var date = new Date();
	// Check if April 1
	if (date.getDate() === 1 && date.getMonth() === 3) {
		document.title = 'Drug Band Message Board';
		$(function() {
			$(".topic_author_display_name > div > a").each(function() {
				var name = $(this).text();
				if (!name.match(/^.*420.*$/))
					$(this).html(name+420);
				else
					$(this).html('wook');
			});
		});
	}
}
	// End April Fools Day
aprilfools();
main();
function main() {
	$(".topic_row:not(:hidden):even").removeClass("even").addClass("odd");
	$(".topic_row:not(:hidden):odd").removeClass("odd").addClass("even");
	top2 = $(".topic_row").attr("class");
}

chrome.extension.sendRequest({
	set: "index"
}, function (response) {
	firstSet = response.setFirst;
	if (firstSet == "true") {
		$(".topic_subject a").live("click", function() {
			$(this).attr("href", $(this).attr("href").split('#')[0] +"#page/1");
		});
	}
});