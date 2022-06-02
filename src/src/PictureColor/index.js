import React, { useState } from "react";
import { Space, Card } from "antd";
import { Button } from "antd";
import CropPic from "./CropPic";

const PictureColor = () => {
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <Card title="Card" size="small">
        <CropPic />
      </Card>
      <Card title="Card" size="small">
        {/* <p>{avR}</p>
        <p>{avG}</p>
        <p>{avB}</p> */}
      </Card>
      <Card title="Card" size="small">
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
  );
};

export default PictureColor;
