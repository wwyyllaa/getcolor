import React, { useState } from "react";
import { Space, Card, Input, Row, Col, Divider } from "antd";
import { PlusOutlined, PauseOutlined } from "@ant-design/icons";
import CropPic from "./CropPic";

const PictureColor = ({
  aspect = 1,
  shape = "round",
  unit,
  divideValue,
  name,
}) => {
  const [params, setParams] = useState({
    paramA: 87.69,
    paramB: 7.5,
    paramC: 3.48,
    paramD: 195.24,
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
      <Card title="Picture" size="large">
        <CropPic
          params={params}
          setParams={setParams}
          aspect={aspect}
          shape={shape}
        />
      </Card>
      <Card title={"Result(" + name.split('_')[1] + ")"} size="large">
        <Row style={{ paddingTop: "20px" }}>
          <Col
            xs={9}
            sm={8}
            md={6}
            lg={5}
            xl={3}
            style={{ paddingTop: "2px", fontSize: 16, ...commonStyle }}
          >
            Intensity
          </Col>
          <Col span={2} style={{ paddingTop: "6px" }}>
            <PauseOutlined rotate={90} />
          </Col>
          <Col
            xs={8}
            sm={7}
            md={6}
            lg={5}
            xl={3}
            style={{ paddingTop: "2px", fontSize: 16 }}
          >
            {paramY && (255 - paramY).toFixed(6)}
          </Col>
        </Row>
        <Row style={{ paddingTop: "20px" }}>
          <Col
            xs={9}
            sm={8}
            md={6}
            lg={5}
            xl={3}
            style={{ paddingTop: "2px", fontSize: 16 }}
          >
            Concentration
          </Col>
          <Col span={2} style={{ paddingTop: "6px" }}>
            <PauseOutlined rotate={90} />
          </Col>
          <Col
            xs={9}
            sm={7}
            md={6}
            lg={5}
            xl={3}
            style={{ paddingTop: "2px", fontSize: 16 }}
          >
            {((typeof Math.pow(paramResult) === "number" &&
              paramResult) / divideValue).toFixed(2) || "0"}
            {unit}
          </Col>
        </Row>
      </Card>
      <Card title={"Parameter Settings(" + name.split('_')[1] + ")"} size="large">
      <Input.Group size="large">
          <Row gutter={8}>
            <Col xs={15} sm={12} md={10} lg={9} xl={6} style={{ ...commonStyle }}>
              <Input
                addonBefore="a="
                value={paramA}
                onChange={(e) =>
                  setParams({ ...params, paramA: e.target.value })
                }
              />
            </Col>
            <Col xs={15} sm={12} md={10} lg={9} xl={6} style={{ ...commonStyle }}>
              <Input
                addonBefore="b="
                value={paramB}
                onChange={(e) =>
                  setParams({ ...params, paramB: e.target.value })
                }
              />
            </Col>
            <Col xs={15} sm={12} md={10} lg={9} xl={6} style={{ ...commonStyle }}>
              <Input
                addonBefore="c="
                value={paramC}
                onChange={(e) =>
                  setParams({ ...params, paramC: e.target.value })
                }
              />
            </Col>
            <Col xs={15} sm={12} md={10} lg={9} xl={6} style={{ ...commonStyle }}>
              <Input
                addonBefore="d="
                value={paramD}
                onChange={(e) =>
                  setParams({ ...params, paramD: e.target.value })
                }
              />
            </Col>
          </Row>
        </Input.Group>
      </Card>
    </Space>
  );
};

export default PictureColor;
