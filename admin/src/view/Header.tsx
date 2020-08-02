import React from 'react';
import { Menu, Switch,Layout} from 'antd';
import { UserOutlined} from '@ant-design/icons';
const {Header} = Layout;


const HeaderComponent : React.FC<{}> = ()=>{
    const onThemeSwitch = (e : boolean)=> {
        document.body.style.backgroundColor = e ? '#ffffff' : '#000000';
    }

    return (
        <Header className="header" style={{display: 'flex'}}>
            <UserOutlined />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
            <Switch onChange={onThemeSwitch} />
        </Header>
    )
}

export default HeaderComponent;