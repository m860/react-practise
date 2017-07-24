# 规范

## 组件/页面
* 文件名称必须和class名称一模一样
* class的名称首字母必须大写,因此对应文件首字母也是大写
* 一个文件只能包含一个class,且必须使用 export default 进行导出

## Redux
* 所有的action和reducer都定义在一个文件里
* 一个文件对应一个reducer,且以export default进行导出
* 文件必须以.ar.js结尾
* 新增的reducer需要在index.js中进行合并
* 所有的reducer都必须放在文件夹ar下

## Route配置
* 路由的配置有先后顺序
* route中的component全部使用异步的方式,示例代码:
```javascript
{
	path: '404',
	getComponent: (location, callback)=> {
		require.ensure([], (require)=> {
			callback(null, require("../pages/404.js").default);
		});
    }
}
```
或者使用
```javascript
{
	path: 'todo',
	indexRoute: {
		getComponent:(location,callback)=>{
			System.import("../pages/todo/List")
				.then(m=>{
					callback(null,m.default);
				});
		}
	}
}
```
还可以使用aync/await,这种方式值得推荐
```javascript
{
	path: "test",
	indexRoute: {
		async getComponent(location, callback) {
			let module=await System.import("../pages/test/Page1.js");
			callback(null,module.default);
		}
	},
	childRoutes: []
}
```

## Sass
* 一个sass文件标示一个样式集合,比如button.sass里就只能包含和button相关的样式定义
* app.sass是样式主文件,其他样式集合需要在app.sass中进行import
* 样式定义不需要添加vendor前缀,全部按照标准的css/css3进行定义
* 所有的布局采用flex进行布局

## 全局变量
* React
* ReactDOM
* classNames