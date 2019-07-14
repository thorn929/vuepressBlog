---
title: 前端面试题
date: 2019-07-12
tags:
 - 前端面试题
categories:
 - 面试题
---
> 面试过程中还记得的面试题，拿出来总结一下。
## vue

> 路由守卫

1. 全局前置守卫`router.beforEach`

```vue
const router = new VueRouter({...})
router.beforEach((to,from,next) => {
	next();
})
```

1. 全局后置钩子

```vue
router.afterEach((to,from) => {
//...
})
```

1. 组件内的守卫
   - beforeRouteEnter
   - beforeRouteUpdate
   - deforeRouteLeave

```vue
const Foo = {
template:`...`,
beforeRouteEnter(to,from,next){
	//在渲染该组件的对应路由呗confirm前调用
	//不能获取组件实例 this
	//因为当前守卫执行前，组件实例还没被创建
},
beforeRouteUpdate(to,from,next) {
	//当前路由改变，但是该组件被复用时调用
	//举例来说，对于一个带有动态参数的路径 /foo/:id,在/foo/1和/foo/2之间跳转的时候
	//由于渲染同样的Foo组件，因此组件实例会被复用，而这个钩子就会在这个情况下被调用
	//可以访问组件实例this
},
beforeRouteLeave(to,from,next){
	//导航离开该组件的对应路由时调用
	//可以访问组件实例this
}
}
```



> 生命周期

1. 初始化的时候

beforeCreate  ====>  在实例(事件和生命周期)被创建之前调用

created           ====>  在实例(事件和生命周期)被创建之后调用

1. dom元素加载的时候，

beforeMount   =====>   dom元素加载之前调用

mounted        ======>  dom匀速加载之后，此时可以在这里面操作dom，调用接口获取数据

1. 数据改变的时候

beforeUpdate    =====>  在数据变化之前调用

update              ======>  在数据变化之后调用，不要在这里面修改data不然会一直调用

1. 组件销毁的时候

beforeDestroy   =====>  在组件销毁之前调用

destroy             =====>  在组件销毁之后调用

1. 使用keep-alive组件的时候，也就是需要动态改变组价的时候

activated          ======>   keep-alive 组件激活时调用

deactivated      ======>   keep-alive  组件停用时调用

>  双向数据绑定

使用`v-model`实现双向数据绑定

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src="./js/vue.js"></script>
</head>

<body>
  <div id="app">
    <input v-model='textMsg' type="text" />
    <div>{{textMsg}}</div>
    <!-- <select v-model='textMsg'>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <input type="checkbox" :checked='textMsg == 1'>we
    <input type="checkbox" :checked='textMsg == 2'>your
    <input type="checkbox" :checked='textMsg == 3'>it -->
  </div>
</body>
<script>
  new Vue({
    el: '#app',
    data: {
      textMsg: ''
    }
  })
</script>

</html>

```

双向数据绑定的原理 （简单说就是监听，修改，回填）

1.实现一个监听器`Observer`，用来劫持并监听所有属性，如果有变动的，就通知订阅者。

2.实现一个订阅者`Watcher`，每一个Watcher都绑定一个更新函数，watcher可以收到属性的变化通知并执行相应的函数，从而更新视图。

3.实现一个解析器`Compile`，可以扫描和解析每个节点的相关指令（`v-model`，`v-on`等指令），如果节点存在v-model，v-on等指令，则解析器`Compile`初始化这类节点的模板数据，使之可以显示在视图上，然后初始化相应的订阅者（Watcher）。

js原生实现数据绑定

html部分

```html
<input type="text" class="input">
    <div class="test"></div>
```

js部分

```js
var obj = {
    a: 1
  }
  var writeDom = document.querySelector('.input')
  var showDom = document.querySelector('.test')
  // Object.defineProperty(obj, prop, desc)

  // obj 需要定义属性的当前对象
  // prop 当前需要定义的属性名
  // desc 属性描述符
  Object.defineProperty(obj, "txt", {
    get: function () {
      return obj;
    },
    set: function (value) {
      showDom.innerHTML = value;
    }
  });
  writeDom.addEventListener("keyup", function (e) {
    obj.txt = e.target.value;
  })
```

> vue-router路由的两种方式，两者之间的区别?

hash模式和history 模式

区别

1. 在vue的路由配置中有mode选项 最直观的区别就是在url中 hash 带了一个很丑的 # 而history是没有#的

```javascript
const router = new VueRouter({
  mode: 'history', // 手动配置两个只能选择一个
  mode: 'hash' // 默认hash
})
```

2. hash模式和history模式的不同

改变视图的同时不会向后端发出请求。

1. hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 http://www.abc.com，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

2. history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 http://www.abc.com/book/id。如果后端缺少对 /book/id 的路由处理，将返回 404 错误。Vue-Router 官网里如此描述：“不过这种模式要玩好，还需要后台配置支持……所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。”

## 兼容问题

>  浏览器的兼容

1.class兼容

```
css3兼容各版本浏览器前缀
前缀	浏览器
-moz-	火狐等使用Mozilla浏览器引擎的浏览器
-webkit-	Safari, 谷歌浏览器等使用Webkit引擎的浏览器
-o-	Opera浏览器(早期)
-ms-	Internet Explorer (不一定)
把不带前缀的放到最后一行
```

**兼容IE更低版本需要加一些特殊的标识符**

CSS hack是利用浏览器遗留 bug 的原理来识别旧的浏览器。

```
.box{
   color: red;
   _color: blue; /*只有ie6认识*/
   *color: pink; /*只有ie67认识*/
   color: yellow\9;  /*ie浏览器都能识别*/
}
```



```
.target{
   display: inline-block;
   *display: inline; /*仅对ie67生效*/
   *zoom: 1; /*仅对ie67生效*/
}
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
```

 Hack 的写法

```
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html  class="no-js ie8"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html  class="no-js"><!--<![endif]-->
```

以下是一些常见属性的兼容情况

- inline-block: >=ie8

- min-width/min-height: >=ie7

- :before,:after: >=ie8

- div:hover: >=ie7

- inline-block: >=ie8

- background-size: >=ie9

- 圆角: >= ie9

- 阴影: >= ie9

- 动画/渐变: >= ie10

- 一些和兼容相关的工具/库：

  - [html5shiv](https://zhuanlan.zhihu.com/html5shiv)
  - [Respond.js](https://link.zhihu.com/?target=https%3A//github.com/scottjehl/Respond)
  - [CSS Reset](https://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000003021766)
  - [normalize.css](https://link.zhihu.com/?target=https%3A//github.com/necolas/normalize.css)
  - [Modernizr.js](https://link.zhihu.com/?target=https%3A//github.com/Modernizr/Modernizr)
  - [postcss](https://link.zhihu.com/?target=https%3A//github.com/postcss/postcss)

  特别是[Modernizr.js](https://link.zhihu.com/?target=https%3A//github.com/Modernizr/Modernizr) 和 [postcss](https://link.zhihu.com/?target=https%3A//github.com/postcss/postcss) 很有实践价值，值得好好看看用法。



  用到的网站：

  - [浏览器市场份额 - 百度统计流量研究院](https://link.zhihu.com/?target=http%3A//tongji.baidu.com/data/browser)
  - [caniuse.com](https://link.zhihu.com/?target=http%3A//caniuse.com/) 查CSS属性兼容
  - [Browserhacks](https://link.zhihu.com/?target=http%3A//browserhacks.com/) 查 Hack 的写法

2.js兼容

**常遇到的关于浏览器的宽高问题：**

```javascript
`//以下均可console.log()实验``  ``var` `winW=document.body.clientWidth||document.docuemntElement.clientWidth;``//网页可见区域宽``  ``var` `winH=document.body.clientHeight||document.docuemntElement.clientHeight;``//网页可见区域宽``  ``//以上为不包括边框的宽高，如果是offsetWidth或者offsetHeight的话包括边框``  ` `  ``var` `winWW=document.body.scrollWidth||document.docuemntElement.scrollWidth;``//整个网页的宽``  ``var` `winHH=document.body.scrollHeight||document.docuemntElement.scrollHeight;``//整个网页的高` `  ``var` `scrollHeight=document.body.scrollTop||document.docuemntElement.scrollTop;``//网页被卷去的高``  ``var` `scrollLeft=document.body.scrollLeft||document.docuemntElement.scrollLeft;``//网页左卷的距离` `  ``var` `screenH=window.screen.height;``//屏幕分辨率的高``  ``var` `screenW=window.screen.width;``//屏幕分辨率的宽``  ``var` `screenX=window.screenLeft;``//浏览器窗口相对于屏幕的x坐标（除了FireFox）``  ``var` `screenXX=window.screenX;``//FireFox相对于屏幕的X坐标``  ``var` `screenY=window.screenTop;``//浏览器窗口相对于屏幕的y坐标（除了FireFox）``  ``var` `screenYY=window.screenY;``//FireFox相对于屏幕的y坐标`
```

**event事件问题：**

```javascript
`//event事件问题``  ``document.onclick=``function``(ev){``//谷歌火狐的写法，IE9以上支持，往下不支持；``    ``var` `e=ev;``    ``console.log(e);``  ``}``  ``document.onclick=``function``(){``//谷歌和IE支持，火狐不支持；``    ``var` `e=event;``    ``console.log(e);``  ``}``  ``document.onclick=``function``(ev){``//兼容写法；``    ``var` `e=ev||window.event;``    ``var` `mouseX=e.clientX;``//鼠标X轴的坐标``    ``var` `mouseY=e.clientY;``//鼠标Y轴的坐标``  ``}`
```

**DOM节点相关的问题，我直接封装了函数，以便随时可以拿来使用：**

```javascript
`//DOM节点相关，主要兼容IE 6 7 8``  ``function` `nextnode(obj){``//获取下一个兄弟节点``    ``if` `(obj.nextElementSibling) {``      ``return` `obj.nextElementSibling;``    ``} ``else``{``      ``return` `obj.nextSibling;``    ``};``  ``}``  ``function` `prenode(obj){``//获取上一个兄弟节点``    ``if` `(obj.previousElementSibling) {``      ``return` `obj.previousElementSibling;``    ``} ``else``{``      ``return` `obj.previousSibling;``    ``};``  ``}``  ``function` `firstnode(obj){``//获取第一个子节点``    ``if` `(obj.firstElementChild) {``      ``return` `obj.firstElementChild;``//非IE678支持``    ``} ``else``{``      ``return` `obj.firstChild;``//IE678支持``    ``};``  ``}``  ``function` `lastnode(obj){``//获取最后一个子节点``    ``if` `(obj.lastElementChild) {``      ``return` `obj.lastElementChild;``//非IE678支持``    ``} ``else``{``      ``return` `obj.lastChild;``//IE678支持``    ``};``  ``}`
```

document.getElementsByClassName问题：

```javascript
`//通过类名获取元素``  ``document.getElementsByClassName(``''``);``//IE 6 7 8不支持；` `  ``//这里可以定义一个函数来解决兼容问题，当然别在这给我提jQuery...``  ``//第一个为全局获取类名，第二个为局部获取类名``  ``function` `byClass1(oClass){``//全局获取，oClass为你想要查找的类名，没有“.”``    ``var` `tags=document.all?document.all:document.getElementsByTagName(``'*'``);``    ``var` `arr=[];``    ``for` `(``var` `i = 0; i < tags.length; i++) {``      ``var` `reg=``new` `RegExp(``'\\b'``+oClass+``'\\b'``,``'g'``);``      ``if` `(reg.test(tags[i].className)) {``        ``arr.push(tags[i]);``      ``};``    ``};``    ``return` `arr;``//注意返回的也是数组，包含你传入的class所有元素；``  ``}` `  ``function` `byClass2(parentID,oClass){``//局部获取类名，parentID为你传入的父级ID``    ``var` `parent=document.getElementById(parentID);``    ``var` `tags=parent.all?parent.all:parent.getElementsByTagName(``'*'``);``    ``var` `arr=[];``    ``for` `(``var` `i = 0; i < tags.length; i++) {``    ``var` `reg=``new` `RegExp(``'\\b'``+oClass+``'\\b'``,``'g'``);``      ``if` `(reg.test(tags[i].className)) {``        ``arr.push(tags[i]);``      ``};``    ``};``    ``return` `arr;``//注意返回的也是数组，包含你传入的class所有元素；``   ``}`
```

**获取元素的非行间样式值：**

```javascript
`//获取元素的非行间样式值``   ``function` `getStyle(object,oCss) {``       ``if` `(object.currentStyle) {``         ``return` `object.currentStyle[oCss];``//IE``       ``}``else``{``         ``return` `getComputedStyle(object,``null``)[oCss];``//除了IE``       ``}``   ``}`
```

**设置监听事件：**

```javascript
`//设置监听事件``   ``function` `addEvent(obj,type,fn){``//添加事件监听，三个参数分别为 对象、事件类型、事件处理函数，默认为false``    ``if` `(obj.addEventListener) {``      ``obj.addEventListener(type,fn,``false``);``//非IE``    ``} ``else``{``      ``obj.attachEvent(``'on'``+type,fn);``//ie,这里已经加上on，传参的时候注意不要重复加了``    ``};``  ``}``  ``function` `removeEvent(obj,type,fn){``//删除事件监听``    ``if` `(obj.removeEventListener) {``      ``obj.removeEventListener(type,fn,``false``);``//非IE``    ``} ``else``{``      ``obj.detachEvent(``'on'``+type,fn);``//ie，这里已经加上on，传参的时候注意不要重复加了``    ``};``  ``}`
```

**元素到浏览器边缘的距离：**

```javascript
`//在这里加个元素到浏览器边缘的距离，很实用``  ``function` `offsetTL(obj){``//获取元素内容距离浏览器边框的距离（含边框）``    ``var` `ofL=0,ofT=0;``    ``while``(obj){``      ``ofL+=obj.offsetLeft+obj.clientLeft;``      ``ofT+=obj.offsetTop+obj.clientTop;``      ``obj=obj.offsetParent;``    ``}``    ``return``{left:ofL,top:ofT};``  ``}`
```

**阻止事件传播：**

```javascript
`//js阻止事件传播，这里使用click事件为例``  ``document.onclick=``function``(e){``    ``var` `e=e||window.event;``    ``if` `(e.stopPropagation) {``      ``e.stopPropagation();``//W3C标准``    ``}``else``{``      ``e.cancelBubble=``true``;``//IE....``    ``}``  ``}`
```

**阻止默认事件：**

```javascript
`//js阻止默认事件``  ``document.onclick=``function``(e){``    ``var` `e=e||window.event;``    ``if` `(e.preventDefault) {``      ``e.preventDefault();``//W3C标准``    ``}``else``{``      ``e.returnValue=``'false'``;``//IE..``    ``}``  ``}`
```

**关于EVENT事件中的target：**

```javascript
`//关于event事件中的target``  ``document.onmouseover=``function``(e){``    ``var` `e=e||window.event;``    ``var` `Target=e.target||e.srcElement;``//获取target的兼容写法，后面的为IE``    ``var` `from=e.relatedTarget||e.formElement;``//鼠标来的地方，同样后面的为IE...``    ``var` `to=e.relatedTarget||e.toElement;``//鼠标去的地方``  ``}`
```

**鼠标滚轮滚动事件：**

```javascript
`//鼠标滚轮事件``  ``//火狐中的滚轮事件``  ``document.addEventListener(``"DOMMouseScroll"``,``function``(event){``    ``alert(event.detail);``//若前滚的话为 -3，后滚的话为 3``  ``},``false``)``  ``//非火狐中的滚轮事件``  ``document.onmousewheel=``function``(event){``    ``alert(event.detail);``//前滚：120，后滚：-120``  ``}`
```

**节点加载：**

```
`//火狐下特有的节点加载事件，就是节点加载完才执行，和onload不同``//感觉用到的不多，直接把js代码放在页面结构后面一样能实现。。``document.addEventListener(``'DOMContentLoaded'``,``function` `( ){},``false``);``//DOM加载完成。好像除IE6-8都可以.`
```



## jquery

\$.extend和$.fn.extend有啥区别

1. **理解jQuery.extend()**

我们先把jQuery看成了一个类，这样好理解一些。`jQuery.extend()`，是扩展的jQuery这个类。

假设我们把jQuery这个类看成是人类，能吃饭能喝水能跑能跳，现在我们用jQuery.extend这个方法给这个类拓展一个能说话speak()的技能。这样的话，不论是男人，女人，xx人.....等能继承这个技能（方法）了。

可以如下图这样写着：

```javascript
JQuery.extend({
    speak:function(){
         alert("how are you!");
    }
});
```

调用方法如下：

```html
<!DOCTYPE html>
<html>
<head>
    <title>jQuery.extend()与jQuery.fn.extend()区别</title>
    <meta charset="utf-8">
    <script type="text/javascript" src="jquery-1.7.1.js"></script>
    <script type="text/javascript">
        (function($){
               $.extend({
                   speak:function(){
                       alert("how are you!");
                   }
               });
        })(jQuery);
    </script>
    <script type="text/javascript">
        $(document).ready(function(){
            $.speak();
        })
    </script>
</head>
<body>

</body>
</html>
```

**这说明$.speak)变成了jQuery这个类本身的方法（object）,他现在能"说话"了。**

但是吧，这个能力啊，只有代表全人类的 jQuery 这个类本身，才能用啊。你个人想用，你张三李四王五麻六，你个小草民能代表全人类嘛？

所以啊，这个扩展也就是**所谓的静态方法,只跟这个 类 本身有关**。跟你具体的实例化对象是没关系的。

2. **理解 jQuery.fn.extend()**

从字面理解嘛，这个拓展的是jQuery.fn的方法。jQuery.fn是啥玩意呢？

```javascript
jQuery.fn = jQuery.prototype = {
      init:funtion(selector,context){
            //.....

     }
}
```

 所以`jQuery.fn.extend`拓展的是jQuery对象（原型的）的方法啊！

对象是啥？就是类的实例化嘛，例如`\$("#abc") ，\$(div)`

那就是说，`jQuery.fn.extend`拓展的方法，你得用在jQuery对象上面才行啊！他得是张三李四王五痳六这些实例化的对象才能用啊。

说白了就是得这么用（假设xyz()是拓展的方法）：

`$('selector').xyz();`

调用方法如下：

```html
<!DOCTYPE html>
<html>
<head>
    <title>jQuery.extend()与jQuery.fn.extend()区别</title>
    <meta charset="utf-8">
    <script type="text/javascript" src="jquery-1.7.1.js"></script>
    <script type="text/javascript">
        (function($){
               $.fn.extend({
                   speak:function(){
                       alert("how are you!");
                   }
               });
        })(jQuery);
    </script>
    <script type="text/javascript">
        $(document).ready(function(){
            $("div").speak();
        })
    </script>
</head>
<body>

</body>
</html>
```

3. **两者区别总结：**

   1、两者调用方式不同：

   ​      ` jQuery.extend()`,一般由传入的全局函数来调用，主要是用来拓展个全局函数，如`$.init()，$.ajax();`

   ​       `jQuery.fn.extend()`,一般由具体的实例对象来调用，可以用来拓展个选择器，例如`$.fn.each();`

   2、两者的主要功能作用不同：

   ​        `jQuery.extend(object);` 为扩展jQuery类本身，为自身添加新的方法。

   ​        `jQuery.fn.extend(object);`给jQuery对象添加方法

    3、大部分插件都是用`jQuery.fn.extend()`

4. **JQuery的extend扩展方法：**

​     1、Jquery的扩展方法原型是:

```javascript
extend(dest,src1,src2,src3...);
```

​         它的含义是将src1,src2,src3...合并到dest中,返回值为合并后的dest,由此可以看出该方法合并后，是修改了dest的结构的。

​         如果想要得到合并的结果却又不想修改dest的结构，可以如下使用：

```javascript
 var newSrc=$.extend({},src1,src2,src3...)//也就是将"{}"作为dest参数。
```

​           这样就可以将src1,src2,src3...进行合并，然后将合并结果返回给newSrc了。如下例：

```javascript
var result=$.extend({},{name:"Tom",age:21},{name:"Jerry",sex:"Boy"})
那么合并后的结果：  result={name:"Jerry",age:21,sex:"Boy"}
```

​     **也就是说后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。**

​      2、省略dest参数
​           上述的extend方法原型中的dest参数是可以省略的，如果省略了，则该方法就只能有一个src参数，而且是将该src合并到调用extend方法的对象中去，如：
 　　2.1、$.extend(src)
 　　该方法就是将src合并到jquery的全局对象中去，如：

```javascript
  $.extend({
      hello:function(){alert('hello');}
  });
```

​       就是将hello方法合并到jquery的全局对象中。

 　　2.2、$.fn.extend(src)
 　　该方法将src合并到jquery的实例对象中去，如:

```javascript
  $.fn.extend({
         hello:function(){alert('hello');}
  });
```

​       就是将hello方法合并到jquery的实例对象中。



 　　下面例举几个常用的扩展实例：

```javascript
$.extend({net:{}});
```

​         这是在jquery全局对象中扩展一个net命名空间。

```javascript
$.extend($.net,{
       hello:function(){alert('hello');}
})
```

​        这是将hello方法扩展到之前扩展的Jquery的net命名空间中去。

 　　2.3、Jquery的extend方法还有一个重载原型：

```
 extend(boolean,dest,src1,src2,src3...)
```

​        第一个参数boolean代表是否进行深度拷贝，其余参数和前面介绍的一致，什么**叫深层拷贝，**我们看一个例子：

```javascript
var result=$.extend( true, {},
    { name: "John", location: {city: "Boston",county:"USA"} },
    { last: "Resig", location: {state: "MA",county:"China"} }
);
```

​        我们可以看出src1中嵌套子对象location:{city:"Boston"},src2中也嵌套子对象location:{state:"MA"},第一个深度拷贝参数为true，那么合并后的结果就是：

```javascript
var result={
       name:"John",last:"Resig", location:{city:"Boston",state:"MA",county:"China"}
}
```

​       也就是说它会将src中的嵌套子对象也进行合并，而如果第一个参数boolean为false，我们看看合并的结果是什么，如下

```javascript
 var result=$.extend( false, {},
       { name: "John", location:{city: "Boston",county:"USA"} },
       { last: "Resig", location: {state: "MA",county:"China"}
 });
```

​        那么合并后的结果就是:

```javascript
var result={
      name:"John",last:"Resig",location:{state:"MA",county:"China"}
}
```

​       以上就是$.extend()在项目中经常会使用到的一些细节。

## js原生

* 数据几种去重方法

```javascript

//方法1 将方法1添加到数组原型上
var arr = [1, 2, 3, 4, 4, 3, 2, 1];
    Array.prototype.removeDuplicate = function () {
      var n = [];
      for (var i = 0; i < this.length; i++) {
        if (n.indexOf(this[i]) == -1) {
          n.push(this[i])
        }
      }
      return n;
    }
    console.log(arr.removeDuplicate());
//方法2 key值唯一性
 var arr = [1, 2, 3, 4, 5, 5, 4, 3, 2, 1];

    function deWeight(arr) {
      var n = [];
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (!obj[item]) {
          obj[item] = true;
          n.push(item);
        }
      }
      return n;
    }
    console.log(deWeight(arr));
//方法3 先排序，当前项跟后一项比较如果相同就不push
 var arr = [1, 2, 3, 4, 5, '1', '2', 5, 4, 3, 2, 1];
    Array.prototype.removeDuplicate = function () {
      var n = [];
      this.sort();
      for (var i = 0; i < arr.length; i++) {
        // 这里不能使用!==
        if (arr[i] != arr[i + 1]) {
          n.push(arr[i])
        }
      }
      return n;
    }
    console.log(arr.removeDuplicate());
```
