//
$(function () {
    ///fast click
    FastClick.attach(document.body);

    function render() {
           //clear btn&ing inner element
           $('.carousel-indicators').empty();
           $('.carousel-inner').empty();

        //get window width
        var isMobile = $(window).width() < 767;

        var olHtml = '';
        var imgHtml = '';
        var carouselImg = [
            {
                pc: 'url("img/wjsCarousel_a.jpg")',
                sm: 'img/wjsCarousel_aa.jpg'
            },
            {
                pc: 'url("img/wjsCarousel_b.jpg")',
                sm: 'img/wjsCarousel_bb.jpg'
            },
            {
                pc: 'url("img/wjsCarousel_c.jpg")',
                sm: 'img/wjsCarousel_cc.jpg'
            },
            {
                pc: 'url("img/wjsCarousel_d.jpg")',
                sm: 'img/wjsCarousel_dd.jpg'
            },
        ]

        //動態render btn
        $.each(carouselImg,function (k,v) {

            olHtml += ' <li data-target="#carousel-example-generic1" data-slide-to="'+k+'" '+(k===0 ? 'class="active"' : '')+'></li>\n'
        })
        $(olHtml).appendTo('.banner .carousel-indicators');

        //動態render img
        $.each(carouselImg,function (k,y) {
            imgHtml += ' <div class="item '+(k===0 ? 'active' : '')+'">' ;

            if(isMobile){
                imgHtml += ' <img src="'+carouselImg[k].sm+'" class="visible-xs-block">';
            }else{
                imgHtml += ' <div  class="pcCarouselImg'+(k+1)+' hidden-xs" ></div>';

            }
            imgHtml += '</div>'
        })
        $(imgHtml).appendTo('.banner .carousel-inner');
        imgHtml = '';


       //add pc img css
        if($('.pcCarouselImg4')){
            var imgCN = ''
            $.each(carouselImg,function (k,y) {
                imgCN = '.pcCarouselImg'+(k+1);
                $(imgCN).css('background-image', carouselImg[k].pc);
                // console.log(carouselImg[k].pc);
                // console.log($(imgCN));
            });

        }























    }
    $(window).on('resize',function () {
        render()
    }).trigger('resize');



    //slide hammer.js
    const navbar = document.querySelector('.carousel');
    const hammertime = new Hammer(navbar);
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on('panleft', function(ev) {
       $('.carousel').carousel('next');
    });
    hammertime.on('panright', function(ev) {
        $('.carousel').carousel('prev');
    });


    ////////
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })


//head fix style phone/pc

        if($(window).width() > 767){
            //pc

            $('.wjs_nav').attr({
                'data-spy':'affix',
                'data-offset-top':'400'
            })
        }
        // else{
        //     //phone
        //
        //     $('.wjs_nav').attr({
        //         'data-spy':'affix',
        //         'data-offset-top':'0'
        //     })
        //     $('.banner').css('top','80px');
        // }


    // 由于变成fixed脱离文档流 所以下面的元素的突然上去 妙なこと起きちゃた
　　// じゃ最初　pc/phone場合　そのしたの次な元素のtopを設定する





    //iscroll

    //father div width = sum li width
    var $li = $('.iscroll ul li');
    console.log($li);
    var iscroll_w = 0;
    $.each($li,function (k,v) {

        iscroll_w += $(v).outerWidth(true) ;
    })
    iscroll_w += 30;  //外框的oadding
    console.log(iscroll_w);

    $('.iscroll ul').css('width',iscroll_w+'px');

    var myscroll = new IScroll('.iscroll',{
        scrollX:true,
        scrollY:false
    })























})