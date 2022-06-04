import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import cal_cubic_ik from "../../utils/calcu";
const B = 22 / 714;
const D = 35 / 714;

const getColor = (arr) => {
  var sum = 0;

  for (var j = 0; j < arr.length; j++) {
    sum += arr[j];
  }
  return sum / arr.length;
};
const getTestArr = (coreX, coreY, width, testR = 10) => {
  const testArr = [];
  const beginX = coreX - testR;
  const beginY = coreY - testR;
  for (let i = 0; i < testR * 2; i++) {
    for (let j = 0; j < testR * 2; j++) {
      const x = beginX + i;
      const y = beginY + j;
      testArr.push(x + (y - 1) * width);
    }
  }
  return testArr;
};

const getCoordAndArr = (w, xNum = 8, yNum = 12, testR = 10) => {
  const width = Math.round(w);
  const b = B * width;
  const r = D * width;
  const coordArr = [];
  const orderArr = [];
  for (let i = 0; i < xNum; i++) {
    for (let j = 0; j < yNum; j++) {
      const x = Math.round(r + i * (2 * r + b));
      const y = Math.round(r + j * (2 * r + b));
      coordArr.push([x, y]);
      orderArr.push(getTestArr(x, y, width, testR));
    }
  }
  return [coordArr, orderArr];
};

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

const App = ({ params, setParams, aspect = 1, shape = "round" }) => {
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState({});
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
          img.onload = () => {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var arr = ctx.getImageData(0, 0, img.width, img.height).data;
            console.log(arr);
            const [arrR, arrG, arrB] = transRGBToChannelArr(
              img.width,
              img.height,
              arr
            );
            console.log([arrR, arrG, arrB]);
            const [coordArr, orderArr] = getCoordAndArr(img.width);
            console.log(img.width, img.height, coordArr, orderArr);
            const finalArr = [arrR, arrG, arrB].map((arrColor) => {
              const avColorArr = orderArr.map((arr) => {
                return getColor(arr.map((i) => arrColor[i]));
              });
              return avColorArr;
            });
            console.log(finalArr);

            // const calResult =
            //   cal_cubic_ik([paramA, paramB, paramC, paramD - (255 - avB)])
            //     ?.map((r) => r <= 4.5 && r >= 2.0 && r)
            //     ?.filter((r) => r)[0] || 0;
            // setParams({ ...params, paramY: avB, paramResult: calResult });
            setData({
              avR,
              avG,
              avB,
              result: finalArr,
            });
            // resolve(reader.result);
          };
        };
      });
    }
    // const image = new Image();
    // image.src = src;
    // const imgWindow = window.open(src);
    // imgWindow?.document.write(image.outerHTML);
  };
  const onChange = ({ fileList: newFileList, file }) => {
    if (file && file["status"] !== "uploadingne") {
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
        maxZoom={20}
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
      <div>
        {"avR: " +
          (avR || "0") +
          "   ,avG: " +
          (avG || "0") +
          "   ,avB: " +
          (avB || "0")}
      </div>
      {
        result?.map((arr,i)=><div key={i}>
          {arr.join(',')}
        </div>)
      }
    </>
  );
};

export default App;
