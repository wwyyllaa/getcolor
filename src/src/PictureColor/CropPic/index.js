import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import cal_cubic_ik from "../../utils/calcu";
import cal_x from "../../utils/cal_x";

const getColor = (w, h, arr) => {
  var sumR = 0;
  var sumG = 0;
  var sumB = 0;

  for (var j = 0; j < (h * w) / 4; j++) {
    var index = j * 4;
    var R = arr[index];
    var G = arr[index + 1];
    var B = arr[index + 2];
    var A = arr[index + 3];

    sumR += R;
    sumG += G;
    sumB += B;
  }
  var avR = (sumR / w / h) * 4;
  var avG = (sumG / w / h) * 4;
  var avB = (sumB / w / h) * 4;
  // console.log(avR, avG, avB);
  return [avR, avG, avB];
};

const App = ({ params, setParams, aspect = 1, shape = "round" }) => {
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState({});
  const { avR, avG, avB, result } = data;
  const { paramA, paramB, paramC, paramD, paramResult } = params;
  const onPreview = async (file) => {
    // console.log(params);
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
            const [avR, avG, avB] = getColor(img.width, img.height, arr);
            const calResult =
              cal_x(paramA, paramB, paramC, paramD, (255 - avB))
            // ?.map((r) => r <= 4.5 && r >= 2.0 && r)
            // ?.filter((r) => r)[0] || 0;
            setParams({ ...params, paramY: avB, paramResult: calResult });
            setData({
              avR,
              avG,
              avB,
              result: calResult,
            });
            // resolve(reader.result);
          };
        };
      });
    }
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
        maxZoom={100}
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
      {/* <div>
        {"avR: " +
          (avR || "0") +
          "   ,avG: " +
          (avG || "0") +
          "   ,avB: " +
          (avB || "0")}
      </div> */}
      {/* <div>{"result: " + (result || "0")}</div> */}
    </>
  );
};

export default App;
