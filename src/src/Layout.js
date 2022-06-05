import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import PictureColor from "./PictureColor";
import AllPictureColor from "./AllPictureColor";
const { Header, Content, Footer } = Layout;

export default () => {
  const [key, setKey] = useState("2");
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[key]}
          items={[
            {
              key: "1",
              label: `单通道采集`,
            },
            {
              key: "2",
              label: `多通道采集`,
            },
          ]}
          onClick={(e) => {
            setKey(e.key);
          }}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        {key === "1" && <PictureColor aspect={1} shape={"round"} />}
        {key === "2" && <AllPictureColor aspect={714/1087} shape={"rect"} />}
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Designed in 2022 v3.1.1
      </Footer>
    </Layout>
  );
};
