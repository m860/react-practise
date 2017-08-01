# React Practise

## common guideline

* 所有的资源文件放在`/assets`中
* component必须继承`/components/BaseComponent.js`
* page必须继承`/pages/BasePage.js`
* 所有的component的定义放在目录`/components`中,文件名定义单次首字母大写
* 所有page的定义放在目录`/pages`中,文件名定义单次首字母大写
* 所有类型的定义都需要定义在`/types.js`文件中
* 所有js采用js flow语法
* 所有page的root node建议使用`Layout`

## config

* 所有的配置文件必须以`.config.js进行结尾`
* `app.ENV.config.js`文件有点特殊,需要按照环境进行配置,且在引用的时候需要按照下面的方式进行引用
    ```javascript
    //固定写法
    import config from 'config'
    ```

## redux

* reducer和action的定义需要定义在一个文件中且文件名以`.ar.js`结尾,如:test.ar.js.
* .ar.js文件保存在目录`/ar`中
* /ar目录中包含一个index.js文件,定义的所有.ar.js需要在index.js中进行统一导出
* action的数据结构采用react推荐的数据结构,定义在types.js中 `ActionTypes`
* `action.type`建议使用guid,如果不使用guid请保证其唯一性
* 默认情况下redux中的数据会持久化到`localstorage`

## css

* 支持`css` `sass`
* 所有的布局采用flex布局
* 基础样式包括: `materialize-css` `font-awesome`
* 所有样式文件按照模块以文件的形式进行切分,如导航栏:nav.sass,然后在`app.sass`中引入模块

## command

* 启动开发环境
    ```shell
    $ npm run dev
    ```

## component

### Nav

#### props

##### title:`?String="TITLE"`
标题,.可以在`app.ENV.config.js`中进行全局配置

##### renderLogo:`?Function=()=>null`
render logo,需要返回一个React Node对象,可以在`app.ENV.config.js`中进行全局配置

### DataTable

#### props

##### columns:`Object`
```javascript
type ColumnType={
	name:String,
	className:?String,
	style:?Object,
	//@desc render函数包含4个参数,依次是rowData,rowIndex,column,columnIndex
	//@return String|HTML Element|React Node
	render:Function
};
```
name和render是必须提供.name设置列的名称,render设置列的样式和数据.
```javascript
//Example1 
//render直接返回数据
const columns=[{
    name: "Name",
    render: (rowData)=>rowData['name']
}]

//Example2
//render返回一个Element
const columns=[{
    name: "Name",
    render: (rowData)=>(<span>{rowData['name']}</span>)
}]
```
##### dataSource:`?Array=[]`
##### style:`?Object={}`
##### className:`?String="striped"`
##### renderDataEmpty:`?Function`

### Pagination

#### props

##### startPageNumber:`?Number=0`
设置起始分页位置,0或者1开始分页

##### pageIndex:`?Number=0`
##### pageSize:`?Number=10`
##### onPageChange:`Function`
onPageChange包含一个参数
```type
{
  pageIndex:Number,
  pageSize:Number,
  startPageNumber:Number
}
```

##### total:`Number`
总记录数

##### style:`?Object`
##### className:`?String`
##### displayPageCount:`?Number=5`
显示的页码的个数

### DataTableWithPagination

#### props

#### [...DataTable.propTypes](#datatable)
#### [...Pagination.propTypes](#pagination)
##### style:`?Object`
##### className:`?String`
##### showIndex:`?Boolean`
是否显示索引

### Panel
#### props
##### title:`String|Node|Element`
##### renderRight:`Function`
##### style:`?Object`
##### className:`?String`

### CollapsiblePanel
#### props
##### title:`String|Node|Element`
##### renderRight:`Function`
##### style:`?Object`
##### className:`?String`
##### expand:`Boolean`
##### onChange:`Function`

### UploadFile
#### props
##### files:`Array.<File>`
##### onChange:`Function`

## TODO

- [ ] 添加flow语法检查
