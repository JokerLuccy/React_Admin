/* 
    进行local数据存储管理的工具模块
*/
//类似与localStorage 的一个库,考虑了兼容的问题,语法更加简洁
import store from "store";
const USER_KEY = "user_key";
export default {
  //保存user
  saveUser(user) {
    store.set(USER_KEY, user);
  },
  //读取user
  getUser() {
    return store.get(USER_KEY) || {};
  },
  //删除user
  removeUser() {
    store.remove(USER_KEY);
  },
};
