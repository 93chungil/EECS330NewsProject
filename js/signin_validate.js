let form = document.getElementById('signin_form');
let signin_button = document.getElementById('signin-button');
let username = document.forms["signin_form"]["username"];
let password = document.forms["signin_form"]["password"];
let error = document.getElementById('error');
let interests = [false, false, false, false, false, false];
signin_button.addEventListener('click', validate);

//if enter key is presses, submit form
document.addEventListener("keydown", function(e) {
    if (e.which == 13 || e.keyCode == 13) {
        validate();
        return false;
    }
    return true;
});

function validate() {
    name = document.forms["signin_form"]["name"];
    email = document.forms["signin_form"]["email"];

    if (username.checkValidity() && password.checkValidity()) {
        localStorage.setItem("is_logged_in", true);
        var savedJSON = localStorage.getItem("user_info");
        let saved = JSON.parse(savedJSON);
        window.location.href = 'index.html';
    } else {
        failed();
    }
    return false;
}

function success() {
    error.innerHTML = 'Success, logging in.';
    error.style.opacity = '1';
    error.style.color = '#6EC867';
    setTimeout(() => {
        error.style.opacity = '0';
        error.innerHTML = 'No errors';
        error.style.color = '';
        username.value = '';
        password.value = '';
    }, 2000);
}

function failed() {
    error.style.opacity = '1';
    if (!username.value || !password.value) {
        error.innerHTML = 'Please fill out all the fields.';
    }
}