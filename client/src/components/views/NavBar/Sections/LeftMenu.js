import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="subscription"> {/*여기 키도 mail이 아닌 subscription으로 바꿔줘야 버튼 두개가 분리된다.*/}
      <a href="/subscription">Subscription</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu