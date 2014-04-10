$(document).ready(function(){

    var size = 64;
    var border = 2;
    function gomobile(){
        $('html').css('font-size','4.2em');
        $('.container').width('100%');
        $('body').width('100%');
        $('body').height('100%');
        $('.container').css('margin-top', '0px');
        $('.container').css('border', '0px');
        $('.container').height('100%');
        $('#top').height('200');
        $('img').height('210');
        $('img').width('210');
        $('p').css('margin', '22px 0');
        $('button').css('padding', '10px 27px');
        $('button').css('margin-top', '20px');
        $('input').css('padding', '15px');
        $('img').css('margin-left', '60px');
        size = 210;
        border = 4;
        $('#max').val('7');
    }

    if(/Android|iPhone|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent) ) {
        gomobile();
    }

    $('img').click(function(){
        if($(this).css('border-left-width')[0] == '0'){
            $(this).css('border', border + 'px solid midnightblue');    
            $(this).height(size-2*border);  
            $(this).width(size-2*border);
        }else{
            $(this).css('border','0px solid');      
            $(this).height(size);   
            $(this).width(size);
        }
    });

    $('.inputnum').focusout(function(){
        var number = $(this).val();
        if(!number || number ="0"){
            return;
        };
        var number = parseInt(number)
        if(!number){
            alert('please input a number');
            $(this).val('');
            $(this).focus();
        };
    })

    function getKSLfeed(category, subcategory, minPrice, maxPrice, search){
        rss = 'http://www.ksl.com/resources/classifieds/rss_.xml?nid=231'
        if(category)
            rss += '&category=' + category;
        if(subcategory)
            rss += '&cat=' + subcategory;
        rss += '&min_price=' + minPrice;
        rss += '&max_price=' + maxPrice;
        rss += '&search=' + encodeURIComponent(search);
        rss += '&viewNumResults=2'
        return rss;
    }

	alert('hell wold');


    // $('#find').click(function(){
    //     $('#middle').hide();
    //     var gif = $('<img>').attr('src', 'images/ajax.gif');
    //     var para = $('<p>').html('loading..');
    //     var loading = $('<div>').html(gif)
    //     loading.append(para);
    //     loading.attr('id','loading');
    //     $('.container').append(loading);
    //     var search = $('#search').val();
    //     var min = $('#min').val();
    //     var max = $('#max').val();
    //     var phone = $('#num').val();
    //     var maincat = $('#main').find(":selected").attr('id');
    //     var subcat = $('#sub').find(":selected").attr('id');
    //     var rss = getKSLfeed(maincat,subcat,min,max,search);
    //     console.log(rss);
    //     $.ajax({
    //         type:"POST",
    //         url:"http://quickpick.herokuapp.com/subscribers",
    //         data: {phone:phone, url:rss}
    //     }).always(function(){
    //         gif.hide();
    //         para.html('Done.<br><br>You should be hearing from us shortly :)')
    //         var back = $('<button>').html('back');
    //         back.click(function(){
    //             window.location.href = '/quickpick'
    //         });
    //         loading.append(back);
    //     })
    //     // .success(function(msg){
    //     //  alert('it worked' + msg);
    //     // }).error(function(){
    //     //  alert('did not work');
    //     // });
    //     // setTimeout(function(){
    //     //  gif.hide();
    //     //  para.html('Done.<br><br>You should be hearing from us shortly :)')
    //     //  var back = $('<button>').html('back');
    //     //  back.click(function(){
    //     //      $('#loading').hide();
    //     //      $('#middle').show();
    //     //  });
    //     //  loading.append(back);
    //     // }, 1000);
    // });

    // var categoryList = [{
    //     "name": "Announcements",
    //     "category": "1",
    //     "sub": [{
    //         "name": "Auctions",
    //         "subcategory": "7"
    //     }, {
    //         "name": "Bands Seeking Members",
    //         "subcategory": "519"
    //     }, {
    //         "name": "Boutiques",
    //         "subcategory": "532"
    //     }, {
    //         "name": "Charity",
    //         "subcategory": "2"
    //     }, {
    //         "name": "Garage, Estate, & Yard Sales",
    //         "subcategory": "6"
    //     }, {
    //         "name": "Grand Openings",
    //         "subcategory": "5"
    //     }, {
    //         "name": "Legal Notices",
    //         "subcategory": "8"
    //     }, {
    //         "name": "Lost & Found",
    //         "subcategory": "10"
    //     }, {
    //         "name": "Pageants/Talent Shows/Auditions",
    //         "subcategory": "4"
    //     }, {
    //         "name": "Performances & Gigs",
    //         "subcategory": "3"
    //     }, {
    //         "name": "Reunions",
    //         "subcategory": "9"
    //     }, {
    //         "name": "School Events",
    //         "subcategory": "12"
    //     }]
    // }, {
    //     "name": "Computers",
    //     "category": "16",
    //     "sub": [{
    //         "name": "Android Tablets and Accessories",
    //         "subcategory": "665"
    //     }, {
    //         "name": "Apple Hardware and Accessories ",
    //         "subcategory": "555"
    //     }, {
    //         "name": "Apple Laptops/Desktops",
    //         "subcategory": "554"
    //     }, {
    //         "name": "Apple iPads and Accessories",
    //         "subcategory": "663"
    //     }, {
    //         "name": "Desktop Hardware and Accessories",
    //         "subcategory": "21"
    //     }, {
    //         "name": "Desktops",
    //         "subcategory": "216"
    //     }, {
    //         "name": "Laptop Hardware and Accessories ",
    //         "subcategory": "467"
    //     }, {
    //         "name": "Laptops",
    //         "subcategory": "215"
    //     }, {
    //         "name": "Monitors",
    //         "subcategory": "466"
    //     }, {
    //         "name": "Palm/PDA",
    //         "subcategory": "217"
    //     }, {
    //         "name": "Printers",
    //         "subcategory": "497"
    //     }, {
    //         "name": "Software",
    //         "subcategory": "22"
    //     }]
    // }, {
    //     "name": "Furniture",
    //     "category": "40",
    //     "sub": [{
    //         "name": "Beanbags",
    //         "subcategory": "521"
    //     }, {
    //         "name": "Bedroom Sets",
    //         "subcategory": "534"
    //     }, {
    //         "name": "Beds, Bed Frames ",
    //         "subcategory": "456"
    //     }, {
    //         "name": "Beds, Bedding",
    //         "subcategory": "455"
    //     }, {
    //         "name": "Beds, Bunk Beds",
    //         "subcategory": "666"
    //     }, {
    //         "name": "Beds, Mattresses and Box Springs",
    //         "subcategory": "44"
    //     }, {
    //         "name": "Buffets, Hutches and Curios",
    //         "subcategory": "362"
    //     }, {
    //         "name": "Chairs",
    //         "subcategory": "364"
    //     }, {
    //         "name": "Children's Furniture",
    //         "subcategory": "557"
    //     }, {
    //         "name": "Coffee Tables and End Tables",
    //         "subcategory": "368"
    //     }, {
    //         "name": "Couches and Loveseats, Fabric",
    //         "subcategory": "43"
    //     }, {
    //         "name": "Couches and Loveseats, Leather/Vinyl",
    //         "subcategory": "529"
    //     }, {
    //         "name": "Desks",
    //         "subcategory": "361"
    //     }, {
    //         "name": "Dining Tables",
    //         "subcategory": "365"
    //     }, {
    //         "name": "Dressers",
    //         "subcategory": "406"
    //     }, {
    //         "name": "Entertainment Centers",
    //         "subcategory": "367"
    //     }, {
    //         "name": "Futons",
    //         "subcategory": "457"
    //     }, {
    //         "name": "Home Decor",
    //         "subcategory": "508"
    //     }, {
    //         "name": "Kitchen Cabinets",
    //         "subcategory": "445"
    //     }, {
    //         "name": "Kitchenware",
    //         "subcategory": "87"
    //     }, {
    //         "name": "Lamps",
    //         "subcategory": "370"
    //     }, {
    //         "name": "Nightstands",
    //         "subcategory": "369"
    //     }, {
    //         "name": "Office Furniture",
    //         "subcategory": "45"
    //     }, {
    //         "name": "Other Furniture and Furnishings",
    //         "subcategory": "41"
    //     }, {
    //         "name": "Paintings & Artwork",
    //         "subcategory": "77"
    //     }, {
    //         "name": "Patio Furniture and Grills",
    //         "subcategory": "238"
    //     }, {
    //         "name": "Pianos and Organs",
    //         "subcategory": "235"
    //     }, {
    //         "name": "Pool and Gaming Tables",
    //         "subcategory": "224"
    //     }, {
    //         "name": "Recliners and Rocking Chairs",
    //         "subcategory": "363"
    //     }, {
    //         "name": "Rugs",
    //         "subcategory": "366"
    //     }, {
    //         "name": "Seasonal\\Holiday Decorations",
    //         "subcategory": "441"
    //     }, {
    //         "name": "Sectionals",
    //         "subcategory": "520"
    //     }, {
    //         "name": "Shelving ",
    //         "subcategory": "458"
    //     }, {
    //         "name": "TV Stands",
    //         "subcategory": "675"
    //     }]
    // }, {
    //     "name": "Home and Garden",
    //     "category": "51",
    //     "sub": [{
    //         "name": "Electrical",
    //         "subcategory": "635"
    //     }, {
    //         "name": "Other",
    //         "subcategory": "637"
    //     }, {
    //         "name": "Bathroom",
    //         "subcategory": "638"
    //     }, {
    //         "name": "Curtains/Blinds/Shutters",
    //         "subcategory": "629"
    //     }, {
    //         "name": "Decking and Railing",
    //         "subcategory": "631"
    //     }, {
    //         "name": "Farmers Markets & Fresh Produce",
    //         "subcategory": "62"
    //     }, {
    //         "name": "Fertilizer",
    //         "subcategory": "59"
    //     }, {
    //         "name": "Firewood",
    //         "subcategory": "60"
    //     }, {
    //         "name": "Flooring",
    //         "subcategory": "630"
    //     }, {
    //         "name": "Food Storage",
    //         "subcategory": "61"
    //     }, {
    //         "name": "Heating and Cooling",
    //         "subcategory": "223"
    //     }, {
    //         "name": "Hot Tubs, Spas and Pools",
    //         "subcategory": "48"
    //     }, {
    //         "name": "Kitchen",
    //         "subcategory": "639"
    //     }, {
    //         "name": "Landscape and Yard Decorations",
    //         "subcategory": "220"
    //     }, {
    //         "name": "Lawn Mowers",
    //         "subcategory": "438"
    //     }, {
    //         "name": "Light and Electrical Fixtures",
    //         "subcategory": "218"
    //     }, {
    //         "name": "Lumber",
    //         "subcategory": "636"
    //     }, {
    //         "name": "Other Food Products",
    //         "subcategory": "53"
    //     }, {
    //         "name": "Other Garden/Lawn/Yard Equipment",
    //         "subcategory": "54"
    //     }, {
    //         "name": "Paints/Primers/Stains/Sealers",
    //         "subcategory": "661"
    //     }, {
    //         "name": "Plants: Flowers And Trees",
    //         "subcategory": "57"
    //     }, {
    //         "name": "Plumbing Fixtures",
    //         "subcategory": "219"
    //     }, {
    //         "name": "Seeds & Bulbs",
    //         "subcategory": "55"
    //     }, {
    //         "name": "Snow Blowers",
    //         "subcategory": "439"
    //     }, {
    //         "name": "Soil",
    //         "subcategory": "58"
    //     }]
    // }, {
    //     "name": "General",
    //     "category": "63",
    //     "sub": [{
    //         "name": "Antiques",
    //         "subcategory": "71"
    //     }, {
    //         "name": "Arts & Crafts",
    //         "subcategory": "74"
    //     }, {
    //         "name": "Beauty & Nutritional Products",
    //         "subcategory": "66"
    //     }, {
    //         "name": "Business: Established Business For Sale",
    //         "subcategory": "670"
    //     }, {
    //         "name": "Business: For Sale",
    //         "subcategory": "669"
    //     }, {
    //         "name": "Business: Franchises",
    //         "subcategory": "668"
    //     }, {
    //         "name": "Ceramics/Porcelain/Glass/Pottery",
    //         "subcategory": "85"
    //     }, {
    //         "name": "Coins & Stamps",
    //         "subcategory": "79"
    //     }, {
    //         "name": "Collectibles",
    //         "subcategory": "552"
    //     }, {
    //         "name": "Coupon Books",
    //         "subcategory": "93"
    //     }, {
    //         "name": "DJ Equipment",
    //         "subcategory": "627"
    //     }, {
    //         "name": "Handcrafted Goods ",
    //         "subcategory": "516"
    //     }, {
    //         "name": "Junk For Sale",
    //         "subcategory": "89"
    //     }, {
    //         "name": "Medical Equipment",
    //         "subcategory": "92"
    //     }, {
    //         "name": "Musical Instruments / Keyboards",
    //         "subcategory": "545"
    //     }, {
    //         "name": "Musical Instruments /Audio Equipment",
    //         "subcategory": "507"
    //     }, {
    //         "name": "Musical Instruments /Brass",
    //         "subcategory": "499"
    //     }, {
    //         "name": "Musical Instruments /Guitars",
    //         "subcategory": "64"
    //     }, {
    //         "name": "Musical Instruments /Percussion",
    //         "subcategory": "502"
    //     }, {
    //         "name": "Musical Instruments /Strings",
    //         "subcategory": "500"
    //     }, {
    //         "name": "Musical Instruments /Woodwinds",
    //         "subcategory": "501"
    //     }, {
    //         "name": "Office Supplies",
    //         "subcategory": "628"
    //     }, {
    //         "name": "Online Gift Stores & Catalogs",
    //         "subcategory": "65"
    //     }, {
    //         "name": "Religious Materials",
    //         "subcategory": "76"
    //     }, {
    //         "name": "RideShare",
    //         "subcategory": "667"
    //     }, {
    //         "name": "Scrapbooking",
    //         "subcategory": "515"
    //     }, {
    //         "name": "Tickets: Entertainment",
    //         "subcategory": "82"
    //     }, {
    //         "name": "Tickets: Sports",
    //         "subcategory": "84"
    //     }, {
    //         "name": "Tickets: Travel",
    //         "subcategory": "88"
    //     }, {
    //         "name": "Trading Cards And Autographs",
    //         "subcategory": "69"
    //     }]
    // }, {
    //     "name": "Industrial",
    //     "category": "94",
    //     "sub": [{
    //         "name": "Farm Equipment",
    //         "subcategory": "98"
    //     }, {
    //         "name": "Heavy Equipment/Tractors",
    //         "subcategory": "99"
    //     }, {
    //         "name": "Ladders",
    //         "subcategory": "640"
    //     }, {
    //         "name": "Machinery",
    //         "subcategory": "96"
    //     }, {
    //         "name": "Other Industrial/Construction Equipment",
    //         "subcategory": "97"
    //     }, {
    //         "name": "Power and Hand Tools",
    //         "subcategory": "95"
    //     }, {
    //         "name": "Scissor Lifts",
    //         "subcategory": "641"
    //     }, {
    //         "name": "Shop Tools",
    //         "subcategory": "226"
    //     }, {
    //         "name": "Tool Storage",
    //         "subcategory": "642"
    //     }]
    // }, {
    //     "name": "Auto Parts and Accessories",
    //     "category": "100",
    //     "sub": [{
    //         "name": "Auto Accessories",
    //         "subcategory": "556"
    //     }, {
    //         "name": "Car Audio and Video",
    //         "subcategory": "20"
    //     }, {
    //         "name": "Engine Part",
    //         "subcategory": "593"
    //     }, {
    //         "name": "Exhaust",
    //         "subcategory": "597"
    //     }, {
    //         "name": "Non-Running Cars",
    //         "subcategory": "656"
    //     }, {
    //         "name": "Other Parts",
    //         "subcategory": "598"
    //     }, {
    //         "name": "Powertrain /Transmission",
    //         "subcategory": "594"
    //     }, {
    //         "name": "Race Car Parts",
    //         "subcategory": "678"
    //     }, {
    //         "name": "Rock Crawler Parts",
    //         "subcategory": "677"
    //     }, {
    //         "name": "Steering & Suspension",
    //         "subcategory": "595"
    //     }, {
    //         "name": "Truck Shells",
    //         "subcategory": "102"
    //     }, {
    //         "name": "Utility Trailers",
    //         "subcategory": "101"
    //     }, {
    //         "name": "Wheels and Tires - Cars",
    //         "subcategory": "600"
    //     }, {
    //         "name": "Wheels and Tires - SUV/Trucks",
    //         "subcategory": "599"
    //     }]
    // }, {
    //     "name": "Pets and Livestock",
    //     "category": "104",
    //     "sub": [{
    //         "name": "Animal Shelters and Rescues",
    //         "subcategory": "274"
    //     }, {
    //         "name": "Birds",
    //         "subcategory": "109"
    //     }, {
    //         "name": "Cats",
    //         "subcategory": "112"
    //     }, {
    //         "name": "Dogs",
    //         "subcategory": "105"
    //     }, {
    //         "name": "Dogs, Stock",
    //         "subcategory": "648"
    //     }, {
    //         "name": "Dogs, Studs/Breeding",
    //         "subcategory": "447"
    //     }, {
    //         "name": "Ferrets",
    //         "subcategory": "374"
    //     }, {
    //         "name": "Fish",
    //         "subcategory": "371"
    //     }, {
    //         "name": "Goats",
    //         "subcategory": "489"
    //     }, {
    //         "name": "Horses",
    //         "subcategory": "106"
    //     }, {
    //         "name": "Horses, Saddles and Tack",
    //         "subcategory": "449"
    //     }, {
    //         "name": "Horses, Studs/Breeding",
    //         "subcategory": "448"
    //     }, {
    //         "name": "Horses/Livestock, Hay and Bedding",
    //         "subcategory": "452"
    //     }, {
    //         "name": "Horses/Livestock, Trailers",
    //         "subcategory": "450"
    //     }, {
    //         "name": "Livestock",
    //         "subcategory": "107"
    //     }, {
    //         "name": "Livestock Equipment and Supply",
    //         "subcategory": "649"
    //     }, {
    //         "name": "Lost and Found Pets",
    //         "subcategory": "465"
    //     }, {
    //         "name": "Other Pets",
    //         "subcategory": "114"
    //     }, {
    //         "name": "Pet Equipment and Supplies",
    //         "subcategory": "108"
    //     }, {
    //         "name": "Poultry and Gamebirds",
    //         "subcategory": "113"
    //     }, {
    //         "name": "Rabbits",
    //         "subcategory": "111"
    //     }, {
    //         "name": "Reptiles",
    //         "subcategory": "110"
    //     }]
    // }, {
    //     "name": "Recreational Vehicles",
    //     "category": "142",
    //     "sub": [{
    //         "name": " ATV Parts",
    //         "subcategory": "462"
    //     }, {
    //         "name": " ATVs New (3-4 Wheelers)",
    //         "subcategory": "470"
    //     }, {
    //         "name": "ATVs Used (3-4 Wheelers)",
    //         "subcategory": "145"
    //     }, {
    //         "name": "Airplanes",
    //         "subcategory": "151"
    //     }, {
    //         "name": "Boat Accessories/Toys",
    //         "subcategory": "546"
    //     }, {
    //         "name": "Boat Parts",
    //         "subcategory": "537"
    //     }, {
    //         "name": "Boat Timeshare",
    //         "subcategory": "549"
    //     }, {
    //         "name": "Boats W/Motor",
    //         "subcategory": "147"
    //     }, {
    //         "name": "Dune Buggies",
    //         "subcategory": "651"
    //     }, {
    //         "name": "Enduro",
    //         "subcategory": "650"
    //     }, {
    //         "name": "Generators",
    //         "subcategory": "231"
    //     }, {
    //         "name": "Go Carts",
    //         "subcategory": "652"
    //     }, {
    //         "name": "Golf Carts",
    //         "subcategory": "544"
    //     }, {
    //         "name": "Hitches",
    //         "subcategory": "531"
    //     }, {
    //         "name": "Motor Scooters",
    //         "subcategory": "210"
    //     }, {
    //         "name": "Motorcycle Accessories/Clothing",
    //         "subcategory": "247"
    //     }, {
    //         "name": "Motorcycles, Dirt Bike Parts",
    //         "subcategory": "463"
    //     }, {
    //         "name": "Motorcycles, Dirt Bikes New",
    //         "subcategory": "471"
    //     }, {
    //         "name": "Motorcycles, Dirt Bikes Used",
    //         "subcategory": "236"
    //     }, {
    //         "name": "Motorcycles, Road Bike Parts",
    //         "subcategory": "464"
    //     }, {
    //         "name": "Motorcycles, Road Bikes New",
    //         "subcategory": "469"
    //     }, {
    //         "name": "Motorcycles, Road Bikes Used",
    //         "subcategory": "144"
    //     }, {
    //         "name": "Motorhome and Travel Trailer Parts",
    //         "subcategory": "505"
    //     }, {
    //         "name": "Motorhomes",
    //         "subcategory": "143"
    //     }, {
    //         "name": "Personal Watercraft",
    //         "subcategory": "148"
    //     }, {
    //         "name": "Race Cars",
    //         "subcategory": "536"
    //     }, {
    //         "name": "Recreational Vehicle Rentals",
    //         "subcategory": "237"
    //     }, {
    //         "name": "Rock Crawlers",
    //         "subcategory": "402"
    //     }, {
    //         "name": "Snowmobile Parts",
    //         "subcategory": "472"
    //     }, {
    //         "name": "Snowmobiles New",
    //         "subcategory": "662"
    //     }, {
    //         "name": "Snowmobiles Used",
    //         "subcategory": "146"
    //     }, {
    //         "name": "Trailers: ATV/Boat/Snowmobile",
    //         "subcategory": "152"
    //     }, {
    //         "name": "Travel Trailers, 5th Wheel ",
    //         "subcategory": "434"
    //     }, {
    //         "name": "Travel Trailers, Bumper Pull",
    //         "subcategory": "149"
    //     }, {
    //         "name": "Travel Trailers, Tent Trailers",
    //         "subcategory": "209"
    //     }, {
    //         "name": "Travel Trailers, Toy Hauler ",
    //         "subcategory": "436"
    //     }, {
    //         "name": "Truck Campers",
    //         "subcategory": "150"
    //     }, {
    //         "name": "UTV Parts",
    //         "subcategory": "518"
    //     }, {
    //         "name": "UTVs (Utility Vehicles)",
    //         "subcategory": "461"
    //     }]
    // }, {
    //     "name": "Outdoors and Sporting",
    //     "category": "184",
    //     "sub": [{
    //         "name": "Activewear",
    //         "subcategory": "412"
    //     }, {
    //         "name": "Airsoft",
    //         "subcategory": "476"
    //     }, {
    //         "name": "Backpacks and Gear Bags",
    //         "subcategory": "410"
    //     }, {
    //         "name": "Bicycles Mountain Bike Parts",
    //         "subcategory": "645"
    //     }, {
    //         "name": "Bicycles Road Bike Parts",
    //         "subcategory": "646"
    //     }, {
    //         "name": "Bicycles: BMX",
    //         "subcategory": "408"
    //     }, {
    //         "name": "Bicycles: Childrens",
    //         "subcategory": "488"
    //     }, {
    //         "name": "Bicycles: Mountain Bikes",
    //         "subcategory": "191"
    //     }, {
    //         "name": "Bicycles: Road Bikes",
    //         "subcategory": "409"
    //     }, {
    //         "name": "Camping & Outdoors Equipment",
    //         "subcategory": "188"
    //     }, {
    //         "name": "Canoes, Kayaks, Row-Boats",
    //         "subcategory": "196"
    //     }, {
    //         "name": "Climbing Equipment",
    //         "subcategory": "446"
    //     }, {
    //         "name": "Freeweights and Home Gyms",
    //         "subcategory": "186"
    //     }, {
    //         "name": "GPS and Locators",
    //         "subcategory": "411"
    //     }, {
    //         "name": "Golf Equipment",
    //         "subcategory": "192"
    //     }, {
    //         "name": "Other Fitness Equipment",
    //         "subcategory": "416"
    //     }, {
    //         "name": "Other General Sporting Goods",
    //         "subcategory": "189"
    //     }, {
    //         "name": "Paintball Equipment",
    //         "subcategory": "213"
    //     }, {
    //         "name": "Paragliding/Powered Parachute",
    //         "subcategory": "647"
    //     }, {
    //         "name": "Sailing Sports",
    //         "subcategory": "197"
    //     }, {
    //         "name": "Scooters Skates & Skateboards",
    //         "subcategory": "190"
    //     }, {
    //         "name": "Ski Equipment: Cross Country",
    //         "subcategory": "657"
    //     }, {
    //         "name": "Ski Equipment: Downhill",
    //         "subcategory": "414"
    //     }, {
    //         "name": "Ski, Bike and Cargo Racks",
    //         "subcategory": "195"
    //     }, {
    //         "name": "Snowboard Equipment",
    //         "subcategory": "193"
    //     }, {
    //         "name": "Sports Memorabilia",
    //         "subcategory": "75"
    //     }, {
    //         "name": "Treadmills and Exercise Bikes",
    //         "subcategory": "415"
    //     }, {
    //         "name": "Water Sports Equipment",
    //         "subcategory": "194"
    //     }, {
    //         "name": "Winter Sports Equipment",
    //         "subcategory": "187"
    //     }]
    // }, {
    //     "name": "For Trade or Barter",
    //     "category": "252",
    //     "sub": [{
    //         "name": "Appliances",
    //         "subcategory": "419"
    //     }, {
    //         "name": "Auto Parts and Accessories",
    //         "subcategory": "263"
    //     }, {
    //         "name": "Baby Items",
    //         "subcategory": "420"
    //     }, {
    //         "name": "Books and Media",
    //         "subcategory": "423"
    //     }, {
    //         "name": "Clothing and Apparel",
    //         "subcategory": "421"
    //     }, {
    //         "name": "Computers",
    //         "subcategory": "418"
    //     }, {
    //         "name": "Furniture",
    //         "subcategory": "266"
    //     }, {
    //         "name": "General",
    //         "subcategory": "265"
    //     }, {
    //         "name": "Home and Garden",
    //         "subcategory": "270"
    //     }, {
    //         "name": "Industrial",
    //         "subcategory": "269"
    //     }, {
    //         "name": "Outdoors and Sporting",
    //         "subcategory": "267"
    //     }, {
    //         "name": "Pets and Livestock",
    //         "subcategory": "262"
    //     }, {
    //         "name": "Recreational Vehicles",
    //         "subcategory": "264"
    //     }, {
    //         "name": "Services",
    //         "subcategory": "547"
    //     }, {
    //         "name": "Toys",
    //         "subcategory": "422"
    //     }]
    // }, {
    //     "name": "Appliances",
    //     "category": "344",
    //     "sub": [{
    //         "name": "Dishwashers",
    //         "subcategory": "212"
    //     }, {
    //         "name": "Fireplaces/Wood Burning Stoves",
    //         "subcategory": "50"
    //     }, {
    //         "name": "Microwaves",
    //         "subcategory": "211"
    //     }, {
    //         "name": "Other Appliances",
    //         "subcategory": "42"
    //     }, {
    //         "name": "Refrigerators & Freezers",
    //         "subcategory": "49"
    //     }, {
    //         "name": "Restaurant Equipment",
    //         "subcategory": "592"
    //     }, {
    //         "name": "Sewing Machines",
    //         "subcategory": "341"
    //     }, {
    //         "name": "Stoves, Ranges and Ovens",
    //         "subcategory": "46"
    //     }, {
    //         "name": "Vacuums",
    //         "subcategory": "453"
    //     }, {
    //         "name": "Vending Machines",
    //         "subcategory": "234"
    //     }, {
    //         "name": "Washers and Dryers",
    //         "subcategory": "47"
    //     }]
    // }, {
    //     "name": "Electronics",
    //     "category": "345",
    //     "sub": [{
    //         "name": "Alarms and Security Systems",
    //         "subcategory": "612"
    //     }, {
    //         "name": "Camcorders & Accessories",
    //         "subcategory": "513"
    //     }, {
    //         "name": "Camera Accessories",
    //         "subcategory": "26"
    //     }, {
    //         "name": "Cameras DSLR & Accessories",
    //         "subcategory": "659"
    //     }, {
    //         "name": "Cameras Digital ",
    //         "subcategory": "511"
    //     }, {
    //         "name": "Cameras Film/Traditional",
    //         "subcategory": "512"
    //     }, {
    //         "name": "Cell Phones AT&T",
    //         "subcategory": "613"
    //     }, {
    //         "name": "Cell Phones Cricket",
    //         "subcategory": "617"
    //     }, {
    //         "name": "Cell Phones Other",
    //         "subcategory": "619"
    //     }, {
    //         "name": "Cell Phones Sprint",
    //         "subcategory": "616"
    //     }, {
    //         "name": "Cell Phones T-mobile",
    //         "subcategory": "614"
    //     }, {
    //         "name": "Cell Phones Unlocked",
    //         "subcategory": "618"
    //     }, {
    //         "name": "Cell Phones Verizon",
    //         "subcategory": "615"
    //     }, {
    //         "name": "Ham and CB Radio Equipment",
    //         "subcategory": "32"
    //     }, {
    //         "name": "Home Audio Other Equipment",
    //         "subcategory": "504"
    //     }, {
    //         "name": "Home Audio Players",
    //         "subcategory": "503"
    //     }, {
    //         "name": "Home Audio Receivers",
    //         "subcategory": "25"
    //     }, {
    //         "name": "Home Speakers",
    //         "subcategory": "494"
    //     }, {
    //         "name": "IPhone & Smartphone Accessories",
    //         "subcategory": "676"
    //     }, {
    //         "name": "IPod & Portable Audio/Video Devices",
    //         "subcategory": "222"
    //     }, {
    //         "name": "Landline Phones and Answering Machines",
    //         "subcategory": "485"
    //     }, {
    //         "name": "Nintendo DS/DSi Games and Equipment",
    //         "subcategory": "621"
    //     }, {
    //         "name": "Nintendo Games and Equipment",
    //         "subcategory": "478"
    //     }, {
    //         "name": "Other Electronics",
    //         "subcategory": "19"
    //     }, {
    //         "name": "Other Office Equipment",
    //         "subcategory": "29"
    //     }, {
    //         "name": "Other Video Games and Equipment",
    //         "subcategory": "24"
    //     }, {
    //         "name": "PSP Games and Equipment",
    //         "subcategory": "620"
    //     }, {
    //         "name": "Playstation Games and Equipment",
    //         "subcategory": "480"
    //     }, {
    //         "name": "SmartPhones/PDA Phones",
    //         "subcategory": "486"
    //     }, {
    //         "name": "Stereos and Boom Boxes",
    //         "subcategory": "495"
    //     }, {
    //         "name": "Televisions CRT",
    //         "subcategory": "27"
    //     }, {
    //         "name": "Televisions LCD",
    //         "subcategory": "482"
    //     }, {
    //         "name": "Televisions LED-LCD",
    //         "subcategory": "658"
    //     }, {
    //         "name": "Televisions Plasma",
    //         "subcategory": "481"
    //     }, {
    //         "name": "Televisions Projection DLP",
    //         "subcategory": "483"
    //     }, {
    //         "name": "Video Equipment (DVD, VCR, Satellite)",
    //         "subcategory": "221"
    //     }, {
    //         "name": "Video Projectors",
    //         "subcategory": "484"
    //     }, {
    //         "name": "Xbox Games and Equipment",
    //         "subcategory": "479"
    //     }]
    // }, {
    //     "name": "Clothing and Apparel",
    //     "category": "348",
    //     "sub": [{
    //         "name": "Boy's Clothing",
    //         "subcategory": "397"
    //     }, {
    //         "name": "Boy's Shoes",
    //         "subcategory": "606"
    //     }, {
    //         "name": "Costumes",
    //         "subcategory": "442"
    //     }, {
    //         "name": "Fabric and Sewing Materials",
    //         "subcategory": "602"
    //     }, {
    //         "name": "Formal Wear",
    //         "subcategory": "603"
    //     }, {
    //         "name": "Girl's Clothing",
    //         "subcategory": "398"
    //     }, {
    //         "name": "Girl's Shoes",
    //         "subcategory": "607"
    //     }, {
    //         "name": "Jewelry, Gems, & Watches",
    //         "subcategory": "70"
    //     }, {
    //         "name": "Luggage & Bags",
    //         "subcategory": "91"
    //     }, {
    //         "name": "Men's Clothing",
    //         "subcategory": "396"
    //     }, {
    //         "name": "Men's Shoes",
    //         "subcategory": "605"
    //     }, {
    //         "name": "Plus Size Men's Clothing",
    //         "subcategory": "610"
    //     }, {
    //         "name": "Plus Size Women's Clothing",
    //         "subcategory": "611"
    //     }, {
    //         "name": "Wedding Dresses and Decorations",
    //         "subcategory": "240"
    //     }, {
    //         "name": "Women's Clothing",
    //         "subcategory": "73"
    //     }, {
    //         "name": "Women's Shoes",
    //         "subcategory": "604"
    //     }, {
    //         "name": "Young Men's Clothing",
    //         "subcategory": "399"
    //     }, {
    //         "name": "Young Men's Shoes",
    //         "subcategory": "609"
    //     }, {
    //         "name": "Young Women's Clothing",
    //         "subcategory": "400"
    //     }, {
    //         "name": "Young Women's Shoes",
    //         "subcategory": "608"
    //     }]
    // }, {
    //     "name": "FREE",
    //     "category": "349",
    //     "sub": [{
    //         "name": "FREE (items only, no businesses)",
    //         "subcategory": "272"
    //     }, {
    //         "name": "FREE Pets",
    //         "subcategory": "626"
    //     }]
    // }, {
    //     "name": "Baby ",
    //     "category": "350",
    //     "sub": [{
    //         "name": "Baby Clothing",
    //         "subcategory": "72"
    //     }, {
    //         "name": "Backpacks and Carriers",
    //         "subcategory": "393"
    //     }, {
    //         "name": "Changing",
    //         "subcategory": "394"
    //     }, {
    //         "name": "Cribs and Playpens",
    //         "subcategory": "391"
    //     }, {
    //         "name": "Developmental Toys",
    //         "subcategory": "395"
    //     }, {
    //         "name": "Feeding",
    //         "subcategory": "392"
    //     }, {
    //         "name": "Maternity Clothing",
    //         "subcategory": "496"
    //     }, {
    //         "name": "Other Baby Items",
    //         "subcategory": "401"
    //     }, {
    //         "name": "Strollers",
    //         "subcategory": "390"
    //     }, {
    //         "name": "Swings, Seats & Chairs",
    //         "subcategory": "492"
    //     }]
    // }, {
    //     "name": "Toys",
    //     "category": "351",
    //     "sub": [{
    //         "name": "Action Figures",
    //         "subcategory": "385"
    //     }, {
    //         "name": "Board and Card Games",
    //         "subcategory": "388"
    //     }, {
    //         "name": "Dolls",
    //         "subcategory": "67"
    //     }, {
    //         "name": "Educational Toys",
    //         "subcategory": "387"
    //     }, {
    //         "name": "Other Toys",
    //         "subcategory": "78"
    //     }, {
    //         "name": "Play Furniture",
    //         "subcategory": "389"
    //     }, {
    //         "name": "Remote Control Vehicles Land/Water",
    //         "subcategory": "653"
    //     }, {
    //         "name": "Remote Controlled Vehicles Air",
    //         "subcategory": "654"
    //     }, {
    //         "name": "Stuffed Animals",
    //         "subcategory": "90"
    //     }, {
    //         "name": "Swings, Playhouses, Slides",
    //         "subcategory": "242"
    //     }]
    // }, {
    //     "name": "Books and Media",
    //     "category": "352",
    //     "sub": [{
    //         "name": "Blu-ray Discs",
    //         "subcategory": "671"
    //     }, {
    //         "name": "Books: Children",
    //         "subcategory": "601"
    //     }, {
    //         "name": "Books: Education and College",
    //         "subcategory": "384"
    //     }, {
    //         "name": "Books: Fiction",
    //         "subcategory": "80"
    //     }, {
    //         "name": "Books: Non-fiction",
    //         "subcategory": "383"
    //     }, {
    //         "name": "Books: Religious",
    //         "subcategory": "404"
    //     }, {
    //         "name": "Comic Books",
    //         "subcategory": "204"
    //     }, {
    //         "name": "DVDs",
    //         "subcategory": "86"
    //     }, {
    //         "name": "Magazines",
    //         "subcategory": "437"
    //     }, {
    //         "name": "Music: CDs, Records, & Tapes",
    //         "subcategory": "68"
    //     }, {
    //         "name": "Video Cassettes",
    //         "subcategory": "381"
    //     }]
    // }, {
    //     "name": "Hunting and Fishing",
    //     "category": "353",
    //     "sub": [{
    //         "name": "Archery Equipment",
    //         "subcategory": "214"
    //     }, {
    //         "name": "Fishing Tackle and Equipment",
    //         "subcategory": "233"
    //     }, {
    //         "name": "Gun Safes and Gun Racks",
    //         "subcategory": "473"
    //     }, {
    //         "name": "Holsters",
    //         "subcategory": "474"
    //     }, {
    //         "name": "Hunting Equipment",
    //         "subcategory": "225"
    //     }, {
    //         "name": "Knives",
    //         "subcategory": "444"
    //     }, {
    //         "name": "Reloading Supplies",
    //         "subcategory": "655"
    //     }, {
    //         "name": "Scopes and Optics",
    //         "subcategory": "405"
    //     }, {
    //         "name": "Skins and Taxidermy Mounts",
    //         "subcategory": "542"
    //     }]
    // }, {
    //     "name": "Other Real Estate",
    //     "category": "523",
    //     "sub": [{
    //         "name": "Burial Plots",
    //         "subcategory": "338"
    //     }, {
    //         "name": "Commercial Property for Sale or Rent",
    //         "subcategory": "432"
    //     }, {
    //         "name": "Furnished Apartments",
    //         "subcategory": "643"
    //     }, {
    //         "name": "Investment Properties",
    //         "subcategory": "433"
    //     }, {
    //         "name": "Land /Lots for Sale",
    //         "subcategory": "342"
    //     }, {
    //         "name": "Office Space",
    //         "subcategory": "280"
    //     }, {
    //         "name": "Recreational Property For Sale or Rent",
    //         "subcategory": "527"
    //     }, {
    //         "name": "Rooms For Rent",
    //         "subcategory": "281"
    //     }, {
    //         "name": "Seeking Roommate",
    //         "subcategory": "282"
    //     }, {
    //         "name": "Water Rights",
    //         "subcategory": "468"
    //     }]
    // }]

    // $('#subdiv').hide();
    // var op = $("<option>").html('--any--');
    // $('#main').append(op);
    // for(var i=0;i<categoryList.length;i++){
    //     op = $("<option>").html(categoryList[i].name).attr('id', categoryList[i].category);
    //     $('#main').append(op);
    // }
    // $('#main').change(function(){
    //     $('#sub').empty();
    //     var chosen = $('#main option:selected').text();
    //     var index = 0;
    //     for(var i =0 ; i< categoryList.length;i++){
    //         if(categoryList[i].name == chosen){
    //             index = i;
    //         }
    //     }
    //     var subcat = $('<option>').html("--any--");
    //     $('#sub').append(subcat);
    //     for(var i=0; i < categoryList[index].sub.length;i++){
    //         subcat = $("<option>").html(categoryList[index].sub[i].name).attr('id', categoryList[index].sub[i].subcategory);
    //         $('#sub').append(subcat);
    //     }
    //     $('#subdiv').show();
    // });


});