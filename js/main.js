$(window).on("load", function() { // makes sure the whole site is loaded
    //preloader
    $("#status").fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(450).fadeOut("slow"); // will fade out the white DIV that covers the website.

});

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
