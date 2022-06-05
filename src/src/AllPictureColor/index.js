import React, { useState } from "react";
import { Space, Card, Input, Row, Col, Divider, Table, Button } from "antd";
import { PlusOutlined, PauseOutlined } from "@ant-design/icons";
import CropPic from "./CropPic";
import columns from "./columns";
import exportText from "../utils/exportText";
const XNUM = 8;
const YNUM = 12;
function getTableDataRectStr(tableData, divideValue) {
  const arrObj = [];
  let intensityStr = "";
  let concentrationStr = "";
  tableData.map((r) => {
    arrObj[r.key] = {
      intensity: 255 - r[2]?.["value"] || 0,
      concentration: r[2]?.["10^X"] / divideValue || 0,
    };
  });
  for (let j = 0; j < YNUM; j++) {
    for (let i = 0; i < XNUM; i++) {
      const index = i + j * XNUM;
      intensityStr += arrObj[index]["intensity"].toFixed(12);
      concentrationStr += arrObj[index]["concentration"].toFixed(16);
      if (i < XNUM - 1) {
        intensityStr += "\t";
        concentrationStr += "\t ";
      }
    }
    intensityStr += "\n";
    concentrationStr += "\n";
  }
  return [intensityStr, concentrationStr];
}

const PictureColor = ({
  aspect = 1,
  shape = "round",
  unit,
  divideValue,
  name,
}) => {
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
  const [intensityStr, concentrationStr] = getTableDataRectStr(
    tableData,
    divideValue
  );
  const exportData =
    "Intensity\n" + intensityStr + "\nConcentration\n" + concentrationStr;
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
          tableData={tableData}
          setTableData={setTableData}
          aspect={aspect}
          shape={shape}
        />
      </Card>
      <Card
        title={"Picture Analyzing(" + name.split("_")[1] + ")"}
        size="large"
        style={{ overflow: "scroll" }}
      >
        <canvas id="cropPicture"></canvas>
      </Card>
      <Card
        title={
          <span>
            <div>Order Intensity Concentration</div>
            <Button
              type={"primary"}
              size={"small"}
              onClick={() => {
                exportText("data.txt", exportData);
              }}
            >
              Export
            </Button>
          </span>
        }
        size="large"
      >
        <Table
          size={"small"}
          columns={columns(unit, divideValue)}
          dataSource={tableData}
          pagination={false}
          scroll={{ y: 800 }}
        />
      </Card>

      <Card title="Parameter Settings" size="large">
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
