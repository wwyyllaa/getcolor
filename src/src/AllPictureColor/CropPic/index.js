import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import cal_cubic_ik from "../../utils/calcu";
const B = 22 / 714;
const D = 35 / 714;
const TESTR = 15;
const XNUM = 8;
const YNUM = 12;

const getColor = (arr) => {
  var sum = 0;

  for (var j = 0; j < arr.length; j++) {
    sum += arr[j];
  }
  return sum / arr.length;
};
const getTestArr = (coreX, coreY, width, testR = TESTR) => {
  const testArr = [];
  const testCoordArr = [];
  const beginX = coreX - testR;
  const beginY = coreY - testR;
  for (let i = 0; i < testR * 2; i++) {
    for (let j = 0; j < testR * 2; j++) {
      const x = beginX + i;
      const y = beginY + j;
      testArr.push(x + (y - 1) * width);
      testCoordArr.push([x, y]);
    }
  }
  return [testArr, testCoordArr];
};

const getCoordAndArr = (w, xNum = XNUM, yNum = YNUM, testR = TESTR) => {
  const width = Math.round(w);
  const b = B * width;
  const r = D * width;
  const coordArr = []; //中心点坐标
  const orderArr = []; //每个矩形的顺序列表集合
  const testorderCoordArr = []; //每个矩形的坐标列表集合
  for (let j = 0; j < yNum; j++) {
    for (let i = 0; i < xNum; i++) {
      const x = Math.round(r + i * (2 * r + b));
      const y = Math.round(r + j * (2 * r + b));
      coordArr.push([x, y]);
      const [testArr, testCoordArr] = getTestArr(x, y, width, testR);
      orderArr.push(testArr);
      testorderCoordArr.push(testCoordArr);
    }
  }
  return [coordArr, orderArr, testorderCoordArr];
};

//默认通道为RGBA按顺序，四个值连着，所以按RGBA切割开，转换为各自通道的列表序列
const transRGBToChannelArr = (w, h, arr) => {
  var arrR = [];
  var arrG = [];
  var arrB = [];
  var arrA = [];

  for (var j = 0; j < h * w; j++) {
    var index = j * 4;
    arrR.push(arr[index]);
    arrG.push(arr[index + 1]);
    arrB.push(arr[index + 2]);
    arrA.push(arr[index + 3]);
  }
  return [arrR, arrG, arrB];
};

const drawRectTocanvas = (ctx, x, y, testR = TESTR, text) => {
  ctx.strokeStyle = "red";
  ctx.strokeRect(x - testR, y - testR, 2 * testR, 2 * testR);
  ctx.strokeText(String(text), x - testR, y - testR);
};

const App = ({
  params,
  setParams,
  tableData = [],
  setTableData,
  aspect = 1,
  shape = "round",
}) => {
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState({});
  const [testR, setTestR] = useState(TESTR);
  const { avR, avG, avB, result } = data;
  const { paramA, paramB, paramC, paramD, paramResult } = params;
  const onPreview = async (file) => {
    console.log(params);
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        const img = new Image();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = (e) => {
          img.src = e.target.result;
          console.log(img.width, img.height);
          img.onload = () => {
            var canvas = document.getElementById("cropPicture");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var arr = ctx.getImageData(0, 0, img.width, img.height).data;
            // console.log(arr);
            const [arrR, arrG, arrB] = transRGBToChannelArr(
              img.width,
              img.height,
              arr
            );
            // console.log([arrR, arrG, arrB]);
            const [coordArr, orderArr, testorderCoordArr] = getCoordAndArr(
              img.width,
              XNUM,
              YNUM,
              testR
            );
            // console.log(img.width, img.height, coordArr, orderArr);
            coordArr.map((cor, i) => {
              const [x, y] = cor;
              drawRectTocanvas(ctx, x, y, testR, i + 1);
            });
            const finalArr = [arrR, arrG, arrB].map((arrColor, colorIndex) => {
              const avColorArr = orderArr.map((arr, orderIndex) => {
                const colors = arr.map((i) => arrColor[i]);
                const avColor = getColor(colors);
                const r = tableData[orderIndex];
                r[colorIndex] = {};
                r[colorIndex]["value"] = avColor;
                r[colorIndex]["arr"] = colors;
                const calResult =
                  cal_cubic_ik([
                    paramA,
                    paramB,
                    paramC,
                    paramD - (255 - avColor),
                  ])
                    ?.map((r) => r <= 4.5 && r >= 2.0 && r)
                    ?.filter((r) => r)[0] || 0;
                r[colorIndex]["X"] = calResult;
                r[colorIndex]["10^X"] = Math.pow(10, calResult);
                setTableData([...tableData.map((t) => ({ ...t }))]);
                return avColor;
              });
              return avColorArr;
            });
            setData({
              avR,
              avG,
              avB,
              result: finalArr,
            });
            // console.log(finalArr);
            // resolve(reader.result);
          };
        };
      });
    }
  };
  const onChange = ({ fileList: newFileList, file }) => {
    if (file && file["status"] !== "uploading") {
      onPreview(file);
    }
    setFileList(newFileList);
  };

  return (
    <>
      <ImgCrop
        rotate
        shape={shape}
        aspect={aspect}
        minZoom={1}
        maxZoom={30}
        grid={true}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          onload={(e) => {
            console.log(e);
          }}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </>
  );
};

export default App;
