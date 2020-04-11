$(document).ready(function() {
    $('#projects').css('color', '#FFF');
    $('#projects').css('cursor', 'default');
    $('#projects').attr('href', 'javascript: void(0);');
    loadAllProjects();
})

function loadAllProjects() {
    books = $.ajax({
        type: 'GET',
        url: '/api/projects/get-all',
        success: function(data) {
            $.each(data.results, function(index) {
                $('#projects-container').append(projectInformation(data.results[index]))
            })
        }
    })
}

function projectInformation(data) {
    return '<div id="project_' + data.id + '"" class="project">\
                <img src="' + data.cover + '" class="project-img">\
                <div class="project-info">\
                    <div id="project_title_' + data.id + '" class="project-title"><b><a href="' + data.url + '" target="_blank">' + data.title + '</a></b><span class="project-year">Last: ' + data.year + '</span></div>\
                    <div id="project_desc_' + data.id + '" class="project-desc">' + data.review + '</div>\
                </div>\
            </div>'
}