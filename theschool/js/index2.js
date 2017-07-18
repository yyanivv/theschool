$(document).ready(function () {
    $('#logout').click(function () {
        window.location.href = "logout.php";
    });
    
    function firstLoad() {
        return $.ajax({
            url: '../theschool/index.php',
        });
    }
    
    firstLoad().then(function (data) {
        if (!data) {
            window.location.href = "login.html";
        } else {
            if (data.role == 'sales') {
                //console.log(data.role);
                $('#administratorTab').hide();
            }
            $('body').show();
            $('#login-name').text(data.name);
            $('#login-role').text(data.role);
        }
    }, function (err) {
        console.log(err);
    });
    
    function getCourses() {
        return $.ajax({
            url: '../theschool/course.php',
            success: function(data){
                JSON.parse(data);
            }
        });
    }
    
    getCourses().then(function (data) {
        var n = [];
        for (var i in data) {
            n.push(data[i]);
        }
        return (n);

    });
    console.log(getCourses());
    
});