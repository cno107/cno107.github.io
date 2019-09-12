
//encode btn
$('.encode').click(function () {
    let diyTextR =  $('.DIYmusicR').val();
    let diyTextL =  $('.DIYmusicL').val();
    let speed = $('#speedControl').val();
   // console.log(diyText);
    music.pauseMusic(true);
    setTimeout(()=>{
        music.playMusic(diyTextR,diyTextL);      //加载旋律
        $('#speedControl').val(speed); //改speed进度条
        $('#speedValue').text(speed);  //改speed文本
        music.setPlaySpeed(speed);    //更改music speed
    },500);

})
//clear btn
// $('.clear').click(function () {
//     $('#DIYmusic').val('');
// })


//sample btn
$('.sample').click(function () {
    $('.DIYmusicR').val('-C-C-G-G-A-A-G--F-F-E-E-D-D-C--G-G-F-F-E-E-D--G-G-F-F-E-E-D---C-C-G-G-A-A-G--F-F-E-E-D-D-C--');
    $('.DIYmusicL').val('-C-C-G-G-A-A-G--F-F-E-E-D-D-C--G-G-F-F-E-E-D--G-G-F-F-E-E-D---C-C-G-G-A-A-G--F-F-E-E-D-D-C--');

})

//L-R mode
let modeIndex =0
$('.mode').click(function () {
    modeIndex ++;
    if(modeIndex%2 === 1){
        $(this).text('L-Mode')
    }else{
        $(this).text('R-Mode')
    }
    $('textarea').toggle('normal');
})
