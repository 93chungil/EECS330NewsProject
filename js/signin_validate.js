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
        let user = localStorage.getItem("user_info") || null;
        user = JSON.parse(user);
        if (user) {
            if (username.value == user.username && password.value == user.password) {
                localStorage.setItem("is_logged_in", true);
                window.location.href = 'index.html';
            } else {
                incorrect();
            }
        } else {
            if (username.value == 'Test' && password.value == 'password') {
                localStorage.setItem("is_logged_in", true);
                window.location.href = 'index.html';
            } else {
                incorrect();
            }
        }

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

function incorrect() {
    error.style.opacity = '1';
    error.innerHTML = 'Wrong username and password combination.';
    password.value = '';
}