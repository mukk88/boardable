$(document).ready(function() {
    
    var editmode = false;

    $('button').css('left', ($('#main').position().left - 100) + 'px');
    $('#overlay').draggable();
    $('#read').hide();
    $('.lines').hide();

    var height = $('.lined').height();
    // fill the lines
    var fillLines = function(){
        var h = 0;
        var lineNo = 1;
        $('.codelines').empty();
        $('.lines').height($('.lined').height());
        while($('.lined').height() - h + 69> 0){
            $('.codelines').append('<div class="numbers">' + lineNo + '</div>');
            lineNo++;
            h += 23;
        }

    };

    fillLines();

    $('.lined').bind('keyup', function(){
        if(height!=$(this).height()){
            fillLines();
        }
        console.log($(this).height());
    });

    $('#read').click(function(){
        $('#read').hide();
        $('#edit').show();
        $('.inner textarea').removeAttr('contenteditable');
        $('.lines').hide();
        //save the contents
        var content = $('.lined').html();
        var regex = /<br\s*[\/]?>/gi;
        content = content.replace(regex, "\n");
        console.log('CONTENT!!!' + content);
        $.ajax({
          type: "POST",
          url: "http://boardable.azurewebsites.net/book",
          data: { "content": content }
        })
        .done(function( msg ) {
            console.log( "Data Saved: " + msg );
          });

    });


    function createEntry(current, index){
        $('#overlay').show();
        $('#insert').unbind();
        $('#new').val('');
        $('#insert').click(function(){
            $('#overlay').hide();
            var text = $('#new').val();
            current.after('<br><br> ' + text);
        });
    };

    $('#edit').click(function(){
        $('#read').show();
        $('#edit').hide();
        $('.lined').attr('contenteditable', true);
        $('.lines').show();

    });

});