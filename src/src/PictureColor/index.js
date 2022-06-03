import React, { useState } from "react";
import { Space, Card, Input, Row, Col } from "antd";
import { PlusOutlined, PauseOutlined } from "@ant-design/icons";
import CropPic from "./CropPic";

const PictureColor = () => {
  const [params, setParams] = useState({
    paramA: -13.6,
    paramB: 138.1,
    paramC: -411.13,
    paramD: 472.45,
    paramY: 0,
    paramResult: 0,
  });
  const { paramA, paramB, paramC, paramD, paramY, paramResult } = params;
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <Card title="图片上传" size="large">
        <CropPic params={params} setParams={setParams} />
      </Card>
      <Card title="参数设置" size="large">
        <Input.Group size="large">
          <Row gutter={8}>
            <Col span={3}>
              <Input
                addonAfter="X³"
                value={paramA}
                onChange={(e, value) => setParams({ ...params, paramA: value })}
              />
            </Col>
            <Col span={1} style={{ paddingTop: "7px" }}>
              <PlusOutlined />
            </Col>
            <Col span={3}>
              <Input
                addonAfter="X²"
                value={paramB}
                onChange={(e, value) => setParams({ ...params, paramB: value })}
              />
            </Col>
            <Col span={1} style={{ paddingTop: "7px" }}>
              <PlusOutlined />
            </Col>
            <Col span={3}>
              <Input
                addonAfter="X"
                value={paramC}
                onChange={(e, value) => setParams({ ...params, paramC: value })}
              />
            </Col>
            <Col span={1} style={{ paddingTop: "7px" }}>
              <PlusOutlined />
            </Col>
            <Col span={3}>
              <Input
                value={paramD}
                onChange={(e, value) => setParams({ ...params, paramD: value })}
              />
            </Col>
            <Col span={1} style={{ paddingTop: "9px" }}>
              <PauseOutlined rotate={90} />
            </Col>
            <Col span={4} style={{ paddingTop: "2px", fontSize: 22 }}>
              255 - {paramY.toFixed(3)}
            </Col>
            {/* <Col span={2}>
              <Input
                value={paramY}
                onChange={(e, value) => setParams({ ...params, paramY: value })}
              />
            </Col> */}
          </Row>
        </Input.Group>
        <Row style={{ paddingTop: "20px" }}>
          <Col span={2} style={{ paddingTop: "2px", fontSize: 22 }}>
            Result
          </Col>
          <Col span={1} style={{ paddingTop: "9px" }}>
            <PauseOutlined rotate={90} />
          </Col>
          <Col span={3} style={{ paddingTop: "2px", fontSize: 22 }}>
            {paramResult || "0"}
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default PictureColor;
