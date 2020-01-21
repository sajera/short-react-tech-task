
# React application dummy **(RAD)**

This example was created to accelerate the start of the project using "React.js". Project based on **react-create-app**
( [GITHUB](https://github.com/facebookincubator/create-react-app) )
( [GUIDE](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) )

## connected packages
- [React](https://reactjs.org)
- [Axios](https://www.npmjs.com/package/axios)
- [Lodash](https://lodash.com/docs)
- [Moment](https://momentjs.com)
- [reactstrap](https://reactstrap.github.io)
- [react-redux](https://github.com/reactjs/react-redux)
- [react-router](https://reacttraining.com/react-router/web/example/basic)
- [redux-form](https://redux-form.com)
- [react-redux-toastr](https://www.npmjs.com/package/react-redux-toastr)
- [redux-saga](https://redux-saga.js.org)
- [fortawesome](https://fontawesome.com/start)


### Introduction

Whenever there is a need to write a new web interface using React.js, we are faced with the problem of a lack of basic abstractions. Possessing a powerful template engine, React absolutely does not solve the issues of code organization. In this connection we are forced to solve these problems every time. We are helped to solve them by Babel (ES6) preprocessor. But this is not enough when there is a need to organize the structure of the project. In this application billet, a minimal set of proven ready-made solutions for the development of medium and large "admin" applications is collected.


#### Fork
```
> git clone https://SPerekhrest@bitbucket.org/SPerekhrest/rad.git
```
#### install dependencies.
```
> npm install
```
> Without environment configuration used the **develpment** config.
#### Run
```
> npm run start
```

#### Build

```
> npm run build
```


#### To setup configuration without depending on build type.
Flow of **react-create-app** [GUIDE](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) fully supported. To setup client side configuration simplify flow using non standard ```env``` **REACT_APP_ENV**. To run project localy with some specific configuration define configuration file for example ```./environment/local.json```. Setup in to **REACT_APP_ENV**(environment variable) file name **local** and run project. 

**WINOWS**
```
> set REACT_APP_ENV=local&& npm run start
```
**Linux**
```
> export REACT_APP_ENV=local&& npm run start
```



##### Example DEVELOPMENT build
Default value for configuration is **development**. Source of configuration file ```./environment/development.json``` 

**WINOWS** or **Linux**
```
> npm run build
```

##### Example PRODUCTION build
Define a source file for production configuration **production** for example. Source of configuration file ```./environment/production.json```

**WINOWS**
```
> set REACT_APP_ENV=production&& npm run build
```
**Linux**
```
> export REACT_APP_ENV=production&& npm run build
```
