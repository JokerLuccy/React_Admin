/* 
登录的路由组件
*/
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.less";
import { reqLogin } from "../../api";
import logo from "../../assets/images/logo.png";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

export default class Login extends Component {
  //自定义密码检验
  validatorPass = (rule, value, callback) => {
    try {
      if (!value) {
        callback("密码必须输入");
      } else if (value.length < 4) {
        callback("密码长度不能小于4位");
      } else if (value.length > 12) {
        callback("密码长度不能大于12位");
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        callback("密码必须是英文、数字或下划线组成");
      } else {
        callback(); // 验证通过
      }
    } catch (error) {
      console.log(error);
    }
  };
  //自定义用户名检验
  validatorUser = (rule, value, callback) => {
    try {
      if (!value) {
        callback("密码必须输入");
      } else if (value.length < 4) {
        callback("密码长度不能小于4位");
      } else if (value.length > 12) {
        callback("密码长度不能大于12位");
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        callback("密码必须是英文、数字或下划线组成");
      } else {
        callback(); // 验证通过
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    //如果用户已经登陆,自动跳转到管理界面
    const user = memoryUtils.user;
    if (user && user._id) {
      return <Redirect to="/" />;
    }
    const onFinish = async (values) => {
      const { username, password } = values;
      //axios请求登录
      const result = await reqLogin(username, password); //成功{status:0,data:} 失败 {status:1,data}
      //把用户数据保存下来
      memoryUtils.user = result.data;
      storageUtils.saveUser(result.data); //把数据保存到本地
      if (result.status === 0) {
        //登录成功
        message.success("登录成功");
        //跳转到管理界面(不需要再回退回去,所以用replace)
        this.props.history.replace("/");
      } else {
        //登录失败
        message.error(result.msg);
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <div className="login">
        <header className="login_header">
          <img src={logo} alt="logo" />
          <h1>React项目:后台管理系统</h1>
        </header>
        <section className="login_content">
          <h2>用户登录</h2>
          {/* 
            用户名和密码的合法性要求
              -必须输入
              -必须大于4位
              -必须小于12位
              -必须是英文,数字或下划线组成
            
          */}
          <Form
            className="login_form"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[{ validator: this.validatorUser }]}
            >
              <Input
                prefix={<UserOutlined />}
                type="text"
                placeholder="用户名"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ validator: this.validatorPass }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login_form_button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

/* 
  1.前台表单验证
  2.收集表单输入数据
*/
