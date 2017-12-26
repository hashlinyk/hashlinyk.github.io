---
title: 一个简单抽奖算法：从数组中“一次性”随机抽取若干个不重复项
date: 2017-12-20 08:57:19
tags: 算法
reward: true
copyright: true
---

曾经看到过一篇关于程序员年会抽奖的搞笑漫画[《年会上的程序员们……》](http://mp.weixin.qq.com/s/X0ms_tCvkvQkSXnAXWNJ5g)，当时只是一笑了之。如今再看，却有了一个疑问：**如何从一个数组中“一次性”随机抽取若干个不重复项？**

![如何从一个数组中“一次性”随机抽取若干个不重复项？](/images/draw_joke.jpg)

<!-- more -->

### 一、“连续随机抽取出若干项”的不公平现象


本文标题之所以强调“一次性”，是因为“连续取”存在一个“不公平现象”。看一段js实现“从一个数组中连续随机抽取5个不重复项”的功能的代码：（*本文中提到的随机都是指伪随机，不涉及真随机*）

```javascript
    const drawNumber = 5;                    //设置默认抽奖个数

    let originList = [1,2,3,4,5,6,7,8,9,0];  //抽奖面向的用户集合

    function draw( originList ){
        let luckyList = [];

        for (let i=0; i<drawNumber; i++){
            let randomIndex = Math.floor( Math.random() * originList.length );  //生成随机索引
            luckyList.push( originList.splice(randomIndex, 1)[0] );             //抽奖
        }

        return luckyList;
    }

    draw( originList );      //结果：随机的五个项构成的一个数组
```

上面的例子中，生成了5次随机数，并相应**“抽”了5次奖**。

之所以说它是不够公平的，原因在于对于第一个抽中的项来说，它被抽中的概率是1/10；而第二次某个项被抽中的概率则增大为1/9，第三次继续增大为1/8……可以看到，越往后，某个项被抽中的概率会越来越大，失去了“绝对公平”性。

为了保证公平，最好是能够“一次性”把五个项直接抽出来，如何去实现这个“一次性”呢？

### 二、“一次性抽取出若干项”的实现


上述方法的问题不在于生成了5次随机数，而在于抽了5次奖，如何将5次缩短至1次是应该考虑的问题。

想来想去，我想出这样一种方法：

* **数组的每一项生成一个与之关联对应的随机数**，由于随机数是“随机”的，我们无法预测到数组中的某个项会生成什么样的随机数，是大或是小，这对于数组每一项来说都是“公平”的。

* **对所有随机数产生的集合做一个大小排序，取前5位较大值（或较小值等等自定义判断规则），即抽1次**！由于第一步的随机结果，所以本次结果也是随机的。
 
* **找到这5个随机数对应的数组项（根据第一步）**，这5个数组项就是我们要的随机**“抽奖结果”**

算法实现代码如下：

```javascript
    const drawNumber = 5;                    //设置默认抽奖个数

    let originList = [1,2,3,4,5,6,7,8,9,0];  //抽奖面向的用户集合

    function draw( originList ){
        let randomNumList = [];
        let luckyList = [];
        
        for(let i=0,len=originList.length; i<len; i++){ //每个数组项生成一个对应的随机数
            randomNumList.push({
                originIndex: i,
                randomNum: Math.random()
            });
        }

        randomNumList.sort(function(a, b){      //按随机数大小由大到小排序
            return b.randomNum - a.randomNum;   
        });
        
        //console.log(randomNumList.slice(0));

        randomNumList.length = drawNumber;       //截取前5个项
        luckyList = randomNumList.map(function(relation, i){//找到5个随机数项对应的数组项作为抽奖结果
            return originList[relation.originIndex];
        });

        return luckyList;
    }

    draw( originList );      //结果：随机的五个项构成的一个数组
```

在随机数生成以后，在进行“排序截取”前，谁都无法得知最终的结果是怎样的。只有在程序进行排序截取之后，结果才能得知，基本实现了公平的随机性。

如果有别的实现“一次性”抽取的算法，欢迎评论交流！
