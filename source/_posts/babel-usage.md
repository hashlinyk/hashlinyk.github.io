---
title: Babel 6.0之babel-cli和babel-core的用法和区别
date: 2017-03-31 06:12:52
tags: Babel
---

在Babel 6以前，Babel是一个专注且单一的Javascript转换器，然而Babel团队的志向不仅于此，更想把Babel打造成一个平台，由各个不同的功能模块和可插拔插件组成，用于创建下一代JavaScript工具集。

于是Babel 6发布了。

Babel 6本身不具有转换ES6代码的功能，也不再默认内嵌支持JSX语法，这一切都需要通过安装对应的转换器插件来实现。

<!-- more -->

在此之前，Babel囊括了整个编译器、所有的转换器以及一个CLI工具， 虽然方便使用，这么做的缺点就是它会导致很多不必要的下载。现在，Bable不再是一个整体包了，它分为了两个单独的包，`babel-cli`和`babel-core`。此外还有一些插件预设，如`babel-preset-es2015`、`babel-preset-react`等。

* 如果你想要在命令行使用Babel，你可以安装`babel-cli`
 
* 如果你需要在一个Node项目中使用Babel，你可以使用`babel-core`


> 参考：[走进Babel 6.0 全新特性解析](http://www.csdn.net/article/2015-11-17/2826233)