$(document).ready(function () {
    $('#btn-login').click(function () {
        if ($('#email').val() != '' && $('#password').val() != '') {
            var login = {
                email: $('#email').val(),
                password: $('#password').val()
            }
            $.ajax({
                url: '../theschool/login.php',
                data: login,
                type: 'post',
                success: function (data) {
                    window.location.href="index.html";
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    });
});