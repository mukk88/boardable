$(document).ready(function() {
    var editmode = false;

    $('button').css('left', ($('#main').position().left - 100) + 'px');
    $('#overlay').draggable();
    $('#read').hide();
    $('.lined').linedtextarea();
    $('.lines').hide();



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