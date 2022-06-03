import React, { useState } from "react";
import { Space, Card, Input, Row, Col, Divider } from "antd";
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
  const commonStyle = { marginTop: 3 };
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
            <Col xs={12} sm={9} md={7} lg={6} xl={3} style={{ ...commonStyle }}>
              <Input
                addonAfter="X³"
                value={paramA}
                onChange={(e) =>
                  setParams({ ...params, paramA: e.target.value })
                }
              />
            </Col>
            <Col
              span={1}
              style={{ paddingTop: "7px" }}
              style={{ ...commonStyle }}
            >
              <PlusOutlined />
            </Col>
            <Col xs={12} sm={9} md={7} lg={6} xl={3} style={{ ...commonStyle }}>
              <Input
                addonAfter="X²"
                value={paramB}
                onChange={(e) =>
                  setParams({ ...params, paramB: e.target.value })
                }
              />
            </Col>
            <Col
              span={1}
              style={{ paddingTop: "7px" }}
              style={{ ...commonStyle }}
            >
              <PlusOutlined />
            </Col>
            <Col xs={12} sm={9} md={7} lg={6} xl={3} style={{ ...commonStyle }}>
              <Input
                addonAfter="X"
                value={paramC}
                onChange={(e) =>
                  setParams({ ...params, paramC: e.target.value })
                }
              />
            </Col>
            <Col
              span={1}
              style={{ paddingTop: "7px" }}
              style={{ ...commonStyle }}
            >
              <PlusOutlined />
            </Col>
            <Col xs={12} sm={9} md={7} lg={6} xl={3} style={{ ...commonStyle }}>
              <Input
                value={paramD}
                onChange={(e) =>
                  setParams({ ...params, paramD: e.target.value })
                }
              />
            </Col>
            <Col
              span={1}
              style={{ paddingTop: "9px" }}
              style={{ ...commonStyle }}
            >
              <PauseOutlined rotate={90} />
            </Col>
            <Col
              xs={14}
              sm={10}
              md={9}
              lg={7}
              xl={4}
              style={{ paddingTop: "2px", fontSize: 22, ...commonStyle }}
            >
              255 - {paramY.toFixed(3)}
            </Col>
          </Row>
        </Input.Group>
        <Divider />
        <Row style={{ paddingTop: "20px" }}>
          <Col
            xs={6}
            sm={5}
            md={4}
            lg={3}
            xl={2}
            style={{ paddingTop: "2px", fontSize: 22, ...commonStyle }}
          >
            X
          </Col>
          <Col span={2} style={{ paddingTop: "9px" }}>
            <PauseOutlined rotate={90} />
          </Col>
          <Col
            xs={8}
            sm={7}
            md={6}
            lg={5}
            xl={3}
            style={{ paddingTop: "2px", fontSize: 22 }}
          >
            {(typeof paramResult === "number" && paramResult.toFixed(6)) || "0"}
          </Col>
        </Row>
        <Row style={{ paddingTop: "20px" }}>
          <Col
            xs={6}
            sm={5}
            md={4}
            lg={3}
            xl={2}
            style={{ paddingTop: "2px", fontSize: 22 }}
          >
            10^X
          </Col>
          <Col span={2} style={{ paddingTop: "9px" }}>
            <PauseOutlined rotate={90} />
          </Col>
          <Col
            xs={9}
            sm={7}
            md={6}
            lg={5}
            xl={3}
            style={{ paddingTop: "2px", fontSize: 22 }}
          >
            {(typeof Math.log(paramResult) === "number" &&
              Math.pow(10, paramResult).toFixed(6)) ||
              "0"}
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default PictureColor;
