var code1=`/*
*面试官你好，我是王刘永
*我将以动画的形式介绍我自己
*只是以文字介绍太无聊了
*我就用代码介绍自己吧
*首先准备一些css样式
*/
*{
    transition: all .1s;
}
html{
    background:#aaa;
    font-size:14px;
}
#codeTag{padding:15px;background: #ccc;}
/*
*颜色有些单调，让我们给代码高亮
*/
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.punctuation{
    color: #999;
}
/* 加一个呼吸效果 */

#codeTag{
  animation: breath 0.5s infinite alternate-reverse;
}

/*不玩了，我来介绍一下自己吧*/
/*我需要一张白纸*/
#codeWrapper{position:fixed; left:0;width:50%;}
#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100vh;
    padding: 16px;
    background: #ddd;
    transform: rotateY(-20deg);
}
/*请看右边*/
`;

var code2=`
/*加点3D效果吧*/
#codeWrapper{
    transform: rotateY(20deg) translateX(10px);
}
/*接下来引入一个库marked.js*/
/*把Markdown变成HTML*/
`
var code3=`
/*以上就是我的会动的简历*/
/*谢谢欣赏*/
`
var markdown=`
# 自我介绍
***
- 姓名：王刘永
- 性别：男
- 年龄：24
- 手机：18355093647
- 邮箱：1355498705@qq.com
- 应聘职位：前端开发工程师

# 能力介绍
***
1.熟练掌握HTML5&&CSS3能够独立的制作精美的页面。掌握CSS3动画、过度效果、响应式等常用技术
2.熟悉掌握Javascript基本知识，熟悉掌握数据类型，函数与作用域，Array，JSON，RegExp，闭包知识，
  promise对象等。能够使用JavaScript操作DOM进行页面间的交互。
3.熟练利用AJAX与后 端进行交互，了解跨域的常用解决方案JSONP、CORS等。
4.熟悉Jquery，能熟练使用。
5.熟练利用vue.js、react.js等
# 项目简介
***
1.在线简历
预览链接:[预览](https://wangliuyong.github.io/resume/index.html)
2.canvas画板
预览链接:[预览](https://wangliuyong.github.io/canvas2/index.html)
3.键盘导航
预览链接:[预览](https://wangliuyong.github.io/myNav/index.html)
# 社交
***
博客：[https://blog.csdn.net/wang_liuyong](https://blog.csdn.net/wang_liuyong)
github:[https://github.com/wangliuyong](https://github.com/wangliuyong)
`

writeCode('',code1,()=>{             //异步函数
    createPaper(()=>{                //同步函数
        writeMarkdown(markdown,()=>{
            writeCode(code1,code2,()=>{
                let content=document.querySelector('#content');
                content.innerHTML =marked(content.innerHTML);
                writeCode((code1+code2),code3,()=>{})
            });
        });  
    });
});

//writeCode()是异步的，因为他要等定时器结束（结果）才会进行下一步，createPaper()是同步的，他直接进行下一步。


/* // The code snippet you want to highlight, as a string
var code = "var data = 1;";

// Returns a highlighted HTML string
var html = Prism.highlight(code, Prism.languages.javascript, 'javascript'); */


var timer=100;

function writeCode(preCode,curCode,fn){
    var n = 0;
    var id = setInterval(() => {
        n++;
        //引入prism高亮代码块
        codeTag.innerHTML =Prism.highlight(preCode+curCode.slice(0, n), Prism.languages.css);
        cssStyle.innerHTML = preCode+curCode.slice(0, n);
        codeTag.scrollTop=10000;
        if (n >= curCode.length) {
            window.clearInterval(id);
            fn.call();  
        }
    }, 90);
}

function writeMarkdown(code,fn){
    let content=document.querySelector('#content');
    var n=0;
    
    var id=window.setInterval(()=>{
        n++;
        content.innerHTML=code.slice(0,n);
        content.scrollTop=10000;
        if (n >= code.length) {
            window.clearInterval(id);
            fn.call();  
        }
    },90);


    
}

function createPaper(fn){
    var paper=document.createElement('div');
    paper.id="paper";
    var content=document.createElement('pre');
    content.id="content";
    paper.appendChild(content);
    document.body.appendChild(paper);
    fn.call();
}
