window.onload = function() {
	setTimeout(() => {
		document.getElementById('status').style.display = 'none';
		document.getElementById('preloader').style.display = 'none';
	}, 1000);
}

//document.getElementById("defaultOpen").click();

function sidebar() {

	let opener = document.getElementById('sidebar-opener');
	let wrapper = document.getElementById('wrapper');
	opener.addEventListener('click', () => {
		if (opener.getAttribute('class')) {
			opener.removeAttribute('class', 'open');
			wrapper.removeAttribute('class', 'toggled');
		} else {
			opener.setAttribute('class', 'open');
			wrapper.setAttribute('class', 'toggled');
		}
	});
	document.onkeydown = function(e) {
		e = e || window.event;
		if (e.keyCode == 27) {
			if (opener.getAttribute('class')) {
				opener.removeAttribute('class', 'open');
				wrapper.removeAttribute('class', 'toggled');
			}
		}
	};
};
sidebar();

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