window.onload = function() {
	setTimeout(() => {
		document.getElementById('status').style.display = 'none';
		document.getElementById('preloader').style.display = 'none';
	}, 1000)
}

document.getElementById("defaultOpen").click();

$(document).ready(function() {

	//slide out menu
	$("#sidebar-opener").click(function(e) {
		e.preventDefault();
		$('#sidebar-opener').toggleClass('open');
		$("#wrapper").toggleClass("toggled");
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27 && $('#sidebar-opener').hasClass('open')) { // escape key maps to keycode `27`
			$('#sidebar-opener').toggleClass('open');
			$("#wrapper").toggleClass("toggled");
		}
	});

	$("#places").click(function() {
		$("#footer").hide();
		$(".account-page").hide();
		$("#google-map").show();
	});

	$("#account").click(function() {
		$(".account-page").show();
		$(".footer").show();
		$("#google-map").hide();

	});

});

function openInfo(evt, InfoName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(InfoName).style.display = "block";
    evt.currentTarget.className += " active";
}