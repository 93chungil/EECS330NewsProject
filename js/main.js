let saved;
var profileValues = {};

window.onload = function() {
	setTimeout(() => {
		document.getElementById('status').style.display = 'none';
		document.getElementById('preloader').style.display = 'none';
	}, 1000);
};

function sidebar() {

	const opener = document.getElementById('sidebar-opener');
	const wrapper = document.getElementById('wrapper');
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

let login_status = localStorage.getItem("is_logged_in");
const user_buttons = document.querySelector('.user_buttons');
const account_links = document.getElementById('account_links');

if (login_status == 'true') {
	account_links.style.display = 'block';
	user_buttons.style.display = 'none';
}
if (login_status == 'false') {
	account_links.style.display = 'none';
	user_buttons.style.display = 'block';
}

function buttonColor(interestID) {
	if(saved[interestID]) {
		profileValues[interestID].style.backgroundColor= "rgba(0, 0, 255, 0.5)";
		profileValues[interestID].style.color = "white";
	}
	else {
		profileValues[interestID].style.backgroundColor= "rgba(185, 178, 178, 0.71)";
		profileValues[interestID].style.color = "black";
	}
}

function intClick(interestID) {
	saved[interestID] = !saved[interestID];
	var saveJSON = JSON.stringify(saved);
    localStorage.setItem("user_info", saveJSON);
	buttonColor(interestID);
}

function update() {
	if (profileValues["newpw"].value != profileValues["confirm"].value) {
        alert('Please Check the Password');
	    }
	else {
		var saveJSON = JSON.stringify(saved);
		localStorage.setItem("user_info"+saved["username"], saveJSON);
		alert('Account Updated');
	}
}

function populate() { 
	profileValues.username = document.getElementById('username');
	profileValues.email = document.getElementById('email');
	profileValues.newpw = document.getElementById('new_password');
	profileValues.confirm = document.getElementById('confirm_pw');
	profileValues.politics = document.getElementById('politics');
	profileValues.finance = document.getElementById('finance');
	profileValues.tech = document.getElementById('tech');
	profileValues.entertainment = document.getElementById('entertainment');
	profileValues.health = document.getElementById('health');
	profileValues.sports = document.getElementById('sports');
	profileValues.update = document.getElementById('update');

	profileValues["politics"].onclick = function() {intClick("politics")};
	profileValues["finance"].onclick = function() {intClick("finance")};
	profileValues["tech"].onclick = function() {intClick("tech")};
	profileValues["entertainment"].onclick = function() {intClick("entertainment")};
	profileValues["health"].onclick = function() {intClick("health")};
	profileValues["sports"].onclick = function() {intClick("sports")};
	profileValues["update"].onclick = function() {update()};

	//profileValues["update"].addEventListener('click', update);

	//if enter key is presses, submit form
	document.addEventListener("keydown", function(e) {
	    if (e.which == 13 || e.keyCode == 13) {
	        update();
	        return false;
	    }
	    return true;
	});

	buttonColor("politics");
	buttonColor("finance");
	buttonColor("tech");
	buttonColor("entertainment");
	buttonColor("health");
	buttonColor("sports");

	profileValues["username"].value = saved["username"];
	profileValues["email"].value = saved["email"];
}

function sign_out() {
	localStorage.setItem("is_logged_in", false);
	window.location.href = 'signin.html';
}

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


// If on profile page, open "Profile" tab as default
var page = document.location.href.match(/[^\/]+$/)[0];
if(page == "profile.html"){
	document.getElementById("defaultOpen").click();
	var savedJSON = localStorage.getItem("user_info"+window.name);
    saved = JSON.parse(savedJSON);
	populate();
}