$(document).ready(function(){
    //clear
    $('input').on('focus', function(){
        $('div.alert-danger').remove();
    });


    //register
    $(".register-button").on('click', function(e){
        e.preventDefault();

        var data = {
            login: $('#register-login').val(),
            password: $('#register-password').val(),
            passwordConfirm: $('#register-password-confirm').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/register'
        }).done(function(data){
            if(!data.ok){
                $('.form-signin h1').after('<div class="alert alert-danger" role="alert">'+ data.error +'</div>');
            }else{
                $(location).attr('href', '/');
            }
        });
    });
 //Login
    $(".login-button").on('click', function(e){
        e.preventDefault();

        var data = {
            login: $('#login-login').val(),
            password: $('#login-password').val()
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/login'
        }).done(function(data){
            if(!data.ok){
                $('.form-signin h1').after('<div class="alert alert-danger" role="alert">'+ data.error +'</div>');
            }else{
                $(location).attr('href', '/');
            }
        });

    });



})