$(document).ready(function() {
    $('#thoughtinput').keyup(function() {
        $('#examplethoughttext').html($('#thoughtinput').val());
    });
})

function submitThought() {
    thought = $('#thoughtinput').val();
    if (thought.length == 0) {
        $('#usr').focus();
        return;
    }
    $.ajax({
        method: 'POST',
        url: '/api/thoughts/create',
        data: JSON.stringify({
            section: 'General',
            body: thought
        }),
        contentType: 'application/json',
        success: function(resp) {
            console.log(resp);
            alert('Thought created!')
            $('#thoughtinput').val('');
            $('#examplethoughttext').html('');
        },
        err: function(xhr, opt, error) {
            alert('Error creating thought.')
            $('#thoughtinput').focus();
        }
    })
}