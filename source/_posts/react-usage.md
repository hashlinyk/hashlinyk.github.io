---
title: React入门（一）-循序渐进学习ES6 + Webpack + React
date: 2017-03-29 09:22:51
tags: [react,笔记]
---

全文将主要涉及到：ES6、npm、Babel、Webpack、JSX、React等名词，如果有不认识的，别担心，但请先做好心理准备。

一、前言
----------

进入主题之前，先对React有个初步了解和印象：

React项目可以采用两种Javascript语法版本中的一种进行编写：ES5或ES6. 

我们使用React都是用于web页面上的，当前的主流浏览器均已支持ES5，而ES6还有部分尚未支持；因此，如果使用ES6的话，需要通过某种手段将使用ES6语法编写的代码编译为ES5语法的代码（通过一个叫做Babel的东东），后面详细说明。

那么使用ES5和ES6的编写上，代码有哪些区别呢？以一个简单的React组件为例：

<!-- more -->

```javascript
//ES5
var React = require('react');

var Person = React.createClass({//类名一定要大写开头
    render: function() {
        return (
            <div>
                <p>姓名：this.props.name</p>
                <p>性别：this.props.sex</p>
                <p>年龄：this.props.age</p>
            </div>
       );
    }
});

ReactDOM.render(
    <Person name='Erick' sex='male' age='23' />,
     document.getElementById('app')
);
```

```javascript
//ES6
import React from 'react';

class Person extends React.Component{
    render() {//开头花括号一定要和小括号隔一个空格，否则识别不出来
        return (
            <div>
                <p>姓名：this.props.name</p>
                <p>性别：this.props.sex</p>
                <p>年龄：this.props.age</p>
            </div>    
        );
    }
} 

ReactDOM.render(
    <Person name='Erick' sex='male' age='23' />,
     document.getElementById('app')
);       
```

本文将以ES6语法来进行React学习，原因是ES6作为较新的语法规范，自带模块化特性，官方也推荐使用ES6。

在使用ES6学习React过程中，其实也是深入了解ES6的过程。放心，学习React并不需要多深厚的ES6内功，但你应该先了解ES6的类（class）和模块化特性（import、export）等相关知识点，推荐[ECMAScript 6 入门](http://es6.ruanyifeng.com)。


二、Babel介绍
--------------

不管是ES5还是ES6，我们最终的代码肯定是在浏览器上跑的，所以最终输出到页面中的代码必须要求是ES5语法的版本，才能满足浏览器兼容性。

现在我们使用ES6，那么该如何将ES6转化为ES5代码呢？

答案就是**Babel**。什么是Babel？别被这个晦涩的单词吓到，其实很简单，Babel就是一个Javascript编译器，用于将`ES6`、`JSX`等语法“降级”为主流浏览器都能读懂的Javascript代码（ES5）。

如何使用Babel？有两种方式：

* 一种是在浏览器端的页面中的`ES6`或`JSX`代码之前引入`<script src="babel-core/browser.js"></script>`，使得浏览器支持babel，能够理解解析ES6代码。

* 另一种是在`node.js环境`上使用npm安装Babel，然后用Babel将ES6语法编写的js文件直接转为页面所需的ES5语法的js文件。

乍一看，是否觉得第一种更为方便，然而细想一下，缺点也是很明显的：浏览器在解析页面主体js前，还需要先“编译”一遍ES6代码，性能大大降低；而在`node.js环境`先进行网站发布前预处理，对网站发布之后的页面访问没有任何影响。

所以，我们使用第二种方式来安装Babel，进行React学习的准备工作，我们使用[Babel 6](http://www.csdn.net/article/2015-11-17/2826233)。

新建一个目录，打开命令行，执行（首先应具有`node.js环境`）：

```bash
$ npm init
```

一路回车，完成后目录会生成一个`package.json`文件，用于记录项目依赖等信息，方便项目迁移。

继续执行以下命令，开始在项目本地安装Babel，并将Babel写入项目依赖（即`package.json`文件）中：

```bash
$ npm install --save-dev babel-cli  
```

babel 6除了babel-cli模块之外，还有另一个模块babel-core，如果不清楚可以参见：[babel-cli和babel-core的用法和区别](/)， 我们只需要用到babel-cli。

为了babel能够编译ES6，还需要安装`babel-preset-es2015`预设，执行以下命令：

```bash
$ npm install --save-dev babel-preset-es2015
```

只要使用babel，都需要在项目根目录创建一个`.babelrc`配置文件，当前其内容应填写：

```javascript
{
    "presets": ["es2015"]
}
```

上面的配置表示babel转码时使用的规则是`es2015`（babel不止可以转es6，所以也有别的预设如`babel-preset-react`，用于编译React所用到的`JSX`语法，此处内容将在下节展开）。

**注意**：Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

举例来说，ES6在Array对象上新增了`Array.from`方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用`babel-polyfill`，为当前环境提供一个垫片。

安装命令如下。

```bash
$ npm install --save babel-polyfill
```


现在，就可以使用babel尽情地转码ES6了。

首先在项目根目录新建一个`app.js`（名字任取），内容如下：

```javascript
import 'babel-polyfill';        //为了能够最后在浏览器正常运行ES6新增的Array.from方法，需要加载babel-polyfill

let log = function(){
    console.log(Array.from);
};

export default log;

log();
```

在该目录命令行执行：

```bash
$ babel app.js -o main.js
```

`-o`表示--out-file，即输出文件，上述指令表示使用babel将app.js编译输出到ES5语法的main.js文件（不存在则自动创建）。

完成后可看到项目根目录生成了一个名为`main.js`的文件，其内容为：

```javascript
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('babel-polyfill');

//为了能够最后在浏览器正常运行Array.from，需要加载babel-polyfill

var log = function log() {
    console.log(Array.from);
};

exports.default = log;

log();
```

让我们看看效果。在命令行中执行直接执行`main.js`：

```bash
$ node main.js
[Function: from]
```

顺利执行，表明转码成功！

