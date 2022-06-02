import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
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
  var avR = sumR / w / h;
  var avG = sumG / w / h;
  var avB = sumB / w / h;
  console.log(avR, avG, avB);
  return [avR, avG, avB];
};

const App = () => {
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState({});
  const { avR, avG, avB } = data;


  const onPreview = async (file) => {
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
            const [avR, avG, avB] = getColor(img.width, img.height, arr);
            setData({ avR, avG, avB })
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
  const onChange = ({ fileList: newFileList }) => {
    if(newFileList[0] && newFileList[0]['status'] !== 'uploadingne'){
      onPreview(newFileList[0])
    }
    setFileList(newFileList);
  };

  return (
    <>
      <ImgCrop rotate shape={"round"}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          onload={(e)=>{console.log(e)}}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
      <div>{('avR: '+avR+'   ,avG: '+ avG+'   ,avB: '+avB)}</div>
    </>
  );
};

export default App;
