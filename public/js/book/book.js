$(document).ready(function() {
    
    var maxline = 0;
    var linelinks = {};

    var images = ["http://upload.wikimedia.org/wikipedia/commons/e/e9/BattleOfVirginiaCapes.jpg","../../images/966_max.jpg", "../../images/war.jpg"];
    var imageindex = 0;

    $('button').css('left', ($('#main').position().left - 100) + 'px');
    $('#linenumber').css('left', ($('#main').position().left - 100) + 'px');
    $('#lineinput').css('left', ($('#main').position().left - 100) + 'px');
    $('#overlay').draggable();
    $('#read').hide();
    // $('.lines').hide();
    $('#fork').hide();
    $('#linenumber').hide();
    $('#lineinput').hide();
    $('.lined').html($('.lined').html().replace(/\n/g,'<br>'));
    var linedtext = $('.lined').html();
    linedtext = linedtext.replace(/&gt;/gi,'>');
    linedtext = linedtext.replace(/&lt;/gi,'<');
    $('.lined').html(linedtext);
    $('#pre').html($('#pre').html().replace(/\n/g,'<br>'));
    var pretext = $('#pre').html();
    pretext = pretext.replace(/&gt;/gi,'>');
    pretext = pretext.replace(/&lt;/gi,'<');
    $('#pre').html(pretext);
    var kids =  JSON.parse($('#kids').text());


    var height = $('.lined').height();
    var fixedheight = $('#pre').height();
    // fill the lines
    var fillLines = function(){
        var h = 0;
        var lineNo = 1;
        fixedheight = $('#pre').height();
        height = $('.lined').height();
        $('.codelines').empty();
        $('.lines').height($('.lined').height() + 72 + fixedheight + 1);
        while($('.lined').height() - h + 72 + fixedheight> 0){
            var linked = false;
            var versionNo = 1;
            for(var i=0;i<kids.length;i++){
                if(lineNo==parseInt(kids[i].line)){
                    linked = true;
                    versionNo = kids[i].version;
                }
            }
            if(linked){
                $('.codelines').append('<a href="/book/' + $('#title').html() +'/' + versionNo + '"><div class="numbers linked" id =line'+ lineNo +'>' + lineNo + '</div></a>');
            }else{
                $('.codelines').append('<div class="numbers" id =line'+ lineNo +'>' + lineNo + '</div>');
            }
            lineNo++;
            h += 24;
        }
        maxline = lineNo;
    };

    fillLines();

    $('.lined').bind('keyup', function(){
        if($('.lines').height()!=$(this).height() + fixedheight + 144){
            fillLines();
        }
        console.log($(this).height());
    });

    $('#pre').bind('keyup', function(){
        if($('.lines').height()!=$('.lined').height() + fixedheight + 144 ){
            fillLines();
        }
        console.log($(this).height());
    });

    $('#read').click(function(){
        $('#read').hide();
        $('#edit').show();
        $('#fork').hide();
        $('.lined').attr('contenteditable', false);
        // $('.lines').hide();
        $('#linenumber').hide();
        $('#lineinput').hide();
        //save the contents
        var version = $('#version').html();
        var title = $('#title').html();
        var content = $('.lined').html();
        var regex = /<br\s*[\/]?>/gi;
        content = content.replace(regex, "\n");
        content = content.replace(/&lt;p&gt;/g, "");
        content = content.replace(/&lt;\s*\/p&gt;/g, "\n");

        console.log(content);

        $.ajax({
          type: "POST",
          url: "http://boardable.azurewebsites.net/book",
          data: { "content": content , "title":title, "version":version}
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
        $('#fork').show();
        $('.lined').attr('contenteditable', true);
        // $('.lines').show();
        $('#linenumber').show();
        $('#lineinput').show();
        $('.lined').focus();
        fillLines();
    });

    $('#fork').click(function(){
        var i;
        var lineNo = $('#lineinput').val()
        var result = '', rest = '';
        if(lineNo){
            lineNo = parseInt(lineNo);
            var tocheck = 146.59375 + 24*(lineNo-1) + 12;


            var content = $('.lined').html();
            content = content.replace(/<b>/g,'&lt;b&gt;');
            content = content.replace(/<\/b>/g,'&lt;/b&gt;');

            var content_arr = content.split(' ');
            for(i =0; i< content_arr.length;i++){
                content_arr[i] = '<span>' + content_arr[i] + '</span>';
            }
            $('.lined').html(content_arr.join(' '));

            //loop through, once it is bigger, take all that is before it.
            var words = $('.lined span');
            var havebr = -1;
            words.each(function(){
                if($(this).offset().top < tocheck){
                    result += $(this).html() + ' ';
                    havebr = $(this).html().indexOf('<br>');
                }else{
                    rest += $(this).html() + ' ';
                }
            });
            if(havebr!=-1){
                result = result.substring(0, result.lastIndexOf("<br>"));
            }
        }else{
            lineNo = maxline; 
            result = $('.lined').html();    
        }
        var regex = /<br\s*[\/]?>/gi;
        result = result.replace(regex, "\n");
        // result = result.replace(/>/g,'&gt;');
        // result = result.replace(/</g,'&lt;');
        rest = rest.replace(regex, "\n");
        rest = rest.replace(/>/g,'&gt;');
        rest = rest.replace(/</g,'&lt;');
        var version = $('#version').html();
        var title = $('#title').html();
            $.ajax({
            type:"POST",
            url:"http://boardable.azurewebsites.net/fork",
            data: {content:result, title:title, fork:1, version:version, line:lineNo}
        })
        .done(function(msg){
            console.log('it finished posting!' + msg);
            if(msg){
                window.location.href = '/book/' + title +'/' + msg;
            }else{
                alert('did not work');
            }
        });
    });

    $(window).scroll(function(){
        var scrolled = Math.floor($(document).scrollTop()/1500);
        if(scrolled!=imageindex){
            imageindex=scrolled;
            $('#background').css('opacity', 0);
            setTimeout(function(){
                $('#background').attr('src', images[imageindex%3]);
                $('#background').css('opacity', 1);
            },800);
        }
    });

    $('#edit').click();

});