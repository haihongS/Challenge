# bet-coin

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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 手动部署

``` bash
cd 到项目目录

npm run build

# 需要先在https://hub.docker.com注册账号
docker login

# username是你在https://hub.docker.com/上的用户名
# repo是你在https://hub.docker.com/创建的repo名
# tag代表版本号，自己随便起，每次代码更新后，记得用新的一个tag
docker build -t username/repo:tag .
docker push username/repo:tag

# Example:
docker build -t kjlmfe/dd:v1 .
docker push kjlmfe/dd:v1
```

访问https://console.cloud.google.com/kubernetes/deployment/asia-east1-c/cluster-1/default/frontend?project=andoromeda-198508&authuser=1&tab=overview&duration=PT1H&deployment_overview_active_revisions_tablesize=50&pod_summary_list_tablesize=20


![image](https://user-images.githubusercontent.com/1238134/37605686-b3cd0d10-2bce-11e8-8882-4c05e55454e2.png)
按照上图指示，点击'滚动更新'


![image](https://user-images.githubusercontent.com/1238134/37605809-fe595316-2bce-11e8-8bcc-f9fb9ebb35bd.png)
在映像那里，填入上面你执行`docker push username/repo:tag`时后面的参数，然后点击更新即可，过一会就生效了
了

