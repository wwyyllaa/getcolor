import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import PictureColor from './PictureColor'
const { Header, Content, Footer } = Layout;

export default  () => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={[{
            key:'1',
            label: `页面`,
          }]}
      />
    </Header>
    <Content
      style={{
        padding: '0 50px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>主页</Breadcrumb.Item>
        <Breadcrumb.Item>图片采集</Breadcrumb.Item>
      </Breadcrumb>
      <PictureColor />
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Designed in 2022 v2.0.2
    </Footer>
  </Layout>
);