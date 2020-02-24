$(document).ready(function(){
    $('#pwd').keypress(function(e){
      if(e.keyCode==13)
        $('#sendlogin').click();
    });
});

function login() {
    username = $('#usr').val();
    password = $('#pwd').val();
    if (username.length == 0) {
        $('#usr').focus();
        return;
    } else if (password.length == 0) {
        $('#pwd').focus();
        return;
    }
    $.ajax({
        method: 'POST',
        url: '/api/auth/login',
        data: JSON.stringify({
            username: username,
            password: password
        }),
        contentType: 'application/json',
        success: function(resp) {
            const urlParams = new URLSearchParams(window.location.search);
            redirectUrl = decodeURIComponent(urlParams.get('redirect'));
            if (redirectUrl == null || redirectUrl == "null") {
                window.location.replace('/')
            } else {
                window.location.replace(redirectUrl)
            }
        },
        err: function(xhr, opt, error) {
            alert('Error logging in.')
            $('#pwd').val('');
            $('#pwd').focus();
        }
    })
}