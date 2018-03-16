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
let tab = "profile";

if (login_status == 'true') {
	account_links.style.display = 'block';
	user_buttons.style.display = 'none';
}
if (login_status == 'false') {
	account_links.style.display = 'none';
	user_buttons.style.display = 'block';
}

function buttonColor(interestID) {
	if (saved[interestID]) {
		profileValues[interestID].style.backgroundColor = "rgba(0, 0, 255, 0.5)";
		profileValues[interestID].style.color = "white";
		profileValues["picture_" + interestID].style.opacity = "1";
	} else {
		profileValues[interestID].style.backgroundColor = "rgba(185, 178, 178, 0.71)";
		profileValues[interestID].style.color = "black";
		profileValues["picture_" + interestID].style.opacity = "0.3";
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
	} else {
		saved["username"] = profileValues.username.value;
        saved["email"] = profileValues.email.value;
        if(profileValues["newpw"].value != null && profileValues["newpw"].value != ""){
        	saved["password"] = profileValues.newpw.value;
        	profileValues["newpw"].value = "";
        	profileValues["confirm"].value = "";
        }
		var saveJSON = JSON.stringify(saved);
		localStorage.setItem("user_info" + saved["username"], saveJSON);
		window.name = saved["username"];
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
	profileValues.picture_politics = document.getElementById('picture-politics');
	profileValues.picture_tech = document.getElementById('picture-tech');
	profileValues.picture_finance = document.getElementById('picture-finance');
	profileValues.picture_sports = document.getElementById('picture-sports');
	profileValues.picture_entertainment = document.getElementById('picture-entertainment');
	profileValues.picture_health = document.getElementById('picture-health');

	profileValues["politics"].onclick = function() { intClick("politics") };
	profileValues["finance"].onclick = function() { intClick("finance") };
	profileValues["tech"].onclick = function() { intClick("tech") };
	profileValues["entertainment"].onclick = function() { intClick("entertainment") };
	profileValues["health"].onclick = function() { intClick("health") };
	profileValues["sports"].onclick = function() { intClick("sports") };
//	profileValues["update"].onclick = function() { update() };

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
	window.name = 'notsigned_inwaaaaaaaaaaaaa';
	window.location.href = './signin.html';
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
if (page == "profile.html") {
	document.getElementById("defaultOpen").click();
	var savedJSON = localStorage.getItem("user_info" + window.name);
	saved = JSON.parse(savedJSON);
	populate();
} else if (page = 'index.html') {
	let user_data = localStorage.getItem("user_info" + window.name);
	user_data = JSON.parse(user_data);
	let logged_in;
	if (user_data == null) {
		logged_in = false;
	} else {
		logged_in = true;
	}

	if (!logged_in || user_data.entertainment) {
		document.getElementById('entertainment_div').style.display = 'block';
	}
	if (!logged_in || user_data.finance) {
		document.getElementById('finance_div').style.display = 'block';
	}
	if (!logged_in || user_data.health) {
		document.getElementById('health_div').style.display = 'block';
	}
	if (!logged_in || user_data.tech) {
		document.getElementById('tech_div').style.display = 'block';
	}
	if (!logged_in || user_data.sports) {
		document.getElementById('sports_div').style.display = 'block';
	}
	if (!logged_in || user_data.politics) {
		document.getElementById('politics_div').style.display = 'block';
	}
}

function topic(id) {
	localStorage.setItem("topic", id);
	window.location.href = './topic.html';
}

function c_topic(id) {
	localStorage.setItem("topic", id);
	window.location.href = '../topic.html';
}