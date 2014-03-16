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
        while($('.lined').height() - h > 0){
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
        // editmode = false;
        // $('p').each(function(index){
        //     var text = $(this).text().replace(/edit/g,'');
        //     $(this).html(text);
        // });
        $('#read').hide();
        $('#edit').show();
        $('.inner textarea').prop('readonly', true);
        $('.lines').hide();
        //save the contents
        console.log($('.lined').val());
        var content = $('.lined').val();
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
        // if(!editmode){
        //     editmode = true;
        //     $('p').each(function(index){
        //         var text = $(this).text().replace(/\./g,'.<button class= "editbutton" style="float:right">edit</button><br><br>');
        //         $(this).html(text);
        //     });
        //     $('.editbutton').each(function(index){
        //         $(this).attr('id', 'edit'+ index);
        //         $(this).click(function(){
        //             createEntry($(this), index);
        //         });
        //     });
        // }
        $('#read').show();
        $('#edit').hide();
        $('.inner textarea').prop('readonly', false);
        $('.lines').show();

    });

});