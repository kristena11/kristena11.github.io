$(function() {


    $("#search-form").submit(function(event) {
        event.preventDefault();
        $("#search-results").empty();
        var searchTerm = $('#query').val();
        search(searchTerm)
    });


    function search(term) {

        var query = {
            key: "AIzaSyDJYdUjaE96D7PC-V68DM5iJVEa-0p2jg4",
            part: "snippet",
            type: 'video',
            q: term,
            videoCategoryId: 15
        }

        $.getJSON("https://www.googleapis.com/youtube/v3/search/", query, function(data) {
            var resultsArray = data.items;
            var arrayLength = resultsArray.length;
            for (var i = 0; i < arrayLength; i++) {
                console.log(resultsArray[i].id.videoId)
                $("#search-results").append("<a href=https://www.youtube.com/watch?v=" +
                    resultsArray[i].id.videoId + "><img src=" + resultsArray[i].snippet.thumbnails.high.url + "></a>");

            };
        })

    };

});

$("#btn").click(

    function f() {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            data: {
                format: "json",
                action: "parse",
                page: $("#text1").val(),
                prop: "text",
                section: 0,
            },
            dataType: 'jsonp',
            headers: {
                'Api-User-Agent': 'MyCoolTool/1.1 (http://example.com/MyCoolTool/; MyCoolTool@example.com) BasedOnSuperLib/1.4'
            },
            success: function(data) {

                console.log(data)
                var markup = data.parse.text["*"];
                var i = $('<div></div>').html(markup);
                $('#article').html(i);

                // remove links as they will not work

                i.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });

                // remove any references
                i.find('sup').remove();

                // remove cite error
                i.find('.mw-ext-cite-error').remove();

                $('#article').html($(i).find('p'));





            }
        })
    });