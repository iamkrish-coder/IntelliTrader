// Custom JavaScript code

$(document).ready(function () {
    $("#BtnGetStarted").click(function () {
        $.get('/get_login_url', function (response) {
            window.location.href = response; // Use the server-generated URL
        });
    });
});
