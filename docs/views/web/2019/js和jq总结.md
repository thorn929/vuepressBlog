---
title: js和jq操作dom
date: 2019-07-14
tags:
 - js和jq操作dom
categories:
 - 前端
---
::: tip
1. js和jQuery的操作dom的总结
2. 一些简单的知识点
:::
<!-- more -->
> js是一种脚本语言，常用于网页客户端编程，使网页在客户端浏览器中，实现更多地动态功能，表现出更加丰富的视觉效果。
>
> jquery是一个快速、简洁的JavaScript框架，极大的简化了javascript编程。

## DOM

### 获取dom元素

> 原生js

```javascript
//通过id获取
var box = document.getElementById('box');
//通过标签获取(获取的伪数组)
var ipts = document.getElementsByTagName('input');
//通过选择器获取
var box = document.querySelector('#box');
//获取的也是一个伪数组
var ipts = document.querySelectorAll('input');
```

> jq

```javascript
//直接$ 符号，里面添加选择器
$('select');
//获取索引为1的p标签
$('p').eq(1);
//获取第一个p标签；
$('p').first();
//获取最后一个p标签
$('p').last();
//返回所有有类名pp的p标签
$('p').filter('.pp');
//返回所有不带类名pp的p标签
$('p').not('.pp');
```

###  创建dom元素

> js原生

```javascript
//方法1
//创建标签
var li = document.createElement('li');
//创建dom片段
var frag = document.createDocumentFragment();
//可以将创建的标签放到dom片段中
frag.appendChild(li);
//再将frag片段添加到页面的元素中
ul.appendChild(frag);
//方法2   字符串拼接
'<li></li>'
```

> jq

```javascript
//字符串拼接
```

###  添加和插入dom元素

> js原生

```javascript
//获取页面元素
var ul = document.querySelector('ul');
//创建一个新元素，不可以是字符串拼接，必须是dom元素，不能是字符串
var li = document.createElement('li');
//将新创建的li添加到ul最后一个子元素的后面
ul.appendChild(li);
//将li插入到ul中第一个子元素的前面
ul.insertBefore(frag, ul.children[0]);
//将字符串创建的标签添加到div
var div = document.querySelector('box');
div.innerHTML = '<div>覆盖div中的内容</div>';
//将文本插入到div
div.innerText = '覆盖里面的所有内容';
```

> 添加新内容的四个 jQuery 方法：
>
> - append() - 在被选元素的结尾插入内容
> - prepend() - 在被选元素的开头插入内容
> - after() - 在被选元素之后插入内容
> - before() - 在被选元素之前插入内容

```javascript
var li = '<li>123</li>';
//将元素添加到ul的最后一个子元素的后面
$('ul').append(li);
//将元素添加到ul的第一个子元素的前面
$('ul').prepend(li);
//插入到第二个li的后面
$('ul li').eq(1).after(li);
//插入到第二个li的前面
$('ul li').eq(1).before(li);
```

```javascript
//四种方法都可以同时添加多个
function appendText()
{
    var txt1="<p>文本。</p>";              // 使用 HTML 标签创建文本
    var txt2=$("<p></p>").text("文本。");  // 使用 jQuery 创建文本
    var txt3=document.createElement("p");
    txt3.innerHTML="文本。";               // 使用 DOM 创建文本 text with DOM
    $("body").append(txt1,txt2,txt3);        // 追加新元素
}
```

### 删除dom元素

> js原生

```javascript
// 父元素.removeChild(子元素);
var li = document.querySelector('li')[0];
// 找到自己的父元素将自己干掉
li.parentNode.removeChild(li);
```

> 如需删除元素和内容，一般可使用以下两个 jQuery 方法：
>
> - remove() - 删除被选元素（及其子元素）
> - empty() - 从被选元素中删除子元素

```javascript
//删除当前元素和所有的子元素
$("#div1").remove();
//删除当前元素下面的所有子元素，保留当前元素
$("#div1").empty();
```

### 查找父子级关系

> js

```javascript
// 获取ul
var ul = document.querySelector('ul');
//获取父节点
ul.parentNode;
//获取父元素节点
ul.parendElement;
//获取所有子节点
ul.childNodes;
//获取所有元素节点
ul.children;
//获取上一个节点
ul.previousSibling;
//获取上一个元素节点
ul.previousElementSibling;
//获取下一个节点
ul.nextSibling;
//获取下一个元素节点
ul.nextElementSibling;
```

> jq

```javascript
//parent() 返回父节点
$('ul').parent();
//parents()返回所有父节点中的body节点
$('ul').parents('body');
//返回所有后代
$('ul').children();
$('ul').find('*');
//返回指定后代
$('ul').children('子代选择器');
$('ul').find('子代选择器');
// siblings()返回所有的兄弟
$('ul').siblings();
// next()返回下一个兄弟
$('ul').next();
// nextAll() 返回后面所有的兄弟
$('ul').nextAll();
// prev()返回上一个兄弟
$('ul').prev();
// prevAll()返回上面所有的兄弟
$('ul').prevAll();
```

### get属性和内容andset属性和内容

> js

```javascript
//获取value <input type='text' value='123123'>
var ipt = document.querySelector('input');
//点语法获取属性，
ipt.value;
//给属性重新复制
ipt.value = '新的值';
//获取属性，可以直接点属性名，或者使用方法getAttriBute('属性名');
ipt.getAttribute('value');
//设置属性
ipt.setAttribute('value', '新的值');
//获取text <div>文本信息</div>
var div = document.querySelector('div');
//获取文本属性
div.innerText
//设置文本信息
div.innerText = '新的文本内容';
//获取html <div><p>文本信息</p></div>
div.innerHTML
//设置html文本
div.innerHtml = '<p>新的文本信息</p>'
```

> jq

```javascript
//获取内容
$('input').val();
$('div').text();
$('div').html();
//获取属性 能获取自定义的属性值
$('input').attr('value');
//获取动态变化的属性值
$('div').prop('index');
//更新内容
$('input').val('新的值');
$('div').text('新的文本');
$('div').html('新的html');
//设置属性
$('input').attr('value', '新的值');
$('div').prop('disabled',true);
```

### 修改和获取类名样式
