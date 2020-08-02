import React from 'react';
import './App.less';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Layout ,Menu} from 'antd';
import MainPage from './pages/main';
const { SubMenu } = Menu;
const { Sider } = Layout;

function App() {
  return (
      <Layout style={{ minHeight: '100vh' }}>
              <MainPage/>
       </Layout>   
    
  );
}

export default App;
