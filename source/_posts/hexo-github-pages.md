---
title: 使用Hexo，如何在多台电脑上维护和更新github pages博客
date: 2017-03-23 22:51:40
tags: hexo
reward: true
---

今天在公司用hexo搭好博客之后，突然有个疑问：我想要回到家继续写文章、更新博客，该怎么办呢？

思路：**使用git分支**。

即用个人博客仓库的`master`分支来保存博客静态页面，新建另一个分支来保存hexo部署环境目录！之后每次博客的更新就在新分支上编辑和发布（deploy），把生成的博客页面推到`master`分支上。

话不多说，下面是我实践的方法（前四步是在公司电脑上，第五步是家里的电脑）：

<!-- more -->

一、准备工作
---

开始本教程之前，请确保你已经使用hexo在github pages上面部署好你的个人博客，并在本地电脑拥有该博客的部署环境，即类似于以下图片的文件目录（博客根目录）：

![hexo-github-pages博客部署环境文件目录](/images/9U31M0VVJ.png)

如果这一步还未完成，请自行搜索如何使用hexo搭建Github Pages个人博客，网上教程一大堆，不再赘述。

二、对username.github.io仓库新建分支，并克隆
---

在Github的<code>*username*.github.io</code>仓库上新建一个`xxx`分支，并切换到该分支，并在该仓库->Settings->Branches->Default branch中将默认分支设为`xxx`，save保存；然后将该仓库克隆到本地，进入该<code>*username*.github.io</code>文件目录。

完成上面步骤后，在当前目录使用Git Bash执行`git branch`命令查看当前所在分支，应为新建的分支`xxx`：

```bash
git branch
* xxx
```

三、将本地博客的部署文件拷贝进username.github.io文件目录
---

如题，先将本地博客的部署文件全部拷贝进<code>*username*.github.io</code>文件目录。

接下来，将拷贝进来的博客hexo部署环境提交到`xxx`分支，提交之前需注意：

>* 将`themes`目录以内中的主题的`.git`目录删除（如果有），因为一个git仓库中不能包含另一个git仓库，提交主题文件夹会失败。
>* 可能有人会问，删除了`themes`目录中的`.git`不就不能`git pull`更新主题了吗，很简单，需要更新主题时在另一个地方`git clone`下来该主题的最新版本，然后将内容拷到当前主题目录即可

四、提交xxx分支
---

执行`git add .`、`git commit -m 'back up hexo files'`（引号内容可改）、`git push`即可将博客的hexo部署环境提交到GitHub个人仓库的`xxx`分支。

现在可以在GitHub上的<code>*username*.github.io</code>仓库看到两个分支的差异了。

`master`分支和`xxx`分支各自保存着一个版本，`master`分支用于保存博客静态资源，提供博客页面供人访问；`xxx`分支用于备份博客部署文件，供自己维护更新，两者在一个GitHub仓库内互不冲突，完美！

五、新电脑环境部署和更新
---

至此，你的博客已经可以在其他电脑上进行同步的维护和更新了，方法很简单：

>* 将新电脑的生成的ssh key添加到GitHub账户上
>* 在新电脑上克隆<code>*username*.github.io</code>仓库的`xxx`分支到本地，此时本地git仓库处于`xxx`分支
>* 切换到<code>*username*.github.io</code>目录，执行`npm install`(由于仓库有一个`.gitignore`文件，里面默认是忽略掉`node_modules`文件夹的，也就是说仓库的hexo分支并没有存储该目录[也不需要]，所以需要install下)
>* 编辑、撰写文章或其他博客更新改动
>* 依次执行`git add .`、`git commit -m 'back up hexo files'`（引号内容可改）、`git push`指令，保证`xxx`分支版本最新
>* 执行`hexo d -g`指令（在此之前，有时可能需要执行`hexo clean`），完成后就会发现，最新改动已经更新到`master`分支了，两个分支互不干扰！

尽情地敲击键盘、挥洒笔墨吧！

**注意**：每次**换电脑进行博客更新**时，不管上次在其他电脑有没有更新（就怕更新之后忘了），最好先`git pull`获取`xxx`分支的最新版本，之后再进行编辑和提交。





>PS：转载请注明链接[http://linyk.me/2017/03/23/hexo-github-pages/](http://linyk.me/2017/03/23/hexo-github-pages/)
