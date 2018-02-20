let form = document.getElementById('signup_form');
let signup_button = document.getElementById('signup-button');
let email = document.forms["signup_form"]["email"];
let username = document.forms["signup_form"]["username"];
let password = document.forms["signup_form"]["password"];
let error = document.getElementById('error');
let save = {"username":"", "email":"", "password":"","politics":false, "tech":false, "finance":false, "sports":false, "entertainment":false, "health":false};

signup_button.addEventListener('click', validate);

//if enter key is presses, submit form
document.addEventListener("keydown", function(e) {
    if (e.which == 13 || e.keyCode == 13) {
        validate();
        return false;
    }
    return true;
});

// Change interests array values on checkbox change
function checkFunction(interestID) {
    save[interestID] = !save[interestID];
}

function validate() {
    name = document.forms["signup_form"]["name"];
    email = document.forms["signup_form"]["email"];
    password = document.forms["signup_form"]["password"];

    if (username.checkValidity() && password.checkValidity() && validateEmail()) {
        localStorage.setItem("is_logged_in", true);
        save["username"] = username.value;
        save["email"] = email.value;
        save["password"] = password.value;
        var saveJSON = JSON.stringify(save);
        localStorage.setItem("user_info", saveJSON);
        window.location.href = 'index.html';
    } else {
        failed();
    }
    return false;
}

function success() {
    error.innerHTML = 'Success, account created.';
    error.style.opacity = '1';
    error.style.color = '#6EC867';
    setTimeout(() => {
        error.style.opacity = '0';
        error.innerHTML = 'No errors';
        error.style.color = '';
        username.value = '';
        password.value = '';
        email.value = '';
    }, 2000);
}

function failed() {
    error.style.opacity = '1';
    if (!username.value || !password.value || !email.value) {
        error.innerHTML = 'Please fill out all the fields.';
    }
    if (!validateEmail() && username.value && password.value) {
        error.innerHTML = 'Please enter a valid email.';
    }
}

function validateEmail() {
    var x = email.value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        email.setCustomValidity("Please enter a valid email.");
        return false;
    } else {
        email.setCustomValidity("");
        return true;
    }
}