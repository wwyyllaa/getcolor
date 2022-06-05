import React, { useState } from "react";
import { Space, Card, Input, Row, Col, Divider, Table } from "antd";
import { PlusOutlined, PauseOutlined } from "@ant-design/icons";
import CropPic from "./CropPic";
import columns from "./columns";
const XNUM = 8;
const YNUM = 12;

const PictureColor = ({ aspect = 1, shape = "round" }) => {
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
  const [tableData, setTableData] = useState(
    new Array(XNUM * YNUM).fill({}).map((r, i) => {
      return { key: i };
    })
  );
  console.log(tableData);
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <Card title="图片上传" size="large">
        <CropPic
          params={params}
          setParams={setParams}
          tableData={tableData}
          setTableData={setTableData}
          aspect={aspect}
          shape={shape}
        />
      </Card>
      <Card title="计算值列表" size="large">
        <Table columns={columns} dataSource={tableData} scroll={{ x: 1500 }} />
      </Card>

      <Card title="切割图片" size="large" style={{overflow:'scroll'}}>
        <canvas id="cropPicture"></canvas>
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
              255 - avB
            </Col>
          </Row>
        </Input.Group>
        <Divider />
      </Card>
    </Space>
  );
};

export default PictureColor;
