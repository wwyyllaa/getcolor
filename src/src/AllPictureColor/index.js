import React, { useState } from "react";
import { Space, Card, Input, Row, Col, Divider, Table, Button } from "antd";
import { PlusOutlined, PauseOutlined } from "@ant-design/icons";
import CropPic from "./CropPic";
import columns from "./columns";
import exportText from "../utils/exportText";
import getCurrentTime from "../utils/gettime";
const XNUM = 8;
const YNUM = 12;
function getTableDataRectStr(tableData, divideValue, divdeChar = "\t") {
  const arrObj = [];
  let intensityStr = "";
  let concentrationStr = "";
  tableData.map((r) => {
    arrObj[r.key] = {
      intensity: 255 - r[2]?.["value"] || 0,
      concentration: r[2]?.["10^X"] / divideValue || 0,
    };
  });
  intensityStr = ['','A','B','C','D','E','F','G','H'].toString(divdeChar)
  concentrationStr = ['','A','B','C','D','E','F','G','H'].toString(divdeChar)
  intensityStr += "\n";
  concentrationStr += "\n";
  for (let j = 0; j < YNUM; j++) {
    for (let i = 0; i < XNUM + 1; i++) {
      if(i===0){
        intensityStr = intensityStr+String(j+1)+divdeChar;
        concentrationStr =  concentrationStr+String(j+1)+divdeChar;
      }else{
        const index = i-1 + j * XNUM;
        intensityStr += arrObj[index]["intensity"].toFixed(12);
        concentrationStr += arrObj[index]["concentration"].toFixed(16);
        if (i < XNUM ) {
          intensityStr += divdeChar;
          concentrationStr += divdeChar;
        }
      }
    }
    intensityStr += "\n";
    concentrationStr += "\n";
    // console.log(concentrationStr)
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
    paramA: 87.69,
    paramB: 7.5,
    paramC: 3.48,
    paramD: 195.24,
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
  const [intensityStrTxt, concentrationStrTxt] = getTableDataRectStr(
    tableData,
    divideValue,
    "\t"
  );
  const [intensityStrCSV, concentrationStrCSV] = getTableDataRectStr(
    tableData,
    divideValue,
    ","
  );
  const timeNow = getCurrentTime()
  const exportDataTxt =
    "Intensity,"+timeNow+"\n"+ intensityStrTxt + "\nConcentration,"+timeNow+"\n" + concentrationStrTxt;
  const exportDataCSV =
    "Intensity,"+timeNow+"\n"+ intensityStrCSV + "\nConcentration,"+timeNow+"\n" + concentrationStrCSV;
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
                exportText("data.txt", exportDataTxt);
              }}
            >
              ExportTxt
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              type={"primary"}
              size={"small"}
              onClick={() => {
                exportText("data.csv", exportDataCSV);
              }}
            >
              ExportCSV
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
        <Divider />
      </Card>
    </Space>
  );
};

export default PictureColor;
