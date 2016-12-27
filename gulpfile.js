//第一部分
var gulp = require('gulp');
// webserver服务器模块
//mock数据操作,需要引入url及fs，但是url/fs是内置的，所以不需要安装

var webserver = require('gulp-webserver');
gulp.task('copy-index',function(){
      return gulp.src('./src/index.html')
      .pipe(gulp.dest('./www'));
});


//注意:1 gulp全局环境 2gulp的文件夹内的环境3.服务器访问的根目录
//4.直接localhst未发现  域名--服务器(本地主机)---server环境中设置根目录
//创建本地服务器任务
// 第二部分
  var url = require('url');
var fs = require('fs'); // fs -> filesystem    
gulp.task('webserver', function() {
  gulp.src('./www').pipe(webserver({  //设置了服务器的根目录  
      livereload: true,//只有这句话才能实现html页面自动自动页面帅新 没有还是会监控的但不会自动刷新
      open:true,
      // directoryListing:true  //目录清单
      // port:8080
      
      middleware:function(req,res,next){
        //获取浏览器中的url，将url进行解析操作
        var urlObj = url.parse(req.url,true),
        method = req.method;

        //如果url里输出了/skill.php,/project.php或者是/work，
        //那么我们就可以查找到urlObj.pathname为/skill.php,/project.php,/work
        //然后我们就可以通过这个变化的url地址内容去判断并且返回相应的
        //skill.json/project.json/work.json等数据文件的内容
        switch(urlObj.pathname){
          case '/skill':// http://localhost:8000/skill输入地址方式且console.log打印出来控制台
            // Content-Type可以指定返回的文件的格式类型
            res.setHeader('Content-Type','application/json');
            //需要通过fileSystem文件操作函数，去读取指定目录下的json文件，并将读取到的内容返回到浏览器端
            fs.readFile('./mock/skill.json','utf-8',function(err,data){
              res.end(data);
            });

          return;

          case '/project':
            res.setHeader('Content-Type','application/json');
            fs.readFile('./mock/project.json','utf-8',function(err,data){
              res.end(data);
            });
          return;

          case '/work':
            res.setHeader('Content-Type','application/json');
            fs.readFile('./mock/work.json','utf-8',function(err,data){
              res.end(data);
            });
          return;
        }
      
        next(); // next是实现的循环
      } // end middleware
  }))
})

// 第三部分sass和css 多变一一复制,一监控帅新  都是在我写的文件上操作index的复制 监控
// sass的复制 监控 修改
  var sass = require('gulp-sass');
  gulp.task('sass',function(){//这个
  return gulp.src('./src/css/index.css')  //从XX
  .pipe(sass()) //复制(插)
  .pipe(minifyCss())  //压缩(插)
  .pipe(gulp.dest('./www/css'));//服务器下会产生合并的css //到
})

  



//第四部分 js部分
//js的模块化打包操作
var webpack = require('gulp-webpack');
gulp.task('packjs',function(){
  return gulp.src('./src/scripts/index.js')  //从XX
  .pipe(named()) // //这个安装插件,放在前面,还是src下的文件名//重命名(插)
  .pipe(webpack())  //复制(插)
  // .pipe(uglify()) // js(丑化)压缩(插)
  .pipe(gulp.dest('./www/js')); //到
})
//命名模块 压缩(丑化) 
var named = require('vinyl-named');//.pipe(named()) //
var uglify = require('gulp-uglify');// .pipe(uglify()) // js(丑化)压缩
var minifyCss = require('gulp-minify-css');//.pipe(minifyCss()) //css 压缩

//第五部分 版本
//版本管理  从现在开始才是对www下文件操作
var rev = require('gulp-rev');  //生成版本和清单
//版本控制
var revCollector = require('gulp-rev-collector');//清单中映射的值替换为(新版本js或css)
//监控
var watch = require('gulp-watch');
//队列模块
var sequence = require('gulp-watch-sequence');


var cssDistFiles = ['./www/css/index.css'];
var jsDistFiles = ['./www/js/index.js'];

gulp.task('verCss',function(){  
  //找到要进行版本控制操作的目标文件
  return gulp.src(cssDistFiles) //从XX 生成版本和清单放到任意位置
  //生成相应的版本
  .pipe(rev()) 
  //复制到指定的目录
  .pipe(gulp.dest('./www/css'))
  //生成相应的映射文件
  .pipe(rev.manifest())
  //将映射文件复制到指定的目录
  .pipe(gulp.dest('./www/ver/css'))
})


gulp.task('verJs',function(){
  //找到要进行版本控制操作的目标文件
  return gulp.src(jsDistFiles)
  //生成相应的版本
  .pipe(rev())
  //复制到指定的目录
  .pipe(gulp.dest('./www/js'))
  //生成相应的映射文件
  .pipe(rev.manifest())
  //将映射文件复制到指定的目录
  .pipe(gulp.dest('./www/ver/js'))
})

//文件的字符串替换操作
gulp.task('html',function(){
  //src第一个参数是我们的映射资源文件，第二个参数是我们需要替换的html文件中js和rs
  gulp.src(['./www/ver/**/*.json','./www/*.html'])
  //进行字符串替换操作
  .pipe(revCollector({
    replaceReved:true
  }))
  //复制文件到指定目录
  .pipe(gulp.dest('./www'))
})


//图片复制
gulp.task("copy-image",function(){
  // return gulp.src("images/*.{png,jpg}").pipe(gulp.dest('dist/images'))
  // return gulp.src("['images/*.png','images/*.jpg']").pipe(gulp.dest('dist/images'))
  return gulp.src('./src/img/**').pipe(gulp.dest('./www/img'))
})

//第五部分 一起监听帅新//监听操作
// gulp.task('watch',function(){
//   gulp.watch('./src/index.html',['copy-index']);

// })
// gulp.task('watch',function(){
//   gulp.watch('./src/css/**',['sass','verCss','html']);//./src/css/index.css

// })  
gulp.task('watch',function(){//监听是a和b同步,不是一个操作或修改
  gulp.watch('./src/index.html',['copy-index']); 
  gulp.watch('./src/img/**',['copy-image']); 
  var queue = sequence(300);
  watch('./src/scripts/**/*.js',{
    // name:"JS",
    // emitOnGlob:false
  }, queue.getHandler('packjs','verJs','html'));
  //合并压缩  生成新版本js和对应json 让html通过json去找新生成的版本的js而不是老的js

  watch('./src/css/**',{
    // name:"CSS",
    // emitOnGlob:false
  }, queue.getHandler('sass','verCss','html'));//合并压缩  生成新版本js和对应json 让html通过json去找新生成的版本的js而不是老的js

})

gulp.task('default',['webserver','watch']);
//第一个网页www根目录index.html自动帅新Or打开  第二个监听src下文件一个或多个任务ss
