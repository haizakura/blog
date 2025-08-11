---
title: BiliBili CTF 2020 「1024 程序员节」 Write Up
create: 2020-10-25T22:27:00+08:00
---

> 更新于2020年10月27日00:00

```
BCTF ❎

谜语大赛 ✅

真就硬猜，你根本不知道你要干什么，撞运气，试到有就有
```

> 第一题  页面的背后是什么？

题目地址：[http://45.113.201.36/index.html](http://45.113.201.36/index.html)

直接DevTool一把梭...

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4/img/post/2020-10-24_01.png#vwid=1297&vhei=873)

完事

> 第二题  真正的秘密只有特殊的设备才能看到

题目地址：[http://45.113.201.36/index.html](http://45.113.201.36/index.html)

虽然与第一题地址一样，但这边需要的是flag2...

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4/img/post/2020-10-24_02_01.png#vwid=1297&vhei=873)

根据页面提示`需要使用bilibili Security Browser浏览器访问～`

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4/img/post/2020-10-24_02_02.png#vwid=1297&vhei=873)

所以这边就直接修改浏览器的User Agent为`bilibili Security Browser`

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4/img/post/2020-10-24_02_03.png#vwid=1297&vhei=873)

完事

> 第三题  密码是啥？

题目地址：[http://45.113.201.36/login.html](http://45.113.201.36/login.html)

这波啊，暴力破解题？？？

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4/img/post/2020-10-24_03_01.png#vwid=1297&vhei=873)

别跑字典了，字典里绝对没有的，硬猜就完事啦【不会真有人用bilibili做密码吧，不会吧不会吧

```
管理员の账号：admin
管理员の密码：bilibili
```

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4/img/post/2020-10-24_03_02.png#vwid=1297&vhei=873)

完事

> 第四题  对不起，权限不足～

题目地址：[http://45.113.201.36/superadmin.html](http://45.113.201.36/superadmin.html)

这波啊，直接DevTool里Cookie的role的值改成`Administrator`的MD5值【在？为什么首字母大写？程序员拉出来祭天

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4/img/post/2020-10-24_04_01.png#vwid=1297&vhei=873)

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4/img/post/2020-10-24_04_02.png#vwid=1297&vhei=873)

完事

> 第五题  别人的秘密

题目地址：[http://45.113.201.36/user.html](http://45.113.201.36/user.html)

不会吧不会吧，又整个硬跑爆破的题？？？

直接写个脚本轮询爆破

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4/img/post/2020-10-24_05.png#vwid=1297&vhei=873)

完事

> 第六题  结束亦是开始

题目地址：[http://45.113.201.36/blog/single.php?id=1](http://45.113.201.36/blog/single.php?id=1)

【结果这波服务器直接给大佬们搞挂了

直接按大佬们说的去一趟GitHub

[https://github.com/interesting-1024/end](https://github.com/interesting-1024/end)

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4/img/post/2020-10-24_06_01.png#vwid=1297&vhei=873)

然后看一波`end.php`

```php
<?php

//filename end.php

$bilibili = "bilibili1024havefun";

$str = intval($_GET['id']);
$reg = preg_match('/\d/is', $_GET['id']);

if(!is_numeric($_GET['id']) and $reg !== 1 and $str === 1){
	$content = file_get_contents($_GET['url']);
	
	//文件路径猜解
	if (false){
		echo "还差一点点啦～";
	}else{
		echo $flag;
	}
}else{
	echo "你想要的不在这儿～";
}
?>
```

看完后得出其中一个参`id[]=1`

但还差一个参`url`

这波啊，又是硬猜得`http://120.92.151.189/blog/end.php?id[]=1&url=/api/ctf/6/flag.txt`

得到图片一张，用编辑器打开在末尾出得到

```
flag10:2ebd3b08-47ffc478-b49a5f9d-f6099d65
```

在？第六题给我出个flag10？

拿去提交第十题，过了

？？？那没事了

> 以下为更新内容

第六题其实为标准SQL盲注，但Referer带过滤，所以注入的时候需要将`select` `union`之类的关键字进行复写

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4.2/img/post/2020-10-26_06_02.png)

> 第七题

`需要少年自己去探索啦～`

> 以下为更新内容

直接访问 [http://45.113.201.36/api/images?file=../../../flag7.txt](http://45.113.201.36/api/images?file=../../../flag7.txt) 即可获取

![](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn@1.4.2/img/post/2020-10-26_07.png)

【纯爆破服务器爆破出来的

> 第八题

`flag8`被保存在`Redis`中

```bash
$ redis-cli 120.92.151.189:6379
$ keys *
$ get flag8
```

得到`flag8`

```
d436b982-2b81aa54-49a8d2db-87ab951a
```

完事

> 第九题

`需要少年自己去探索啦～`

> 第十题

从第六题得



- 作为CTF圈外CS狗，只能勉勉强强这样啦...【哭
