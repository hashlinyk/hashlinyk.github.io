---
title: 前端工程化之Babel入门：了解Babel
date: 2021-12-29 22:05:33
tags:
---

谈到前端工程化，脑海中就会浮现`Webpack`、`Eslint`、`Babel`、`Gulp`、`Rollup`等字眼，甚至还有`CI/CD`（持续集成/持续部署）、自动化测试等高深概念。这篇文章将尝试用最简单的白话来了解Babel的概貌，认识Babel在前端工程流中的角色定位，以及基础用法，为之后的前端工程化深入学习做铺垫。

## 概貌

**Babel 是什么？Babel 是一个 JavaScript 编译器。**

上面这句话就是Babel的本质，更简单的说，Babel可以把使用ES6/ES7等“高级”语法编写的Javascript代码转换为ES5/ES3的“通俗”语法（也可以把JSX语法转为Javascript）。

随着ECMAScript 标准规范发展越来越快，新语法层出不穷，然而浏览器更新却存在着滞后性，对ECMAScript新标准支持程度不一，Web前端开发者眼巴巴看着各种“高大上”、“简洁”、“实用”的语法和API，却不敢在实际项目中直接使用，以免由于浏览器不兼容导致各种问题，于是Babel诞生了！

从此以后，我们也可以尽情地使用“高大上”的ES6+高级语法了，只要经过Babel转换，最终输出的代码是啥样的我们不再那么关心，只要浏览器能读懂并执行就行。

也许你会担心经过Babel转换后的代码太过难以阅读，调试起来会非常困难。幸好Babel支持了一个叫做Source map的特性，使我们调试起来也和直接写ES5/ES3代码的调试方式一样简单，而这对我们来说，只需要启用一个配置项就可以做到。

## Babel在前端工程流中的角色定位

我们知道，如今前端工程流中最耳熟能详的一个词是：`Webpack`. 现在很多前端项目脚手架都内置依赖了webpack，且提供了一套默认配置，做到开箱即用。我们只需要按照官网文档给出的步骤，一个命令一个命令去执行，如`npm run serve`、`npm run build`...，即可实现大部分开发场景需求，在需要定制化的情况下，甚至自己建一个`vue.config.js`文件去按照文档说明扩展配置即可，不再需要了解webpack的具体用法就能“叱咤Vue界”。

这是前端工程化发展的必然，有句话说得好，“懒人改变世界”，技术的发展造福了更多的懒人。在这样的大背景下，Webpack的细节被隐藏和弱化，更别提Babel了。我们可以在项目看到一个`.babelrc`文件，却大部分时间都不会注意到它，更别说打开它和编辑它了。

但就是这么一个低存在感的小透明，却承担起了巨大的责任，在背后默默工作，辛苦地把你新编写的ES6 `class`转换成了平凡的构造函数，在你`Ctrl + S`之后看到浏览器页面焕然一新的瞬间，你可会想到这个小透明做的事情有多么伟大？当然，这一切也离不开老大哥Webpack的提携，在Webpack的Loader机制下，Babel在这里作为**Webpack loader角色**的一员勤勤恳恳工作着。

除了作为Webpack loader，Babel当然也能孤军奋战，独当一面，文章后面将介绍Babel单独使用和结合Webpack使用两种用法。

## Babel工具集

在使用Babel之前，我们先要知道Babel包含哪些东西，是的，它不是一个单一的工具，一开始它确实是一个单一的Javascript转换器，但现在它变成了一个工具集……别慌，它并没有因此变得很复杂，之所以这么设计是有原因的：

    在Babel 6以前，Babel是一个专注且单一的Javascript转换器，然而Babel团队的志向不仅于此，更想把Babel打造成一个平台，由各个不同的功能模块和可插拔插件组成，用于创建下一代JavaScript工具集。

> 详见[Babel 6.0之babel-cli和babel-core的用法和区别](http://linyk.me/2017/03/31/babel-usage/)

自Babel 7起，Babel团队改用作用域软件包，因此您现在必须使用`@babel/core`而不是`babel-core`.但实质上，`@babel/core`只是`babel-core`的较新版本。这样做是为了更好地区分哪些软件包是官方软件包，哪些是第三方软件包。

Babel7包含了核心包`@babel/core`、终端命令行界面工具`@babel/cli`以及各种语法转换规则包（官方称之为`preset`，即“预设”）如`@babel/preset-env`、`@babel/preset-react`、`@babel/preset-typescript`、`@babel/preset-flow`，这些都是按需安装使用的，后面介绍用法时你将了解它们的用途。

    在Babel 7之前，存在按年度区分的语法预设包如preset-es2015、preset-es2016、preset-es2017等，从Babel 7开始，Babel团队删除（并停止发布）了任何年度的preset（preset-es2015 等）， @babel/preset-env取代了对这些内容的需求，因为它包含了所有年度所添加内容以及针对特定浏览器集兼容的能力。

Babel工具集还包含一个叫做`@babel/polyfill`的库，作用是针对ES6+的一些新的内置API使用基础JS语法进行模拟实现，以适用较低版本的浏览器。而`@babel/core`只做语法（Syntax）转换（如class、箭头函数等），不实现Api polyfill。

    polyfill在英文中有垫片的意思，意为兜底的东西。

    @babel/polyfill模拟一个完全的 ES2015+ 的环境，实现了新的特性比如 Promise 或者 WeakMap， 静态方法比如Array.from 或 Object.assign, 实例方法 比如 Array.prototype.includes 和 generator 函数。

    从babel V7.4.0版本开始，已经不建议使用该包，建议使用core-js/stable、regenerator-runtime/runtime替代。

> 找个时间另外写一下这块的细节，可以先查阅官网文档[@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill)

除此之外，这里简单提一下Babel插件（Plugin）的概念，不做深入。在Babel中，代码转换功能以插件的形式出现，插件是小型的 JavaScript 程序，用于指导 Babel 如何对代码进行转换。你甚至可以编写自己的插件将你所需要的任何代码转换功能应用到你的代码上。Babel插件分为语法插件和转换插件两种：

    语法插件：大多数语法都可以被 Babel 转换。在极少数情况下（如果转换还没有实现，或者没有默认的方式来实现），你可以使用语法插件，例如@babel/plugin-syntax-bigint只允许 Babel解析特定类型的语法。

    转换插件：转换您的代码，转换插件将启用相应的语法插件，因此您不必同时指定两者。

实际上Babel预设（Preset）就是一组Babel插件的集合，比如Babel 6.0中的 `babel-preset-es2015` 包含所有跟ES6转换有关的插件。如果没有预设，babel转化是需要指定用什么插件的，虽然颗粒度小，效率高，但是插件需要逐个安装，还有严格的配置声明顺序。本文后面不再深入叙述插件相关的概念，等有时间将写一篇文章进一步深入学习Babel的原理。

## 基础用法

### 单独使用Babel

##### @babel/core + @babel/cli + @babel/preset-env

Babel 的核心功能包含在 @babel/core 模块中。通过以下命令安装：

```shell
npm install --save-dev @babel/core
```

你也可以在 JavaScript 程序中直接 require 并使用它：

```javascript
const babel = require("@babel/core");

babel.transformSync("code", optionsObject);
```

一般情况下，如果单独使用Babel来完成整个工作流，我们会借助`@babel/cli`实现在终端（命令行）中快速使用babel命令进行代码转换。

`@babel/cli` 是一个能够从终端（命令行）便捷使用`@babel/core`能力的工具。下面是其安装命令和基本用法：

```shell
npm install --save-dev @babel/core @babel/cli

./node_modules/.bin/babel src --out-dir lib
```

> 你可以利用 npm@5.2.0 所自带的 npm 包运行器将 `./node_modules/.bin/babel` 命令缩短为 `npx babel`. 后文将使用`npx`方式执行，不再赘述

这将解析 src 目录下的所有 JavaScript 文件，并应用我们所指定的代码转换功能，然后把每个文件输出到 lib 目录下。**由于我们还没有指定任何代码转换功能，所以输出的代码将与输入的代码相同（不保留原代码格式）**。

实际场景中，我们还需要安装其他转换插件作为参数传递进去，将它们集成到 `@babel/core` 工作流程中，来实现我们所需的指定规则代码转换功能。我们将只使用 `@babel/preset-env` 这一个插件预设来实现我们的基础功能。

在上面的基础上，继续执行：

```shell
npm install --save-dev @babel/preset-env

npx babel src --out-dir lib --presets=@babel/env
```

上面相比于之前的执行多了一个传参`--presets=@babel/env`，这将告诉 `@babel/cli` 使用 `@babel/core` 结合 `@babel/preset-env` 预设进行代码转换，在通过命令行传递 `preset` 时，我们也可以指定该 `preset` 的一些相关参数，对转换后的代码进行细节上的控制（例如可以控制转换后的JS代码版本需要支持哪些浏览器），但是因为这样的话命令会显得很长且十分繁琐，我们更喜欢将这些参数以JSON的格式存放到一个固定的配置文件中。

现在，我们首先创建一个名为 `babel.config.json` 的文件（需要 v7.8.0 或更高版本），并包含如下内容：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.25%, not dead"
      }
    ]
  ]
}
```

该配置表示仅包含浏览器市场份额 >0.25％ 的用户所需的代码转换。

官方也建议使用.browserslistrc文件来代替targets的配置：

```
> 0.25%
not dead
```

或者package.json：

```
{
    "browserslist": "> 0.25%, not dead"
}
```

有了上述配置文件之后，我们只需要这么执行就可以了：

```shell
npx babel src --out-dir lib
```

Babel支持更多的配置方式，详见[配置 Babel](https://www.babeljs.cn/docs/usage)，目前来说我们这么用就可以了。

### 结合Webpack使用Babel

实际项目中单独使用Babel的命令行工具来实现工作流的情况不是很多，更多的是结合Webpack使用。

在webpack.config.js中添加以下loader配置：

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      }
    ]
  }
}
```

然后安装相应的依赖：babel-loader、@babel/core、@babel/preset-env:

```shell
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

> 上面是将babel的preset参数配置在了webpack.config.js中，实际上也可以将它按照babel配置文件的原则提取出来单独一个babel.config.json文件，效果是一样的。

这样就完成了在webpack项目中添加Babel转换ES6+代码的功能。在webpack打包的过程中，会将源代码经由`babel-loader`处理转换为目标代码，这一执行过程对我们来只说是打包时“顺势而为”的，我们再也不用关心Babel本身的命令细节了。