$(document).ready(function() {
    loadThoughts()
})

// This holds the id of the oldest thought pulled
var syncID = 0;

// Load the thoughts from the database
function loadThoughts(num_thoughts=20) {
    thoughts = $.ajax({
        type: 'POST',
        url: '/api/thoughts/get',
        data: JSON.stringify({
            "sync_id": syncID,
            "quantity": num_thoughts
        }),
        contentType: "application/json",
        success: function(data) {
            syncID = data.sync_id;
            previousDate = null;
            $.each(data.results, function(index) {
                date = new Date(data.results[index].created_on)
                if (previousDate != null && !datesAreOnSameDay(previousDate, date)) {
                    $('#thought-container').prepend(dateNotifier(date.toLocaleDateString()))
                }
                $('#thought-container').prepend(
                    thought(
                        data.results[index].body, 
                        date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                    )
                )
                previousDate = date
            });
            $('#thought-container').prepend(dateNotifier(previousDate.toLocaleDateString()))
        }
    });
}

// Check if two dates are on same day
const datesAreOnSameDay = (first, second) => 
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()

// Builder of time interjection HTMl
function dateNotifier(day) {
    return '<div class="day-thought-interjection">' + day + '</div>'
}

// Builder of thought HTML
function thought(body, time) {
    return '<div class="thought"><div class="thought-time"><b>' + time + '</b></div>' + body + '</div>'
}