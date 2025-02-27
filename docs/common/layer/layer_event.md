## 图层事件

### inited

参数 option

- target 当前 layer
- type 事件类型

图层初始化完成后触发

```javascript
layer.on('inited', (option) => {});
```

### add

图层添加到 scene

参数 option

- target 当前 layer
- type 事件类型

```javascript
layer.on('add', (type) => console.log(type));
```

### remove

图层移除时触发

参数 option

- target 当前 layer
- type 事件类型

```javascript
layer.on('remove', (type) => console.log(type));
```

## 图层框选

### boxSelect

参数 option

- box [x1: number, y1: number, x2: number, y2: number] 相较于
- cb (...args: any[]) => void 传入的回调方法，返回框选内部的 feature

```javascript
layer.boxSelect(box, cb);
// (x1, y1), (x2, y2) 框选的方框左上角和右下角相对于地图左上角的像素坐标
// cb 是传入的回调函数，回调函数返回的参数是选中的 feature 对象数组，对象的字段和用户传入的数据相关
```
