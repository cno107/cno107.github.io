 class MusicBox {
    constructor(selectorL,selectorR,options){
        // 默认值

        let defaults = {
            type: 'sine',  // 音色类型  sine|square|triangle|sawtooth
            duration: 2  // 键音延长时间
        };
        this.opts = options;

        // 创建新的音频上下文接口
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.arrFrequency = [


            131,147,165,175,196,220,247,
            262,294,330,349,392,440,494,
            523,587,659,698,784,880,988,
            1047,1175,1319,1397,1568,1760, 1967,
            2089,2288,2565,2716,3047,3417,3832,
            4100,4400,4700,5000,5300,5600,5900
                   ];
        this.arrMarks = [
            '!1','!2','!3','!4','!5','!6','!7',
            '@1', '@2', '@3', '@4', '@5', '@6', '@7',
            '#1', '#2', '#3', '#4', '#5', '#6', '#7',
            '1$','2$','3$','4$','5$','6$','7$',
            '1%','2%','3%','4%','5%','6%','7%',
            '1^','2^','3^','4^','5^','6^','7^',];
        this.arrNotes = ['r','t','y','u','i','o','p',
                         'c', 'd', 'e', 'f', 'g', 'a', 'b',
                         '1', '2', '3', '4', '5', '6', '7',
                         'C', 'D', 'E', 'F', 'G', 'A', 'B',
                         '一','二','三','四','五','六','七',
                          '壹','贰','叁','肆','伍','陆','柒'];
        this.keyNum = 28;
        this.draw();

        this.speed = 100;
        this.paused = false;

        this.exist = false; //set a global mark来判断当前是否已经有同样的音乐正在播放

    }

    createSound(freq) {
        // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
        let oscillator = this.audioCtx.createOscillator();
        // 创建一个GainNode,它可以控制音频的总音量
        let gainNode = this.audioCtx.createGain();
        // 把音量，音调和终节点进行关联
        oscillator.connect(gainNode);
        // this.audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
        gainNode.connect(this.audioCtx.destination);
        // 指定音调的类型  sine|square|triangle|sawtooth
        oscillator.type = this.opts.type;
        // 设置当前播放声音的频率，也就是最终播放声音的调调
        oscillator.frequency.value = freq;
        // 当前时间设置音量为0
        gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
        // 0.01秒后音量为1
        gainNode.gain.linearRampToValueAtTime(this.opts.volume, this.audioCtx.currentTime + 0.01);
        // 音调从当前时间开始播放
        oscillator.start(this.audioCtx.currentTime);
        // this.opts.duration秒内声音慢慢降低，是个不错的停止声音的方法
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + this.opts.duration);
        // this.opts.duration秒后完全停止声音

        oscillator.stop(this.audioCtx.currentTime + this.opts.duration);
    }

     draw(){
         let keyText = [
             '!1','!2','!3','!4','!5','!6','!7',
             '@1', '@2', '@3', '@4', '@5', '@6', '@7',
             '#1', '#2', '#3', '#4', '#5', '#6', '#7',
             '1$','2$','3$','4$','5$','6$','7$',
             '1%','2%','3%','4%','5%','6%','7%',
             '1^','2^','3^','4^','5^','6^','7^',];

         let keyL = document.querySelector('.leftHand'),
             liL = '';
         let keyR = document.querySelector('.rightHand'),
             liR = '';

         //  draw piano keys
         for(let i = 0; i < Math.ceil(this.keyNum/2); i++){
             liL += '<li><span></span><i class="iCss">'+ keyText[i] +'</i></li>'
         }
         keyL.innerHTML = '<ul class="clearfix">'+ liL +'</ul>';
         for(let i = Math.ceil(this.keyNum/2); i < this.keyNum; i++){
             liR += '<li><span></span><i class="iCss">'+ keyText[i]+'</i></li>'
         }
         keyR.innerHTML = '<ul class="clearfix">'+ liR +'</ul>';


         //为了在下面的函数里使用 本层的this 我们把this赋值 这样下的函数中可以直接使用
         let musicThis = this;
         $('.box').on('click','li',function () {
             let boxThis = $(this);
             let mark = $(this).children('i').text();
             //console.log(mark);
             musicThis.pressBtn(mark);
             boxThis.css('background-color','rgba(0,0,0,.1)');
             setTimeout(function () {
                 boxThis.css('background-color','white');
             },200);
         });

     }

    createMusic(mark){

        let index = this.arrMarks.indexOf(mark);
        // console.log(this.arrMarks.indexOf('2%'));
        if(index !== -1){  //mark的序号和frequency是对应的
            this.createSound(this.arrFrequency[index]);
        }
    }



    pressBtn(mark) {
        if(!this.opts.volume){
            this.opts.volume = 1;
        }
        //console.log(mark);
        this.createMusic(mark);
        //console.log(boxThis+'~'+mark);
            // let mark = $(this).children('i').text();
            // boxThis.css('background-color','rgba(0,0,0,.05)');
            // setTimeout(function () {
            //  boxThis.css('background-color','white');
            // },200);

    }


    playMusic(musicText,L) {

        if(!this.exist){
            this.exist = true; //进来据说明现在存在了
            this.pauseMusic(false);　//change play status

            let noteArr = musicText.split('');
            let noteArrL = L ? L.split('') : '' ;  //如果传进来left就用 没有就空
            let delayTime = 1000 * 60;
           // console.log(noteArr);
           // console.log(noteArrL);

            (async () => {

                try{
                    let i = 0;
                    while (!this.paused) {
                        this.opts.volume=3;  //right hand volume 每次在循环时设定
                        if(i >= noteArr.length){  // 停止或者循环
                             this.exist = false; //播放完了可以改回来了
                                break;

                        }
                        let n = this.arrNotes.indexOf(noteArr[i]);  // 钢琴键位置
                        if(n !== -1){  // 发出乐音
                            n = n - 7;
                            //console.log('右：'+n);
                            let mark = this.arrMarks[n];
                            this.pressBtn(mark);
                            let r = Math.round(Math.random()*255);
                            let g =  Math.round(Math.random()*255);
                            let b =  Math.round(Math.random()*255);
                            if(n < this.keyNum/2){
                              //  $('.leftHand li').eq(n).css('background-color','rgba(255,0,0,.1)');
                                $('.leftHand li').eq(n).css('background-color','rgba('+r+','+g+','+b+',.4)');
                                setTimeout(function () {
                                    $('.leftHand li').eq(n).css('background-color','white');
                                },200);

                            }else{
                                n = n - this.keyNum/2 ;
                             //   $('.rightHand li').eq(n).css('background-color','rgba(255,0,0,.1)');
                                $('.rightHand li').eq(n).css('background-color','rgba('+r+','+g+','+b+',.4)');
                                setTimeout(function () {
                                    $('.rightHand li').eq(n).css('background-color','white');
                                },200);

                            }
                           // await sleep(20);
                        }
                        else{
                            switch (noteArr[i]) {
                                case '0': console.log('0');break; // 休止符
                                case '-': await sleep(delayTime / (2 * this.speed)) ;//console.log('左-');
                                    break; // 八分音符时值
                                case '=': await sleep(delayTime / (4 * this.speed)) ;//console.log('左=');
                                    break; // 十六分音符时值
                                case '!': await sleep(delayTime / (8 * this.speed)) ;//console.log('左!');
                                    break; // 32分音符时
                                case '^': await sleep(delayTime / this.speed); //console.log('左^');
                                    break; // 四分音符时值
                                case '?': await sleep(delayTime /(3 * this.speed)); //console.log('左?');
                                    break; // 12分音符时值 用于三连音 把一个四分音符分成仨
                                case '*': await sleep(delayTime /(6 * this.speed));// console.log('左*');
                                    break; // 24分音符时值 用于三连音 把一个8分音符分成仨
                                //case '-':console.log('-');break;
                            }
                        }
                        i++;
                    }
                }
                catch (e) {
                    console.log('わからないw')
                }
            })();
            (async () => {

                try{
                    let l = 0;
                    while (!this.paused) {
                        this.opts.volume=3;  //left hand volume 每次在循环时设定
                        this.opts.duration = 3; //左手旋律 音比较长
                        if(l >= noteArrL.length){  // 停止或者循环
                            this.exist = true; //左手播放完之后 不用管 根据右手主旋律来判断
                                break;
                        }
                        let n = this.arrNotes.indexOf(noteArrL[l]);  // 钢琴键位置
                        if(n !== -1){  // 发出乐音
                            n=n-7;
                            let mark = this.arrMarks[n];
                            this.pressBtn(mark);
                                let r = Math.round(Math.random()*255);
                                let g =  Math.round(Math.random()*255);
                                let b =  Math.round(Math.random()*255);
                            if(n < this.keyNum/2){

                               // $('.leftHand li').eq(n).css('background-color','rgba(0,0,255,.1)');
                                $('.leftHand li').eq(n).css('background-color','rgba('+r+','+g+','+b+',.4)');
                                setTimeout(function () {
                                    $('.leftHand li').eq(n).css('background-color','white');
                                },200);

                            }else{
                                n = n - this.keyNum/2 ;
                              //  $('.rightHand li').eq(n).css('background-color','rgba(0,0,255,.1)');
                                $('.rightHand li').eq(n).css('background-color','rgba('+r+','+g+','+b+',.4)');
                                setTimeout(function () {
                                    $('.rightHand li').eq(n).css('background-color','white');
                                },200);

                            }
                           // await sleep(20);
                        }
                        else{
                            switch (noteArrL[l]) {
                                case '0': console.log('0');break; // 休止符
                                case '-': await sleep(delayTime / (2 * this.speed)) ;
                                    break; // 八分音符时值
                                case '=': await sleep(delayTime / (4 * this.speed)) ;
                                    break; // 十六分音符时值
                                case '!': await sleep(delayTime / (8 * this.speed)) ;
                                    break; // 32分音符时
                                case '^': await sleep(delayTime / this.speed);
                                    break; // 四分音符时值
                                case '?': await sleep(delayTime /(3 * this.speed));
                                    break; // 12分音符时值 用于三连音 把一个四分音符分成仨
                                case '*': await sleep(delayTime /(6 * this.speed));
                                    break; // 24分音符时值 用于三连音 把一个8分音符分成仨
                                //case '-':console.log('-');break;
                            }
                        }
                        l++;
                    }
                }
                catch (e) {
                    console.log('わからないw')
                }
            })();


        }
        else{
            console.log('current music is playing');
        }
　　　　　　
    }




    pauseMusic(boolean){
        this.paused = boolean;
        if(boolean){
            this.exist = false; //停止的话 把music存在状态改为false
        }
    }

    setPlaySpeed(speed) {
        this.speed = speed;
    }


}


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}



