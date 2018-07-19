# fuhuaproject

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 项目规范

1. 项目统一用scss或者css书写style样式。
2. 布局禁止使用inline-block，使用手淘flexible中的flex加REM布局。
3. 如果是字体，或者需要根据dpr改变的，统一按照设计稿的大小写完以后，在后面加注释`/*px*/`.

    **一定要写，否则不会根据dpr动态改变字体大小**

```
h1 {
    font-size: 28px; /*px*/
  }
```

4. 项目文件夹统一在pages文件夹里，私有组件写在自己文件的文件夹里，文件夹安装页面内容命名，一定要有意义，见名知意，文件夹统一用index.vue承载组件。
5. Vue拆分组件规范和书写规范统一先看
[Vue.js 组件编码规范](https://pablohpsilva.github.io/vuejs-component-style-guide/#/chinese)，认真按照上面的文档要求书写和拆分组件。

6. 认真学习[Vue教程](https://cn.vuejs.org/v2/guide/)，和[Vux文档](https://vux.li/#/)。**学习vux文档中的插值用法。**


后台：

封装记录
dailog封装了vux的toast弹窗

this.api.post(premas, reponse => {

          }, true);
true代表只在点击成功后触发
