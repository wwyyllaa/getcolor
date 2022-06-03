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
      <Card title="图片上传" size="large">
        <CropPic />
      </Card>

    </Space>
  );
};

export default PictureColor;
