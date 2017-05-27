# drag-sort
基于jQuery的拖动排序程序<br>
![demo.png](https://github.com/ylb1992/drag-sort/blob/master/demo/images/demo.png)

# Usage

## 作为jQuery plugin 使用
1. html结构
```
<ul id="wrap">
    <li> ... </li>
    <li> ... </li>
    <li> ... </li>
    ...
</ul>
```
2. 引入jQuery和drag-sort.js

```
<script src="http://code.jquery.com/jquery-2.1.0.min.js" type="text/javascript"></script>
<script src="../drag-sort.js" type="text/javascript"></script>
```
3. 使用drag-sort进行排序

```
$('#wrap').dragSort();
```

## 作为模块使用（以Seajs模块为例）drag-sort-module.js
1. html结构同上
2. 导入drag-sort模块

```
var DragSort = require('drag-sort-module');
```
3. 初始化drag-sort

```
DragSort($('#wrap'), {
    targetEle: 'li'
});
```

# API

<table>
    <tr>
        <th>param</th>
        <th>type</th>
        <th>description</th>
    </tr>
    <tr>
        <td>targetEle</td>
        <td>{String} </td>
        <td>可选，排序元素的DOM选择器字符串，默认li</td>
    </tr>
    <tr>
        <td>dragStyle</td>
        <td>{Object} </td>
        <td>可选， 拖动时，占位元素的样式</td>
    </tr>
    <tr>
        <td>replaceStyle</td>
        <td>{Object} </td>
        <td>可选， 拖动时，占位元素的样式</td>
    </tr>
</table>

# License

MIT
