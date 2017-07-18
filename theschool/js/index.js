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
                console.log(data.role);
                $('#administratorTab').hide();
            }
            $('body').show();
            $('#login-name').text(data.name);
            $('#login-role').text(data.role);
        }
    }, function (err) {
        console.log(err); //add err message
    });

    function getCourses() {
        return $.ajax({
            url: '../theschool/course.php',
        });
    }
    getCourses().then(function (data) {
        for (var i in data) {
            $('.ul-courses').append('<li><img src=' + data[i][3] + ' alt="" class="img-rounded"><span>' + data[i][1] + '</span></li>');
        }
        $('.total-courses').text(data.length);
        $('.ul-courses li').click(function () {
            $('ul.list-group').parent().empty();
            var courseName = ($(this).find('span').text());
            for (var i in data) {
                if (data[i][1] == courseName) {
                    $('.course-img , .course-des , .student-list-in-course').empty();
                    $('.status , .show-student , .add-student').hide();
                    $('.show-course').show();
                    $('.main-heading').text('Course Details');
                    $('.course-img').append('<img src=' + data[i][3] + ' alt="" class="img-rounded">');
                    $('.course-des').append('<h1>' + data[i][1] + '</h1>');
                    $('.course-des').append('<p>' + data[i][2] + '</p>');
                    getStudents().then(function (student) {
                        for (var i in student) {
                            if (student[i][5] == courseName) {
                                $('.student-list-in-course').append('<ul><li><img src="images/user.png" alt="" class="img-rounded" width="45px"><span>' + student[i][1] + '</span></li></ul>');
                            }
                        }
                    }, function (err) {
                        console.log(err);
                    });
                }
            }
        });
    });

    function getStudents() {
        return $.ajax({
            url: '../theschool/student.php',
        });
    }

    getStudents().then(function (data) {
            for (var i in data) {
                $('.ul-students').append('<li><img src=' + data[i][4] + ' alt="" class="img-rounded" width="70px"><span>' + data[i][1] + '</span></li>');
            }
            $('.total-students').text(data.length);
            $('.ul-students li').click(function () {
                $('ul.list-group').parent().empty();
                var studentName = ($(this).find('span').text());
                for (var i in data) {
                    if (data[i][1] == studentName) {
                        $('.student-img , .student-details , .student-courses').empty();
                        $('.status , .show-course , .add-student').hide();
                        $('.show-student').show();
                        $('#btn-edit-student').removeClass('hide');
                        $('#heading-main').text('Student Details');
                        $('.student-img').append('<img src=' + data[i][4] + ' alt="" class="img-rounded img-responsive" style="max-width:135px">');
                        $('.student-details').append('<h1>' + data[i][1] + '</h1>');
                        $('.student-details').append('<h3>' + data[i][3] + '</h3>');
                        $('.student-details').append('<h4>' + data[i][2] + '</h4>');
                        var studentCourses = data[i][5];
                            if (studentCourses != '') {
                                $('.student-courses').append('<ul>');
                            }
                        getCourses().then(function (courses) {
                            for (var c in courses) {
                                for (var j in studentCourses) {
                                    if (studentCourses[j] == courses[c][1]) {
                                        $('.student-courses ul').append('<li><img src=' + courses[c][3] + ' alt="" class="img-rounded" width="50px"><span>' + courses[c][1] + '</span></li>');
                                    }
                                }
                            }
                        }, function (err) {
                        console.log(err);
                    });


                }
            }
        });
    },
        function (err) {
            console.log(err);
        });

    $('#btn-add-student').click(function () {
        $('ul.list-group').parent().empty();
        $('.status , .show-course , .show-student').hide();
        $('.add-student').show();
        $(':input').not('input[type="button"]').val('');
        getCourses().then(function (data) {
            $('.student-choose-course').append('<ul class="list-group">');
            var lables = ['danger', 'warning', 'info', 'success', 'primary'];
            for (var i in data) {
                $('.student-choose-course ul').append('<li class="list-group-item"><img src=' + data[i][3] + ' alt="" class="img-rounded" width="40px"><span>' + data[i][1] + '</span><div class="material-switch pull-right"><input id="switch' + data[i][1] + '" name="' + data[i][1] + '" type="checkbox" value="' + data[i][1] + '"><label for="switch' + data[i][1] + '" class="label-' + lables[i] + '"></label></div></li>');
            }
        });
    });
    $('#btn-edit-student').click(function () {
        $('#delete-btn').removeClass('hide');
        $('.status , .show-course , .show-student').hide();
        $('.add-student').show();
        $('#name').val($('.student-details').find('h1').text());
        $('#phone').val($('.student-details').find('h3').text());
        $('#email').val($('.student-details').find('h4').text());
        getCourses().then(function (data) {
            $('.student-choose-course').append('<ul class="list-group">');
            var lables = ['danger', 'warning', 'info', 'success', 'primary'];
            for (var i in data) {
                $('.student-choose-course ul').append('<li class="list-group-item"><img src=' + data[i][3] + ' alt="" class="img-rounded" width="40px"><span>' + data[i][1] + '</span><div class="material-switch pull-right"><input id="switch' + data[i][1] + '" name="' + data[i][1] + '" type="checkbox" value="' + data[i][1] + '"><label for="switch' + data[i][1] + '" class="label-' + lables[i] + '"></label></div></li>');
            }
            getStudents().then(function (stu) {
                for (var i in stu) {
                    if (stu[i][1] === $('.student-details').find('h1').text()) {
                        for (var j in stu[i][5]) {
                            $('.student-courses').find('span').each(function () {
                                if ($(this).text() == stu[i][5][j]) {
                                    $('#switch' + stu[i][5][j] + '').prop('checked', true);
                                }
                            });
                        }
                    }
                }
            });
        });
    });

    function newStudent(obj) {
        $.ajax({
            url: '../theschool/newStudent.php',
            data: obj,
            type: 'POST'
        });
    }

    function uploadImage(img) {
        var form_data = new FormData();
        form_data.append('file', img);
        return $.ajax({
            url: '../theschool/uploadImage.php',
            data: form_data,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            type: 'post'
        });
    }
    $('#save-btn').click(function () {
        var path = $('#file').val();
        var fileName = path.match(/[^\/\\]+$/);
        var arrayOfCoursesNewStudent = new Array();
        $("input[type=checkbox]").each(function () {
            if ($(this).prop("checked")) {
                arrayOfCoursesNewStudent.push($(this).val());
            }
        });

        var newStudentDetails = {
            name: $('#name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            image: 'images/' + fileName[0],
            courses: arrayOfCoursesNewStudent
        }
        uploadImage($('#file').prop('files')[0]);
        newStudent(newStudentDetails);
        getStudents().then(function (data) {
            $('.ul-students').empty();
            for (var i in data) {
                $('.ul-students').append('<li><img src=' + data[i][4] + ' alt="" class="img-rounded" width="70px"><span>' + data[i][1] + '</span></li>');
            }
            $('.total-students').text(data.length);
        });
        $('.add-student').hide();
        $('.status').show();
    });
});