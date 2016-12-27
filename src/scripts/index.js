// var DateUtil = require('./common/utils/dateUtil');
// var Lists = require('./modules/list');
// var Detail = require('./modules/detail');

// var inst = new Lists();
// console.log(inst.say('list say'));
// console.log(Detail('detail say'));

var $ = require('./common/libs/zepto-modules/zepto');
require('./common/libs/zepto-modules/event');
require('./common/libs/zepto-modules/ajax');
require('./common/libs/zepto-modules/touch');
var Swiper = require("./common/libs/swiper/swiper.min.js");
var donghua = require("./common/libs/swiper/swiper.animate1.0.2.min.js");
var IScroll = require("./common/libs/iscroll/iscroll.js");
// var IScroll = require("./common/libs/.js");

var swiper = new Swiper('.swiper-container', {
  onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
    donghua.swiperAnimateCache(swiper); //隐藏动画元素 
    donghua.swiperAnimate(swiper); //初始化完成开始动画
  },
  onSlideChangeEnd: function(swiper) {
    donghua.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  }
});
if (localStorage.getbendi) { //只有点击之后才会一直显示
  $(".swiper-container").hide();
  $('#main-container').show();

}
var myScroll;
$("#enter").tap(function() {


  localStorage.getbendi = true; //存入到local中
  $(".swiper-container").hide();
  $('#main-container').show();


  $.post('http://localhost:8000/skill', {
    param1: 'value1'
  }, function(data, textStatus, xhr) {
    console.log(data)
    var str = '';
    for (var i = 0; i < 1; i++) {

      str += '<h3>欢迎你收看</h3>';
    };
    $(".ulone").html(str);



    myScroll = new IScroll('#wrapper', {
      mouseWheel: true
    });
    document.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, false);
  });


})

// 开始
$("footer>div").not("#meone").tap(function() {

  var tar = $(this).attr("id");
  // alert(tar)
  $.post('http://localhost:8000/'+tar, {
    param1: 'value1'
  }, function(data, textStatus, xhr) {
    // console.log(data)
    // 
    var str = '';
    switch(tar){
        case "skill":
      for (var i = 0; i < data.length; i++) {

        str += '<li id="jineng"><div><img src="' + data[i].img + '"></div><ul class="ultwo"><li>类型: ' + data[i].category + '</li><li>名称: ' + data[i].name + '</li></ul></li>';
      };
       $(".ulone").html(str);
    
       
        break;
        case "project":    
        for (var i = 0; i < 1; i++) {

          str += '<li id="xiangmu"><div><img src="img/gongsi.jpg"></div><ul class="ultwo"><li>' + data[i].name + '</li><li>描述:' + data[i].description + '</li><img src="img/yijiao.jpg"><li>详情:' + data[i].detail + ',</li><li>技术:' + data[i].tech + '...</li></ul></li>';　
      };
      $(".ulone").html(str);
       break;

        case "work":
         for (var i = 0; i < 1; i++) {

          str += '<li id="jing"><div><img src="img/zaiqiwei.jpg" ></div><ul class="ultwo"><li><h1>' + data[i].name + '</h1></li><li>类型:' + data[i].category + '</li><li>时间:' + data[i].time + '</li><li>职位:' + data[i].zhiwei + '</li><li>工作时间:' + data[i].times + '</li><li>人数:' + data[i].peoples + '</li><img src="img/xiangmu1.jpg"><li class="xiang"><h1>项目:' + data[i].projects + '</h1></li><li>周期: ' + data[i].zhouqi + '</li><li>团队:' + data[i].tuandui + '</li><li>难点:' + data[i].nandian + '</li><li>方案:' + data[i].fangan + '</li></ul></li>';
      };
      $(".ulone").html(str);
       break;

    }
      myScroll = new IScroll('#wrapper', {
      mouseWheel: true
    });
    document.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, false);
    scrollTo(0, 0);
    myScroll.refresh();


  })
});

// $(".xiang").tap(function() {

//   var tar = $(this).attr("id");
//   // alert(1)
//   $.post('http://localhost:8000/project', {
//     param1: 'value1'
//   }, function(data, textStatus, xhr) {
//     console.log(data)
//     var str = '';
//     for (var i = 0; i < 1; i++) {

//       str += '<li id="xiangmu"><div><img src="img/11.jpg"></div><ul class="ultwo"><li>公司:' + data[i].name + '</li><li>描述:' + data[i].description + '</li><li>详情:' + data[i].detail + ',</li><li>技术:' + data[i].tech + '...</li></ul></li>';　
//     };
//     $(".ulone").html(str);
//     myScroll = new IScroll('#wrapper', {
//       mouseWheel: true
//     });
//     document.addEventListener('touchmove', function(e) {
//       e.preventDefault();
//     }, false);

//     // console.log(myScroll);
//     scrollTo(0, 0);
//     myScroll.refresh();

//   })
// });

// $(".jing").tap(function() {

//   var tar = $(this).attr("id");
//   // alert(1)
//   $.post('http://localhost:8000/work', {
//     param1: 'value1'
//   }, function(data, textStatus, xhr) {
//     console.log(data)
//     var str = '';
//     for (var i = 0; i < 1; i++) {

//       str += '<li id="jing"><div><img src="img/fendou.jpg" ></div><ul class="ultwo"><li><h1>' + data[i].name + '</h1></li><li>类型:' + data[i].category + '</li><li>时间:' + data[i].time + '</li><li>职位:' + data[i].zhiwei + '</li><li>工作时间:' + data[i].times + '</li><li>人数:' + data[i].peoples + '</li><li>项目:' + data[i].projects + '</li></ul></li>';
//     };
//     $(".ulone").html(str);
//     myScroll = new IScroll('#wrapper', {
//       mouseWheel: true
//     });
//     document.addEventListener('touchmove', function(e) {
//       e.preventDefault();
//     }, false);

//     // console.log(myScroll);
//     scrollTo(0, 0);
//     myScroll.refresh();

//   })
// });

$(".me").tap(function() {
  // alert(00)
  var str = '';

  str += "<div id='me'><h1>自我介绍</h1><p>姓名:&nbsp;&nbsp;&nbsp;吴义正</p><p>毕业院校:&nbsp;&nbsp;黄山学院</p><p>学历:  本科</p><p>爱好: 看书,广泛,珍惜时间</p><div><img src='img/shijian.jpg'></div><h2>格言</h2><p>青春不是年华，而是心境；青春不是桃面、丹唇、柔膝，而是深沉的意志、恢宏的想象、炽热的感情；青春是生命的深泉在涌流.</p><p>青春气贯长虹，勇锐盖过怯弱，进取压倒苟安。如此锐气，二十后生有之，六旬男子则更多见。年岁有加，并非垂老；理想丢弃，方堕暮年。岁月悠悠，衰微只及肌肤；热忱抛却，颓唐必至灵魂。忧烦、惶恐、丧失自信，定使心灵扭曲，意气如灰。</p><p>无论年届花甲，抑或二八芳龄，心中皆有生命之欢乐，奇迹之诱惑，孩童般天真久盛不衰。 人人心中皆有一台天线，只要你从天上人间接受美好、希望、欢乐、勇气和力量的信号，你无不青春永驻、风华长存。 </p><p>一旦天线降下，锐气便被冰雪覆盖，玩世不恭、自暴自弃油然而生，即便年方二十，实已垂垂老矣；然则只要竖起天线，捕捉乐观信号，你就有望在八十高龄告别尘寰时仍觉年轻</p></div>";

  $(".ulone").html(str);
  myScroll = new IScroll('#wrapper', {
    mouseWheel: true
  });
  document.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, false);

  // console.log(myScroll);
  scrollTo(0, 0);
  myScroll.refresh();

})


$(".img1").tap(function() {
  alert('吴义正的二维码');
  return false;
})
$(".img2").tap(function() {
  $("#file").click();
  return false;
})

var audio = document.getElementById('mp3Btn');

$('.audio').click(function() {
  //防止冒泡


  if (audio.paused) //如果当前是暂停状态

  {
    // $('.audio_div').css("background","url(播放状态按钮) no-repeat center bottom");
    // $('.audio_div').css("background-size","cover");
    audio.play(); //播放
    return;
  }

  //当前是播放状态

  // $('.audio_div').css("background","url(暂停状态按钮) no-repeat center bottom");
  // $('.audio_div').css("background-size","cover");
  audio.pause();
  // alert(123)
  event.stopPropagation();

});