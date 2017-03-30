---
title: React入门：循序渐进学习ES6 + Webpack + React
date: 2017-03-29 09:22:51
tags: react
reward: true
---

全文将主要涉及到：ES6、npm、Babel、Webpack、JSX、React等名词，如果有不认识的，别担心，但请先做好心理准备。

一、前言
----------

进入主题之前，先对React有个初步了解和印象：

React项目可以采用两种Javascript语法版本中的一种进行编写：ES5或ES6. 

我们使用React都是用于web页面上的，当前的主流浏览器均已支持ES5，而ES6还有部分尚未支持；因此，如果使用ES6的话，需要通过某种手段将使用ES6语法编写的代码编译为ES5语法的代码（通过一个叫做Babel的东东），后面详细说明。

那么使用ES5和ES6的编写上，代码有哪些区别呢？以一个简单的React组件为例：

<!-- more -->

* **ES5写法**

```javascript
//ES5
var React = require('react');
var ReactDOM = require('react-dom');

var Person = React.createClass({//类名一定要大写开头
    render: function() {
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <p>性别：{this.props.sex}</p>
                <p>年龄：{this.props.age}</p>
            </div>
       );
    }
});

ReactDOM.render(
    <Person name='Erick' sex='male' age='23' />,
     document.getElementById('app')
);
```

* **ES6写法**

```javascript
//ES6
import React from 'react';
import ReactDOM from 'react-dom';

class Person extends React.Component{
    render() {//开头花括号一定要和小括号隔一个空格，否则识别不出来
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <p>性别：{this.props.sex}</p>
                <p>年龄：{this.props.age}</p>
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

* **提示**：如果你对Babel有所了解或较为熟悉，可以快速浏览或直接跳过本节。

不管是ES5还是ES6，我们最终的代码肯定是在浏览器上跑的，所以最终输出到页面中的代码必须要求是ES5语法的版本，才能满足浏览器兼容性。

现在我们使用ES6，那么该如何将ES6转化为ES5代码呢？

答案就是**Babel**。什么是Babel？别被这个晦涩的单词吓到，其实很简单，Babel就是一个Javascript编译器，用于将`ES6`、`JSX`等语法“降级”为主流浏览器都能读懂的Javascript代码（ES5）。

如何使用Babel？有两种方式：

* 一种是在浏览器端的页面中的`ES6`或`JSX`代码之前引入`<script src="babel-core/browser.js"></script>`，使得浏览器支持babel，能够理解解析ES6代码。

* 另一种是在`node.js环境`上使用npm安装Babel，然后用Babel将ES6语法编写的js文件直接转为页面所需的ES5语法的js文件。

乍一看，是否觉得第一种更为方便，然而细想一下，缺点也是很明显的：浏览器在解析页面主体js前，还需要先“编译”一遍ES6代码，性能大大降低；而在`node.js环境`先进行网站发布前预处理，对网站发布之后的页面访问没有任何影响。

所以，我们使用第二种方式来安装Babel，进行React学习的准备工作，我们使用[Babel 6](http://www.csdn.net/article/2015-11-17/2826233)。

新建一个目录，打开命令行，执行（前提已经安装了`node.js`环境）：

```bash
$ npm init
```

一路回车，完成后目录会生成一个`package.json`文件，用于记录项目依赖等信息，方便项目迁移。

继续执行以下命令，开始在项目本地安装Babel，并将Babel写入项目依赖（即`package.json`文件）中：

```bash
$ npm install --save-dev babel-cli  
```

babel 6除了babel-cli模块之外，还有另一个模块babel-core，如果不清楚可以参见：[babel-cli和babel-core的用法和区别](/)， 我们这里用babel-cli。

Babel 6官方推荐**本地安装**babel-cli，而不是全局安装，所以我们不能直接在该目录的命令行下使用`babel`命令，不过可以在`package.json`中这样：

```javascript
{
    "script":{
        "build": "babel app.js -o main.js"
    }
}
```

* `-o`表示--out-file，即输出文件，上述指令表示使用babel将app.js编译输出到ES5语法的main.js文件（不存在则自动创建）。


然后使用`npm run build`命令即可将`app.js`编译为`main.js`.


上述编译其实并没有进行，而是原样输出。为了babel能够编译ES6，还需要安装`babel-preset-es2015`预设，执行以下命令：

```bash
$ npm install --save-dev babel-preset-es2015
```

只要使用babel-cli，都需要在项目目录创建一个`.babelrc`配置文件，当前其内容应填写：

```javascript
{
    "presets": ["es2015"]
}
```

上面的配置表示babel转码时使用的规则是`es2015`（babel不止可以转es6，所以也有别的预设如`babel-preset-react`，用于编译React所用到的`JSX`语法，此处内容将在后文展开）。

**注意**：Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

举例来说，ES6在Array对象上新增了`Array.from`方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用`babel-polyfill`，为当前环境提供一个垫片。

安装命令如下。

```bash
$ npm install --save babel-polyfill
```

现在，就可以使用babel尽情地转码ES6了。

首先在项目目录新建一个`app.js`（名字任取），内容如下：

```javascript
import 'babel-polyfill';        //为了能够最后在浏览器正常运行ES6新增的Array.from方法，需要加载babel-polyfill

let log = function(){
    console.log(Array.from);
};

export default log;

log();
```

在项目目录命令行执行：

```bash
$ npm run build
```

完成后可看到项目目录生成了一个名为`main.js`的文件，其内容为：

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

顺利执行，表明转码成功。做到这一步，表明我们可以对React项目的ES6语法进行编译输出了。

然而这还不足以进行React的学习，还记得前面提到的`JSX`语法吗？再次看这段代码：

```javascript
//ES6
import React from 'react';
import ReactDOM from 'react-dom';

class Person extends React.Component{
    render() {//开头花括号一定要和小括号隔一个空格，否则识别不出来
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <p>性别：{this.props.sex}</p>
                <p>年龄：{this.props.age}</p>
            </div>    
        );
    }
} 

ReactDOM.render(
    <Person name='Erick' sex='male' age='23' />,
     document.getElementById('app')
);       
```

Javascript中直接写HTML，很奇特的写法，这就是[**JSX**语法](http://www.runoob.com/react/react-jsx.html)（可以先不用管它，后面讲React会解释一遍）。

因此，除了使用`babel-preset-es2015`来转换ES6代码外，还需要引入`babel-preset-react`来转换JSX代码。执行以下命令：

```bash
$ npm install --save-dev babel-preset-react
```

然后修改`.babelrc`文件内容为：

```javascript
{
    "presets": ["es2015","react"]
}
```

现在Babel可以转码ES6和JSX了，已经迫不及待想要看看效果了！

但是，我们还缺最关键的一步：安装react...

安装react也很简单，执行以下命令：

```bash
$ npm install --save-dev react react-dom
```

**其实追求简单上述安装可以一步完成**，即执行：

```bash
$ npm install --save-dev react react-dom babel-cli babel-preset-es2015 babel-preset-react babel-polyfill
```

那么现在，就让我们跑一下一个简单的`React Demo`吧：

* **/index.html**

```html
    <!DOCTYPE html>
    <html>
    <head>
        <title></title>
    </head>
    <body>
        <div id="app"></div>

        <script src="main.js"></script>
    </body>
    </html>
```

* **/app.js**

```javascript
//ES6
import 'babel-polyfill';    //可按需选择是否加载
import React from 'react';
import ReactDOM from 'react-dom';

class Person extends React.Component{
    render() {//开头花括号一定要和小括号隔一个空格，否则识别不出来
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <p>性别：{this.props.sex}</p>
                <p>年龄：{this.props.age}</p>
            </div>    
        );
    }
} 

ReactDOM.render(
    <Person name='Erick' sex='male' age='23' />,
     document.getElementById('app')
);       
```

再次执行命令编译`app.js`:

```bash
$ npm run build
```

然后在浏览器查看`/index.html`，然后......就会发现：报错了！以下是F12 console控制台打印：

```javascript
Uncaught ReferenceError: require is not defined
```

提示`require没有定义`，到这里，是不是想到什么了？

没错，这里的`require`并不是Javascript的原生实现，而是node.js对于CommonJS模块化规范的实现！浏览器是不认识它的。

这时我们就需要另一个工具了：Webpack！去掉require，将依赖全部导入到`main.js`中，打包成一个文件输出！

三、Webpack + React
---

如果你是一步步看到这里，忍受上面这么多的长篇大论，说明你实在是一位大毅力者，给你点赞！

这一节之后，接下来就是React主场了，所以还请再耐心片刻，我们先进行Webpack相关配置，如需了解Webpack请戳：[Webpack使用指南](/)。

Webpack本身只负责依赖模块管理和打包，那该如何与Babel搭配使用呢？

万幸，Webpack有个叫做“Loader”的东西，可以用来对资源模块进行打包前的处理。例如，`babel-loader`就可以在打包前将`ES6`和`JSX`语法代码转为ES5代码，再打包输出到一个文件中去，我们使用的就是`babel-loader`。

也就是说，我们前面一节的“Babel介绍”其实是非必须的！

等等，等等......别打我......XD

好吧，前面一节的内容更多的是理解Babel的使用方法，接下来我们只要使用`Webpack + babel-loader + react`就可以了。

让我们“**重新开始**”吧：

清空项目目录，打开命令行，依次执行以下步骤:

* 全局安装 `webpack`

```bash
$ npm install -g webpack
```


* `npm init`生成`package.json`文件

```bash
$ npm init
```

* 本地安装依赖模块

```bash
$ npm install --save-dev react react-dom babel-core babel-loader babel-preset-es2015 babel-preset-react babel-polyfill
```
    
* 新建/`webpack.config.js`文件，内容如下

```javascript
module.exports = {
    entry: './app.js',

    output:{
        path: './',
        filename: 'main.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ['es2015','react']
                }
            }
        ]
    }
};
```

* 新建/`index.html`和/`app.js`文件，内容分别如下

/**index.html**

```html
    <!DOCTYPE html>
    <html>
    <head>
        <title></title>
    </head>
    <body>
        <div id="app"></div>

        <script src="main.js"></script>
    </body>
    </html>
```

/**app.js**

```javascript
//ES6
import 'babel-polyfill';    //可按需选择是否加载
import React from 'react';
import ReactDOM from 'react-dom';

class Person extends React.Component{
    render() {//开头花括号一定要和小括号隔一个空格，否则识别不出来
        return (
            <div>
                <p>姓名：{this.props.name}</p>
                <p>性别：{this.props.sex}</p>
                <p>年龄：{this.props.age}</p>
            </div>    
        );
    }
} 

ReactDOM.render(
    <Person name='Erick' sex='male' age='23' />,
     document.getElementById('app')
);       
```

配置完成！让我们试试吧。

命令行执行`webpack`

```bash
$ webpack
Hash: d64464758f8b8762b8fe
Version: webpack 1.13.2
Time: 4640ms
  Asset    Size  Chunks             Chunk Names
main.js  998 kB       0  [emitted]  main
    + 474 hidden modules

```


可以看到项目目录生成一个`main.js`，用浏览器打开`index.html`看一下吧：

![ES6 + Webpack + React循序渐进Demo](/images/webpack_react_demo.png)

现在我们终于把一个简单的React Demo跑起来了，那么就让我们开始正式进入到主题中，开始[react学习之路](http://linyk.me/)吧！