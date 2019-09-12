setTimeout(function () {
    alert('互換性(GPU処理)のせいで一部の機種のスライド操作(transform/animation/canvas)が大変遅くなるかもしれない');

},600);

;document.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

var lastIndex = {col:0,row:0};
var nowIndex ={col:1,row:1};
var isMove = false;  //移動中を判断

//创建一个新的hammer对象并且在初始化时指定要处理的dom元素
var hammertime = new Hammer(document.getElementById("wrapper"));
hammertime.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});


//初期化　img全部　隠す
$('.phb-1-1').siblings('.page').find('img').addClass('hide');


//core　event



    hammertime.on("panup", function () {
        if (isMove) {
            return;
        }
        // page index
        lastIndex.row = nowIndex.row;
        lastIndex.col = nowIndex.col;
        if (nowIndex.col < 5 && $('.cover').hasClass('hide')) {
            nowIndex.col = lastIndex.col + 1;
            nowIndex.row = 1;
            phbMovePage('up');
        }
    });
    hammertime.on("pandown", function () {
        if (isMove) {
            return;
        }
        // page index
        lastIndex.row = nowIndex.row;
        lastIndex.col = nowIndex.col;
        if (nowIndex.col > 1 && $('.cover').hasClass('hide')) {
            nowIndex.col = lastIndex.col - 1;
            nowIndex.row = 1;
            phbMovePage('down');
        }
    })
    hammertime.on("panleft", function () {
        if (isMove) {
            return;
        }
        // page index
        lastIndex.row = nowIndex.row;
        lastIndex.col = nowIndex.col;
        if (nowIndex.col !== 1 && nowIndex.col !== 5 && nowIndex.row < 2 && $('.cover').hasClass('hide')) {
            nowIndex.row = lastIndex.row + 1;
            phbMovePage('left');
        }
    })
    hammertime.on("panright", function () {
        if (isMove) {
            return;
        }
        // page index
        lastIndex.row = nowIndex.row;
        lastIndex.col = nowIndex.col;
        if (nowIndex.col !== 1 && nowIndex.col !== 5 && nowIndex.row > 1 && $('.cover').hasClass('hide')) {
            nowIndex.row = lastIndex.row - 1;
            phbMovePage('right');
        }
    })


//core function
function phbMovePage(dir){
    isMove = true;
    // define two entrance/exit animation class
    var phbIn = '';
    var phbOut = '';

    switch(dir){
        case 'up':
            phbIn = 'move-from-bottom';
            phbOut = 'move-to-top'
            ;break;
        case 'down':
            phbIn = 'move-from-top';
            phbOut = 'move-to-bottom'
            ;break;
        case 'left':
            phbIn = 'move-from-right';
            phbOut = 'move-to-left'
            ;break;
        case 'right':
            phbIn = 'move-from-left';
            phbOut = 'move-to-right'
            ;break;
    }

    var pOut = '.phb-'+lastIndex.col+'-'+lastIndex.row;
    var pIn = '.phb-'+nowIndex.col+'-'+nowIndex.row;

    $(pOut).addClass(phbOut);
    $(pIn).addClass(phbIn);
    $(pIn).removeClass('hide');
    //动画结束后 clear animation class
    setTimeout(function () {
        $(pOut).addClass('hide');
        $(pIn).removeClass(phbIn);
        $(pOut).removeClass(phbOut);
        $(pIn).find('img').removeClass('hide');
        $(pOut).find('img').addClass('hide');
        // $(pOut).find('img').removeClass('hide');
        isMove = false;
    },600)






}


//tap function
$('.tap').on('click',function () {
    console.log('ok');
    $('.cover').removeClass('hide');
    $('#wrapper').css('pointer-events','none');  //阻止底层滑动
    $('.close').css('pointer-events','auto');　　　// close 許可
    $('canvas').css('pointer-events','auto');

})

$('.close').on('click',function () {

    $('.cover').addClass('hide');
    $('#wrapper').css('pointer-events','auto');  //接触限制
})


//canvas bubble
//  var bbb = function bubble() {
//      var draw;
//      var getData
//      var canvas = document.querySelector('canvas');
//
//      canvas.width = $(window).width();
//      canvas.height = $(window).height();
//
//
//      if(canvas.getContext){
//          var ctx = canvas.getContext('2d');
//
//          var arr = [];
//          //将arr中的圆画到画布上
//          draw =  setInterval(function () {
//              // debugger
//              ctx.clearRect(0,0,canvas.width,canvas.height)
//              //提供动画
//              for(var i=0;i<arr.length;i++) {
//
//                  if(arr[i].alpha < 0) {
//                      arr.splice(i,1);
//                  }
//                  arr[i].r += 1 ;
//                  arr[i].alpha -= 0.02;
//              }
//
//              //将arr中的圆画到画布上
//              for(var i=0;i<arr.length;i++){
//
//
//                  ctx.save();
//                  ctx.fillStyle = 'rgba('+arr[i].red+','+arr[i].green+','+arr[i].blue+','+arr[i].alpha+')';
//                  ctx.beginPath();
//                  ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
//                  ctx.fill();
//                  ctx.restore();
//              }
//
//          },1000/60)
//
//
//          //inject random circles' information
//          getData =  setInterval(function () {
//              var x = Math.random()*canvas.width ;
//              var y = Math.random()*canvas.height;
//              var r = 9;
//              var red = Math.round(Math.random()*255);
//              var green = Math.round(Math.random()*255);
//              var blue = Math.round(Math.random()*255);
//
//              var alpha = 1;
//              arr.push({
//                  x : x,
//                  y : y,
//                  r : r,
//                  red:red,
//                  green:green,
//                  blue:blue,
//                  alpha:alpha
//              });
//
//          },50)
//
//
//
//      }
//
//  }


/////canvas start
star();
function star() {
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineWidth = .3;
    ctx.strokeStyle = (new Color(150)).style;
    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    };
    var dots = {
        nb: 750,     //点个数
        distance: 40,
        d_radius: 40,
        array: []
    };
    function colorValue(min) {
        return Math.floor(Math.random() * 255 + min);
    }
    function createColorStyle(r,g,b) {
        return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
    }
    function mixComponents(comp1, weight1, comp2, weight2) {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
    }
    function averageColorStyles(dot1, dot2) {
        var color1 = dot1.color,
            color2 = dot2.color;

        var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
            g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
            b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
        return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
    }

    function Color(min) {
        min = min || 0;
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
    }

    function Dot(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random() * 2;

        this.color = new Color();
    }

    Dot.prototype = {
        draw: function(){
            ctx.beginPath();
            ctx.fillStyle = this.color.style;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }
    };
    console.log(dots.nb);
    function createDots(){
        for(i = 0; i < dots.nb; i++){
            dots.array.push(new Dot());
        }
    }

    function moveDots() {
        for(i = 0; i < dots.nb; i++){

            var dot = dots.array[i];

            if(dot.y < 0 || dot.y > canvas.height){
                dot.vx = dot.vx;
                dot.vy = - dot.vy;
            }
            else if(dot.x < 0 || dot.x > canvas.width){
                dot.vx = - dot.vx;
                dot.vy = dot.vy;
            }
            dot.x += dot.vx;
            dot.y += dot.vy;
        }
    }

    function connectDots(){
        for(i = 0; i < dots.nb; i++){
            for(j = i; j < dots.nb; j++){
                i_dot = dots.array[i];
                j_dot = dots.array[j];

                if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
                    if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                        ctx.beginPath();
                        ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                        ctx.moveTo(i_dot.x, i_dot.y);
                        ctx.lineTo(j_dot.x, j_dot.y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }
    }

    function drawDots() {
        for(i = 0; i < dots.nb; i++){
            var dot = dots.array[i];
            dot.draw();
        }
    }

    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveDots();
        connectDots();
        drawDots();
        requestAnimationFrame(animateDots);
    }
    document.querySelector('canvas').addEventListener('touchstart',function(e){
        e.stopPropagation();
        e.preventDefault();

        console.log('ok');
        var touch = e.touches[0]
        mousePosition.x = touch.clientX;
        mousePosition.y = touch.clientY;
        return false;
    })

    document.querySelector('canvas').addEventListener('touchmove',function(e){
        e.stopPropagation();
        e.preventDefault();
        var touch = e.touches[0]
        mousePosition.x = touch.clientX;
        mousePosition.y = touch.clientY;
        return false;
    })

    document.querySelector('canvas').addEventListener('touchend',function(e){
        e.stopPropagation();
        e.preventDefault();
        return false;
    })

    createDots();
    requestAnimationFrame(animateDots);
}
