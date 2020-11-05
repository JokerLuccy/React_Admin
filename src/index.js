//入口js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/antd/dist/antd.less";

import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils.jsx";

//读取Local中保存的user,保存到内存中
const user = storageUtils.getUser();
memoryUtils.user = user;
//将App组件标签渲染到index页面的div上
ReactDOM.render(<App />, document.getElementById("root"));
