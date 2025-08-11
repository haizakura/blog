---
title: 快速转换VTT字幕与SRT字幕
create: 2021-04-20T20:54:00+08:00
---

之前有段时间在 [微软Channel 9](https://channel9.msdn.com/) 看教程视频，然后后来因为太忙了没时间看，就把视频和字幕下载下来准备以后有时间再看。最近因为一只蝙蝠从而使得出奇的空闲，点开视频准备好好学习一下【bushi】。

当一切都准备就绪准备看了的时候，我字幕n呢！？关掉一看，字幕格式是vtt，打扰了。搞快搜了一下在线转换，都只能一个个上传转换，再次打扰了，我这几百个怕不是得累死我。然后看了下vtt跟srt的格式差别，感觉差距也不大，干脆就直接自己造个轮子，写了个批量转换工具。

![VTT字幕 与 SRT字幕](https://cdn.jsdelivr.net/gh/HAIZAKURA/cdn/img/post/2020-02-17_154532.png#vwid=1297&vhei=873)

> Python 代码
>
> *前往 [GitHub](https://github.com/haizakura/transVttSrt) 查看本项目*

````python
import os
import re

path = os.path.split(os.path.realpath(__file__))

def getFileName(key):
    FileName = []
    for getFile in os.listdir(path[0]):
        if key == 'A':
            if os.path.splitext(getFile)[1] == '.vtt':
                FileName.append(os.path.splitext(getFile)[0])
        elif key == 'B':
            if os.path.splitext(getFile)[1] == '.srt':
                FileName.append(os.path.splitext(getFile)[0])
    return FileName

def vtt2srt(inFileName):
    subNo = 1
    outFileName = inFileName + '.srt'
    inFileName = inFileName + '.vtt'
    with open(inFileName, 'r', encoding='utf-8') as procFile:
        outFile = open(outFileName, 'w+', encoding='utf-8')
        for lineIndex, lineContent in enumerate(procFile.readlines()):
            if lineIndex > 0 and len(lineContent.strip()) != 0:
                if re.match('(\d{2}:\d{2}:\d{2}).(\d{3})', lineContent):
                    outFile.write('\n' + str(subNo) + '\n')
                    lineContent = re.sub('(\d{2}:\d{2}:\d{2}).(\d{3})', lambda m: m.group(1) + ',' + m.group(2), lineContent)
                    subNo += 1
                outFile.write(lineContent)
    outFile.close()
    print('[' + inFileName + '] transform completed!')

def srt2vtt(inFileName):
    subNo = 1
    outFileName = inFileName + '.vtt'
    inFileName = inFileName + '.srt'
    with open(inFileName, 'r', encoding='utf-8') as procFile:
        outFile = open(outFileName, 'w+', encoding='utf-8')
        outFile.write('WEBVTT\n')
        for lineContent in procFile.readlines():
            if lineContent.strip() == str(subNo):
                subNo += 1
                pass
            else:
                if re.match('(\d{2}:\d{2}:\d{2}),(\d{3})', lineContent):
                    lineContent = re.sub('(\d{2}:\d{2}:\d{2}),(\d{3})', lambda m: m.group(1) + '.' + m.group(2), lineContent)
                outFile.write(lineContent)
    outFile.close()
    print('[' + inFileName + '] transform completed!')

def main():
    key = input('[A] vtt->srt || [B] srt->vtt\n')
    print()
    if key == 'A':
        allFileName = getFileName(key)
        if allFileName == []:
            print('There are no vtt files here.')
        else:
            for fileName in allFileName:
                vtt2srt(fileName)
    elif key == 'B':
        allFileName = getFileName(key)
        if allFileName == []:
            print('There are no srt files here.')
        else:
            for fileName in allFileName:
                srt2vtt(fileName)
    else:
        print('Wrong method. Please input again.')
        main()

if __name__ == '__main__':
    print('\n[Notice] Current directory: ' + path[0])
    print('\nPlease select the method of subtitle transforming.')
    main()
    input("\nMission Completed.\nPress any key to exit.")
````

Q.E.D.
