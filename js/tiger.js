/**
 * Created by tiger on 2016/12/20.
 */
window.onload=function(){
    console.log('亲，移动端体验更佳哦。支持左划右划...');
    var speed=50;
    var revolveBoxEl=document.getElementById("revolveBox");
    var revolveContentEl=document.getElementById("revolveContent");
    var revolveItem1=document.getElementById("revolveItem1");
    var revolveItem2=document.getElementById("revolveItem2");
    revolveItem2.innerHTML=revolveItem1.innerHTML;
    function Marquee(){
        if(revolveItem1.offsetWidth-revolveBoxEl.scrollLeft<=0)
            revolveBoxEl.scrollLeft-=revolveItem1.offsetWidth;
        else{
            revolveBoxEl.scrollLeft++;
        }
    }
    var deltaXpre=0;
    var MyTimer=setInterval(Marquee,speed);
    var touchEl = new Hammer(revolveContentEl);
    touchEl.on('swipe pan panstart panmove panend pancancel multipan press pressup pinch', function (ev) {
        if (ev.type == 'panstart'||ev.type == 'press') {
            deltaXpre=0;
            clearInterval(MyTimer);
        }
        if (ev.type == 'panmove' && Math.abs(ev.deltaY) < 30) {
            if(revolveItem1.offsetWidth-revolveBoxEl.scrollLeft<=0){
                revolveBoxEl.scrollLeft-=revolveItem1.offsetWidth;
            }
            if(revolveBoxEl.scrollLeft<=0){
                revolveBoxEl.scrollLeft=revolveItem1.offsetWidth;
            }
            revolveBoxEl.scrollLeft -= ev.deltaX-deltaXpre;
            deltaXpre=ev.deltaX;
        }
        if(ev.type == 'panend'||ev.type == 'pressup'){
            MyTimer=setInterval(Marquee,speed);
        }
    });
}
