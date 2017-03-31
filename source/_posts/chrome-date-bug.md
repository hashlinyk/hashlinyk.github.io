---
title: new Date解析日期字符串在不同浏览器的差异
date: 2017-03-31 10:42:35
tags: Javascript
reward: true
---

今天，偶然发现一个Chrome对于执行`new Date()`表达式产生的怪异现象，如下所示：

* Chrome F12控制台

```javascript
new Date("2017-03-31");     //打印： Fri Mar 31 2017 08:00:00 GMT+0800 (中国标准时间)

new Date("2017-3-31");      //打印： Fri Mar 31 2017 00:00:00 GMT+0800 (中国标准时间)
```

即在这种情况下，输出的结果差别是`08`时和`00`时。而在其他浏览器是这样的：

<!-- more -->

* Firefox控制台

```javascript
new Date("2017-03-31");     //打印： 2017-03-31T00:00:00.000Z

new Date("2017-3-31");      //打印： 2017-03-31T00:00:00.000Z

//结果一致
```


* IE控制台模拟：IE 9

```javascript
new Date("2017-03-31");     //打印： Fri Mar 31 08:00:00 UTC+0800 2017 

new Date("2017-3-31");      //打印： Invalid Date 
```

* IE控制台模拟：IE 7/8

```javascript
new Date("2017-03-31");     //打印： NaN 

new Date("2017-3-31");      //打印： NaN 
```

可以看到，Firefox得到的结果应该是和我们期望的一样，而IE......一如既往的给予我们惊喜。

**总结**：`new Date`对于日期字符串的解析因浏览器而异，为了保持最大兼容性的统一，建议使用以下格式：

```javascript
new Date(yyyy,mth,dd,hh,mm,ss);  //精确到秒
        
new Date(yyyy,mth,dd);           //精确到天
```


* **注意：以上的`mth`值为现实世界月份-1。**