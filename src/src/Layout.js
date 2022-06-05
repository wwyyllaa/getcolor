import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import PictureColor from "./PictureColor";
import AllPictureColor from "./AllPictureColor";
const { Header, Content, Footer } = Layout;

export default () => {
  const [key, setKey] = useState("2_H2O2");
  const defaultSingleProps = {
    aspect: 1,
    shape:'round',
  }
  const defaultMultiProps = {
    aspect: 714 / 1087,
    shape:'rect',
  }
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
              children: [
                {
                  key: "1_H2O2",
                  label: (
                    <span>
                      H<sub>2</sub>O<sub>2</sub>
                    </span>
                  ),
                },
                {
                  key: "1_Glucose",
                  label: (
                    <span>
                      1_Glucose
                    </span>
                  ),
                },
                {
                  key: "1_Uric acid",
                  label: (
                    <span>
                      Uric acid
                    </span>
                  ),
                },
              ],
            },
            {
              key: "2",
              label: `多通道采集`,
              children: [
                {
                  key: "2_H2O2",
                  label: (
                    <span>
                      H<sub>2</sub>O<sub>2</sub>
                    </span>
                  ),
                },
                {
                  key: "2_Glucose",
                  label: (
                    <span>
                      1_Glucose
                    </span>
                  ),
                },
                {
                  key: "2_Uric acid",
                  label: (
                    <span>
                      Uric acid
                    </span>
                  ),
                },
              ],
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
        {key === "1_H2O2" && <PictureColor name={"1_H2O2"} {...defaultSingleProps} unit={'μM'} divideValue={1} />}
        {key === "1_Glucose" && <PictureColor name={"1_Glucose"}  {...defaultSingleProps} unit={'mM'} divideValue={1000} />}
        {key === "1_Uric acid" && <PictureColor name={"1_Uric acid"}  {...defaultSingleProps} unit={'μM'} divideValue={1} />}
        {key === "2_H2O2" && <AllPictureColor name={"2_H2O2"}  {...defaultMultiProps} unit={'μM'} divideValue={1} />}
        {key === "2_Glucose" && <AllPictureColor name={"2_Glucose"}  {...defaultMultiProps} unit={'mM'} divideValue={1000} />}
        {key === "2_Uric acid" && <AllPictureColor name={"2_Uric acid"}  {...defaultMultiProps} unit={'μM'} divideValue={1}/>}
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Designed in 2022 v3.2.3
      </Footer>
    </Layout>
  );
};
