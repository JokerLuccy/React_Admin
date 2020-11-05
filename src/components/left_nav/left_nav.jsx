import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import { AppleOutlined } from "@ant-design/icons";
import "./index.css";
import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";

/* 
左侧导航的组件
*/
//菜单项
const { SubMenu } = Menu;
class LeftNav extends Component {
  /*  //根据menu的数据数组生成对应的标签数组
        item
          {
            title: '首页', // 菜单标题名称
            key: '/home', // 对应的 path
            icon: 'home', // 图标名称
            children:[]// may have or not
          }
      */
  getMenuNodes_map = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={<AppleOutlined />}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={item.key} title="商品" icon={<AppleOutlined />}>
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        );
      }
    });
  };
  getMenuNodes_reduce = (menuList) => {
    return menuList.reduce((pre, item) => {
      const path = this.props.location.pathname;

      //向pre中添加 <Menu.Item>
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key} icon={<AppleOutlined />}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        //查找一个与当前请求路径匹配的子item
        const cItem = item.children.find((cItem) => cItem.key === path);
        //如果存在,说明当前item的子列表需要展开
        if (cItem) {
          this.openKey = item.key;
        }
        pre.push(
          <SubMenu key={item.key} title="商品" icon={<AppleOutlined />}>
            {this.getMenuNodes_reduce(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };
  //在第一次render()之前执行一次,为第一个render()准备数据(必须同步)
  componentWillMount() {
    this.menuNodes = this.getMenuNodes_reduce(menuList);
  }

  render() {
    //得到当前请求的路由路径
    const path = this.props.location.pathname,
      openKey = this.openKey;
    // debugger;
    return (
      <div>
        <div className="left_nav">
          <Link to="/" className="left_nav_header">
            <img src={logo} alt="logo" />
            <h1>硅谷后台</h1>
          </Link>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          icon={<AppleOutlined />}
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          {/* {this.getMenuNodes_map(menuList)} */}
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}
/* 
  withRouter高阶组件:
    包装非路由组件,返回一个新的组件,新的组件向非路由组件传递3个属性:history/location/match
*/
export default withRouter(LeftNav);
