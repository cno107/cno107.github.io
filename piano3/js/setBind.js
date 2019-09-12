
//new music class
    let voiceStyle = $('input[type=radio]:checked').val();
    let music = new MusicBox('.leftHand','.rightHand',{
        type: voiceStyle,
        duration: 2,


    });

console.log(music);

//play music
// whren click btn , first pause pre-music and delay 500ms to start new-music;
// create a fun to get json data
    let getMusicData = (selector) =>{

        $.getJSON('./musicContext.json',(data)=>{

            //因为传进来的是和class值一样的value值 所以 前面得加'.'
            let musicName = $('.'+selector).val();

            music.pauseMusic(true);
            setTimeout(()=>{
                music.playMusic(data[musicName].melody,data[musicName].melodyL);      //加载旋律
                $('#speedControl').val(data[musicName].speed); //改speed进度条
                $('#speedValue').text(data[musicName].speed);  //改speed文本
                music.setPlaySpeed(data[musicName].speed);    //更改music speed
            },500);

        });
    };

//bind event for btn
    $('#song').on("click",'button',function () {
        //class === '.'+value
        getMusicData($(this).val());
    });




//change style
    $('input[type=radio]').click(function () {
        voiceStyle = $('input[type=radio]:checked').val();
        music.opts.type = voiceStyle;
    });

//pause music
    $('.stopBtn').click(()=>{

        music.pauseMusic(true);
    });


//speed control bar
    let speedControl = () => {
        let speed = $('#speedControl').val();

        $('#speedValue').text(speed);
        music.setPlaySpeed(speed);
       // console.log('現在スピード'+speed+'BPM');
    };
    $('#speedControl').on('input',speedControl);
//このinputはイベント処理のtypes




