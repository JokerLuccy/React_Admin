/* 
发送ajax请求的模块
封装axios库

1.优化:统一处理请求异常
  在外层包一个自己创建的promise对象,在请求出错时,不reject,而是错误提示
*/
import axios from "axios";
import { message } from "antd";
export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    type === "GET"
      ? (promise = axios.get(url, { params: data }))
      : (promise = axios.post(url, data));
    promise
      .then((response) => resolve(response.data))
      .catch((error) => message.error("请求出错" + error.message));
  });
}

//  let promise;
//     //1.执行异步ajax请求
//     if (type === "GET") {
//       //GET请求
//       promise = axios.get(url, {
//         params: data,
//       });
//     } else {
//       //POST请求
//       promise = axios.post(url, data);
//     }
//     //2.如果成功,调用resolve(value)
//     promise
//       .then((response) => {
//         resolve(response.data);
//         //3.如果失败了,不调用reject(reason),而是提示信息
//       })
//       .catch((error) => message.error("请求出错了" + error.message));
//   })
