$(document).ready(function() {
    $('#books').css('color', '#FFF');
    $('#books').css('cursor', 'default');
    $('#books').attr('href', 'javascript: void(0);');
    loadAllBooks();
})

function loadAllBooks() {
    books = $.ajax({
        type: 'GET',
        url: '/api/books/get-all',
        success: function(data) {
            $.each(data.results, function(index) {
                $('#bookshelf').append(bookMetadata(data.results[index]))
            })
            renderSpecificBook(data.results[0].id);
        }
    })
}

function renderSpecificBook(id) {
    if ($('#booktab_' + id).length) {
        $('.book-description').css('display', 'none');
        $('#booktab_' + id).css('display', 'block');
    } else {
        $('.book-description').css('display', 'none');
        $('<div class="book-description row" id="booktab_' + id + '"></div>').appendTo('#book-wrap');
        book = $.ajax({
            type: 'POST',
            url: '/api/books/get',
            data: JSON.stringify({
                "id": id
            }),
            contentType: "application/json",
            success: function(data) {
                $('#booktab_' + id).append(bookObject(data['book']))
            }
        })
    }
}

function bookMetadata(data) {
    return '<div class="book" id="book_' + data.id + '" onclick="renderSpecificBook(' + data.id + ');">\
                <img src="' + data.cover + '">\
            </div>'
}

function bookObject(data) {
    return '<div class="book-metadata col-lg-4">\
                <img src="' + data.cover + '" class="book-img">\
                <b class="book-title">' + data.title + '</b>\
                <span class="book-author">' + data.author + ', ' + data.year + '</span>\
            </div>\
            <div class="book-review col-lg-8">\
                <span class="book-review-text">' + data.body + '</span>\
            </div>\
            <div class="fake-padding"></div>'
}